import Link from 'next/link'
import { MapPin, Phone, Instagram, MessageCircle, Send } from 'lucide-react'
import { stores, quickLinks, socials } from '@/lib/stores'

const socialIcons = {
  Instagram,
  X: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Send,
  MessageCircle,
}

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

            <div>
              <h3 className="text-lg font-bold text-orange-400 mb-6">
                فروشگاه‌های ما
              </h3>
              <div className="space-y-6">
                {stores.map((store, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start space-x-3 space-3">
                      <MapPin className="w-4 h-4 mt-1 text-orange-400 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <div className="font-semibold text-white text-sm">
                          {store.city}
                        </div>
                        <div className="text-sm text-gray-300 leading-relaxed">
                          {store.address}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-2 mr-7">
                      <Phone className="w-4 h-4 text-orange-400" aria-hidden="true" />
                      <a
                        href={`tel:${store.phone}`}
                        className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200"
                        aria-label={`تماس با فروشگاه ${store.city}`}
                      >
                        {store.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div>
              <h3 className="text-lg font-bold text-orange-400 mb-6">
                دسترسی سریع
              </h3>
              <nav aria-label="لینک‌های سریع فوتر">
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm block py-1"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>


            <div>
              <h3 className="text-lg font-bold text-orange-400 mb-6">
                شبکه‌های اجتماعی
              </h3>
              <div className="flex items-center space-x-4 space-x-4">
                {socials.map((social) => {
                  const IconComponent = socialIcons[social.icon as keyof typeof socialIcons]
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:bg-gray-700 transition-all duration-200"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>


        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col items-center justify-center space-y-3">
            {/* متن کپی‌رایت */}
            <p className="text-xs text-gray-500">
              © ۱۴۰۲–۱۴۰۴ عسل فرید — تمامی حقوق محفوظ است.
            </p>

            {/* نماد اعتماد الکترونیکی */}
            <div
              dangerouslySetInnerHTML={{
                __html: `<a referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=984009&Code=PuYMX4XK8tTl9Nj3RWa8Rk4QM0IruFDI'><img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=984009&Code=PuYMX4XK8tTl9Nj3RWa8Rk4QM0IruFDI' alt='' style='cursor:pointer' code='PuYMX4XK8tTl9Nj3RWa8Rk4QM0IruFDI'></a>`,
              }}
            />
          </div>
        </div>

      </div>
    </footer>
  )
}