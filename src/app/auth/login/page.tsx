'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { login } from '@/api/users/userServices'
import { fadeInUp, stagger } from '@/components/motion/variants'
import { LoginForm } from './components'
import { useAuth } from '@/context/authContext'
import { LoginFormValues } from './schema/login-schema'


export default function LoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { login: authLogin } = useAuth()


  const handleLogin = async (values: LoginFormValues) => {
    try {
      setIsSubmitting(true)
      setServerError(null)

      const payload = {
        phone_number: values.phone_number,
        password: values.password,
      }
      const data = await login(payload)

      authLogin(data.accessToken, {
        name: data.name,
        phone_number: data.phone_number,
        role: data.role,
      })

      router.push('/')
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'ورود ناموفق بود. دوباره تلاش کنید.'
      setServerError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-dvh bg-[#F9F7F2] flex items-center">
      <div className="w-full mx-auto max-w-screen-sm px-3 sm:px-6 py-8 sm:py-12">
        <motion.header variants={stagger} initial="hidden" animate="show" className="mb-6 sm:mb-8">
          <motion.h1 variants={fadeInUp} className="text-2xl sm:text-3xl font-extrabold text-amber-700 text-center">
            ورود به حساب کاربری
          </motion.h1>
          <motion.p variants={fadeInUp} className="mt-2 text-center text-slate-600 text-sm sm:text-base">
            خوش آمدید! لطفاً اطلاعات ورود را وارد کنید.
          </motion.p>
        </motion.header>
        <LoginForm onSubmit={handleLogin} isSubmitting={isSubmitting} serverError={serverError} />
      </div>
    </motion.main>
  )
}
