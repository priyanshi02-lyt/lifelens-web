import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer 
      className="mx-auto mt-20 max-w-[1240px] w-full overflow-hidden border-t border-[#e2e0ec] px-4 py-8 text-center text-xs text-[#8690a4] sm:px-8 mb-20 md:mb-0"
      data-testid="app-footer"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="grid size-6 place-items-center rounded-lg bg-[#172b65] text-white">
            <Sparkles size={12} />
          </span>
          <span className="font-heading text-sm font-bold text-[#2d1f3f]">LifeLens</span>
          <span className="mx-1">·</span>
          <span>Your life, seen differently.</span>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs text-[#6f6782]">
          <Link to="/timeline" className="hover:text-[#172b65] transition">Timeline</Link>
          <Link to="/explore" className="hover:text-[#172b65] transition">Explore</Link>
          <Link to="/insights" className="hover:text-[#172b65] transition">Insights</Link>
          <Link to="/story" className="hover:text-[#172b65] transition">Story</Link>
          <Link to="/journal" className="hover:text-[#172b65] transition">Journal</Link>
        </div>

        <div className="text-[11px] text-[#9ca3af]">
          Every click tells a story • FrontendArena Hackathon
        </div>
      </div>
    </footer>
  );
}
