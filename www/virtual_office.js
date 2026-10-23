/**
 * ==============================================================================
 * GOJO ENTERPRISE - MODERN TECH CORPORATE VIRTUAL OFFICE (THREE.JS / WEBGL)
 * Architectural 5-Room Tech Campus: Master Suite, Alpha, Beta, Gamma, Delta, Concourse
 * ==============================================================================
 */

(function () {
  'use strict';

  // Room Metadata Database
  const ROOM_DATA = {
    overview: {
      id: 'overview',
      name: 'Entire Corporate HQ',
      zone: 'ALL ZONES',
      headcount: 19,
      lead: 'FRIDEY Master Core & Gojo',
      status: 'ALL SYSTEMS OPERATIONAL',
      desc: 'Modern open-plan corporate technology headquarters spanning 1,720 sq.m. Features polished concrete reception concourse, natural oak team suites, and executive founder penthouse.',
      kpis: [
        { label: 'Fleet Bus Load', val: '94.8%' },
        { label: 'Active Sprints', val: '5 / 5' },
        { label: 'Global Uptime', val: '99.99%' },
        { label: 'Neural Sync', val: 'Synced' }
      ],
      progress: 96,
      camPos: { x: 0, y: 32, z: 32 },
      target: { x: 0, y: 1.2, z: 0 }
    },
    lobby: {
      id: 'lobby',
      name: 'Central Concourse, Beverage Bar & Safety Lounge',
      zone: 'ZONE 0 • PANTRY & AMENITIES',
      headcount: 2,
      lead: 'Operations & Facilities Director',
      status: 'DUAL-ISP ACTIVE • PANTRY READY',
      desc: 'Central concourse connecting corporate wings. Equipped with commercial bean-to-cup espresso & cold brew bar, commercial refrigeration, communal recharge lounge, and OSHA First Aid & AED emergency station.',
      kpis: [
        { label: 'Dual-ISP Link', val: '10G Primary + Failover' },
        { label: 'UPS Power', val: '100% (20kVA Online)' },
        { label: 'Access Control', val: 'Biometric / RFID' },
        { label: 'HVAC / HEPA', val: '21.4°C • 428 PPM CO₂' }
      ],
      progress: 96,
      camPos: { x: 0, y: 6.5, z: 12 },
      target: { x: 0, y: 1.0, z: 0 }
    },
    master: {
      id: 'master',
      name: 'Executive & Master Suite',
      zone: 'ROOM 1 • PENTHOUSE & COMMAND',
      headcount: 2,
      lead: 'Gojo & AGENT-00 (Brain)',
      status: 'EXECUTIVE STRATEGY IN SESSION',
      desc: 'Private executive office equipped with motorized sit-stand walnut desk, collaborative leather lounge seating, secondary 65" 4K interactive presentation display, and acoustic felt wall treatment.',
      kpis: [
        { label: 'Desk Setup', val: 'Motorized Sit-Stand' },
        { label: 'Docking Hub', val: 'Thunderbolt 4 Single-Cable' },
        { label: 'Acoustic Rating', val: 'NRC 0.85 Baffles' },
        { label: 'Biophilia', val: 'Preserved Moss Wall' }
      ],
      progress: 98,
      camPos: { x: -14, y: 5.5, z: -1 },
      target: { x: -13.5, y: 1.2, z: -9.5 }
    },
    alpha: {
      id: 'alpha',
      name: 'Team Alpha (Engineering & MDF Closet)',
      zone: 'ROOM 2 • SYSTEMS, DEVOPS & MDF',
      headcount: 5,
      lead: 'Lead Systems Architect',
      status: 'MDF 19.4°C • 10GbE CORE ONLINE',
      desc: 'High-performance engineering wing with sit-stand benching desks, structured Cat6a/7 cabling in wire trays, dedicated climate-controlled MDF server closet with dual-ISP fiber lines, 42U racks, centralized UPS, and FM-200 fire suppression.',
      kpis: [
        { label: 'MDF Climate', val: '19.4°C • 45% RH' },
        { label: 'Fire Suppression', val: 'FM-200 Active' },
        { label: 'Network Core', val: '10GbE Cisco Switches' },
        { label: 'Cabling Spec', v: 'Cat6a Shielded (S/FTP)' }
      ],
      progress: 95,
      camPos: { x: 14, y: 5.5, z: -1 },
      target: { x: 13.5, y: 1.2, z: -9.5 }
    },
    beta: {
      id: 'beta',
      name: 'Team Beta (Design & Acoustic Micro-Pods)',
      zone: 'ROOM 3 • UI/UX & FOCUS BOOTHS',
      headcount: 4,
      lead: 'Principal Design Lead',
      status: 'FOCUS PODS AVAILABLE • SPRINT 14',
      desc: 'Creative studio layout with motorized standing desks, ultrawide curved 4K displays, lockable mobile pedestals, and single-occupancy soundproof acoustic phone booths / micro-pods (32dB sound isolation rating).',
      kpis: [
        { label: 'Phone Booths', val: '32 dB Acoustic Felt' },
        { label: 'Sit-Stand Memory', val: '4 Digital Presets' },
        { label: 'Display Arm', val: 'Heavy-Duty Gas Spring' },
        { label: 'Pedestals', val: 'Lockable Steel Mobile' }
      ],
      progress: 91,
      camPos: { x: -14, y: 5.5, z: 2 },
      target: { x: -14, y: 1.2, z: 9.5 }
    },
    gamma: {
      id: 'gamma',
      name: 'Team Gamma (Data Science & AI Pod)',
      zone: 'ROOM 4 • NEURAL & ANALYTICS',
      headcount: 4,
      lead: 'Head of AI Research',
      status: 'HEPA CARBON SCRUBBERS ACTIVE',
      desc: 'Collaborative pod layout with under-desk wire management trays, 10GbE network drops, and multi-zone VRF HVAC maintaining CO₂ strictly below 500 PPM with commercial HEPA H13 filtration.',
      kpis: [
        { label: 'GPU Cluster Load', val: '96.2%' },
        { label: 'CO₂ Level', val: '428 PPM (Optimal)' },
        { label: 'Air Filtration', val: 'HEPA H13 99.97%' },
        { label: 'Wi-Fi 7 Link', val: 'Commercial AP Active' }
      ],
      progress: 92,
      camPos: { x: 0, y: 5.5, z: 2 },
      target: { x: 0, y: 1.2, z: 9.5 }
    },
    delta: {
      id: 'delta',
      name: 'Team Delta (Boardroom Alpha & Conference)',
      zone: 'ROOM 5 • SOUNDPROOFED BOARDROOM',
      headcount: 4,
      lead: 'VP of Operations',
      status: 'RESERVED: SPRINT RETRO • STC 50',
      desc: 'Soundproofed conference boardroom (STC 50) featuring an 8-person solid oak boardroom table, 4K PTZ video conferencing bar with beamforming microphone array, 85" interactive presentation screen, and external digital room-booking tablet panel.',
      kpis: [
        { label: 'Acoustic Glass', val: 'STC 50 Double-Glazed' },
        { label: 'PTZ Video Bar', val: '4K 15x Optical Zoom' },
        { label: 'Microphone Array', val: 'Beamforming AEC' },
        { label: 'Booking Panel', val: '10.1" Digital Tablet' }
      ],
      progress: 89,
      camPos: { x: 14, y: 5.5, z: 2 },
      target: { x: 14, y: 1.2, z: 9.5 }
    }
  };

  class VirtualOfficeApp {
    constructor() {
      this.container = document.getElementById('canvasContainer');
      this.activeRoomId = 'overview';
      this.cameraMode = 'orbit'; // 'orbit' | 'firstperson'
      this.lightingMode = 'day'; // 'day' | 'night'

      // Three.js Core
      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.orbitControls = null;
      this.clock = new THREE.Clock();

      // Camera Animation Tween
      this.camTween = {
        active: false,
        startPos: new THREE.Vector3(),
        endPos: new THREE.Vector3(),
        startTarget: new THREE.Vector3(),
        endTarget: new THREE.Vector3(),
        progress: 0,
        duration: 1.2
      };

      // First-Person Walkthrough State
      this.fpControls = {
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        velocity: new THREE.Vector3(),
        direction: new THREE.Vector3(),
        euler: new THREE.Euler(0, 0, 0, 'YXZ'),
        isLocked: false
      };

      // Raycasting for interactive clicks
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
      this.interactiveObjects = [];

      // Dynamic Canvas Monitors
      this.animatedCanvases = [];

      // Lighting References
      this.lights = {};

      // AnimationMixer for GLB models & Dynamic Character Agents
      this.mixers = [];
      this.proceduralAvatars = [];
      this.characterAgents = [];
      this.serverRackDynamics = [];
      this.cameraController = null;
      this.packetTrails = null;
      this.dustMotes = null;

      this.init();
    }

    init() {
      if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded.');
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;

      // 1. Scene Setup
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x0a101d);
      this.scene.fog = new THREE.FogExp2(0x0a101d, 0.024);

      // 2. Camera Setup
      this.camera = new THREE.PerspectiveCamera(46, w / h, 0.1, 150);
      const initTarget = ROOM_DATA.overview.camPos;
      this.camera.position.set(initTarget.x, initTarget.y, initTarget.z);

      // 3. Renderer Setup with ACES Filmic Tone Mapping and sRGB output
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      if (THREE.ACESFilmicToneMapping) {
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.1;
      }
      if ('outputColorSpace' in this.renderer && THREE.SRGBColorSpace) {
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      } else if ('outputEncoding' in this.renderer && THREE.sRGBEncoding) {
        this.renderer.outputEncoding = THREE.sRGBEncoding;
      }
      this.container.appendChild(this.renderer.domElement);

      // Studio HDRI Environment Map via PMREMGenerator
      if (window.OfficePBRTextures && typeof window.OfficePBRTextures.createStudioEnvironment === 'function') {
        try {
          const envTex = window.OfficePBRTextures.createStudioEnvironment(this.renderer);
          if (envTex) this.scene.environment = envTex;
        } catch (e) {
          console.warn('VirtualOffice: Studio environment map error:', e.message);
        }
      }

      // Initialize Post-Processing Composer (Bloom + SSAO/Film Pass)
      this.setupPostProcessing(w, h);

      // 4. OrbitControls
      if (typeof THREE.OrbitControls !== 'undefined') {
        this.orbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.enableDamping = true;
        this.orbitControls.dampingFactor = 0.08;
        this.orbitControls.target.set(0, 1.2, 0);
        this.orbitControls.maxPolarAngle = Math.PI / 2.05; // Prevent camera under floor
        this.orbitControls.minDistance = 3.0;
        this.orbitControls.maxDistance = 65.0;
      }

      // 5. Cinematic Camera Controller (Cubic-Bezier Glide + Perlin Breathing Float)
      if (window.OfficeAnimationEngine && window.OfficeAnimationEngine.CinematicCameraController) {
        this.cameraController = new window.OfficeAnimationEngine.CinematicCameraController(this.camera, this.orbitControls);
      }

      // 6. Real-World Environmental Motion: Network Packet Trails
      if (window.OfficeAnimationEngine && window.OfficeAnimationEngine.NetworkPacketTrails) {
        this.packetTrails = new window.OfficeAnimationEngine.NetworkPacketTrails(this.scene);
      }

      // 7. HVAC & Airflow: Drifting Dust Motes Particle System
      if (window.OfficeAnimationEngine && window.OfficeAnimationEngine.AirflowParticleSystem) {
        this.dustMotes = new window.OfficeAnimationEngine.AirflowParticleSystem(this.scene, 250);
      }

      // 8. Lighting Setup
      this.setupLighting();

      // 9. Build 5-Room Architectural Floor Plan
      this.buildFloorPlan();

      // 7. Setup Interactive Raycasting
      this.setupRaycasting();

      // 8. Setup First-Person Controls & Keybindings
      this.setupFirstPersonControls();

      // 9. Wire UI Navigation, Minimap & Buttons
      this.setupUI();

      // 10. Hide Loading Screen
      const loaderEl = document.getElementById('loadingScreen');
      if (loaderEl) {
        setTimeout(() => {
          loaderEl.style.opacity = '0';
          setTimeout(() => loaderEl.style.display = 'none', 600);
        }, 800);
      }

      // 11. Resize Listener
      window.addEventListener('resize', () => this.onWindowResize());

      // 12. Start Render Loop
      this.animate();
    }

    setupPostProcessing(width, height) {
      if (typeof THREE.EffectComposer === 'undefined') {
        console.log('VirtualOffice: EffectComposer not loaded, using direct WebGLRenderer.');
        return;
      }
      try {
        this.composer = new THREE.EffectComposer(this.renderer);
        this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));

        if (typeof THREE.UnrealBloomPass !== 'undefined') {
          const bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(width, height),
            0.65, // strength
            0.4,  // radius
            0.82  // threshold for monitors & LEDs
          );
          this.composer.addPass(bloomPass);
        }

        if (typeof THREE.CinematicFilmPass !== 'undefined') {
          const filmPass = new THREE.CinematicFilmPass({
            aberration: 0.0016, // subtle lens chromatic aberration
            grain: 0.024,       // subtle 35mm photographic film grain
            vignette: 0.20      // smooth edge vignette
          });
          this.composer.addPass(filmPass);
        }
        console.log('VirtualOffice: Post-processing pipeline active (Bloom + SSAO/Film Grain).');
      } catch (e) {
        console.warn('VirtualOffice: Post-processing setup error:', e.message);
        this.composer = null;
      }
    }

    setupLighting() {
      // 1. Natural Sky Daylight Directional Sun
      const sun = new THREE.DirectionalLight(0xfff7ea, 1.45);
      sun.position.set(24, 32, -24);
      sun.castShadow = true;
      sun.shadow.mapSize.width = 2048;
      sun.shadow.mapSize.height = 2048;
      sun.shadow.camera.near = 2;
      sun.shadow.camera.far = 90;
      const d = 32;
      sun.shadow.camera.left = -d;
      sun.shadow.camera.right = d;
      sun.shadow.camera.top = d;
      sun.shadow.camera.bottom = -d;
      sun.shadow.bias = -0.0006;
      this.scene.add(sun);
      this.lights.sun = sun;

      // 2. Ambient Sky / Ground Fill
      const hemi = new THREE.HemisphereLight(0x567da6, 0x141e2a, 0.75);
      this.scene.add(hemi);
      this.lights.hemi = hemi;

      // 3. Central Concourse Ambient Fill
      const lobbyLight = new THREE.PointLight(0xfff3db, 0.9, 18);
      lobbyLight.position.set(0, 3.8, 0);
      this.scene.add(lobbyLight);
      this.lights.lobby = lobbyLight;

      // 4. Room Accent Lights (Warm Downlights inside each room)
      const roomLightCoords = [
        { id: 'master', pos: [-13.5, 3.6, -9.5], color: 0xfffaed, intensity: 1.1 },
        { id: 'alpha', pos: [13.5, 3.6, -9.5], color: 0xebf6ff, intensity: 1.2 },
        { id: 'beta', pos: [-14.0, 3.6, 9.5], color: 0xfff4e6, intensity: 1.1 },
        { id: 'gamma', pos: [0.0, 3.6, 9.5], color: 0x00f0ff, intensity: 0.9 },
        { id: 'delta', pos: [14.0, 3.6, 9.5], color: 0xfffaed, intensity: 1.1 }
      ];

      this.lights.roomSpots = [];
      roomLightCoords.forEach(c => {
        const light = new THREE.PointLight(c.color, c.intensity, 14);
        light.position.set(c.pos[0], c.pos[1], c.pos[2]);
        this.scene.add(light);
        this.lights.roomSpots.push(light);
      });
    }

    setLightingMode(mode) {
      this.lightingMode = mode;
      const btn = document.getElementById('btnToggleLight');

      if (mode === 'night') {
        this.scene.background.set(0x03060c);
        this.scene.fog.color.set(0x03060c);
        if (this.lights.sun) {
          this.lights.sun.intensity = 0.25;
          this.lights.sun.color.set(0x224488);
        }
        if (this.lights.hemi) {
          this.lights.hemi.intensity = 0.35;
          this.lights.hemi.color.set(0x182438);
        }
        if (this.lights.lobby) {
          this.lights.lobby.color.set(0x00f0ff);
          this.lights.lobby.intensity = 1.3;
        }
        this.lights.roomSpots.forEach(l => {
          l.intensity = 1.4;
        });
        if (btn) btn.innerHTML = '🌙 CYBER NIGHT';
      } else {
        this.scene.background.set(0x0a101d);
        this.scene.fog.color.set(0x0a101d);
        if (this.lights.sun) {
          this.lights.sun.intensity = 1.45;
          this.lights.sun.color.set(0xfff7ea);
        }
        if (this.lights.hemi) {
          this.lights.hemi.intensity = 0.75;
          this.lights.hemi.color.set(0x567da6);
        }
        if (this.lights.lobby) {
          this.lights.lobby.color.set(0xfff3db);
          this.lights.lobby.intensity = 0.9;
        }
        this.lights.roomSpots.forEach(l => {
          l.intensity = 1.1;
        });
        if (btn) btn.innerHTML = '☀️ DAYLIGHT';
      }
    }

    buildFloorPlan() {
      const officeGroup = new THREE.Group();
      officeGroup.name = 'officeFloorPlan';

      // ================= 1. FLOORPLATES =================
      // Concourse Polished Concrete Floor
      const concourseGeo = new THREE.BoxGeometry(46, 0.1, 7.5);
      const concreteMat = new THREE.MeshStandardMaterial({
        color: 0x161e2a,
        roughness: 0.55,
        metalness: 0.25
      });
      const concourseFloor = new THREE.Mesh(concourseGeo, concreteMat);
      concourseFloor.position.set(0, -0.05, 0);
      concourseFloor.receiveShadow = true;
      officeGroup.add(concourseFloor);

      // Team Rooms Natural White Oak Hardwood Floors
      const woodMat = new THREE.MeshStandardMaterial({
        color: 0x221a12,
        roughness: 0.65,
        metalness: 0.15
      });

      // Master Suite Floor
      const masterFloor = new THREE.Mesh(new THREE.BoxGeometry(16, 0.1, 13), woodMat);
      masterFloor.position.set(-13.5, -0.05, -10);
      masterFloor.receiveShadow = true;
      masterFloor.userData = { roomId: 'master' };
      officeGroup.add(masterFloor);
      this.interactiveObjects.push(masterFloor);

      // Team Alpha Floor
      const alphaFloor = new THREE.Mesh(new THREE.BoxGeometry(16, 0.1, 13), woodMat);
      alphaFloor.position.set(13.5, -0.05, -10);
      alphaFloor.receiveShadow = true;
      alphaFloor.userData = { roomId: 'alpha' };
      officeGroup.add(alphaFloor);
      this.interactiveObjects.push(alphaFloor);

      // Team Beta Floor
      const betaFloor = new THREE.Mesh(new THREE.BoxGeometry(14, 0.1, 13), woodMat);
      betaFloor.position.set(-14.5, -0.05, 10);
      betaFloor.receiveShadow = true;
      betaFloor.userData = { roomId: 'beta' };
      officeGroup.add(betaFloor);
      this.interactiveObjects.push(betaFloor);

      // Team Gamma Floor
      const gammaFloor = new THREE.Mesh(new THREE.BoxGeometry(14, 0.1, 13), concreteMat);
      gammaFloor.position.set(0, -0.05, 10);
      gammaFloor.receiveShadow = true;
      gammaFloor.userData = { roomId: 'gamma' };
      officeGroup.add(gammaFloor);
      this.interactiveObjects.push(gammaFloor);

      // Team Delta Floor
      const deltaFloor = new THREE.Mesh(new THREE.BoxGeometry(14, 0.1, 13), woodMat);
      deltaFloor.position.set(14.5, -0.05, 10);
      deltaFloor.receiveShadow = true;
      deltaFloor.userData = { roomId: 'delta' };
      officeGroup.add(deltaFloor);
      this.interactiveObjects.push(deltaFloor);

      // ================= 2. EXTERIOR GLASS CURTAIN WALL =================
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x98d4ff,
        transparent: true,
        opacity: 0.35,
        roughness: 0.05,
        transmission: 0.85,
        ior: 1.5,
        reflectivity: 0.6
      });

      // North Window Facade
      const northGlass = new THREE.Mesh(new THREE.BoxGeometry(46, 4.2, 0.08), glassMat);
      northGlass.position.set(0, 2.1, -16.5);
      officeGroup.add(northGlass);

      // Window Mullions (Aluminum structural frames)
      const mullionMat = new THREE.MeshStandardMaterial({ color: 0x0a1018, roughness: 0.4, metalness: 0.8 });
      for (let x = -22; x <= 22; x += 4) {
        const mul = new THREE.Mesh(new THREE.BoxGeometry(0.08, 4.2, 0.12), mullionMat);
        mul.position.set(x, 2.1, -16.5);
        officeGroup.add(mul);
      }

      // ================= 3. INTERIOR PARTITION WALLS & GLASS =================
      const drywallMat = new THREE.MeshStandardMaterial({ color: 0x182436, roughness: 0.8 });

      // Corridor Wall North (with double glass door openings)
      this.createWallWithDoor(officeGroup, [-22, -13], -3.6, drywallMat, glassMat, 'master');
      this.createWallWithDoor(officeGroup, [13, 22], -3.6, drywallMat, glassMat, 'alpha');

      // Corridor Wall South (with openings for Beta, Gamma, Delta)
      this.createWallWithDoor(officeGroup, [-22, -8], 3.6, drywallMat, glassMat, 'beta');
      this.createWallWithDoor(officeGroup, [-6, 6], 3.6, drywallMat, glassMat, 'gamma');
      this.createWallWithDoor(officeGroup, [8, 22], 3.6, drywallMat, glassMat, 'delta');

      // Room Demising Dividing Walls
      const dividerW1 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 4.2, 13), drywallMat);
      dividerW1.position.set(-5.5, 2.1, -10);
      dividerW1.castShadow = true;
      officeGroup.add(dividerW1);

      const dividerW2 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 4.2, 13), drywallMat);
      dividerW2.position.set(5.5, 2.1, -10);
      dividerW2.castShadow = true;
      officeGroup.add(dividerW2);

      const dividerW3 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 4.2, 13), drywallMat);
      dividerW3.position.set(-7.2, 2.1, 10);
      dividerW3.castShadow = true;
      officeGroup.add(dividerW3);

      const dividerW4 = new THREE.Mesh(new THREE.BoxGeometry(0.16, 4.2, 13), drywallMat);
      dividerW4.position.set(7.2, 2.1, 10);
      dividerW4.castShadow = true;
      officeGroup.add(dividerW4);

      // ================= 4. FURNISH ZONE 0: CENTRAL LOBBY =================
      this.buildLobbyConcourse(officeGroup);

      // ================= 5. FURNISH ROOM 1: MASTER EXECUTIVE SUITE =================
      this.buildMasterSuite(officeGroup);

      // ================= 6. FURNISH ROOM 2: TEAM ALPHA (ENGINEERING) =================
      this.buildTeamAlpha(officeGroup);

      // ================= 7. FURNISH ROOM 3: TEAM BETA (DESIGN & PRODUCT) =================
      this.buildTeamBeta(officeGroup);

      // ================= 8. FURNISH ROOM 4: TEAM GAMMA (DATA & AI) =================
      this.buildTeamGamma(officeGroup);

      // ================= 9. FURNISH ROOM 5: TEAM DELTA (MARKETING & OPS) =================
      this.buildTeamDelta(officeGroup);

      this.scene.add(officeGroup);
    }

    createWallWithDoor(parent, xRange, zPos, wallMat, glassMat, roomId) {
      const w = Math.abs(xRange[1] - xRange[0]);
      const midX = (xRange[0] + xRange[1]) / 2;

      // Solid drywall section
      const wall = new THREE.Mesh(new THREE.BoxGeometry(w * 0.6, 4.2, 0.12), wallMat);
      wall.position.set(midX - w * 0.2, 2.1, zPos);
      wall.castShadow = true;
      parent.add(wall);

      // Glass door portal with chrome handles
      const glassDoor = new THREE.Mesh(new THREE.BoxGeometry(w * 0.4, 4.0, 0.05), glassMat);
      glassDoor.position.set(midX + w * 0.3, 2.0, zPos);
      glassDoor.userData = { roomId: roomId };
      this.interactiveObjects.push(glassDoor);
      parent.add(glassDoor);
    }

    buildLobbyConcourse(parent) {
      const lobbyGroup = new THREE.Group();

      // 1. Curved Calacatta Marble Reception Desk
      const deskMat = new THREE.MeshStandardMaterial({ color: 0xf0f3f6, roughness: 0.35, metalness: 0.1 });
      const deskBase = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 1.05, 32, 1, false, 0, Math.PI), deskMat);
      deskBase.rotation.y = -Math.PI / 2;
      deskBase.position.set(0, 0.52, 0);
      deskBase.castShadow = true;
      lobbyGroup.add(deskBase);

      // Cyan Under-Glow Strip
      const trimMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const trim = new THREE.Mesh(new THREE.CylinderGeometry(2.42, 2.42, 0.04, 32, 1, false, 0, Math.PI), trimMat);
      trim.rotation.y = -Math.PI / 2;
      trim.position.set(0, 0.04, 0);
      lobbyGroup.add(trim);

      // 2. Large Brand Titanium Logo Wall
      const brandWallMat = new THREE.MeshStandardMaterial({ color: 0x0f1826, roughness: 0.4, metalness: 0.6 });
      const brandWall = new THREE.Mesh(new THREE.BoxGeometry(7, 3.2, 0.2), brandWallMat);
      brandWall.position.set(0, 1.8, -3.5);
      lobbyGroup.add(brandWall);

      // Glowing Corporate Signage Canvas
      const logoCanvas = document.createElement('canvas');
      logoCanvas.width = 1024;
      logoCanvas.height = 256;
      const ctx = logoCanvas.getContext('2d');
      ctx.fillStyle = '#0f1826';
      ctx.fillRect(0, 0, 1024, 256);
      ctx.font = 'bold 44px -apple-system, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText('GOJO ENTERPRISE', 512, 100);
      ctx.font = '700 24px monospace';
      ctx.fillStyle = '#00f0ff';
      ctx.fillText('FRIDAY AI RESEARCH CAMPUS • VIRTUAL HQ', 512, 160);

      const logoTex = new THREE.CanvasTexture(logoCanvas);
      const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(6.6, 1.6), new THREE.MeshBasicMaterial({ map: logoTex }));
      signMesh.position.set(0, 2.1, -3.38);
      lobbyGroup.add(signMesh);

      // 3. Lounge Furniture (Minimalist Leather Sofa & Table)
      const leatherMat = new THREE.MeshStandardMaterial({ color: 0x1b2432, roughness: 0.7 });
      const sofa = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.65, 0.85), leatherMat);
      sofa.position.set(-5.5, 0.32, 0);
      sofa.castShadow = true;
      lobbyGroup.add(sofa);

      const table = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.38, 24), new THREE.MeshStandardMaterial({ color: 0x121a24, metalness: 0.5 }));
      table.position.set(-3.6, 0.19, 0);
      lobbyGroup.add(table);

      // 4. Commercial Beverage & Pantry Station (Bean-to-cup Espresso, Cold Brew & Water)
      const counterMat = new THREE.MeshStandardMaterial({ color: 0x141f2e, roughness: 0.3 });
      const pantryBar = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.92, 0.9), counterMat);
      pantryBar.position.set(7.5, 0.46, -1.2);
      pantryBar.castShadow = true;
      lobbyGroup.add(pantryBar);

      // Stainless Steel Espresso Machine
      const espMat = new THREE.MeshStandardMaterial({ color: 0xd8e4f0, metalness: 0.9, roughness: 0.15 });
      const esp = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.48, 0.45), espMat);
      esp.position.set(6.8, 1.16, -1.2);
      lobbyGroup.add(esp);

      // Cold Brew Kegerator Tap
      const tapMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 });
      const tap = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.35, 12), tapMat);
      tap.position.set(7.8, 1.1, -1.2);
      lobbyGroup.add(tap);

      // Commercial Double-Door Glass Refrigerator
      const fridMat = new THREE.MeshStandardMaterial({ color: 0x0a121c, metalness: 0.85 });
      const fridge = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.1, 0.8), fridMat);
      fridge.position.set(9.8, 1.05, -1.2);
      lobbyGroup.add(fridge);

      // 5. OSHA First Aid & AED Emergency Station Wall
      const faMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const faBox = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.42, 0.12), faMat);
      faBox.position.set(5.5, 1.6, -3.38);
      lobbyGroup.add(faBox);

      // AED Unit Box
      const aedBox = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.35, 0.12), new THREE.MeshStandardMaterial({ color: 0x00aa44 }));
      aedBox.position.set(4.9, 1.6, -3.38);
      lobbyGroup.add(aedBox);

      // 6. Architectural Tropical Planter Islands
      this.createPlanter(lobbyGroup, [4.8, 0, 1.5]);
      this.createPlanter(lobbyGroup, [-4.8, 0, 1.5]);

      parent.add(lobbyGroup);
    }

    buildMasterSuite(parent) {
      const group = new THREE.Group();
      group.userData = { roomId: 'master' };

      // 1. Solid Walnut Executive Desk
      const walnutMat = new THREE.MeshStandardMaterial({ color: 0x2e1e12, roughness: 0.5, metalness: 0.1 });
      const desk = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.08, 1.2), walnutMat);
      desk.position.set(-13.5, 0.76, -11.5);
      desk.castShadow = true;
      group.add(desk);

      // Desk Metal Stanchion Legs
      const legMat = new THREE.MeshStandardMaterial({ color: 0x111620, metalness: 0.8, roughness: 0.3 });
      const legL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.72, 1.1), legMat);
      legL.position.set(-14.7, 0.36, -11.5);
      group.add(legL);
      const legR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.72, 1.1), legMat);
      legR.position.set(-12.3, 0.36, -11.5);
      group.add(legR);

      // Executive Leather Chair
      this.execChair = this.createChair(group, [-13.5, 0, -12.4], 0);

      // 2. 85" Real-Time Executive KPI Dashboard Display
      const dashCanvas = document.createElement('canvas');
      dashCanvas.width = 1024;
      dashCanvas.height = 576;
      const dashTex = new THREE.CanvasTexture(dashCanvas);
      this.animatedCanvases.push({
        canvas: dashCanvas,
        texture: dashTex,
        update: (time) => {
          const ctx = dashCanvas.getContext('2d');
          ctx.fillStyle = '#060e18';
          ctx.fillRect(0, 0, 1024, 576);
          // Header
          ctx.fillStyle = '#0f1f33';
          ctx.fillRect(0, 0, 1024, 56);
          ctx.fillStyle = '#00f0ff';
          ctx.font = 'bold 24px monospace';
          ctx.fillText('EXECUTIVE STRATEGY • ENTERPRISE NEURAL BUS', 32, 38);
          // Waveform
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let x = 0; x < 1024; x += 8) {
            const y = 280 + Math.sin(time * 4 + x * 0.02) * 65 + Math.cos(time * 6 + x * 0.01) * 35;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          // KPI Metric Cards
          ctx.fillStyle = 'rgba(0, 240, 255, 0.12)';
          ctx.fillRect(40, 390, 280, 140);
          ctx.fillRect(360, 390, 280, 140);
          ctx.fillRect(680, 390, 280, 140);
          ctx.font = 'bold 18px monospace';
          ctx.fillStyle = '#8b9bb4';
          ctx.fillText('QUANTUM BUS LOAD', 60, 430);
          ctx.fillText('ACTIVE AGENTS', 380, 430);
          ctx.fillText('NETWORK HEALTH', 700, 430);
          ctx.font = 'bold 42px monospace';
          ctx.fillStyle = '#00ff9d';
          ctx.fillText('94.8%', 60, 490);
          ctx.fillText('18 + 1 BRAIN', 380, 490);
          ctx.fillText('100.0%', 700, 490);
        }
      });

      const dashMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 2.0),
        new THREE.MeshBasicMaterial({ map: dashTex })
      );
      dashMesh.position.set(-13.5, 2.2, -15.8);
      group.add(dashMesh);

      // 3. Bookshelf Credenza with Books & Arc Reactor
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.8, 0.45), walnutMat);
      shelf.position.set(-19.5, 1.4, -10.5);
      shelf.rotation.y = Math.PI / 2;
      group.add(shelf);

      // Mini Glowing Arc Reactor Core on Credenza
      const coreLight = new THREE.PointLight(0x00f0ff, 0.8, 3);
      coreLight.position.set(-19.2, 1.8, -10.5);
      group.add(coreLight);

      // Procedural/GLTF Typing Avatar at Executive Desk
      this.createAvatar(group, [-13.5, 0, -12.4], 0, 'AGENT-00 (MASTER)', this.execChair);

      this.interactiveObjects.push(desk);
      parent.add(group);
    }

    buildTeamAlpha(parent) {
      const group = new THREE.Group();
      group.userData = { roomId: 'alpha' };

      // 1. Modular Benching Desks (4 Facing Workstations)
      const deskMat = new THREE.MeshStandardMaterial({ color: 0x162232, roughness: 0.5 });
      const deskPod = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.08, 2.4), deskMat);
      deskPod.position.set(13.5, 0.76, -10.5);
      deskPod.castShadow = true;
      group.add(deskPod);

      // Multi-Monitor Displays
      const monMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
      for (let i = 0; i < 4; i++) {
        const mx = 12.0 + (i % 2) * 3.0;
        const mz = -11.4 + Math.floor(i / 2) * 1.8;
        const mon = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.5, 0.03), monMat);
        mon.position.set(mx, 1.25, mz);
        group.add(mon);

        // Seated Ergonomic Task Chair
        const taskChair = this.createChair(group, [mx, 0, mz + (i < 2 ? -0.8 : 0.8)], i < 2 ? 0 : Math.PI);
        // Seated avatar
        this.createAvatar(group, [mx, 0, mz + (i < 2 ? -0.8 : 0.8)], i < 2 ? 0 : Math.PI, `ALPHA-0${i + 1}`, taskChair);
      }

      // 2. 42U Server Rack Cabinet with Blinking LEDs & Centralized UPS
      const rackMat = new THREE.MeshStandardMaterial({ color: 0x080c14, metalness: 0.85, roughness: 0.25 });
      const rack = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.4, 0.9), rackMat);
      rack.position.set(19.8, 1.2, -14.5);
      group.add(rack);

      // Register Server Rack Dynamics (Spinning cooling fan & pinging switch LEDs)
      if (window.OfficeAnimationEngine && window.OfficeAnimationEngine.ServerRackDynamics) {
        const srd = new window.OfficeAnimationEngine.ServerRackDynamics(rack);
        this.serverRackDynamics.push(srd);
      }

      // Blinking Rack Status Lights
      const rackLight = new THREE.PointLight(0x00ff88, 0.7, 4);
      rackLight.position.set(19.2, 1.4, -14.5);
      group.add(rackLight);

      // Dual-ISP Redundant Fiber Conduits (Primary Cyan + Failover Amber)
      const fiberMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const fiberMat2 = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
      const fGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.2, 8);
      const f1 = new THREE.Mesh(fGeo, fiberMat1);
      f1.position.set(20.2, 1.1, -13.8);
      group.add(f1);
      const f2 = new THREE.Mesh(fGeo, fiberMat2);
      f2.position.set(20.3, 1.1, -13.8);
      group.add(f2);

      // Red FM-200 Clean Agent Fire Suppression Canister
      const fmMat = new THREE.MeshStandardMaterial({ color: 0xdd1111, roughness: 0.3 });
      const fmCan = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.9, 16), fmMat);
      fmCan.position.set(18.5, 0.45, -14.5);
      group.add(fmCan);

      // 3. Wall-Mounted Glass Whiteboard
      const wbMat = new THREE.MeshPhysicalMaterial({ color: 0xf5faff, transparent: true, opacity: 0.85, roughness: 0.1 });
      const wb = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.8, 0.04), wbMat);
      wb.position.set(13.5, 2.1, -16.2);
      group.add(wb);

      this.interactiveObjects.push(deskPod);
      parent.add(group);
    }

    buildTeamBeta(parent) {
      const group = new THREE.Group();
      group.userData = { roomId: 'beta' };

      // 1. Motorized Standing Desks with Ultrawide Displays
      const deskMat = new THREE.MeshStandardMaterial({ color: 0xf0f3f6, roughness: 0.4 });
      for (let i = 0; i < 3; i++) {
        const dx = -18.0 + i * 3.6;
        const desk = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.06, 0.9), deskMat);
        desk.position.set(dx, 1.05, 11.5);
        desk.castShadow = true;
        group.add(desk);

        // Curved Ultrawide Display
        const disp = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.45, 0.04), new THREE.MeshBasicMaterial({ color: 0xb05cff }));
        disp.position.set(dx, 1.5, 11.2);
        group.add(disp);

        // Drafting Stool
        const betaChair = this.createChair(group, [dx, 0, 12.4], Math.PI);
        this.createAvatar(group, [dx, 0, 12.4], Math.PI, `BETA-0${i + 1}`, betaChair);
      }

      // 2. Collaborative Touch Design Table
      const table = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.85, 1.6), new THREE.MeshStandardMaterial({ color: 0x141e2a }));
      table.position.set(-14.0, 0.42, 6.5);
      group.add(table);

      // 3. Wall-Mounted Mood Boards
      const moodCanvas = document.createElement('canvas');
      moodCanvas.width = 512;
      moodCanvas.height = 256;
      const mctx = moodCanvas.getContext('2d');
      mctx.fillStyle = '#101826';
      mctx.fillRect(0, 0, 512, 256);
      mctx.fillStyle = '#00f0ff';
      mctx.fillRect(20, 20, 80, 80);
      mctx.fillStyle = '#b05cff';
      mctx.fillRect(120, 20, 80, 80);
      mctx.fillStyle = '#00ff9d';
      mctx.fillRect(220, 20, 80, 80);
      mctx.fillStyle = '#ffffff';
      mctx.font = 'bold 18px monospace';
      mctx.fillText('DESIGN SYSTEM TOKENS v3.0', 20, 150);

      const moodMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.6), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(moodCanvas) }));
      moodMesh.position.set(-14.0, 2.2, 16.2);
      moodMesh.rotation.y = Math.PI;
      group.add(moodMesh);

      // 4. Acoustic Phone Booth / Micro-Pod (32 dB Sound Isolation)
      const boothMat = new THREE.MeshStandardMaterial({ color: 0x0e1826, metalness: 0.6 });
      const booth = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 1.2), boothMat);
      booth.position.set(-8.5, 1.1, 14.5);
      group.add(booth);
      // Glass door
      const bgDoor = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 2.0), new THREE.MeshPhysicalMaterial({ color: 0x00ff9d, transparent: true, opacity: 0.35 }));
      bgDoor.position.set(-8.5, 1.1, 13.89);
      group.add(bgDoor);
      // Beacon LED (Green = Available)
      const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.04), new THREE.MeshBasicMaterial({ color: 0x00ff9d }));
      beacon.position.set(-8.5, 2.22, 14.2);
      group.add(beacon);


      parent.add(group);
    }

    buildTeamGamma(parent) {
      const group = new THREE.Group();
      group.userData = { roomId: 'gamma' };

      // 1. Hexagonal / Circular Neural Training Pod Desks
      const podMat = new THREE.MeshStandardMaterial({ color: 0x0c1624, roughness: 0.45 });
      const pod = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.78, 6), podMat);
      pod.position.set(0, 0.39, 10.5);
      pod.castShadow = true;
      group.add(pod);

      // 2. 4-Screen Neural Loss Curve Video Wall
      const wallMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const videoWall = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.2, 0.08), wallMat);
      videoWall.position.set(0, 2.3, 16.2);
      videoWall.rotation.y = Math.PI;
      group.add(videoWall);

      // 3. High-Performance GPU Towers under desk
      for (let i = 0; i < 4; i++) {
        const ang = (i / 4) * Math.PI * 2;
        const gx = Math.cos(ang) * 1.6;
        const gz = 10.5 + Math.sin(ang) * 1.6;
        const gpu = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.48, 0.44), new THREE.MeshStandardMaterial({ color: 0x050a12, metalness: 0.9 }));
        gpu.position.set(gx, 0.24, gz);
        group.add(gpu);

        const gammaChair = this.createChair(group, [Math.cos(ang) * 2.6, 0, 10.5 + Math.sin(ang) * 2.6], ang + Math.PI);
        this.createAvatar(group, [Math.cos(ang) * 2.6, 0, 10.5 + Math.sin(ang) * 2.6], ang + Math.PI, `GAMMA-0${i + 1}`, gammaChair);
      }

      this.interactiveObjects.push(pod);
      parent.add(group);
    }

    buildTeamDelta(parent) {
      const group = new THREE.Group();
      group.userData = { roomId: 'delta' };

      // 1. Large 8-Person Boardroom Conference Table
      const confMat = new THREE.MeshStandardMaterial({ color: 0x141e2b, roughness: 0.3, metalness: 0.4 });
      const table = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.08, 1.8), confMat);
      table.position.set(14.5, 0.76, 10.5);
      table.castShadow = true;
      group.add(table);

      // 8 Executive Meeting Chairs
      for (let i = 0; i < 3; i++) {
        const cx = 13.0 + i * 1.5;
        this.createChair(group, [cx, 0, 9.2], 0);
        this.createChair(group, [cx, 0, 11.8], Math.PI);
      }
      this.createChair(group, [11.8, 0, 10.5], Math.PI / 2);
      this.createChair(group, [17.2, 0, 10.5], -Math.PI / 2);

      // 2. 75" Presentation Display
      const presMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
      const presMesh = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 0.05), presMat);
      presMesh.position.set(14.5, 2.2, 16.2);
      presMesh.rotation.y = Math.PI;
      group.add(presMesh);

      // Dedicated 4K PTZ Video Bar & Beamforming Microphone Array
      const ptzBar = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.16, 0.14),
        new THREE.MeshStandardMaterial({ color: 0x182434, metalness: 0.8, roughness: 0.3 })
      );
      ptzBar.position.set(14.5, 1.15, 16.2);
      group.add(ptzBar);

      // PTZ Camera Lens & Mic Indicator LED
      const ptzLens = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16), new THREE.MeshBasicMaterial({ color: 0x00ff9d }));
      ptzLens.rotation.x = Math.PI / 2;
      ptzLens.position.set(14.5, 1.15, 16.12);
      group.add(ptzLens);

      // External 10.1" Digital Room-Booking Panel Tablet outside door
      const panelMat = new THREE.MeshStandardMaterial({ color: 0x0a1422, metalness: 0.7 });
      const bookPanel = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.24, 0.04), panelMat);
      bookPanel.position.set(7.8, 1.5, 3.8);
      group.add(bookPanel);
      // Panel screen (Red = Reserved)
      const bookScr = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.21), new THREE.MeshBasicMaterial({ color: 0xff3344 }));
      bookScr.position.set(7.8, 1.5, 3.77);
      group.add(bookScr);

      // 3. World Clock Array (5 Mini Clocks)
      const clockMat = new THREE.MeshStandardMaterial({ color: 0x0a121e });
      for (let c = 0; c < 5; c++) {
        const clk = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.04, 16), clockMat);
        clk.rotation.x = Math.PI / 2;
        clk.position.set(11.5 + c * 1.4, 3.2, 16.2);
        group.add(clk);
      }

      this.interactiveObjects.push(table);
      parent.add(group);
    }

    /**
     * Herman Miller Aeron Style Ergonomic Mesh Task Chair:
     * - 5-star aluminum base with 5 arched radial spokes and dual-wheel urethane castors
     * - Hydraulic gas-lift cylinder with height adjustment lever
     * - Synchronized tilt mechanism box
     * - Breathable contoured mesh seat pan with waterfall front
     * - Y-spine suspension frame with tensioned mesh backrest
     * - Dual-zone posture-fit curved lumbar support pad with dial
     * - 4D adjustable armrests with soft polyurethane pads
     */
    createChair(parent, pos, rotY = 0) {
      const chairGroup = new THREE.Group();
      chairGroup.position.set(pos[0], pos[1], pos[2]);
      chairGroup.rotation.y = rotY;

      const aluminumMat = new THREE.MeshStandardMaterial({
        color: 0x101a28,
        metalness: 0.88,
        roughness: 0.24,
        envMapIntensity: 1.4
      });

      const meshMat = new THREE.MeshStandardMaterial({
        color: 0x0b131e,
        roughness: 0.88,
        metalness: 0.12
      });

      const softArmMat = new THREE.MeshStandardMaterial({
        color: 0x060a10,
        roughness: 0.75,
        metalness: 0.05
      });

      // 1. 5-Star Die-Cast Aluminum Castor Base
      const baseCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16), aluminumMat);
      baseCenter.position.y = 0.08;
      chairGroup.add(baseCenter);

      const numLegs = 5;
      const legRadius = 0.30;
      for (let i = 0; i < numLegs; i++) {
        const angle = (i / numLegs) * Math.PI * 2;
        const legCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.08, 0),
          new THREE.Vector3(Math.cos(angle) * 0.16, 0.07, Math.sin(angle) * 0.16),
          new THREE.Vector3(Math.cos(angle) * legRadius, 0.04, Math.sin(angle) * legRadius)
        ]);
        const legMesh = new THREE.Mesh(new THREE.TubeGeometry(legCurve, 10, 0.014, 8, false), aluminumMat);
        chairGroup.add(legMesh);

        // Castor
        const castor = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.016, 12), new THREE.MeshStandardMaterial({ color: 0x040810, roughness: 0.4 }));
        castor.rotation.z = Math.PI / 2;
        castor.position.set(Math.cos(angle) * legRadius, 0.024, Math.sin(angle) * legRadius);
        chairGroup.add(castor);
      }

      // 2. Central Hydraulic Cylinder
      const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.026, 0.36, 16), aluminumMat);
      cyl.position.y = 0.26;
      chairGroup.add(cyl);

      // Height Lever
      const lever = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.008, 0.016), aluminumMat);
      lever.position.set(0.12, 0.42, 0);
      chairGroup.add(lever);

      // 3. Tilt Mechanism Box
      const mech = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.07, 0.22), aluminumMat);
      mech.position.y = 0.43;
      chairGroup.add(mech);

      // 4. Ergonomic Waterfall Mesh Seat Pan
      const seatGroup = new THREE.Group();
      seatGroup.position.set(0, 0.48, 0);
      const seatFrame = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.04, 0.46), aluminumMat);
      seatGroup.add(seatFrame);
      const seatMesh = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.025, 0.42), meshMat);
      seatMesh.position.y = 0.01;
      seatMesh.castShadow = true;
      seatGroup.add(seatMesh);
      chairGroup.add(seatGroup);

      // 5. High-Back Spine Suspension Frame & Tensioned Mesh Backrest
      const backGroup = new THREE.Group();
      backGroup.position.set(0, 0.78, 0.21);
      backGroup.rotation.x = 0.12;

      const spineArch = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.54, 0.035), aluminumMat);
      backGroup.add(spineArch);
      const backMesh = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.50, 0.015), meshMat);
      backMesh.position.z = -0.01;
      backMesh.castShadow = true;
      backGroup.add(backMesh);

      // 6. Dual-Zone Posture-Fit Lumbar Support Pad
      const lumbarPad = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.08, 0.025), new THREE.MeshStandardMaterial({ color: 0x050a12, roughness: 0.6 }));
      lumbarPad.position.set(0, -0.08, 0.02);
      backGroup.add(lumbarPad);

      const lumbarDial = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.02, 12), new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
      lumbarDial.rotation.x = Math.PI / 2;
      lumbarDial.position.set(0, -0.08, 0.04);
      backGroup.add(lumbarDial);

      // Headrest
      const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.11, 0.035), meshMat);
      headrest.position.set(0, 0.32, 0.02);
      backGroup.add(headrest);

      chairGroup.add(backGroup);

      // 7. 4D Adjustable Armrests
      for (let a = -1; a <= 1; a += 2) {
        const stanchion = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.22, 12), aluminumMat);
        stanchion.position.set(a * 0.26, 0.56, 0.02);
        chairGroup.add(stanchion);

        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.024, 0.20), softArmMat);
        pad.position.set(a * 0.26, 0.67, 0.04);
        chairGroup.add(pad);
      }

      chairGroup.userData.baseRotY = rotY;
      parent.add(chairGroup);
      return chairGroup;
    }

    /**
     * Realistic Potted Monstera Deliciosa Plant:
     * - Solid walnut tripod stand with cross-ring
     * - Modern cylindrical white ceramic planter with clearcoat
     * - Rich dark organic soil
     * - Curved organic stalks with broad Monstera leaves featuring venation and fenestrations
     */
    createPlanter(parent, pos) {
      const plantGroup = new THREE.Group();
      plantGroup.position.set(pos[0], 0, pos[1]);

      const pbr = window.OfficePBRTextures || {};
      const leafPBR = pbr.createMonsteraLeaf ? pbr.createMonsteraLeaf(512, 512) : null;
      const walnutWood = pbr.createWalnutWood ? pbr.createWalnutWood(512, 256, false) : null;

      // 1. Walnut Tripod Stand
      const standMat = new THREE.MeshStandardMaterial({
        color: 0x241810,
        map: walnutWood?.diffuseMap || null,
        roughness: 0.65,
        metalness: 0.05
      });
      for (let s = 0; s < 3; s++) {
        const angle = (s / 3) * Math.PI * 2;
        const standLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.38, 12), standMat);
        standLeg.position.set(Math.cos(angle) * 0.18, 0.19, Math.sin(angle) * 0.18);
        plantGroup.add(standLeg);
      }
      const standRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.012, 8, 24), standMat);
      standRing.rotation.x = Math.PI / 2;
      standRing.position.y = 0.22;
      plantGroup.add(standRing);

      // 2. Modern Matte White Ceramic Planter Pot
      const potMat = new THREE.MeshPhysicalMaterial({
        color: 0xf0f2f5,
        roughness: 0.25,
        metalness: 0.02,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
        envMapIntensity: 1.2
      });
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.20, 0.44, 32), potMat);
      pot.position.y = 0.40;
      pot.castShadow = true;
      pot.receiveShadow = true;
      plantGroup.add(pot);

      // 3. Rich Organic Dark Soil Substrate
      const soil = new THREE.Mesh(new THREE.CircleGeometry(0.22, 24), new THREE.MeshStandardMaterial({ color: 0x140e0a, roughness: 0.95 }));
      soil.rotation.x = -Math.PI / 2;
      soil.position.y = 0.60;
      plantGroup.add(soil);

      // 4. Curved Organic Monstera Stalks & Fenestrated Broad Leaves
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x194d2e, roughness: 0.6 });
      const leafMat = new THREE.MeshStandardMaterial({
        color: 0x1e663a,
        map: leafPBR?.diffuseMap || null,
        roughness: 0.28,
        metalness: 0.04,
        side: THREE.DoubleSide
      });

      const leafConfigs = [
        { height: 0.80, spread: 0.24, rotY: 0.3, rotX: 0.35, scale: 1.1 },
        { height: 0.94, spread: 0.30, rotY: 1.6, rotX: 0.42, scale: 1.25 },
        { height: 0.72, spread: 0.26, rotY: 2.8, rotX: 0.38, scale: 0.95 },
        { height: 0.88, spread: 0.32, rotY: 4.1, rotX: 0.45, scale: 1.2 },
        { height: 0.68, spread: 0.22, rotY: 5.3, rotX: 0.32, scale: 0.85 }
      ];

      leafConfigs.forEach(cfg => {
        const stemCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.60, 0),
          new THREE.Vector3(Math.cos(cfg.rotY) * (cfg.spread * 0.4), cfg.height * 0.7, Math.sin(cfg.rotY) * (cfg.spread * 0.4)),
          new THREE.Vector3(Math.cos(cfg.rotY) * cfg.spread, cfg.height, Math.sin(cfg.rotY) * cfg.spread)
        ]);
        const stem = new THREE.Mesh(new THREE.TubeGeometry(stemCurve, 12, 0.007, 6, false), stemMat);
        plantGroup.add(stem);

        const bladeGeo = new THREE.PlaneGeometry(0.24 * cfg.scale, 0.38 * cfg.scale, 6, 6);
        const leaf = new THREE.Mesh(bladeGeo, leafMat);
        leaf.position.set(Math.cos(cfg.rotY) * cfg.spread, cfg.height, Math.sin(cfg.rotY) * cfg.spread);
        leaf.rotation.set(cfg.rotX, cfg.rotY, -0.2);
        leaf.castShadow = true;
        plantGroup.add(leaf);
      });

      parent.add(plantGroup);
    }

    createAvatar(parent, pos, rotY = 0, agentId = null, chair = null) {
      const assignedId = agentId || `AGENT-${this.characterAgents.length + 1}`;

      // 1. If GLTFLoader is available, try loading downloaded GLB model
      if (typeof THREE.GLTFLoader !== 'undefined' && !this._gltfLoadAttempted) {
        this._gltfLoadAttempted = true;
        const loader = new THREE.GLTFLoader();
        const paths = ['/models/office_worker.glb', 'models/office_worker.glb', 'public/models/office_worker.glb'];
        const tryNext = (idx) => {
          if (idx >= paths.length) return;
          loader.load(
            paths[idx],
            (gltf) => {
              console.log(`VirtualOffice: Successfully loaded 3D GLB model from ${paths[idx]}`);
              const model = gltf.scene || gltf.scenes[0];
              model.traverse((c) => {
                if (c.isMesh) {
                  c.castShadow = true;
                  c.receiveShadow = true;
                  if (c.material) {
                    c.material.roughness = Math.max(0.35, c.material.roughness || 0.5);
                    if (this.scene.environment) {
                      c.material.envMap = this.scene.environment;
                    }
                  }
                }
              });

              // Normalize scale
              const box = new THREE.Box3().setFromObject(model);
              const size = new THREE.Vector3();
              box.getSize(size);
              const maxDim = Math.max(size.x, size.y, size.z);
              model.scale.setScalar(1.4 / (maxDim || 1));
              model.position.set(pos[0], pos[1] + 0.46, pos[2]);
              model.rotation.y = rotY;

              if (gltf.animations && gltf.animations.length > 0) {
                const mixer = new THREE.AnimationMixer(model);
                let clip = gltf.animations.find(a => /typing|work|loop|idle|code/i.test(a.name)) || gltf.animations[0];
                const action = mixer.clipAction(clip);
                action.setLoop(THREE.LoopRepeat);
                action.reset().fadeIn(0.5).play();
                this.mixers.push(mixer);

                if (window.OfficeAnimationEngine && window.OfficeAnimationEngine.CharacterAgent) {
                  const agent = new window.OfficeAnimationEngine.CharacterAgent(
                    assignedId,
                    model,
                    {
                      isProcedural: false,
                      mixer: mixer,
                      currentAction: action,
                      chair: chair
                    }
                  );
                  this.characterAgents.push(agent);
                }
              }
              parent.add(model);
            },
            undefined,
            () => tryNext(idx + 1)
          );
        };
        tryNext(0);
      }

      // 2. High-Fidelity Procedural Typing Humanoid Avatar
      const avatar = new THREE.Group();
      avatar.position.set(pos[0], pos[1] + 0.48, pos[2]);
      avatar.rotation.y = rotY;

      const shirtMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.5 });
      const skinMat = new THREE.MeshStandardMaterial({ color: 0xffd5b5, roughness: 0.6 });
      const pantsMat = new THREE.MeshStandardMaterial({ color: 0x141f2e, roughness: 0.85 });

      // Torso
      const torso = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.36, 0.22), shirtMat);
      torso.position.y = 0.26;
      avatar.add(torso);

      // Head
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), skinMat);
      head.position.y = 0.54;
      avatar.add(head);

      // Thighs
      const thighL = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.10, 0.30), pantsMat);
      thighL.position.set(-0.08, 0.05, -0.12);
      avatar.add(thighL);
      const thighR = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.10, 0.30), pantsMat);
      thighR.position.set(0.08, 0.05, -0.12);
      avatar.add(thighR);

      // Articulated Arms for Typing Loop
      const armL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.06), shirtMat);
      armL.position.set(-0.19, 0.24, -0.08);
      armL.rotation.x = 0.8;
      avatar.add(armL);

      const armR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.06), shirtMat);
      armR.position.set(0.19, 0.24, -0.08);
      armR.rotation.x = 0.8;
      avatar.add(armR);

      this.proceduralAvatars.push({ avatar, armL, armR });

      // Register with CharacterAgent controller
      if (window.OfficeAnimationEngine && window.OfficeAnimationEngine.CharacterAgent) {
        const agent = new window.OfficeAnimationEngine.CharacterAgent(
          assignedId,
          avatar,
          {
            isProcedural: true,
            proceduralParts: { spine: torso, head, armL, armR, thighL, thighR },
            chair: chair
          }
        );
        this.characterAgents.push(agent);
      }

      parent.add(avatar);
    }

    setupRaycasting() {
      const onPointerDown = (e) => {
        if (this.cameraMode === 'firstperson' && this.fpControls.isLocked) return;
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);

        if (intersects.length > 0) {
          let obj = intersects[0].object;
          while (obj && !obj.userData.roomId && obj.parent) {
            obj = obj.parent;
          }
          if (obj && obj.userData.roomId) {
            this.selectRoom(obj.userData.roomId);
          }
        }
      };

      const onPointerMove = (e) => {
        if (this.cameraMode === 'firstperson' && this.fpControls.isLocked) return;
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);

        if (intersects.length > 0) {
          const hitPt = intersects[0].point;
          let nearestAgent = null;
          let minDist = 7.0;

          this.characterAgents.forEach(agent => {
            const agentPos = new THREE.Vector3();
            if (agent.model) agent.model.getWorldPosition(agentPos);
            const dist = agentPos.distanceTo(hitPt);
            if (dist < minDist) {
              minDist = dist;
              nearestAgent = agent;
            }
          });

          this.characterAgents.forEach(agent => {
            if (agent === nearestAgent) {
              agent.setTargetTracking(this.camera.position);
              if (agent.chair) agent.chairSpring.targetYaw = (Math.random() - 0.5) * 0.07;
            } else {
              agent.setTargetTracking(null);
            }
          });
        } else {
          this.characterAgents.forEach(agent => agent.setTargetTracking(null));
        }
      };

      window.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
    }

    selectRoom(roomId) {
      const data = ROOM_DATA[roomId] || ROOM_DATA.overview;
      this.activeRoomId = roomId;

      // Update Top Nav Pills
      document.querySelectorAll('.nav-pill').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-room') === roomId);
      });

      // Animate Camera to Room Anchor via Cubic-Bezier Controller
      if (this.cameraController) {
        this.cameraController.glideTo(data.camPos, data.target, 1.4);
      } else {
        this.tweenCamera(data.camPos, data.target);
      }

      // Display Sliding Dossier Card
      this.updateDossierCard(data);
    }

    tweenCamera(targetPos, targetLookAt) {
      this.camTween.active = true;
      this.camTween.progress = 0;
      this.camTween.startPos.copy(this.camera.position);
      this.camTween.endPos.set(targetPos.x, targetPos.y, targetPos.z);
      this.camTween.startTarget.copy(this.orbitControls.target);
      this.camTween.endTarget.set(targetLookAt.x, targetLookAt.y, targetLookAt.z);
    }

    updateDossierCard(data) {
      const card = document.getElementById('roomDossierCard');
      if (!card) return;

      document.getElementById('dossierZoneTag').textContent = data.zone;
      document.getElementById('dossierTitle').textContent = data.name;
      document.getElementById('dossierDesc').textContent = data.desc;

      const grid = document.getElementById('dossierSpecsGrid');
      grid.innerHTML = data.kpis.map(k => `
        <div class="dossier-spec-box">
          <div class="spec-box-lbl">${k.label}</div>
          <div class="spec-box-val">${k.val}</div>
        </div>
      `).join('');

      document.getElementById('dossierPctVal').textContent = `${data.progress}%`;
      document.getElementById('dossierBarFill').style.width = `${data.progress}%`;

      card.classList.add('visible');
    }

    setupFirstPersonControls() {
      const onKeyDown = (e) => {
        switch (e.code) {
          case 'KeyW': case 'ArrowUp': this.fpControls.moveForward = true; break;
          case 'KeyS': case 'ArrowDown': this.fpControls.moveBackward = true; break;
          case 'KeyA': case 'ArrowLeft': this.fpControls.moveLeft = true; break;
          case 'KeyD': case 'ArrowRight': this.fpControls.moveRight = true; break;
        }
      };

      const onKeyUp = (e) => {
        switch (e.code) {
          case 'KeyW': case 'ArrowUp': this.fpControls.moveForward = false; break;
          case 'KeyS': case 'ArrowDown': this.fpControls.moveBackward = false; break;
          case 'KeyA': case 'ArrowLeft': this.fpControls.moveLeft = false; break;
          case 'KeyD': case 'ArrowRight': this.fpControls.moveRight = false; break;
        }
      };

      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);
    }

    setCameraMode(mode) {
      this.cameraMode = mode;
      const btn = document.getElementById('btnToggleCamMode');
      if (mode === 'firstperson') {
        if (this.orbitControls) this.orbitControls.enabled = false;
        this.camera.position.set(0, 1.65, 4); // Eye level
        if (btn) btn.innerHTML = '🚶 WALKTHROUGH';
      } else {
        if (this.orbitControls) this.orbitControls.enabled = true;
        if (btn) btn.innerHTML = '🎥 ORBIT VIEW';
      }
    }

    setupUI() {
      // Room Nav Pills
      document.querySelectorAll('.nav-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const roomId = pill.getAttribute('data-room');
          this.selectRoom(roomId);
        });
      });

      // Camera Mode Toggle (Orbit vs Walkthrough)
      const btnCam = document.getElementById('btnToggleCamMode');
      if (btnCam) {
        btnCam.addEventListener('click', () => {
          this.setCameraMode(this.cameraMode === 'orbit' ? 'firstperson' : 'orbit');
        });
      }

      // Lighting Mode Toggle (Daylight vs Cyber Night)
      const btnLight = document.getElementById('btnToggleLight');
      if (btnLight) {
        btnLight.addEventListener('click', () => {
          this.setLightingMode(this.lightingMode === 'day' ? 'night' : 'day');
        });
      }

      // Close Dossier Card
      const btnCloseDossier = document.getElementById('btnCloseDossier');
      if (btnCloseDossier) {
        btnCloseDossier.addEventListener('click', () => {
          const card = document.getElementById('roomDossierCard');
          if (card) card.classList.remove('visible');
        });
      }

      // Reset Camera
      const btnReset = document.getElementById('btnResetView');
      if (btnReset) {
        btnReset.addEventListener('click', () => {
          this.selectRoom('overview');
        });
      }
    }

    updateMinimap() {
      const canvas = document.getElementById('minimapCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#060c16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floor boundary
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      // Rooms
      ctx.fillStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.fillRect(14, 14, 45, 35); // Master
      ctx.fillRect(90, 14, 45, 35); // Alpha
      ctx.fillRect(14, 60, 38, 35); // Beta
      ctx.fillRect(56, 60, 38, 35); // Gamma
      ctx.fillRect(98, 60, 38, 35); // Delta

      // Camera Blip
      const cx = (this.camera.position.x / 48 + 0.5) * (canvas.width - 20) + 10;
      const cz = (this.camera.position.z / 36 + 0.5) * (canvas.height - 20) + 10;

      ctx.fillStyle = '#00ff9d';
      ctx.beginPath();
      ctx.arc(cx, cz, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      const delta = this.clock.getDelta();
      const time = this.clock.getElapsedTime();

      // 1. Camera Tween Interpolation
      if (this.camTween.active) {
        this.camTween.progress += delta / this.camTween.duration;
        const t = Math.min(1.0, this.camTween.progress);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        this.camera.position.lerpVectors(this.camTween.startPos, this.camTween.endPos, ease);
        this.orbitControls.target.lerpVectors(this.camTween.startTarget, this.camTween.endTarget, ease);

        if (t >= 1.0) {
          this.camTween.active = false;
        }
      }

      // 2. First-Person Walkthrough Movement
      if (this.cameraMode === 'firstperson' && !this.camTween.active) {
        const speed = 6.5;
        this.fpControls.velocity.x -= this.fpControls.velocity.x * 10.0 * delta;
        this.fpControls.velocity.z -= this.fpControls.velocity.z * 10.0 * delta;

        this.fpControls.direction.z = Number(this.fpControls.moveForward) - Number(this.fpControls.moveBackward);
        this.fpControls.direction.x = Number(this.fpControls.moveRight) - Number(this.fpControls.moveLeft);
        this.fpControls.direction.normalize();

        if (this.fpControls.moveForward || this.fpControls.moveBackward) {
          this.fpControls.velocity.z -= this.fpControls.direction.z * speed * delta;
        }
        if (this.fpControls.moveLeft || this.fpControls.moveRight) {
          this.fpControls.velocity.x -= this.fpControls.direction.x * speed * delta;
        }

        this.camera.translateZ(this.fpControls.velocity.z);
        this.camera.translateX(this.fpControls.velocity.x);
        this.camera.position.y = 1.65; // Clamp height at human eye level

        // Perimeter bounds clamp
        this.camera.position.x = Math.max(-21, Math.min(21, this.camera.position.x));
        this.camera.position.z = Math.max(-15, Math.min(15, this.camera.position.z));
      }

      // 3. Update Character Agents (De-synchronized burst typing, spine breathing, chair swivel, head tracking)
      this.characterAgents.forEach(a => a.update(delta, time, this.camera));

      // 4. Update GLTF AnimationMixers
      this.mixers.forEach(m => m.update(delta));

      // 5. Update Network Data Packet Trails
      if (this.packetTrails) {
        this.packetTrails.update(delta, time);
      }

      // 6. Update HVAC Airflow & Floating Dust Motes
      if (this.dustMotes) {
        this.dustMotes.update(delta, time);
      }

      // 7. Update Server Rack Dynamics (Spinning fans & blinking LEDs)
      this.serverRackDynamics.forEach(s => s.update(delta, time));

      // 8. Update Cinematic Camera Controller (Cubic-Bezier glide & idle breathing float)
      if (this.cameraController && this.cameraMode === 'orbit') {
        this.cameraController.update(delta, time);
      }

      // 9. Update Dynamic Canvas Monitors
      this.animatedCanvases.forEach(ac => {
        ac.update(time);
        ac.texture.needsUpdate = true;
      });

      // 10. Update OrbitControls
      if (this.cameraMode === 'orbit' && this.orbitControls) {
        this.orbitControls.update();
      }

      // 11. Update Minimap
      this.updateMinimap();

      // 8. Render Scene via Post-Processing EffectComposer or WebGLRenderer
      if (this.composer) {
        this.composer.render(delta);
      } else {
        this.renderer.render(this.scene, this.camera);
      }
    }

    onWindowResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      if (this.composer) {
        this.composer.setSize(w, h);
      }
    }
  }

  // Auto-launch on DOMContentLoaded
  window.addEventListener('DOMContentLoaded', () => {
    window.virtualOffice = new VirtualOfficeApp();
  });
})();
