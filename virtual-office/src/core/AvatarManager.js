import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class AvatarManager {
  constructor(scene) {
    this.scene = scene;
    this.mixers = [];
    this.proceduralAvatars = [];
    this.loader = new GLTFLoader();
  }

  // Load custom GLTF/GLB avatar (e.g. models/office_worker.glb)
  loadGLTFAvatar(url, position, rotationY = 0, onLoaded) {
    this.loader.load(
      url,
      (gltf) => {
        const model = gltf.scene || gltf.scenes[0];
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Normalize scale
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.4 / (maxDim || 1);
        model.scale.setScalar(scale);

        model.position.set(position[0], position[1], position[2]);
        model.rotation.y = rotationY;
        this.scene.add(model);

        // Extract typing loop animation
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          let clip = gltf.animations.find(a => /typing|work|loop|idle/i.test(a.name));
          if (!clip) clip = gltf.animations[0];

          const action = mixer.clipAction(clip);
          action.setLoop(THREE.LoopRepeat);
          action.reset().fadeIn(0.5).play();
          this.mixers.push(mixer);
        }

        if (onLoaded) onLoaded(model);
      },
      undefined,
      (err) => {
        console.warn(`AvatarManager: Could not load ${url}, spawning procedural avatar instead.`);
        this.createProceduralAvatar(position, rotationY);
      }
    );
  }

  createProceduralAvatar(position, rotationY = 0) {
    const avatar = new THREE.Group();
    avatar.position.set(position[0], position[1] + 0.48, position[2]);
    avatar.rotation.y = rotationY;

    const shirtMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, roughness: 0.5 });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffd5b5, roughness: 0.6 });

    // Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.36, 0.22), shirtMat);
    torso.position.y = 0.26;
    avatar.add(torso);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), skinMat);
    head.position.y = 0.54;
    avatar.add(head);

    // Arms
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.06), shirtMat);
    armL.position.set(-0.19, 0.24, -0.08);
    armL.rotation.x = 0.8;
    avatar.add(armL);

    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.06), shirtMat);
    armR.position.set(0.19, 0.24, -0.08);
    armR.rotation.x = 0.8;
    avatar.add(armR);

    this.proceduralAvatars.push({ avatar, armL, armR });
    this.scene.add(avatar);
    return avatar;
  }

  update(delta, time) {
    this.mixers.forEach(m => m.update(delta));
    this.proceduralAvatars.forEach((a, i) => {
      const tap = Math.sin(time * 16 + i) * 0.08;
      a.armL.rotation.x = 0.8 + tap;
      a.armR.rotation.x = 0.8 - tap;
    });
  }
}
