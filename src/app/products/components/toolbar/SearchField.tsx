'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

type Size = 'sm' | 'md';

interface SearchFieldProps {
  value?: string;                     // کنترل‌شده
  defaultValue?: string;              // نکنترل‌شده
  onChange?: (v: string) => void;     // تغییر فوری
  onDebouncedChange?: (v: string) => void; // تغییر با تاخیر
  delay?: number;                     // پیش‌فرض 300ms
  placeholder?: string;
  size?: Size;
  className?: string;
  onSubmit?: (v: string) => void;     // Enter
}

export default function SearchField({
  value,
  defaultValue = '',
  onChange,
  onDebouncedChange,
  delay = 300,
  placeholder = 'جستجو...',
  size = 'md',
  className,
  onSubmit,
}: SearchFieldProps) {
  const isControlled = typeof value === 'string';
  const [internal, setInternal] = useState(defaultValue);
  const v = isControlled ? (value as string) : internal;
  const inputRef = useRef<HTMLInputElement>(null);

  // debounce
  useEffect(() => {
    if (!onDebouncedChange) return;
    const t = setTimeout(() => onDebouncedChange(v), delay);
    return () => clearTimeout(t);
  }, [v, delay, onDebouncedChange]);

  const padding = size === 'sm' ? 'h-9 px-9 pr-10 text-sm' : 'h-11 px-10 pr-12';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  const setVal = (next: string) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const clear = () => setVal('');

  const ringClasses =
    'focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300';

  return (
    <div className={`relative ${className ?? ''}`}>
      {/* search icon */}
      <MagnifyingGlassIcon
        className={`absolute right-3 top-1/2 -translate-y-1/2 ${iconSize} text-amber-600`}
        aria-hidden
      />
      {/* input */}
      <input
        ref={inputRef}
        dir="rtl"
        className={[
          'w-full rounded-xl border border-gray-200 bg-white text-black',
          'placeholder:text-gray-400',
          'transition-colors',
          padding,
          ringClasses,
        ].join(' ')}
        value={v}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit?.(v);
        }}
      />
      {/* clear */}
      {v?.length > 0 && (
        <button
          type="button"
          onClick={clear}
          className={`absolute left-2 top-1/2 -translate-y-1/2 ${iconSize} text-gray-400 hover:text-gray-600 transition-colors`}
          aria-label="پاک کردن جستجو"
          title="پاک کردن"
        >
          <XMarkIcon className="w-full h-full" />
        </button>
      )}
    </div>
  );
}
