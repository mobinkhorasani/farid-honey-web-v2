'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  textClassName?: string
  textSize?: 'sm' | 'base' | 'lg' | 'xl'
  src?: string
  width?: number
  height?: number
  priority?: boolean
  showText?: boolean
  hideTextOnMobile?: boolean
  textPosition?: 'left' | 'right'
  brandName?: string
  variant?: 'light' | 'dark'
}

export const Logo =({
  className,
  textClassName,
  textSize = 'xl',
  src = '/images/brand/logo.jpg',       
  width = 160,
  height = 44,
  priority = true,
  showText = true,
  hideTextOnMobile = false,
  textPosition = 'left',                
  brandName = 'عسل فرید',
  variant = 'dark',
}: LogoProps) => {
  const [imgError, setImgError] = useState(false)

  const sizeClasses = {
    sm: 'text-lg',
    base: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-2xl md:text-3xl',
  }

  const color = variant === 'light' ? 'text-white' : 'text-gray-900'


  const directionClass = textPosition === 'right' ? 'flex-row-reverse' : 'flex-row'

  return (
    <Link
      href="/"
      aria-label={showText ? undefined : 'بازگشت به صفحه اصلی عسل فرید'}
      className={cn('inline-flex items-center gap-3 shrink-0', directionClass, className)}
    >
      {!imgError && (
        <Image
          src={src}
          alt={brandName}
          width={width}
          height={height}
          priority={priority}
          onError={() => setImgError(true)}
          className="block h-10 w-auto md:h-11 select-none"
          sizes="(max-width: 768px) 140px, 180px"
        />
      )}

      {showText && (
        <span
          className={cn(
            'font-extrabold tracking-tight leading-none',
            color,
            sizeClasses[textSize],
            hideTextOnMobile && 'hidden sm:inline',
            textClassName
          )}
        >
          {brandName}
        </span>
      )}

      {!showText && !imgError && <span className="sr-only">{brandName}</span>}
      {imgError && !showText && (
        <span className={cn('font-extrabold tracking-tight', color, sizeClasses[textSize])}>
          {brandName}
        </span>
      )}
    </Link>
  )
}
