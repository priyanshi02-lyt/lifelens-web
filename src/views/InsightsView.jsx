import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Heart, 
  Music, 
  Coffee, 
  Compass, 
  Award,
  Zap,
  Smile
} from 'lucide-react';
import PageIntro from '../components/PageIntro';

const MOODS = [
  { label: 'Peaceful', value: 82, color: '#a8d9bd', count: '138 moments' },
  { label: 'Curious', value: 94, color: '#9da8f1', count: '162 moments' },
  { label: 'Hopeful', value: 76, color: '#f5c59d', count: '114 moments' },
  { label: 'Nostalgic', value: 61, color: '#c7b7e8', count: '89 moments' },
  { label: 'Energised', value: 72, color: '#f2b7c5', count: '98 moments' },
  { label: 'Gentle', value: 52, color: '#b5d6e5', count: '74 moments' },
];

export default function InsightsView() {
  return (
    <div className="mx-auto max-w-[1240px] px-4 py-6 sm:px-8 lg:py-10 pb-24 md:pb-12">
      
      {/* Page Intro */}
      <PageIntro
        eyebrow="Look a little closer"
        title="Connections & insights"
        description="Patterns are not rules. They are invitations to understand yourself with more kindness."
        action={
          <Link to="/story" className="secondary-button" data-testid="insights-story-link">
            <Sparkles size={16} className="text-[#5269dd]" />
            <span>Read your story</span>
          </Link>
        }
      />

      {/* Grid Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Left 2 Cols: Mood Landscape + Meaningful Patterns */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Mood Landscape Card */}
          <div 
            className="rounded-[28px] bg-white p-6 sm:p-8 ring-1 ring-[#ece9f3] shadow-[0_4px_25px_rgba(45,31,63,0.03)]"
            data-testid="insights-mood-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="eyebrow" data-testid="insights-mood-eyebrow">
                  YOUR MOOD LANDSCAPE
                </div>
                <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-[#2d1f3f]" data-testid="insights-mood-title">
                  Mostly curious, gently hopeful.
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#6f6782]">
                  Emotional resonance derived across 600+ lived moments (2015–2018).
                </p>
              </div>

              <div className="grid size-11 place-items-center rounded-2xl bg-[#e7f4eb] text-[#4b9a6c] flex-shrink-0">
                <Smile size={22} />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="mt-10 flex h-[200px] items-end justify-between gap-2 sm:gap-6 border-b border-slate-100 pb-4">
              {MOODS.map(m => (
                <div key={m.label} className="flex flex-1 flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-[#5269dd] transition opacity-0 group-hover:opacity-100">
                    {m.value}%
                  </span>
                  <div 
                    className="w-full max-w-[48px] rounded-t-xl transition-all duration-700 hover:brightness-95 group-hover:scale-105"
                    style={{ 
                      height: `${m.value}%`, 
                      backgroundColor: m.color 
                    }}
                  />
                  <span className="text-[11px] font-bold text-[#2d1f3f] mt-1 text-center truncate w-full">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between text-xs text-slate-400">
              <span>Calm & Receptive</span>
              <span>Active & Driven</span>
            </div>
          </div>

          {/* 3 Meaningful Patterns */}
          <div className="rounded-[28px] bg-white p-6 sm:p-8 ring-1 ring-[#ece9f3] shadow-[0_4px_25px_rgba(45,31,63,0.03)]">
            <div className="eyebrow text-[#5269dd]">
              <Sparkles size={14} />
              <span>DISCOVERED PATTERNS</span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-[#2d1f3f] mt-1 mb-6">
              3 Meaningful Life Causations
            </h3>

            <div className="space-y-4">
              
              {/* Pattern 1 */}
              <div className="rounded-2xl border border-slate-100 bg-[#faf9fd] p-5 hover:border-[#5269dd]/30 transition">
                <div className="flex items-start gap-3.5">
                  <span className="size-10 grid place-items-center rounded-xl bg-[#eef0ff] text-[#5269dd] font-bold text-sm flex-shrink-0">
                    01
                  </span>
                  <div>
                    <h4 className="font-heading text-base font-bold text-[#2d1f3f]">
                      The 2 AM Music Paradox (Work & Solitude)
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#6f6782] leading-relaxed">
                      Your Spotify logs show an unmistakable pattern: whenever you faced major career transitions (such as self-funded Edtech courses or system architecture sprints), late-night streams of instrumental & French house spiked between 1:30 AM and 3:00 AM.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#5269dd]">
                      <Music size={13} />
                      <span>Correlation: Daft Punk & Ludovico Einaudi $\leftrightarrow$ Tech milestones</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pattern 2 */}
              <div className="rounded-2xl border border-slate-100 bg-[#faf9fd] p-5 hover:border-[#5269dd]/30 transition">
                <div className="flex items-start gap-3.5">
                  <span className="size-10 grid place-items-center rounded-xl bg-[#dff6ee] text-[#00c48c] font-bold text-sm flex-shrink-0">
                    02
                  </span>
                  <div>
                    <h4 className="font-heading text-base font-bold text-[#2d1f3f]">
                      The Commute Anchor & Filial Duty
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#6f6782] leading-relaxed">
                      Friday night train bookings (Sevagram Express, Amritsar Express) consistently coincided with mobile recharges for family members and quiet platform tea purchases, demonstrating that geographic movement was motivated by deep familial ties.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#00c48c]">
                      <Compass size={13} />
                      <span>Correlation: Night sleeper train $\leftrightarrow$ Nokia 215 gift for mother</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pattern 3 */}
              <div className="rounded-2xl border border-slate-100 bg-[#faf9fd] p-5 hover:border-[#5269dd]/30 transition">
                <div className="flex items-start gap-3.5">
                  <span className="size-10 grid place-items-center rounded-xl bg-[#ffe8f0] text-[#ff4081] font-bold text-sm flex-shrink-0">
                    03
                  </span>
                  <div>
                    <h4 className="font-heading text-base font-bold text-[#2d1f3f]">
                      Physical Endurance Precedes Financial Harvest
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-[#6f6782] leading-relaxed">
                      A pivotal shift in mid-2018 shows running shoe investments (Puma Troy) and 10K marathon training directly preceding your highest recorded salary compensations and first stock dividend receipts (Reliance, ITC, Astral).
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#ff4081]">
                      <Award size={13} />
                      <span>Correlation: 10K Marathon finish $\leftrightarrow$ Stock market dividends</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Circadian Rhythm & Activity Distribution */}
        <div className="space-y-6">
          
          {/* Circadian 24-Hour Activity Peak */}
          <div className="rounded-[28px] bg-white p-6 sm:p-7 ring-1 ring-[#ece9f3] shadow-[0_4px_25px_rgba(45,31,63,0.03)]">
            <div className="eyebrow text-[#ff9800]">
              <Clock size={14} />
              <span>CIRCADIAN INTELLIGENCE</span>
            </div>

            <h3 className="font-heading text-xl font-bold text-[#2d1f3f] mt-1">
              Time-of-Day Rhythms
            </h3>

            <p className="text-xs text-[#6f6782] mt-1 mb-5">
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
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>{slot.time}</span>
                    <span className="text-slate-400">{slot.pct}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
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
          <div className="rounded-[28px] bg-gradient-to-br from-[#f2f4ff] to-[#fcfaff] p-6 sm:p-7 ring-1 ring-[#e0e4f5]">
            <span className="eyebrow text-[#5269dd]">DOMAIN BALANCING</span>
            <h3 className="font-heading text-xl font-bold text-[#2d1f3f] mt-1 mb-4">
              Life Categories
            </h3>

            <div className="space-y-3">
              {[
                { domain: 'Purchases & Food', pct: 45, count: '280+' },
                { domain: 'Places & Commute', pct: 22, count: '95+' },
                { domain: 'Music (Spotify)', pct: 18, count: '75+' },
                { domain: 'Movies & Culture', pct: 10, count: '40+' },
                { domain: 'Health & Wellness', pct: 5, count: '25+' },
              ].map(d => (
                <div key={d.domain} className="flex justify-between items-center text-xs py-1.5 border-b border-white/60">
                  <span className="font-bold text-slate-700">{d.domain}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">{d.count}</span>
                    <span className="font-bold text-[#5269dd]">{d.pct}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200/60 text-center">
              <Link to="/timeline" className="primary-button text-xs w-full justify-center">
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
