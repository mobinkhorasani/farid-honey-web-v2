// app/contact/page.tsx
import { Metadata } from 'next'
import { ContactForm, ContactInfo, MapEmbed, FAQ } from './components'

export const metadata: Metadata = {
  title: 'تماس با ما | عسل فرید',
  description: 'راه‌های ارتباط با فروشگاه عسل فرید؛ آدرس، شماره تماس، ایمیل و فرم تماس.',
}

export default function ContactPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* Main Contact Section */}
      <section className="py-14 bg-[#F9F7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form - Right Column */}
            <div className="order-1 lg:order-1">
              <ContactForm />
            </div>
            
            {/* Contact Information - Left Column */}
            <div className="order-2 lg:order-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">
              موقعیت فروشگاه‌ ما
            </h2>
          </div>
          <MapEmbed />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 bg-[#F9F7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">
              سوالات متداول
            </h2>
          </div>
          <FAQ />
        </div>
      </section>
    </div>
  )
}