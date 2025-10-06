'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Delete, DeleteIcon, ShoppingCart, Trash2 } from 'lucide-react'
import { DeleteOrderModal } from '../delete-order-modal'

export interface Order {
  id: string
  total_price: string
  province: string
  order_date: string
  order_time: string
  user: {
    id: string
    name: string
    phone_number: string
  }
}

interface OrdersTableProps {
  orders: Order[] | undefined
  isLoading?: boolean
  token : string | undefined
}

export const OrdersTable = ({ orders, isLoading , token }: OrdersTableProps) => {

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl border-0 shadow-lg p-6 space-y-4" dir="rtl">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-6 w-20 rounded-lg" />
            <Skeleton className="h-6 w-28 rounded-lg" />
            <Skeleton className="h-6 w-16 rounded-lg" />
            <Skeleton className="h-6 w-24 rounded-lg" />
            <Skeleton className="h-6 w-40 rounded-lg" />
            <Skeleton className="h-6 w-20 rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  if (!orders || orders.length === 0) {
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
              <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">ساعت</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">مبلغ کل</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">اطلاعات مشتری</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-slate-700">استان</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-slate-700"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`border-b border-slate-100 hover:bg-gradient-to-r hover:from-amber-25 hover:to-orange-25 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                  }`}
              >
                <td className="px-6 py-5">
                  <div className="font-mono text-sm font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg inline-block">
                    #{order.id}
                  </div>
                </td>

                <td className="px-6 py-5 text-sm text-slate-600">
                  {order.order_date}
                </td>

                <td className="px-6 py-5 text-sm text-slate-600">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">
                    {order.order_time}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="inline-flex items-center gap-1.5 font-bold text-lg text-amber-700 bg-amber-50 px-3 py-1 rounded-xl whitespace-nowrap">
                    <span>{order.total_price}</span>
                    <span className="text-sm">تومان</span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="space-y-1">
                    <div className="font-medium text-slate-800">{order.user.name}</div>
                    <div className="text-xs text-slate-500 font-mono">{order.user.phone_number}</div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 text-green-700 px-3 py-1 rounded-xl text-sm font-medium">
                    {order.province}
                  </span>
                </td>

                <td className="px-6 py-5">
                      <DeleteOrderModal order={order} token={token}/>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}