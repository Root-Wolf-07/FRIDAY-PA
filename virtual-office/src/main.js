import * as THREE from 'three';
import { SceneManager } from './core/SceneManager.js';
import { LightingManager } from './core/LightingManager.js';
import { NavigationManager } from './core/NavigationManager.js';
import { AvatarManager } from './core/AvatarManager.js';
import { UIManager } from './ui/UIManager.js';
import { createWalnutWood, createCarpetTiles, createPolishedConcrete, createMonsteraLeaf } from './core/textures.js';

// Room Metadata
const ROOM_DATA = {
  overview: {
    id: 'overview',
    name: 'Entire Corporate HQ',
    zone: 'ALL ZONES',
    headcount: 19,
    lead: 'FRIDEY Master Core & Gojo',
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
    name: 'Central Concourse & Lobby',
    zone: 'ZONE 0 • RECEPTION',
    headcount: 2,
    lead: 'Operations Director',
    desc: 'Central architectural lobby connecting all 5 corporate wings. Features Calacatta marble reception desk, titanium brand wall, lounge seating, and indoor ficus planters.',
    kpis: [
      { label: 'Access Control', val: 'Zero-Trust' },
      { label: 'Concourse Traffic', val: 'Optimal' },
      { label: 'Air Quality', val: '98 AQI' },
      { label: 'Building Temp', val: '21.5°C' }
    ],
    progress: 92,
    camPos: { x: 0, y: 6.5, z: 12 },
    target: { x: 0, y: 1.0, z: 0 }
  },
  master: {
    id: 'master',
    name: 'Executive & Founder Suite',
    zone: 'ROOM 1 • PENTHOUSE',
    headcount: 2,
    lead: 'Gojo & AGENT-00 (Brain)',
    desc: 'Corner executive suite with panoramic dual-aspect glass walls. Features solid walnut executive desk, leather seating, library bookshelf, and 85" real-time corporate KPI monitoring display.',
    kpis: [
      { label: 'Strategic Focus', val: 'Enterprise' },
      { label: 'Dual-Brain Sync', val: 'Active' },
      { label: 'Quarterly OKRs', val: '98.4%' },
      { label: 'Security Clearance', val: 'Level 5' }
    ],
    progress: 98,
    camPos: { x: -14, y: 5.5, z: -1 },
    target: { x: -13.5, y: 1.2, z: -9.5 }
  },
  alpha: {
    id: 'alpha',
    name: 'Team Alpha (Engineering & DevOps)',
    zone: 'ROOM 2 • SYSTEMS & CLOUD',
    headcount: 5,
    lead: 'Lead Systems Architect',
    desc: 'High-performance engineering wing with facing multi-monitor benching desks, 42U glass-front server cabinet with live telemetry LEDs, and glass architectural whiteboard.',
    kpis: [
      { label: 'Cluster Load', val: '42%' },
      { label: 'CI/CD Pipeline', val: 'Passing' },
      { label: 'Edge Latency', val: '12ms' },
      { label: 'Build Status', val: 'v8.4.1' }
    ],
    progress: 94,
    camPos: { x: 14, y: 5.5, z: -1 },
    target: { x: 13.5, y: 1.2, z: -9.5 }
  },
  beta: {
    id: 'beta',
    name: 'Team Beta (Design & Product Studio)',
    zone: 'ROOM 3 • UI/UX & CREATIVE',
    headcount: 4,
    lead: 'Principal Design Lead',
    desc: 'Creative studio layout with motorized standing desks, ultrawide curved monitors, collaborative interactive touch tables, and wall-mounted physical & digital design mood boards.',
    kpis: [
      { label: 'Design System', val: 'Tokens v3' },
      { label: 'User Rating', val: '4.9 / 5' },
      { label: 'Figma Library', val: 'Synced' },
      { label: 'Usability Score', val: '96%' }
    ],
    progress: 89,
    camPos: { x: -14, y: 5.5, z: 2 },
    target: { x: -14, y: 1.2, z: 9.5 }
  },
  gamma: {
    id: 'gamma',
    name: 'Team Gamma (Data Science & AI)',
    zone: 'ROOM 4 • NEURAL & ANALYTICS',
    headcount: 4,
    lead: 'Head of AI Research',
    desc: 'Collaborative pod layout centered around a 4-screen neural training video wall. Workstations equipped with high-performance GPU towers featuring acrylic RGB side panels.',
    kpis: [
      { label: 'GPU Utilization', val: '96.2%' },
      { label: 'Loss Value', val: '0.042' },
      { label: 'LoRA Epochs', val: '24 / 30' },
      { label: 'Inference Speed', val: '86 t/s' }
    ],
    progress: 91,
    camPos: { x: 0, y: 5.5, z: 2 },
    target: { x: 0, y: 1.2, z: 9.5 }
  },
  delta: {
    id: 'delta',
    name: 'Team Delta (Marketing & Operations)',
    zone: 'ROOM 5 • EXPANSION & OPS',
    headcount: 4,
    lead: 'VP of Growth',
    desc: 'Executive conference & operations room with an 8-person boardroom table, 75" real-time funnel presentation display, world clock array, and flexible hot-desking stations.',
    kpis: [
      { label: 'CAC Payback', val: '2.4 Mo' },
      { label: 'Active Regions', val: '14 Countries' },
      { label: 'Conversion', val: '4.8%' },
      { label: 'Daily Signups', val: '+1,840' }
    ],
    progress: 88,
    camPos: { x: 14, y: 5.5, z: 2 },
    target: { x: 14, y: 1.2, z: 9.5 }
  }
};

