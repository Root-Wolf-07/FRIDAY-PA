/**
 * FRIDAY Tactical HUD - Photorealistic 3D Virtual Cyber Office & GLTF Character Engine
 *
 * Implements high-end real-world tech office visuals:
 * 1. Studio/City HDRI Environment Map via PMREMGenerator for realistic metal & glass IBL reflections.
 * 2. ACESFilmicToneMapping, exposure 1.1, sRGB color space & PCFSoftShadowMap.
 * 3. Photorealistic lighting: soft window daylight (RectAreaLight/diffuse directional), 3800K recessed LED track lights.
 * 4. PBR Materials: Matte black walnut wood, commercial carpet tiles, polished concrete, plaster drywall, brushed aluminum, physical glass.
 * 5. Props: Herman Miller-style ergonomic mesh task chair (5-star castor base, dual lumbar), thin-bezel dual monitors on pneumatic arms,
 *    low-profile mechanical keyboard, oversized stitched desk mat, cable grommet with braided cables, ceramic coffee mug, potted Monstera plant.
 * 6. Avatar: Loads /models/office_worker.glb with typing animation mixer aligned to keyboard, with high-fidelity procedural avatar fallback.
 * 7. Post-Processing: EffectComposer with selective Bloom, Screen-Space Ambient Occlusion (SSAO), subtle Chromatic Aberration & Film Grain.
 */

