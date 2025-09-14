
// app/contact/components/ContactForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
    .max(100, 'نام نباید بیش از ۱۰۰ کاراکتر باشد'),
  email: z
    .string()
    .email('لطفاً یک ایمیل معتبر وارد کنید')
    .max(255, 'ایمیل نباید بیش از ۲۵۵ کاراکتر باشد'),
  subject: z
    .string()
    .max(120, 'موضوع نباید بیش از ۱۲۰ کاراکتر باشد')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'پیام باید حداقل ۱۰ کاراکتر باشد')
    .max(1500, 'پیام نباید بیش از ۱۵۰۰ کاراکتر باشد')
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Log the data (in production, this would be sent to server)
      console.log('Contact form submission:', {
        timestamp: new Date().toISOString(),
        ...data
      })

      setSubmitMessage({
        type: 'success',
        text: 'پیام شما با موفقیت ارسال شد.'
      })
      reset()
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'متأسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[#EFEFEF] shadow-sm p-6 md:p-8">
      <h3 className="text-xl font-semibold text-[#1A1A1A] mb-6">ارسال پیام</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#1A1A1A] mb-2">
            نام و نام خانوادگی
          </label>
          <input
            id="name"
            type="text"
            placeholder="نام و نام خانوادگی"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300/50 focus:border-[#E9B159] transition-colors text-[#1A1A1A]"
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A] mb-2">
            ایمیل
          </label>
          <input
            id="email"
            type="email"
            placeholder="ایمیل"
            {...register('email')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300/50 focus:border-[#E9B159] transition-colors text-[#1A1A1A]"
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-[#1A1A1A] mb-2">
            موضوع
          </label>
          <input
            id="subject"
            type="text"
            placeholder="موضوع"
            {...register('subject')}
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300/50 focus:border-[#E9B159] transition-colors text-[#1A1A1A]"
          />
          {errors.subject && (
            <p id="subject-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#1A1A1A] mb-2">
            پیام
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="پیام"
            {...register('message')}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-300/50 focus:border-[#E9B159] transition-colors resize-none text-[#1A1A1A]"
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="w-full bg-[#E9B159] hover:bg-[#d4a049] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              در حال ارسال...
            </>
          ) : (
            'ارسال پیام'
          )}
        </button>

        {/* Status Message */}
        {submitMessage && (
          <div
            className={`p-4 rounded-lg text-sm ${
              submitMessage.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
            role="status"
            aria-live="polite"
          >
            {submitMessage.text}
          </div>
        )}
      </form>
    </div>
  )
}