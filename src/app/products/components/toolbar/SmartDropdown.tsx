'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useDropdown } from './useDropdown';

const pillBase =
  'inline-flex items-center rounded-xl border text-sm transition-all shadow-sm';
const pillNeutral =
  'bg-white border-gray-200 text-gray-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700';
const pillActive =
  'bg-amber-50 border-amber-300 text-amber-800 ring-1 ring-amber-200';

const menuDesktop =
  'absolute top-full right-0 mt-2 w-56 rounded-xl border bg-white shadow-xl ring-1 ring-black/5 border-gray-100 p-1 z-[60] origin-top animate-[fadeIn_0.12s_ease-out]';

const menuMobile =
  // تمام‌عرض با فاصله از لبه‌ها، fixed و بالاتر از همه
  'fixed left-3 right-3 rounded-xl border bg-white shadow-2xl ring-1 ring-black/5 border-gray-100 p-1 z-[70]';

const itemBase = 'w-full text-right px-3 py-2 rounded-lg text-sm transition-colors';
const itemIdle = 'text-gray-700 hover:bg-amber-50 hover:text-amber-700';
const itemActive = 'bg-amber-50 text-amber-800 border border-amber-200';

type Item = string | { label: string; value: string };
const getLabel = (i: Item) => (typeof i === 'string' ? i : i.label);
const getValue = (i: Item) => (typeof i === 'string' ? i : i.value);

interface SmartDropdownProps {
  label: string;
  items: Item[];
  selected: string;
  onSelect: (value: string) => void;
  Icon?: ComponentType<{ className?: string }>;
  activeWhen?: (selected: string) => boolean;
  className?: string;
  compact?: boolean;
}

export default function SmartDropdown({
  label,
  items,
  selected,
  onSelect,
  Icon,
  activeWhen,
  className,
  compact,
}: SmartDropdownProps) {
  const dd = useDropdown();
  const isActive = activeWhen ? activeWhen(selected) : selected !== label;

  const sizing =
    compact
      ? 'px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm gap-1.5 sm:gap-2'
      : 'px-4 py-2 text-sm gap-2';

  const btnRef = useRef<HTMLButtonElement>(null);
  const [menuTop, setMenuTop] = useState(0);

  // وقتی منو باز است، موقعیت پایین دکمه را برای منوی fixed محاسبه کن
  useEffect(() => {
    if (!dd.open) return;
    const update = () => {
      const r = btnRef.current?.getBoundingClientRect();
      if (r) setMenuTop(r.bottom + 8); // 8px فاصله
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [dd.open]);

  const renderItems = () =>
    items.map((it) => {
      const label = getLabel(it);
      const value = getValue(it);
      const active = value === selected;
      return (
        <button
          key={value}
          onClick={() => {
            onSelect(value);
            dd.setOpen(false);
          }}
          className={[itemBase, active ? itemActive : itemIdle].join(' ')}
          role="menuitem"
        >
          {label}
        </button>
      );
    });

  return (
    <div className={`relative ${className ?? ''}`} ref={dd.ref}>
      <button
        ref={btnRef}
        type="button"
        onClick={() => dd.setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={dd.open}
        className={[
          pillBase,
          'w-full min-w-0 justify-between',
          sizing,
          isActive ? pillActive : pillNeutral,
        ].join(' ')}
      >
        <span className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          {Icon && (
            <span className="shrink-0">
              <span className="block sm:hidden">
                <Icon className="w-3.5 h-3.5 opacity-80" />
              </span>
              <span className="hidden sm:block">
                <Icon className="w-4 h-4 opacity-80" />
              </span>
            </span>
          )}
          <span className="truncate">{selected}</span>
        </span>
        <ChevronDownIcon
          className={`shrink-0 transition-transform ${dd.open ? 'rotate-180' : ''} w-3.5 h-3.5 sm:w-4 sm:h-4`}
        />
      </button>

      {dd.open && (
        <>
          {/* بک‌دراپ فقط در موبایل برای بستن با کلیک بیرون */}
          <div className="fixed inset-0 z-[65] sm:hidden" onClick={() => dd.setOpen(false)} />

          {/* منوی دسکتاپ */}
          <div className={`${menuDesktop} hidden sm:block`} role="menu">
            {renderItems()}
          </div>

          {/* منوی موبایل (fixed و تمام‌عرض) */}
          <div className={`${menuMobile} sm:hidden`} style={{ top: menuTop }} role="menu">
            {renderItems()}
          </div>
        </>
      )}
    </div>
  );
}
