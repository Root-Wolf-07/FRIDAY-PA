import * as THREE from 'three';

export class LightingManager {
  constructor(scene) {
    this.scene = scene;
    this.mode = 'day';

    // 1. Natural Directional Sunlight
    this.sun = new THREE.DirectionalLight(0xfff7ea, 1.45);
    this.sun.position.set(24, 32, -24);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.width = 2048;
    this.sun.shadow.mapSize.height = 2048;
    this.sun.shadow.camera.near = 2;
    this.sun.shadow.camera.far = 90;
    const d = 32;
    this.sun.shadow.camera.left = -d;
    this.sun.shadow.camera.right = d;
    this.sun.shadow.camera.top = d;
    this.sun.shadow.camera.bottom = -d;
    this.sun.shadow.bias = -0.0006;
    this.scene.add(this.sun);

    // 2. Ambient Sky / Ground Fill
    this.hemi = new THREE.HemisphereLight(0x567da6, 0x141e2a, 0.75);
    this.scene.add(this.hemi);

    // 3. Central Concourse Ambient Fill
    this.lobbyLight = new THREE.PointLight(0xfff3db, 0.9, 18);
    this.lobbyLight.position.set(0, 3.8, 0);
    this.scene.add(this.lobbyLight);

    // 4. Room Point Lights
    this.roomSpots = [];
    const spots = [
      { pos: [-13.5, 3.6, -9.5], color: 0xfffaed, intensity: 1.1 },
      { pos: [13.5, 3.6, -9.5], color: 0xebf6ff, intensity: 1.2 },
      { pos: [-14.0, 3.6, 9.5], color: 0xfff4e6, intensity: 1.1 },
      { pos: [0.0, 3.6, 9.5], color: 0x00f0ff, intensity: 0.9 },
      { pos: [14.0, 3.6, 9.5], color: 0xfffaed, intensity: 1.1 }
    ];

    spots.forEach(s => {
      const p = new THREE.PointLight(s.color, s.intensity, 14);
      p.position.set(s.pos[0], s.pos[1], s.pos[2]);
      this.scene.add(p);
      this.roomSpots.push(p);
    });
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === 'night') {
      this.scene.background.set(0x03060c);
      this.scene.fog.color.set(0x03060c);
      this.sun.intensity = 0.25;
      this.sun.color.set(0x224488);
      this.hemi.intensity = 0.35;
      this.hemi.color.set(0x182438);
      this.lobbyLight.color.set(0x00f0ff);
      this.lobbyLight.intensity = 1.3;
      this.roomSpots.forEach(s => { s.intensity = 1.4; });
    } else {
      this.scene.background.set(0x0a101d);
      this.scene.fog.color.set(0x0a101d);
      this.sun.intensity = 1.45;
      this.sun.color.set(0xfff7ea);
      this.hemi.intensity = 0.75;
      this.hemi.color.set(0x567da6);
      this.lobbyLight.color.set(0xfff3db);
      this.lobbyLight.intensity = 0.9;
      this.roomSpots.forEach(s => { s.intensity = 1.1; });
    }
  }
}
