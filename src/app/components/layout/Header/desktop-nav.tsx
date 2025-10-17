'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mainNav } from '@/lib/nav'
import { cn } from '@/lib/utils'
import { UserAuthButton } from '../userAuthButton'
import { CartIcon } from '../../cart-icon'

export const DesktopNav = () => {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-8">
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

      <div className="flex items-center gap-2 ms-4 ps-4 border-s border-gray-200">
        <CartIcon variant="desktop" />
        
        <UserAuthButton />
      </div>
    </nav>
  )
}