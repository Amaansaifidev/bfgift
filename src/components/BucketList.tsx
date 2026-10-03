import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import { CheckSquare, Square, Plus, Sparkles } from 'lucide-react';

interface BucketItem {
  id: number;
  text: string;
  done: boolean;
}

export const BucketList: React.FC = () => {
  const [items, setItems] = useState<BucketItem[]>([
    { id: 1, text: "Stargazing picnic with hot cocoa ☕", done: true },
    { id: 2, text: "Bake cookies & messy kitchen day 🍪", done: true },
    { id: 3, text: "Late night city drive with lo-fi music 🚗", done: false },
    { id: 4, text: "Learn a new pasta recipe together 🍝", done: false },
    { id: 5, text: "Cozy rainy day gaming marathon 🎮", done: true },
    { id: 6, text: "Weekend roadtrip to the mountains 🌄", done: false },
  ]);
  const [newText, setNewText] = useState("");

  const toggleItem = (id: number) => {
    soundManager.playPop();
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    soundManager.playPop();
    setItems((prev) => [
      ...prev,
      { id: Date.now(), text: newText.trim(), done: false },
    ]);
    setNewText("");
  };

  const doneCount = items.filter((i) => i.done).length;

  return (
    <section className="bg-white/95 rounded-3xl p-6 sm:p-8 border-2 border-purple-100 shadow-xl space-y-5">
      <div className="flex flex-wrap items-center justify-between border-b border-purple-100 pb-3 gap-2">
        <div>
          <span className="text-[11px] font-mono font-bold tracking-widest text-purple-600 uppercase">
            Future Dates & Adventures
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-purple-950 font-serif">
            OUR BUCKET LIST 📝
          </h3>
        </div>
        <div>
          <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            {doneCount} / {items.length} Done
          </span>
        </div>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
              item.done
                ? 'bg-purple-50/70 border-purple-200 text-purple-900 line-through opacity-80'
                : 'bg-white border-slate-200 hover:border-purple-300 text-slate-800'
            }`}
          >
            {item.done ? (
              <CheckSquare className="w-5 h-5 text-purple-600 flex-shrink-0" />
            ) : (
              <Square className="w-5 h-5 text-purple-300 flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Add Custom Date Idea */}
      <form onSubmit={addItem} className="flex gap-2 pt-2">
        <input
          type="text"
          placeholder="Add a new dream date idea..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="flex-1 bg-purple-50/50 border border-purple-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-400 placeholder:text-purple-300"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>
    </section>
  );
};