class VirtualOfficeApp {
  constructor() {
    this.container = document.getElementById('canvasContainer');
    this.sceneManager = new SceneManager(this.container);
    this.lightingManager = new LightingManager(this.sceneManager.scene);
    this.avatarManager = new AvatarManager(this.sceneManager.scene);

    this.navManager = new NavigationManager(
      this.sceneManager.camera,
      this.sceneManager.renderer.domElement,
      (roomId) => this.selectRoom(roomId)
    );

    this.uiManager = new UIManager(
      ROOM_DATA,
      (roomId) => this.selectRoom(roomId),
      () => this.toggleCamMode(),
      () => this.toggleLighting(),
      () => this.selectRoom('overview')
    );

    this.interactiveObjects = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.clock = new THREE.Clock();

    this.buildOffice();
    this.setupRaycasting();
    this.hideLoader();
    this.animate();
  }

  buildOffice() {
    // Procedural PBR Textures
    const walnut = createWalnutWood(1024, 512, false);
    const oak = createWalnutWood(1024, 512, true);
    const carpet = createCarpetTiles(1024, 1024);
    const concrete = createPolishedConcrete(1024, 1024);

    // PBR Materials
    const walnutMat = new THREE.MeshStandardMaterial({
      color: 0x1f1610,
      map: walnut.diffuseMap,
      roughness: 0.6,
      metalness: 0.05
    });
    const oakMat = new THREE.MeshStandardMaterial({
      color: 0xa67d52,
      map: oak.diffuseMap,
      roughness: 0.62,
      metalness: 0.05
    });
    const carpetMat = new THREE.MeshStandardMaterial({
      color: 0x111a26,
      map: carpet.diffuseMap,
      roughness: 0.82,
      metalness: 0.08
    });
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x161e2a,
      map: concrete.diffuseMap,
      roughness: 0.35,
      metalness: 0.15
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xcde8ff,
      transparent: true,
      opacity: 0.25,
      transmission: 0.9,
      roughness: 0.05,
      ior: 1.5,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });

    // Concourse Polished Concrete
    const concourse = new THREE.Mesh(new THREE.BoxGeometry(46, 0.1, 7.5), concreteMat);
    concourse.position.set(0, -0.05, 0);
    this.sceneManager.scene.add(concourse);

    // 5 Rooms Floors
    const rooms = [
      { id: 'master', pos: [-13.5, -0.05, -10], size: [16, 0.1, 13], mat: walnutMat },
      { id: 'alpha', pos: [13.5, -0.05, -10], size: [16, 0.1, 13], mat: oakMat },
      { id: 'beta', pos: [-14.5, -0.05, 10], size: [14, 0.1, 13], mat: oakMat },
      { id: 'gamma', pos: [0, -0.05, 10], size: [14, 0.1, 13], mat: carpetMat },
      { id: 'delta', pos: [14.5, -0.05, 10], size: [14, 0.1, 13], mat: walnutMat }
    ];

    rooms.forEach(r => {
      const f = new THREE.Mesh(new THREE.BoxGeometry(r.size[0], r.size[1], r.size[2]), r.mat);
      f.position.set(r.pos[0], r.pos[1], r.pos[2]);
      f.userData = { roomId: r.id };
      this.sceneManager.scene.add(f);
      this.interactiveObjects.push(f);
    });

    // Glass Facade North
    const glassWall = new THREE.Mesh(new THREE.BoxGeometry(46, 4.2, 0.08), glassMat);
    glassWall.position.set(0, 2.1, -16.5);
    this.sceneManager.scene.add(glassWall);

    // Workstation setups with ergonomic mesh chairs, monitors & avatars
    const workstations = [
      { pos: [-13.5, 0, -12.4], rot: 0 },
      { pos: [12.0, 0, -11.4], rot: 0 },
      { pos: [-14.0, 0, 12.4], rot: Math.PI },
      { pos: [0, 0, 12.5], rot: Math.PI },
      { pos: [13.0, 0, 9.2], rot: 0 }
    ];

    workstations.forEach(ws => {
      this.createErgonomicChair(ws.pos, ws.rot);
      this.avatarManager.loadGLTFAvatar('/models/office_worker.glb', ws.pos, ws.rot, null);
    });

    // Potted Monstera Plants
    this.createMonsteraPlanter([-21, 0, -3]);
    this.createMonsteraPlanter([21, 0, -3]);
    this.createMonsteraPlanter([-6, 0, 3.5]);
    this.createMonsteraPlanter([6, 0, 3.5]);
  }

  createErgonomicChair(pos, rotY = 0) {
    const chair = new THREE.Group();
    chair.position.set(pos[0], pos[1], pos[2]);
    chair.rotation.y = rotY;

    const alumMat = new THREE.MeshStandardMaterial({ color: 0x101a28, metalness: 0.88, roughness: 0.25 });
    const meshMat = new THREE.MeshStandardMaterial({ color: 0x0b131e, roughness: 0.88, metalness: 0.12 });

    // 5-Star Base
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16), alumMat);
    base.position.y = 0.08;
    chair.add(base);

    for (let i = 0; i < 5; i++) {
      const ang = (i / 5) * Math.PI * 2;
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.02, 0.03), alumMat);
      leg.position.set(Math.cos(ang) * 0.14, 0.06, Math.sin(ang) * 0.14);
      leg.rotation.y = -ang;
      chair.add(leg);
    }

    // Cylinder & Tilt Box
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.026, 0.36, 16), alumMat);
    cyl.position.y = 0.26;
    chair.add(cyl);

    // Contoured Mesh Seat Pan
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.05, 0.46), meshMat);
    seat.position.y = 0.48;
    chair.add(seat);

    // Y-Spine Mesh Backrest & Lumbar
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.54, 0.03), meshMat);
    back.position.set(0, 0.78, 0.21);
    back.rotation.x = 0.12;
    chair.add(back);

    const lumbar = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.08, 0.025), new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
    lumbar.position.set(0, 0.70, 0.23);
    chair.add(lumbar);

    this.sceneManager.scene.add(chair);
  }

  createMonsteraPlanter(pos) {
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.20, 0.44, 24),
      new THREE.MeshPhysicalMaterial({ color: 0xf0f2f5, roughness: 0.2, clearcoat: 0.8 })
    );
    pot.position.set(pos[0], 0.22, pos[2]);
    this.sceneManager.scene.add(pot);

    const leafMat = new THREE.MeshStandardMaterial({ color: 0x1e663a, roughness: 0.3, side: THREE.DoubleSide });
    for (let l = 0; l < 4; l++) {
      const ang = (l / 4) * Math.PI * 2;
      const leaf = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.38), leafMat);
      leaf.position.set(pos[0] + Math.cos(ang) * 0.18, 0.55 + l * 0.08, pos[2] + Math.sin(ang) * 0.18);
      leaf.rotation.set(0.4, ang, 0);
      this.sceneManager.scene.add(leaf);
    }
  }

  setupRaycasting() {
    window.addEventListener('pointerdown', (e) => {
      if (this.navManager.mode === 'firstperson') return;
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouse, this.sceneManager.camera);
      const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);
      if (intersects.length > 0) {
        const obj = intersects[0].object;
        if (obj.userData && obj.userData.roomId) {
          this.selectRoom(obj.userData.roomId);
        }
      }
    });
  }

  selectRoom(roomId) {
    const data = ROOM_DATA[roomId] || ROOM_DATA.overview;
    this.navManager.flyTo(data.camPos, data.target);
    this.uiManager.updatePills(roomId);
    this.uiManager.showDossier(data);
  }

  toggleCamMode() {
    const nextMode = this.navManager.mode === 'orbit' ? 'firstperson' : 'orbit';
    this.navManager.setMode(nextMode);
    const btn = document.getElementById('btnToggleCamMode');
    if (btn) btn.innerHTML = nextMode === 'firstperson' ? '🚶 WALKTHROUGH' : '🎥 ORBIT VIEW';
  }

  toggleLighting() {
    const nextMode = this.lightingManager.mode === 'day' ? 'night' : 'day';
    this.lightingManager.setMode(nextMode);
    const btn = document.getElementById('btnToggleLight');
    if (btn) btn.innerHTML = nextMode === 'night' ? '🌙 CYBER NIGHT' : '☀️ DAYLIGHT';
  }

  hideLoader() {
    const el = document.getElementById('loadingScreen');
    if (el) {
      setTimeout(() => {
        el.style.opacity = '0';
        setTimeout(() => el.style.display = 'none', 600);
      }, 600);
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    this.navManager.update(delta);
    this.avatarManager.update(delta, time);
    this.uiManager.updateMinimap(this.sceneManager.camera);
    this.sceneManager.render(delta);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.virtualOfficeApp = new VirtualOfficeApp();
});
