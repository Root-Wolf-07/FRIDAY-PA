/**
 * Procedural PBR Textures & HDRI Studio Environment Generator for Three.js
 * Generates photorealistic textures for Walnut Wood, Commercial Carpet Tiles,
 * Polished Concrete, Architectural Plaster Drywall, Brushed Aluminum,
 * Monstera Botanical Leaves, Mechanical Keyboards, and Indoor Studio HDRI maps.
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('office_pbr_textures.js: THREE is not defined.');
    return;
  }

  const PBRTextures = {};

  // Helper to create an offscreen canvas
  function createCanvas(w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    return canvas;
  }

  /**
   * 1. Indoor Studio & City HDRI Environment Map Generator
   * Creates a natural high-dynamic-range lighting cubemap using PMREMGenerator
   * Simulates large diffuse daylight windows, warm overhead ceiling panels (3500K-4000K),
   * and subtle architectural walls to create photorealistic reflections on glass & metal.
   */
  PBRTextures.createStudioEnvironment = function (renderer) {
    if (!renderer || !THREE.PMREMGenerator) return null;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileCubemapShader();

    // Build virtual indoor studio room with emissive light panels
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x0e1724);

    // Warm ceiling recessed light panels (3500K - 4000K)
    const ceilingGeo = new THREE.PlaneGeometry(8, 8);
    const ceilingMat = new THREE.MeshBasicMaterial({ color: 0xfff3e3 });
    const ceilingLight = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceilingLight.position.set(0, 7.5, 0);
    ceilingLight.rotation.x = Math.PI / 2;
    envScene.add(ceilingLight);

    // Large daylight window bank (cool sky daylight 5500K)
    const windowGeo = new THREE.PlaneGeometry(12, 6);
    const windowMat = new THREE.MeshBasicMaterial({ color: 0xd6ebff });
    const windowLight = new THREE.Mesh(windowGeo, windowMat);
    windowLight.position.set(9.5, 3.5, 0);
    windowLight.rotation.y = -Math.PI / 2;
    envScene.add(windowLight);

    // Secondary fill window
    const windowGeo2 = new THREE.PlaneGeometry(8, 5);
    const windowMat2 = new THREE.MeshBasicMaterial({ color: 0x9bc7f0 });
    const windowLight2 = new THREE.Mesh(windowGeo2, windowMat2);
    windowLight2.position.set(0, 3.5, -9.5);
    envScene.add(windowLight2);

    // Warm wooden floor reflection bounce
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.MeshBasicMaterial({ color: 0x1a120c });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -4, 0);
    floorMesh.rotation.x = -Math.PI / 2;
    envScene.add(floorMesh);

    // Render into PMREM render target
    const renderTarget = pmremGenerator.fromScene(envScene);
    pmremGenerator.dispose();

    // Clean up temporary geometries
    ceilingGeo.dispose();
    windowGeo.dispose();
    windowGeo2.dispose();
    floorGeo.dispose();
    ceilingMat.dispose();
    windowMat.dispose();
    windowMat2.dispose();
    floorMat.dispose();

    return renderTarget.texture;
  };

  /**
   * 2. Matte Black Walnut & Natural Oak Wood PBR Textures
   */
  PBRTextures.createWalnutWood = function (width = 1024, height = 512, isOak = false) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Base background tone
    const baseColor = isOak ? '#a67d52' : '#1f1610';
    const grainColor1 = isOak ? '#8f653b' : '#140e0a';
    const grainColor2 = isOak ? '#bc9367' : '#2d2018';
    const microColor = isOak ? '#78532f' : '#0c0805';

    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, width, height);

    // Longitudinal organic grain lines
    const numGrains = 140;
    for (let i = 0; i < numGrains; i++) {
      const y = (i / numGrains) * height + (Math.random() - 0.5) * 6;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x < width; x += 30) {
        const wave = Math.sin((x / width) * Math.PI * 4 + i * 0.3) * 3.5;
        const noise = (Math.random() - 0.5) * 2;
        ctx.lineTo(x, y + wave + noise);
      }
      ctx.strokeStyle = Math.random() > 0.4 ? grainColor1 : grainColor2;
      ctx.lineWidth = 0.8 + Math.random() * 1.6;
      ctx.globalAlpha = 0.28 + Math.random() * 0.45;
      ctx.stroke();
    }

    // Subtle natural knot swirl
    ctx.save();
    ctx.beginPath();
    const kx = width * 0.35;
    const ky = height * 0.48;
    ctx.ellipse(kx, ky, 65, 14, 0.08, 0, Math.PI * 2);
    ctx.strokeStyle = grainColor1;
    ctx.lineWidth = 1.4;
    ctx.globalAlpha = 0.4;
    ctx.stroke();
    ctx.restore();

    // Fine micro-fiber streaks
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = microColor;
    for (let i = 0; i < 4000; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      ctx.fillRect(px, py, 12 + Math.random() * 35, 1);
    }
    ctx.globalAlpha = 1.0;

    // Create Three.js Texture
    const diffuseMap = new THREE.CanvasTexture(canvas);
    diffuseMap.wrapS = THREE.RepeatWrapping;
    diffuseMap.wrapT = THREE.RepeatWrapping;

    // Bump Map
    const bumpCanvas = createCanvas(width / 2, height / 2);
    const bCtx = bumpCanvas.getContext('2d');
    bCtx.drawImage(canvas, 0, 0, bumpCanvas.width, bumpCanvas.height);
    // Invert & filter for fine tactile relief
    const imgData = bCtx.getImageData(0, 0, bumpCanvas.width, bumpCanvas.height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
    bCtx.putImageData(imgData, 0, 0);

    const bumpMap = new THREE.CanvasTexture(bumpCanvas);
    bumpMap.wrapS = THREE.RepeatWrapping;
    bumpMap.wrapT = THREE.RepeatWrapping;

    return { diffuseMap, bumpMap };
  };

  /**
   * 3. Neutral Commercial Carpet Tiles PBR Texture
   * Modular 50x50 cm carpet tile pattern with acoustic fiber micro-weave & seam channels
   */
  PBRTextures.createCarpetTiles = function (width = 1024, height = 1024) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Base dark slate blue/charcoal office carpet
    ctx.fillStyle = '#0f1722';
    ctx.fillRect(0, 0, width, height);

    const tileSize = width / 4; // 4x4 grid of 50cm tiles

    // Draw individual tiles with subtle alternating grain and tonal shift
    for (let gx = 0; gx < 4; gx++) {
      for (let gy = 0; gy < 4; gy++) {
        const x = gx * tileSize;
        const y = gy * tileSize;
        const isOdd = (gx + gy) % 2 === 1;

        // Base tile tone
        ctx.fillStyle = isOdd ? '#141e2c' : '#111a26';
        ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);

        // Acoustic fiber loops
        ctx.fillStyle = isOdd ? '#192638' : '#172232';
        for (let i = 0; i < 400; i++) {
          const fx = x + 4 + Math.random() * (tileSize - 8);
          const fy = y + 4 + Math.random() * (tileSize - 8);
          ctx.fillRect(fx, fy, isOdd ? 2 : 1, isOdd ? 1 : 2);
        }

        // Seam bevels / border channels
        ctx.strokeStyle = '#080d14';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(x + 1, y + 1, tileSize - 2, tileSize - 2);
      }
    }

    const diffuseMap = new THREE.CanvasTexture(canvas);
    diffuseMap.wrapS = THREE.RepeatWrapping;
    diffuseMap.wrapT = THREE.RepeatWrapping;
    diffuseMap.repeat.set(2, 2);

    // Bump map for carpet pile relief
    const bumpCanvas = createCanvas(512, 512);
    const bCtx = bumpCanvas.getContext('2d');
    bCtx.drawImage(canvas, 0, 0, 512, 512);
    const bumpMap = new THREE.CanvasTexture(bumpCanvas);
    bumpMap.wrapS = THREE.RepeatWrapping;
    bumpMap.wrapT = THREE.RepeatWrapping;
    bumpMap.repeat.set(2, 2);

    return { diffuseMap, bumpMap };
  };

  /**
   * 4. Polished Architectural Concrete PBR Texture
   * Subtle aggregates, trowel feathering, smooth specular sheen (roughness: 0.35, clearcoat: 0.2)
   */
  PBRTextures.createPolishedConcrete = function (width = 1024, height = 1024) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Base concrete grey
    ctx.fillStyle = '#161e2a';
    ctx.fillRect(0, 0, width, height);

    // Trowel feathering clouds
    for (let i = 0; i < 35; i++) {
      const cx = Math.random() * width;
      const cy = Math.random() * height;
      const rad = 60 + Math.random() * 140;
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, rad);
      const tone = Math.random() > 0.5 ? 'rgba(30, 42, 58, 0.45)' : 'rgba(16, 22, 32, 0.45)';
      grad.addColorStop(0, tone);
      grad.addColorStop(1, 'rgba(22, 30, 42, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // Fine mineral aggregates (tiny dark and light specks)
    for (let i = 0; i < 6000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillStyle = Math.random() > 0.5 ? '#0c121c' : '#223044';
      ctx.fillRect(x, y, 1.2, 1.2);
    }

    // Expansion joint grid line
    ctx.strokeStyle = '#090e16';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2);
    ctx.stroke();

    const diffuseMap = new THREE.CanvasTexture(canvas);
    diffuseMap.wrapS = THREE.RepeatWrapping;
    diffuseMap.wrapT = THREE.RepeatWrapping;
    diffuseMap.repeat.set(3, 3);

    return { diffuseMap };
  };

  /**
   * 5. Architectural Drywall / Plaster Bump Map
   * Subtle eggshell stipple texture providing fine tactile surface relief under glancing light
   */
  PBRTextures.createDrywallPlaster = function (width = 512, height = 512) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, width, height);

    // Fine stipple noise
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const n = (Math.random() - 0.5) * 22;
      const val = Math.min(255, Math.max(0, 128 + n));
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
    }
    ctx.putImageData(imgData, 0, 0);

    const bumpMap = new THREE.CanvasTexture(canvas);
    bumpMap.wrapS = THREE.RepeatWrapping;
    bumpMap.wrapT = THREE.RepeatWrapping;
    bumpMap.repeat.set(4, 4);

    return { bumpMap };
  };

  /**
   * 6. Brushed Powder-Coated Black Aluminum Texture
   * High metalness (0.85), low roughness (0.3), fine linear brushed micro-scratches
   */
  PBRTextures.createBrushedAluminum = function (width = 512, height = 512) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0a1018';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#1c2838';
    ctx.globalAlpha = 0.18;
    for (let i = 0; i < 1800; i++) {
      const y = Math.random() * height;
      const x = Math.random() * width;
      ctx.fillRect(x, y, 40 + Math.random() * 90, 1);
    }
    ctx.globalAlpha = 1.0;

    const roughnessMap = new THREE.CanvasTexture(canvas);
    roughnessMap.wrapS = THREE.RepeatWrapping;
    roughnessMap.wrapT = THREE.RepeatWrapping;

    return { roughnessMap };
  };

  /**
   * 7. Realistic Monstera Leaf Texture
   * Deep emerald green botanic leaf texture with prominent midrib and lateral veins
   */
  PBRTextures.createMonsteraLeaf = function (width = 512, height = 512) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Base rich botanical green gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#103822');
    grad.addColorStop(0.5, '#164a2e');
    grad.addColorStop(1, '#0c2e1b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Central primary midrib vein
    ctx.strokeStyle = '#28754b';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(width / 2, height);
    ctx.quadraticCurveTo(width / 2 + 10, height / 2, width / 2, 0);
    ctx.stroke();

    // Lateral secondary veins branching outwards
    ctx.strokeStyle = '#21633e';
    ctx.lineWidth = 2.5;
    for (let i = 40; i < height - 30; i += 35) {
      // Left vein
      ctx.beginPath();
      ctx.moveTo(width / 2, i);
      ctx.quadraticCurveTo(width * 0.28, i - 15, 20, i - 35);
      ctx.stroke();

      // Right vein
      ctx.beginPath();
      ctx.moveTo(width / 2, i);
      ctx.quadraticCurveTo(width * 0.72, i - 15, width - 20, i - 35);
      ctx.stroke();
    }

    const diffuseMap = new THREE.CanvasTexture(canvas);
    return { diffuseMap };
  };

  /**
   * 8. Oversized Desk Mat & Mechanical Keyboard Keycap Texture
   */
  PBRTextures.createDeskMatTexture = function (width = 1024, height = 512) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Charcoal cordura micro-weave
    ctx.fillStyle = '#0a0f16';
    ctx.fillRect(0, 0, width, height);

    // Stitched perimeter edge
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 6]);
    ctx.strokeRect(12, 12, width - 24, height - 24);
    ctx.setLineDash([]);

    // Modern tech brand insignia in corner
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 18px "Courier New", monospace';
    ctx.fillText('FRIDAY // NEURAL-DESK // STC-50', 32, height - 32);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  // Export to global namespace
  window.OfficePBRTextures = PBRTextures;

})();
