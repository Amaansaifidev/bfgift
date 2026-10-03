import React, { useState, useEffect } from 'react';
import { OpeningScene } from './components/OpeningScene';
import { AudioPlayer } from './components/AudioPlayer';
import { MemoryWall } from './components/MemoryWall';
import { ScratchCards } from './components/ScratchCards';
import { LoveLetter } from './components/LoveLetter';
import { LoveJar } from './components/LoveJar';
import { BucketList } from './components/BucketList';
import { HelloKittySticker, CuteCatIllustration, PostageStamp } from './components/CuteSVGs';
import { soundManager } from './utils/audio';
import { Heart, Sparkles, ArrowRight, Music, Edit3, Volume2 } from 'lucide-react';

export default function App() {
  const [opened, setOpened] = useState(false);
  const [boyfriendName, setBoyfriendName] = useState("Favourite Person");
  const [isEditingName, setIsEditingName] = useState(false);
  const [catPurrs, setCatPurrs] = useState(0);

  // Love Counter (e.g., days together)
  const [timeTogether, setTimeTogether] = useState({
    days: 482,
    hours: 14,
    mins: 32,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeTogether((prev) => {
        let mins = prev.mins + 1;
        let hours = prev.hours;
        let days = prev.days;
        if (mins >= 60) {
          mins = 0;
          hours += 1;
        }
        if (hours >= 24) {
          hours = 0;
          days += 1;
        }
        return { days, hours, mins };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleStart = () => {
    setOpened(true);
    soundManager.startBGM();
  };

  const handleCatClick = () => {
    soundManager.playPop();
    setCatPurrs((prev) => prev + 1);
  };

  const handleKittyBadgeClick = () => {
    soundManager.playChime();
  };

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-slate-800 font-sans relative selection:bg-purple-200 selection:text-purple-900 pb-16">
      
      {/* Background Subtle Grid Texture */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-70 z-0" />

      {/* Floating Sparkles & Hearts (Decorative Atmosphere) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-30 select-none animate-pulse"
            style={{
              top: `${(i * 11) % 95}%`,
              left: `${(i * 17) % 96}%`,
              fontSize: `${(i % 3) * 6 + 14}px`,
              animationDuration: `${(i % 3) + 2.5}s`,
            }}
          >
            {['✨', '🌸', '💜', '⭐', '🎈'][i % 5]}
          </div>
        ))}
      </div>

      {/* SCENE 1: Screen Opening Page */}
      {!opened && (
        <OpeningScene onBegin={handleStart} />
      )}

      {/* SCENES 2 to 5: Main Interactive Content */}
      {opened && (
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-12 sm:space-y-16 animate-fade-in">
          
          {/* Top Quick Bar */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
              <span className="text-pink-500">💕</span>
              <span>Boyfriend's Day Edition</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-purple-500">
                Oct 3rd
              </span>
            </div>
          </div>

          {/* SCENE 2: Main Dashboard Page */}
          <section id="dashboard" className="bg-white/95 rounded-3xl p-6 sm:p-10 border-2 border-purple-100 shadow-xl relative overflow-hidden space-y-8">
            
            {/* Washi Tape Decor */}
            <div className="washi-tape absolute -top-2 right-16 w-24 h-6 rotate-3 rounded-sm opacity-75" />

            {/* Top Badges & Hello Kitty Sticker */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="bg-purple-100/90 text-purple-800 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-purple-200">
                HAPPY BOYFRIEND'S DAY
              </span>

              {/* Hello Kitty Interactive Sticker Badge */}
              <div
                onClick={handleKittyBadgeClick}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 border border-pink-200 cursor-pointer shadow-xs transition-transform hover:scale-105 active:scale-95 select-none"
                title="Click for Hello Kitty sparkle!"
              >
                <HelloKittySticker className="w-6 h-6" />
                <span className="text-xs font-bold text-pink-700">
                  Hello Kitty Badge ✨
                </span>
              </div>
            </div>

            {/* Header: "To My Favourite Person" (Clickable to personalize) */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-purple-500 uppercase tracking-widest block">
                to my favourite boy
              </span>

              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={boyfriendName}
                    onChange={(e) => setBoyfriendName(e.target.value)}
                    className="text-2xl sm:text-4xl font-extrabold text-purple-950 font-serif bg-purple-50 border-2 border-purple-300 rounded-xl px-3 py-1 focus:outline-none"
                    placeholder="Enter nickname..."
                    autoFocus
                  />
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <h1 className="text-3xl sm:text-5xl font-black text-purple-950 font-serif tracking-tight">
                    To My {boyfriendName} 💕
                  </h1>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="opacity-40 group-hover:opacity-100 p-1 text-purple-600 hover:text-purple-900 transition-opacity cursor-pointer"
                    title="Edit nickname"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Romantic Love Paragraph */}
            <div className="relative bg-[#FCFAFE] rounded-2xl p-5 border border-purple-100/90 shadow-inner">
              <p className="text-purple-900 text-base sm:text-lg leading-relaxed font-serif">
                "Every time I think about us, I end up smiling like a complete goof. 
                Thank you for filling my world with so much warmth, comfort, and laughter. 
                Here is a little interactive scrapbook made just for you to celebrate Boyfriend's Day!"
              </p>
            </div>

            {/* Interactive Cute Kitten & Days Together Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Animated Interactive Kitten Card */}
              <div 
                onClick={handleCatClick}
                className="bg-purple-50/60 rounded-2xl p-4 border border-purple-200/80 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-purple-100/60 transition-all active:scale-95 group select-none shadow-xs"
              >
                <CuteCatIllustration className="w-16 h-16 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-purple-900 mt-1">
                  Tap for purrs! 🐾
                </span>
                <span className="text-[10px] text-pink-600 font-mono mt-0.5">
                  {catPurrs} purrs given 💕
                </span>
              </div>

              {/* Days Together Counter */}
              <div className="sm:col-span-2 bg-gradient-to-br from-purple-50 via-pink-50/40 to-indigo-50/50 rounded-2xl p-4 border border-purple-200/80 flex flex-col justify-center items-center text-center shadow-xs">
                <span className="text-[10px] font-mono font-bold tracking-widest text-purple-600 uppercase mb-1">
                  Time Spent In Love
                </span>
                <div className="flex items-center justify-center gap-4 text-purple-950 font-serif">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-purple-900">
                      {timeTogether.days}
                    </span>
                    <span className="block text-[10px] uppercase font-bold text-purple-500 font-sans">
                      Days
                    </span>
                  </div>
                  <span className="text-purple-300 text-xl font-bold">•</span>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-purple-900">
                      {timeTogether.hours}
                    </span>
                    <span className="block text-[10px] uppercase font-bold text-purple-500 font-sans">
                      Hours
                    </span>
                  </div>
                  <span className="text-purple-300 text-xl font-bold">•</span>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-purple-900">
                      {timeTogether.mins}
                    </span>
                    <span className="block text-[10px] uppercase font-bold text-purple-500 font-sans">
                      Mins
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Mini Music Player Widget ("NOW PLAYING Our Song") */}
            <AudioPlayer initialPlay={true} />

            {/* Button: "see our album ->" */}
            <div className="flex justify-center pt-2">
              <a
                href="#memory-wall"
                onClick={() => soundManager.playPop()}
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-300/50 hover:shadow-xl transition-all transform hover:scale-102 active:scale-95 cursor-pointer"
              >
                <span>see our album</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </section>

          {/* SCENE 3: Memory Wall Section */}
          <MemoryWall />

          {/* SCENE 4: Scratch Cards Section */}
          <ScratchCards />

          {/* Interactive Extra: Secret Love Capsule Jar */}
          <LoveJar />

          {/* Interactive Extra: Future Bucket List */}
          <BucketList />

          {/* SCENE 5: Binder Paper Love Letter Section */}
          <LoveLetter
            boyfriendName={boyfriendName}
            onRestart={() => {
              setOpened(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Wholesome Footer */}
          <footer className="text-center pt-8 border-t border-purple-200/80 text-xs text-purple-500 font-mono space-y-1">
            <p>Made with all my heart for Boyfriend's Day • Oct 3rd 💕</p>
            <p className="text-[11px] text-purple-400">
              Interactive Gift Experience • Ambient Lo-Fi Audio Included
            </p>
          </footer>

        </div>
      )}

    </div>
  );
}