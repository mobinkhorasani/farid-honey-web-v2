// components/auth/register/fields/NameField.tsx
'use client'

import { User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { NameFieldProps } from '@/types/d.type'
import { ChangeEvent, KeyboardEvent, useCallback } from 'react'

/* ----------------------------------------------------------- */
/*  کمکی‌ها                                                    */
/* ----------------------------------------------------------- */
const cleanPersianLetters = (raw: string): string =>
  raw
    // فقط حروف فارسی، فاصله و نیم‌فاصله
    .replace(/[^آ-ی\s\u200C]+/g, '')
    // حذف فاصله‌ی اضافی پیاپی
    .replace(/\s{2,}/g, ' ')
    // تبدیل فاصله‌ی انگلیسی به فارسی (اختیاری)
    .replace(/\u0020/g, '\u2000')

/* ----------------------------------------------------------- */
/*  کامپوننت اصلی                                              */
/* ----------------------------------------------------------- */
export const NameField = ({
  id = 'name',
  label = 'نام',
  hint,
  error,
  registration,
}: NameFieldProps) => {
  const describedBy = [error ? `${id}-error` : undefined, hint ? `${id}-hint` : undefined]
    .filter(Boolean)
    .join(' ')

  /* جلوگیری از تایپ کاراکتر غیرمجاز در لحظه */
  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    const allowed = /[آ-ی\s\u200C]/
    if (!allowed.test(e.key) && !['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
    }
  }, [])

  /* تمیز کردن فوری پس از Paste یا تغییر دستی */
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const cleaned = cleanPersianLetters(e.target.value)
      registration?.onChange?.({ target: { name: e.target.name, value: cleaned } })
    },
    [registration]
  )

  return (
    <div className="space-y-1.5 sm:space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium text-slate-700 block">
          {label}
        </Label>
      )}

      <div className="relative h-12 md:h-14">
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <User className="w-5 h-5 text-amber-500" />
        </span>

        <Input
          id={id}
          type="text"
          placeholder="نام کامل خود را وارد کنید"
          autoComplete="name"
          dir="rtl"
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          className={`
            h-full w-full pr-12 pl-4 rounded-2xl border-2
            transition-all duration-300
            text-right placeholder:text-slate-400
            text-[16px] text-black
            focus:outline-none focus:ring-4
            hover:border-amber-200
            ${
              error
                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100'
                : 'border-amber-100 bg-white/50 focus:border-amber-400 focus:ring-amber-100'
            }
          `}
          {...registration}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
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
  )
}