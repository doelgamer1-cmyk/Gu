import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Volume2, VolumeX } from 'lucide-react';
import { SurpriseConfig, COLOR_THEMES } from '../types';

interface AudioPlayerProps {
  config: SurpriseConfig;
}

const NOTE_FREQS: Record<string, number> = {
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
  'C6': 1046.50
};

interface MusicNote {
  note: string;
  dur: number; // in beats
}

const MELODIES: Record<string, MusicNote[]> = {
  happy_birthday: [
    { note: 'G4', dur: 0.5 }, { note: 'G4', dur: 0.5 }, { note: 'A4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'B4', dur: 2 },
    { note: 'G4', dur: 0.5 }, { note: 'G4', dur: 0.5 }, { note: 'A4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'C5', dur: 2 },
    { note: 'G4', dur: 0.5 }, { note: 'G4', dur: 0.5 }, { note: 'G5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'B4', dur: 1 }, { note: 'A4', dur: 2 },
    { note: 'F5', dur: 0.5 }, { note: 'F5', dur: 0.5 }, { note: 'E5', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'C5', dur: 3 }
  ],
  sweet_piano: [
    // Safe, lovely, repetitive chord arpeggiations
    { note: 'C4', dur: 1 }, { note: 'E4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'C5', dur: 1 },
    { note: 'A4', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'E5', dur: 1 }, { note: 'C5', dur: 1 },
    { note: 'F4', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'C5', dur: 1 }, { note: 'A4', dur: 1 },
    { note: 'G4', dur: 1 }, { note: 'B4', dur: 1 }, { note: 'D5', dur: 1 }, { note: 'G4', dur: 1 },
    { note: 'E4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'B4', dur: 1 }, { note: 'E5', dur: 1 },
    { note: 'C4', dur: 1 }, { note: 'F4', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'F4', dur: 1 },
    { note: 'D4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'B4', dur: 1 }, { note: 'G4', dur: 1 },
    { note: 'C4', dur: 1 }, { note: 'E4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'B4', dur: 1 }
  ],
  lofi_lullaby: [
    // Relaxed pentatonic lofi melody
    { note: 'E4', dur: 1.5 }, { note: 'G4', dur: 0.5 }, { note: 'A4', dur: 1 }, { note: 'C5', dur: 1 },
    { note: 'D5', dur: 0.5 }, { note: 'C5', dur: 0.5 }, { note: 'A4', dur: 1 }, { note: 'G4', dur: 2 },
    { note: 'E5', dur: 1.5 }, { note: 'D5', dur: 0.5 }, { note: 'C5', dur: 1 }, { note: 'A4', dur: 1 },
    { note: 'G4', dur: 0.5 }, { note: 'A4', dur: 0.5 }, { note: 'C5', dur: 1 }, { note: 'D5', dur: 2 },
    { note: 'C5', dur: 1 }, { note: 'A4', dur: 1 }, { note: 'G4', dur: 1 }, { note: 'E4', dur: 1 },
    { note: 'D4', dur: 1 }, { note: 'C4', dur: 1 }, { note: 'E4', dur: 1 }, { note: 'G4', dur: 1 }
  ],
  none: []
};

// Track names for metadata UI
const TRACK_NAMES: Record<string, string> = {
  happy_birthday: "Happy Birthday (Music Box)",
  sweet_piano: "Sweet Lullaby (Soft Bells)",
  lofi_lullaby: "Lofi Dreamland (Chiptune)",
  none: "Silent Mode"
};

export default function AudioPlayer({ config }: AudioPlayerProps) {
  const { themeColor, musicTrack } = config;
  const colors = COLOR_THEMES[themeColor];

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(25); // Estimated loop duration
  const [currentNoteName, setCurrentNoteName] = useState<string>('');
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const stopSequenceRef = useRef<(() => void) | null>(null);
  const schedulerTimerIdRef = useRef<number | null>(null);

  // Re-calculate estimated loop seconds
  useEffect(() => {
    const melody = MELODIES[musicTrack] || [];
    if (melody.length > 0) {
      const beats = melody.reduce((acc, note) => acc + note.dur, 0);
      const bpm = musicTrack === 'happy_birthday' ? 105 : 90;
      const seconds = (beats / (bpm / 60));
      setTotalSeconds(Math.round(seconds));
    } else {
      setTotalSeconds(10);
    }
  }, [musicTrack]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopMelody();
    };
  }, []);

  const stopMelody = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    setCurrentNoteName('');
    setPlaybackSeconds(0);

    if (stopSequenceRef.current) {
      stopSequenceRef.current();
      stopSequenceRef.current = null;
    }

    if (schedulerTimerIdRef.current) {
      window.clearTimeout(schedulerTimerIdRef.current);
      schedulerTimerIdRef.current = null;
    }

    if (audioCtxRef.current) {
      // Don't close immediately to preserve caching, but stop sound
      if (gainNodeRef.current) {
        try {
          gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        } catch (e) {}
      }
    }
  };

  const startMelody = async () => {
    if (musicTrack === 'none') return;

    // Initialize Web Audio Context
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }

    if (audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    stopMelody(); // Ensure previous playing nodes are completely cleared

    isPlayingRef.current = true;
    setIsPlaying(true);

    const ctx = audioCtxRef.current!;
    const dest = ctx.destination;

    // Create a beautiful reverb/delay effect to make the synth sound expensive & cute!
    const delay = ctx.createDelay(1.0);
    const delayFeedback = ctx.createGain();
    const mainGain = ctx.createGain();

    mainGain.gain.setValueAtTime(0.4, ctx.currentTime);
    delay.delayTime.setValueAtTime(0.3, ctx.currentTime);
    delayFeedback.gain.setValueAtTime(0.25, ctx.currentTime);

    // Routes: Oscillator -> MainGain -> Reverb/Delay -> Output
    // Reverb loop: Delay -> ReverbGain -> back to Delay
    mainGain.connect(dest);
    mainGain.connect(delay);
    delay.connect(delayFeedback);
    delayFeedback.connect(delay);
    delay.connect(dest);

    gainNodeRef.current = mainGain;

    // Track state variables
    let noteIndex = 0;
    const melody = MELODIES[musicTrack] || [];
    const bpm = musicTrack === 'happy_birthday' ? 105 : 90;
    const beatDuration = 60 / bpm; // duration of 1 beat in seconds

    let sequenceStartTime = ctx.currentTime;
    setPlaybackSeconds(0);

    // Track active oscillators for immediate stoppage
    const activeOscillators: OscillatorNode[] = [];

    const playNextNote = () => {
      if (!isPlayingRef.current) return;

      const currentMelody = MELODIES[musicTrack] || [];
      if (currentMelody.length === 0) return;

      const noteItem = currentMelody[noteIndex];
      const freq = NOTE_FREQS[noteItem.note] || 440;
      const durationSeconds = noteItem.dur * beatDuration;

      // Update UI displays
      setCurrentNoteName(noteItem.note);
      const elapsed = ctx.currentTime - sequenceStartTime;
      setPlaybackSeconds(Math.min(totalSeconds, Math.floor(elapsed)));

      // Synthesis: Create warm Music Box tone (two sine/triangle oscillators slightly detuned, with click transient)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, ctx.currentTime);

      osc2.type = 'sine';
      // Harmonic octave-above addition for music box timbre
      osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime);

      // Envelope configuration: fast attack, organic decay, sweet ring
      noteGain.gain.setValueAtTime(0.001, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + durationSeconds * 0.4);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationSeconds);

      osc1.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(mainGain);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);

      osc1.stop(ctx.currentTime + durationSeconds);
      osc2.stop(ctx.currentTime + durationSeconds);

      activeOscillators.push(osc1, osc2);

      // Advance queue
      noteIndex = (noteIndex + 1) % currentMelody.length;
      if (noteIndex === 0) {
        // Reset local timer loop
        sequenceStartTime = ctx.currentTime;
      }

      // Schedule next note with a timeout
      schedulerTimerIdRef.current = window.setTimeout(() => {
        playNextNote();
      }, durationSeconds * 1000);
    };

    // Store stop hook
    stopSequenceRef.current = () => {
      activeOscillators.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {}
      });
      activeOscillators.length = 0;
    };

    playNextNote();
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopMelody();
    } else {
      startMelody();
    }
  };

  // Helper to format 0:00 style
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (musicTrack === 'none') {
    return (
      <div id="custom-audio-player-silent" className="flex items-center justify-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-pink-100/40 shadow-sm max-w-sm mx-auto">
        <VolumeX className="w-5 h-5 text-gray-400 mr-2" />
        <span className="text-sm font-sans text-gray-400 font-medium">Silent Mode Selected</span>
      </div>
    );
  }

  return (
    <div 
      id="custom-audio-player-container" 
      className="w-full max-w-sm mx-auto bg-white/80 backdrop-blur-md rounded-3xl p-4 shadow-sm border border-pink-100/30 overflow-hidden"
    >
      <div className="flex items-center gap-4">
        {/* Album Art Cover Spinning Container */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-pink-200 bg-pink-50 flex items-center justify-center shadow-inner relative">
            <span className="font-cursive tracking-wider font-semibold text-[#ef476f] text-sm transform -rotate-12">
              with love
            </span>
            {/* Spinning decorative frame inside if playing */}
            <div className={`absolute inset-0 border border-dashed border-red-300 rounded-full ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
          </div>
          {/* Subtle center hole to represent realistic record */}
          <div className="absolute top-1/2 left-1/2 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white shadow" />
        </div>

        {/* Player Details & Wave */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between pb-1">
            <div className="truncate">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                <Music className="w-3 h-3 text-pink-400 inline" /> A song for your day
              </h4>
              <p className="text-sm font-bold text-gray-800 truncate">
                {TRACK_NAMES[musicTrack] || "Sweety Melody"}
              </p>
            </div>
            
            {/* Real-time active playing note display */}
            {isPlaying && currentNoteName && (
              <span className={`text-[10px] font-mono font-bold ${colors.badgeText} ${colors.badgeBg} px-2 py-0.5 rounded-full animate-bounce`}>
                ♩ {currentNoteName}
              </span>
            )}
          </div>

          {/* Minimal Progressive Progress Input Timeline */}
          <div className="relative pt-1">
            <div className="h-1.5 w-full bg-pink-100/60 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-pink-400 rounded-full transition-all duration-300 relative"
                style={{ width: `${(playbackSeconds / totalSeconds) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-gray-400 pt-1 font-medium">
              <span>{formatTime(playbackSeconds)}</span>
              <span>{formatTime(totalSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Toggle Play Button */}
        <button
          id="music-play-pause-btn"
          onClick={handleTogglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95 ${colors.accentSolid} ${colors.accentHover} focus:outline-none`}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current text-white stroke-2" />
          ) : (
            <Play className="w-5 h-5 fill-current translate-x-0.5 text-white stroke-2" />
          )}
        </button>
      </div>

      {/* Decorative Wave animation when active */}
      {isPlaying && (
        <div className="flex justify-center items-center gap-0.5 mt-2.5 h-3 text-pink-400">
          <div className="w-0.75 h-full rounded bg-pink-300 animate-pulse duration-500" />
          <div className="w-0.75 h-3/4 rounded bg-pink-400 animate-pulse duration-700 delay-75" />
          <div className="w-0.75 h-2/4 rounded bg-pink-500 animate-pulse duration-300 delay-100" />
          <div className="w-0.75 h-5/6 rounded bg-pink-400 animate-pulse duration-600 delay-150" />
          <div className="w-0.75 h-1/3 rounded bg-pink-300 animate-pulse duration-400 delay-200" />
          <span className="text-[9px] font-mono text-gray-400 pl-1 font-semibold">listening lofi sound box</span>
        </div>
      )}
    </div>
  );
}
