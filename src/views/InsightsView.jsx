import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Music, 
  Compass, 
  Award,
  Smile
} from 'lucide-react';
import PageIntro from '../components/PageIntro';

const MOODS = [
  { label: 'Peaceful', value: 82, color: '#a8d9bd' },
  { label: 'Curious', value: 94, color: '#9da8f1' },
  { label: 'Hopeful', value: 76, color: '#f5c59d' },
  { label: 'Nostalgic', value: 61, color: '#c7b7e8' },
  { label: 'Energised', value: 72, color: '#f2b7c5' },
  { label: 'Gentle', value: 52, color: '#b5d6e5' },
];

export default function InsightsView() {
  return (
    <div className="mx-auto max-w-[1240px] px-3.5 py-5 sm:px-8 lg:py-10 pb-28 md:pb-12 w-full max-w-full overflow-hidden">
      
      {/* Page Intro */}
      <PageIntro
        eyebrow="Look a little closer"
        title="Connections & insights"
        description="Patterns are not rules. They are invitations to understand yourself with more kindness."
        action={
          <Link to="/story" className="secondary-button !py-2 !px-3.5 text-xs sm:text-sm" data-testid="insights-story-link">
            <Sparkles size={15} className="text-[#5269dd]" />
            <span>Read your story</span>
          </Link>
        }
      />

      {/* Grid Layout */}
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-3 min-w-0">
        
        {/* Left 2 Cols: Mood Landscape + Meaningful Patterns */}
        <div className="space-y-5 sm:space-y-6 lg:col-span-2 min-w-0">
          
          {/* Mood Landscape Card */}
          <div 
            className="rounded-[24px] sm:rounded-[28px] bg-white p-5 sm:p-8 ring-1 ring-[#ece9f3] shadow-xs"
            data-testid="insights-mood-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="eyebrow" data-testid="insights-mood-eyebrow">
                  YOUR MOOD LANDSCAPE
                </div>
                <h2 className="mt-1.5 font-heading text-xl sm:text-3xl font-bold text-[#2d1f3f]" data-testid="insights-mood-title">
                  Mostly curious, gently hopeful.
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#6f6782]">
                  Emotional resonance derived across 600+ lived moments (2015–2018).
                </p>
              </div>

              <div className="grid size-9 sm:size-11 place-items-center rounded-2xl bg-[#e7f4eb] text-[#4b9a6c] flex-shrink-0">
                <Smile size={20} />
              </div>
            </div>

            {/* Bar Chart (Fully Responsive on Mobile) */}
            <div className="mt-8 flex h-[160px] sm:h-[200px] items-end justify-between gap-1.5 sm:gap-5 border-b border-slate-100 pb-3">
              {MOODS.map(m => (
                <div key={m.label} className="flex flex-1 flex-col items-center gap-1.5 h-full justify-end group min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#5269dd] transition opacity-0 group-hover:opacity-100">
                    {m.value}%
                  </span>
                  <div 
                    className="w-full max-w-[42px] rounded-t-lg sm:rounded-t-xl transition-all duration-700 hover:brightness-95 group-hover:scale-105"
                    style={{ 
                      height: `${m.value}%`, 
                      backgroundColor: m.color 
                    }}
                  />
                  <span className="text-[9px] sm:text-[11px] font-bold text-[#2d1f3f] mt-1 text-center truncate w-full">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-between text-[11px] text-slate-400">
              <span>Calm & Receptive</span>
              <span>Active & Driven</span>
            </div>
          </div>

          {/* 3 Meaningful Patterns */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-white p-5 sm:p-8 ring-1 ring-[#ece9f3] shadow-xs">
            <div className="eyebrow text-[#5269dd]">
              <Sparkles size={13} />
              <span>DISCOVERED PATTERNS</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#2d1f3f] mt-1 mb-5">
              3 Meaningful Life Causations
            </h3>

            <div className="space-y-3.5">
              
              {/* Pattern 1 */}
              <div className="rounded-2xl border border-slate-100 bg-[#faf9fd] p-4 sm:p-5 hover:border-[#5269dd]/30 transition">
                <div className="flex items-start gap-3">
                  <span className="size-8 sm:size-10 grid place-items-center rounded-xl bg-[#eef0ff] text-[#5269dd] font-bold text-xs sm:text-sm flex-shrink-0">
                    01
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-heading text-sm sm:text-base font-bold text-[#2d1f3f]">
                      The 2 AM Music Paradox (Work & Solitude)
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#6f6782] leading-relaxed">
                      Late-night instrumental streams (Daft Punk, Ludovico Einaudi) peaked before major career milestone weeks.
                    </p>
                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#5269dd]">
                      <Music size={12} />
                      <span className="truncate">Correlation: Electronic beats $\leftrightarrow$ Tech milestones</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pattern 2 */}
              <div className="rounded-2xl border border-slate-100 bg-[#faf9fd] p-4 sm:p-5 hover:border-[#5269dd]/30 transition">
                <div className="flex items-start gap-3">
                  <span className="size-8 sm:size-10 grid place-items-center rounded-xl bg-[#dff6ee] text-[#00c48c] font-bold text-xs sm:text-sm flex-shrink-0">
                    02
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-heading text-sm sm:text-base font-bold text-[#2d1f3f]">
                      The Commute Anchor & Filial Duty
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#6f6782] leading-relaxed">
                      Friday night train tickets consistently coincided with mobile recharges for family members and platform tea.
                    </p>
                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#00c48c]">
                      <Compass size={12} />
                      <span className="truncate">Correlation: Night sleeper train $\leftrightarrow$ Family gifts</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pattern 3 */}
              <div className="rounded-2xl border border-slate-100 bg-[#faf9fd] p-4 sm:p-5 hover:border-[#5269dd]/30 transition">
                <div className="flex items-start gap-3">
                  <span className="size-8 sm:size-10 grid place-items-center rounded-xl bg-[#ffe8f0] text-[#ff4081] font-bold text-xs sm:text-sm flex-shrink-0">
                    03
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-heading text-sm sm:text-base font-bold text-[#2d1f3f]">
                      Physical Endurance Precedes Financial Harvest
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#6f6782] leading-relaxed">
                      10K marathon training directly preceded highest recorded salary compensations and first stock dividend receipts.
                    </p>
                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#ff4081]">
                      <Award size={12} />
                      <span className="truncate">Correlation: 10K Finish $\leftrightarrow$ Stock market dividends</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Circadian Rhythm & Activity Distribution */}
        <div className="space-y-5 sm:space-y-6 min-w-0">
          
          {/* Circadian 24-Hour Activity Peak */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-white p-5 sm:p-7 ring-1 ring-[#ece9f3] shadow-xs">
            <div className="eyebrow text-[#ff9800]">
              <Clock size={13} />
              <span>CIRCADIAN INTELLIGENCE</span>
            </div>

            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2d1f3f] mt-1">
              Time-of-Day Rhythms
            </h3>

            <p className="text-xs text-[#6f6782] mt-1 mb-4">
              When your digital and financial life was most active:
            </p>

            <div className="space-y-3">
              {[
                { time: 'Late Night (12 AM - 3 AM)', label: 'Study & Music Sprint', pct: 28, color: '#9da8f1' },
                { time: 'Morning (7 AM - 11 AM)', label: 'Chai & Daily Sustenance', pct: 22, color: '#a8d9bd' },
                { time: 'Afternoon (12 PM - 5 PM)', label: 'Errands & Health Visits', pct: 18, color: '#f5c59d' },
                { time: 'Evening (6 PM - 11 PM)', label: 'Commute & Travel Plans', pct: 32, color: '#c7b7e8' },
              ].map(slot => (
                <div key={slot.time} className="space-y-1">
                  <div className="flex justify-between text-[11px] sm:text-xs font-semibold text-slate-700">
                    <span>{slot.time}</span>
                    <span className="text-slate-400">{slot.pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${slot.pct * 2.5}%`, backgroundColor: slot.color }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block">{slot.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Life Domain Distribution */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#f2f4ff] to-[#fcfaff] p-5 sm:p-7 ring-1 ring-[#e0e4f5]">
            <span className="eyebrow text-[#5269dd]">DOMAIN BALANCING</span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2d1f3f] mt-1 mb-3">
              Life Categories
            </h3>

            <div className="space-y-2.5">
              {[
                { domain: 'Purchases & Food', pct: 45, count: '280+' },
                { domain: 'Places & Commute', pct: 22, count: '95+' },
                { domain: 'Music (Spotify)', pct: 18, count: '75+' },
                { domain: 'Movies & Culture', pct: 10, count: '40+' },
                { domain: 'Health & Wellness', pct: 5, count: '25+' },
              ].map(d => (
                <div key={d.domain} className="flex justify-between items-center text-xs py-1 border-b border-white/60">
                  <span className="font-bold text-slate-700">{d.domain}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">{d.count}</span>
                    <span className="font-bold text-[#5269dd]">{d.pct}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-200/60 text-center">
              <Link to="/timeline" className="primary-button text-xs w-full justify-center !py-2.5">
                <span>View All In Timeline</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
