'use client'

import {
  OrdersTable,
} from './components/dashboard'
import { ShoppingCart } from 'lucide-react'
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/api/admin/adminSevices';
import { ErrorHandler } from '../components/error-handler';

export default function AdminDashboardPage() {
  const { token } = useAuth();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["Cart"],
    queryFn: () => getOrders(token ?? undefined),
    enabled: !!token
  });


  if (isError) {
    return (
      <ErrorHandler />
    )
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-800">جدول سفارش‌ها</h2>
        </div>
        <OrdersTable orders={data} isLoading={isLoading || isFetching} token={token ?? undefined}/>
      </div>
    </div>
  )
}
