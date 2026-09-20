import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Plus, 
  X, 
  Calendar, 
  Image as ImageIcon, 
  Check, 
  Heart,
  BookMarked
} from 'lucide-react';
import PageIntro from '../components/PageIntro';
import { defaultJournalEntries } from '../data/userLifeDataset';

const NOTE_COLORS = ['#fff1cf', '#e7f4eb', '#fff0a6', '#ebe8fb', '#e6edff', '#fde8e4'];

export default function JournalView() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('lifelens-journal-imports');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...defaultJournalEntries];
      } catch (e) {
        return defaultJournalEntries;
      }
    }
    return defaultJournalEntries;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const rotates = ['-2deg', '-1deg', '1deg', '2deg'];
    const randomRotate = rotates[Math.floor(Math.random() * rotates.length)];

    const entry = {
      title: newTitle,
      date: 'Today',
      image: '',
      color: selectedColor,
      rotate: randomRotate,
      sourceId: 'custom-' + Date.now()
    };

    const updated = [entry, ...entries];
    setEntries(updated);

    // Save to local storage
    const customOnly = updated.filter(item => item.sourceId);
    localStorage.setItem('lifelens-journal-imports', JSON.stringify(customOnly));

    setNewTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-6 sm:px-8 lg:py-10 pb-24 md:pb-12">
      
      {/* Page Intro */}
      <PageIntro
        eyebrow="Your quiet corner"
        title="My Journal"
        description="A place for the moments, thoughts, and tiny truths worth keeping."
        action={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="primary-button" 
            data-testid="journal-new-entry-button"
          >
            <Plus size={16} />
            <span>New entry</span>
          </button>
        }
      />

      {/* Masonry Grid */}
      <div 
        className="relative columns-1 gap-5 sm:columns-2 lg:columns-3"
        data-testid="journal-masonry-grid"
      >
        {entries.map((entry, idx) => (
          <article
            key={idx}
            className="mb-5 break-inside-avoid overflow-hidden rounded-[24px] bg-white p-3.5 shadow-[0_8px_30px_rgba(45,31,63,0.06)] ring-1 ring-[#ece9f3] transition-all hover:scale-[1.02] hover:shadow-lg"
            style={{ transform: `rotate(${entry.rotate || '0deg'})` }}
            data-testid={`journal-entry-card-${idx + 1}`}
          >
            {entry.image ? (
              <div 
                className="h-[190px] rounded-[18px] bg-cover bg-center overflow-hidden mb-3"
                style={{ backgroundImage: `url(${entry.image})` }}
              />
            ) : (
              <div 
                className="flex min-h-[170px] items-center justify-center rounded-[18px] p-6 text-center mb-3"
                style={{ backgroundColor: entry.color || '#fff1cf' }}
              >
                <div>
                  <Sparkles className="mx-auto mb-3 text-[#a1852f]" size={20} />
                  <p 
                    className="font-heading text-xl font-bold leading-tight text-[#655523]"
                    data-testid={`journal-entry-title-${idx + 1}`}
                  >
                    “{entry.title}”
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between px-2 pt-1 pb-1 text-xs text-slate-400">
              <span className="font-semibold text-slate-700">{entry.title}</span>
              <span>{entry.date}</span>
            </div>
          </article>
        ))}
      </div>

      {/* New Entry Modal Dialog */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-reveal-up"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl ring-1 ring-[#ece9f3]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="eyebrow text-[#5269dd]">
                <BookMarked size={14} />
                <span>NEW REFLECTION</span>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="grid size-8 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5">
                  What's on your mind?
                </label>
                <textarea
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="A quiet moment, an insight, or a thought to hold onto..."
                  rows={4}
                  className="w-full rounded-2xl bg-[#faf9fd] p-3 text-sm text-[#2d1f3f] placeholder-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#5269dd]/20 border border-slate-200 resize-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-2">
                  Sticky Note Color
                </label>
                <div className="flex gap-2">
                  {NOTE_COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className="size-8 rounded-full border-2 transition flex items-center justify-center"
                      style={{ 
                        backgroundColor: c,
                        borderColor: selectedColor === c ? '#172b65' : 'transparent' 
                      }}
                    >
                      {selectedColor === c && <Check size={14} className="text-slate-800" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="secondary-button flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="primary-button flex-1 disabled:opacity-50"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
