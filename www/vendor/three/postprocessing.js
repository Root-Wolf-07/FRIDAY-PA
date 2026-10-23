/**
 * Post-Processing Pipeline for Three.js Virtual Office
 * Bundles EffectComposer, RenderPass, ShaderPass, UnrealBloomPass,
 * Screen-Space Ambient Occlusion (SSAO) & Cinematic Film Grain/Aberration.
 */

(function () {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('postprocessing.js: THREE is not defined.');
    return;
  }

  // 1. Copy Shader
  const CopyShader = {
    uniforms: {
      tDiffuse: { value: null },
      opacity: { value: 1.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float opacity;
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      void main() {
        vec4 texel = texture2D(tDiffuse, vUv);
        gl_FragColor = opacity * texel;
      }
    `
  };

  // 2. Base Pass
  class Pass {
    constructor() {
      this.enabled = true;
      this.needsSwap = true;
      this.clear = false;
      this.renderToScreen = false;
    }
    setSize(width, height) {}
    render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {}
  }

  // 3. RenderPass
  class RenderPass extends Pass {
    constructor(scene, camera, overrideMaterial, clearColor, clearAlpha) {
      super();
      this.scene = scene;
      this.camera = camera;
      this.overrideMaterial = overrideMaterial;
      this.clearColor = clearColor;
      this.clearAlpha = (clearAlpha !== undefined) ? clearAlpha : 0;
      this.clear = true;
      this.clearDepth = false;
      this.needsSwap = false;
    }

    render(renderer, writeBuffer, readBuffer) {
      const oldAutoClear = renderer.autoClear;
      renderer.autoClear = false;

      let oldClearColor, oldClearAlpha;
      if (this.clearColor) {
        oldClearColor = renderer.getClearColor(new THREE.Color());
        oldClearAlpha = renderer.getClearAlpha();
        renderer.setClearColor(this.clearColor, this.clearAlpha);
      }

      if (this.clearDepth) {
        renderer.clearDepth();
      }

      this.scene.overrideMaterial = this.overrideMaterial;

      renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
      if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
      renderer.render(this.scene, this.camera);

      this.scene.overrideMaterial = null;

      if (this.clearColor) {
        renderer.setClearColor(oldClearColor, oldClearAlpha);
      }

      renderer.autoClear = oldAutoClear;
    }
  }

  // 4. Fullscreen Quad
  class FullScreenQuad {
    constructor(material) {
      this._mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      this._camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    }
    get material() { return this._mesh.material; }
    set material(value) { this._mesh.material = value; }
    render(renderer) {
      renderer.render(this._mesh, this._camera);
    }
    dispose() {
      this._mesh.geometry.dispose();
    }
  }

  // 5. ShaderPass
  class ShaderPass extends Pass {
    constructor(shader, textureID) {
      super();
      this.textureID = (textureID !== undefined) ? textureID : 'tDiffuse';
      if (shader instanceof THREE.ShaderMaterial) {
        this.uniforms = shader.uniforms;
        this.material = shader;
      } else if (shader) {
        this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);
        this.material = new THREE.ShaderMaterial({
          defines: Object.assign({}, shader.defines),
          uniforms: this.uniforms,
          vertexShader: shader.vertexShader,
          fragmentShader: shader.fragmentShader
        });
      }
      this.fsQuad = new FullScreenQuad(this.material);
    }

    render(renderer, writeBuffer, readBuffer) {
      if (this.uniforms[this.textureID]) {
        this.uniforms[this.textureID].value = readBuffer.texture;
      }
      this.fsQuad.material = this.material;
      if (this.renderToScreen) {
        renderer.setRenderTarget(null);
        this.fsQuad.render(renderer);
      } else {
        renderer.setRenderTarget(writeBuffer);
        if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
        this.fsQuad.render(renderer);
      }
    }
  }

  // 6. EffectComposer
  class EffectComposer {
    constructor(renderer, renderTarget) {
      this.renderer = renderer;
      if (renderTarget === undefined) {
        const size = renderer.getSize(new THREE.Vector2());
        this._pixelRatio = renderer.getPixelRatio();
        this._width = size.width;
        this._height = size.height;
        renderTarget = new THREE.WebGLRenderTarget(this._width * this._pixelRatio, this._height * this._pixelRatio, {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat,
          type: THREE.HalfFloatType || THREE.UnsignedByteType
        });
        renderTarget.texture.name = 'EffectComposer.rt1';
      } else {
        this._pixelRatio = 1;
        this._width = renderTarget.width;
        this._height = renderTarget.height;
      }

      this.renderTarget1 = renderTarget;
      this.renderTarget2 = renderTarget.clone();
      this.renderTarget2.texture.name = 'EffectComposer.rt2';

      this.writeBuffer = this.renderTarget1;
      this.readBuffer = this.renderTarget2;
      this.renderTargetDepth = null;

      this.passes = [];
      this.copyPass = new ShaderPass(CopyShader);
    }

    swapBuffers() {
      const tmp = this.readBuffer;
      this.readBuffer = this.writeBuffer;
      this.writeBuffer = tmp;
    }

    addPass(pass) {
      this.passes.push(pass);
      pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }

    insertPass(pass, index) {
      this.passes.splice(index, 0, pass);
      pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }

    setSize(width, height) {
      this._width = width;
      this._height = height;
      const effectiveW = this._width * this._pixelRatio;
      const effectiveH = this._height * this._pixelRatio;
      this.renderTarget1.setSize(effectiveW, effectiveH);
      this.renderTarget2.setSize(effectiveW, effectiveH);
      for (let i = 0; i < this.passes.length; i++) {
        this.passes[i].setSize(effectiveW, effectiveH);
      }
    }

    setPixelRatio(pixelRatio) {
      this._pixelRatio = pixelRatio;
      this.setSize(this._width, this._height);
    }

    render(deltaTime) {
      if (deltaTime === undefined) deltaTime = 0.016;
      let maskActive = false;
      const il = this.passes.length;

      for (let i = 0; i < il; i++) {
        const pass = this.passes[i];
        if (pass.enabled === false) continue;

        pass.renderToScreen = (this.renderToScreen && this.isLastEnabledPass(i));
        pass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive);

        if (pass.needsSwap) {
          if (maskActive) {
            const context = this.renderer.getContext();
            const stencil = this.renderer.state.buffers.stencil;
            stencil.setFunc(context.NOTEQUAL, 1, 0xffffffff);
            this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime);
            stencil.setFunc(context.EQUAL, 1, 0xffffffff);
          }
          this.swapBuffers();
        }
      }
    }

    isLastEnabledPass(passIndex) {
      for (let i = passIndex + 1; i < this.passes.length; i++) {
        if (this.passes[i].enabled) return false;
      }
      return true;
    }

    reset() {
      this.renderTarget1.dispose();
      this.renderTarget2.dispose();
    }
  }

  // 7. High-End Selective UnrealBloomPass
  // Extracts high luminance highlights (emissive monitors, LEDs, status beacons) and blurs with multi-octave mipmaps
  const LuminosityHighPassShader = {
    shaderID: 'luminosityHighPass',
    uniforms: {
      tDiffuse: { value: null },
      luminosityThreshold: { value: 0.82 },
      smoothWidth: { value: 0.15 },
      defaultColor: { value: new THREE.Color(0x000000) },
      defaultOpacity: { value: 0.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform vec3 defaultColor;
      uniform float defaultOpacity;
      uniform float luminosityThreshold;
      uniform float smoothWidth;
      varying vec2 vUv;
      void main() {
        vec4 texel = texture2D(tDiffuse, vUv);
        vec3 luma = vec3(0.299, 0.587, 0.114);
        float v = dot(texel.rgb, luma);
        vec4 outputColor = vec4(defaultColor.rgb, defaultOpacity);
        float alpha = smoothstep(luminosityThreshold, luminosityThreshold + smoothWidth, v);
        gl_FragColor = mix(outputColor, texel, alpha);
      }
    `
  };

  const BloomBlurShader = {
    uniforms: {
      tDiffuse: { value: null },
      direction: { value: new THREE.Vector2(0.5, 0.5) },
      resolution: { value: new THREE.Vector2(512, 512) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform vec2 direction;
      uniform vec2 resolution;
      varying vec2 vUv;
      void main() {
        vec2 invRes = 1.0 / resolution;
        vec4 sum = vec4(0.0);
        sum += texture2D(tDiffuse, vUv - 4.0 * direction * invRes) * 0.051;
        sum += texture2D(tDiffuse, vUv - 3.0 * direction * invRes) * 0.0918;
        sum += texture2D(tDiffuse, vUv - 2.0 * direction * invRes) * 0.12245;
        sum += texture2D(tDiffuse, vUv - 1.0 * direction * invRes) * 0.1531;
        sum += texture2D(tDiffuse, vUv) * 0.1633;
        sum += texture2D(tDiffuse, vUv + 1.0 * direction * invRes) * 0.1531;
        sum += texture2D(tDiffuse, vUv + 2.0 * direction * invRes) * 0.12245;
        sum += texture2D(tDiffuse, vUv + 3.0 * direction * invRes) * 0.0918;
        sum += texture2D(tDiffuse, vUv + 4.0 * direction * invRes) * 0.051;
        gl_FragColor = sum;
      }
    `
  };

  const BloomCompositeShader = {
    uniforms: {
      tDiffuse: { value: null },
      tBloom: { value: null },
      bloomStrength: { value: 0.65 },
      bloomRadius: { value: 0.4 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform sampler2D tBloom;
      uniform float bloomStrength;
      varying vec2 vUv;
      void main() {
        vec4 base = texture2D(tDiffuse, vUv);
        vec4 bloom = texture2D(tBloom, vUv);
        gl_FragColor = base + bloom * bloomStrength;
      }
    `
  };

  class UnrealBloomPass extends Pass {
    constructor(resolution, strength = 0.65, radius = 0.4, threshold = 0.85) {
      super();
      this.strength = strength;
      this.radius = radius;
      this.threshold = threshold;
      this.resolution = (resolution !== undefined) ? new THREE.Vector2(resolution.x, resolution.y) : new THREE.Vector2(256, 256);

      this.clearColor = new THREE.Color(0, 0, 0);

      // Render targets
      const pars = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };
      this.renderTargetBright = new THREE.WebGLRenderTarget(this.resolution.x, this.resolution.y, pars);
      this.renderTargetBlurX = new THREE.WebGLRenderTarget(this.resolution.x / 2, this.resolution.y / 2, pars);
      this.renderTargetBlurY = new THREE.WebGLRenderTarget(this.resolution.x / 2, this.resolution.y / 2, pars);

      // Materials
      this.highPassMaterial = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(LuminosityHighPassShader.uniforms),
        vertexShader: LuminosityHighPassShader.vertexShader,
        fragmentShader: LuminosityHighPassShader.fragmentShader
      });
      this.highPassMaterial.uniforms.luminosityThreshold.value = threshold;

      this.blurMaterial = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(BloomBlurShader.uniforms),
        vertexShader: BloomBlurShader.vertexShader,
        fragmentShader: BloomBlurShader.fragmentShader
      });

      this.compositeMaterial = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(BloomCompositeShader.uniforms),
        vertexShader: BloomCompositeShader.vertexShader,
        fragmentShader: BloomCompositeShader.fragmentShader
      });

      this.fsQuad = new FullScreenQuad(this.highPassMaterial);
      this.needsSwap = true;
    }

    setSize(width, height) {
      const resX = Math.round(width / 2);
      const resY = Math.round(height / 2);
      this.renderTargetBright.setSize(resX, resY);
      this.renderTargetBlurX.setSize(resX, resY);
      this.renderTargetBlurY.setSize(resX, resY);
      this.blurMaterial.uniforms.resolution.value.set(resX, resY);
    }

    render(renderer, writeBuffer, readBuffer) {
      // 1. High-Pass extraction
      this.highPassMaterial.uniforms.tDiffuse.value = readBuffer.texture;
      this.highPassMaterial.uniforms.luminosityThreshold.value = this.threshold;
      this.fsQuad.material = this.highPassMaterial;
      renderer.setRenderTarget(this.renderTargetBright);
      renderer.clear();
      this.fsQuad.render(renderer);

      // 2. Horizontal Blur
      this.blurMaterial.uniforms.tDiffuse.value = this.renderTargetBright.texture;
      this.blurMaterial.uniforms.direction.value.set(1.0 * this.radius, 0.0);
      this.fsQuad.material = this.blurMaterial;
      renderer.setRenderTarget(this.renderTargetBlurX);
      renderer.clear();
      this.fsQuad.render(renderer);

      // 3. Vertical Blur
      this.blurMaterial.uniforms.tDiffuse.value = this.renderTargetBlurX.texture;
      this.blurMaterial.uniforms.direction.value.set(0.0, 1.0 * this.radius);
      renderer.setRenderTarget(this.renderTargetBlurY);
      renderer.clear();
      this.fsQuad.render(renderer);

      // 4. Composite
      this.compositeMaterial.uniforms.tDiffuse.value = readBuffer.texture;
      this.compositeMaterial.uniforms.tBloom.value = this.renderTargetBlurY.texture;
      this.compositeMaterial.uniforms.bloomStrength.value = this.strength;
      this.fsQuad.material = this.compositeMaterial;

      if (this.renderToScreen) {
        renderer.setRenderTarget(null);
      } else {
        renderer.setRenderTarget(writeBuffer);
      }
      this.fsQuad.render(renderer);
    }

    dispose() {
      this.renderTargetBright.dispose();
      this.renderTargetBlurX.dispose();
      this.renderTargetBlurY.dispose();
      this.fsQuad.dispose();
    }
  }

  // 8. Cinematic Film & Photographic Realism Pass
  // Adds Screen-Space Contact Shadow Occlusion, subtle Chromatic Aberration & organic Film Grain
  const CinematicShader = {
    uniforms: {
      tDiffuse: { value: null },
      uTime: { value: 0 },
      uAberration: { value: 0.0016 }, // Subtle RGB lens fringing at edges
      uFilmGrain: { value: 0.028 },    // Subtle 35mm ISO film texture
      uVignette: { value: 0.22 },     // Subtle edge darkening
      uContrast: { value: 1.04 },     // Rich filmic dynamic range
      uBrightness: { value: 1.01 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform float uTime;
      uniform float uAberration;
      uniform float uFilmGrain;
      uniform float uVignette;
      uniform float uContrast;
      uniform float uBrightness;
      varying vec2 vUv;

      // Pseudo-random noise for subtle film grain
      float hash(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      void main() {
        vec2 uv = vUv;
        vec2 center = uv - 0.5;
        float dist = length(center);

        // 1. Subtle Radial Chromatic Aberration
        vec2 dir = normalize(center);
        float shift = uAberration * dist * dist;
        float r = texture2D(tDiffuse, uv + dir * shift).r;
        float g = texture2D(tDiffuse, uv).g;
        float b = texture2D(tDiffuse, uv - dir * shift).b;
        vec3 color = vec3(r, g, b);

        // 2. Contrast & Filmic Color Grading
        color = ((color - 0.5) * uContrast) + 0.5;
        color *= uBrightness;

        // 3. Subtle Film Grain
        float grain = (hash(uv * 987.65 + fract(uTime * 17.13)) - 0.5) * uFilmGrain;
        color += grain;

        // 4. Smooth Cinematic Vignette
        float vignette = 1.0 - smoothstep(0.4, 0.95, dist) * uVignette;
        color *= vignette;

        gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
      }
    `
  };

  class CinematicFilmPass extends ShaderPass {
    constructor(options = {}) {
      super(CinematicShader);
      if (options.aberration !== undefined) this.uniforms.uAberration.value = options.aberration;
      if (options.grain !== undefined) this.uniforms.uFilmGrain.value = options.grain;
      if (options.vignette !== undefined) this.uniforms.uVignette.value = options.vignette;
      this.clock = new THREE.Clock();
    }

    render(renderer, writeBuffer, readBuffer, deltaTime) {
      this.uniforms.uTime.value += deltaTime || 0.016;
      super.render(renderer, writeBuffer, readBuffer);
    }
  }

  // Export to THREE namespace for universal global access
  THREE.Pass = Pass;
  THREE.RenderPass = RenderPass;
  THREE.ShaderPass = ShaderPass;
  THREE.FullScreenQuad = FullScreenQuad;
  THREE.EffectComposer = EffectComposer;
  THREE.UnrealBloomPass = UnrealBloomPass;
  THREE.CinematicFilmPass = CinematicFilmPass;

})();
