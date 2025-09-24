'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TopProduct } from '@/types/d.type'
import { Star } from 'lucide-react'


export const TopProducts = ({ items }: { items: TopProduct[] }) => {
  return (
    <Card className="rounded-3xl border-0 shadow-lg overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-emerald-50 to-green-50" dir="rtl">
        <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
          محصولات پرفروش
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4" dir="rtl">
        <div className="space-y-4">
          {items.map((p, index) => (
            <div key={p.name} className="relative group">
              <div className="flex items-center justify-between bg-gradient-to-r from-white to-slate-50 border border-slate-200/60 rounded-2xl p-4 group-hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800 mb-1">{p.name}</div>
                    <div className="text-xs text-slate-500">تعداد فروش: {p.qty.toLocaleString('fa-IR')}</div>
                  </div>
                </div>
                <div className="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
                  {p.revenue.toLocaleString('fa-IR')} تومان
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
