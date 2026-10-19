/**
 * HỘP NHẠC TỔNG HỢP WEB AUDIO API (100% Thuần JavaScript)
 * Tự phát nhạc không cần file mp3 ngoài, không lo chết link hay lỗi CORS!
 */

class MusicBoxSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentNoteIndex = 0;
    this.timerId = null;
    this.tempo = 140; // BPM

    // Bảng tần số nốt nhạc
    this.notes = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
      'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
      'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'G6': 1567.98
    };

    // Giai điệu lãng mạn nhẹ nhàng (Melody & Arpeggio)
    this.melody = [
      { note: 'E5', dur: 1 }, { note: 'G5', dur: 1 }, { note: 'C6', dur: 2 },
      { note: 'B5', dur: 1 }, { note: 'A5', dur: 1 }, { note: 'G5', dur: 2 },
      { note: 'F5', dur: 1 }, { note: 'A5', dur: 1 }, { note: 'D6', dur: 2 },
      { note: 'C6', dur: 1 }, { note: 'B5', dur: 1 }, { note: 'C6', dur: 2 },

      { note: 'E5', dur: 1 }, { note: 'G5', dur: 1 }, { note: 'A5', dur: 2 },
      { note: 'G5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'D5', dur: 2 },
      { note: 'C5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'G5', dur: 1 },
      { note: 'C6', dur: 3 }, { note: 'REST', dur: 1 },

      { note: 'G5', dur: 1 }, { note: 'E6', dur: 2 }, { note: 'D6', dur: 1 },
      { note: 'C6', dur: 2 }, { note: 'A5', dur: 1 }, { note: 'C6', dur: 1 },
      { note: 'D6', dur: 2 }, { note: 'G5', dur: 1 }, { note: 'B5', dur: 1 },
      { note: 'C6', dur: 4 }, { note: 'REST', dur: 1 }
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Tiếng chuông hộp nhạc thanh thoát, vang nhẹ
  playMusicBoxTone(freq, duration = 1.2) {
    if (!this.ctx || freq <= 0) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    // Sóng sin kết hợp hài âm để tạo chất âm leng keng của Music Box
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    // Envelope âm thanh hộp nhạc: Attack nhanh, Decay êm dịu
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.28, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0008, t + duration);

    // Kèm âm bồi chuông ngân cao
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 2, t);
    subGain.gain.setValueAtTime(0.06, t);
    subGain.gain.exponentialRampToValueAtTime(0.0005, t + 0.6);

    osc.connect(gain);
    subOsc.connect(subGain);
    gain.connect(this.ctx.destination);
    subGain.connect(this.ctx.destination);

    osc.start(t);
    subOsc.start(t);
    osc.stop(t + duration);
    subOsc.stop(t + 0.6);
  }

  // Vòng lặp phát bài hát
  playNextNote() {
    if (!this.isPlaying) return;

    const item = this.melody[this.currentNoteIndex];
    if (item && item.note !== 'REST' && this.notes[item.note]) {
      this.playMusicBoxTone(this.notes[item.note], item.dur * 0.9);
    }

    const delay = (60 / this.tempo) * item.dur * 1000;
    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;

    this.timerId = setTimeout(() => {
      this.playNextNote();
    }, delay);
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.playNextNote();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  // --- HIỆU ỨNG ÂM THANH TƯƠNG TÁC (SFX) ---
  
  // Tiếng "pop" ngọt ngào khi thả tim
  playHeartPop() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(750, t + 0.12);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  // Tiếng chuông lấp lánh khi mở quà / hoa bừng nở
  playSparkleChime() {
    this.init();
    if (!this.ctx) return;
    const freqs = [659.25, 783.99, 987.77, 1318.51];
    freqs.forEach((f, idx) => {
      setTimeout(() => {
        this.playMusicBoxTone(f, 0.8);
      }, idx * 70);
    });
  }

  // Tiếng mở phong thư xào xạc nhẹ
  playEnvelopeOpen() {
    this.init();
    if (!this.ctx) return;
    this.playSparkleChime();
  }
}

// Khởi tạo đối tượng toàn cục
window.bgMusic = new MusicBoxSynthesizer();
