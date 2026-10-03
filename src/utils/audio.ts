// Web Audio API Synthesizer for cozy romantic lo-fi acoustic background music and cute sound effects

export class LoFiEngine {
  private ctx: AudioContext | null = null;
  public isPlaying: boolean = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private vinylGain: GainNode | null = null;
  public volume: number = 0.35;
  public currentTrackIndex: number = 0;

  public tracks = [
    {
      name: "Our Song (Lo-Fi Acoustic)",
      tempoMs: 2400,
      chords: [
        [261.63, 329.63, 392.0, 493.88], // Cmaj7
        [220.0, 261.63, 329.63, 392.0],  // Am7
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [196.0, 246.94, 293.66, 349.23], // G7
      ],
    },
    {
      name: "Rainy Memories (Gentle Keys)",
      tempoMs: 2700,
      chords: [
        [174.61, 220.0, 261.63, 349.23], // Fmaj
        [196.0, 246.94, 293.66, 392.0],  // G
        [164.81, 207.65, 246.94, 329.63],// Em
        [220.0, 261.63, 329.63, 440.0],  // Am
      ],
    },
    {
      name: "Cozy Coffee & You",
      tempoMs: 2200,
      chords: [
        [220.0, 277.18, 329.63, 415.3],  // A
        [185.0, 220.0, 277.18, 369.99],  // F#m
        [146.83, 185.0, 220.0, 293.66],  // D
        [164.81, 207.65, 246.94, 329.63],// E
      ],
    },
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.setupVinylCrackles();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private setupVinylCrackles() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.01;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 750;

      this.vinylGain = this.ctx.createGain();
      this.vinylGain.gain.value = 0.02 * this.volume;

      noise.connect(filter);
      filter.connect(this.vinylGain);
      this.vinylGain.connect(this.masterGain);
      noise.start();
    } catch {}
  }

  public setVolume(val: number) {
    this.volume = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(val, this.ctx.currentTime);
    }
    if (this.vinylGain && this.ctx) {
      this.vinylGain.gain.setValueAtTime(0.02 * val, this.ctx.currentTime);
    }
  }

  public playPop() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
      gain.gain.setValueAtTime(0.25 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  public playFlip() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.14);
      gain.gain.setValueAtTime(0.2 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch {}
  }

  public playScratch() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.035);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1600;
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.08 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      noise.start(now);
    } catch {}
  }

  public playChime() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        const delay = idx * 0.08;
        const now = this.ctx.currentTime + delay;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.18 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.5);
      });
    } catch {}
  }

  public toggleBGM(cb?: (playing: boolean) => void) {
    this.init();
    if (this.isPlaying) {
      this.stopBGM();
      if (cb) cb(false);
    } else {
      this.startBGM();
      if (cb) cb(true);
    }
  }

  public nextTrack(cb?: (name: string) => void) {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    if (cb) cb(this.tracks[this.currentTrackIndex].name);
    if (this.isPlaying) {
      this.stopBGM();
      this.startBGM();
    }
  }

  public startBGM() {
    if (this.isPlaying) return;
    this.init();
    this.isPlaying = true;
    let step = 0;
    const track = this.tracks[this.currentTrackIndex];

    const playChordStep = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const currentChord = track.chords[step % track.chords.length];
      step++;

      // Arpeggiate chord notes like mellow acoustic guitar plucks
      currentChord.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.value = 1200;

          // Alternate warm waveforms
          osc.type = idx === 0 ? "triangle" : "sine";

          // Gentle pluck timing offset
          const pluckOffset = idx * 0.06;
          const now = this.ctx.currentTime + pluckOffset;

          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.06 * this.volume, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + (track.tempoMs / 1000) - 0.1);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain);

          osc.start(now);
          osc.stop(now + (track.tempoMs / 1000));
        } catch {}
      });

      this.timer = window.setTimeout(playChordStep, track.tempoMs);
    };

    playChordStep();
  }

  public stopBGM() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

export const soundManager = new LoFiEngine();
