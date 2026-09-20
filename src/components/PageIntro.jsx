import React from 'react';

export default function PageIntro({ eyebrow, title, description, action }) {
  return (
    <div className="mb-5 sm:mb-8 flex flex-col justify-between gap-3 sm:gap-5 sm:flex-row sm:items-end w-full max-w-full" data-testid="page-intro">
      <div className="min-w-0 flex-1">
        <div className="eyebrow" data-testid="page-eyebrow">
          {eyebrow}
        </div>
        <h1 
          className="mt-1.5 sm:mt-2 font-heading text-2xl sm:text-4xl md:text-5xl font-bold leading-[1.08] tracking-[-0.04em] text-[#2d1f3f]"
          data-testid="page-title"
        >
          {title}
        </h1>
        <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-base text-[#6f6782] leading-relaxed">
          {description}
        </p>
      </div>
      {action && (
        <div className="flex-shrink-0 self-start sm:self-auto">
          {action}
        </div>
      )}
    </div>
  );
}
