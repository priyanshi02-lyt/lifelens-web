import React from 'react';

export default function PageIntro({ eyebrow, title, description, action }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end" data-testid="page-intro">
      <div>
        <div className="eyebrow" data-testid="page-eyebrow">
          {eyebrow}
        </div>
        <h1 
          className="mt-2 font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.06] tracking-[-0.045em] text-[#2d1f3f]"
          data-testid="page-title"
        >
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#6f6782] leading-relaxed">
          {description}
        </p>
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
