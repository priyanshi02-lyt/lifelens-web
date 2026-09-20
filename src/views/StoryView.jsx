import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  Compass, 
  Music, 
  Coffee, 
  Calendar,
  CheckCircle2,
  Receipt
} from 'lucide-react';
import PageIntro from '../components/PageIntro';

export default function StoryView({ chapters, moments, onSelectMoment, onOpenThermalSlip }) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(1); // Default to Chapter 2 like reference site

  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  // Connected moments for this chapter
  const chapterMoments = moments.filter(m => m.chapterId === currentChapter.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-6 sm:px-8 lg:py-10 pb-24 md:pb-12">
      
      {/* Page Intro */}
      <PageIntro
        eyebrow={`${currentChapter.number} · ${currentChapter.timeframe}`}
        title={currentChapter.title}
        description={currentChapter.tagline}
        action={
          <Link to="/explore" className="secondary-button" data-testid="story-back-explorer-link">
            <Compass size={16} className="text-[#5269dd]" />
            <span>Explore Moments</span>
          </Link>
        }
      />

      {/* Main Story Layout */}
      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        
        {/* Main Chapter Narrative Card */}
        <article 
          className="overflow-hidden rounded-[32px] bg-white ring-1 ring-[#ece9f3] shadow-[0_8px_30px_rgba(45,31,63,0.04)]"
          data-testid="story-chapter-card"
        >
          {/* Photo Banner with Gradient Overlay */}
          <div 
            className="relative h-[280px] sm:h-[360px] bg-cover bg-center"
            style={{ 
              backgroundImage: `linear-gradient(0deg, rgba(23,43,101,0.72) 0%, rgba(23,43,101,0.2) 60%, transparent 100%), url(${currentChapter.heroImage})` 
            }}
          >
            <div className="absolute bottom-6 left-6 sm:left-10 right-6 text-white">
              <div className="eyebrow text-[#d8ddff] mb-2" data-testid="story-chapter-eyebrow">
                <Sparkles size={14} />
                <span>A CONNECTED STORY</span>
              </div>
              <h2 
                className="max-w-xl font-heading text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight"
                data-testid="story-chapter-heading"
              >
                "{currentChapter.quote}"
              </h2>
            </div>
          </div>

          {/* Narrative Body */}
          <div className="p-6 sm:p-10 space-y-6">
            <p className="font-heading text-xl sm:text-2xl text-[#3f3154] leading-relaxed">
              Every Friday night train ticket, late-night code deployment, and pharmacy receipt tells a chapter of quiet resilience.
            </p>

            <div className="text-sm sm:text-base text-[#6f6782] space-y-4 leading-relaxed">
              <p>
                Looking back across this season, the data reveals an unmistakable rhythm: you weren't merely paying for transportation, hardware tools, or medical supplies. You were building the scaffolding of your future.
              </p>
              <p>
                In <strong>{currentChapter.timeframe}</strong>, your world expanded. The soundtrack shifted into focus, the destinations became intentional, and every financial commitment was an act of personal agency.
              </p>
            </div>

            {/* Connected Moments Chain */}
            <div className="pt-8 border-t border-slate-100">
              <div className="eyebrow text-[#5269dd] mb-4">
                <Sparkles size={14} />
                <span>CONNECTED THREAD DISCOVERED</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {chapterMoments.map((m, idx) => (
                  <div
                    key={m.id}
                    onClick={() => onSelectMoment && onSelectMoment(m)}
                    className="p-4 rounded-2xl bg-[#faf9fd] border border-slate-100 hover:border-[#5269dd]/40 hover:bg-white transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="size-6 grid place-items-center rounded-lg bg-white text-xs shadow-sm">
                        {m.icon || '✦'}
                      </span>
                      <span className="text-[10px] font-bold text-[#5269dd] uppercase">
                        {m.kind} · {m.date}
                      </span>
                    </div>
                    <h4 className="font-heading text-sm font-bold text-[#2d1f3f] group-hover:text-[#5269dd] transition leading-snug">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {m.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chapter Navigation Footer */}
            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
              <button
                disabled={activeChapterIndex === 0}
                onClick={() => setActiveChapterIndex(Math.max(0, activeChapterIndex - 1))}
                className="secondary-button disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={15} />
                <span>Previous Chapter</span>
              </button>

              <button
                disabled={activeChapterIndex === chapters.length - 1}
                onClick={() => setActiveChapterIndex(Math.min(chapters.length - 1, activeChapterIndex + 1))}
                className="primary-button disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Next Chapter</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </article>

        {/* Right Sidebar: Chapter Selector & Reflection */}
        <aside className="space-y-6">
          
          {/* Chapter Selector Card */}
          <div className="rounded-[28px] bg-white p-6 sm:p-7 ring-1 ring-[#ece9f3] shadow-sm">
            <span className="eyebrow text-[#5269dd]">CHAPTER SELECTOR</span>
            <h3 className="font-heading text-xl font-bold text-[#2d1f3f] mt-1 mb-4">
              All 4 Life Chapters
            </h3>

            <div className="space-y-3">
              {chapters.map((ch, idx) => (
                <div
                  key={ch.id}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition border ${
                    activeChapterIndex === idx 
                      ? 'bg-[#eef0ff] border-[#5269dd]/50 shadow-sm' 
                      : 'bg-[#faf9fd] border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-[#5269dd] uppercase">{ch.number}</span>
                    <span className="text-[11px] font-semibold text-slate-400">{ch.timeframe}</span>
                  </div>
                  <h4 className="font-heading text-sm font-bold text-[#2d1f3f]">
                    {ch.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {ch.tagline}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter Metrics Badge */}
          <div className="rounded-[28px] bg-gradient-to-br from-[#f8f9ff] to-[#f4f2ff] p-6 ring-1 ring-[#e4e0f2]">
            <span className="eyebrow text-[#00c48c]">CHAPTER TELEMETRY</span>
            <h4 className="font-heading text-lg font-bold text-[#2d1f3f] mt-1 mb-4">
              Key Metrics
            </h4>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white/80 p-3 rounded-xl shadow-xs">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Moments</div>
                <div className="font-heading text-xl font-bold text-[#172b65]">
                  {currentChapter.metrics.transactions}
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-xl shadow-xs">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Total Lived Value</div>
                <div className="font-heading text-lg font-bold text-[#5269dd]">
                  {currentChapter.metrics.spent}
                </div>
              </div>
            </div>

            <div className="mt-3 bg-white/80 p-3 rounded-xl text-xs space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Signature Track</div>
              <div className="font-semibold text-slate-700 truncate">
                {currentChapter.metrics.topSong}
              </div>
            </div>

            {onOpenThermalSlip && (
              <button
                onClick={() => onOpenThermalSlip()}
                className="mt-4 primary-button w-full text-xs justify-center"
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
