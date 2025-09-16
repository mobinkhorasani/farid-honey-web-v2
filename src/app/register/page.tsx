'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { signUp } from '@/api/users/userServices'
import type { RegisterFormValues } from './components/register-validation'
import { RegisterForm } from './components'
import { fadeInUp, stagger } from '@/components/motion/variants'

export default function RegisterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [serverSuccess, setServerSuccess] = useState<string | null>(null)

  const handleRegister = async (values: RegisterFormValues) => {
    try {
      setIsSubmitting(true)
      setServerError(null)
      setServerSuccess(null)

      // بدنه‌ی مطابق با API بک‌اند شما
      const payload = {
        name: values.name,
        phone_number: values.phone_number,
        password: values.password,
      }

      await signUp(payload)

      setServerSuccess('ثبت‌نام با موفقیت انجام شد.')
      // اگر مسیر دیگری مثل تایید OTP دارید، همین‌جا تغییر دهید
      router.push('/login?signup=success')
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err?.message || 'خطایی رخ داد. لطفاً دوباره تلاش کنید.'
      setServerError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-dvh bg-[#F9F7F2] flex items-center"
    >
      <div className="w-full mx-auto max-w-screen-sm px-3 sm:px-6 py-8 sm:py-12">
        {/* هدر کوچک صفحه */}
        <motion.header variants={stagger} initial="hidden" animate="show" className="mb-6 sm:mb-8">
          <motion.h1 variants={fadeInUp} className="text-2xl sm:text-3xl font-extrabold text-amber-700 text-center">
            عضویت در خانواده عسل فرید
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-2 text-center text-slate-600 text-sm sm:text-base">
            خوش آمدید! لطفاً اطلاعات خود را وارد کنید.
          </motion.p>
        </motion.header>

        <RegisterForm
          onSubmit={handleRegister}
          isSubmitting={isSubmitting}
          serverError={serverError}
          serverSuccess={serverSuccess}
        />

        {/* فوتر کوتاه با لینک لاگین */}
        <div className="mt-6 text-center">
          <span className="text-slate-600 text-sm">قبلاً حساب دارید؟ </span>
          <Link href="/login" className="text-amber-600 hover:text-amber-700 font-semibold hover:underline">
            ورود
          </Link>
        </div>
      </div>
    </motion.main>
  )
}
