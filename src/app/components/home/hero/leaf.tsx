import React from 'react';

export function Leaf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 110C48 82 54 42 50 10" />
        <path d="M38 72c12-4 22-2 28 4M30 88c10-1 18 1 24 6M20 98c7 0 12 2 17 6" />
        <path d="M60 50c9-6 18-8 26-6M54 60c10-4 18-3 24 2" />
      </g>
    </svg>
  );
}
