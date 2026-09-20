import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import PageIntro from '../components/PageIntro';

const CATEGORIES = ['All', 'Music', 'Places', 'Movies', 'Purchases', 'Photos', 'Messages', 'Searches', 'Events', 'Notes'];

export default function TimelineView({ moments, chapters, onSelectMoment }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedChapter, setSelectedChapter] = useState('all');

  // Filter moments
  const filteredMoments = moments.filter(m => {
    const matchesCat = selectedCategory === 'All' || m.kind === selectedCategory;
    const matchesChap = selectedChapter === 'all' || m.chapterId === selectedChapter;
    return matchesCat && matchesChap;
  });

  return (
    <div className="mx-auto max-w-[1240px] px-3.5 py-5 sm:px-8 lg:py-10 pb-28 md:pb-12 w-full max-w-full overflow-hidden">
      
      {/* Page Intro */}
      <PageIntro
        eyebrow="Your digital journey"
        title="Your Timeline"
        description="A chronological view of the little moments that made up your world."
        action={
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">
              Showing {filteredMoments.length} moments
            </span>
          </div>
        }
      />

      {/* Chapter Selection Tabs */}
      <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1.5 border-b border-slate-200 scrollbar-none w-full max-w-full">
        <button
          onClick={() => setSelectedChapter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex-shrink-0 ${
            selectedChapter === 'all' 
              ? 'bg-[#172b65] text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span className="sm:hidden">All</span>
          <span className="hidden sm:inline">All Chapters</span>
        </button>
        {chapters.map(ch => (
          <button
            key={ch.id}
            onClick={() => setSelectedChapter(ch.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex-shrink-0 ${
              selectedChapter === ch.id 
                ? 'bg-[#172b65] text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="sm:hidden">{ch.number}</span>
            <span className="hidden sm:inline">{ch.number} · {ch.title}</span>
          </button>
        ))}
      </div>

      {/* Category Filter Chips Bar */}
      <div className="mb-6 flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none w-full max-w-full" data-testid="timeline-category-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`filter-chip ${selectedCategory === cat ? 'filter-chip-active' : ''}`}
            data-testid={`timeline-filter-${cat.toLowerCase()}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline Layout */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] min-w-0">
        
        {/* Left Side: Chronological Moments Feed */}
        <section className="relative min-w-0" data-testid="timeline-list">
          {/* Vertical line running down on desktop */}
          <div className="hidden sm:block absolute bottom-4 left-[110px] top-4 w-px bg-[#dcdcf0]"></div>

          <div className="space-y-4 sm:space-y-6">
            {filteredMoments.slice(0, 40).map((m, idx) => (
              <div
                key={m.id}
                onClick={() => onSelectMoment && onSelectMoment(m)}
                className="group relative flex flex-col sm:grid sm:grid-cols-[96px_28px_1fr] sm:gap-4 items-start cursor-pointer w-full"
                data-testid={`timeline-moment-${idx + 1}`}
              >
                {/* Desktop Left Timestamp */}
                <div className="hidden sm:block pt-2 text-right">
                  <div className="text-[11px] font-bold text-[#2d1f3f]">{m.date}</div>
                  <div className="text-[10px] text-slate-400">{m.time}</div>
                </div>

                {/* Central Connecting Node (Desktop) */}
                <div className="hidden sm:grid relative z-10 size-7 place-items-center rounded-full bg-white ring-4 ring-[#faf8fc] border-2 border-[#5269dd] group-hover:scale-110 group-hover:bg-[#5269dd] group-hover:text-white transition mt-1.5 flex-shrink-0">
                  <div className="size-2 rounded-full bg-[#5269dd] group-hover:bg-white transition"></div>
                </div>

                {/* Moment Card Box (Full Width on Mobile) */}
                <div className="rounded-[20px] sm:rounded-[22px] bg-white p-4 sm:p-5 ring-1 ring-[#ece9f3] shadow-xs group-hover:shadow-md group-hover:border-[#5269dd]/40 transition w-full min-w-0">
                  
                  {/* Mobile Top Date Header */}
                  <div className="flex sm:hidden items-center justify-between text-[11px] font-bold text-slate-400 pb-2 mb-2 border-b border-slate-100">
                    <span className="text-[#5269dd]">{m.date}</span>
                    <span>{m.time}</span>
                  </div>

                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      <span 
                        className="size-8 sm:size-9 grid place-items-center rounded-xl text-xs font-bold flex-shrink-0 shadow-xs"
                        style={{ backgroundColor: m.color || '#e9e4ff' }}
                      >
                        {m.icon || '✦'}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-heading text-sm sm:text-base font-bold text-[#2d1f3f] group-hover:text-[#5269dd] transition leading-snug">
                          {m.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5 truncate">
                          {m.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase flex-shrink-0">
                      {m.mood}
                    </span>
                  </div>

                  {m.story && (
                    <p className="mt-2.5 text-xs text-[#6f6782] leading-relaxed border-t border-slate-50 pt-2">
                      "{m.story}"
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#5269dd] font-semibold pt-1">
                    <span>{m.kind} · {m.mode || 'Digital'}</span>
                    <span className="group-hover:translate-x-1 transition flex items-center gap-1 text-xs">
                      Details <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Side: Chapter Narrative Sidebar */}
        <aside className="space-y-6 hidden lg:block">
          <div className="sticky top-24 rounded-[28px] bg-white p-6 ring-1 ring-[#ece9f3] shadow-sm space-y-4">
            <div className="eyebrow text-[#5269dd]">
              <BookOpen size={14} />
              <span>THE CHAPTERS</span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-[#2d1f3f]">
              Biographical Context
            </h3>

            <p className="text-xs text-[#6f6782] leading-relaxed">
              Every point on this timeline represents an emotional breadcrumb from 2015 to 2018, connecting financial decisions with personal milestones.
            </p>

            <div className="space-y-2.5 pt-2">
              {chapters.map(ch => (
                <div 
                  key={ch.id}
                  onClick={() => setSelectedChapter(ch.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition border ${
                    selectedChapter === ch.id 
                      ? 'bg-[#eef0ff] border-[#5269dd]/40 shadow-sm' 
                      : 'bg-[#faf9fd] border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-[#5269dd] uppercase">{ch.number} · {ch.timeframe}</span>
                      <h4 className="font-heading text-xs font-bold text-[#2d1f3f] mt-0.5">{ch.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">"{ch.quote}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
