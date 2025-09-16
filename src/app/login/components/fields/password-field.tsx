// ─────────────────────────────────────────────────────────────────────────────
// file: components/auth/login/fields/PasswordField.tsx
// ─────────────────────────────────────────────────────────────────────────────
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { PasswordFieldProps } from '@/types/d.type'


export const PasswordField = ({
  id = 'password',
  label = 'رمز عبور',
  placeholder,
  error,
  showPassword,
  onToggleShow,
  registration,
}: PasswordFieldProps) => {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium text-slate-700 block">
          {label}
        </Label>
      )}

      <div className="relative h-12 md:h-14">
        {/* قفل سمت راست - ثابت */}
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <Lock className="w-5 h-5 text-amber-500" />
        </span>

        {/* دکمه چشم سمت چپ - ثابت */}
        <span className="absolute left-2 top-1/2 -translate-y-1/2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleShow}
            aria-label={showPassword ? 'پنهان کردن رمز' : 'نمایش رمز'}
            className="h-8 w-8 p-0 rounded-full text-slate-500 hover:text-amber-600 hover:bg-amber-50 focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </span>

        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete="current-password"
          dir="rtl"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-full w-full pr-12 pl-12 rounded-2xl border-2 ${error ? 'border-red-300 bg-red-50' : 'border-amber-100 bg-white/50'} focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100 transition-all duration-300 text-right placeholder:text-slate-400 text-[16px] hover:border-amber-200 text-black`}
          {...registration}
        />
      </div>

      {error && (
        <p id={`${id}-error`} aria-live="polite" className="text-red-500 text-xs mt-1 mr-1">
          {error}
        </p>
      )}
    </div>
  )
}

