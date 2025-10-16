'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { User } from 'lucide-react'

import type { LoginFormValues } from '../schema/login-schema'
import { loginValidationSchema } from '../schema/login-schema'
import { Button } from '@/components/ui/button'
import { fadeInUp, stagger } from '@/components/motion/variants'
import { PhoneField } from './fields/phone-field'
import { PasswordField } from './fields/password-field'
import { ServerError } from './parts/server-error'



interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void
  isSubmitting: boolean
  serverError: string | null
}

export const LoginForm = ({ onSubmit, isSubmitting, serverError }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidationSchema),
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
      
      <motion.div variants={fadeInUp}>
        <PhoneField
          id="phone"
          label="شماره موبایل"
          hint="شماره ۱۱ رقمی و با 09 شروع شود"
          error={errors.phone_number?.message}
          registration={register('phone_number')}
        />
      </motion.div>

     
      <motion.div variants={fadeInUp}>
        <PasswordField
          id="password"
          label="رمز عبور"
          placeholder="رمز عبور خود را وارد کنید"
          error={errors.password?.message}
          registration={register('password')}
          showPassword={showPassword}
          onToggleShow={() => setShowPassword((v) => !v)}
        />
      </motion.div>

      
      {serverError && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <ServerError message={serverError} />
        </motion.div>
      )}

      
      <motion.div variants={fadeInUp}>
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="w-full h-12 md:h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold text-base md:text-lg shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-200"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>در حال ورود...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <User className="w-5 h-5" />
              <span>ورود به حساب</span>
            </div>
          )}
        </Button>
      </motion.div>

      
      <motion.div variants={fadeInUp} className="text-center text-gray-600">
        حساب کاربری ندارید؟
        <Link
          href="/auth/register"
          className="text-amber-600 hover:text-amber-700 text-sm font-medium hover:underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:rounded"
        >
           ثبت نام
        </Link>
      </motion.div>
    </motion.form>
  )
}

