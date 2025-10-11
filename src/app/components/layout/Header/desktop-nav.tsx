'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { mainNav } from '@/lib/nav'
import { cn } from '@/lib/utils'
import { UserAuthButton } from '../userAuthButton'

export const DesktopNav = () => {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-8">
      {/* لینک‌های متنی */}
      {mainNav.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-base font-medium transition-colors duration-200 focus:outline-none',
              isActive ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.title}
          </Link>
        )
      })}

      {/* اکشن‌های آیکنی */}
      <div className="flex items-center gap-2 ms-4 ps-4 border-s border-gray-200">
        {/* دکمه سبد خرید */}
        <Link
          href="/cart"
          aria-label="سبد خرید"
          className={cn(
            'relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-orange-500/40',
            pathname === '/cart'
              ? 'bg-orange-50 text-orange-600'
              : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600'
          )}
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="sr-only">سبد خرید</span>
        </Link>
        
        {/* دکمه کاربر */}
        <UserAuthButton />
      </div>
    </nav>
  )
}

export default DesktopNav