import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Clock, 
  Compass, 
  BarChart3, 
  BookOpen, 
  BookMarked, 
  LayoutDashboard, 
  Menu, 
  X, 
  ArrowRight,
  Receipt
} from 'lucide-react';

export const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, testId: 'nav-dashboard' },
  { label: 'Timeline', to: '/timeline', icon: Clock, testId: 'nav-timeline' },
  { label: 'Explore', to: '/explore', icon: Compass, testId: 'nav-explore' },
  { label: 'Insights', to: '/insights', icon: BarChart3, testId: 'nav-insights' },
  { label: 'Story', to: '/story', icon: BookOpen, testId: 'nav-story' },
  { label: 'Journal', to: '/journal', icon: BookMarked, testId: 'nav-journal' },
];

export default function Navbar({ onOpenThermalSlip }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {/* 1. Desktop & Mobile Header Bar */}
      <header 
        className="sticky top-0 z-40 w-full border-b border-[#e2e0ec] bg-white/90 backdrop-blur-md transition-all"
        data-testid="main-header"
      >
        <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-4 sm:px-8">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 focus:outline-none"
            data-testid="brand-link"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-[#172b65] text-white shadow-[0_8px_20px_rgba(23,43,101,0.22)]">
              <Sparkles size={18} />
            </span>
            <span className="font-heading text-[22px] font-bold tracking-[-0.04em] text-[#2d1f3f]">
              Life<span className="text-[#5269dd]">Lens</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            <Link 
              to="/dashboard" 
              className={`nav-link ${pathname === '/dashboard' ? 'nav-link-active' : ''}`}
              data-testid="header-dashboard-link"
            >
              Dashboard
            </Link>
            <Link 
              to="/timeline" 
              className={`nav-link ${pathname === '/timeline' ? 'nav-link-active' : ''}`}
              data-testid="header-timeline-link"
            >
              Timeline
            </Link>
            <Link 
              to="/explore" 
              className={`nav-link ${pathname === '/explore' ? 'nav-link-active' : ''}`}
              data-testid="header-explore-link"
            >
              Explore
            </Link>
            <Link 
              to="/insights" 
              className={`nav-link ${pathname === '/insights' ? 'nav-link-active' : ''}`}
              data-testid="header-insights-link"
            >
              Insights
            </Link>
            <Link 
              to="/story" 
              className={`nav-link ${pathname === '/story' ? 'nav-link-active' : ''}`}
              data-testid="header-story-link"
            >
              Story
            </Link>
            <Link 
              to="/journal" 
              className={`nav-link ${pathname === '/journal' ? 'nav-link-active' : ''}`}
              data-testid="header-journal-link"
            >
              Journal
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {onOpenThermalSlip && (
              <button
                onClick={onOpenThermalSlip}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#172b65] bg-[#f0eeff] hover:bg-[#e4edff] rounded-xl transition"
                title="Print Thermal Receipt of Life Summary"
              >
                <Receipt size={14} />
                <span>Thermal Slip</span>
              </button>
            )}

            <Link
              to="/explore"
              className="primary-button hidden sm:inline-flex"
              data-testid="header-cta-button"
            >
              <span>Explore Data</span>
              <ArrowRight size={14} />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid size-10 place-items-center rounded-xl bg-[#f8f7fc] text-[#2d1f3f] hover:bg-[#f0eeff] md:hidden"
              aria-label="Toggle navigation menu"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div 
            className="border-t border-[#e2e0ec] bg-white px-5 py-4 shadow-lg md:hidden animate-reveal-up"
            data-testid="mobile-menu-drawer"
          >
            <nav className="grid gap-1.5" aria-label="Mobile menu">
              {navItems.map(({ label, to, icon: Icon, testId }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`${testId}-drawer`}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    pathname === to 
                      ? 'bg-[#172b65] text-white' 
                      : 'text-[#536071] hover:bg-[#f2f0ff]'
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              ))}

              {onOpenThermalSlip && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenThermalSlip();
                  }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#172b65] bg-[#f0eeff] hover:bg-[#e4edff] transition text-left mt-2"
                >
                  <Receipt size={18} />
                  <span>Print Thermal Summary Slip</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* 2. Floating Mobile Bottom Navigation Pill Dock (Reference Site Style) */}
      <div 
        className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/80 bg-white/90 p-1.5 shadow-[0_12px_40px_rgba(45,31,63,0.14)] backdrop-blur-xl md:hidden"
        data-testid="mobile-bottom-navigation"
      >
        {navItems.slice(0, 5).map(({ label, to, icon: Icon, testId }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              data-testid={`${testId}-bottom`}
              className={`grid size-11 place-items-center rounded-xl transition-all ${
                isActive 
                  ? 'bg-[#172b65] text-white shadow-md' 
                  : 'text-[#8390a6] hover:text-[#172b65] hover:bg-slate-100'
              }`}
              aria-label={label}
              title={label}
            >
              <Icon size={18} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
