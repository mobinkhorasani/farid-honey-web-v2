
// app/contact/components/FAQ.tsx
'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqData = [
  {
    question: 'چگونه می‌توانم محصولات عسل فرید را سفارش دهم؟',
    answer: 'از طریق وب‌سایت و تماس تلفنی امکان ثبت سفارش وجود دارد. پس از ثبت، تیم پشتیبانی برای هماهنگی ارسال با شما تماس می‌گیرد.'
  },
  {
    question: 'هزینه ارسال محصولات به چه صورت است؟',
    answer: 'هزینه ارسال بر اساس شهر/وزن محاسبه می‌شود و در صفحه نهایی سفارش نمایش داده خواهد شد.'
  },
  {
    question: 'آیا امکان بازدید از کارگاه تولید عسل وجود دارد؟',
    answer: 'با هماهنگی قبلی برای گروه‌های محدود امکان‌پذیر است.'
  },
  {
    question: 'محصولات عسل فرید چه گواهینامه‌هایی دارند؟',
    answer: 'محصولات دارای مجوزهای بهداشتی و نتایج آزمایشگاهی معتبر هستند. جزئیات هر محصول در صفحه همان محصول درج می‌شود.'
  }
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="bg-white rounded-xl border border-[#EFEFEF] shadow-sm">
      <button
        className="w-full px-6 py-4 text-right flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-xl"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-[#1A1A1A] font-medium">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#6B7280] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4">
          <p className="text-[#6B7280] leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

export const FAQ =()=> {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqData.map((item, index) => (
        <FAQItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openItems.includes(index)}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  )
}