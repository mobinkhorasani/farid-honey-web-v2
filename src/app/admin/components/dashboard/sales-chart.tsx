'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SalesPoint } from '@/types/d.type'
import { TrendingUp } from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'


// فرمت عدد به فارسی
const moneyFa = (n: number) => n.toLocaleString('fa-IR')

type SalesChartProps = {
  data: SalesPoint[]
}

export const SalesChart = ({ data }: SalesChartProps) => {
  return (
    <Card className="rounded-3xl border-0 shadow-lg overflow-hidden">
      <CardHeader className="pb-3 sm:pb-4 bg-gradient-to-r from-amber-50 to-orange-50" dir="rtl">
        <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          نمودار فروش هفتگی
        </CardTitle>
      </CardHeader>

      {/* وسط‌چین و محدودیت عرض برای اینکه به لبه‌ها نچسبد */}
      <CardContent className="p-3 sm:p-5 flex items-center justify-center">
        <div className="w-full max-w-3xl h-64 sm:h-72 md:h-80 lg:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 16, bottom: 8, left: 16 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.06} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

              <XAxis
                dataKey="day"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
                interval="preserveStartEnd"
                minTickGap={18}
                tickMargin={8}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
                allowDecimals={false}
                width={72}
                tickFormatter={(v: number) => moneyFa(v)}
                tickMargin={8}
              />

              <Tooltip
                formatter={(value: number) => [`${moneyFa(value)} تومان`, 'درآمد']}
                labelFormatter={(l) => `روز: ${l}`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#F59E0B"
                strokeWidth={3}
                fill="url(#colorRevenue)"
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default SalesChart
