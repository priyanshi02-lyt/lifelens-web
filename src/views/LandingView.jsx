import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Clock, 
  BarChart3, 
  BookOpen, 
  Heart, 
  MapPin, 
  Music, 
  Coffee, 
  ShoppingBag,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import Footer from '../components/Footer';

export default function LandingView() {
  return (
    <div className="overflow-hidden bg-[#faf8fc] text-[#2d1f3f]">
      
      {/* Landing Header */}
      <header 
        className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 sm:px-8"
        data-testid="landing-header"
      >
        <Link to="/" className="flex items-center gap-2.5" data-testid="landing-brand-link">
          <span className="grid size-9 place-items-center rounded-xl bg-[#172b65] text-white shadow-[0_8px_20px_rgba(23,43,101,0.22)]">
            <Sparkles size={18} />
          </span>
          <span className="font-heading text-[22px] font-bold tracking-[-0.04em]">
            Life<span className="text-[#5269dd]">Lens</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Landing navigation">
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

        <Link to="/dashboard" className="primary-button" data-testid="landing-header-start-button">
          <span>Start Exploring</span>
          <ArrowRight size={15} />
        </Link>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-[1240px] px-4 pb-8 pt-4 sm:px-8 sm:pt-8">
        <div 
          className="relative isolate min-h-[580px] overflow-hidden rounded-[34px] bg-gradient-to-br from-[#f0eeff] via-[#f6f7ff] to-[#e8f2ff] px-6 py-10 shadow-[0_20px_70px_rgba(94,89,160,0.11)] sm:px-12 lg:px-16 lg:py-16"
          data-testid="landing-hero-section"
        >
          {/* Decorative Floating Note Badges */}
          <div 
            className="floating-note hidden sm:flex" 
            style={{ top: '15%', right: '36%', '--note-rotate': '-3deg' }}
          >
            <Music size={14} className="text-[#8c52ff]" />
            <span>2 AM · a favorite song</span>
          </div>

          <div 
            className="floating-note hidden sm:flex" 
            style={{ top: '48%', right: '8%', '--note-rotate': '4deg' }}
          >
            <MapPin size={14} className="text-[#00c48c]" />
            <span>Goa Beach, India</span>
          </div>

          <div 
            className="floating-note hidden sm:flex" 
            style={{ bottom: '22%', right: '32%', '--note-rotate': '-2deg' }}
          >
            <Coffee size={14} className="text-[#ff9800]" />
            <span>Cutting chai pause</span>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-[540px] pt-4 lg:pt-8">
            <div className="eyebrow" data-testid="landing-eyebrow">
              <Sparkles size={14} />
              <span>YOUR LIFE · VISUALISED</span>
            </div>

            <h1 
              className="mt-4 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.06] tracking-[-0.045em] text-[#2d1f3f]"
              data-testid="landing-hero-title"
            >
              Every Click <br />
              <span className="text-[#5269dd]">Tells a Story.</span>
            </h1>

            <p 
              className="mt-5 text-base sm:text-lg leading-relaxed text-[#6f6782]"
              data-testid="landing-hero-subtitle"
            >
              LifeLens turns the quiet fragments of your digital life—night trains, Spotify playlists, cutting chai stops, and life milestones—into a rich, interconnected narrative of human growth.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link 
                to="/dashboard" 
                className="primary-button text-center justify-center py-3.5 px-6 text-sm"
                data-testid="landing-hero-cta"
              >
                <span>Open LifeLens</span>
                <ArrowRight size={16} />
              </Link>
              
              <Link 
                to="/timeline" 
                className="secondary-button text-center justify-center py-3.5 px-6 text-sm"
                data-testid="landing-hero-secondary-cta"
              >
                <span>Explore Timeline</span>
              </Link>
            </div>

            {/* Micro proof badges */}
            <div className="mt-10 flex flex-wrap items-center gap-5 text-xs text-[#7d8299] pt-6 border-t border-[#e2e0ec]/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#5269dd]" />
                <span>600+ Real Lived Moments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#5269dd]" />
                <span>4 Narrative Life Chapters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#5269dd]" />
                <span>100% Client-Side Privacy</span>
              </div>
            </div>
          </div>

          {/* Right Card / Visual Preview on Desktop */}
          <div className="hidden lg:block absolute top-12 right-12 w-[420px] rounded-[28px] bg-white/80 backdrop-blur-xl p-6 shadow-[0_20px_50px_rgba(45,31,63,0.12)] border border-white/60">
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

              <div className="rounded-2xl bg-gradient-to-r from-[#dff6ee] to-[#e7f4eb] p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Chapter 04 · Dawn</span>
                    <h4 className="font-heading font-bold text-[#2d1f3f] mt-0.5">10K Marathon Medal Finish</h4>
                    <p className="text-xs text-slate-600 mt-1">Adventure of a Lifetime on loop</p>
                  </div>
                  <span className="size-8 grid place-items-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    🏃
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="eyebrow justify-center">
            <Sparkles size={14} />
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="section-title text-[#2d1f3f] mt-3">
            Little moments, <br className="hidden sm:block" />
            <span className="text-[#5269dd]">big picture.</span>
          </h2>
          <p className="mt-4 text-[#6f6782] text-sm sm:text-base">
            Your everyday digital breadcrumbs contain the emotional and biographical story of who you were becoming.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Step 1 */}
          <div className="rounded-[28px] bg-white p-7 ring-1 ring-[#ece9f3] shadow-[0_8px_30px_rgba(45,31,63,0.04)] hover:shadow-lg transition">
            <div className="grid size-12 place-items-center rounded-2xl bg-[#eef0ff] text-[#5269dd] mb-6">
              <Clock size={24} />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Step 01</div>
            <h3 className="font-heading text-xl font-bold text-[#2d1f3f] mb-3">
              Capture Digital Breadcrumbs
            </h3>
            <p className="text-sm text-[#6f6782] leading-relaxed">
              Every train ticket, cutting chai stop, Spotify late-night track, and weekend expense is brought into one unified ledger.
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-[28px] bg-white p-7 ring-1 ring-[#ece9f3] shadow-[0_8px_30px_rgba(45,31,63,0.04)] hover:shadow-lg transition">
            <div className="grid size-12 place-items-center rounded-2xl bg-[#dff6ee] text-[#00c48c] mb-6">
              <BarChart3 size={24} />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Step 02</div>
            <h3 className="font-heading text-xl font-bold text-[#2d1f3f] mb-3">
              Discover Hidden Patterns
            </h3>
            <p className="text-sm text-[#6f6782] leading-relaxed">
              Find causality: how a 2 AM study session correlates with specific music, and how physical movement shaped your energy.
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-[28px] bg-white p-7 ring-1 ring-[#ece9f3] shadow-[0_8px_30px_rgba(45,31,63,0.04)] hover:shadow-lg transition">
            <div className="grid size-12 place-items-center rounded-2xl bg-[#ffe8f0] text-[#ff4081] mb-6">
              <BookOpen size={24} />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Step 03</div>
            <h3 className="font-heading text-xl font-bold text-[#2d1f3f] mb-3">
              Unfold Narrative Stories
            </h3>
            <p className="text-sm text-[#6f6782] leading-relaxed">
              Read your journey chapter by chapter with curated reflections, emotional summaries, and printable keepsake thermal slips.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Callout Banner */}
      <section className="mx-auto max-w-[1240px] px-5 py-8 sm:px-8">
        <div className="rounded-[32px] bg-gradient-to-br from-[#172b65] to-[#2d1f3f] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl">
            <span className="eyebrow text-[#a5b4fc]">A REFLECTIVE EXPERIENCE</span>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-bold leading-tight">
              One dataset. <br />
              <span className="text-[#a5b4fc]">Infinite stories.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Your life isn't a collection of sterile transactions. It's a living biography composed of tiny moments of courage, dedication, and joy.
            </p>
            <div className="mt-6">
              <Link to="/dashboard" className="primary-button !bg-white !text-[#172b65] hover:!bg-slate-100">
                <span>Enter Your Dashboard</span>
                <ArrowRight size={15} />
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
