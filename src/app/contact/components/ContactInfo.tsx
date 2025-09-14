
// app/contact/components/ContactInfo.tsx
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Store Address */}
      <div className="bg-white rounded-xl border border-[#EFEFEF] shadow-sm p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-[#E9B159]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">
              آدرس فروشگاه اصلی
            </h3>
            <p className="text-[#6B7280] leading-relaxed">
              کرج، بلوار طالقانی جنوبی، ابتدای خیابان قیام — فروشگاه عسل فرید
            </p>
          </div>
        </div>
      </div>

      {/* Phone Numbers */}
      <div className="bg-white rounded-xl border border-[#EFEFEF] shadow-sm p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
            <Phone className="w-6 h-6 text-[#E9B159]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">
              شماره تماس
            </h3>
            <div className="space-y-2">
              <p className="text-[#6B7280] font-mono">۰۲۶-۳۲۷۰۱۰۱۵</p>
              <p className="text-[#6B7280] font-mono">۰۲۶-۳۲۷۰۸۴۳۴</p>
              <p className="text-[#6B7280] font-mono">۰۲۶-۳۶۲۱۰۸۸۲</p>
            </div>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="bg-white rounded-xl border border-[#EFEFEF] shadow-sm p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
            <Mail className="w-6 h-6 text-[#E9B159]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">
              ایمیل
            </h3>
            <p className="text-[#6B7280] font-mono">info@faridhoney.com</p>
          </div>
        </div>
      </div>

      {/* Working Hours */}
      <div className="bg-white rounded-xl border border-[#EFEFEF] shadow-sm p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-[#E9B159]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">
              ساعات کاری
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#1A1A1A]">شنبه تا چهارشنبه:</span>
                <span className="text-[#6B7280]">۸ صبح تا ۹ عصر</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1A1A1A]">پنجشنبه:</span>
                <span className="text-[#6B7280]">۸ صبح تا ۲ بعدازظهر</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1A1A1A]">جمعه:</span>
                <span className="text-red-600">تعطیل</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}