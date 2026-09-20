// Web Audio API Synthesizer — Zero External Audio Overhead

class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlayingAmbient = false;
    this.ambientInterval = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Subtle mechanical switch click on button presses
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Harmonic chord chime when saving reflection or opening thermal receipt
  playChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.45);
      });
    } catch (e) {}
  }

  // Lo-Fi generative ambient chords (simulating 2 AM study soundscape)
  toggleAmbient(onStateChange) {
    if (this.isPlayingAmbient) {
      this.stopAmbient();
      if (onStateChange) onStateChange(false);
    } else {
      this.startAmbient();
      if (onStateChange) onStateChange(true);
    }
  }

  startAmbient() {
    this.init();
    if (!this.ctx) return;
    this.isPlayingAmbient = true;
    const chords = [
      [261.63, 329.63, 392.00], // C
      [220.00, 261.63, 329.63], // Am
      [174.61, 220.00, 261.63], // F
      [196.00, 246.94, 293.66], // G
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!this.isPlayingAmbient || !this.ctx) return;
      const chord = chords[chordIdx % chords.length];
      chord.forEach(f => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 4);
      });
      chordIdx++;
    };

    playChord();
    this.ambientInterval = setInterval(playChord, 4000);
  }

  stopAmbient() {
    this.isPlayingAmbient = false;
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }
}

export const soundFx = new AudioSynthesizer();
