import React from 'react';

// Hot air balloon with cute letter
export const HotAirBalloon: React.FC<{ className?: string }> = ({ className = "w-28 h-28" }) => (
  <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Balloon body */}
    <ellipse cx="60" cy="50" rx="42" ry="46" fill="#F3E8FF" stroke="#A855F7" strokeWidth="2.5" />
    {/* Stripes */}
    <path d="M60 4C45 15 38 35 38 50C38 65 45 85 60 96" fill="#FDF4FF" stroke="#C084FC" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M60 4C75 15 82 35 82 50C82 65 75 85 60 96" fill="#FDF4FF" stroke="#C084FC" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M60 4V96" stroke="#D8B4FE" strokeWidth="2" />
    {/* Little cloud puffs on balloon */}
    <circle cx="50" cy="40" r="4" fill="#FAF5FF" />
    <circle cx="56" cy="38" r="5" fill="#FAF5FF" />
    <circle cx="68" cy="42" r="3.5" fill="#FAF5FF" />
    {/* Ropes */}
    <line x1="42" y1="92" x2="48" y2="108" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
    <line x1="78" y1="92" x2="72" y2="108" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
    <line x1="60" y1="96" x2="60" y2="108" stroke="#C084FC" strokeWidth="1.5" />
    {/* Basket */}
    <rect x="46" y="108" width="28" height="18" rx="4" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
    <line x1="48" y1="117" x2="72" y2="117" stroke="#F59E0B" strokeWidth="1.5" />
    {/* Dangling Love Letter Envelope */}
    <g transform="translate(42, 116)">
      <rect x="5" y="8" width="26" height="17" rx="2" fill="#FFFFFF" stroke="#9333EA" strokeWidth="1.5" />
      <polygon points="5,8 18,17 31,8" fill="#F3E8FF" stroke="#9333EA" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="18" cy="16" r="2.5" fill="#EC4899" />
    </g>
  </svg>
);

// Hello Kitty Sticker
export const HelloKittySticker: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Kitty Head Outline */}
    <path 
      d="M30 24C22 14 16 18 16 26C16 32 18 36 20 40C12 48 10 62 18 72C26 82 42 86 50 86C58 86 74 82 82 72C90 62 88 48 80 40C82 36 84 32 84 26C84 18 78 14 70 24C64 22 56 21 50 21C44 21 36 22 30 24Z" 
      fill="#FFFFFF" 
      stroke="#1E1B4B" 
      strokeWidth="3.5" 
      strokeLinejoin="round" 
    />
    {/* Eyes */}
    <ellipse cx="36" cy="55" rx="3.5" ry="5" fill="#1E1B4B" />
    <ellipse cx="64" cy="55" rx="3.5" ry="5" fill="#1E1B4B" />
    {/* Nose */}
    <ellipse cx="50" cy="62" rx="4" ry="2.5" fill="#FACC15" stroke="#1E1B4B" strokeWidth="1.5" />
    {/* Whiskers Left */}
    <line x1="16" y1="52" x2="28" y2="54" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="14" y1="60" x2="27" y2="60" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="16" y1="68" x2="28" y2="66" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" />
    {/* Whiskers Right */}
    <line x1="84" y1="52" x2="72" y2="54" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="86" y1="60" x2="73" y2="60" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="84" y1="68" x2="72" y2="66" stroke="#1E1B4B" strokeWidth="2.5" strokeLinecap="round" />
    {/* Iconic Pink Bow */}
    <g transform="translate(62, 15) rotate(15)">
      {/* Center knot */}
      <circle cx="10" cy="10" r="5" fill="#EC4899" stroke="#1E1B4B" strokeWidth="2.5" />
      {/* Left loop */}
      <ellipse cx="0" cy="10" rx="9" ry="7" fill="#F472B6" stroke="#1E1B4B" strokeWidth="2.5" />
      {/* Right loop */}
      <ellipse cx="20" cy="10" rx="9" ry="7" fill="#F472B6" stroke="#1E1B4B" strokeWidth="2.5" />
      {/* Creases */}
      <line x1="-3" y1="10" x2="3" y2="10" stroke="#BE185D" strokeWidth="1.5" />
      <line x1="17" y1="10" x2="23" y2="10" stroke="#BE185D" strokeWidth="1.5" />
    </g>
  </svg>
);

// Cute Cartoon Kitten
export const CuteCatIllustration: React.FC<{ className?: string }> = ({ className = "w-20 h-20" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Cat body */}
    <ellipse cx="50" cy="65" rx="30" ry="24" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="2.5" />
    {/* Head */}
    <circle cx="50" cy="40" r="24" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2.5" />
    {/* Ears */}
    <polygon points="32,24 24,6 42,18" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="2.5" strokeLinejoin="round" />
    <polygon points="68,24 76,6 58,18" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="2.5" strokeLinejoin="round" />
    <polygon points="33,21 28,11 39,18" fill="#F472B6" />
    <polygon points="67,21 72,11 61,18" fill="#F472B6" />
    {/* Eyes Happy Curvature */}
    <path d="M38 38C40 34 44 34 46 38" stroke="#5B21B6" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M54 38C56 34 60 34 62 38" stroke="#5B21B6" strokeWidth="2.5" strokeLinecap="round" />
    {/* Blush */}
    <circle cx="35" cy="44" r="3.5" fill="#F472B6" opacity="0.6" />
    <circle cx="65" cy="44" r="3.5" fill="#F472B6" opacity="0.6" />
    {/* Cute Mouth */}
    <path d="M47 43Q50 46 53 43" stroke="#5B21B6" strokeWidth="2" strokeLinecap="round" />
    {/* Paws */}
    <ellipse cx="42" cy="74" rx="7" ry="5" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" />
    <ellipse cx="58" cy="74" rx="7" ry="5" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="2" />
    {/* Tail curling */}
    <path d="M78 68C88 64 92 52 88 44" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Heart floating over head */}
    <path d="M50 14C49 11 45 9 43 11C41 13 41 16 43 18L50 24L57 18C59 16 59 13 57 11C55 9 51 11 50 14Z" fill="#EC4899" />
  </svg>
);

