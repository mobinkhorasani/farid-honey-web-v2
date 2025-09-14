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

export const Logo = ({
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

  // تقسیم نام برند به دو بخش: (همهٔ کلمات به جز آخری) + (آخرین کلمه)
  const parts = brandName.trim().split(/\s+/)
  const mainText = parts.length > 1 ? parts.slice(0, -1).join(' ') : brandName
  const lastWord = parts.length > 1 ? parts[parts.length - 1] : ''

  const darkText = variant === 'light' ? 'text-white' : 'text-[#0B1321]' // مشکی متمایل به سرمه‌ای
  const goldText = 'text-[#F6D27A]' // طلایی مطابق خواست شما

  const directionClass =
    textPosition === 'right' ? 'flex-row-reverse' : 'flex-row'

  return (
    <Link
      href="/"
      aria-label={showText ? undefined : `بازگشت به صفحه اصلی ${brandName}`}
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
          dir="rtl"
          className={cn(
            'font-extrabold tracking-tight leading-none whitespace-nowrap',
            sizeClasses[textSize],
            hideTextOnMobile && 'hidden sm:inline',
            textClassName
          )}
        >
          <span className={darkText}>{mainText}</span>
          {lastWord && <> {' '}<span className={goldText}>{lastWord}</span></>}
        </span>
      )}

      {!showText && !imgError && <span className="sr-only">{brandName}</span>}

      {imgError && !showText && (
        <span
          dir="rtl"
          className={cn('font-extrabold tracking-tight leading-none whitespace-nowrap', sizeClasses[textSize])}
        >
          <span className={darkText}>{mainText}</span>
          {lastWord && <> {' '}<span className={goldText}>{lastWord}</span></>}
        </span>
      )}
    </Link>
  )
}
