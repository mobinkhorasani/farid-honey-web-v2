'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mainNav, actionNav } from '@/lib/nav'
import { cn } from '@/lib/utils'

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

      {/* اکشن‌های آیکنی — بدون بردر دور آیکن‌ها */}
      <div className="flex items-center gap-2 ms-4 ps-4 border-s border-gray-200">
        {actionNav.map(({ href, title, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              aria-label={title}
              className={cn(
                'relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-orange-500/40',
                isActive
                  ? 'bg-orange-50 text-orange-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="sr-only">{title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default DesktopNav
