import { cn } from '@/lib/utils'

interface FooterColumnProps {
  title: string
  children: React.ReactNode
  className?: string
}

export default function FooterColumn({ title, children, className }: FooterColumnProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-bold text-brand">
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  )
}