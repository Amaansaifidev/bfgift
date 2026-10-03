import React, { useState } from 'react';
import { HotAirBalloon } from './CuteSVGs';
import { soundManager } from '../utils/audio';
import { Sparkles, Heart } from 'lucide-react';

interface OpeningSceneProps {
  onBegin: () => void;
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ onBegin }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleStart = () => {
    if (isOpening) return;
    soundManager.playPop();
    setIsOpening(true);

    setTimeout(() => {
      soundManager.playChime();
    }, 400);

    setTimeout(() => {
      onBegin();
    }, 1100);
  };

  return (
    <div 
      onClick={handleStart}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-8 bg-[#FAF7FD] bg-grid-pattern cursor-pointer select-none overflow-hidden transition-opacity duration-700"
    >
      {/* Top Banner Story Ribbon */}
      <div className="pt-2 sm:pt-4 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/90 border border-purple-200 shadow-sm text-xs sm:text-sm font-medium text-purple-800 animate-pulse">
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
          <span>It's 3rd October boyfriend's day so my girlfriend sent me this</span>
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
        </div>
      </div>

      {/* Main Delivery Centerpiece */}
      <div className="relative flex flex-col items-center justify-center max-w-lg w-full my-auto z-10">
        
        {/* Animated Hot Air Balloon */}
        <div 
          className={`relative mb-2 transition-transform duration-1000 ${
            isOpening ? '-translate-y-24 opacity-0 scale-90' : 'animate-bounce'
          }`}
          style={{ animationDuration: '3.6s' }}
        >
          <HotAirBalloon className="w-32 h-36 drop-shadow-md" />
          
          {/* Tag banner */}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-amber-50 px-3 py-1 rounded-full text-[11px] font-bold text-amber-900 shadow border border-amber-200 whitespace-nowrap flex items-center gap-1">
            <span>a delivery for you...</span>
            <span className="text-pink-500">💌</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-black text-purple-950 font-serif tracking-tight text-center mb-1 drop-shadow-sm">
          Happy Boyfriend's Day
        </h1>
        <p className="text-purple-600 font-medium text-xs sm:text-sm text-center mb-6">
          A wholesome interactive gift created just for you ✨
        </p>

        {/* Lilac Envelope & Card */}
        <div 
          className={`relative w-full max-w-sm transition-all duration-700 transform ${
            isOpening ? 'scale-105' : 'hover:scale-102'
          }`}
        >
          {/* Card sliding out of envelope */}
          <div 
            className={`w-full bg-[#FCFAFE] rounded-2xl p-6 sm:p-7 border-2 border-purple-300 shadow-xl transition-all duration-700 relative overflow-hidden ${
              isOpening 
                ? 'shadow-2xl border-purple-500 ring-4 ring-purple-200' 
                : 'hover:border-purple-400'
            }`}
          >
            {/* Washi tape decoration at top */}
            <div className="washi-tape absolute -top-1 left-1/2 transform -translate-x-1/2 w-28 h-5 rounded-sm rotate-1 opacity-80" />

            <div className="text-center pt-2">
              <div className="text-4xl mb-3 animate-pulse">
                💌
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-purple-950 mb-2">
                Hey You!
              </h2>
              <p className="text-purple-900 font-serif text-base sm:text-lg italic leading-snug mb-4">
                "I made a little something just for you... happy boyfriend's day"
              </p>
              <div className="inline-block bg-purple-50 rounded-full px-3 py-1 border border-purple-200 text-xs font-semibold text-purple-700">
                to the best boyfriend ever 💕
              </div>
            </div>
          </div>
        </div>

        {/* TAP ANYWHERE TO BEGIN cue */}
        <div className="mt-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-purple-300/60 transition-all transform hover:scale-105 active:scale-95 animate-pulse">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>TAP ANYWHERE TO BEGIN</span>
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </div>
          <span className="text-[11px] text-purple-500 font-mono mt-2">
            Click screen to unseal envelope & play sound 🔊
          </span>
        </div>

      </div>

      {/* Subtle Bottom Ambient Note */}
      <div className="pb-2 text-center z-10 text-xs text-purple-400 font-mono">
        October 3rd • Boyfriend's Day Special Edition
      </div>
    </div>
  );
};
