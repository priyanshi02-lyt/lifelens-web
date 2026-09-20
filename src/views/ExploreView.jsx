import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  X, 
  LayoutGrid, 
  List, 
  Sparkles, 
  BookmarkPlus, 
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
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
    <div className="mx-auto max-w-[1240px] px-4 py-6 sm:px-8 lg:py-10 pb-24 md:pb-12">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 flex items-center gap-2 rounded-2xl bg-[#172b65] text-white px-5 py-3 shadow-xl text-xs font-bold animate-reveal-up">
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
          <Link to="/insights" className="secondary-button" data-testid="explorer-insights-link">
            <Sparkles size={16} className="text-[#5269dd]" />
            <span>View insights</span>
          </Link>
        }
      />

      {/* Controls Bar: Search Input + View Mode Toggles */}
      <div 
        className="flex flex-col gap-3 rounded-[24px] bg-white p-3 ring-1 ring-[#ece9f3] sm:flex-row mb-6 shadow-sm"
        data-testid="explorer-controls"
      >
        <div className="relative flex-1">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aa4b5]" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs, places, feelings, purchases..."
            className="h-12 w-full rounded-xl bg-[#f8f7fc] pl-11 pr-10 text-sm text-[#2d1f3f] placeholder-slate-400 outline-none transition focus:bg-white focus:ring-4 focus:ring-[#8b70e5]/10 border border-transparent focus:border-[#5269dd]/20"
            data-testid="explorer-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8690a1] hover:text-slate-700"
              data-testid="explorer-clear-search-button"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setViewMode('grid')}
            className={`grid size-12 place-items-center rounded-xl transition ${
              viewMode === 'grid' 
                ? 'bg-[#172b65] text-white' 
                : 'bg-[#f8f7fc] text-[#8290a4] hover:bg-slate-100'
            }`}
            data-testid="explorer-grid-view-button"
            aria-label="Grid view"
            title="Grid view"
          >
            <LayoutGrid size={17} />
          </button>
          
          <button
            onClick={() => setViewMode('list')}
            className={`grid size-12 place-items-center rounded-xl transition ${
              viewMode === 'list' 
                ? 'bg-[#172b65] text-white' 
                : 'bg-[#f8f7fc] text-[#8290a4] hover:bg-slate-100'
            }`}
            data-testid="explorer-list-view-button"
            aria-label="List view"
            title="List view"
          >
            <List size={17} />
          </button>
        </div>
      </div>

      {/* Category Filter Chips Bar */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
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
      <div className="mb-4 flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
        <span>Found {filteredMoments.length} moments</span>
        {selectedCategory !== 'All' && <span>Category: {selectedCategory}</span>}
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="explorer-grid">
          {filteredMoments.slice(0, 48).map((m, idx) => (
            <article
              key={m.id}
              onClick={() => onSelectMoment && onSelectMoment(m)}
              className="group cursor-pointer overflow-hidden rounded-[26px] bg-white ring-1 ring-[#ece9f3] shadow-[0_4px_25px_rgba(45,31,63,0.03)] hover:shadow-xl hover:ring-[#5269dd]/30 transition-all flex flex-col justify-between"
              data-testid={`explorer-moment-${idx + 1}`}
            >
              <div>
                {/* Photo / Card Header */}
                {m.image ? (
                  <div 
                    className="relative h-44 w-full bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `url(${m.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-white text-xs">
                      <span className="font-bold px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md">
                        {m.kind}
                      </span>
                      <span className="font-semibold text-[11px] opacity-90">
                        {m.date}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="h-28 w-full p-4 flex flex-col justify-between"
                    style={{ backgroundColor: m.color || '#f5eefc' }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{m.icon}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/60 text-slate-700 uppercase">
                        {m.kind}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{m.date}</span>
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading text-lg font-bold text-[#2d1f3f] group-hover:text-[#5269dd] transition leading-snug">
                      {m.title}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase flex-shrink-0">
                      {m.mood}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    {m.subtitle}
                  </p>

                  {m.story && (
                    <p className="mt-3 text-xs text-[#6f6782] line-clamp-2 leading-relaxed">
                      "{m.story}"
                    </p>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                {m.amount && parseFloat(m.amount) > 0 ? (
                  <span className="font-bold text-slate-900">
                    ₹{parseFloat(m.amount).toLocaleString('en-IN')}
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium">
                    {m.time}
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleSaveToJournal(e, m)}
                    className="p-2 rounded-xl text-slate-400 hover:text-[#172b65] hover:bg-slate-100 transition"
                    title="Save to Journal"
                  >
                    <BookmarkPlus size={15} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenThermalSlip) onOpenThermalSlip(m);
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-[#172b65] hover:bg-slate-100 transition"
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
        <div className="divide-y divide-slate-100 rounded-[24px] bg-white ring-1 ring-[#ece9f3] overflow-hidden shadow-sm">
          {filteredMoments.slice(0, 50).map((m, idx) => (
            <div
              key={m.id}
              onClick={() => onSelectMoment && onSelectMoment(m)}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 hover:bg-[#faf9fd] transition cursor-pointer gap-3"
            >
              <div className="flex items-center gap-3">
                <span 
                  className="size-9 grid place-items-center rounded-xl text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: m.color || '#e9e4ff' }}
                >
                  {m.icon || '✦'}
                </span>
                <div>
                  <h4 className="font-heading text-sm font-bold text-[#2d1f3f]">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {m.subtitle} · <span className="text-slate-400">{m.date}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs ml-12 sm:ml-0">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold uppercase text-[10px]">
                  {m.mood}
                </span>

                {m.amount && parseFloat(m.amount) > 0 && (
                  <span className="font-bold text-slate-800 min-w-[70px] text-right">
                    ₹{parseFloat(m.amount).toLocaleString('en-IN')}
                  </span>
                )}

                <button
                  onClick={(e) => handleSaveToJournal(e, m)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#172b65] hover:bg-slate-200 transition"
                  title="Save to Journal"
                >
                  <BookmarkPlus size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
