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
  Receipt,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Keyboard,
  Download
} from 'lucide-react';
import { soundFx } from '../utils/audioSynthesizer';

export const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, testId: 'nav-dashboard' },
  { label: 'Timeline', to: '/timeline', icon: Clock, testId: 'nav-timeline' },
  { label: 'Explore', to: '/explore', icon: Compass, testId: 'nav-explore' },
  { label: 'Insights', to: '/insights', icon: BarChart3, testId: 'nav-insights' },
  { label: 'Story', to: '/story', icon: BookOpen, testId: 'nav-story' },
  { label: 'Journal', to: '/journal', icon: BookMarked, testId: 'nav-journal' },
];

export default function Navbar({ 
  onOpenThermalSlip, 
  isDark, 
  onToggleTheme, 
  isAmbientPlaying, 
  onToggleAmbient,
  onOpenShortcuts,
  onExportCSV,
  onExportJSON
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      {/* 1. Desktop & Mobile Header Bar */}
      <header 
        className="sticky top-0 z-40 w-full border-b border-[#e2e0ec] dark:border-slate-800 bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-md transition-colors"
        data-testid="main-header"
        role="banner"
      >
        <div className="mx-auto flex h-[68px] sm:h-[72px] max-w-[1240px] items-center justify-between px-3.5 sm:px-8">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 focus:outline-none flex-shrink-0"
            data-testid="brand-link"
            aria-label="LifeLens Home"
            onClick={() => soundFx.playClick()}
          >
            <span className="grid size-8 sm:size-9 place-items-center rounded-xl bg-[#172b65] dark:bg-[#5269dd] text-white shadow-md">
              <Sparkles size={16} />
            </span>
            <span className="font-heading text-lg sm:text-[22px] font-bold tracking-tight text-[#2d1f3f] dark:text-white">
              Life<span className="text-[#5269dd] dark:text-[#8ea0ff]">Lens</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-6 lg:gap-7 md:flex" aria-label="Main navigation" role="navigation">
            {navItems.map(({ label, to, testId }) => (
              <Link 
                key={to}
                to={to} 
                onClick={() => soundFx.playClick()}
                className={`nav-link ${pathname === to ? 'nav-link-active' : ''} dark:text-slate-300 dark:hover:text-white`}
                data-testid={testId}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Ambient Soundscape Toggle */}
            {onToggleAmbient && (
              <button
                onClick={onToggleAmbient}
                className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  isAmbientPlaying
                    ? 'bg-[#172b65] text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
                title="Toggle Lo-Fi Study Ambient Soundscape (Shortcut: M)"
                aria-label="Toggle Ambient Audio"
              >
                {isAmbientPlaying ? (
                  <>
                    <Volume2 size={14} className="text-emerald-400" />
                    <span className="hidden xl:inline text-[11px]">Ambient ON</span>
                    <span className="flex gap-0.5 items-end h-3">
                      <span className="w-0.5 h-3 bg-emerald-400 animate-pulse"></span>
                      <span className="w-0.5 h-2 bg-emerald-400 animate-pulse delay-75"></span>
                      <span className="w-0.5 h-2.5 bg-emerald-400 animate-pulse delay-150"></span>
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX size={14} />
                    <span className="hidden xl:inline text-[11px]">Audio</span>
                  </>
                )}
              </button>
            )}

            {/* Dark / Light Mode Toggle */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className="grid size-9 place-items-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                title="Toggle Dark / Light Theme (Shortcut: T)"
                aria-label="Toggle Color Theme"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}

            {/* Keyboard Shortcuts Button */}
            {onOpenShortcuts && (
              <button
                onClick={onOpenShortcuts}
                className="hidden sm:grid size-9 place-items-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                title="Keyboard Shortcuts (Shortcut: ?)"
                aria-label="View Keyboard Shortcuts"
              >
                <Keyboard size={16} />
              </button>
            )}

            {/* Data Export Button (CSV) */}
            {onExportCSV && (
              <button
                onClick={() => {
                  soundFx.playChime();
                  onExportCSV();
                }}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#172b65] dark:text-[#8ea0ff] bg-[#f0eeff] dark:bg-slate-800 rounded-xl hover:bg-[#e4edff] transition"
                title="Export all 434 moments to CSV"
                aria-label="Export dataset to CSV"
              >
                <Download size={13} />
                <span>Export CSV</span>
              </button>
            )}

            {/* Thermal Receipt CTA */}
            {onOpenThermalSlip && (
              <button
                onClick={onOpenThermalSlip}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#172b65] dark:text-[#8ea0ff] bg-[#f0eeff] dark:bg-slate-800 hover:bg-[#e4edff] rounded-xl transition"
                title="Print Thermal Receipt of Life Summary (Shortcut: P)"
                aria-label="Print Thermal Slip"
              >
                <Receipt size={14} />
                <span>Thermal Slip</span>
              </button>
            )}

            {/* Desktop Explore CTA */}
            <Link
              to="/explore"
              className="primary-button hidden md:inline-flex"
              data-testid="header-cta-button"
              onClick={() => soundFx.playClick()}
            >
              <span>Explore Data</span>
              <ArrowRight size={14} />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                soundFx.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="grid size-9 sm:size-10 place-items-center rounded-xl bg-[#f8f7fc] dark:bg-slate-800 text-[#2d1f3f] dark:text-white hover:bg-[#f0eeff] md:hidden transition"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div 
            className="border-t border-[#e2e0ec] dark:border-slate-800 bg-white dark:bg-[#161b22] px-4 py-4 shadow-xl md:hidden animate-reveal-up"
            data-testid="mobile-menu-drawer"
            role="region"
            aria-label="Mobile Navigation Drawer"
          >
            <nav className="grid gap-1" aria-label="Mobile menu">
              {navItems.map(({ label, to, icon: Icon, testId }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => {
                    soundFx.playClick();
                    setMobileMenuOpen(false);
                  }}
                  data-testid={`${testId}-drawer`}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                    pathname === to 
                      ? 'bg-[#172b65] dark:bg-[#5269dd] text-white' 
                      : 'text-[#536071] dark:text-slate-300 hover:bg-[#f2f0ff] dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon size={17} />
                  <span>{label}</span>
                </Link>
              ))}

              <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
                {onExportCSV && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onExportCSV();
                    }}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <Download size={14} />
                    <span>Export CSV</span>
                  </button>
                )}

                {onOpenThermalSlip && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenThermalSlip();
                    }}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-bold bg-[#f0eeff] dark:bg-[#5269dd]/20 text-[#172b65] dark:text-[#a8b8ff]"
                  >
                    <Receipt size={14} />
                    <span>Thermal Slip</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* 2. Floating Mobile Bottom Navigation Pill Dock (Safe Area Aware & Ultra-Responsive) */}
      <nav 
        className="fixed left-1/2 z-40 flex -translate-x-1/2 items-center gap-0.5 sm:gap-1 rounded-2xl border border-white/80 dark:border-slate-700 bg-white/95 dark:bg-[#161b22]/95 p-1 shadow-[0_12px_40px_rgba(45,31,63,0.18)] backdrop-blur-xl md:hidden max-w-[calc(100vw-1.5rem)]"
        style={{ bottom: 'calc(0.85rem + env(safe-area-inset-bottom, 0px))' }}
        data-testid="mobile-bottom-navigation"
        aria-label="Mobile Bottom Navigation"
        role="navigation"
      >
        {navItems.map(({ label, to, icon: Icon, testId }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={() => soundFx.playClick()}
              data-testid={`${testId}-bottom`}
              className={`grid size-9 sm:size-10 place-items-center rounded-xl transition-all ${
                isActive 
                  ? 'bg-[#172b65] dark:bg-[#5269dd] text-white shadow-sm' 
                  : 'text-[#8390a6] dark:text-slate-400 hover:text-[#172b65] active:bg-slate-100 dark:active:bg-slate-800'
              }`}
              aria-label={label}
              title={label}
            >
              <Icon size={16} />
            </Link>
          );
        })}
      </nav>
    </>
  );
}
