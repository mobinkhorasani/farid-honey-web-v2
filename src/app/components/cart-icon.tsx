'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCartCount } from '../hooks/useCartCount'

interface CartIconProps {
  variant?: 'desktop' | 'mobile'
  className?: string
}

const toEnglishDigits = (input: unknown) => {
  const s = String(input ?? '')
  const fa = '۰۱۲۳۴۵۶۷۸۹'
  const ar = '٠١٢٣٤٥٦٧٨٩'
  return s
    .replace(/[۰-۹]/g, (d) => String(fa.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ar.indexOf(d)))
}

export const CartIcon = ({ variant = 'desktop', className }: CartIconProps) => {
  const pathname = usePathname()
  const { data: cartData } = useCartCount()

  const itemsCount = Array.isArray(cartData?.products)
    ? cartData!.products.reduce((total: number, item: any) => {
      const qtyStr = item?.quantity ?? 1
      const qty = parseInt(toEnglishDigits(qtyStr), 10)
      return total + (Number.isFinite(qty) ? qty : 0)
    }, 0)
    : 0

  const isActive = pathname === '/cart'

  const buttonClasses =
    variant === 'desktop'
      ? cn(
        'relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-amber-500/40',
        isActive
          ? 'bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700'
          : 'text-gray-700 hover:bg-amber-50 hover:text-amber-600',
        className
      )
      : cn(
        'relative inline-flex items-center justify-center w-10 h-10 rounded-lg',
        'text-gray-800 hover:bg-amber-100 transition-colors focus:outline-none',
        isActive && 'bg-gradient-to-br from-amber-100 to-orange-100',
        className
      )

  return (
    <Link
      href="/cart"
      aria-label={`سبد خرید${itemsCount > 0 ? ` (${itemsCount} آیتم)` : ''}`}
      className={buttonClasses}
    >
      <ShoppingCart className={variant === 'desktop' ? 'w-5 h-5' : 'w-6 h-6'} />

      {itemsCount > 0 && (
        <span
          className={cn(
            'absolute -top-1 -right-1 flex items-center justify-center',
            'min-w-[20px] h-5 px-1',
            'rounded-full bg-gradient-to-r from-amber-500 to-orange-500',
            'text-white text-xs font-bold',
            'shadow-lg ring-2 ring-white'
          )}
        >
          {itemsCount > 99 ? '99+' : itemsCount}
        </span>
      )}

      <span className="sr-only">
        سبد خرید {itemsCount > 0 && `(${itemsCount} آیتم)`}
      </span>
    </Link>
  )
}
