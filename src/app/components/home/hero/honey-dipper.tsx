import React from 'react';

export function HoneyDipper({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M12 2L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="20" r="2" fill="currentColor" />
      <path d="M8 18L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 16L15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 14L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
