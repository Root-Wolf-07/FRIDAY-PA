/**
 * FRIDEY Holographic Core & Audio Visualizer Canvas Renderer
 * GOJO OS Arc Reactor HUD Visuals
 */

class FridayCanvasHUD {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.width = 520;
    this.height = 520;
    this.centerX = 260;
    this.centerY = 260;

    this.rotationOuter = 0;
    this.rotationMid = 0;
    this.rotationInner = 0;
    this.time = 0;

    // State modes: 'idle' | 'listening' | 'speaking' | 'processing'
    this.mode = 'idle';

    // Simulated audio frequency amplitudes for visualizer
    this.audioWaveData = new Array(36).fill(0);
    this.surgeWaveRadius = 0;
    this.surgeActive = false;

    // Mouse tilt / parallax
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetTiltX = 0;
    this.targetTiltY = 0;
    this.currentTiltX = 0;
    this.currentTiltY = 0;

    // Particles
    this.particles = [];
    this.initParticles(50);

    this.setupResize();
    this.setupMouseEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupResize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  setupMouseEvents() {
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      this.targetTiltX = Math.max(-15, Math.min(15, x * 0.05));
      this.targetTiltY = Math.max(-15, Math.min(15, y * 0.05));
    });
  }

  initParticles(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        angle: Math.random() * Math.PI * 2,
        distance: 70 + Math.random() * 140,
        speed: (0.005 + Math.random() * 0.012) * (Math.random() > 0.5 ? 1 : -1),
        radius: 1 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.7,
        pulseSpeed: 0.02 + Math.random() * 0.03
      });
    }
  }

  setMode(newMode) {
    this.mode = newMode;
  }

  triggerSurge() {
    this.surgeActive = true;
    this.surgeWaveRadius = 50;
  }

  getPrimaryColor() {
    const computed = getComputedStyle(document.body).getPropertyValue('--theme-primary').trim();
    return computed || '#00f0ff';
  }

  getGlowColor() {
    const computed = getComputedStyle(document.body).getPropertyValue('--theme-glow').trim();
    return computed || 'rgba(0, 240, 255, 0.4)';
  }

  updateAudioData() {
    const primaryFreq = this.time * 0.08;
    const realFreq = (window.FridayVoice && typeof window.FridayVoice.getRealMicFrequencyData === 'function')
      ? window.FridayVoice.getRealMicFrequencyData()
      : null;
    const hasLiveMic = !!(realFreq && window.FridayVoice && window.FridayVoice.isHardwareMicActive());

    for (let i = 0; i < this.audioWaveData.length; i++) {
      let liveFreqVal = 0;
      if (hasLiveMic && realFreq && realFreq.length) {
        liveFreqVal = realFreq[i % realFreq.length] / 255; // 0.0 to 1.0
      }

      if (this.mode === 'speaking') {
        // Dynamic speech waveform
        const wave = Math.sin(primaryFreq * 3 + i * 0.6) * 0.5 + Math.cos(primaryFreq * 5 + i * 1.2) * 0.5;
        this.audioWaveData[i] = 12 + Math.abs(wave) * 32 + liveFreqVal * 16 + Math.random() * 8;
      } else if (this.mode === 'listening' || liveFreqVal > 0.05) {
        // Real acoustic system microphone frequency spectrum!
        if (hasLiveMic && liveFreqVal > 0.02) {
          this.audioWaveData[i] = 6 + liveFreqVal * 44 + Math.random() * (liveFreqVal * 8);
        } else {
          const wave = Math.sin(primaryFreq * 2 + i * 0.4);
          this.audioWaveData[i] = 6 + Math.abs(wave) * 18 + Math.random() * 6;
        }
      } else {
        // Idle gentle harmonic breath
        const wave = Math.sin(primaryFreq + i * 0.25);
        this.audioWaveData[i] = 3 + Math.abs(wave) * 7;
      }
    }
  }

  drawHUD() {
    const ctx = this.ctx;
    const primaryColor = this.getPrimaryColor();
    const glowColor = this.getGlowColor();

    ctx.clearRect(0, 0, this.width, this.height);

    // Apply smooth parallax tilt
    this.currentTiltX += (this.targetTiltX - this.currentTiltX) * 0.08;
    this.currentTiltY += (this.targetTiltY - this.currentTiltY) * 0.08;

    const cx = this.centerX + this.currentTiltX;
    const cy = this.centerY + this.currentTiltY;

    ctx.save();

    // 1. Outer Tech Hash / Degree Scale Ring
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.rotationOuter);
    ctx.strokeStyle = primaryColor;
    ctx.fillStyle = primaryColor;
    ctx.lineWidth = 1.2;

    const outerRadius = 220;
    const tickCount = 72;
    for (let i = 0; i < tickCount; i++) {
      const angle = (i * Math.PI * 2) / tickCount;
      const isMajor = i % 6 === 0;
      const len = isMajor ? 12 : 5;
      const r1 = outerRadius;
      const r2 = outerRadius - len;

      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
      ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
      ctx.globalAlpha = isMajor ? 0.75 : 0.25;
      ctx.stroke();

      if (isMajor && i % 18 === 0) {
        ctx.font = '8px "Share Tech Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const labelR = outerRadius - 18;
        ctx.fillText(`${(i / tickCount * 360).toFixed(0)}°`, Math.cos(angle) * labelR, Math.sin(angle) * labelR);
      }
    }
    ctx.restore();

    // 2. Segmented Arc Shield Ring (Counter-Clockwise)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.rotationMid);
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 3.5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = glowColor;

    const midRadius = 185;
    const segments = 4;
    const arcLen = (Math.PI * 2) / segments;
    const gap = 0.22;

    for (let s = 0; s < segments; s++) {
      const start = s * arcLen + gap / 2;
      const end = (s + 1) * arcLen - gap / 2;
      ctx.beginPath();
      ctx.arc(0, 0, midRadius, start, end);
      ctx.globalAlpha = 0.55;
      ctx.stroke();

      // Chevrons at start of arcs
      const chX = Math.cos(start + 0.1) * midRadius;
      const chY = Math.sin(start + 0.1) * midRadius;
      ctx.beginPath();
      ctx.arc(chX, chY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor;
      ctx.fill();
    }
    ctx.restore();

    // 3. Audio Equalizer Waveform Ring
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 14;
    ctx.shadowColor = glowColor;

    const eqRadius = 140;
    const barCount = this.audioWaveData.length;
    for (let b = 0; b < barCount; b++) {
      const angle = (b * Math.PI * 2) / barCount + this.time * 0.01;
      const height = this.audioWaveData[b];
      const rInner = eqRadius;
      const rOuter = eqRadius + height;

      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * rInner, Math.sin(angle) * rInner);
      ctx.lineTo(Math.cos(angle) * rOuter, Math.sin(angle) * rOuter);
      ctx.globalAlpha = Math.min(1, 0.4 + height / 30);
      ctx.stroke();
    }
    ctx.restore();

    // 4. Rotating Orbiting Particles
    ctx.save();
    ctx.translate(cx, cy);
    for (const p of this.particles) {
      p.angle += p.speed * (this.mode === 'speaking' ? 2.5 : this.mode === 'listening' ? 1.8 : 1);
      const x = Math.cos(p.angle) * p.distance;
      const y = Math.sin(p.angle) * p.distance;
      const alpha = Math.max(0.1, Math.sin(this.time * p.pulseSpeed) * 0.4 + p.alpha);

      ctx.beginPath();
      ctx.arc(x, y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = primaryColor;
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 6;
      ctx.shadowColor = glowColor;
      ctx.fill();
    }
    ctx.restore();

    // 5. Inner Arc Core Sacred Hex & Concentric Glass Rings
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.rotationInner);

    // Inner Glowing Ring
    const innerRadius = 85;
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.8;
    ctx.shadowBlur = 18;
    ctx.shadowColor = glowColor;
    ctx.stroke();

    // Hexagon / Triangle Star Reticle
    const hexRadius = 60;
    ctx.beginPath();
    for (let h = 0; h < 6; h++) {
      const angle = (h * Math.PI) / 3;
      const x = Math.cos(angle) * hexRadius;
      const y = Math.sin(angle) * hexRadius;
      if (h === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.45;
    ctx.stroke();

    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(-hexRadius * 1.3, 0);
    ctx.lineTo(hexRadius * 1.3, 0);
    ctx.moveTo(0, -hexRadius * 1.3);
    ctx.lineTo(0, hexRadius * 1.3);
    ctx.strokeStyle = primaryColor;
    ctx.globalAlpha = 0.25;
    ctx.stroke();
    ctx.restore();

    // 6. Arc Reactor Shockwave surge
    if (this.surgeActive) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.arc(0, 0, this.surgeWaveRadius, 0, Math.PI * 2);
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 4;
      const waveAlpha = Math.max(0, 1 - this.surgeWaveRadius / 240);
      ctx.globalAlpha = waveAlpha;
      ctx.shadowBlur = 25;
      ctx.shadowColor = primaryColor;
      ctx.stroke();
      ctx.restore();

      this.surgeWaveRadius += 7;
      if (this.surgeWaveRadius > 240) {
        this.surgeActive = false;
      }
    }

    ctx.restore();
  }

  animate() {
    this.time++;

    // Dynamic rotation speeds based on mode
    const speedMultiplier = this.mode === 'speaking' ? 2.5 : this.mode === 'listening' ? 1.8 : 1;
    this.rotationOuter += 0.002 * speedMultiplier;
    this.rotationMid -= 0.004 * speedMultiplier;
    this.rotationInner += 0.006 * speedMultiplier;

    this.updateAudioData();
    this.drawHUD();

    requestAnimationFrame(this.animate);
  }
}

