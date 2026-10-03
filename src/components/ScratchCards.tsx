import React, { useRef, useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';
import { Sparkles, Check, Heart, ArrowRight } from 'lucide-react';

interface TruthCardItem {
  id: string;
  number: string;
  shortTruth: string;
  fullMessage: string;
  emoji: string;
}

const TRUTHS_DATA: TruthCardItem[] = [
  {
    id: 't1',
    number: '01',
    shortTruth: 'you show up',
    fullMessage: 'Even on the busiest, most chaotic days, you always find a way to check in on me and be there.',
    emoji: '💫',
  },
  {
    id: 't2',
    number: '02',
    shortTruth: "you're funny",
    fullMessage: "Your goofy faces and random jokes make me laugh until my stomach hurts. Never stop being silly.",
    emoji: '😆',
  },
  {
    id: 't3',
    number: '03',
    shortTruth: "you're mine",
    fullMessage: 'Out of all 8 billion people on Earth, my heart found you—and I would choose you every single lifetime.',
    emoji: '🔒',
  },
  {
    id: 't4',
    number: '04',
    shortTruth: "you're honest",
    fullMessage: 'I never have to doubt you. Your genuine honesty and kindness make me feel so safe and understood.',
    emoji: '🤍',
  },
  {
    id: 't5',
    number: '05',
    shortTruth: 'you remember',
    fullMessage: 'You remember the tiny details: my coffee order, the songs I hum, and things I mentioned weeks ago.',
    emoji: '☕',
  },
  {
    id: 't6',
    number: '06',
    shortTruth: "you're home",
    fullMessage: 'No matter where we are in the world, being in your arms feels like the warmest, safest sanctuary.',
    emoji: '🏡',
  },
];

interface SingleScratchCardProps {
  item: TruthCardItem;
  onRevealed: (id: string) => void;
  isGloballyRevealed?: boolean;
}

const SingleScratchCard: React.FC<SingleScratchCardProps> = ({ item, onRevealed, isGloballyRevealed }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const [cleared, setCleared] = useState(false);
  const lastSoundTime = useRef(0);

  useEffect(() => {
    if (isGloballyRevealed && !cleared) {
      setCleared(true);
      onRevealed(item.id);
    }
  }, [isGloballyRevealed, cleared, item.id, onRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || cleared) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Metallic Lilac Purple Foil Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#c084fc');
    gradient.addColorStop(0.5, '#a855f7');
    gradient.addColorStop(1, '#7e22ce');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Diagonal decorative sparkle lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    for (let i = -width; i < width * 2; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height, height);
      ctx.stroke();
    }

    // Badge Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`TRUTH #${item.number}`, width / 2, height / 2 - 12);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillText('✨ Rub to scratch open ✨', width / 2, height / 2 + 12);
  }, [cleared, item.number]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || cleared) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Play scratch sound throttled
    const now = Date.now();
    if (now - lastSoundTime.current > 70) {
      soundManager.playScratch();
      lastSoundTime.current = now;
    }

    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || cleared) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const percentage = (transparentPixels / (pixels.length / 4)) * 100;
      if (percentage > 42) {
        setCleared(true);
        soundManager.playChime();
        onRevealed(item.id);
      }
    } catch {}
  };

  return (
    <div className="relative w-full h-44 bg-gradient-to-br from-purple-50 via-pink-50/40 to-indigo-50/50 rounded-2xl shadow-sm hover:shadow-md border-2 border-purple-200 overflow-hidden flex flex-col justify-center items-center p-4 transition-all">
      {/* Revealed Content Behind the Scratch Foil */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-4 text-center select-none bg-[#FCFAFE]">
        <div className="flex items-center justify-between w-full">
          <span className="text-[10px] font-mono font-bold tracking-widest text-purple-500 uppercase">
            TRUTH {item.number}
          </span>
          <span className="text-base">{item.emoji}</span>
        </div>

        <div className="my-auto">
          <span className="text-lg sm:text-xl font-extrabold text-purple-950 font-serif leading-tight block mb-1">
            "{item.shortTruth}"
          </span>
          <p className="text-xs text-purple-700/90 font-sans leading-relaxed line-clamp-3">
            {item.fullMessage}
          </p>
        </div>

        <div className="w-full flex items-center justify-center gap-1 text-[10px] text-pink-600 font-bold">
          <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
          <span>unlocked with love</span>
        </div>
      </div>

      {/* Canvas Scratch Foil Layer */}
      {!cleared && (
        <canvas
          ref={canvasRef}
          width={280}
          height={176}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10 rounded-2xl transition-opacity duration-300"
          onMouseDown={(e) => {
            isDrawing.current = true;
            if (canvasRef.current) {
              const rect = canvasRef.current.getBoundingClientRect();
              scratch(e.clientX - rect.left, e.clientY - rect.top);
            }
          }}
          onMouseMove={(e) => {
            if (!isDrawing.current || !canvasRef.current) return;
            const rect = canvasRef.current.getBoundingClientRect();
            scratch(e.clientX - rect.left, e.clientY - rect.top);
          }}
          onMouseUp={() => { isDrawing.current = false; }}
          onMouseLeave={() => { isDrawing.current = false; }}
          onTouchStart={(e) => {
            isDrawing.current = true;
            if (canvasRef.current && e.touches.length > 0) {
              const rect = canvasRef.current.getBoundingClientRect();
              scratch(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
            }
          }}
          onTouchMove={(e) => {
            if (!isDrawing.current || !canvasRef.current || e.touches.length === 0) return;
            const rect = canvasRef.current.getBoundingClientRect();
            scratch(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
          }}
          onTouchEnd={() => { isDrawing.current = false; }}
        />
      )}
    </div>
  );
};

export const ScratchCards: React.FC = () => {
  const [revealedIds, setRevealedIds] = useState<{ [key: string]: boolean }>({});
  const [revealAllTriggered, setRevealAllTriggered] = useState(false);

  const handleRevealed = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: true }));
  };

  const revealedCount = Object.keys(revealedIds).length;
  const isAllRevealed = revealedCount >= TRUTHS_DATA.length;

  const handleRevealAll = () => {
    soundManager.playChime();
    setRevealAllTriggered(true);
    const allObj: { [key: string]: boolean } = {};
    TRUTHS_DATA.forEach((t) => {
      allObj[t.id] = true;
    });
    setRevealedIds(allObj);
  };

  return (
    <section id="scratch-cards" className="bg-white/95 rounded-3xl p-6 sm:p-8 border-2 border-purple-100 shadow-xl space-y-6 scroll-mt-20">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Interactive Scratch-Off</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-purple-950 font-serif">
          SIX LITTLE TRUTHS • <span className="text-purple-600 font-sans text-xl sm:text-2xl font-semibold">scratch these open</span>
        </h2>
        <p className="text-xs sm:text-sm text-purple-600 italic font-serif">
          "rub each one, there's something under it"
        </p>

        {/* Status Tracker */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            {revealedCount} of {TRUTHS_DATA.length} truths uncovered
          </span>

          {!isAllRevealed && (
            <button
              onClick={handleRevealAll}
              className="text-xs font-medium text-purple-600 hover:text-purple-800 underline cursor-pointer"
            >
              ✨ Reveal all
            </button>
          )}
        </div>
      </div>

      {/* Grid of 6 scratch cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {TRUTHS_DATA.map((item) => (
          <SingleScratchCard
            key={item.id}
            item={item}
            onRevealed={handleRevealed}
            isGloballyRevealed={revealAllTriggered}
          />
        ))}
      </div>

      {/* Button to proceed to the Letter: "read the letter ->" */}
      <div className="pt-4 flex flex-col items-center justify-center gap-2">
        <a
          href="#love-letter"
          onClick={() => soundManager.playPop()}
          className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm sm:text-base transition-all transform shadow-md hover:shadow-lg ${
            isAllRevealed
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white scale-105 animate-pulse'
              : 'bg-purple-100 hover:bg-purple-200 text-purple-800'
          }`}
        >
          <span>read the letter</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <span className="text-[11px] text-purple-400 font-mono">
          Final Chapter • A special note for you
        </span>
      </div>

    </section>
  );
};
