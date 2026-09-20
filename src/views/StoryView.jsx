import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Compass, 
  Receipt
} from 'lucide-react';
import PageIntro from '../components/PageIntro';

export default function StoryView({ chapters, moments, onSelectMoment, onOpenThermalSlip }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(1);

  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  // Connected moments for this chapter
  const chapterMoments = moments.filter(m => m.chapterId === currentChapter.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1240px] px-3.5 py-5 sm:px-8 lg:py-10 pb-28 md:pb-12 w-full max-w-full overflow-hidden">
      
      {/* Page Intro */}
      <PageIntro
        eyebrow={`${currentChapter.number} · ${currentChapter.timeframe}`}
        title={currentChapter.title}
        description={currentChapter.tagline}
        action={
          <Link to="/explore" className="secondary-button !py-2 !px-3.5 text-xs sm:text-sm" data-testid="story-back-explorer-link">
            <Compass size={15} className="text-[#5269dd]" />
            <span>Explore Moments</span>
          </Link>
        }
      />

      {/* Main Story Layout */}
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] min-w-0">
        
        {/* Main Chapter Narrative Card */}
        <article 
          className="overflow-hidden rounded-[26px] sm:rounded-[32px] bg-white ring-1 ring-[#ece9f3] shadow-xs min-w-0"
          data-testid="story-chapter-card"
        >
          {/* Photo Banner with Gradient Overlay */}
          <div 
            className="relative h-[220px] sm:h-[340px] bg-cover bg-center"
            style={{ 
              backgroundImage: `linear-gradient(0deg, rgba(23,43,101,0.76) 0%, rgba(23,43,101,0.2) 65%, transparent 100%), url(${currentChapter.heroImage})` 
            }}
          >
            <div className="absolute bottom-5 left-5 sm:left-10 right-5 text-white">
              <div className="eyebrow text-[#d8ddff] mb-1.5" data-testid="story-chapter-eyebrow">
                <Sparkles size={13} />
                <span>A CONNECTED STORY</span>
              </div>
              <h2 
                className="max-w-xl font-heading text-lg sm:text-3xl font-bold tracking-tight text-white leading-tight"
                data-testid="story-chapter-heading"
              >
                "{currentChapter.quote}"
              </h2>
            </div>
          </div>

          {/* Narrative Body */}
          <div className="p-5 sm:p-10 space-y-5">
            <p className="font-heading text-lg sm:text-2xl text-[#3f3154] leading-relaxed">
              Every Friday night train ticket, late-night code deployment, and pharmacy receipt tells a chapter of quiet resilience.
            </p>

            <div className="text-xs sm:text-base text-[#6f6782] space-y-3 leading-relaxed">
              <p>
                Looking back across this season, the data reveals an unmistakable rhythm: you weren't merely paying for transportation, hardware tools, or medical supplies. You were building the scaffolding of your future.
              </p>
              <p>
                In <strong>{currentChapter.timeframe}</strong>, your world expanded. The soundtrack shifted into focus, the destinations became intentional, and every financial commitment was an act of personal agency.
              </p>
            </div>

            {/* Connected Moments Chain */}
            <div className="pt-6 border-t border-slate-100">
              <div className="eyebrow text-[#5269dd] mb-3">
                <Sparkles size={13} />
                <span>CONNECTED THREAD DISCOVERED</span>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                {chapterMoments.map((m, idx) => (
                  <div
                    key={m.id}
                    onClick={() => onSelectMoment && onSelectMoment(m)}
                    className="p-3.5 rounded-2xl bg-[#faf9fd] border border-slate-100 hover:border-[#5269dd]/40 hover:bg-white transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="size-6 grid place-items-center rounded-lg bg-white text-xs shadow-xs">
                        {m.icon || '✦'}
                      </span>
                      <span className="text-[9px] font-bold text-[#5269dd] uppercase">
                        {m.kind} · {m.date}
                      </span>
                    </div>
                    <h4 className="font-heading text-xs sm:text-sm font-bold text-[#2d1f3f] group-hover:text-[#5269dd] transition leading-snug truncate">
                      {m.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {m.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chapter Navigation Footer (Stacks on Mobile) */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                disabled={activeChapterIndex === 0}
                onClick={() => setActiveChapterIndex(Math.max(0, activeChapterIndex - 1))}
                className="secondary-button disabled:opacity-40 disabled:cursor-not-allowed justify-center text-xs"
              >
                <ArrowLeft size={14} />
                <span>Previous Chapter</span>
              </button>

              <button
                disabled={activeChapterIndex === chapters.length - 1}
                onClick={() => setActiveChapterIndex(Math.min(chapters.length - 1, activeChapterIndex + 1))}
                className="primary-button disabled:opacity-40 disabled:cursor-not-allowed justify-center text-xs"
              >
                <span>Next Chapter</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </article>

        {/* Right Sidebar */}
        <aside className="space-y-5 min-w-0">
          
          {/* Chapter Selector Card */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-white p-5 sm:p-7 ring-1 ring-[#ece9f3] shadow-xs">
            <span className="eyebrow text-[#5269dd]">CHAPTER SELECTOR</span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2d1f3f] mt-1 mb-3">
              All 4 Life Chapters
            </h3>

            <div className="space-y-2.5">
              {chapters.map((ch, idx) => (
                <div
                  key={ch.id}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition border ${
                    activeChapterIndex === idx 
                      ? 'bg-[#eef0ff] border-[#5269dd]/50 shadow-xs' 
                      : 'bg-[#faf9fd] border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[9px] font-bold text-[#5269dd] uppercase">{ch.number}</span>
                    <span className="text-[10px] font-semibold text-slate-400">{ch.timeframe}</span>
                  </div>
                  <h4 className="font-heading text-xs sm:text-sm font-bold text-[#2d1f3f] truncate">
                    {ch.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {ch.tagline}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter Metrics Badge */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#f8f9ff] to-[#f4f2ff] p-5 sm:p-6 ring-1 ring-[#e4e0f2]">
            <span className="eyebrow text-[#00c48c]">CHAPTER TELEMETRY</span>
            <h4 className="font-heading text-base sm:text-lg font-bold text-[#2d1f3f] mt-1 mb-3">
              Key Metrics
            </h4>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-white/90 p-2.5 rounded-xl shadow-xs">
                <div className="text-[9px] text-slate-400 uppercase font-bold">Moments</div>
                <div className="font-heading text-base sm:text-lg font-bold text-[#172b65]">
                  {currentChapter.metrics.transactions}
                </div>
              </div>

              <div className="bg-white/90 p-2.5 rounded-xl shadow-xs">
                <div className="text-[9px] text-slate-400 uppercase font-bold">Total Spent</div>
                <div className="font-heading text-base sm:text-lg font-bold text-[#5269dd]">
                  {currentChapter.metrics.spent}
                </div>
              </div>
            </div>

            <div className="mt-2.5 bg-white/90 p-2.5 rounded-xl text-xs space-y-0.5">
              <div className="text-[9px] text-slate-400 uppercase font-bold">Signature Track</div>
              <div className="font-semibold text-slate-700 text-xs truncate">
                {currentChapter.metrics.topSong}
              </div>
            </div>

            {onOpenThermalSlip && (
              <button
                onClick={() => onOpenThermalSlip()}
                className="mt-3.5 primary-button w-full text-xs justify-center !py-2.5"
              >
                <Receipt size={14} />
                <span>Print Chapter Thermal Slip</span>
              </button>
            )}
          </div>

        </aside>

      </div>
    </div>
  );
}