// Flower Bouquet Illustration
export const FlowerBouquet: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Bouquet wrapping */}
    <polygon points="50,88 28,52 72,52" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" />
    <path d="M40 68L60 68" stroke="#B45309" strokeWidth="1.5" strokeDasharray="2 2" />
    {/* Wrapping ribbon */}
    <circle cx="50" cy="70" r="3" fill="#EC4899" />
    <path d="M48 70C43 72 38 78 40 82" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
    <path d="M52 70C57 72 62 78 60 82" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
    {/* Leaves */}
    <path d="M30 45C22 42 20 30 32 34C32 38 34 42 30 45Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
    <path d="M70 45C78 42 80 30 68 34C68 38 66 42 70 45Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.5" />
    {/* Flowers */}
    {/* Pink Tulip */}
    <circle cx="36" cy="34" r="9" fill="#F472B6" />
    <circle cx="36" cy="34" r="4" fill="#FDF2F8" />
    {/* Purple Blossom */}
    <circle cx="64" cy="34" r="9" fill="#C084FC" />
    <circle cx="64" cy="34" r="4" fill="#FAF5FF" />
    {/* Center Warm Sunflower/Daisy */}
    <g transform="translate(50, 24)">
      <circle cx="0" cy="0" r="12" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="5" fill="#78350F" />
      <circle cx="-9" cy="0" r="4" fill="#FEF08A" />
      <circle cx="9" cy="0" r="4" fill="#FEF08A" />
      <circle cx="0" cy="-9" r="4" fill="#FEF08A" />
      <circle cx="0" cy="9" r="4" fill="#FEF08A" />
    </g>
    {/* Little sparkles */}
    <path d="M50 4L51 8L55 9L51 10L50 14L49 10L45 9L49 8L50 4Z" fill="#FBBF24" />
  </svg>
);

// Cute Frog Illustration
export const CuteFrog: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Lily Pad Base */}
    <ellipse cx="50" cy="85" rx="42" ry="10" fill="#BBF7D0" stroke="#16A34A" strokeWidth="2" />
    <polygon points="50,85 70,82 68,88" fill="#FAF7FD" />
    {/* Frog Body */}
    <ellipse cx="50" cy="60" rx="28" ry="22" fill="#86EFAC" stroke="#15803D" strokeWidth="2.5" />
    {/* Belly */}
    <ellipse cx="50" cy="65" rx="18" ry="14" fill="#DCFCE7" />
    {/* Eyes background bubbles */}
    <circle cx="34" cy="42" r="10" fill="#86EFAC" stroke="#15803D" strokeWidth="2.5" />
    <circle cx="66" cy="42" r="10" fill="#86EFAC" stroke="#15803D" strokeWidth="2.5" />
    {/* Eye Pupils */}
    <ellipse cx="35" cy="42" rx="4" ry="6" fill="#14532D" />
    <ellipse cx="65" cy="42" rx="4" ry="6" fill="#14532D" />
    <circle cx="33" cy="40" r="1.8" fill="#FFFFFF" />
    <circle cx="63" cy="40" r="1.8" fill="#FFFFFF" />
    {/* Cheerful Mouth */}
    <path d="M42 56Q50 63 58 56" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Rosy Cheeks */}
    <ellipse cx="32" cy="58" rx="4" ry="2.5" fill="#F472B6" opacity="0.6" />
    <ellipse cx="68" cy="58" rx="4" ry="2.5" fill="#F472B6" opacity="0.6" />
    {/* Cute Little Mushroom Hat */}
    <g transform="translate(50, 24)">
      <path d="M-14 0C-14 -12 14 -12 14 0Z" fill="#F87171" stroke="#B91C1C" strokeWidth="2" />
      <circle cx="-5" cy="-5" r="2.5" fill="#FFFFFF" />
      <circle cx="6" cy="-4" r="2" fill="#FFFFFF" />
      <rect x="-3" y="0" width="6" height="5" fill="#FEF3C7" stroke="#B91C1C" strokeWidth="1" />
    </g>
  </svg>
);

// Lilac Postage Stamp
export const PostageStamp: React.FC<{ label?: string; date?: string; className?: string }> = ({ 
  label = "BOYFRIEND'S DAY", 
  date = "03 OCT",
  className = "w-24 h-28" 
}) => (
  <div className={`relative p-2.5 bg-purple-50 rounded shadow-md border-2 border-dashed border-purple-300 flex flex-col items-center justify-between text-center select-none ${className}`}>
    <div className="w-full flex justify-between items-center text-[8px] font-mono font-bold text-purple-400">
      <span>★ MAIL</span>
      <span>{date}</span>
    </div>
    <div className="w-full py-1 border-y border-purple-200 my-1 flex items-center justify-center">
      <span className="text-xl">💌</span>
    </div>
    <span className="text-[9px] font-extrabold tracking-wider text-purple-700 font-mono">
      {label}
    </span>
  </div>
);
