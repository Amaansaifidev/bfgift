import React, { useState } from 'react';
import { FlowerBouquet, CuteFrog, CuteCatIllustration } from './CuteSVGs';
import { soundManager } from '../utils/audio';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';

interface MemoryCardData {
  id: string;
  tag: string;
  date: string;
  title: string;
  caption: string;
  backTitle: string;
  backNote: string;
  signoff: string;
  renderIllustration: () => React.ReactNode;
  tapeColor: string;
}

export const MemoryWall: React.FC = () => {
  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});
  const [likes, setLikes] = useState<{ [key: string]: number }>({});

  const cards: MemoryCardData[] = [
    {
      id: 'polaroid-1',
      tag: 'POLAROID #01',
      date: 'Oct 3rd',
      title: 'Flower Bouquet For You',
      caption: 'tap to flip 💐',
      backTitle: 'To my favourite boy...',
      backNote: "You always make even the most ordinary days feel like a garden in full bloom. I love you the mostest!",
      signoff: 'ILYSM 💕',
      renderIllustration: () => <FlowerBouquet className="w-24 h-24 drop-shadow-sm" />,
      tapeColor: 'rgba(244, 114, 182, 0.6)',
    },
    {
      id: 'polaroid-2',
      tag: 'POLAROID #02',
      date: 'Special Moment',
      title: 'Cute Froggy Companion',
      caption: 'tap to flip 🐸',
      backTitle: 'Hop into my heart 💚',
      backNote: "Remember when you made me laugh so hard I couldn't even breathe? You're my favorite comedian and comfort person.",
      signoff: 'I LOVE YOU THE MOSTEST 🐸',
      renderIllustration: () => <CuteFrog className="w-24 h-24 drop-shadow-sm" />,
      tapeColor: 'rgba(134, 239, 172, 0.6)',
    },
    {
      id: 'polaroid-3',
      tag: 'POLAROID #03',
      date: 'Rainy Days',
      title: 'Cozy Snuggles & Purrs',
      caption: 'tap to flip 🐱',
      backTitle: 'Our Warm Bubble ☁️',
      backNote: "Whenever the world feels overwhelming, just sitting next to you with coffee and silence makes everything alright.",
      signoff: 'Always yours 🐾',
      renderIllustration: () => <CuteCatIllustration className="w-24 h-24 drop-shadow-sm" />,
      tapeColor: 'rgba(192, 132, 252, 0.6)',
    },
    {
      id: 'polaroid-4',
      tag: 'POLAROID #04',
      date: 'Stargazing Night',
      title: 'Late Night Coffee & Talks',
      caption: 'tap to flip ☕',
      backTitle: 'Under the Stars ✨',
      backNote: "Talking to you at 2 AM about our wildest dreams is my favorite thing. You know my heart better than anyone.",
      signoff: 'Forever & Always 🌙',
      renderIllustration: () => (
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-900 to-purple-800 flex flex-col items-center justify-center text-3xl shadow-inner border border-purple-400">
          <span>☕</span>
          <span className="text-[10px] text-purple-200 font-mono mt-1">2:00 AM</span>
        </div>
      ),
      tapeColor: 'rgba(253, 224, 71, 0.6)',
    },
  ];

  const handleFlip = (id: string) => {
    soundManager.playFlip();
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    soundManager.playPop();
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <section id="memory-wall" className="w-full space-y-6 scroll-mt-20">
      
      {/* Section Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Interactive Scrapbook</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-950 font-serif">
          THE MEMORY WALL • <span className="text-purple-600 font-sans text-xl sm:text-2xl font-semibold">flip one over</span>
        </h2>
        <p className="text-xs sm:text-sm text-purple-600 max-w-md mx-auto italic font-serif">
          "every photo has something written on the back"
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        {cards.map((card) => {
          const isFlipped = !!flipped[card.id];
          const cardLikes = likes[card.id] || 0;

          return (
            <div
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className="h-80 cursor-pointer perspective-1000 group relative"
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-2xl shadow-md group-hover:shadow-xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT SIDE (Polaroid Style) */}
                <div className="absolute inset-0 w-full h-full bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border-2 border-purple-100 flex flex-col justify-between items-center backface-hidden shadow-sm">
                  
                  {/* Washi Tape Accent */}
                  <div 
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-5 rounded-sm shadow-sm"
                    style={{ backgroundColor: card.tapeColor }}
                  />

                  {/* Header info */}
                  <div className="w-full flex justify-between items-center text-[10px] sm:text-xs font-mono font-bold text-purple-400 pt-1">
                    <span>{card.tag}</span>
                    <span>{card.date}</span>
                  </div>

                  {/* Illustration Area */}
                  <div className="w-full flex-1 bg-gradient-to-br from-purple-50 via-pink-50/50 to-indigo-50/40 rounded-xl my-2 flex items-center justify-center shadow-inner border border-purple-100/70 overflow-hidden relative">
                    {card.renderIllustration()}
                    <div className="absolute bottom-2 right-2 text-[10px] bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-full text-purple-700 font-mono flex items-center gap-1">
                      <RotateCcw className="w-3 h-3 text-purple-500" />
                      <span>flip</span>
                    </div>
                  </div>

                  {/* Footer details */}
                  <div className="w-full flex items-center justify-between pt-1">
                    <div>
                      <h3 className="font-serif font-bold text-purple-950 text-sm sm:text-base">
                        {card.title}
                      </h3>
                      <span className="text-[11px] text-pink-500 font-medium">
                        {card.caption}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleLike(e, card.id)}
                      className="flex items-center gap-1.5 px-3 py-1 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-full text-pink-600 text-xs font-bold transition-all active:scale-90"
                      title="Send Love"
                    >
                      <Heart className={`w-3.5 h-3.5 ${cardLikes > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
                      <span>{cardLikes}</span>
                    </button>
                  </div>
                </div>

                {/* BACK SIDE (Handwritten Note on Warm Paper) */}
                <div className="absolute inset-0 w-full h-full bg-[#FEFCF8] bg-lined-paper rounded-2xl p-6 border-2 border-purple-200 flex flex-col justify-between rotate-y-180 backface-hidden shadow-sm">
                  
                  {/* Top stamp/tag */}
                  <div className="flex items-center justify-between border-b border-purple-200/80 pb-2">
                    <span className="font-serif font-bold text-xs uppercase tracking-wider text-purple-800">
                      {card.backTitle}
                    </span>
                    <span className="text-xs text-pink-400 font-bold">♥</span>
                  </div>

                  {/* Handwritten Memory Note */}
                  <div className="my-auto py-2">
                    <p className="font-hand text-xl sm:text-2xl text-purple-950 leading-relaxed">
                      "{card.backNote}"
                    </p>
                  </div>

                  {/* Signoff */}
                  <div className="flex items-center justify-between pt-2 border-t border-purple-100">
                    <span className="font-serif italic font-bold text-purple-900 text-sm">
                      {card.signoff}
                    </span>
                    <span className="text-[10px] text-purple-500 font-mono bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                      Click to flip back
                    </span>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Button to proceed to next section */}
      <div className="flex justify-center pt-2">
        <a
          href="#scratch-cards"
          onClick={() => soundManager.playPop()}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95"
        >
          <span>reveal six little truths</span>
          <span>👇</span>
        </a>
      </div>

    </section>
  );
};
