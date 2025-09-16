// app/contact/page.tsx
import { Metadata } from 'next'
import { ContactInfo, MapEmbed, FAQ } from './components'

export const metadata: Metadata = {
  title: 'تماس با ما | عسل فرید',
  description: 'راه‌های ارتباط با فروشگاه عسل فرید؛ آدرس، شماره تماس، ایمیل و فرم تماس.',
}

const ContactPage = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_80%_-10%,#E9B15922,transparent_60%)]"
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#1A1A1A] text-center">تماس با ما</h1>
          <p className="mt-3 text-sm md:text-base text-[#6B7280] text-center">
            هر سوالی دارید با ما تماس بگیرید — آدرس، شماره‌ها و مسیر روی نقشه در این صفحه است.
          </p>
        </div>
      </header>

      {/* 1) اطلاعات تماس (بالا) */}
      <section id="contact-info" className="py-10 sm:py-14 bg-[#F9F7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">اطلاعات تماس</h2>
          </div>
          <ContactInfo />
        </div>
      </section>

      {/* 2) نقشه (پایین) */}
      <section id="map" className="py-10 sm:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">موقعیت فروشگاه ما</h2>
            <p className="text-[#6B7280] text-sm mt-1">برای مشاهده و تعامل، روی نقشه کلیک کنید</p>
          </div>
          <MapEmbed />
        </div>
      </section>

      {/* 3) FAQ */}
      <section className="py-12 sm:py-16 bg-[#F9F7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">سوالات متداول</h2>
          </div>
          <FAQ />
        </div>
      </section>
    </div>
  )
}

export default ContactPage