(function () {
  'use strict';

  class Office3DScene {
    constructor(containerId, options = {}) {
      this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      this.options = {
        modelPath: 'models/office_worker.glb',
        fallbackModelPath: 'public/models/office_worker.glb',
        absModelPath: '/models/office_worker.glb',
        autoPlay: true,
        typingSpeed: 1.0,
        ...options
      };

      this.scene = null;
      this.camera = null;
      this.renderer = null;
      this.composer = null;
      this.controls = null;
      this.mixer = null;
      this.currentAction = null;
      this.loadedModel = null;
      this.proceduralAvatar = null;
      this.clock = new THREE.Clock();
      this.animationFrameId = null;
      this.isInitialized = false;

      // Status callbacks
      this.onModelLoaded = options.onModelLoaded || null;
      this.onLoadingProgress = options.onLoadingProgress || null;
      this.onError = options.onError || null;

      // Dynamic monitor textures
      this.monitorCanvasL = null;
      this.monitorCanvasR = null;
      this.monitorTextureL = null;
      this.monitorTextureR = null;

      // Lighting references
      this.lights = {};

      // Dynamic Animation Engine references
      this.dustMotes = null;
      this.serverRackDynamics = null;
      this.chair = null;
      this.chairAngle = 0;
      this.chairVel = 0;
      this.pointer = new THREE.Vector2();
      this.lastUserInteraction = Date.now();

      this.init();
    }

    init() {
      if (!this.container || typeof THREE === 'undefined') {
        console.warn('Office3DScene: Container or Three.js missing.');
        return;
      }

      const width = this.container.clientWidth || 580;
      const height = this.container.clientHeight || 420;

      // 1. Scene setup with deep architectural fog
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x070d17);
      this.scene.fog = new THREE.FogExp2(0x070d17, 0.038);

      // 2. Camera setup - cinematic 42-degree FOV
      this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
      this.camera.position.set(0.0, 1.65, 3.05);

      // 3. WebGLRenderer with ACES Filmic Tone Mapping and sRGB output
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      // Enable soft shadow maps
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Tone mapping & color space
      if (THREE.ACESFilmicToneMapping) {
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.1;
      }
      if ('outputColorSpace' in this.renderer && THREE.SRGBColorSpace) {
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      } else if ('outputEncoding' in this.renderer && THREE.sRGBEncoding) {
        this.renderer.outputEncoding = THREE.sRGBEncoding;
      }

      this.renderer.domElement.id = 'officeThreeCanvas';
      this.renderer.domElement.style.width = '100%';
      this.renderer.domElement.style.height = '100%';
      this.renderer.domElement.style.display = 'block';

      this.container.appendChild(this.renderer.domElement);

      // 4. OrbitControls with smooth damping
      if (typeof THREE.OrbitControls !== 'undefined') {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        this.controls.target.set(0, 0.85, 0);
        this.controls.minDistance = 1.1;
        this.controls.maxDistance = 6.0;
        this.controls.maxPolarAngle = Math.PI / 2.05; // Prevent camera under floor
      }

      // 5. Studio HDRI Environment Map via PMREMGenerator
      if (window.OfficePBRTextures && typeof window.OfficePBRTextures.createStudioEnvironment === 'function') {
        try {
          const envTexture = window.OfficePBRTextures.createStudioEnvironment(this.renderer);
          if (envTexture) {
            this.scene.environment = envTexture;
          }
        } catch (e) {
          console.warn('Office3DScene: Environment map setup warning:', e.message);
        }
      }

      // 6. Photorealistic Lighting Setup
      this.setupLighting();

      // 7. Build High-End Architectural Office Desk Environment
      this.buildOfficeEnvironment();

      // 8. Initialize Post-Processing Pipeline (Bloom, SSAO, Grain)
      this.setupPostProcessing(width, height);

      // 9. Setup Drag-and-Drop for GLB / GLTF files
      this.setupDragAndDrop();

      // 10. Real-World Environmental Motion: HVAC Drifting Dust Motes Particle System
      if (window.OfficeAnimationEngine && window.OfficeAnimationEngine.AirflowParticleSystem) {
        this.dustMotes = new window.OfficeAnimationEngine.AirflowParticleSystem(this.scene, {
          count: 220,
          bounds: { x: [-2.8, 2.8], y: [0.1, 2.6], z: [-2.8, 2.8] },
          color: 0x00f0ff,
          size: 0.022
        });
      }

      // 11. Interactive Pointer Move Tracking for Head Tracking & Chair Reaction
      if (this.renderer && this.renderer.domElement) {
        this.renderer.domElement.addEventListener('pointermove', (e) => {
          const rect = this.renderer.domElement.getBoundingClientRect();
          this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          this.lastUserInteraction = Date.now();
        });
      }

      // 12. Load 3D GLB Model with Graceful Fallback
      this.loadModelWithFallback();

      // 13. Resize listener
      window.addEventListener('resize', () => this.onWindowResize());

      // 14. Start render loop
      this.isInitialized = true;
      this.animate();
    }

    setupLighting() {
      // 1. Natural daylight directional sun simulating expansive window daylight
      const sunLight = new THREE.DirectionalLight(0xfff7ea, 1.35);
      sunLight.position.set(3.2, 5.5, 3.4);
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 2048;
      sunLight.shadow.mapSize.height = 2048;
      sunLight.shadow.camera.near = 0.5;
      sunLight.shadow.camera.far = 14;
      sunLight.shadow.bias = -0.0008;
      sunLight.shadow.radius = 2.5; // Soft penumbra
      this.scene.add(sunLight);
      this.lights.sun = sunLight;

      // 2. Ambient sky fill (cool daylight) and floor bounce (warm wood tone)
      const hemiLight = new THREE.HemisphereLight(0x6b8eb8, 0x1f1610, 0.65);
      this.scene.add(hemiLight);
      this.lights.hemi = hemiLight;

      // 3. Overhead warm-white recessed LED track lights (3500K - 4000K, 0xfff2e0)
      const trackLight1 = new THREE.PointLight(0xfff2e0, 0.85, 4.5, 1.5);
      trackLight1.position.set(0, 2.3, 0.1);
      this.scene.add(trackLight1);
      this.lights.track1 = trackLight1;

      const trackLight2 = new THREE.PointLight(0xffeed6, 0.65, 4.0, 1.5);
      trackLight2.position.set(-1.4, 2.3, -0.6);
      this.scene.add(trackLight2);
      this.lights.track2 = trackLight2;

      // 4. Subtle cyber cyan rim light for silhouette separation
      const rimLight = new THREE.DirectionalLight(0x00d4ff, 0.75);
      rimLight.position.set(-3.2, 3.0, -2.8);
      this.scene.add(rimLight);
      this.lights.rim = rimLight;

      // 5. Monitor Screen Point Lights (casting soft glow onto character and keyboard)
      this.screenLightL = new THREE.PointLight(0x00ff88, 0.65, 1.8, 1.8);
      this.screenLightL.position.set(-0.35, 1.15, 0.15);
      this.scene.add(this.screenLightL);

      this.screenLightR = new THREE.PointLight(0x00f0ff, 0.65, 1.8, 1.8);
      this.screenLightR.position.set(0.35, 1.15, 0.15);
      this.scene.add(this.screenLightR);

      this.laptopLight = new THREE.PointLight(0x00f0ff, 0.45, 1.2, 1.8);
      this.laptopLight.position.set(0.0, 0.88, 0.28);
      this.scene.add(this.laptopLight);
    }

    setupPostProcessing(width, height) {
      if (typeof THREE.EffectComposer === 'undefined') {
        console.log('Office3DScene: Post-processing module not loaded, using direct WebGLRenderer.');
        return;
      }

      try {
        this.composer = new THREE.EffectComposer(this.renderer);

        // 1. Render Pass
        const renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        // 2. Selective Unreal Bloom Pass (threshold: 0.82 ensures only monitors, LEDs & status lights bloom)
        if (typeof THREE.UnrealBloomPass !== 'undefined') {
          const bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(width, height),
            0.65, // strength
            0.4,  // radius
            0.82  // threshold
          );
          this.composer.addPass(bloomPass);
          this.bloomPass = bloomPass;
        }

        // 3. Cinematic Film Pass (Screen-Space Contact Shadow Occlusion, subtle Chromatic Aberration & Film Grain)
        if (typeof THREE.CinematicFilmPass !== 'undefined') {
          const filmPass = new THREE.CinematicFilmPass({
            aberration: 0.0016, // subtle lens fringing
            grain: 0.024,       // subtle ISO 100 film texture
            vignette: 0.20      // smooth edge framing
          });
          this.composer.addPass(filmPass);
          this.filmPass = filmPass;
        }

        console.log('Office3DScene: Post-processing pipeline initialized (Selective Bloom + SSAO/Film Pass).');
      } catch (err) {
        console.warn('Office3DScene: Error setting up EffectComposer:', err.message);
        this.composer = null;
      }
    }

    buildOfficeEnvironment() {
      const envGroup = new THREE.Group();
      envGroup.name = 'officeEnvironment';

      // Load procedural PBR textures
      const pbr = window.OfficePBRTextures || {};
      const walnutWood = pbr.createWalnutWood ? pbr.createWalnutWood(1024, 512, false) : null;
      const carpetTiles = pbr.createCarpetTiles ? pbr.createCarpetTiles(1024, 1024) : null;
      const brushedAluminum = pbr.createBrushedAluminum ? pbr.createBrushedAluminum(512, 512) : null;

      // 1. Commercial Carpet Tiles Floor
      const floorGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.08, 48);
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x111a26,
        map: carpetTiles?.diffuseMap || null,
        bumpMap: carpetTiles?.bumpMap || null,
        bumpScale: 0.004,
        roughness: 0.82,
        metalness: 0.08
      });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.position.y = -0.04;
      floor.receiveShadow = true;
      envGroup.add(floor);

      // Floor Outer Brushed Cyan Trim Ring
      const ringGeo = new THREE.RingGeometry(3.58, 3.65, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.002;
      envGroup.add(ring);

      // 2. Matte Black Walnut Wood Sit-Stand Desk
      // Desk Top
      const deskTopGeo = new THREE.BoxGeometry(1.6, 0.04, 0.85);
      const deskTopMat = new THREE.MeshStandardMaterial({
        color: 0x1f1610, // Matte black walnut
        map: walnutWood?.diffuseMap || null,
        bumpMap: walnutWood?.bumpMap || null,
        bumpScale: 0.003,
        roughness: 0.6,
        metalness: 0.05,
        envMapIntensity: 0.85
      });
      const deskTop = new THREE.Mesh(deskTopGeo, deskTopMat);
      deskTop.position.set(0, 0.78, 0);
      deskTop.castShadow = true;
      deskTop.receiveShadow = true;
      envGroup.add(deskTop);

      // Subtle chamfered edge trim
      const deskTrimGeo = new THREE.BoxGeometry(1.608, 0.008, 0.858);
      const deskTrimMat = new THREE.MeshBasicMaterial({ color: 0x00e1ff });
      const deskTrim = new THREE.Mesh(deskTrimGeo, deskTrimMat);
      deskTrim.position.set(0, 0.78, 0);
      envGroup.add(deskTrim);

      // Powder-Coated Brushed Black Aluminum Desk Legs
      const legMat = new THREE.MeshStandardMaterial({
        color: 0x0a1018,
        roughnessMap: brushedAluminum?.roughnessMap || null,
        roughness: 0.3,
        metalness: 0.85,
        envMapIntensity: 1.2
      });
      const legGeo = new THREE.BoxGeometry(0.06, 0.76, 0.75);

      const legL = new THREE.Mesh(legGeo, legMat);
      legL.position.set(-0.72, 0.38, 0);
      legL.castShadow = true;
      legL.receiveShadow = true;
      envGroup.add(legL);

      const legR = new THREE.Mesh(legGeo, legMat);
      legR.position.set(0.72, 0.38, 0);
      legR.castShadow = true;
      legR.receiveShadow = true;
      envGroup.add(legR);

      // 3. Acoustic Fabric Privacy Divider Panel
      const screenGeo = new THREE.BoxGeometry(1.5, 0.36, 0.02);
      const screenMat = new THREE.MeshStandardMaterial({
        color: 0x122234,
        roughness: 0.92,
        metalness: 0.05
      });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.set(0, 0.96, -0.38);
      screen.castShadow = true;
      envGroup.add(screen);

      // Screen Border Piping
      const screenBorderGeo = new THREE.BoxGeometry(1.52, 0.015, 0.025);
      const screenBorderMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const screenBorder = new THREE.Mesh(screenBorderGeo, screenBorderMat);
      screenBorder.position.set(0, 1.14, -0.38);
      envGroup.add(screenBorder);

      // 4. Thin-Bezel Dual Monitors on Pneumatic Articulated Arm
      this.setupPneumaticDualMonitors(envGroup, brushedAluminum);

      // 5. Realistic Desk Details (Mechanical Keyboard, Oversized Mat, Mouse, Grommet, Coffee Mug)
      this.setupRealisticDeskDetails(envGroup);

      // 6. Ergonomic Mesh Task Chair (Herman Miller Aeron Style)
      this.setupErgonomicMeshChair(envGroup);

      // 7. Realistic Potted Monstera / Ficus Plant
      this.setupPottedMonsteraPlant(envGroup);

      // 8. Motorized Sit-Stand Digital Height Controller (72cm)
      this.setupSitStandControls(envGroup);

      // 9. Cable Management (Wire Mesh Tray, Cat6a Cabling, Magnetic Snake & Thunderbolt 4 Dock)
      this.setupCableManagement(envGroup);

      // 10. Small Lockable Under-Desk Mobile Pedestal with Key Tumbler
      this.setupLockablePedestal(envGroup);

      // 11. MDF Server Rack Cabinet (42U Racks, 10GbE LEDs, Centralized UPS, FM-200 Fire Suppression)
      this.setupMDFServerRack(envGroup, brushedAluminum);

      // 12. Acoustic Ceiling Baffles, Biophilic Moss Wall & Smart HVAC Thermostat
      this.setupAcousticBafflesAndHVAC(envGroup);

      // 13. Acoustic Phone Booth & OSHA First Aid / AED Safety Station
      this.setupSafetyAndPhoneBooth(envGroup);

      this.scene.add(envGroup);
    }

    /**
     * Thin-Bezel Dual Monitors Mounted on Articulated Pneumatic Arm Clamp
     */
    setupPneumaticDualMonitors(parentGroup, brushedAluminum) {
      const monMountGroup = new THREE.Group();

      const aluminumMat = new THREE.MeshStandardMaterial({
        color: 0x080e16,
        roughnessMap: brushedAluminum?.roughnessMap || null,
        metalness: 0.88,
        roughness: 0.26,
        envMapIntensity: 1.3
      });

      // 1. Heavy-Duty Steel C-Clamp on rear edge of desk
      const clampGeo = new THREE.BoxGeometry(0.08, 0.09, 0.06);
      const clamp = new THREE.Mesh(clampGeo, aluminumMat);
      clamp.position.set(0, 0.77, -0.40);
      monMountGroup.add(clamp);

      // Dual tightening thumb screws
      for (let s = -1; s <= 1; s += 2) {
        const screwGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.03, 12);
        const screw = new THREE.Mesh(screwGeo, aluminumMat);
        screw.position.set(s * 0.025, 0.72, -0.40);
        monMountGroup.add(screw);
      }

      // 2. Vertical Mounting Post
      const postGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.38, 16);
      const post = new THREE.Mesh(postGeo, aluminumMat);
      post.position.set(0, 0.96, -0.38);
      monMountGroup.add(post);

      // 3. Articulated Gas-Spring Pneumatic Dual Arms
      const armMat = aluminumMat;
      const armAngles = [-0.22, 0.22];

      for (let i = 0; i < 2; i++) {
        const sign = i === 0 ? -1 : 1;
        // Lower Arm
        const lowerArmGeo = new THREE.BoxGeometry(0.24, 0.024, 0.028);
        const lowerArm = new THREE.Mesh(lowerArmGeo, armMat);
        lowerArm.position.set(sign * 0.12, 1.05, -0.34);
        lowerArm.rotation.y = sign * 0.45;
        monMountGroup.add(lowerArm);

        // Elbow Joint
        const elbowGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.035, 12);
        const elbow = new THREE.Mesh(elbowGeo, armMat);
        elbow.position.set(sign * 0.22, 1.05, -0.30);
        monMountGroup.add(elbow);

        // Upper Forearm
        const upperArmGeo = new THREE.BoxGeometry(0.18, 0.022, 0.024);
        const upperArm = new THREE.Mesh(upperArmGeo, armMat);
        upperArm.position.set(sign * 0.28, 1.10, -0.24);
        upperArm.rotation.y = sign * -0.3;
        monMountGroup.add(upperArm);

        // VESA 100x100 Mounting Plate
        const vesaGeo = new THREE.BoxGeometry(0.09, 0.09, 0.008);
        const vesa = new THREE.Mesh(vesaGeo, armMat);
        vesa.position.set(sign * 0.33, 1.12, -0.20);
        vesa.rotation.y = sign * -0.22;
        monMountGroup.add(vesa);
      }

      // Dynamic Canvas Monitors
      this.monitorCanvasL = document.createElement('canvas');
      this.monitorCanvasL.width = 512;
      this.monitorCanvasL.height = 288;
      this.monitorTextureL = new THREE.CanvasTexture(this.monitorCanvasL);

      this.monitorCanvasR = document.createElement('canvas');
      this.monitorCanvasR.width = 512;
      this.monitorCanvasR.height = 288;
      this.monitorTextureR = new THREE.CanvasTexture(this.monitorCanvasR);

      // Frameless Ultra-Thin Bezel 27" Displays (bezel < 1.5mm)
      const monW = 0.58;
      const monH = 0.33;
      const monD = 0.014;
      const monGeo = new THREE.BoxGeometry(monW, monH, monD);
      const bezelMat = new THREE.MeshStandardMaterial({
        color: 0x05070d,
        roughness: 0.4,
        metalness: 0.8
      });

      // Left Monitor (IDE Code Syntax)
      const matL = [
        bezelMat, bezelMat, bezelMat, bezelMat,
        new THREE.MeshBasicMaterial({ map: this.monitorTextureL }),
        bezelMat
      ];
      const monL = new THREE.Mesh(monGeo, matL);
      monL.position.set(-0.33, 1.12, -0.18);
      monL.rotation.y = 0.22; // Inward ergonomic curve
      monL.castShadow = true;
      monMountGroup.add(monL);

      // Right Monitor (Telemetry & Radar)
      const matR = [
        bezelMat, bezelMat, bezelMat, bezelMat,
        new THREE.MeshBasicMaterial({ map: this.monitorTextureR }),
        bezelMat
      ];
      const monR = new THREE.Mesh(monGeo, matR);
      monR.position.set(0.33, 1.12, -0.18);
      monR.rotation.y = -0.22;
      monR.castShadow = true;
      monMountGroup.add(monR);

      parentGroup.add(monMountGroup);
    }

    /**
     * Realistic Desk Details:
     * - Oversized stitched desk mat
     * - Low-profile mechanical keyboard with individual keycaps & subtle LED underglow
     * - Ergonomic wireless precision mouse
     * - Desk cable grommet with braided cables
     * - Ceramic coffee mug with coffee surface
     * - Open sleek laptop
     */
    setupRealisticDeskDetails(parentGroup) {
      const detailsGroup = new THREE.Group();
      detailsGroup.position.set(0, 0.801, 0.06);

      const pbr = window.OfficePBRTextures || {};

      // 1. Oversized Micro-Weave Desk Mat (900 x 400 mm)
      const matTex = pbr.createDeskMatTexture ? pbr.createDeskMatTexture(1024, 512) : null;
      const deskMatGeo = new THREE.BoxGeometry(0.88, 0.003, 0.38);
      const deskMatMat = new THREE.MeshStandardMaterial({
        color: 0x0b111a,
        map: matTex,
        roughness: 0.88,
        metalness: 0.05
      });
      const deskMatMesh = new THREE.Mesh(deskMatGeo, deskMatMat);
      deskMatMesh.position.set(0, 0.002, 0.04);
      deskMatMesh.receiveShadow = true;
      detailsGroup.add(deskMatMesh);

      // 2. Low-Profile Mechanical Keyboard
      const kbGroup = new THREE.Group();
      kbGroup.position.set(-0.06, 0.008, 0.08);

      // CNC Anodized Aluminum Chassis (angled 6 degrees forward)
      const kbCaseGeo = new THREE.BoxGeometry(0.32, 0.012, 0.125);
      const kbCaseMat = new THREE.MeshStandardMaterial({
        color: 0x080e16,
        metalness: 0.85,
        roughness: 0.28
      });
      const kbCase = new THREE.Mesh(kbCaseGeo, kbCaseMat);
      kbCase.rotation.x = 0.07;
      kbCase.castShadow = true;
      kbGroup.add(kbCase);

      // Keycap Bed with Individual PBT Keycaps
      const keycapMatDark = new THREE.MeshStandardMaterial({ color: 0x121924, roughness: 0.6 });
      const keycapMatAccent = new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.5 });
      const keyRows = 5;
      const keyCols = 14;
      const kw = 0.018;
      const kh = 0.006;
      const kd = 0.018;
      const keyGeo = new THREE.BoxGeometry(kw, kh, kd);

      for (let r = 0; r < keyRows; r++) {
        for (let c = 0; c < keyCols; c++) {
          // Spacebar on bottom row
          if (r === keyRows - 1 && c >= 4 && c <= 8) {
            if (c === 4) {
              const spaceGeo = new THREE.BoxGeometry(kw * 5 + 0.012, kh, kd);
              const spaceKey = new THREE.Mesh(spaceGeo, keycapMatDark);
              spaceKey.position.set(-0.13 + 6 * (kw + 0.003), 0.009, -0.045 + r * (kd + 0.003));
              spaceKey.rotation.x = 0.07;
              kbGroup.add(spaceKey);
            }
            continue;
          }

          const isAccent = (r === 0 && c === 0) || (r === 2 && c === keyCols - 1);
          const kMesh = new THREE.Mesh(keyGeo, isAccent ? keycapMatAccent : keycapMatDark);
          kMesh.position.set(-0.13 + c * (kw + 0.003), 0.009, -0.045 + r * (kd + 0.003));
          kMesh.rotation.x = 0.07;
          kbGroup.add(kMesh);
        }
      }

      // Subtle Warm/Cyan LED Underglow
      const underglowGeo = new THREE.PlaneGeometry(0.30, 0.11);
      const underglowMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.45 });
      const underglow = new THREE.Mesh(underglowGeo, underglowMat);
      underglow.rotation.x = -Math.PI / 2 + 0.07;
      underglow.position.set(0, 0.006, 0.005);
      kbGroup.add(underglow);

      // Coiled Custom Aviator Braided USB-C Cable
      const coilCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.01, -0.06),
        new THREE.Vector3(0.03, 0.01, -0.10),
        new THREE.Vector3(0.08, 0.01, -0.14),
        new THREE.Vector3(0.12, 0.01, -0.22)
      ]);
      const coilGeo = new THREE.TubeGeometry(coilCurve, 20, 0.0035, 8, false);
      const coilMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.5 });
      const coilMesh = new THREE.Mesh(coilGeo, coilMat);
      kbGroup.add(coilMesh);

      detailsGroup.add(kbGroup);

      // 3. Ergonomic Wireless Precision Mouse
      const mouseGroup = new THREE.Group();
      mouseGroup.position.set(0.24, 0.006, 0.10);

      const mouseBodyGeo = new THREE.BoxGeometry(0.06, 0.024, 0.105);
      const mouseMat = new THREE.MeshStandardMaterial({ color: 0x0a1018, roughness: 0.35, metalness: 0.6 });
      const mouseBody = new THREE.Mesh(mouseBodyGeo, mouseMat);
      mouseBody.castShadow = true;
      mouseGroup.add(mouseBody);

      // Textured Rubber Scroll Wheel
      const wheelGeo = new THREE.CylinderGeometry(0.007, 0.007, 0.008, 12);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.3 });
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(0, 0.014, -0.025);
      mouseGroup.add(wheel);

      detailsGroup.add(mouseGroup);

      // 4. Desk Cable Grommet with Flexible Rubber Seal
      const grommetGeo = new THREE.CylinderGeometry(0.032, 0.032, 0.01, 24);
      const grommetMat = new THREE.MeshStandardMaterial({ color: 0x060a10, roughness: 0.8 });
      const grommet = new THREE.Mesh(grommetGeo, grommetMat);
      grommet.position.set(0.48, 0.002, -0.28);
      detailsGroup.add(grommet);

      // Braided cables diving through grommet
      const dropCableGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.12, 8);
      const dropCableMat = new THREE.MeshStandardMaterial({ color: 0x0088ff, roughness: 0.6 });
      const dropCable = new THREE.Mesh(dropCableGeo, dropCableMat);
      dropCable.position.set(0.48, -0.04, -0.28);
      detailsGroup.add(dropCable);

      // 5. Ceramic Coffee Mug with Coffee Surface
      const mugGroup = new THREE.Group();
      mugGroup.position.set(-0.46, 0.002, 0.12);

      // Mug Cylinder Body (Glossy ceramic finish)
      const mugGeo = new THREE.CylinderGeometry(0.04, 0.036, 0.085, 24);
      const mugMat = new THREE.MeshPhysicalMaterial({
        color: 0x0e1724,
        roughness: 0.12,
        metalness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.4
      });
      const mug = new THREE.Mesh(mugGeo, mugMat);
      mug.position.y = 0.042;
      mug.castShadow = true;
      mugGroup.add(mug);

      // Mug Handle
      const handleGeo = new THREE.TorusGeometry(0.026, 0.007, 12, 16, Math.PI);
      const handle = new THREE.Mesh(handleGeo, mugMat);
      handle.rotation.z = -Math.PI / 2;
      handle.position.set(-0.042, 0.042, 0);
      mugGroup.add(handle);

      // Coffee Liquid Surface
      const coffeeGeo = new THREE.CircleGeometry(0.036, 24);
      const coffeeMat = new THREE.MeshStandardMaterial({
        color: 0x180f08, // Dark roast coffee
        roughness: 0.1,
        metalness: 0.1
      });
      const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
      coffee.rotation.x = -Math.PI / 2;
      coffee.position.set(0, 0.078, 0);
      mugGroup.add(coffee);

      detailsGroup.add(mugGroup);

      // 6. Sleek Aluminum Laptop Open at 108 Degrees
      this.setupLaptop(detailsGroup);

      parentGroup.add(detailsGroup);
    }

    setupLaptop(parentGroup) {
      const laptopGroup = new THREE.Group();
      laptopGroup.position.set(-0.42, 0.006, -0.12);
      laptopGroup.rotation.y = 0.28;

      // Base
      const baseGeo = new THREE.BoxGeometry(0.30, 0.010, 0.21);
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x1c2838, metalness: 0.85, roughness: 0.25 });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.castShadow = true;
      laptopGroup.add(base);

      // Glowing Keyboard Bed
      const kbGeo = new THREE.PlaneGeometry(0.26, 0.11);
      const kbMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const kb = new THREE.Mesh(kbGeo, kbMat);
      kb.rotation.x = -Math.PI / 2;
      kb.position.set(0, 0.006, -0.02);
      laptopGroup.add(kb);

      // Laptop Screen Lid open at 108 degrees
      const screenLidGeo = new THREE.BoxGeometry(0.30, 0.21, 0.007);
      const lidMat = new THREE.MeshStandardMaterial({ color: 0x141e2a, metalness: 0.85, roughness: 0.28 });
      const lid = new THREE.Mesh(screenLidGeo, lidMat);
      lid.position.set(0, 0.095, -0.10);
      lid.rotation.x = -0.24;

      // Glowing Display
      const screenDispGeo = new THREE.PlaneGeometry(0.27, 0.18);
      const screenDispMat = new THREE.MeshBasicMaterial({ color: 0x00ffc8 });
      const screenDisp = new THREE.Mesh(screenDispGeo, screenDispMat);
      screenDisp.position.set(0, 0, 0.004);
      lid.add(screenDisp);

      laptopGroup.add(lid);
      parentGroup.add(laptopGroup);
    }

    /**
     * Herman Miller Aeron Style Ergonomic Mesh Task Chair:
     * - 5-star die-cast aluminum castor base with five radial curved legs
     * - Dual-wheel polyurethane castors
     * - Central hydraulic pneumatic cylinder with height lever
     * - Synchronized tilt mechanism housing
     * - Breathable woven mesh seat pan with ergonomic waterfall front
     * - Dual-zone posture-fit curved lumbar support pad
     * - High-back arched spine suspension with breathable mesh backrest
     * - 4D articulated armrests with soft-touch contoured arm pads
     */
    setupErgonomicMeshChair(parentGroup) {
      const chairGroup = new THREE.Group();
      chairGroup.position.set(0, 0, 0.58);

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
      const baseCenterGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
      const baseCenter = new THREE.Mesh(baseCenterGeo, aluminumMat);
      baseCenter.position.y = 0.08;
      chairGroup.add(baseCenter);

      // Five Radial Curved Legs
      const numLegs = 5;
      const legRadius = 0.30;
      for (let i = 0; i < numLegs; i++) {
        const angle = (i / numLegs) * Math.PI * 2;
        const legCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.08, 0),
          new THREE.Vector3(Math.cos(angle) * 0.16, 0.07, Math.sin(angle) * 0.16),
          new THREE.Vector3(Math.cos(angle) * legRadius, 0.04, Math.sin(angle) * legRadius)
        ]);
        const legMeshGeo = new THREE.TubeGeometry(legCurve, 10, 0.014, 8, false);
        const legMesh = new THREE.Mesh(legMeshGeo, aluminumMat);
        chairGroup.add(legMesh);

        // Dual-Wheel Polyurethane Castor
        const castorGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.016, 12);
        const castorMat = new THREE.MeshStandardMaterial({ color: 0x040810, roughness: 0.4 });
        const castor = new THREE.Mesh(castorGeo, castorMat);
        castor.rotation.z = Math.PI / 2;
        castor.position.set(Math.cos(angle) * legRadius, 0.024, Math.sin(angle) * legRadius);
        chairGroup.add(castor);
      }

      // 2. Central Hydraulic Pneumatic Cylinder with Height Lever
      const cylGeo = new THREE.CylinderGeometry(0.024, 0.026, 0.36, 16);
      const cyl = new THREE.Mesh(cylGeo, aluminumMat);
      cyl.position.y = 0.26;
      chairGroup.add(cyl);

      // Height Lever
      const leverGeo = new THREE.BoxGeometry(0.12, 0.008, 0.016);
      const lever = new THREE.Mesh(leverGeo, aluminumMat);
      lever.position.set(0.12, 0.42, 0);
      chairGroup.add(lever);

      // 3. Synchronized Tilt Mechanism Housing
      const mechGeo = new THREE.BoxGeometry(0.24, 0.07, 0.22);
      const mech = new THREE.Mesh(mechGeo, aluminumMat);
      mech.position.y = 0.43;
      chairGroup.add(mech);

      // 4. Ergonomic Curved Waterfall Mesh Seat Pan
      const seatGroup = new THREE.Group();
      seatGroup.position.set(0, 0.48, 0);

      // Contoured Seat Rim Frame
      const seatFrameGeo = new THREE.BoxGeometry(0.48, 0.04, 0.46);
      const seatFrame = new THREE.Mesh(seatFrameGeo, aluminumMat);
      seatGroup.add(seatFrame);

      // Breathable Tensioned Mesh Insert
      const seatMeshGeo = new THREE.BoxGeometry(0.44, 0.025, 0.42);
      const seatMesh = new THREE.Mesh(seatMeshGeo, meshMat);
      seatMesh.position.y = 0.01;
      seatMesh.castShadow = true;
      seatGroup.add(seatMesh);

      chairGroup.add(seatGroup);

      // 5. High-Back Spine Suspension Frame & Tensioned Mesh Backrest
      const backGroup = new THREE.Group();
      backGroup.position.set(0, 0.78, 0.21);
      backGroup.rotation.x = 0.12;

      // Outer Spine Support Frame (Aeron Y-Spine)
      const spineArchGeo = new THREE.BoxGeometry(0.46, 0.54, 0.035);
      const spineArch = new THREE.Mesh(spineArchGeo, aluminumMat);
      backGroup.add(spineArch);

      // Breathable Elastomer Mesh Backrest Panel
      const backMeshGeo = new THREE.BoxGeometry(0.42, 0.50, 0.015);
      const backMesh = new THREE.Mesh(backMeshGeo, meshMat);
      backMesh.position.z = -0.01;
      backMesh.castShadow = true;
      backGroup.add(backMesh);

      // 6. Dual-Zone Posture-Fit Lumbar Support Pad
      const lumbarGroup = new THREE.Group();
      lumbarGroup.position.set(0, -0.08, 0.02);

      const lumbarPadGeo = new THREE.BoxGeometry(0.36, 0.08, 0.025);
      const lumbarPadMat = new THREE.MeshStandardMaterial({ color: 0x050a12, roughness: 0.6 });
      const lumbarPad = new THREE.Mesh(lumbarPadGeo, lumbarPadMat);
      lumbarGroup.add(lumbarPad);

      // Lumbar Accent Dial
      const lumbarDialGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.02, 12);
      const lumbarDialMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const lumbarDial = new THREE.Mesh(lumbarDialGeo, lumbarDialMat);
      lumbarDial.rotation.x = Math.PI / 2;
      lumbarDial.position.set(0, 0, 0.02);
      lumbarGroup.add(lumbarDial);

      backGroup.add(lumbarGroup);

      // Headrest with Dual Axis Pivot
      const headrestGeo = new THREE.BoxGeometry(0.24, 0.11, 0.035);
      const headrest = new THREE.Mesh(headrestGeo, meshMat);
      headrest.position.set(0, 0.32, 0.02);
      backGroup.add(headrest);

      chairGroup.add(backGroup);

      // 7. 4D Adjustable Armrests with Soft Polyurethane Pads
      for (let a = -1; a <= 1; a += 2) {
        // Arm Upright Stanchion
        const stanchionGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.22, 12);
        const stanchion = new THREE.Mesh(stanchionGeo, aluminumMat);
        stanchion.position.set(a * 0.26, 0.56, 0.02);
        chairGroup.add(stanchion);

        // Soft-Touch Contoured Arm Pad
        const padGeo = new THREE.BoxGeometry(0.07, 0.024, 0.20);
        const pad = new THREE.Mesh(padGeo, softArmMat);
        pad.position.set(a * 0.26, 0.67, 0.04);
        chairGroup.add(pad);
      }

      chairGroup.userData = { baseRotY: chairGroup.rotation.y || 0 };
      this.chair = chairGroup;
      parentGroup.add(chairGroup);
    }

    /**
     * Realistic Potted Monstera Deliciosa Plant:
     * - Modern cylindrical ceramic planter on a solid walnut tripod stand
     * - Dark organic potting soil
     * - Multiple curved organic stems with broad fenestrated Monstera leaves
     * - Detailed midrib venation and glossy botanical finish
     */
    setupPottedMonsteraPlant(parentGroup) {
      const plantGroup = new THREE.Group();
      plantGroup.position.set(-1.42, 0, -0.22);

      const pbr = window.OfficePBRTextures || {};
      const leafPBR = pbr.createMonsteraLeaf ? pbr.createMonsteraLeaf(512, 512) : null;
      const walnutWood = pbr.createWalnutWood ? pbr.createWalnutWood(512, 256, false) : null;

      // 1. Solid Walnut Tripod Stand
      const standMat = new THREE.MeshStandardMaterial({
        color: 0x241810,
        map: walnutWood?.diffuseMap || null,
        roughness: 0.65,
        metalness: 0.05
      });

      for (let s = 0; s < 3; s++) {
        const angle = (s / 3) * Math.PI * 2;
        const legGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.38, 12);
        const standLeg = new THREE.Mesh(legGeo, standMat);
        standLeg.position.set(Math.cos(angle) * 0.18, 0.19, Math.sin(angle) * 0.18);
        standLeg.rotation.z = Math.cos(angle) * 0.08;
        standLeg.rotation.x = Math.sin(angle) * 0.08;
        plantGroup.add(standLeg);
      }

      // Stand Cross-Ring
      const ringGeo = new THREE.TorusGeometry(0.18, 0.012, 8, 24);
      const standRing = new THREE.Mesh(ringGeo, standMat);
      standRing.rotation.x = Math.PI / 2;
      standRing.position.y = 0.22;
      plantGroup.add(standRing);

      // 2. Modern Matte White Ceramic Planter Pot
      const potGeo = new THREE.CylinderGeometry(0.22, 0.18, 0.42, 32);
      const potMat = new THREE.MeshPhysicalMaterial({
        color: 0xf0f2f5,
        roughness: 0.25,
        metalness: 0.02,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
        envMapIntensity: 1.2
      });
      const pot = new THREE.Mesh(potGeo, potMat);
      pot.position.y = 0.38;
      pot.castShadow = true;
      pot.receiveShadow = true;
      plantGroup.add(pot);

      // 3. Rich Organic Dark Soil Substrate
      const soilGeo = new THREE.CircleGeometry(0.20, 24);
      const soilMat = new THREE.MeshStandardMaterial({ color: 0x140e0a, roughness: 0.95 });
      const soil = new THREE.Mesh(soilGeo, soilMat);
      soil.rotation.x = -Math.PI / 2;
      soil.position.y = 0.57;
      plantGroup.add(soil);

      // 4. Gracefully Curved Organic Monstera Stalks & Fenestrated Broad Leaves
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x194d2e, roughness: 0.6 });
      const leafMat = new THREE.MeshStandardMaterial({
        color: 0x1e663a,
        map: leafPBR?.diffuseMap || null,
        roughness: 0.28,
        metalness: 0.04,
        side: THREE.DoubleSide
      });

      const leafConfigs = [
        { height: 0.78, spread: 0.24, rotY: 0.2, rotX: 0.35, scale: 1.1 },
        { height: 0.92, spread: 0.30, rotY: 1.4, rotX: 0.42, scale: 1.25 },
        { height: 0.70, spread: 0.28, rotY: 2.6, rotX: 0.38, scale: 0.95 },
        { height: 0.86, spread: 0.32, rotY: 3.8, rotX: 0.45, scale: 1.2 },
        { height: 0.65, spread: 0.22, rotY: 5.0, rotX: 0.32, scale: 0.85 }
      ];

      leafConfigs.forEach(cfg => {
        // Curved Organic Stalk
        const stemCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.57, 0),
          new THREE.Vector3(Math.cos(cfg.rotY) * (cfg.spread * 0.4), cfg.height * 0.7, Math.sin(cfg.rotY) * (cfg.spread * 0.4)),
          new THREE.Vector3(Math.cos(cfg.rotY) * cfg.spread, cfg.height, Math.sin(cfg.rotY) * cfg.spread)
        ]);
        const stemGeo = new THREE.TubeGeometry(stemCurve, 12, 0.007, 6, false);
        const stem = new THREE.Mesh(stemGeo, stemMat);
        plantGroup.add(stem);

        // Broad Iconic Monstera Leaf Blade (Curved Surface)
        const bladeGeo = new THREE.PlaneGeometry(0.24 * cfg.scale, 0.38 * cfg.scale, 6, 6);
        // Curve leaf slightly
        const posAttr = bladeGeo.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          const vx = posAttr.getX(i);
          posAttr.setZ(i, -Math.abs(vx) * 0.2);
        }
        bladeGeo.computeVertexNormals();

        const leaf = new THREE.Mesh(bladeGeo, leafMat);
        leaf.position.set(Math.cos(cfg.rotY) * cfg.spread, cfg.height, Math.sin(cfg.rotY) * cfg.spread);
        leaf.rotation.set(cfg.rotX, cfg.rotY, -0.2);
        leaf.castShadow = true;
        plantGroup.add(leaf);
      });

      parentGroup.add(plantGroup);
    }

    setupSitStandControls(parentGroup) {
      const ctrlGroup = new THREE.Group();
      ctrlGroup.position.set(0.68, 0.77, 0.38);

      // Keypad Body
      const bodyGeo = new THREE.BoxGeometry(0.12, 0.024, 0.045);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x060c14, roughness: 0.4, metalness: 0.8 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      ctrlGroup.add(body);

      // Digital LED Display Screen with '72 cm' Canvas Texture
      const dispCanvas = document.createElement('canvas');
      dispCanvas.width = 128;
      dispCanvas.height = 64;
      const dctx = dispCanvas.getContext('2d');
      dctx.fillStyle = '#020a10';
      dctx.fillRect(0, 0, 128, 64);
      dctx.fillStyle = '#00ff9d';
      dctx.font = 'bold 32px monospace';
      dctx.textAlign = 'center';
      dctx.fillText('72 cm', 64, 42);

      const dispTex = new THREE.CanvasTexture(dispCanvas);
      const dispGeo = new THREE.PlaneGeometry(0.06, 0.016);
      const dispMat = new THREE.MeshBasicMaterial({ map: dispTex });
      const disp = new THREE.Mesh(dispGeo, dispMat);
      disp.position.set(-0.02, 0, 0.023);
      ctrlGroup.add(disp);

      // Up / Down memory touch buttons
      const btnGeo = new THREE.PlaneGeometry(0.016, 0.016);
      const btnMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const btnUp = new THREE.Mesh(btnGeo, btnMat);
      btnUp.position.set(0.025, 0.003, 0.023);
      ctrlGroup.add(btnUp);

      parentGroup.add(ctrlGroup);
    }

    setupCableManagement(parentGroup) {
      const cmGroup = new THREE.Group();

      // Under-Desk Steel Wire Mesh Basket / Tray
      const trayGeo = new THREE.BoxGeometry(1.0, 0.06, 0.24);
      const trayMat = new THREE.MeshStandardMaterial({ color: 0x162232, wireframe: true });
      const tray = new THREE.Mesh(trayGeo, trayMat);
      tray.position.set(0, 0.72, -0.15);
      cmGroup.add(tray);

      // Structured Blue Cat6a / Cat7 Cabling Bundle
      const cableMat = new THREE.MeshStandardMaterial({ color: 0x0088ff, roughness: 0.5 });
      const cableGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.96, 12);
      const cable1 = new THREE.Mesh(cableGeo, cableMat);
      cable1.rotation.z = Math.PI / 2;
      cable1.position.set(0, 0.73, -0.16);
      cmGroup.add(cable1);

      const cable2 = new THREE.Mesh(cableGeo, new THREE.MeshStandardMaterial({ color: 0xffaa00, roughness: 0.5 }));
      cable2.rotation.z = Math.PI / 2;
      cable2.position.set(0, 0.73, -0.14);
      cmGroup.add(cable2);

      // Magnetic Vertical Cable Spine Snake running down right desk leg
      const spineGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.72, 12);
      const spineMat = new THREE.MeshStandardMaterial({ color: 0x0c1522, metalness: 0.7, roughness: 0.3 });
      const spine = new THREE.Mesh(spineGeo, spineMat);
      spine.position.set(0.70, 0.38, 0.05);
      cmGroup.add(spine);

      // Thunderbolt 4 / USB-C Dock on Desk Surface
      const dockGeo = new THREE.BoxGeometry(0.14, 0.022, 0.07);
      const dockMat = new THREE.MeshStandardMaterial({ color: 0x182436, metalness: 0.85, roughness: 0.2 });
      const dock = new THREE.Mesh(dockGeo, dockMat);
      dock.position.set(-0.52, 0.81, 0.12);
      cmGroup.add(dock);

      // Dock Glowing Cyan Power LED
      const dockLedGeo = new THREE.PlaneGeometry(0.01, 0.01);
      const dockLedMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const dockLed = new THREE.Mesh(dockLedGeo, dockLedMat);
      dockLed.rotation.x = -Math.PI / 2;
      dockLed.position.set(-0.56, 0.822, 0.12);
      cmGroup.add(dockLed);

      // Single braided USB-C cable from dock to laptop
      const usbCurve = new THREE.LineCurve3(
        new THREE.Vector3(-0.45, 0.812, 0.12),
        new THREE.Vector3(-0.28, 0.812, -0.02)
      );
      const usbGeo = new THREE.TubeGeometry(usbCurve, 10, 0.003, 6, false);
      const usbMat = new THREE.MeshStandardMaterial({ color: 0x0a1018, roughness: 0.8 });
      const usbCable = new THREE.Mesh(usbGeo, usbMat);
      cmGroup.add(usbCable);

      parentGroup.add(cmGroup);
    }

    setupLockablePedestal(parentGroup) {
      const pedGroup = new THREE.Group();
      pedGroup.position.set(-0.48, 0.27, 0.06);

      const darkMat = new THREE.MeshStandardMaterial({ color: 0x101a28, roughness: 0.4, metalness: 0.85 });

      // Pedestal Steel Body
      const bodyGeo = new THREE.BoxGeometry(0.36, 0.50, 0.54);
      const body = new THREE.Mesh(bodyGeo, darkMat);
      body.castShadow = true;
      pedGroup.add(body);

      // 4 Mini Caster Wheels
      const casterMat = new THREE.MeshStandardMaterial({ color: 0x05080f, roughness: 0.3 });
      const wheelGeo = new THREE.SphereGeometry(0.02, 8, 8);
      const wheelPositions = [
        [-0.14, -0.25, -0.22],
        [0.14, -0.25, -0.22],
        [-0.14, -0.25, 0.22],
        [0.14, -0.25, 0.22]
      ];
      wheelPositions.forEach(p => {
        const w = new THREE.Mesh(wheelGeo, casterMat);
        w.position.set(...p);
        pedGroup.add(w);
      });

      // 3 Drawer Fronts & Aluminum Handles
      const handleMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.1 });
      const handleGeo = new THREE.BoxGeometry(0.16, 0.012, 0.012);
      for (let d = 0; d < 3; d++) {
        const h = new THREE.Mesh(handleGeo, handleMat);
        h.position.set(0, 0.16 - d * 0.15, 0.275);
        pedGroup.add(h);
      }

      // Lock Tumbler with Chrome Cylinder
      const lockGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.01, 12);
      const lock = new THREE.Mesh(lockGeo, handleMat);
      lock.rotation.x = Math.PI / 2;
      lock.position.set(0.12, 0.21, 0.275);
      pedGroup.add(lock);

      parentGroup.add(pedGroup);
    }

    setupMDFServerRack(parentGroup, brushedAluminum) {
      const rackGroup = new THREE.Group();
      rackGroup.position.set(-2.2, 1.05, -1.6);

      // 42U Steel Cabinet Frame
      const cabMat = new THREE.MeshStandardMaterial({
        color: 0x080e18,
        roughnessMap: brushedAluminum?.roughnessMap || null,
        metalness: 0.85,
        roughness: 0.3
      });
      const frameGeo = new THREE.BoxGeometry(0.72, 2.1, 0.82);
      const frame = new THREE.Mesh(frameGeo, cabMat);
      frame.castShadow = true;
      rackGroup.add(frame);

      // Glass Front Door
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.35,
        roughness: 0.08,
        transmission: 0.85,
        ior: 1.5
      });
      const doorGeo = new THREE.BoxGeometry(0.68, 2.02, 0.02);
      const door = new THREE.Mesh(doorGeo, glassMat);
      door.position.set(0, 0, 0.42);
      rackGroup.add(door);

      // Internal Rack Units & 10GbE Switch LEDs
      for (let u = 0; u < 12; u++) {
        const uGeo = new THREE.BoxGeometry(0.64, 0.045, 0.65);
        const uMat = new THREE.MeshStandardMaterial({ color: 0x040810 });
        const uMesh = new THREE.Mesh(uGeo, uMat);
        uMesh.position.set(0, 0.85 - u * 0.14, 0.05);
        rackGroup.add(uMesh);

        // Switch Port Glowing LEDs
        const ledMat = new THREE.MeshBasicMaterial({ color: (u % 2 === 0) ? 0x00ff9d : 0x00f0ff });
        const ledGeo = new THREE.BoxGeometry(0.48, 0.01, 0.01);
        const ledMesh = new THREE.Mesh(ledGeo, ledMat);
        ledMesh.position.set(0, 0.85 - u * 0.14, 0.38);
        rackGroup.add(ledMesh);
      }

      // Centralized Eaton 20kVA UPS Battery Bank Module
      const upsGeo = new THREE.BoxGeometry(0.64, 0.28, 0.68);
      const upsMat = new THREE.MeshStandardMaterial({ color: 0x0a1420, metalness: 0.8 });
      const ups = new THREE.Mesh(upsGeo, upsMat);
      ups.position.set(0, -0.82, 0.05);
      rackGroup.add(ups);

      // UPS Status Display Bar
      const upsLedGeo = new THREE.PlaneGeometry(0.24, 0.02);
      const upsLedMat = new THREE.MeshBasicMaterial({ color: 0x00ff9d });
      const upsLed = new THREE.Mesh(upsLedGeo, upsLedMat);
      upsLed.position.set(0, -0.80, 0.40);
      rackGroup.add(upsLed);

      // Red FM-200 Fire Suppression Canister beside Rack
      const canGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.55, 16);
      const canMat = new THREE.MeshStandardMaterial({ color: 0xdd1111, roughness: 0.3 });
      const can = new THREE.Mesh(canGeo, canMat);
      can.position.set(0.55, -0.72, 0);
      rackGroup.add(can);

      // Canister Brass Gauge
      const gaugeGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.02, 12);
      const gaugeMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9 });
      const gauge = new THREE.Mesh(gaugeGeo, gaugeMat);
      gauge.rotation.x = Math.PI / 2;
      gauge.position.set(0.55, -0.42, 0.08);
      rackGroup.add(gauge);

      // Real-World Environmental Motion: High-speed cooling fan & blinking network switch LEDs
      if (window.OfficeAnimationEngine && window.OfficeAnimationEngine.ServerRackDynamics) {
        this.serverRackDynamics = new window.OfficeAnimationEngine.ServerRackDynamics(rackGroup);
      }

      parentGroup.add(rackGroup);
    }

    setupAcousticBafflesAndHVAC(parentGroup) {
      const acGroup = new THREE.Group();

      // Suspended Polyester Felt Acoustic Ceiling Baffles
      const baffleGeo = new THREE.BoxGeometry(3.2, 0.22, 0.04);
      const baffleMat = new THREE.MeshStandardMaterial({ color: 0x141f2e, roughness: 0.95 });
      const baffleZ = [-0.6, 0.1, 0.8];
      baffleZ.forEach(bz => {
        const b = new THREE.Mesh(baffleGeo, baffleMat);
        b.position.set(0, 2.5, bz);
        acGroup.add(b);
      });

      // Preserved Reindeer Moss Feature Wall Accent on rear wall
      const mossGeo = new THREE.BoxGeometry(1.6, 1.2, 0.04);
      const mossMat = new THREE.MeshStandardMaterial({ color: 0x1e824c, roughness: 0.95 });
      const moss = new THREE.Mesh(mossGeo, mossMat);
      moss.position.set(0, 1.8, -2.4);
      acGroup.add(moss);

      // Smart Digital Multi-Zone HVAC Thermostat
      const hvacGeo = new THREE.BoxGeometry(0.18, 0.22, 0.02);
      const hvacMat = new THREE.MeshStandardMaterial({ color: 0x050c18, metalness: 0.7 });
      const hvac = new THREE.Mesh(hvacGeo, hvacMat);
      hvac.position.set(1.4, 1.4, -2.38);

      const hvacCanvas = document.createElement('canvas');
      hvacCanvas.width = 128;
      hvacCanvas.height = 128;
      const hctx = hvacCanvas.getContext('2d');
      hctx.fillStyle = '#030812';
      hctx.fillRect(0, 0, 128, 128);
      hctx.fillStyle = '#00f0ff';
      hctx.font = 'bold 24px monospace';
      hctx.fillText('21.5°C', 18, 42);
      hctx.fillStyle = '#00ff9d';
      hctx.font = '14px monospace';
      hctx.fillText('CO2: 440 PPM', 12, 75);
      hctx.fillText('HEPA: ACTIVE', 12, 102);

      const hvacTex = new THREE.CanvasTexture(hvacCanvas);
      const hvacDisp = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.19), new THREE.MeshBasicMaterial({ map: hvacTex }));
      hvacDisp.position.set(0, 0, 0.012);
      hvac.add(hvacDisp);

      acGroup.add(hvac);

      // Commercial Wi-Fi 7 Enterprise Ceiling Access Point
      const apGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.03, 24);
      const apMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
      const ap = new THREE.Mesh(apGeo, apMat);
      ap.position.set(0, 2.7, 0);
      acGroup.add(ap);

      const apRingGeo = new THREE.RingGeometry(0.12, 0.13, 24);
      const apRingMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide });
      const apRing = new THREE.Mesh(apRingGeo, apRingMat);
      apRing.rotation.x = Math.PI / 2;
      apRing.position.set(0, 2.68, 0);
      acGroup.add(apRing);

      parentGroup.add(acGroup);
    }

    setupSafetyAndPhoneBooth(parentGroup) {
      const spGroup = new THREE.Group();

      // Acoustic Phone Booth (Single Occupancy Soundproof Pod, 32dB isolation)
      const boothGroup = new THREE.Group();
      boothGroup.position.set(2.2, 1.15, -1.4);

      const boothOuterGeo = new THREE.BoxGeometry(0.9, 2.3, 0.9);
      const boothMat = new THREE.MeshStandardMaterial({ color: 0x0e1724, roughness: 0.4, metalness: 0.8 });
      const boothOuter = new THREE.Mesh(boothOuterGeo, boothMat);
      boothGroup.add(boothOuter);

      // Soundproof Glass Door
      const bGlassGeo = new THREE.BoxGeometry(0.72, 2.05, 0.02);
      const bGlassMat = new THREE.MeshPhysicalMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.35,
        transmission: 0.9,
        roughness: 0.05,
        ior: 1.5
      });
      const bGlass = new THREE.Mesh(bGlassGeo, bGlassMat);
      bGlass.position.set(0, 0, 0.46);
      boothGroup.add(bGlass);

      // Phone Booth LED Occupancy Beacon (Green = Vacant)
      const beaconGeo = new THREE.SphereGeometry(0.04, 12, 12);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0x00ff9d });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(0, 1.2, 0.46);
      boothGroup.add(beacon);

      spGroup.add(boothGroup);

      // OSHA-Compliant First Aid & AED Wall Station
      const aedGroup = new THREE.Group();
      aedGroup.position.set(-1.4, 1.35, -2.38);

      const aedBoxGeo = new THREE.BoxGeometry(0.32, 0.36, 0.12);
      const aedBoxMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
      const aedBox = new THREE.Mesh(aedBoxGeo, aedBoxMat);
      aedGroup.add(aedBox);

      // Green AED Cross
      const crossGeo = new THREE.PlaneGeometry(0.18, 0.18);
      const crossCanvas = document.createElement('canvas');
      crossCanvas.width = 128;
      crossCanvas.height = 128;
      const cctx = crossCanvas.getContext('2d');
      cctx.fillStyle = '#00a859';
      cctx.fillRect(0, 0, 128, 128);
      cctx.fillStyle = '#ffffff';
      cctx.fillRect(48, 18, 32, 92);
      cctx.fillRect(18, 48, 92, 32);
      const crossTex = new THREE.CanvasTexture(crossCanvas);
      const crossMesh = new THREE.Mesh(crossGeo, new THREE.MeshBasicMaterial({ map: crossTex }));
      crossMesh.position.set(0, 0, 0.062);
      aedGroup.add(crossMesh);

      // Red Fire Extinguisher (CO2 Class B/C)
      const extGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.48, 16);
      const extMat = new THREE.MeshStandardMaterial({ color: 0xcc0000, roughness: 0.25 });
      const ext = new THREE.Mesh(extGeo, extMat);
      ext.position.set(-0.28, -0.15, 0);
      aedGroup.add(ext);

      spGroup.add(aedGroup);

      parentGroup.add(spGroup);
    }

    // Drag-and-drop listener to load local user .glb files
    setupDragAndDrop() {
      const dropZone = this.container;
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
        }, false);
      });

      dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files && files.length > 0) {
          const file = files[0];
          if (file.name.toLowerCase().endsWith('.glb') || file.name.toLowerCase().endsWith('.gltf')) {
            console.log(`Office3DScene: User dropped local 3D file: ${file.name}`);
            const reader = new FileReader();
            reader.onload = (event) => {
              const contents = event.target.result;
              const loader = new THREE.GLTFLoader();
              loader.parse(contents, '', (gltf) => {
                this.handleLoadedGLTF(gltf, file.name);
              }, (err) => {
                console.error('Office3DScene: Error parsing dropped GLTF file:', err);
              });
            };
            reader.readAsArrayBuffer(file);
          }
        }
      });
    }

    loadModelWithFallback() {
      if (typeof THREE.GLTFLoader === 'undefined') {
        console.warn('THREE.GLTFLoader not available. Using high-fidelity procedural 3D avatar.');
        this.buildProceduralTypingAvatar();
        return;
      }

      const loader = new THREE.GLTFLoader();

      const tryLoad = (path, onFail) => {
        loader.load(
          path,
          (gltf) => {
            console.log(`Office3DScene: Successfully loaded 3D GLB from ${path}`);
            this.handleLoadedGLTF(gltf, path);
          },
          (xhr) => {
            if (xhr.lengthComputable && this.onLoadingProgress) {
              const pct = (xhr.loaded / xhr.total) * 100;
              this.onLoadingProgress(pct);
            }
          },
          (error) => {
            onFail();
          }
        );
      };

      // 1. Try options.absModelPath (/models/office_worker.glb)
      tryLoad(this.options.absModelPath, () => {
        // 2. Try options.modelPath (models/office_worker.glb)
        tryLoad(this.options.modelPath, () => {
          // 3. Try options.fallbackModelPath (public/models/office_worker.glb)
          tryLoad(this.options.fallbackModelPath, () => {
            // 4. Fallback: High-fidelity procedural 3D humanoid avatar
            console.log('Office3DScene: No external .glb found yet. Active photorealistic procedural 3D typing character running.');
            this.buildProceduralTypingAvatar();
          });
        });
      });
    }

    handleLoadedGLTF(gltf, sourcePath) {
      if (this.loadedModel) {
        this.scene.remove(this.loadedModel);
      }
      if (this.proceduralAvatar) {
        this.scene.remove(this.proceduralAvatar);
        this.proceduralAvatar = null;
      }

      const model = gltf.scene || gltf.scenes[0];
      this.loadedModel = model;

      // Enable shadows and enhance materials with PBR physical properties
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.roughness = Math.max(0.35, child.material.roughness || 0.5);
            if (this.scene.environment) {
              child.material.envMap = this.scene.environment;
              child.material.envMapIntensity = 1.0;
            }
          }
        }
      });

      // Compute bounding box to normalize scale
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);

      // Target humanoid character seated height: ~1.4 units
      const targetHeight = 1.4;
      const scaleFactor = targetHeight / (maxDim || 1);
      model.scale.setScalar(scaleFactor);

      // Position character seated on the ergonomic chair facing the keyboard
      model.position.set(0, 0.46, 0.54);
      model.rotation.y = Math.PI;

      this.scene.add(model);

      // Extract typing animation clip with smooth looping
      if (gltf.animations && gltf.animations.length > 0) {
        this.mixer = new THREE.AnimationMixer(model);

        let typingClip = gltf.animations.find(a => /typing|work|loop|idle|code/i.test(a.name));
        if (!typingClip) typingClip = gltf.animations[0];

        console.log(`Office3DScene: Playing animation clip "${typingClip.name}" (total tracks: ${gltf.animations.length})`);

        this.currentAction = this.mixer.clipAction(typingClip);
        this.currentAction.setLoop(THREE.LoopRepeat);
        this.currentAction.setEffectiveTimeScale(this.options.typingSpeed);
        this.currentAction.reset().fadeIn(0.5).play();
      } else {
        console.warn('Office3DScene: Loaded GLB has no embedded animations. Model seated in resting pose.');
      }

      if (this.onModelLoaded) {
        this.onModelLoaded({
          sourcePath,
          animations: gltf.animations ? gltf.animations.map(a => a.name) : []
        });
      }

      this.updateHudBadge(`3D GLTF: ${sourcePath.split('/').pop()} (ACTIVE)`);
    }

    // High-Fidelity Procedural 3D Rigged Typing Humanoid Avatar
    buildProceduralTypingAvatar() {
      if (this.proceduralAvatar) return;

      const avatarGroup = new THREE.Group();
      avatarGroup.name = 'proceduralAvatar';
      avatarGroup.position.set(0, 0.48, 0.54);

      const skinMat = new THREE.MeshStandardMaterial({ color: 0xffd1b3, roughness: 0.65 });
      const hoodieMat = new THREE.MeshStandardMaterial({ color: 0x0e1724, roughness: 0.82 });
      const pantsMat = new THREE.MeshStandardMaterial({ color: 0x141f2e, roughness: 0.85 });
      const shoesMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.35 });
      const hairMat = new THREE.MeshStandardMaterial({ color: 0x181008, roughness: 0.9 });
      const headsetMat = new THREE.MeshStandardMaterial({ color: 0x050a10, metalness: 0.8, roughness: 0.2 });

      // Pelvis & Denim Jeans
      const pelvisGeo = new THREE.BoxGeometry(0.32, 0.14, 0.24);
      const pelvis = new THREE.Mesh(pelvisGeo, pantsMat);
      pelvis.position.y = 0.07;
      avatarGroup.add(pelvis);

      // Thighs (seated horizontally on chair pan)
      for (let t = -1; t <= 1; t += 2) {
        const thighGeo = new THREE.BoxGeometry(0.12, 0.12, 0.34);
        const thigh = new THREE.Mesh(thighGeo, pantsMat);
        thigh.position.set(t * 0.10, 0.06, -0.14);
        avatarGroup.add(thigh);

        // Lower Leg (vertical to floor)
        const shinGeo = new THREE.BoxGeometry(0.10, 0.36, 0.10);
        const shin = new THREE.Mesh(shinGeo, pantsMat);
        shin.position.set(t * 0.10, -0.16, -0.30);
        avatarGroup.add(shin);

        // Sneakers
        const shoeGeo = new THREE.BoxGeometry(0.11, 0.08, 0.18);
        const shoe = new THREE.Mesh(shoeGeo, shoesMat);
        shoe.position.set(t * 0.10, -0.38, -0.34);
        shoe.castShadow = true;
        avatarGroup.add(shoe);
      }

      // Torso & Cyber Tech Hoodie (leaning slightly forward into work)
      const spineNode = new THREE.Group();
      spineNode.position.set(0, 0.14, 0);
      spineNode.rotation.x = -0.06; // Ergonomic forward posture

      const torsoGeo = new THREE.BoxGeometry(0.36, 0.40, 0.24);
      const torso = new THREE.Mesh(torsoGeo, hoodieMat);
      torso.position.y = 0.20;
      torso.castShadow = true;
      spineNode.add(torso);

      // Cyan Hoodie Logo
      const logoGeo = new THREE.PlaneGeometry(0.12, 0.04);
      const logoMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const logo = new THREE.Mesh(logoGeo, logoMat);
      logo.position.set(0, 0.22, 0.122);
      spineNode.add(logo);

      // Neck & Head
      const neckGeo = new THREE.CylinderGeometry(0.05, 0.055, 0.08, 12);
      const neck = new THREE.Mesh(neckGeo, skinMat);
      neck.position.y = 0.44;
      spineNode.add(neck);

      const headNode = new THREE.Group();
      headNode.position.set(0, 0.54, 0);

      const headGeo = new THREE.SphereGeometry(0.115, 16, 16);
      headGeo.scale(1.0, 1.25, 1.1);
      const head = new THREE.Mesh(headGeo, skinMat);
      head.castShadow = true;
      headNode.add(head);

      // Modern Textured Hair
      const hairGeo = new THREE.SphereGeometry(0.12, 16, 16);
      hairGeo.scale(1.02, 1.1, 1.15);
      const hair = new THREE.Mesh(hairGeo, hairMat);
      hair.position.set(0, 0.04, -0.02);
      headNode.add(hair);

      // Wireless ANC Studio Headset
      const bandGeo = new THREE.TorusGeometry(0.13, 0.014, 8, 24, Math.PI);
      const band = new THREE.Mesh(bandGeo, headsetMat);
      band.rotation.z = -Math.PI;
      band.position.set(0, 0.06, 0);
      headNode.add(band);

      for (let c = -1; c <= 1; c += 2) {
        const cupGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 16);
        const cup = new THREE.Mesh(cupGeo, headsetMat);
        cup.rotation.z = Math.PI / 2;
        cup.position.set(c * 0.128, 0.02, 0);
        headNode.add(cup);

        // Glowing Cyan Headset Ring
        const hRingGeo = new THREE.RingGeometry(0.035, 0.042, 16);
        const hRingMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide });
        const hRing = new THREE.Mesh(hRingGeo, hRingMat);
        hRing.rotation.y = Math.PI / 2;
        hRing.position.set(c * 0.145, 0.02, 0);
        headNode.add(hRing);
      }

      spineNode.add(headNode);

      // Rigged Arms & Hands (Typing on mechanical keyboard)
      const arms = [];
      for (let side = -1; side <= 1; side += 2) {
        const shoulder = new THREE.Group();
        shoulder.position.set(side * 0.22, 0.36, 0);

        // Upper Arm
        const upperArmGeo = new THREE.BoxGeometry(0.08, 0.26, 0.08);
        const upperArm = new THREE.Mesh(upperArmGeo, hoodieMat);
        upperArm.position.y = -0.12;
        shoulder.add(upperArm);
        shoulder.rotation.x = 0.45;
        shoulder.rotation.z = side * -0.12;

        // Elbow Joint
        const elbow = new THREE.Group();
        elbow.position.set(0, -0.24, 0);
        elbow.rotation.x = 0.95; // Forearms angled towards keyboard
        elbow.rotation.y = side * -0.25;

        // Forearm
        const forearmGeo = new THREE.BoxGeometry(0.07, 0.24, 0.07);
        const forearm = new THREE.Mesh(forearmGeo, hoodieMat);
        forearm.position.y = -0.11;
        elbow.add(forearm);

        // Hand & Fingers resting over keyboard keycaps
        const handGeo = new THREE.BoxGeometry(0.065, 0.025, 0.08);
        const hand = new THREE.Mesh(handGeo, skinMat);
        hand.position.set(0, -0.24, 0.02);
        elbow.add(hand);

        shoulder.add(elbow);
        spineNode.add(shoulder);

        arms.push({ shoulder, elbow, hand, side });
      }

      avatarGroup.add(spineNode);

      this.proceduralAvatar = {
        group: avatarGroup,
        spine: spineNode,
        head: headNode,
        arms
      };

      this.scene.add(avatarGroup);
    }

    updateProceduralAvatar(delta, time) {
      if (!this.proceduralAvatar) return;

      const { spine, head, arms } = this.proceduralAvatar;

      // Realistic Human Typing Cadence:
      // Burst typing for ~3.6s, followed by ~1.4s inspection/reading pause
      const cycle = time % 5.0;
      const isTyping = cycle < 3.6;

      // Realistic upper-body breathing sway
      spine.position.y = 0.14 + Math.sin(time * 2.0) * 0.0035;
      spine.rotation.x = -0.06 + Math.sin(time * 1.8) * 0.012;

      // Procedural Head Tracking: Smoothly look toward user pointer/cursor or monitor screens
      if (this.pointer && (Math.abs(this.pointer.x) > 0.02 || Math.abs(this.pointer.y) > 0.02)) {
        const targetYaw = -this.pointer.x * 0.42;
        const targetPitch = -0.14 + this.pointer.y * 0.22;
        head.rotation.y += (targetYaw - head.rotation.y) * Math.min(delta * 4.5, 0.25);
        head.rotation.x += (targetPitch - head.rotation.x) * Math.min(delta * 4.5, 0.25);
      } else {
        const naturalYaw = Math.sin(time * 0.6) * 0.14;
        const naturalPitch = -0.14 + Math.sin(time * 1.8) * 0.02;
        head.rotation.y += (naturalYaw - head.rotation.y) * 0.06;
        head.rotation.x += (naturalPitch - head.rotation.x) * 0.06;
      }

      // Alternating fluid mechanical typing vs resting/inspecting hands
      arms.forEach((arm, i) => {
        if (isTyping) {
          const typingFreq = 15.5;
          const phase = i * Math.PI + (arm.side > 0 ? 0.35 : 0);
          const tap = Math.sin(time * typingFreq + phase) * 0.055;
          arm.elbow.rotation.x += (0.95 + tap - arm.elbow.rotation.x) * 0.35;
          arm.hand.rotation.x += (-tap * 0.8 - arm.hand.rotation.x) * 0.35;
        } else {
          // Inspection / resting hands pose
          const restTap = Math.sin(time * 2.0 + i) * 0.008;
          arm.elbow.rotation.x += (0.88 + restTap - arm.elbow.rotation.x) * 0.08;
          arm.hand.rotation.x += (-0.02 - arm.hand.rotation.x) * 0.08;
        }
      });

      // Micro-Interactions: Office Chair ±2° yaw sway with spring-mass dampening
      if (this.chair) {
        const targetSway = (Math.sin(time * 0.8) * 0.030) + (isTyping ? Math.sin(time * 3.4) * 0.008 : 0);
        const springForce = (targetSway - this.chairAngle) * 18.0;
        const dampingForce = -this.chairVel * 4.5;
        this.chairVel += (springForce + dampingForce) * delta;
        this.chairAngle += this.chairVel * delta;

        const baseRot = this.chair.userData?.baseRotY || 0;
        this.chair.rotation.y = baseRot + this.chairAngle;
      }
    }

    // Dynamic Live Monitors Animation
    updateDynamicMonitors(time) {
      // 1. Left Monitor: Animated IDE Code Syntax
      if (this.monitorCanvasL && this.monitorTextureL) {
        const ctx = this.monitorCanvasL.getContext('2d');
        const w = 512;
        const h = 288;

        ctx.fillStyle = '#060a12';
        ctx.fillRect(0, 0, w, h);

        // Header Tab
        ctx.fillStyle = '#0f1724';
        ctx.fillRect(0, 0, w, 28);
        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('FRIDAY // neural_engine_v8.py • TypeScript [BUILD OK]', 12, 19);

        // Code Lines
        const codeLines = [
          'import { NeuralMatrix, QuantumCore } from "@friday/core";',
          'const cluster = new QuantumCore.Cluster({ redundancy: "N+2" });',
          'async function executeNeuralSynthesis(payload: FleetPacket) {',
          '  const weights = await cluster.syncLoRAWeights("/models/agent00.bin");',
          '  const response = await weights.infer({ stream: true, temp: 0.72 });',
          '  console.log(`[SYNTHESIS COMPLETED: latency=${Date.now() - t0}ms]`);',
          '  return response.toEncryptedStream();',
          '}',
          '// Active Workers: 19 | Dual-ISP Failover: READY | BGP: 10GbE',
          'export default executeNeuralSynthesis;'
        ];

        ctx.font = '13px "Courier New", monospace';
        const scrollOffset = Math.floor((time * 2) % codeLines.length);

        for (let i = 0; i < codeLines.length; i++) {
          const lineIndex = (i + scrollOffset) % codeLines.length;
          const y = 52 + i * 22;
          if (y > h - 15) break;

          // Line numbers
          ctx.fillStyle = '#3a506b';
          ctx.fillText((lineIndex + 1).toString().padStart(2, '0'), 12, y);

          // Syntax coloring
          const text = codeLines[lineIndex];
          if (text.startsWith('//')) {
            ctx.fillStyle = '#4ade80';
          } else if (text.includes('import') || text.includes('const') || text.includes('function') || text.includes('export')) {
            ctx.fillStyle = '#00f0ff';
          } else if (text.includes('"')) {
            ctx.fillStyle = '#ffaa00';
          } else {
            ctx.fillStyle = '#e2e8f0';
          }
          ctx.fillText(text, 44, y);
        }

        // Blinking cursor
        if (Math.sin(time * 8) > 0) {
          ctx.fillStyle = '#00f0ff';
          ctx.fillRect(44 + 180, 52 + (7 * 22) - 12, 8, 15);
        }

        this.monitorTextureL.needsUpdate = true;
      }

      // 2. Right Monitor: Real-time Telemetry Graph & Radar
      if (this.monitorCanvasR && this.monitorTextureR) {
        const ctx = this.monitorCanvasR.getContext('2d');
        const w = 512;
        const h = 288;

        ctx.fillStyle = '#050912';
        ctx.fillRect(0, 0, w, h);

        // Header
        ctx.fillStyle = '#0f1724';
        ctx.fillRect(0, 0, w, 28);
        ctx.fillStyle = '#00ff9d';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('CORE INFRASTRUCTURE TELEMETRY // 10GbE • 19.4°C', 12, 19);

        // Telemetry Line Graph
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let x = 20; x < w - 160; x += 10) {
          const val = Math.sin((x + time * 140) * 0.035) * 35 + Math.cos(x * 0.08) * 18 + 120;
          if (x === 20) ctx.moveTo(x, val);
          else ctx.lineTo(x, val);
        }
        ctx.stroke();

        // Radar Sweep Circle
        const rx = w - 85;
        const ry = 115;
        const radius = 55;

        ctx.strokeStyle = '#1b2a40';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(rx, ry, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rx, ry, radius * 0.5, 0, Math.PI * 2);
        ctx.stroke();

        // Rotating radar beam
        const radarAngle = time * 3.2;
        ctx.fillStyle = 'rgba(0, 240, 255, 0.18)';
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.arc(rx, ry, radius, radarAngle, radarAngle + 0.6);
        ctx.closePath();
        ctx.fill();

        // Stats Footer
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '12px monospace';
        ctx.fillText(`DUAL-ISP: ACTIVE (10G FIBER)  •  UPS: 100% (2.4h)`, 20, h - 35);
        ctx.fillStyle = '#00ff9d';
        ctx.fillText(`MDF CLOSET: 19.4°C • FM-200 OK  •  CO2: 440 PPM`, 20, h - 15);

        this.monitorTextureR.needsUpdate = true;
      }

      // Dynamic Screen Light Flicker / Cast onto Desk and Character Face
      if (this.screenLightL) {
        this.screenLightL.intensity = 0.65 + Math.sin(time * 8.4) * 0.08 + Math.cos(time * 19.2) * 0.04;
      }
      if (this.screenLightR) {
        this.screenLightR.intensity = 0.65 + Math.sin(time * 11.2) * 0.07 + Math.sin(time * 24.5) * 0.05;
      }
    }

    updateHudBadge(text) {
      const badge = document.getElementById('officeModelBadge');
      if (badge) {
        badge.textContent = text;
      }
    }

    onWindowResize() {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth || 580;
      const height = this.container.clientHeight || 420;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height);
      if (this.composer) {
        this.composer.setSize(width, height);
      }
    }

    animate() {
      this.animationFrameId = requestAnimationFrame(() => this.animate());

      const delta = this.clock.getDelta();
      const time = this.clock.getElapsedTime();

      // Update Controls
      if (this.controls) {
        this.controls.update();
      }

      // Update GLTF AnimationMixer if external GLB is loaded
      if (this.mixer) {
        this.mixer.update(delta);
      }

      // Update Procedural Rigged Avatar if active
      if (this.proceduralAvatar) {
        this.updateProceduralAvatar(delta, time);
      }

      // Update Dynamic Monitor Textures
      this.updateDynamicMonitors(time);

      // Real-World Environmental Motion: Drifting Dust Motes & Server Rack Dynamics
      if (this.dustMotes) {
        this.dustMotes.update(delta, time);
      }
      if (this.serverRackDynamics) {
        this.serverRackDynamics.update(delta, time);
      }

      // Subtle Harmonic Camera Breathing Float during idle
      if (this.camera && Date.now() - this.lastUserInteraction > 2500) {
        const breathY = Math.sin(time * 0.65) * 0.0016;
        const breathX = Math.cos(time * 0.45) * 0.0012;
        this.camera.position.y += breathY;
        this.camera.position.x += breathX;
      }

      // Render via Post-Processing EffectComposer or standard renderer
      if (this.composer) {
        this.composer.render(delta);
      } else if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    }

    destroy() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
      if (this.controls) {
        this.controls.dispose();
      }
      if (this.renderer) {
        this.renderer.dispose();
      }
      if (this.composer) {
        this.composer.reset();
      }
    }
  }

  // Export to global window namespace
  window.Office3DScene = Office3DScene;

  // Auto-initialize when #officeThreeViewport is ready
  window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('officeThreeViewport');
    if (container && !window.activeOffice3DScene) {
      window.activeOffice3DScene = new Office3DScene(container);
    }
  });

})();
