'use client'

import { Card, CardContent } from '@/components/ui/card'
import { DashboardOrder } from '@/types/d.type'
import { ShoppingCart, PackageOpen, DollarSign } from 'lucide-react'

interface StatsCardsProps {
  orders: DashboardOrder[]
}

export const StatsCards = ({ orders }: StatsCardsProps) => {
  const totalOrders = orders?.length || 0
  const totalItems = orders?.reduce((s, o) => s + o.items.reduce((a, it) => a + (it.quantity || 0), 0), 0) || 0
  const totalRevenue = orders?.reduce((s, o) => s + (o.total_price || 0), 0) || 0

  const stats = [
    { 
      label: 'تعداد سفارش‌ها', 
      value: totalOrders.toLocaleString('fa-IR'), 
      icon: ShoppingCart, 
      color: 'from-blue-500 to-blue-600', 
      bgColor: 'bg-blue-50', 
      textColor: 'text-blue-700' 
    },
    { 
      label: 'تعداد آیتم‌ها', 
      value: totalItems.toLocaleString('fa-IR'), 
      icon: PackageOpen, 
      color: 'from-green-500 to-green-600', 
      bgColor: 'bg-green-50', 
      textColor: 'text-green-700' 
    },
    { 
      label: 'مجموع درآمد', 
      value: `${totalRevenue.toLocaleString('fa-IR')} تومان`, 
      icon: DollarSign, 
      color: 'from-amber-500 to-amber-600', 
      bgColor: 'bg-amber-50', 
      textColor: 'text-amber-700' 
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" dir="rtl">
      {stats.map(({ label, value, icon: Icon, color, bgColor, textColor }) => (
        <Card 
          key={label} 
          className="rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          <CardContent className="p-0">
            <div className={`h-2 bg-gradient-to-r ${color} group-hover:h-3 transition-all duration-300`}></div>
            <div className="p-6 flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                <Icon className={`w-7 h-7 ${textColor}`} />
              </div>
              <div className="flex-1">
                <div className="text-slate-500 text-sm font-medium mb-1">{label}</div>
                <div className={`text-3xl font-black ${textColor} leading-none`}>{value}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}