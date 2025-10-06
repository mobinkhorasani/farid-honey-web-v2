'use client';

import { useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

type Size = 'sm' | 'md';

interface SearchFieldProps {
  value?: string;                    
  defaultValue?: string;            
  onChange?: (v: string) => void;  
  onDebouncedChange?: (v: string) => void; 
  delay?: number;                 
  placeholder?: string;
  size?: Size;
  className?: string;
  onSubmit?: (v: string) => void;    
}

export const SearchField = ({
  value,
  defaultValue = '',
  onChange,
  onDebouncedChange,
  delay = 300,
  placeholder = 'جستجو...',
  size = 'md',
  className,
  onSubmit,
}: SearchFieldProps) => {
  const isControlled = typeof value === 'string';
  const [internal, setInternal] = useState(defaultValue);
  const v = isControlled ? (value as string) : internal;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!onDebouncedChange) return;
    const t = setTimeout(() => onDebouncedChange(v), delay);
    return () => clearTimeout(t);
  }, [v, delay, onDebouncedChange]);

  const padding = size === 'sm' ? 'h-9 px-9 pr-10 text-sm' : 'h-12 px-10 pr-12 text-sm';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  const setVal = (next: string) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const clear = () => setVal('');

  return (
    <div className={`relative ${className ?? ''}`}>
      <MagnifyingGlassIcon
        className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${iconSize} text-gray-400`}
        aria-hidden
      />
 
      <input
        ref={inputRef}
        dir="rtl"
        className={`
          w-full rounded-xl border border-gray-200/80 bg-white/80 backdrop-blur-sm text-gray-900
          placeholder:text-gray-400
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 focus:bg-white
          hover:border-gray-300
          ${padding}
        `}
        value={v}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit?.(v);
        }}
      />
    
      {v?.length > 0 && (
        <button
          type="button"
          onClick={clear}
          className={`
            absolute left-3 top-1/2 -translate-y-1/2 ${iconSize} 
            text-gray-400 hover:text-gray-600 
            transition-colors rounded-full hover:bg-gray-100 p-1
          `}
          aria-label="پاک کردن جستجو"
          title="پاک کردن"
        >
          <XMarkIcon className="w-full h-full" />
        </button>
      )}
    </div>
  );
};