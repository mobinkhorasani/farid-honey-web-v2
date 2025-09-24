'use client'

import { useMemo, useState } from 'react'
import {
  StatsCards,
  SalesChart,
  TopProducts,
  OrdersTable,
  type DashboardOrder,
  type SalesPoint,
  type TopProduct
} from './components/dashboard'
import { ShoppingCart } from 'lucide-react'

export default function AdminDashboardPage() {
  const [q, setQ] = useState('')

  const orders: DashboardOrder[] = useMemo(() => [
    {
      order_id: '100045',
      total_price: 2320000,
      created_at: '۱۴۰۴/۰۷/۰۱ ۱۰:۴۵',
      address: { province: 'البرز', city: 'کرج', address: '...', receiver: 'تیمور خان', phone_number: '۰۹۱۲۳۶۰۵۹۲۲' },
      items: [
        { order_item_id: '1', product_id: '11', name: 'لنت ترمز جلو', price: 950000, quantity: 1 },
        { order_item_id: '2', product_id: '22', name: 'روغن موتور ۵W-30', price: 680000, quantity: 2 },
      ],
    },
    {
      order_id: '100046',
      total_price: 1580000,
      created_at: '۱۴۰۴/۰۷/۰۲ ۱۲:۱۰',
      address: { province: 'تهران', city: 'تهران', address: '...', receiver: 'علی خلیلی', phone_number: '۰۹۳۵۶۴۳۲۱۰۹' },
      items: [
        { order_item_id: '3', product_id: '33', name: 'فیلتر هوا', price: 280000, quantity: 1 },
        { order_item_id: '4', product_id: '44', name: 'تیغه برف‌پاک‌کن', price: 450000, quantity: 2 },
      ],
    },
    {
      order_id: '100047',
      total_price: 1980000,
      created_at: '۱۴۰۴/۰۷/۰۳ ۱۱:۲۰',
      address: { province: 'تهران', city: 'تهران', address: '...', receiver: 'سحر احمدی', phone_number: '۰۹۱۲۱۱۱۱۲۲۲' },
      items: [
        { order_item_id: '5', product_id: '55', name: 'فیلتر روغن', price: 320000, quantity: 1 },
        { order_item_id: '6', product_id: '66', name: 'روغن موتور ۵W-30', price: 680000, quantity: 2 },
      ],
    },
  ], [])

  const filtered = useMemo(() => {
    if (!q.trim()) return orders
    const qq = q.trim()
    return orders.filter(o =>
      o.order_id.includes(qq) ||
      o.address?.receiver?.includes(qq) ||
      o.address?.phone_number?.includes(qq)
    )
  }, [orders, q])

  const salesWeekly: SalesPoint[] = [
    { day: 'ش', revenue: 1800000, orders: 8 },
    { day: 'ی', revenue: 2100000, orders: 10 },
    { day: 'د', revenue: 1400000, orders: 6 },
    { day: 'س', revenue: 2600000, orders: 12 },
    { day: 'چ', revenue: 3100000, orders: 14 },
    { day: 'پ', revenue: 2200000, orders: 9 },
    { day: 'ج', revenue: 2850000, orders: 11 },
  ]

  const topProducts: TopProduct[] = [
    { name: 'روغن موتور ۵W-30', qty: 5, revenue: 3400000 },
    { name: 'تیغه برف‌پاک‌کن', qty: 4, revenue: 1800000 },
    { name: 'فیلتر هوا', qty: 3, revenue: 840000 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 p-4 sm:p-6" dir="rtl">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-black text-slate-800">داشبورد مدیریتی</div>
              <div className="text-xs sm:text-sm text-slate-500">پنل کنترل فروشگاه</div>
            </div>
          </div>
          <div className="hidden sm:block bg-amber-50 text-amber-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-medium border border-amber-200">
            نسخهٔ UI – بدون گارد
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* فیلتر بالا */}

        {/* کارت‌های آماری */}
        <StatsCards orders={filtered} />

        {/* نمودار فروش هفتگی – یک ردیف کامل */}
        <section>
          <SalesChart data={salesWeekly} />
        </section>

        {/* محصولات پرفروش (زیر نمودار) */}
        <section className="space-y-6" dir="rtl">
          <TopProducts items={topProducts} />
        </section>

        {/* جدول سفارش‌ها */}
        <section className="space-y-4 sm:space-y-6" dir="rtl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-800">جدول سفارش‌ها</h2>
          </div>
          {/* جدول خودش overflow-x دارد و در موبایل اسکرول افقی فعال می‌شود */}
          <OrdersTable orders={filtered} />
        </section>
      </main>
    </div>
  )
}
