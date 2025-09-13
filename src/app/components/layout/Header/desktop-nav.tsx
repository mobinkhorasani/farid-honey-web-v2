'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mainNav } from '@/lib/nav'
import { cn } from '@/lib/utils'

export const DesktopNav = () => {
  const pathname = usePathname()

  return (
    <nav
      className="hidden md:flex items-center space-x-8 space-x-8"
    >
      {mainNav.map((item) => {
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-base font-medium transition-colors duration-200 focus:outline-none',
              isActive
                ? 'text-orange-600'
                : 'text-gray-700 hover:text-orange-600'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}