class AmbientSoundscape {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private melodyTimer: number | null = null;
  private stopTimer: number | null = null;
  private isPlaying = false;
  private melodyIndex = 0;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    }

    return this.start();
  }

  public start(): boolean {
    if (this.isPlaying) return true;
    if (typeof window === 'undefined' || !window.AudioContext) return false;

    if (this.stopTimer !== null && this.ctx && this.masterGain) {
      window.clearTimeout(this.stopTimer);
      this.stopTimer = null;
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.55, this.ctx.currentTime + 0.8);
      this.playMelodyNote();
      this.melodyTimer = window.setInterval(() => this.playMelodyNote(), 3200);
      this.isPlaying = true;
      void this.ctx.resume().catch((error: unknown) => {
        console.error('Could not resume café ambient audio.', error);
        this.stop();
      });
      return true;
    }

    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.55, this.ctx.currentTime + 1.5);
    this.masterGain.connect(this.ctx.destination);

    this.startCafeAmbience();
    this.playMelodyNote();
    this.melodyTimer = window.setInterval(() => this.playMelodyNote(), 3200);
    this.isPlaying = true;

    void this.ctx.resume().catch((error: unknown) => {
      console.error('Could not start café ambient audio.', error);
      this.stop();
    });

    return true;
  }

  public stop(): void {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    if (this.melodyTimer !== null) {
      window.clearInterval(this.melodyTimer);
      this.melodyTimer = null;
    }
    if (this.stopTimer !== null) window.clearTimeout(this.stopTimer);

    const context = this.ctx;
    const masterGain = this.masterGain;
    masterGain.gain.cancelScheduledValues(context.currentTime);
    masterGain.gain.setValueAtTime(Math.max(masterGain.gain.value, 0.0001), context.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.8);
    this.isPlaying = false;

    this.stopTimer = window.setTimeout(() => {
      this.noiseNode?.stop();
      void context.close().catch((error: unknown) => {
        console.error('Could not close café ambient audio.', error);
      });
      if (this.ctx === context) {
        this.ctx = null;
        this.masterGain = null;
        this.noiseNode = null;
      }
      this.stopTimer = null;
    }, 850);
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private startCafeAmbience(): void {
    if (!this.ctx || !this.masterGain) return;

    const bufferLength = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferLength, this.ctx.sampleRate);
    const channel = noiseBuffer.getChannelData(0);
    let brownNoise = 0;

    for (let index = 0; index < bufferLength; index += 1) {
      brownNoise = (brownNoise + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      channel[index] = brownNoise * 3.5;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(360, this.ctx.currentTime);

    const ambienceGain = this.ctx.createGain();
    ambienceGain.gain.setValueAtTime(0.035, this.ctx.currentTime);

    this.noiseNode.connect(filter);
    filter.connect(ambienceGain);
    ambienceGain.connect(this.masterGain);
    this.noiseNode.start();
  }

  private playMelodyNote(): void {
    if (!this.ctx || !this.masterGain || this.ctx.state === 'closed') return;

    const notes = [293.66, 349.23, 392, 440, 392, 349.23, 329.63, 261.63];
    const frequency = notes[this.melodyIndex % notes.length];
    const now = this.ctx.currentTime;
    const oscillator = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, now);
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.075, now + 0.35);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
    oscillator.connect(noteGain);
    noteGain.connect(this.masterGain);
    oscillator.start(now);
    oscillator.stop(now + 2.85);

    const harmony = this.ctx.createOscillator();
    const harmonyGain = this.ctx.createGain();
    harmony.type = 'sine';
    harmony.frequency.setValueAtTime(frequency * 1.5, now);
    harmonyGain.gain.setValueAtTime(0.0001, now);
    harmonyGain.gain.exponentialRampToValueAtTime(0.025, now + 0.55);
    harmonyGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.9);
    harmony.connect(harmonyGain);
    harmonyGain.connect(this.masterGain);
    harmony.start(now);
    harmony.stop(now + 2.95);

    if (this.melodyIndex % 4 === 0) {
      const bass = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bass.type = 'sine';
      bass.frequency.setValueAtTime(frequency / 2, now);
      bassGain.gain.setValueAtTime(0.0001, now);
      bassGain.gain.exponentialRampToValueAtTime(0.035, now + 0.5);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.1);
      bass.connect(bassGain);
      bassGain.connect(this.masterGain);
      bass.start(now);
      bass.stop(now + 3.15);
    }

    this.melodyIndex += 1;
  }
}

export const ambientAudio = new AmbientSoundscape();
