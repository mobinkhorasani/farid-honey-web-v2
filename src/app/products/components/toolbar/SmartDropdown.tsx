'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useDropdown } from './useDropdown';

const pillBase =
  'inline-flex items-center rounded-xl border text-sm transition-all duration-200 shadow-sm';
const pillNeutral =
  'bg-white/80 backdrop-blur-sm border-gray-200/80 text-gray-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700';
const pillActive =
  'bg-amber-50 border-amber-300 text-amber-800 ring-2 ring-amber-100';

const menuDesktop =
  'absolute top-full right-0 mt-2 w-56 rounded-xl border bg-white shadow-xl ring-1 ring-black/5 border-gray-100 p-1 z-[60] origin-top animate-[fadeIn_0.12s_ease-out]';

const menuMobile =
  'fixed left-3 right-3 rounded-xl border bg-white shadow-2xl ring-1 ring-black/5 border-gray-100 p-1 z-[70]';

const itemBase = 'w-full text-right px-3 py-2.5 rounded-lg text-sm transition-colors';
const itemIdle = 'text-gray-700 hover:bg-amber-50 hover:text-amber-700';
const itemActive = 'bg-amber-50 text-amber-800 font-medium';

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

export const SmartDropdown = ({
  label,
  items,
  selected,
  onSelect,
  Icon,
  activeWhen,
  className,
  compact,
}: SmartDropdownProps) => {
  const dd = useDropdown();
  const isActive = activeWhen ? activeWhen(selected) : selected !== label;

  const sizing = compact
    ? 'px-4 py-2.5 text-sm gap-2 h-12'
    : 'px-4 py-3 text-sm gap-2';

  const btnRef = useRef<HTMLButtonElement>(null);
  const [menuTop, setMenuTop] = useState(0);

  useEffect(() => {
    if (!dd.open) return;
    const update = () => {
      const r = btnRef.current?.getBoundingClientRect();
      if (r) setMenuTop(r.bottom + 8);
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
        <span className="flex items-center gap-2 min-w-0">
          {Icon && <Icon className="w-4 h-4 opacity-70 shrink-0" />}
          <span className="truncate">{selected}</span>
        </span>
        <ChevronDownIcon
          className={`shrink-0 transition-transform duration-200 ${dd.open ? 'rotate-180' : ''} w-4 h-4 opacity-70`}
        />
      </button>

      {dd.open && (
        <>
          <div className="fixed inset-0 z-[65] sm:hidden" onClick={() => dd.setOpen(false)} />

          <div className={`${menuDesktop} hidden sm:block`} role="menu">
            {renderItems()}
          </div>

          <div className={`${menuMobile} sm:hidden`} style={{ top: menuTop }} role="menu">
            {renderItems()}
          </div>
        </>
      )}
    </div>
  );
};