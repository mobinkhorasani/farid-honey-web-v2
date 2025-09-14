// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format Persian phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\d{3})(\d{8})/, '$1-$2')
}

/**
 * Convert English numbers to Persian
 */
export function toPersianDigits(str: string): string {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹'
  const englishDigits = '0123456789'
  
  return str.replace(/[0-9]/g, (digit) => {
    return persianDigits[englishDigits.indexOf(digit)]
  })
}

/**
 * Slugify Persian text for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}