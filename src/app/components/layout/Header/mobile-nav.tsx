'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { MobileSidebar } from '../mobile-sidebar'
import { UserAuthButton } from '../user-auth-button'
import { CartIcon } from '../../cart-icon'

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setIsOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div className="md:hidden flex items-center gap-2">
      <CartIcon variant="mobile" />

      <UserAuthButton />

      <button
        type="button"
        aria-label={isOpen ? 'بستن منو' : 'باز کردن منو'}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <Menu className="w-6 h-6" />
      </button>

      <MobileSidebar 
        pathname={pathname} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </div>
  )
}