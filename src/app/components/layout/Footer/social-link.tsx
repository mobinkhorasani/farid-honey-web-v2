import { Instagram, MessageCircle, X, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SocialLinkProps {
  href: string
  label: string
  icon: 'Instagram' | 'X' | 'Send' | 'MessageCircle'
  className?: string
}

const iconMap = {
  Instagram,
  X,
  Send,
  MessageCircle, 
} as const

export const SocialLink = ({ href, label, icon, className }: SocialLinkProps) => {
  const IconComponent = iconMap[icon]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-600 text-gray-300 hover:text-brand hover:border-brand transition-all duration-200 focus-ring',
        className
      )}
      aria-label={label}
      title={label}
    >
      <IconComponent className="w-5 h-5" aria-hidden="true" />
    </a>
  )
}