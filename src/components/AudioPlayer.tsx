import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Volume2, Music } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface AudioPlayerProps {
  initialPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ initialPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(initialPlay);
  const [volume, setVolume] = useState(soundManager.volume);
  const [trackName, setTrackName] = useState(soundManager.tracks[0].name);

  useEffect(() => {
    if (initialPlay && !soundManager.isPlaying) {
      soundManager.startBGM();
      setIsPlaying(true);
    }
  }, [initialPlay]);

  const togglePlay = () => {
    soundManager.toggleBGM((playing) => setIsPlaying(playing));
  };

  const nextTrack = () => {
    soundManager.playPop();
    soundManager.nextTrack((name) => {
      setTrackName(name);
      setIsPlaying(soundManager.isPlaying);
    });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundManager.setVolume(val);
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#2e1065] via-[#4c1d95] to-[#581c87] text-white rounded-2xl p-4 shadow-xl border border-purple-400/30 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        
        {/* Left Side: Spinning Vinyl Record + Track Info */}
        <div className="flex items-center gap-3">
          <div 
            className={`w-12 h-12 bg-slate-950 rounded-full flex items-center justify-center border-2 border-purple-300 shadow-md relative overflow-hidden ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4.5s' }}
          >
            {/* Vinyl grooving lines */}
            <div className="w-8 h-8 rounded-full border border-purple-900/60 flex items-center justify-center">
              <div className="w-4 h-4 bg-pink-500 rounded-full border border-white flex items-center justify-center text-[8px]">
                🎵
              </div>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-purple-300 font-bold tracking-wider uppercase flex items-center gap-1">
              <Music className="w-3 h-3 text-pink-400" />
              <span>NOW PLAYING</span>
            </div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{trackName}</span>
              {isPlaying && (
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-1 bg-pink-400 rounded-full animate-bounce" style={{ height: '60%', animationDelay: '0ms' }} />
                  <span className="w-1 bg-pink-400 rounded-full animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
                  <span className="w-1 bg-pink-400 rounded-full animate-bounce" style={{ height: '50%', animationDelay: '300ms' }} />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Player Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={nextTrack}
            className="p-2 bg-purple-950/70 hover:bg-purple-800 text-purple-200 hover:text-white rounded-full transition-colors active:scale-95"
            title="Next Track"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Volume Bar */}
      <div className="flex items-center gap-2 pt-1 border-t border-purple-800/60">
        <Volume2 className="w-3.5 h-3.5 text-purple-300" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-1.5 bg-purple-950/80 rounded-lg appearance-none cursor-pointer accent-pink-400"
          title="Lo-Fi Volume"
        />
        <span className="text-[10px] text-purple-300 font-mono min-w-[28px] text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
};
