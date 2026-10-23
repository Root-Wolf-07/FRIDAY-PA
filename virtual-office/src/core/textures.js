/**
 * Procedural PBR Textures & Studio Environment for Three.js (ES Module)
 */

import * as THREE from 'three';

function createCanvas(w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  return canvas;
}

export function createStudioEnvironment(renderer) {
  if (!renderer || !THREE.PMREMGenerator) return null;

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileCubemapShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x0e1724);

  // Ceiling Light Panel (3800K)
  const ceilingGeo = new THREE.PlaneGeometry(8, 8);
  const ceilingLight = new THREE.Mesh(ceilingGeo, new THREE.MeshBasicMaterial({ color: 0xfff3e3 }));
  ceilingLight.position.set(0, 7.5, 0);
  ceilingLight.rotation.x = Math.PI / 2;
  envScene.add(ceilingLight);

  // Window Daylight Panel (5500K)
  const windowGeo = new THREE.PlaneGeometry(12, 6);
  const windowLight = new THREE.Mesh(windowGeo, new THREE.MeshBasicMaterial({ color: 0xd6ebff }));
  windowLight.position.set(9.5, 3.5, 0);
  windowLight.rotation.y = -Math.PI / 2;
  envScene.add(windowLight);

  const renderTarget = pmremGenerator.fromScene(envScene);
  pmremGenerator.dispose();
  ceilingGeo.dispose();
  windowGeo.dispose();

  return renderTarget.texture;
}

export function createWalnutWood(width = 1024, height = 512, isOak = false) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const baseColor = isOak ? '#a67d52' : '#1f1610';
  const grainColor1 = isOak ? '#8f653b' : '#140e0a';
  const grainColor2 = isOak ? '#bc9367' : '#2d2018';

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 120; i++) {
    const y = (i / 120) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < width; x += 30) {
      const wave = Math.sin((x / width) * Math.PI * 4 + i * 0.3) * 3;
      ctx.lineTo(x, y + wave);
    }
    ctx.strokeStyle = Math.random() > 0.4 ? grainColor1 : grainColor2;
    ctx.lineWidth = 1.0 + Math.random() * 1.5;
    ctx.globalAlpha = 0.35 + Math.random() * 0.4;
    ctx.stroke();
  }
  ctx.globalAlpha = 1.0;

  const diffuseMap = new THREE.CanvasTexture(canvas);
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.RepeatWrapping;
  return { diffuseMap };
}

export function createCarpetTiles(width = 1024, height = 1024) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0f1722';
  ctx.fillRect(0, 0, width, height);
  const tileSize = width / 4;

  for (let gx = 0; gx < 4; gx++) {
    for (let gy = 0; gy < 4; gy++) {
      const x = gx * tileSize;
      const y = gy * tileSize;
      const isOdd = (gx + gy) % 2 === 1;
      ctx.fillStyle = isOdd ? '#141e2c' : '#111a26';
      ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);
      ctx.strokeStyle = '#080d14';
      ctx.lineWidth = 2.0;
      ctx.strokeRect(x + 1, y + 1, tileSize - 2, tileSize - 2);
    }
  }

  const diffuseMap = new THREE.CanvasTexture(canvas);
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.RepeatWrapping;
  diffuseMap.repeat.set(2, 2);
  return { diffuseMap };
}

export function createPolishedConcrete(width = 1024, height = 1024) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#161e2a';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.fillStyle = Math.random() > 0.5 ? '#0c121c' : '#223044';
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  const diffuseMap = new THREE.CanvasTexture(canvas);
  diffuseMap.wrapS = THREE.RepeatWrapping;
  diffuseMap.wrapT = THREE.RepeatWrapping;
  diffuseMap.repeat.set(3, 3);
  return { diffuseMap };
}

export function createMonsteraLeaf(width = 512, height = 512) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#103822');
  grad.addColorStop(0.5, '#164a2e');
  grad.addColorStop(1, '#0c2e1b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#28754b';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(width / 2, height);
  ctx.quadraticCurveTo(width / 2 + 10, height / 2, width / 2, 0);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}