/**
 * FRIDEY Digital Neural Communication Matrix Renderer
 * Consolidated Single-Layer Background Visualizer
 * Simulates synaptic firing, neural pathways, and digital data packet transmission.
 */
class FridayNeuralBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.neurons = [];
    this.impulses = [];
    this.maxNeurons = Math.min(90, Math.max(50, Math.floor((this.width * this.height) / 16000)));
    this.maxConnectionDist = 155;

    this.state = 'idle'; // 'idle', 'listening', 'speaking', 'combat'
    this.colors = this.getThemePalette();

    this.mouse = { x: this.width / 2, y: this.height / 2, active: false };

    // Floating digital telemetry streams
    this.dataTags = [
      'TX: 104.2 MB/s',
      'NEURAL_LINK: SYNCED',
      'COMM_FREQ: 1420.45 MHz',
      'GOJO_ENCRYPT: AES-512',
      'SYNAPSE_RATE: 120Hz',
      'LATENCY: 0.8ms',
      'PACKET_ID: #8A4F',
      'QUANTUM_CORE: ACTIVE'
    ];
    this.floatingTags = [];

    this.setupCanvas();
    this.initNeurons();
    this.initFloatingTags();
    this.setupEvents();

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  getThemePalette() {
    const theme = document.body.getAttribute('data-theme') || 'stark';
    switch (theme) {
      case 'war-machine':
        return {
          node: '#ff4400',
          line: 'rgba(255, 60, 0, ',
          glow: 'rgba(255, 120, 40, ',
          impulse: '#ffeb3b',
          tag: 'rgba(255, 140, 50, '
        };
      case 'stealth':
        return {
          node: '#00ff9d',
          line: 'rgba(0, 255, 157, ',
          glow: 'rgba(0, 200, 100, ',
          impulse: '#e0ffe8',
          tag: 'rgba(0, 255, 157, '
        };
      case 'quantum':
        return {
          node: '#bd00ff',
          line: 'rgba(189, 0, 255, ',
          glow: 'rgba(120, 0, 255, ',
          impulse: '#ffffff',
          tag: 'rgba(210, 120, 255, '
        };
      case 'stark':
      default:
        return {
          node: '#00f0ff',
          line: 'rgba(0, 240, 255, ',
          glow: 'rgba(0, 160, 255, ',
          impulse: '#ffffff',
          tag: 'rgba(0, 240, 255, '
        };
    }
  }

  updateTheme() {
    this.colors = this.getThemePalette();
  }

  setState(newState) {
    this.state = newState;
  }

  setupCanvas() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  setupEvents() {
    window.addEventListener('resize', () => {
      this.setupCanvas();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.active = false;
    });
  }

  initNeurons() {
    this.neurons = [];
    for (let i = 0; i < this.maxNeurons; i++) {
      this.neurons.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1.2,
        baseRadius: Math.random() * 1.8 + 1.2,
        energy: Math.random() * 0.3,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
        neighbors: []
      });
    }
  }

  initFloatingTags() {
    this.floatingTags = [];
    const count = 5;
    for (let i = 0; i < count; i++) {
      this.floatingTags.push({
        text: this.dataTags[i % this.dataTags.length],
        targetNeuronIndex: Math.floor(Math.random() * this.neurons.length),
        alpha: Math.random() * 0.6 + 0.2,
        fadeSpeed: 0.005 + Math.random() * 0.005,
        fadingIn: Math.random() > 0.5
      });
    }
  }

  spawnImpulse(fromIdx, toIdx) {
    if (this.impulses.length > 50) return;
    const speed = (this.state === 'speaking' || this.state === 'listening') ? 0.025 : 0.015;
    this.impulses.push({
      from: fromIdx,
      to: toIdx,
      progress: 0,
      speed: speed + Math.random() * 0.01,
      size: Math.random() * 1.5 + 1.5
    });
  }

  update() {
    const speedScale = (this.state === 'speaking' || this.state === 'listening') ? 1.4 : 1.0;

    for (let i = 0; i < this.neurons.length; i++) {
      const n = this.neurons[i];
      n.x += n.vx * speedScale;
      n.y += n.vy * speedScale;

      // Soft bounce on borders
      if (n.x < 10) { n.x = 10; n.vx *= -1; }
      else if (n.x > this.width - 10) { n.x = this.width - 10; n.vx *= -1; }
      if (n.y < 10) { n.y = 10; n.vy *= -1; }
      else if (n.y > this.height - 10) { n.y = this.height - 10; n.vy *= -1; }

      // Mouse influence
      if (this.mouse.active) {
        const dx = this.mouse.x - n.x;
        const dy = this.mouse.y - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180 && dist > 1) {
          const force = (1 - dist / 180) * 0.2;
          n.x += (dx / dist) * force;
          n.y += (dy / dist) * force;
        }
      }

      // Energy decay & pulse phase
      n.pulsePhase += n.pulseSpeed;
      if (n.energy > 0.05) {
        n.energy *= 0.94;
      } else {
        n.energy = 0;
      }

      n.neighbors = [];
    }

    // Identify neighbors & generate random communication impulses
    for (let i = 0; i < this.neurons.length; i++) {
      for (let j = i + 1; j < this.neurons.length; j++) {
        const dx = this.neurons[j].x - this.neurons[i].x;
        const dy = this.neurons[j].y - this.neurons[i].y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.maxConnectionDist) {
          this.neurons[i].neighbors.push(j);
          this.neurons[j].neighbors.push(i);

          const spawnChance = (this.state === 'speaking' || this.state === 'listening') ? 0.003 : 0.001;
          if (Math.random() < spawnChance && this.impulses.length < 40) {
            this.spawnImpulse(i, j);
          }
        }
      }
    }

    // Update impulses
    for (let k = this.impulses.length - 1; k >= 0; k--) {
      const imp = this.impulses[k];
      imp.progress += imp.speed;

      if (imp.progress >= 1) {
        const destNode = this.neurons[imp.to];
        if (destNode) {
          destNode.energy = 1.0;
          if (destNode.neighbors.length > 0 && Math.random() < 0.35 && this.impulses.length < 45) {
            const nextIdx = destNode.neighbors[Math.floor(Math.random() * destNode.neighbors.length)];
            if (nextIdx !== imp.from) {
              this.spawnImpulse(imp.to, nextIdx);
            }
          }
        }
        this.impulses.splice(k, 1);
      }
    }

    // Maintain baseline impulse transmission
    if (this.impulses.length < 8 && this.neurons.length > 1) {
      const from = Math.floor(Math.random() * this.neurons.length);
      const n = this.neurons[from];
      if (n && n.neighbors.length > 0) {
        const to = n.neighbors[Math.floor(Math.random() * n.neighbors.length)];
        this.spawnImpulse(from, to);
      }
    }

    // Update floating tags
    for (const tag of this.floatingTags) {
      if (tag.fadingIn) {
        tag.alpha += tag.fadeSpeed;
        if (tag.alpha >= 0.75) tag.fadingIn = false;
      } else {
        tag.alpha -= tag.fadeSpeed;
        if (tag.alpha <= 0.1) {
          tag.fadingIn = true;
          tag.text = this.dataTags[Math.floor(Math.random() * this.dataTags.length)];
          tag.targetNeuronIndex = Math.floor(Math.random() * this.neurons.length);
        }
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Subtle background vignette and cyber digital mesh
    const grad = ctx.createRadialGradient(
      this.width / 2, this.height / 2, 50,
      this.width / 2, this.height / 2, Math.max(this.width, this.height) * 0.75
    );
    grad.addColorStop(0, 'rgba(4, 14, 28, 0.45)');
    grad.addColorStop(0.6, 'rgba(3, 8, 16, 0.88)');
    grad.addColorStop(1, 'rgba(1, 3, 8, 0.98)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.width, this.height);

    // Subtle digital matrix grid lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.colors.line + '0.025)';
    const gridSize = 60;
    ctx.beginPath();
    for (let x = 0; x < this.width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
    }
    for (let y = 0; y < this.height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
    }
    ctx.stroke();

    // 1. Draw Synaptic Axons (Connections)
    for (let i = 0; i < this.neurons.length; i++) {
      const n1 = this.neurons[i];
      for (const j of n1.neighbors) {
        if (j > i) {
          const n2 = this.neurons[j];
          const dist = Math.hypot(n2.x - n1.x, n2.y - n1.y);
          const baseAlpha = (1 - dist / this.maxConnectionDist) * 0.22;
          const boost = (n1.energy + n2.energy) * 0.4;
          const alpha = Math.min(0.85, baseAlpha + boost);

          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = this.colors.line + alpha + ')';
          ctx.lineWidth = boost > 0.1 ? 1.5 : 0.8;
          ctx.stroke();
        }
      }
    }

    // 2. Draw Moving Neural Electrical Impulses (Data Packets)
    for (const imp of this.impulses) {
      const nFrom = this.neurons[imp.from];
      const nTo = this.neurons[imp.to];
      if (!nFrom || !nTo) continue;

      const px = nFrom.x + (nTo.x - nFrom.x) * imp.progress;
      const py = nFrom.y + (nTo.y - nFrom.y) * imp.progress;

      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, imp.size + 2, 0, Math.PI * 2);
      ctx.fillStyle = this.colors.glow + '0.45)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px, py, imp.size, 0, Math.PI * 2);
      ctx.fillStyle = this.colors.impulse;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.colors.node;
      ctx.fill();
      ctx.restore();
    }

    // 3. Draw Synaptic Neurons (Nodes)
    for (let i = 0; i < this.neurons.length; i++) {
      const n = this.neurons[i];
      const pulse = Math.sin(n.pulsePhase) * 0.5 + 0.5;
      const r = n.baseRadius + pulse * 0.8 + n.energy * 2.5;

      ctx.save();
      // Outer halo glow
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 2.4, 0, Math.PI * 2);
      const haloAlpha = 0.08 + pulse * 0.08 + n.energy * 0.35;
      ctx.fillStyle = this.colors.glow + haloAlpha + ')';
      ctx.fill();

      // Energized radial shock ring when fired
      if (n.energy > 0.15) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * (3.5 + (1 - n.energy) * 3), 0, Math.PI * 2);
        ctx.strokeStyle = this.colors.line + (n.energy * 0.6) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Neuron node core
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = n.energy > 0.3 ? this.colors.impulse : this.colors.node;
      ctx.shadowBlur = n.energy > 0.3 ? 12 : 5;
      ctx.shadowColor = this.colors.node;
      ctx.fill();
      ctx.restore();
    }

    // 4. Draw Floating Digital Telemetry Tags
    ctx.save();
    ctx.font = '9px "Share Tech Mono", monospace';
    for (const tag of this.floatingTags) {
      const target = this.neurons[tag.targetNeuronIndex];
      if (!target) continue;

      const tx = target.x + 8;
      const ty = target.y - 8;

      ctx.fillStyle = this.colors.tag + tag.alpha + ')';
      ctx.fillText(tag.text, tx, ty);

      ctx.strokeStyle = this.colors.line + (tag.alpha * 0.5) + ')';
      ctx.beginPath();
      ctx.moveTo(target.x + 4, target.y - 4);
      ctx.lineTo(target.x + 4, target.y - 12);
      ctx.stroke();
    }
    ctx.restore();
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(this.animate);
  }
}

// Global HUD & Neural Background canvas instances
window.addEventListener('DOMContentLoaded', () => {
  window.FridayCanvas = new FridayCanvasHUD('hudCoreCanvas');
  window.FridayNeuralBg = new FridayNeuralBackground('neuralBgCanvas');
});
