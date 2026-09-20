import React from 'react';
import { X, Keyboard, Command } from 'lucide-react';

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '/', desc: 'Quick jump & focus explorer search bar' },
    { key: 'T', desc: 'Toggle Dark Mode / Light Mode' },
    { key: 'M', desc: 'Toggle Lo-Fi Ambient Study Soundscape' },
    { key: 'P', desc: 'Print / Open Thermal Life Summary Slip' },
    { key: 'Esc', desc: 'Close any active modal or dialog' },
    { key: '?', desc: 'Open this Keyboard Shortcuts cheat sheet' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-reveal-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div 
        className="relative w-full max-w-md bg-white dark:bg-[#161b22] text-[#2d1f3f] dark:text-[#f0f6fc] rounded-[24px] p-6 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
          aria-label="Close shortcuts modal"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2.5 mb-4 text-[#5269dd] dark:text-[#798fff]">
          <Keyboard size={20} />
          <h3 id="shortcuts-title" className="font-heading text-xl font-bold">
            Keyboard Shortcuts
          </h3>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Power-user shortcuts designed for seamless navigation:
        </p>

        <div className="space-y-2.5 text-xs">
          {shortcuts.map((s) => (
            <div key={s.key} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#21262d]">
              <span className="text-slate-700 dark:text-slate-300 font-medium">{s.desc}</span>
              <kbd className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#30363d] border border-slate-200 dark:border-slate-600 font-mono font-bold text-slate-800 dark:text-slate-200 shadow-2xs">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <span className="text-[11px] text-slate-400">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border">Esc</kbd> anytime to dismiss
          </span>
        </div>
      </div>
    </div>
  );
}
