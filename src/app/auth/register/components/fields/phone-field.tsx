
// ─────────────────────────────────────────────────────────────────────────────
// file: components/auth/register/fields/PhoneField.tsx
// ─────────────────────────────────────────────────────────────────────────────
'use client'

import { Phone } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { PhoneFieldProps } from '@/types/d.type'



export const PhoneField = ({ id = 'phone', label = 'شماره موبایل', hint, error, autoComplete = 'tel', registration }: PhoneFieldProps) => {
  const describedBy = [error ? `${id}-error` : undefined, hint ? `${id}-hint` : undefined]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="space-y-1.5 sm:space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium text-slate-700 block">
          {label}
        </Label>
      )}

      <div className="relative h-12 md:h-14">
        {/* آیکن سمت راست - ثابت */}
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <Phone className="w-5 h-5 text-amber-500" />
        </span>

        <Input
          id={id}
          type="tel"
          inputMode="tel"
          maxLength={11}
          autoComplete={autoComplete}
          dir="rtl"
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          className={`h-full w-full pr-12 pl-4 rounded-2xl border-2 ${error ? 'border-red-300 bg-red-50' : 'border-amber-100 bg-white/50'} focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100 transition-all duration-300 text-left placeholder:text-slate-400 tracking-wider tabular-nums text-[16px] hover:border-amber-200 text-black`}
          {...registration}
        />
      </div>

      {hint && (
        <p id={`${id}-hint`} className="text-[11px] text-slate-500 mt-1 mr-1">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} aria-live="polite" className="text-red-500 text-xs mt-1 mr-1">
          {error}
        </p>
      )}
    </div>
  )}
