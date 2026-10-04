// Synthetic Ambient Indian Classical Tanpura / Drone generator using Web Audio API
class TanpuraAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.oscillators = [];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  play() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    const now = this.ctx.currentTime;

    // Master gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, now);
    this.gainNode.gain.exponentialRampToValueAtTime(0.18, now + 3); // Slow gentle swell
    this.gainNode.connect(this.ctx.destination);

    // Root frequency C#3 / 138.59 Hz (traditional North Indian sitar/tanpura base pitch)
    const baseFreq = 138.59;
    // Harmonic ratios for Pa (Fifth: 1.5), Sa (Octave: 2), and Ni/Shuddha (Maj 7th: 1.875)
    const freqs = [
      baseFreq * 0.75, // Lower Mandra Pa (103.9 Hz)
      baseFreq,        // Root Madhya Sa (138.59 Hz)
      baseFreq * 1.5,  // Pancham Pa (207.88 Hz)
      baseFreq * 2.0,  // Taar Sa (277.18 Hz)
    ];

    this.oscillators = [];

    freqs.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      // Warm sound with triangle + sine blend
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, now);

      // Subtle natural chorus / vibrato LFO
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.2 + i * 0.1, now); // slow breathing pulse
      lfoGain.gain.setValueAtTime(1.2, now); // gentle pitch wobble
      lfo.connect(osc.frequency);
      lfo.start();
      this.oscillators.push(lfo);

      // Amplitude envelope
      oscGain.gain.setValueAtTime(0.05 + (0.04 / (i + 1)), now);
      
      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
      this.oscillators.push(osc);
    });
  }

  stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.gainNode && this.ctx) {
      const now = this.ctx.currentTime;
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try { osc.stop(); } catch(e) {}
        });
        this.oscillators = [];
      }, 1600);
    }
  }
}

export const tanpura = new TanpuraAudio();
