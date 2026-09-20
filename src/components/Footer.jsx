import React from 'react';
import { Sparkles, Keyboard, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { soundFx } from '../utils/audioSynthesizer';

export default function Footer({ onOpenShortcuts }) {
  return (
    <footer 
      className="mx-auto mt-20 max-w-[1240px] w-full overflow-hidden border-t border-[#e2e0ec] dark:border-slate-800 px-4 py-8 text-center text-xs text-[#8690a4] dark:text-slate-400 sm:px-8 mb-20 md:mb-0 transition-colors"
      data-testid="app-footer"
      role="contentinfo"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="grid size-6 place-items-center rounded-lg bg-[#172b65] dark:bg-[#5269dd] text-white">
            <Sparkles size={12} />
          </span>
          <span className="font-heading text-sm font-bold text-[#2d1f3f] dark:text-white">LifeLens</span>
          <span className="mx-1">·</span>
          <span>Your life, seen differently.</span>
        </div>
        
        <nav className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs text-[#6f6782] dark:text-slate-300" aria-label="Footer Navigation">
          <Link to="/timeline" onClick={() => soundFx.playClick()} className="hover:text-[#172b65] dark:hover:text-white transition">Timeline</Link>
          <Link to="/explore" onClick={() => soundFx.playClick()} className="hover:text-[#172b65] dark:hover:text-white transition">Explore</Link>
          <Link to="/insights" onClick={() => soundFx.playClick()} className="hover:text-[#172b65] dark:hover:text-white transition">Insights</Link>
          <Link to="/story" onClick={() => soundFx.playClick()} className="hover:text-[#172b65] dark:hover:text-white transition">Story</Link>
          <Link to="/journal" onClick={() => soundFx.playClick()} className="hover:text-[#172b65] dark:hover:text-white transition">Journal</Link>
          {onOpenShortcuts && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenShortcuts();
              }}
              className="inline-flex items-center gap-1 text-[#5269dd] dark:text-[#8ea0ff] hover:underline font-semibold"
              aria-label="View keyboard shortcuts"
            >
              <Keyboard size={12} />
              <span>Shortcuts (?)</span>
            </button>
          )}
        </nav>

        <div className="text-[11px] text-[#9ca3af] dark:text-slate-500">
          Every click tells a story • FrontendArena Hackathon
        </div>
      </div>
    </footer>
  );
}
