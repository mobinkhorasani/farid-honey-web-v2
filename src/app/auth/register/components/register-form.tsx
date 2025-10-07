// ─────────────────────────────────────────────────────────────────────────────
// file: components/auth/register/RegisterForm.tsx
// ─────────────────────────────────────────────────────────────────────────────
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'

import type { RegisterFormValues } from './register-validation'
import { registerValidationSchema } from './register-validation'
import { Button } from '@/components/ui/button'
import { fadeInUp, stagger } from '@/components/motion/variants'

import { NameField } from './fields/name-field'
import { PhoneField } from './fields/phone-field'
import { PasswordField } from './fields/password-field'
import { ServerError } from './parts/server-error'
import { ServerSuccess } from './parts/server-success'

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void
  isSubmitting: boolean
  serverError: string | null
  serverSuccess: string | null
}

export const RegisterForm = ({ onSubmit, isSubmitting, serverError, serverSuccess }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerValidationSchema),
    mode: 'onChange',
  })

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      dir="rtl"
      initial="hidden"
      animate="show"
      variants={stagger}
      className="max-w-screen-sm w-full mx-auto px-3 sm:px-4 space-y-5 sm:space-y-6"
    >
      {/* Name */}
      <motion.div variants={fadeInUp}>
        <NameField
          id="name"
          label="نام و نام خانوادگی"
          hint="حداقل ۳ کاراکتر"
          error={errors.name?.message}
          registration={register('name')}
        />
      </motion.div>

      {/* Phone */}
      <motion.div variants={fadeInUp}>
        <PhoneField
          id="phone"
          label="شماره موبایل"
          hint="شماره ۱۱ رقمی و با 09 شروع شود"
          autoComplete="tel"
          error={errors.phone_number?.message}
          registration={register('phone_number')}
        />
      </motion.div>

      {/* Password */}
      <motion.div variants={fadeInUp}>
        <PasswordField
          id="password"
          label="رمز عبور"
          placeholder="رمز عبور قوی انتخاب کنید"
          error={errors.password?.message}
          registration={register('password')}
          showPassword={showPassword}
          onToggleShow={() => setShowPassword((v) => !v)}
        />
      </motion.div>

      {/* Server states */}
      {serverError && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <ServerError message={serverError} />
        </motion.div>
      )}
      {serverSuccess && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <ServerSuccess message={serverSuccess} />
        </motion.div>
      )}

      {/* Submit */}
      <motion.div variants={fadeInUp}>
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full h-12 md:h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold text-base md:text-lg shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-200"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>در حال ثبت‌نام...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <User className="w-5 h-5" />
              <span>ایجاد حساب</span>
            </div>
          )}
        </Button>
      </motion.div>
    </motion.form>
  )
}
