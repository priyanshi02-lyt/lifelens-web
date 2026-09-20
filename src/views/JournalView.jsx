import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  X, 
  Check, 
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

    const rotates = ['-1deg', '0deg', '1deg'];
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

    const customOnly = updated.filter(item => item.sourceId);
    localStorage.setItem('lifelens-journal-imports', JSON.stringify(customOnly));

    setNewTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-[1240px] px-3.5 py-5 sm:px-8 lg:py-10 pb-28 md:pb-12 w-full max-w-full overflow-hidden">
      
      {/* Page Intro */}
      <PageIntro
        eyebrow="Your quiet corner"
        title="My Journal"
        description="A place for the moments, thoughts, and tiny truths worth keeping."
        action={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="primary-button !py-2 !px-3.5 text-xs sm:text-sm" 
            data-testid="journal-new-entry-button"
          >
            <Plus size={15} />
            <span>New entry</span>
          </button>
        }
      />

      {/* Masonry Grid */}
      <div 
        className="relative columns-1 gap-4 sm:columns-2 lg:columns-3 w-full max-w-full"
        data-testid="journal-masonry-grid"
      >
        {entries.map((entry, idx) => (
          <article
            key={idx}
            className="mb-4 break-inside-avoid overflow-hidden rounded-[22px] bg-white p-3 shadow-xs ring-1 ring-[#ece9f3] transition-all hover:shadow-md w-full"
            style={{ transform: `rotate(${entry.rotate || '0deg'})` }}
            data-testid={`journal-entry-card-${idx + 1}`}
          >
            {entry.image ? (
              <div 
                className="h-[180px] rounded-[16px] bg-cover bg-center overflow-hidden mb-2.5"
                style={{ backgroundImage: `url(${entry.image})` }}
              />
            ) : (
              <div 
                className="flex min-h-[150px] items-center justify-center rounded-[16px] p-5 text-center mb-2.5"
                style={{ backgroundColor: entry.color || '#fff1cf' }}
              >
                <div>
                  <Sparkles className="mx-auto mb-2 text-[#a1852f]" size={18} />
                  <p 
                    className="font-heading text-lg font-bold leading-tight text-[#655523]"
                    data-testid={`journal-entry-title-${idx + 1}`}
                  >
                    “{entry.title}”
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between px-1.5 pt-1 text-xs text-slate-400">
              <span className="font-semibold text-slate-700 truncate max-w-[200px]">{entry.title}</span>
              <span className="text-[11px]">{entry.date}</span>
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
            className="relative w-full max-w-md rounded-[24px] bg-white p-5 sm:p-6 shadow-2xl ring-1 ring-[#ece9f3]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3.5">
              <div className="eyebrow text-[#5269dd]">
                <BookMarked size={13} />
                <span>NEW REFLECTION</span>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="grid size-7 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  What's on your mind?
                </label>
                <textarea
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="A quiet moment, an insight, or a thought to hold onto..."
                  rows={3}
                  className="w-full rounded-2xl bg-[#faf9fd] p-3 text-xs sm:text-sm text-[#2d1f3f] placeholder-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#5269dd]/20 border border-slate-200 resize-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5">
                  Sticky Note Color
                </label>
                <div className="flex gap-2">
                  {NOTE_COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className="size-7 rounded-full border-2 transition flex items-center justify-center"
                      style={{ 
                        backgroundColor: c,
                        borderColor: selectedColor === c ? '#172b65' : 'transparent' 
                      }}
                    >
                      {selectedColor === c && <Check size={12} className="text-slate-800" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="secondary-button flex-1 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTitle.trim()}
                  className="primary-button flex-1 disabled:opacity-50 text-xs"
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
