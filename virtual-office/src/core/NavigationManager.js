import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class NavigationManager {
  constructor(camera, domElement, onRoomSelected) {
    this.camera = camera;
    this.domElement = domElement;
    this.onRoomSelected = onRoomSelected;
    this.mode = 'orbit'; // 'orbit' | 'firstperson'

    this.orbitControls = new OrbitControls(this.camera, this.domElement);
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.08;
    this.orbitControls.target.set(0, 1.2, 0);
    this.orbitControls.maxPolarAngle = Math.PI / 2.05;
    this.orbitControls.minDistance = 3.0;
    this.orbitControls.maxDistance = 65.0;

    // Camera Tweening
    this.tween = {
      active: false,
      startPos: new THREE.Vector3(),
      endPos: new THREE.Vector3(),
      startTarget: new THREE.Vector3(),
      endTarget: new THREE.Vector3(),
      progress: 0,
      duration: 1.2
    };

    // First Person State
    this.fp = {
      moveForward: false,
      moveBackward: false,
      moveLeft: false,
      moveRight: false,
      velocity: new THREE.Vector3(),
      direction: new THREE.Vector3()
    };

    this.bindKeys();
  }

  bindKeys() {
    window.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': this.fp.moveForward = true; break;
        case 'KeyS': case 'ArrowDown': this.fp.moveBackward = true; break;
        case 'KeyA': case 'ArrowLeft': this.fp.moveLeft = true; break;
        case 'KeyD': case 'ArrowRight': this.fp.moveRight = true; break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp': this.fp.moveForward = false; break;
        case 'KeyS': case 'ArrowDown': this.fp.moveBackward = false; break;
        case 'KeyA': case 'ArrowLeft': this.fp.moveLeft = false; break;
        case 'KeyD': case 'ArrowRight': this.fp.moveRight = false; break;
      }
    });
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === 'firstperson') {
      this.orbitControls.enabled = false;
      this.camera.position.set(0, 1.65, 4);
    } else {
      this.orbitControls.enabled = true;
    }
  }

  flyTo(pos, lookAtTarget) {
    this.tween.active = true;
    this.tween.progress = 0;
    this.tween.startPos.copy(this.camera.position);
    this.tween.endPos.set(pos.x, pos.y, pos.z);
    this.tween.startTarget.copy(this.orbitControls.target);
    this.tween.endTarget.set(lookAtTarget.x, lookAtTarget.y, lookAtTarget.z);
  }

  update(delta) {
    if (this.tween.active) {
      this.tween.progress += delta / this.tween.duration;
      const t = Math.min(1.0, this.tween.progress);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      this.camera.position.lerpVectors(this.tween.startPos, this.tween.endPos, ease);
      this.orbitControls.target.lerpVectors(this.tween.startTarget, this.tween.endTarget, ease);

      if (t >= 1.0) {
        this.tween.active = false;
      }
    }

    if (this.mode === 'firstperson' && !this.tween.active) {
      const speed = 6.5;
      this.fp.velocity.x -= this.fp.velocity.x * 10.0 * delta;
      this.fp.velocity.z -= this.fp.velocity.z * 10.0 * delta;

      this.fp.direction.z = Number(this.fp.moveForward) - Number(this.fp.moveBackward);
      this.fp.direction.x = Number(this.fp.moveRight) - Number(this.fp.moveLeft);
      this.fp.direction.normalize();

      if (this.fp.moveForward || this.fp.moveBackward) {
        this.fp.velocity.z -= this.fp.direction.z * speed * delta;
      }
      if (this.fp.moveLeft || this.fp.moveRight) {
        this.fp.velocity.x -= this.fp.direction.x * speed * delta;
      }

      this.camera.translateZ(this.fp.velocity.z);
      this.camera.translateX(this.fp.velocity.x);
      this.camera.position.y = 1.65;

      this.camera.position.x = Math.max(-21, Math.min(21, this.camera.position.x));
      this.camera.position.z = Math.max(-15, Math.min(15, this.camera.position.z));
    }

    if (this.mode === 'orbit' && this.orbitControls.enabled) {
      this.orbitControls.update();
    }
  }
}
