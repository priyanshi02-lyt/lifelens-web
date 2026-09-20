import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  X, 
  LayoutGrid, 
  List, 
  Sparkles, 
  BookmarkPlus, 
  CheckCircle2,
  Receipt
} from 'lucide-react';
import PageIntro from '../components/PageIntro';

const CATEGORIES = ['All', 'Music', 'Places', 'Movies', 'Purchases', 'Photos', 'Messages', 'Searches', 'Events', 'Notes'];

export default function ExploreView({ moments, onSelectMoment, onOpenThermalSlip }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [toastMessage, setToastMessage] = useState(null);

  // Filter moments by search and category
  const filteredMoments = useMemo(() => {
    return moments.filter(m => {
      const matchCat = selectedCategory === 'All' || m.kind === selectedCategory;
      const term = searchQuery.toLowerCase().trim();
      const matchSearch = !term || 
        (m.title && m.title.toLowerCase().includes(term)) ||
        (m.subtitle && m.subtitle.toLowerCase().includes(term)) ||
        (m.mood && m.mood.toLowerCase().includes(term)) ||
        (m.story && m.story.toLowerCase().includes(term)) ||
        (m.kind && m.kind.toLowerCase().includes(term));
      return matchCat && matchSearch;
    });
  }, [moments, selectedCategory, searchQuery]);

  const handleSaveToJournal = (e, moment) => {
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem('lifelens-journal-imports') || '[]');
    if (saved.some(item => item.sourceId === moment.id)) {
      setToastMessage('Already saved to your journal!');
      setTimeout(() => setToastMessage(null), 2500);
      return;
    }

    const newEntry = {
      title: moment.title,
      date: moment.date,
      image: moment.image,
      color: moment.color,
      rotate: '1deg',
      sourceId: moment.id
    };

    localStorage.setItem('lifelens-journal-imports', JSON.stringify([newEntry, ...saved]));
    setToastMessage('Moment saved to your journal!');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="mx-auto max-w-[1240px] px-3.5 py-5 sm:px-8 lg:py-10 pb-28 md:pb-12 w-full max-w-full overflow-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 left-4 sm:left-auto sm:right-6 z-50 flex items-center justify-center gap-2 rounded-2xl bg-[#172b65] text-white px-5 py-3 shadow-xl text-xs font-bold animate-reveal-up">
          <CheckCircle2 size={16} className="text-[#00c48c]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Intro */}
      <PageIntro
        eyebrow="Make connections"
        title="Explore your data"
        description="Search, filter, and follow the threads between your everyday moments."
        action={
          <Link to="/insights" className="secondary-button !py-2 !px-3.5 text-xs sm:text-sm" data-testid="explorer-insights-link">
            <Sparkles size={15} className="text-[#5269dd]" />
            <span>View insights</span>
          </Link>
        }
      />

      {/* Controls Bar: Search Input + View Mode Toggles */}
      <div 
        className="flex items-center gap-2 rounded-[22px] bg-white p-2 sm:p-3 ring-1 ring-[#ece9f3] mb-5 shadow-xs w-full max-w-full"
        data-testid="explorer-controls"
      >
        <div className="relative flex-1 min-w-0">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9aa4b5]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs, places, feelings..."
            className="h-10 sm:h-11 w-full rounded-xl bg-[#f8f7fc] pl-10 pr-9 text-xs sm:text-sm text-[#2d1f3f] placeholder-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#5269dd]/20 border border-transparent focus:border-[#5269dd]/20"
            data-testid="explorer-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8690a1] hover:text-slate-700"
              data-testid="explorer-clear-search-button"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="flex gap-1.5 items-center shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`grid size-9 sm:size-11 place-items-center rounded-xl transition ${
              viewMode === 'grid' 
                ? 'bg-[#172b65] text-white' 
                : 'bg-[#f8f7fc] text-[#8290a4] hover:bg-slate-100'
            }`}
            data-testid="explorer-grid-view-button"
            aria-label="Grid view"
            title="Grid view"
          >
            <LayoutGrid size={15} />
          </button>
          
          <button
            onClick={() => setViewMode('list')}
            className={`grid size-9 sm:size-11 place-items-center rounded-xl transition ${
              viewMode === 'list' 
                ? 'bg-[#172b65] text-white' 
                : 'bg-[#f8f7fc] text-[#8290a4] hover:bg-slate-100'
            }`}
            data-testid="explorer-list-view-button"
            aria-label="List view"
            title="List view"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Category Filter Chips Bar */}
      <div className="mb-6 flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none w-full max-w-full">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`filter-chip ${selectedCategory === cat ? 'filter-chip-active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="mb-3.5 flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
        <span>Found {filteredMoments.length} moments</span>
        {selectedCategory !== 'All' && <span>Category: {selectedCategory}</span>}
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-full" data-testid="explorer-grid">
          {filteredMoments.slice(0, 48).map((m, idx) => (
            <article
              key={m.id}
              onClick={() => onSelectMoment && onSelectMoment(m)}
              className="group cursor-pointer overflow-hidden rounded-[22px] sm:rounded-[26px] bg-white ring-1 ring-[#ece9f3] shadow-xs hover:shadow-lg hover:ring-[#5269dd]/30 transition-all flex flex-col justify-between w-full"
              data-testid={`explorer-moment-${idx + 1}`}
            >
              <div>
                {/* Photo / Card Header */}
                {m.image ? (
                  <div 
                    className="relative h-40 sm:h-44 w-full bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `url(${m.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2.5 left-3.5 right-3.5 flex justify-between items-center text-white text-xs">
                      <span className="font-bold px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-[10px]">
                        {m.kind}
                      </span>
                      <span className="font-semibold text-[10px] opacity-90">
                        {m.date}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="h-24 sm:h-28 w-full p-3.5 sm:p-4 flex flex-col justify-between"
                    style={{ backgroundColor: m.color || '#f5eefc' }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{m.icon}</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/70 text-slate-700 uppercase">
                        {m.kind}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{m.date}</span>
                  </div>
                )}

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading text-base sm:text-lg font-bold text-[#2d1f3f] group-hover:text-[#5269dd] transition leading-snug line-clamp-1">
                      {m.title}
                    </h3>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase flex-shrink-0">
                      {m.mood}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-500 mt-1 truncate">
                    {m.subtitle}
                  </p>

                  {m.story && (
                    <p className="mt-2.5 text-xs text-[#6f6782] line-clamp-2 leading-relaxed">
                      "{m.story}"
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                {m.amount && parseFloat(m.amount) > 0 ? (
                  <span className="font-bold text-slate-900">
                    ₹{parseFloat(m.amount).toLocaleString('en-IN')}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 font-medium">
                    {m.time}
                  </span>
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={(e) => handleSaveToJournal(e, m)}
                    className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-[#172b65] hover:bg-slate-100 transition"
                    title="Save to Journal"
                  >
                    <BookmarkPlus size={15} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenThermalSlip) onOpenThermalSlip(m);
                    }}
                    className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-[#172b65] hover:bg-slate-100 transition"
                    title="View Thermal Slip"
                  >
                    <Receipt size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="divide-y divide-slate-100 rounded-[22px] bg-white ring-1 ring-[#ece9f3] overflow-hidden shadow-xs w-full max-w-full">
          {filteredMoments.slice(0, 50).map((m, idx) => (
            <div
              key={m.id}
              onClick={() => onSelectMoment && onSelectMoment(m)}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 sm:p-4 hover:bg-[#faf9fd] transition cursor-pointer gap-2 sm:gap-3 w-full"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span 
                  className="size-8 sm:size-9 grid place-items-center rounded-xl text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: m.color || '#e9e4ff' }}
                >
                  {m.icon || '✦'}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="font-heading text-xs sm:text-sm font-bold text-[#2d1f3f] truncate">
                    {m.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {m.subtitle} · <span className="text-slate-400">{m.date}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs w-full sm:w-auto justify-between sm:justify-end pl-10 sm:pl-0 pt-1 sm:pt-0">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold uppercase text-[9px]">
                  {m.mood}
                </span>

                {m.amount && parseFloat(m.amount) > 0 && (
                  <span className="font-bold text-slate-800">
                    ₹{parseFloat(m.amount).toLocaleString('en-IN')}
                  </span>
                )}

                <button
                  onClick={(e) => handleSaveToJournal(e, m)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#172b65] hover:bg-slate-200 transition"
                  title="Save to Journal"
                >
                  <BookmarkPlus size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
