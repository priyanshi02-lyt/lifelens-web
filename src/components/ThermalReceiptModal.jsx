import React from 'react';
import { X, Printer, Check, Sparkles } from 'lucide-react';

export default function ThermalReceiptModal({ receipt, isOpen, onClose }) {
  if (!isOpen || !receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const amountNum = parseFloat(receipt.amount || 0);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-reveal-up overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 grid size-8 place-items-center rounded-full bg-white shadow-md text-slate-600 hover:text-slate-900"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Thermal Slip Container */}
        <div className="thermal-receipt p-6 rounded-md shadow-2xl">
          {/* Top Sawtooth */}
          <div className="thermal-sawtooth-top"></div>

          {/* Receipt Header */}
          <div className="text-center border-b border-dashed border-slate-300 pb-4 mb-4">
            <div className="flex items-center justify-center gap-1.5 font-bold tracking-widest text-xs uppercase mb-1">
              <Sparkles size={14} />
              <span>LIFELENS RECEIPT ARCHIVE</span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">
              Human Moments & Digital Breadcrumbs
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              RECORD ID: #{receipt.id.toUpperCase()}
            </p>
          </div>

          {/* Date & Time */}
          <div className="flex justify-between text-[11px] text-slate-600 mb-3 border-b border-dashed border-slate-200 pb-2">
            <span>TIMESTAMP:</span>
            <span className="font-semibold">{receipt.date} {receipt.time}</span>
          </div>

          {/* Item details */}
          <div className="space-y-3 mb-4 text-xs">
            <div className="flex justify-between font-bold text-slate-800">
              <span className="max-w-[190px]">{receipt.title}</span>
              <span>₹{amountNum > 0 ? amountNum.toLocaleString('en-IN') : '0.00'}</span>
            </div>
            <div className="text-[11px] text-slate-600">
              {receipt.subtitle}
            </div>

            <div className="bg-slate-50 p-2.5 rounded text-[11px] text-slate-700 italic border border-slate-100">
              "{receipt.story}"
            </div>
          </div>

          {/* Breakdown / Taxes / Emotion */}
          <div className="border-t border-dashed border-slate-300 pt-3 space-y-1.5 text-[11px] text-slate-600 mb-4">
            <div className="flex justify-between">
              <span>Category / Domain:</span>
              <span className="font-semibold uppercase">{receipt.kind || receipt.category}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment / Protocol:</span>
              <span className="font-semibold">{receipt.mode || 'Digital Record'}</span>
            </div>
            <div className="flex justify-between">
              <span>Emotional Tax / Sentiment:</span>
              <span className="font-bold text-[#5269dd] uppercase">{receipt.mood || 'Reflective'}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-sm text-slate-900">
              <span>TOTAL VALUE:</span>
              <span>₹{amountNum > 0 ? amountNum.toLocaleString('en-IN') : '0.00'}</span>
            </div>
          </div>

          {/* Barcode representation */}
          <div className="border-t border-dashed border-slate-300 pt-4 text-center">
            <div className="h-10 w-full flex items-center justify-center gap-1 opacity-70 mb-2">
              {[3,1,4,1,2,5,1,3,2,1,4,2,3,1,2,4,1,3,2,1,3,4,2].map((w, i) => (
                <div 
                  key={i} 
                  className="h-full bg-black" 
                  style={{ width: `${w * 2}px` }}
                />
              ))}
            </div>
            <div className="text-[9px] text-slate-500 tracking-widest uppercase">
              * AUTHENTIC MEMORY VERIFIED *
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex gap-2 no-print">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#172b65] text-white rounded-xl font-bold text-xs hover:bg-[#0f1d45] transition"
            >
              <Printer size={14} />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 transition"
            >
              Close
            </button>
          </div>

          {/* Bottom Sawtooth */}
          <div className="thermal-sawtooth-bottom"></div>
        </div>
      </div>
    </div>
  );
}
