'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const tel = (s: string) => s.replace(/\D/g, '');

export const ContactInfo = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      setCopied(null);
    }
  };

  
  const phones = [
    { display: '۰۲۶-۳۲۷۰۱۰۱۵', link: '02632701015' },
    { display: '۰۲۶-۳۲۷۰۸۴۳۴', link: '02632708434' },
    { display: '۰۲۶-۳۶۲۱۰۸۸۲', link: '02636210882' },
  ];

  const email = 'info@faridhoney.com';
  const addressDisplay = 'کرج، بلوار طالقانی جنوبی، ابتدای خیابان قیام — فروشگاه عسل فرید';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
     
      <div className="group bg-white rounded-xl border border-[#EFEFEF] hover:border-amber-200 transition-shadow shadow-sm hover:shadow-md p-6 md:p-7">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center ring-1 ring-amber-100">
            <MapPin className="w-6 h-6 text-[#E9B159]" />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-semibold text-[#1A1A1A] mb-2">آدرس فروشگاه اصلی</h3>
            <address className="not-italic text-[#6B7280] leading-relaxed mb-3">{addressDisplay}</address>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={() => handleCopy(addressDisplay)}
              >
                {copied === addressDisplay ? <Check className="w-4 h-4 ms-1" /> : <Copy className="w-4 h-4 ms-1" />}
                {copied === addressDisplay ? 'کپی شد' : 'کپی آدرس'}
              </Button>
              <Button asChild size="sm" className="rounded-lg bg-[#E9B159] hover:bg-[#E9B159]/90 text-white">
                <a
                  href="https://www.google.com/maps/place/%D8%B9%D8%B3%D9%84+%D9%81%D8%B1%DB%8C%D8%AF"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  مشاهده در نقشه
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

     
      <div className="group bg-white rounded-xl border border-[#EFEFEF] hover:border-amber-200 transition-shadow shadow-sm hover:shadow-md p-6 md:p-7">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center ring-1 ring-amber-100">
            <Phone className="w-6 h-6 text-[#E9B159]" />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-semibold text-[#1A1A1A] mb-3">شماره تماس</h3>
            <div className="space-y-2">
              {phones.map((p) => (
                <div key={p.link} className="flex items-center justify-between gap-3">
                  <a
                    className="text-[#1A1A1A] font-mono tracking-wide hover:text-[#E9B159] transition-colors"
                    href={`tel:${tel(p.link)}`}
                  >
                    {p.display}
                  </a>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-lg w-8 h-8"
                    aria-label={`کپی ${p.display}`}
                    onClick={() => handleCopy(p.link)}
                  >
                    {copied === p.link ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
      <div className="group bg-white rounded-xl border border-[#EFEFEF] hover:border-amber-200 transition-shadow shadow-sm hover:shadow-md p-6 md:p-7">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center ring-1 ring-amber-100">
            <Mail className="w-6 h-6 text-[#E9B159]" />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-semibold text-[#1A1A1A] mb-3">ایمیل</h3>
            <div className="flex items-center justify-between gap-3">
              <a
                className="text-[#6B7280] font-mono hover:text-[#E9B159] transition-colors"
                href={`mailto:${email}`}
              >
                {email}
              </a>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-lg w-8 h-8"
                aria-label="کپی ایمیل"
                onClick={() => handleCopy(email)}
              >
                {copied === email ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

     
      <div className="group bg-white rounded-xl border border-[#EFEFEF] hover:border-amber-200 transition-shadow shadow-sm hover:shadow-md p-6 md:p-7">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center ring-1 ring-amber-100">
            <Clock className="w-6 h-6 text-[#E9B159]" />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-semibold text-[#1A1A1A] mb-3">ساعات کاری</h3>
            <div className="divide-y divide-gray-100">
              <div className="flex items-center justify-between py-2">
                <span className="text-[#1A1A1A]">شنبه تا چهارشنبه</span>
                <span className="text-[#6B7280]">۸ صبح تا ۹ عصر</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[#1A1A1A]">پنجشنبه</span>
                <span className="text-[#6B7280]">۸ صبح تا ۲ بعدازظهر</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[#1A1A1A]">جمعه</span>
                <span className="text-red-600">تعطیل</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
