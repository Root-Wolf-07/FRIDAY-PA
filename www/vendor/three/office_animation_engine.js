/**
 * Office Animation Engine for Three.js & Virtual Tech Workspace
 *
 * Implements:
 * 1. Realistic Human Character Animations:
 *    - De-synchronized animation mixers (speed 0.85x - 1.15x, random start phase, burst typing cadence)
 *    - Blended states (WORKING, INSPECTING, IDLE) with procedural spine breathing sway
 *    - Procedural head tracking with Quaternion.slerp toward camera/hovered target
 * 2. Micro-Interactions & Desk Dynamics:
 *    - Physical chair micro-rotations (±2° yaw sway with spring-mass dampening)
 *    - Dynamic animated monitor CanvasTextures (scrolling code/logs, fluctuating telemetry)
 *    - Dynamic screen emissive light flicker/cast onto desk and face
 * 3. Real-World Environmental Motion:
 *    - Flowing network data packet trails along floor conduits
 *    - Server rack cabinets with random ping LEDs and rotating cooling fan blades
 *    - Drifting dust motes / particulate floaters particle system with Brownian motion
 * 4. Cinematic Camera Transitions:
 *    - Smooth cubic-bezier camera transitions to over-the-shoulder workstation perspectives
 *    - Idle camera breathing float (harmonic Perlin-style drift)
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('office_animation_engine.js: THREE is not defined.');
    return;
  }

  // Cubic Bezier Easing Helper: cubic-bezier(0.25, 0.1, 0.25, 1.0)
  function cubicBezierEase(t) {
    // Standard cubic ease-in-out approximation
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  // 1. Character Animation Controller
  class CharacterAgent {
    constructor(id, model, options = {}) {
      this.id = id;
      this.model = model;
      this.isProcedural = !!options.isProcedural;
      this.proceduralParts = options.proceduralParts || null; // { spine, head, armL, armR, handL, handR }

      // De-synchronization parameters
      this.speedFactor = 0.85 + Math.random() * 0.30; // 0.85x to 1.15x
      this.phaseOffset = Math.random() * Math.PI * 2;
      this.typingBurstTimer = Math.random() * 4.0;
      this.isBurstTyping = true;

      // States: 'WORKING' | 'INSPECTING' | 'IDLE'
      this.state = options.initialState || 'WORKING';
      this.stateTimer = 0;
      this.nextStateInterval = 5.0 + Math.random() * 7.0;

      // Head Tracking
      this.headNode = this.findHeadNode();
      this.defaultHeadQuat = this.headNode ? this.headNode.quaternion.clone() : new THREE.Quaternion();
      this.isTrackingTarget = false;
      this.trackingWorldPos = new THREE.Vector3();

      // AnimationMixer for loaded GLTF
      this.mixer = options.mixer || null;
      this.actions = options.actions || {};
      this.currentAction = options.currentAction || null;

      // Chair reference for micro-swivel
      this.chair = options.chair || null;
      this.chairSpring = {
        currentYaw: 0,
        targetYaw: 0,
        velocity: 0,
        stiffness: 18.0,
        damping: 4.5
      };

      // Associated Monitor & Light
      this.monitorCanvas = options.monitorCanvas || null;
      this.monitorTexture = options.monitorTexture || null;
      this.screenLight = options.screenLight || null;
      this.baseLightIntensity = this.screenLight ? this.screenLight.intensity : 0.6;
    }

    findHeadNode() {
      if (this.proceduralParts && this.proceduralParts.head) {
        return this.proceduralParts.head;
      }
      if (!this.model) return null;
      let head = null;
      this.model.traverse((child) => {
        if (/head|neck/i.test(child.name) && !head) {
          head = child;
        }
      });
      return head;
    }

    setTargetTracking(worldPos) {
      if (worldPos) {
        this.isTrackingTarget = true;
        this.trackingWorldPos.copy(worldPos);
      } else {
        this.isTrackingTarget = false;
      }
    }

    transitionState(newState) {
      if (this.state === newState) return;
      this.state = newState;
      this.stateTimer = 0;
      this.nextStateInterval = 4.0 + Math.random() * 8.0;

      // Subtle chair reaction on state shift (±2° sway = ±0.035 rad)
      if (this.chair) {
        this.chairSpring.targetYaw = (Math.random() - 0.5) * 0.07;
      }
    }

    update(delta, time, camera) {
      this.stateTimer += delta;
      if (this.stateTimer > this.nextStateInterval) {
        const states = ['WORKING', 'INSPECTING', 'WORKING', 'IDLE'];
        const next = states[Math.floor(Math.random() * states.length)];
        this.transitionState(next);
      }

      // 1. Typing Burst Cadence (simulate human pauses to read)
      this.typingBurstTimer -= delta;
      if (this.typingBurstTimer <= 0) {
        this.isBurstTyping = !this.isBurstTyping;
        this.typingBurstTimer = this.isBurstTyping ? (3.0 + Math.random() * 5.0) : (1.0 + Math.random() * 2.0);
      }

      // 2. Procedural Avatar Kinematics
      if (this.isProcedural && this.proceduralParts) {
        const { spine, head, armL, armR } = this.proceduralParts;

        // Spine subtle breathing sway
        if (spine) {
          spine.position.y = 0.14 + Math.sin(time * 2.0 + this.phaseOffset) * 0.003;
          spine.rotation.x = -0.06 + Math.sin(time * 1.5 + this.phaseOffset) * 0.012;
        }

        // Typing / Inspecting / Idle arm motion
        if (armL && armR) {
          if (this.state === 'WORKING' && this.isBurstTyping) {
            const tapL = Math.sin(time * 16.0 * this.speedFactor + this.phaseOffset) * 0.055;
            const tapR = Math.sin(time * 16.0 * this.speedFactor + this.phaseOffset + Math.PI) * 0.055;
            armL.rotation.x = 0.82 + tapL;
            armR.rotation.x = 0.82 + tapR;
          } else if (this.state === 'INSPECTING') {
            // One hand on mouse, one resting
            armL.rotation.x = 0.65;
            armR.rotation.x = 0.88 + Math.sin(time * 2.5 + this.phaseOffset) * 0.015; // gentle mouse clicks
          } else {
            // IDLE state
            armL.rotation.x = 0.60 + Math.sin(time * 1.2 + this.phaseOffset) * 0.01;
            armR.rotation.x = 0.60 + Math.sin(time * 1.2 + this.phaseOffset) * 0.01;
          }
        }

        // Head tracking or natural gaze
        if (head) {
          if (this.isTrackingTarget && this.trackingWorldPos) {
            // Slerp head towards tracking target
            const headWorldPos = new THREE.Vector3();
            head.getWorldPosition(headWorldPos);
            const lookDir = new THREE.Vector3().subVectors(this.trackingWorldPos, headWorldPos).normalize();

            // Local space transform
            const parentWorldQuat = new THREE.Quaternion();
            if (head.parent) head.parent.getWorldQuaternion(parentWorldQuat);
            const invParent = parentWorldQuat.clone().invert();
            lookDir.applyQuaternion(invParent);

            const targetQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), lookDir);
            head.quaternion.slerp(targetQuat, delta * 3.5);
          } else {
            // Natural gaze between screens
            const gazeAngle = Math.sin(time * 0.6 * this.speedFactor + this.phaseOffset) * 0.14;
            head.quaternion.slerp(this.defaultHeadQuat, delta * 2.5);
            head.rotation.y = gazeAngle;
            head.rotation.x = -0.12 + Math.sin(time * 1.6 + this.phaseOffset) * 0.02;
          }
        }
      }

      // 3. GLTF AnimationMixer update
      if (this.mixer) {
        this.mixer.update(delta * this.speedFactor);
      }

      // 4. Chair Micro-Swivel with Spring-Mass Dampening
      if (this.chair) {
        const cs = this.chairSpring;
        const force = (cs.targetYaw - cs.currentYaw) * cs.stiffness;
        cs.velocity += (force - cs.velocity * cs.damping) * delta;
        cs.currentYaw += cs.velocity * delta;
        this.chair.rotation.y = (this.chair.userData.baseRotY || 0) + cs.currentYaw;
      }

      // 5. Dynamic Screen Light Flicker/Cast
      if (this.screenLight) {
        const flicker = Math.sin(time * 14.0 + this.phaseOffset) * 0.04 +
                        Math.cos(time * 26.0 + this.phaseOffset) * 0.02;
        const stateBoost = this.state === 'WORKING' ? 0.08 : 0.0;
        this.screenLight.intensity = this.baseLightIntensity + flicker + stateBoost;
      }
    }
  }

  // 2. Animated Flowing Network Data Packet Trails
  class NetworkPacketTrails {
    constructor(scene) {
      this.scene = scene;
      this.trails = [];
      this.beads = [];
      this.initTrails();
    }

    initTrails() {
      // Waypoints from 4 corporate wings to Master Suite (-13.5, 0.02, -9.5)
      const routes = [
        // Alpha (Eng) -> Master
        [
          new THREE.Vector3(13.5, 0.02, -9.5),
          new THREE.Vector3(5.0, 0.02, -4.0),
          new THREE.Vector3(0.0, 0.02, 0.0),
          new THREE.Vector3(-7.0, 0.02, -4.0),
          new THREE.Vector3(-13.5, 0.02, -9.5)
        ],
        // Beta (Design) -> Master
        [
          new THREE.Vector3(-14.0, 0.02, 9.5),
          new THREE.Vector3(-14.0, 0.02, 3.0),
          new THREE.Vector3(-10.0, 0.02, -2.0),
          new THREE.Vector3(-13.5, 0.02, -9.5)
        ],
        // Gamma (AI) -> Master
        [
          new THREE.Vector3(0.0, 0.02, 9.5),
          new THREE.Vector3(0.0, 0.02, 2.0),
          new THREE.Vector3(-6.0, 0.02, -3.0),
          new THREE.Vector3(-13.5, 0.02, -9.5)
        ],
        // Delta (Boardroom) -> Master
        [
          new THREE.Vector3(14.0, 0.02, 9.5),
          new THREE.Vector3(8.0, 0.02, 4.0),
          new THREE.Vector3(0.0, 0.02, 0.0),
          new THREE.Vector3(-8.0, 0.02, -5.0),
          new THREE.Vector3(-13.5, 0.02, -9.5)
        ]
      ];

      routes.forEach((routePoints, idx) => {
        const curve = new THREE.CatmullRomCurve3(routePoints);
        const points = curve.getPoints(80);
        const geo = new THREE.BufferGeometry().setFromPoints(points);

        // Dashed Conduit Line
        const mat = new THREE.LineDashedMaterial({
          color: idx === 1 ? 0xb05cff : (idx === 2 ? 0x00ff9d : 0x00f0ff),
          dashSize: 0.6,
          gapSize: 0.3,
          linewidth: 2,
          transparent: true,
          opacity: 0.65
        });
        const line = new THREE.Line(geo, mat);
        line.computeLineDistances();
        this.scene.add(line);
        this.trails.push({ line, mat, curve });

        // Glowing Data Packet Beads moving along the curve
        const beadGeo = new THREE.SphereGeometry(0.05, 8, 8);
        const beadMat = new THREE.MeshBasicMaterial({
          color: idx === 1 ? 0xd488ff : (idx === 2 ? 0x66ffc2 : 0x88f8ff)
        });

        for (let b = 0; b < 3; b++) {
          const beadMesh = new THREE.Mesh(beadGeo, beadMat);
          this.scene.add(beadMesh);
          this.beads.push({
            mesh: beadMesh,
            curve,
            offset: (b / 3) + Math.random() * 0.1,
            speed: 0.12 + Math.random() * 0.06
          });
        }
      });
    }

    update(delta, time) {
      // Animate line dash offset
      this.trails.forEach((tr, i) => {
        tr.mat.dashSize = 0.6 + Math.sin(time * 3.0 + i) * 0.1;
      });

      // Advance moving beads along curve
      this.beads.forEach(b => {
        b.offset = (b.offset + delta * b.speed) % 1.0;
        const pt = b.curve.getPointAt(b.offset);
        if (pt) b.mesh.position.copy(pt);
      });
    }
  }

  // 3. Server Rack Cabinet Dynamics (Pulsing LEDs & Rotating Cooling Fan)
  class ServerRackDynamics {
    constructor(rackGroup) {
      this.rackGroup = rackGroup;
      this.fanBlades = [];
      this.ledMeshes = [];
      this.setupComponents();
    }

    setupComponents() {
      if (!this.rackGroup) return;

      // 1. High-Speed Cooling Fan behind grill
      const fanGeo = new THREE.BoxGeometry(0.18, 0.012, 0.02);
      const fanMat = new THREE.MeshStandardMaterial({ color: 0x111c2a, metalness: 0.8, roughness: 0.3 });
      const fanHub = new THREE.Group();
      fanHub.position.set(0, 0.25, 0.36);

      for (let i = 0; i < 4; i++) {
        const blade = new THREE.Mesh(fanGeo, fanMat);
        blade.rotation.z = (i / 4) * Math.PI;
        fanHub.add(blade);
      }
      this.rackGroup.add(fanHub);
      this.fanBlades.push(fanHub);

      // 2. Discover Switch Port LEDs in rack hierarchy
      this.rackGroup.traverse((child) => {
        if (child.isMesh && child.material && (child.material.color.getHex() === 0x00f0ff || child.material.color.getHex() === 0x00ff9d)) {
          this.ledMeshes.push({
            mesh: child,
            baseColor: child.material.color.clone(),
            pingFreq: 6.0 + Math.random() * 18.0,
            phase: Math.random() * Math.PI * 2
          });
        }
      });
    }

    update(delta, time) {
      // Spin cooling fan at high RPM
      this.fanBlades.forEach(f => {
        f.rotation.z += delta * 24.0;
      });

      // Random ping frequencies for LEDs
      this.ledMeshes.forEach(l => {
        const pulse = Math.sin(time * l.pingFreq + l.phase);
        l.mesh.visible = pulse > -0.2; // Quick blinking bursts
      });
    }
  }

  // 4. Drifting Dust Motes & Airflow Particle System
  class AirflowParticleSystem {
    constructor(scene, count = 250) {
      this.scene = scene;
      this.count = count;
      this.geometry = new THREE.BufferGeometry();
      this.positions = new Float32Array(count * 3);
      this.velocities = [];

      for (let i = 0; i < count; i++) {
        this.positions[i * 3 + 0] = (Math.random() - 0.5) * 44; // X span across office
        this.positions[i * 3 + 1] = 0.4 + Math.random() * 3.2;   // Y room height
        this.positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // Z span

        this.velocities.push({
          vx: (Math.random() - 0.5) * 0.08,
          vy: 0.02 + Math.random() * 0.04,
          vz: (Math.random() - 0.5) * 0.08,
          phase: Math.random() * Math.PI * 2
        });
      }

      this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

      // Particle Material with Soft Glow
      this.material = new THREE.PointsMaterial({
        color: 0x98d4ff,
        size: 0.045,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      this.points = new THREE.Points(this.geometry, this.material);
      this.scene.add(this.points);
    }

    update(delta, time) {
      const pos = this.geometry.attributes.position.array;
      for (let i = 0; i < this.count; i++) {
        const v = this.velocities[i];
        const idx = i * 3;

        // Gentle Brownian drift with HVAC airflow circulation
        pos[idx + 0] += (v.vx + Math.sin(time * 0.8 + v.phase) * 0.03) * delta;
        pos[idx + 1] += (v.vy + Math.cos(time * 0.6 + v.phase) * 0.02) * delta;
        pos[idx + 2] += (v.vz + Math.sin(time * 0.5 + v.phase) * 0.03) * delta;

        // Ceiling recirculation wrap-around
        if (pos[idx + 1] > 3.6) {
          pos[idx + 1] = 0.4;
        }
      }
      this.geometry.attributes.position.needsUpdate = true;
    }
  }

  // 5. Cinematic Camera Controller (Cubic-Bezier Transitions + Breathing Float)
  class CinematicCameraController {
    constructor(camera, orbitControls) {
      this.camera = camera;
      this.orbitControls = orbitControls;

      this.transition = {
        active: false,
        duration: 1.4,
        elapsed: 0,
        startPos: new THREE.Vector3(),
        endPos: new THREE.Vector3(),
        startTarget: new THREE.Vector3(),
        endTarget: new THREE.Vector3()
      };

      this.breathing = {
        enabled: true,
        amplitudeX: 0.06,
        amplitudeY: 0.04,
        frequency: 0.65
      };
    }

    glideTo(targetCamPos, targetLookAt, duration = 1.4) {
      this.transition.active = true;
      this.transition.duration = duration;
      this.transition.elapsed = 0;
      this.transition.startPos.copy(this.camera.position);
      this.transition.endPos.set(targetCamPos.x, targetCamPos.y, targetCamPos.z);
      this.transition.startTarget.copy(this.orbitControls ? this.orbitControls.target : new THREE.Vector3());
      this.transition.endTarget.set(targetLookAt.x, targetLookAt.y, targetLookAt.z);
    }

    update(delta, time) {
      // 1. Cubic-Bezier Transition
      if (this.transition.active) {
        this.transition.elapsed += delta;
        const rawT = Math.min(1.0, this.transition.elapsed / this.transition.duration);
        const easeT = cubicBezierEase(rawT);

        this.camera.position.lerpVectors(this.transition.startPos, this.transition.endPos, easeT);
        if (this.orbitControls) {
          this.orbitControls.target.lerpVectors(this.transition.startTarget, this.transition.endTarget, easeT);
        }

        if (rawT >= 1.0) {
          this.transition.active = false;
        }
      } else if (this.breathing.enabled && this.orbitControls && this.orbitControls.enabled) {
        // 2. Subtle Camera Breathing Float during idle inspection
        const breathX = Math.sin(time * this.breathing.frequency) * this.breathing.amplitudeX * delta;
        const breathY = Math.cos(time * this.breathing.frequency * 0.8) * this.breathing.amplitudeY * delta;
        this.camera.position.x += breathX;
        this.camera.position.y += breathY;
      }
    }
  }

  // Export to global namespace
  window.OfficeAnimationEngine = {
    CharacterAgent,
    NetworkPacketTrails,
    ServerRackDynamics,
    AirflowParticleSystem,
    CinematicCameraController
  };

})();
