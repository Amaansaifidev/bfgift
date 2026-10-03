import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import { Sparkles, Heart } from 'lucide-react';

export const LoveJar: React.FC = () => {
  const [drawnNote, setDrawnNote] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const secretNotes = [
    "Your laugh is my absolute favorite sound in the world.",
    "Thank you for always hugging me when I need it most.",
    "I still get butterflies every time you smile at me.",
    "You make the ordinary moments feel extraordinary.",
    "I appreciate all the little ways you take care of me.",
    "My favorite place in the entire world is right beside you.",
    "You have the kindest, gentlest soul I have ever known.",
    "Thank you for being my teammate, partner, and best friend.",
  ];

  const handleDrawNote = () => {
    if (isShaking) return;
    soundManager.playPop();
    setIsShaking(true);
    setDrawnNote(null);

    setTimeout(() => {
      soundManager.playChime();
      const random = secretNotes[Math.floor(Math.random() * secretNotes.length)];
      setDrawnNote(random);
      setIsShaking(false);
    }, 600);
  };

  return (
    <section className="bg-gradient-to-br from-purple-100/70 via-pink-50/50 to-indigo-50/70 rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-lg text-center space-y-4">
      <div className="space-y-1">
        <span className="text-[11px] font-mono font-bold tracking-widest text-purple-600 uppercase">
          Little Secret Jar
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-950 font-serif">
          THE LOVE CAPSULE JAR 🫙
        </h3>
        <p className="text-xs sm:text-sm text-purple-600">
          Tap the jar to draw an unexpected sweet love capsule!
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 pt-2">
        <button
          onClick={handleDrawNote}
          className={`w-24 h-24 bg-white rounded-full border-4 border-purple-300 flex items-center justify-center text-4xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer ${
            isShaking ? 'animate-bounce' : ''
          }`}
          title="Tap to draw a note"
        >
          {isShaking ? '✨' : '🫙'}
        </button>

        {drawnNote ? (
          <div className="bg-white border-2 border-pink-300 rounded-2xl p-4 sm:p-5 max-w-md shadow-md animate-fade-in text-center">
            <span className="text-xs font-mono font-bold text-pink-600 uppercase tracking-wide block mb-1">
              💌 Love Capsule #Secret
            </span>
            <p className="font-hand text-2xl text-purple-950 font-bold leading-snug">
              "{drawnNote}"
            </p>
            <div className="mt-2 text-xs text-purple-400 font-sans">
              Tap jar again anytime for another message!
            </div>
          </div>
        ) : (
          <div className="text-xs text-purple-500 font-mono">
            ✨ Tap the jar above to unlock a message ✨
          </div>
        )}
      </div>
    </section>
  );
};
