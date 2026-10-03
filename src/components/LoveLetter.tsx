import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import { Heart, Sparkles, Send, RotateCcw } from 'lucide-react';

interface LoveLetterProps {
  boyfriendName?: string;
  onRestart?: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ 
  boyfriendName = "handsome",
  onRestart 
}) => {
  const [kissCount, setKissCount] = useState(1);
  const [hasAddedKiss, setHasAddedKiss] = useState(false);

  const triggerLoveShower = () => {
    soundManager.playPop();
    soundManager.playChime();

    // Multistage burst of hearts and pastel confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#f472b6', '#c084fc', '#e879f9', '#fde047', '#a78bfa', '#fbcfe8'],
    };

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.4),
      spread: 60,
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.3),
      spread: 100,
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.3),
      spread: 120,
      decay: 0.91,
      scalar: 1.2,
    });
  };

  const handleAddKiss = () => {
    soundManager.playPop();
    setKissCount((prev) => prev + 1);
    setHasAddedKiss(true);
    triggerLoveShower();
  };

  return (
    <section id="love-letter" className="w-full space-y-6 scroll-mt-20">
      
      {/* Letter Container styled like real notepad binder paper */}
      <div className="relative bg-[#FFFDF9] rounded-3xl p-6 sm:p-12 shadow-2xl border-2 border-amber-100/90 overflow-hidden">
        
        {/* Binder Paper Punch Holes on Left Margin (Visual Detail) */}
        <div className="absolute left-3 sm:left-6 top-0 bottom-0 flex flex-col justify-around py-8 pointer-events-none z-10">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="w-4 h-4 rounded-full bg-[#E5DECF] shadow-inner border border-[#D5CDBD]"
            />
          ))}
        </div>

        {/* Red notebook margin vertical line */}
        <div className="absolute left-10 sm:left-16 top-0 bottom-0 w-[1.5px] bg-red-200/80 pointer-events-none z-10" />

        {/* Ruled horizontal lines background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px)`,
            backgroundSize: `100% 32px`,
            marginTop: '56px',
          }}
        />

        {/* Cute Washi Tapes at Corners */}
        <div className="washi-tape absolute -top-2 left-12 w-24 h-6 -rotate-3 rounded-sm opacity-85 z-20" />
        <div className="washi-tape absolute -top-2 right-12 w-24 h-6 rotate-2 rounded-sm bg-pink-200/80 opacity-85 z-20" />

        {/* Content Container (padded inwards away from holes and margin line) */}
        <div className="relative pl-8 sm:pl-16 pr-2 sm:pr-6 space-y-6 z-20">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between border-b-2 border-amber-200/80 pb-4 gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-amber-800 uppercase tracking-widest block">
                one last thing • A Note For You
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-950 font-serif">
                A Note For You 💌
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-hand text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Oct 3rd • Boyfriend's Day
              </span>
            </div>
          </div>

          {/* Letter Body in Warm Handwritten Typography */}
          <div className="space-y-5 font-hand text-xl sm:text-2xl text-slate-800 leading-relaxed tracking-wide">
            <p className="font-bold text-purple-900 text-2xl sm:text-3xl">
              Hey {boyfriendName},
            </p>

            <p>
              I'm not always great at saying all of this stuff out loud, but I wanted to make sure you knew just how deeply loved and appreciated you are today.
            </p>

            <p>
              Thank you for being my safest place, for listening to every little rambling thought, and for making even the most ordinary days feel like a cozy adventure. Your kindness, goofy laughs, and steady warmth mean the entire world to me.
            </p>

            <p>
              No matter what life throws at us, I will always be cheering for you the loudest.
            </p>

            <p className="font-bold text-purple-900">
              Happy Boyfriend's Day! Thank you for just being you. 💕
            </p>
          </div>

          {/* Signoff & Cute Hand-Drawn Doodles */}
          <div className="pt-6 border-t border-amber-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Stamp / Kiss Marks */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(Math.min(kissCount, 5))].map((_, i) => (
                  <span 
                    key={i} 
                    className="text-2xl transform rotate-12 inline-block animate-pulse"
                    title="Sealed with a kiss"
                  >
                    💋
                  </span>
                ))}
              </div>
              
              <button
                onClick={handleAddKiss}
                className="px-3 py-1 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1 border border-pink-200"
              >
                <span>+ Kiss stamp</span>
              </button>
            </div>

            {/* Handwritten Signoff */}
            <div className="text-right ml-auto">
              <p className="font-hand text-2xl sm:text-3xl text-purple-900 font-bold">
                always in your corner, yours 💕
              </p>
              <span className="text-xs text-purple-400 font-mono">
                forever & always
              </span>
            </div>

          </div>

          {/* Love Shower Celebration Bar */}
          <div className="mt-8 pt-6 border-t-2 border-dashed border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-purple-900 flex items-center justify-center sm:justify-start gap-1">
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>Send a Shower of Love & Confetti</span>
              </p>
              <p className="text-xs text-purple-600 font-sans">
                Celebrate Boyfriend's Day with instant digital fireworks!
              </p>
            </div>

            <button
              onClick={triggerLoveShower}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current text-pink-200" />
              <span>Shower With Love ✨</span>
            </button>
          </div>

        </div>

      </div>

      {/* Replay or Back to Top Button */}
      {onRestart && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => {
              soundManager.playPop();
              onRestart();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-purple-500" />
            <span>Replay Delivery from Start</span>
          </button>
        </div>
      )}

    </section>
  );
};
