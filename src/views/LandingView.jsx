import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  BarChart3, 
  BookOpen, 
  CheckCircle2,
  Menu
} from 'lucide-react';
import Footer from '../components/Footer';

export default function LandingView() {
  return (
    <div className="overflow-hidden bg-[#faf8fc] text-[#2d1f3f] w-full max-w-full">
      
      {/* Landing Header */}
      <header 
        className="mx-auto flex h-[68px] sm:h-[76px] max-w-[1240px] items-center justify-between px-4 sm:px-8 border-b border-[#e2e0ec]/60"
        data-testid="landing-header"
      >
        <Link to="/" className="flex items-center gap-2" data-testid="landing-brand-link">
          <span className="grid size-8 sm:size-9 place-items-center rounded-xl bg-[#172b65] text-white shadow-md">
            <Sparkles size={16} />
          </span>
          <span className="font-heading text-lg sm:text-[22px] font-bold tracking-tight">
            Life<span className="text-[#5269dd]">Lens</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Landing navigation">
          <a href="#how-it-works" className="nav-link nav-link-active" data-testid="landing-how-it-works-link">
            How it works
          </a>
          <Link to="/timeline" className="nav-link" data-testid="landing-timeline-link">
            Timeline
          </Link>
          <Link to="/explore" className="nav-link" data-testid="landing-explore-link">
            Explore
          </Link>
          <Link to="/insights" className="nav-link" data-testid="landing-insights-link">
            Insights
          </Link>
          <Link to="/journal" className="nav-link" data-testid="landing-journal-link">
            Journal
          </Link>
        </nav>

        <Link 
          to="/dashboard" 
          className="primary-button text-xs sm:text-sm !py-2 !px-3.5 sm:!py-2.5 sm:!px-4" 
          data-testid="landing-header-start-button"
        >
          <span>Start Exploring</span>
          <ArrowRight size={14} />
        </Link>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-[1240px] px-3.5 pb-8 pt-4 sm:px-8 sm:pt-8 w-full max-w-full">
        <div 
          className="relative isolate min-h-[460px] sm:min-h-[580px] overflow-hidden rounded-[26px] sm:rounded-[34px] bg-gradient-to-br from-[#f0eeff] via-[#f6f7ff] to-[#e8f2ff] px-5 py-8 shadow-[0_20px_70px_rgba(94,89,160,0.11)] sm:px-12 lg:px-16 lg:py-16"
          data-testid="landing-hero-section"
        >
          {/* Hero Content */}
          <div className="relative z-10 max-w-[540px] pt-2 lg:pt-8">
            <div className="eyebrow" data-testid="landing-eyebrow">
              <Sparkles size={13} />
              <span>YOUR LIFE · VISUALISED</span>
            </div>

            <h1 
              className="mt-3 font-heading text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-[-0.04em] text-[#2d1f3f]"
              data-testid="landing-hero-title"
            >
              Every Click <br />
              <span className="text-[#5269dd]">Tells a Story.</span>
            </h1>

            <p 
              className="mt-3.5 sm:mt-5 text-sm sm:text-lg leading-relaxed text-[#6f6782]"
              data-testid="landing-hero-subtitle"
            >
              LifeLens turns the quiet fragments of your digital life—night trains, Spotify playlists, cutting chai stops, and life milestones—into a rich, interconnected narrative of human growth.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <Link 
                to="/dashboard" 
                className="primary-button text-center justify-center py-3 px-5 text-xs sm:text-sm"
                data-testid="landing-hero-cta"
              >
                <span>Open LifeLens</span>
                <ArrowRight size={15} />
              </Link>
              
              <Link 
                to="/timeline" 
                className="secondary-button text-center justify-center py-3 px-5 text-xs sm:text-sm"
                data-testid="landing-hero-secondary-cta"
              >
                <span>Explore Timeline</span>
              </Link>
            </div>

            {/* Micro proof badges */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-[#7d8299] pt-5 border-t border-[#e2e0ec]/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#5269dd]" />
                <span>600+ Real Moments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#5269dd]" />
                <span>4 Narrative Chapters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#5269dd]" />
                <span>Client-Side Privacy</span>
              </div>
            </div>
          </div>

          {/* Right Card / Visual Preview on Desktop */}
          <div className="hidden lg:block absolute top-12 right-12 w-[400px] rounded-[28px] bg-white/85 backdrop-blur-xl p-6 shadow-xl border border-white/60">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-rose-400"></div>
                <div className="size-3 rounded-full bg-amber-400"></div>
                <div className="size-3 rounded-full bg-emerald-400"></div>
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Moment Snapshot
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl bg-gradient-to-r from-[#eef0ff] to-[#e4edff] p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5269dd]">Chapter 01 · 2:14 AM</span>
                    <h4 className="font-heading font-bold text-[#2d1f3f] mt-0.5">Streamed: Kun Faya Kun</h4>
                    <p className="text-xs text-slate-600 mt-1">A.R. Rahman · Sleeper train to Baroda</p>
                  </div>
                  <span className="size-8 grid place-items-center rounded-xl bg-white text-[#5269dd] shadow-sm">
                    ♫
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-[#fff1cf]/60 to-[#ffe8f0]/60 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Chapter 02 · Milestone</span>
                    <h4 className="font-heading font-bold text-[#2d1f3f] mt-0.5">SSD & Wi-Fi Router Upgrade</h4>
                    <p className="text-xs text-slate-600 mt-1">₹3,000 · Late night engineering sprint</p>
                  </div>
                  <span className="size-8 grid place-items-center rounded-xl bg-white text-amber-600 shadow-sm">
                    ▢
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="mx-auto max-w-[1240px] px-4 py-12 sm:py-16 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="eyebrow justify-center">
            <Sparkles size={13} />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="section-title text-[#2d1f3f] mt-2.5">
            Little moments, <br className="hidden sm:block" />
            <span className="text-[#5269dd]">big picture.</span>
          </h2>
          <p className="mt-3 text-[#6f6782] text-xs sm:text-base">
            Your everyday digital breadcrumbs contain the emotional and biographical story of who you were becoming.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Step 1 */}
          <div className="rounded-[24px] bg-white p-6 sm:p-7 ring-1 ring-[#ece9f3] shadow-sm">
            <div className="grid size-11 place-items-center rounded-2xl bg-[#eef0ff] text-[#5269dd] mb-5">
              <Clock size={22} />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Step 01</div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2d1f3f] mb-2">
              Capture Digital Breadcrumbs
            </h3>
            <p className="text-xs sm:text-sm text-[#6f6782] leading-relaxed">
              Every train ticket, cutting chai stop, Spotify late-night track, and weekend expense is brought into one unified ledger.
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-[24px] bg-white p-6 sm:p-7 ring-1 ring-[#ece9f3] shadow-sm">
            <div className="grid size-11 place-items-center rounded-2xl bg-[#dff6ee] text-[#00c48c] mb-5">
              <BarChart3 size={22} />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Step 02</div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2d1f3f] mb-2">
              Discover Hidden Patterns
            </h3>
            <p className="text-xs sm:text-sm text-[#6f6782] leading-relaxed">
              Find causality: how a 2 AM study session correlates with specific music, and how physical movement shaped your energy.
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-[24px] bg-white p-6 sm:p-7 ring-1 ring-[#ece9f3] shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="grid size-11 place-items-center rounded-2xl bg-[#ffe8f0] text-[#ff4081] mb-5">
              <BookOpen size={22} />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Step 03</div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#2d1f3f] mb-2">
              Unfold Narrative Stories
            </h3>
            <p className="text-xs sm:text-sm text-[#6f6782] leading-relaxed">
              Read your journey chapter by chapter with curated reflections, emotional summaries, and printable keepsake thermal slips.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Callout Banner */}
      <section className="mx-auto max-w-[1240px] px-4 py-6 sm:px-8">
        <div className="rounded-[28px] bg-gradient-to-br from-[#172b65] to-[#2d1f3f] p-6 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl">
            <span className="eyebrow text-[#a5b4fc]">A REFLECTIVE EXPERIENCE</span>
            <h2 className="mt-2.5 font-heading text-2xl sm:text-4xl font-bold leading-tight">
              One dataset. <br />
              <span className="text-[#a5b4fc]">Infinite stories.</span>
            </h2>
            <p className="mt-3 text-xs sm:text-base text-slate-300 leading-relaxed">
              Your life isn't a collection of sterile transactions. It's a living biography composed of tiny moments of courage, dedication, and joy.
            </p>
            <div className="mt-5">
              <Link to="/dashboard" className="primary-button !bg-white !text-[#172b65] hover:!bg-slate-100 text-xs sm:text-sm">
                <span>Enter Your Dashboard</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
