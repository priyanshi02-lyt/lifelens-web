import React from 'react';
import { X, Receipt, BookmarkPlus, Calendar, Clock, Tag, ExternalLink } from 'lucide-react';

export default function MomentModal({ moment, isOpen, onClose, onSaveToJournal, onOpenThermalSlip }) {
  if (!isOpen || !moment) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-reveal-up overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-[28px] overflow-hidden shadow-2xl ring-1 ring-[#ece9f3] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 grid size-9 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Hero image banner */}
        {moment.image && (
          <div 
            className="relative h-56 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${moment.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <span 
                className="inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5"
                style={{ backgroundColor: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}
              >
                {moment.kind} · {moment.mood}
              </span>
              <h3 className="font-heading text-2xl font-bold tracking-tight text-white leading-snug">
                {moment.title}
              </h3>
            </div>
          </div>
        )}

        {/* Body content */}
        <div className="p-6 space-y-5">
          <div>
            <p className="text-sm font-semibold text-[#5269dd]">
              {moment.subtitle}
            </p>
            <p className="mt-3 text-sm text-[#534666] leading-relaxed">
              {moment.story}
            </p>
          </div>

          {/* Metadata pill row */}
          <div className="flex flex-wrap gap-2.5 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium">
              <Calendar size={13} className="text-[#5269dd]" />
              <span>{moment.date}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium">
              <Clock size={13} className="text-[#5269dd]" />
              <span>{moment.time}</span>
            </div>

            {moment.amount && parseFloat(moment.amount) > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold">
                <span>₹{parseFloat(moment.amount).toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 font-semibold">
              <Tag size={13} />
              <span>{moment.category || moment.kind}</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-slate-100">
            {onSaveToJournal && (
              <button
                onClick={() => {
                  onSaveToJournal(moment);
                }}
                className="secondary-button flex-1"
              >
                <BookmarkPlus size={15} />
                <span>Save to Journal</span>
              </button>
            )}

            {onOpenThermalSlip && (
              <button
                onClick={() => {
                  onClose();
                  onOpenThermalSlip(moment);
                }}
                className="primary-button flex-1"
              >
                <Receipt size={15} />
                <span>Thermal Slip</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
