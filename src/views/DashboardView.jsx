import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Send,
  CheckCircle2,
  Receipt
} from 'lucide-react';
import PageIntro from '../components/PageIntro';

export default function DashboardView({ moments, chapters, onSelectMoment, onOpenThermalSlip }) {
  const [reflectionText, setReflectionText] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Take the most recent 6 moments
  const recentMoments = moments.slice(0, 6);

  const handleSaveReflection = (e) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    
    // Store in localStorage
    const saved = JSON.parse(localStorage.getItem('lifelens-journal-imports') || '[]');
    const newEntry = {
      title: reflectionText,
      date: 'Today',
      color: '#fff1cf',
      rotate: '1deg',
      sourceId: 'reflection-' + Date.now()
    };
    localStorage.setItem('lifelens-journal-imports', JSON.stringify([newEntry, ...saved]));
    setReflectionSaved(true);
    setReflectionText('');
    setTimeout(() => setReflectionSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-[1240px] px-3.5 py-5 sm:px-8 lg:py-10 pb-28 md:pb-12 w-full max-w-full overflow-hidden">
      
      {/* 1. Page Header Intro */}
      <PageIntro
        eyebrow="Tuesday, 12 March 2024"
        title="Hi there, Aanya!"
        description="Ready to explore the story hidden inside your everyday moments?"
        action={
          <button 
            className="secondary-button !py-2 !px-3.5 text-xs sm:text-sm"
            onClick={() => {
              const el = document.getElementById('reflection-card');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            data-testid="dashboard-reflection-button"
          >
            <Sparkles size={15} className="text-[#5269dd]" />
            <span>Reflect today</span>
          </button>
        }
      />

      {/* 2. Main Dashboard Grid */}
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.6fr_1fr] min-w-0">
        
        {/* Left Column: Visualised Card + Recent Moments */}
        <div className="space-y-5 sm:space-y-6 min-w-0">
          
          {/* Hero "Your life, visualised" Card with CSS Landscape Graphics */}
          <section 
            className="relative overflow-hidden rounded-[26px] sm:rounded-[30px] bg-gradient-to-br from-[#eef0ff] via-[#e8f3ff] to-[#f4f7ff] p-5 sm:p-9 ring-1 ring-[#dce3f8]"
            data-testid="dashboard-visualised-card"
          >
            <div className="relative z-10 max-w-[320px]">
              <div className="eyebrow" data-testid="dashboard-visualised-eyebrow">
                <Sparkles size={13} />
                <span>A new perspective</span>
              </div>
              
              <h2 
                className="mt-2.5 font-heading text-2xl sm:text-4xl font-bold leading-tight tracking-[-0.04em] text-[#2d1f3f]"
                data-testid="dashboard-visualised-title"
              >
                Your life, <br />
                <span className="text-[#5269dd]">visualised.</span>
              </h2>

              <p 
                className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#667085]"
                data-testid="dashboard-visualised-copy"
              >
                Connected moments become a meaningful story. 600+ real memories organized into 4 chapters.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link 
                  to="/timeline"
                  className="primary-button text-xs sm:text-sm !py-2.5 !px-4"
                  data-testid="dashboard-explore-timeline-button"
                >
                  <span>Explore Timeline</span>
                  <ArrowRight size={14} />
                </Link>

                {onOpenThermalSlip && (
                  <button
                    onClick={() => onOpenThermalSlip()}
                    className="secondary-button !bg-white/90 text-xs sm:text-sm !py-2.5 !px-3.5"
                    title="Print Overall Life Summary Thermal Slip"
                  >
                    <Receipt size={14} />
                    <span>Summary Slip</span>
                  </button>
                )}
              </div>
            </div>

            {/* Landscape Artwork */}
            <div className="dashboard-landscape">
              <div className="landscape-sun"></div>
              <div className="landscape-mountain landscape-mountain-back"></div>
              <div className="landscape-mountain landscape-mountain-front"></div>
              <div className="landscape-river"></div>
            </div>
          </section>

          {/* Recent Moments Feed */}
          <section className="rounded-[26px] sm:rounded-[30px] bg-white p-5 sm:p-8 ring-1 ring-[#ece9f3] shadow-xs" data-testid="dashboard-recent-section">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="eyebrow text-slate-400" data-testid="dashboard-recent-eyebrow">
                  RECENT MOMENTS
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2d1f3f] mt-1" data-testid="dashboard-recent-title">
                  Fresh chapters unfolding
                </h3>
              </div>
              <Link to="/explore" className="text-xs font-bold text-[#5269dd] hover:underline flex items-center gap-1">
                <span>View all</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {recentMoments.map((m, idx) => (
                <div
                  key={m.id}
                  onClick={() => onSelectMoment && onSelectMoment(m)}
                  className="group relative cursor-pointer rounded-2xl border border-slate-100 bg-[#faf9fd] p-3.5 sm:p-4 transition-all hover:bg-white hover:shadow-md hover:border-[#5269dd]/30"
                  data-testid={`dashboard-moment-${idx + 1}`}
                >
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      <span 
                        className="grid size-9 sm:size-10 flex-shrink-0 place-items-center rounded-xl text-xs sm:text-sm font-bold shadow-xs"
                        style={{ backgroundColor: m.color || '#e9e4ff' }}
                      >
                        {m.icon || '✦'}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-heading text-xs sm:text-sm font-bold text-[#2d1f3f] group-hover:text-[#5269dd] transition leading-snug truncate">
                          {m.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
                          {m.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase flex-shrink-0">
                      {m.mood}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                    <span>{m.date}</span>
                    <span>{m.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Daily Reflection + Mood Landscape */}
        <div className="space-y-5 sm:space-y-6 min-w-0">
          
          {/* Daily Reflection Card */}
          <div 
            id="reflection-card"
            className="rounded-[26px] sm:rounded-[30px] bg-white p-5 sm:p-7 ring-1 ring-[#ece9f3] shadow-xs"
            data-testid="dashboard-reflection-card"
          >
            <div className="eyebrow text-[#00c48c]">
              <Sparkles size={13} />
              <span>DAILY REFLECTION</span>
            </div>

            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2d1f3f] mt-1.5">
              A gentle prompt
            </h3>
            
            <p className="mt-1.5 text-xs sm:text-sm text-[#6f6782] leading-relaxed">
              "What was the smallest act of kindness or moment of stillness that grounded you today?"
            </p>

            <form onSubmit={handleSaveReflection} className="mt-3.5 space-y-3">
              <textarea
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="Leave yourself a note..."
                rows={3}
                className="w-full rounded-2xl bg-[#f8f7fc] p-3 text-xs sm:text-sm text-[#2d1f3f] placeholder-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#5269dd]/20 border border-slate-100 resize-none"
              />

              <div className="flex justify-between items-center">
                {reflectionSaved ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    <span>Saved to your journal</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    Saved locally
                  </span>
                )}

                <button 
                  type="submit" 
                  disabled={!reflectionText.trim()}
                  className="primary-button !py-2 !px-3.5 text-xs disabled:opacity-50"
                >
                  <Send size={13} />
                  <span>Save</span>
                </button>
              </div>
            </form>
          </div>

          {/* Mood Landscape Pill Box */}
          <div className="rounded-[26px] sm:rounded-[30px] bg-gradient-to-br from-[#fff7ec] to-[#fbf0ff] p-5 sm:p-7 ring-1 ring-[#f0e6f5]">
            <span className="eyebrow text-amber-700">EMOTIONAL HORIZON</span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2d1f3f] mt-1.5">
              Mostly curious, gently hopeful.
            </h3>
            <p className="mt-1.5 text-xs text-[#6f6782] leading-relaxed">
              Your recent moments show a balance between focused forward momentum and reflective calm.
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
              {[
                { mood: 'Nostalgic', count: 18, color: '#e9e4ff' },
                { mood: 'Curious', count: 24, color: '#e4edff' },
                { mood: 'Energised', count: 15, color: '#ffe8f0' },
                { mood: 'Peaceful', count: 22, color: '#dff6ee' },
                { mood: 'Hopeful', count: 19, color: '#fff1cf' },
              ].map((m) => (
                <span 
                  key={m.mood}
                  className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold text-slate-700 flex items-center gap-1 shadow-xs"
                  style={{ backgroundColor: m.color }}
                >
                  <span>{m.mood}</span>
                  <span className="text-[9px] opacity-70">({m.count})</span>
                </span>
              ))}
            </div>

            <div className="mt-5 pt-3.5 border-t border-amber-100 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-medium">Deep analysis</span>
              <Link to="/insights" className="text-xs font-bold text-[#5269dd] hover:underline flex items-center gap-1">
                <span>View Insights</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Quick Chapter Shortcuts */}
          <div className="rounded-[26px] sm:rounded-[30px] bg-white p-5 sm:p-7 ring-1 ring-[#ece9f3] shadow-xs">
            <span className="eyebrow text-[#5269dd]">LIFE CHAPTERS</span>
            <h3 className="font-heading text-base sm:text-lg font-bold text-[#2d1f3f] mt-1 mb-3">
              Your 4 Life Chapters
            </h3>

            <div className="space-y-2">
              {chapters.map((chap) => (
                <Link
                  key={chap.id}
                  to="/story"
                  className="flex items-center justify-between p-3 rounded-xl bg-[#faf9fd] hover:bg-[#eef0ff] transition group"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <span className="text-[9px] font-bold uppercase text-[#5269dd]">{chap.number} · {chap.timeframe}</span>
                    <h4 className="font-heading text-xs font-bold text-slate-800 group-hover:text-[#172b65] truncate">
                      {chap.title}
                    </h4>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-[#172b65] flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
