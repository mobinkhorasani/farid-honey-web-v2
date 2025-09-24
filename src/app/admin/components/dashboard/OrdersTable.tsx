'use client'

import { DashboardOrder } from '@/types/d.type'
import { ShoppingCart } from 'lucide-react'


export const OrdersTable = ({ orders }: { orders: DashboardOrder[] }) => {
  if (!orders.length) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl border-0 shadow-lg" dir="rtl">
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
          <ShoppingCart className="w-10 h-10 text-slate-400" />
        </div>
        <div className="text-slate-500 text-lg font-medium">هیچ سفارشی برای نمایش وجود ندارد</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl border-0 shadow-lg overflow-hidden" dir="rtl">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-slate-200">
              <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">کد سفارش</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">تاریخ</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">مبلغ کل</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">اطلاعات گیرنده</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">محصولات</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, index) => (
              <tr key={o.order_id} className={`border-b border-slate-100 hover:bg-gradient-to-r hover:from-amber-25 hover:to-orange-25 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                <td className="px-6 py-5">
                  <div className="font-mono text-sm font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg inline-block">
                    {o.order_id}
                  </div>
                </td>

                <td className="px-6 py-5 text-sm text-slate-600">
                  {o.created_at}
                </td>

                {/* مبلغ: یک ردیف با عدد + تومان */}
                <td className="px-6 py-5">
                  <div className="inline-flex items-center gap-1.5 font-bold text-lg text-amber-700 bg-amber-50 px-3 py-1 rounded-xl whitespace-nowrap">
                    <span>{o.total_price.toLocaleString('fa-IR')}</span>
                    <span className="text-sm">تومان</span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="space-y-1">
                    <div className="font-medium text-slate-800">{o.address?.receiver}</div>
                    <div className="text-xs text-slate-500 font-mono">{o.address?.phone_number}</div>
                    <div className="text-xs text-slate-400">{o.address?.city}</div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {o.items.map((it) => (
                      <div key={it.order_item_id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-xl px-3 py-2 text-xs">
                        <div className="font-medium text-slate-800 mb-1">{it.name}</div>
                        <div className="text-blue-600 font-semibold">× {it.quantity}</div>
                      </div>
                    ))}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
