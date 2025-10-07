import './globals.css'
import { Vazirmatn } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { HeaderWrapper } from './components/layout/Header'
<<<<<<< HEAD
import { Footer } from './components/layout/Footer'
=======
import { FooterWrapper } from './components/layout/FooterWrapper'
>>>>>>> 26b2d0c35b0e3717a9501efd6b66c33dacfd9295
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/context/authContext'


const vazirmatn = Vazirmatn({
  subsets: ['latin', 'arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'عسل فرید - بهترین عسل طبیعی ایران',
  description: 'فروشگاه عسل فرید، تولید و فروش بهترین انواع عسل طبیعی و خالص ایرانی با کیفیت بالا و قیمت مناسب',
  keywords: ['عسل', 'عسل طبیعی', 'عسل خالص', 'عسل ایرانی', 'فروشگاه عسل', 'عسل فرید'],
  authors: [{ name: 'عسل فرید' }],
  creator: 'عسل فرید',
  publisher: 'عسل فرید',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://example.com',
    title: 'عسل فرید - بهترین عسل طبیعی ایران',
    description: 'فروشگاه عسل فرید، تولید و فروش بهترین انواع عسل طبیعی و خالص ایرانی',
    siteName: 'عسل فرید',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'عسل فرید - بهترین عسل طبیعی ایران',
    description: 'فروشگاه عسل فرید، تولید و فروش بهترین انواع عسل طبیعی و خالص ایرانی',
  },
  icons: {
    icon: "/favicon/logo.png",
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E9B159',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className={`${vazirmatn.className} font-sans antialiased bg-gray-50 text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          <ReactQueryProvider>
            <AuthProvider>
              <HeaderWrapper />
              <main className="flex-1">
                {children}
              </main>
            </AuthProvider>
          </ReactQueryProvider>
          <FooterWrapper />
        </div>
        <Toaster />
      </body>
    </html>
  )
}