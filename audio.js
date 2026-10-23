/**
 * FRIDEY Audio Synthesizer (Web Audio API)
 * Procedural sci-fi GOJO sound design
 * Zero external audio dependencies
 */

class FridayAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.gainNode = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized && this.audioCtx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.value = 0.18; // Master sound level
      this.gainNode.connect(this.audioCtx.destination);
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported on this browser:', e);
    }
  }

  resumeContext() {
    this.init();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleSound(enabled) {
    if (enabled !== undefined) {
      this.soundEnabled = enabled;
    } else {
      this.soundEnabled = !this.soundEnabled;
    }
    return this.soundEnabled;
  }

  /**
   * High-tech UI click blip
   */
  playClick() {
    if (!this.soundEnabled) return;
    this.resumeContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.04);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + 0.045);
  }

  /**
   * Mic / Voice Listening activation chirp (ascending tone)
   */
  playMicOn() {
    if (!this.soundEnabled) return;
    this.resumeContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(1320, now + 0.22);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  /**
   * Voice Listening deactivated (descending tone)
   */
  playMicOff() {
    if (!this.soundEnabled) return;
    this.resumeContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  /**
   * System Notification / Acknowledgment chime
   */
  playNotice() {
    if (!this.soundEnabled) return;
    this.resumeContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    [587.33, 880, 1174.66].forEach((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const delay = idx * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.linearRampToValueAtTime(0.1, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.22);

      osc.connect(gain);
      gain.connect(this.gainNode);

      osc.start(now + delay);
      osc.stop(now + delay + 0.24);
    });
  }

  /**
   * Futuristic Protocol Activation (Arc Reactor surge)
   */
  playProtocolSurge() {
    if (!this.soundEnabled) return;
    this.resumeContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.35);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.6);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    // Filter to give that metallic resonant sci-fi sheen
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, now);
    filter.Q.value = 4.0;

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + 0.7);
  }

  /**
   * Tactical Caution / Threat Warning Alert
   */
  playAlert() {
    if (!this.soundEnabled) return;
    this.resumeContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    for (let i = 0; i < 2; i++) {
      const offset = i * 0.16;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(750, now + offset);
      osc.frequency.setValueAtTime(600, now + offset + 0.07);

      gain.gain.setValueAtTime(0.08, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.14);

      osc.connect(gain);
      gain.connect(this.gainNode);

      osc.start(now + offset);
      osc.stop(now + offset + 0.15);
    }
  }

  /**
   * Stark Boot Sequence chord
   */
  playBootSequence() {
    if (!this.soundEnabled) return;
    this.resumeContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const chord = [220, 330, 440, 660, 880];
    chord.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const offset = i * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + offset);

      gain.gain.setValueAtTime(0.001, now + offset);
      gain.gain.linearRampToValueAtTime(0.12, now + offset + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.6);

      osc.connect(gain);
      gain.connect(this.gainNode);

      osc.start(now + offset);
      osc.stop(now + offset + 0.65);
    });
  }
}

// Global audio singleton
window.FridayAudio = new FridayAudioEngine();
