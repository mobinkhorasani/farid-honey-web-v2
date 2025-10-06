'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Phone, MapPin, Edit2, LogOut, ShoppingBag, User, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { bounceIn, fadeIn, fadeInUp, scaleIn, stagger } from '@/components/motion/variants'

// --- Sample User Data
const initialUser = {
  name: 'علی رضایی',
  phone: '09123456789',
  address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
  joinDate: '1402/07/15',
  level: 'طلایی',
  totalOrders: 47,
  favorites: 12,
}

// --- Recent Orders
const recentOrders = [
  { id: '#1234', date: '1402/10/25', status: 'تحویل داده شده', amount: '۴۵۰,۰۰۰', product: 'عسل گون طبیعی', weight: '۱ کیلوگرم' },
  { id: '#1233', date: '1402/10/20', status: 'در حال ارسال', amount: '۳۲۰,۰۰۰', product: 'عسل چهل گیاه', weight: '۵۰۰ گرم' },
  { id: '#1232', date: '1402/10/15', status: 'آماده ارسال', amount: '۵۸۰,۰۰۰', product: 'عسل کنار', weight: '۷۵۰ گرم' },
  { id: '#1231', date: '1402/10/10', status: 'تحویل داده شده', amount: '۸۹۰,۰۰۰', product: 'پک ویژه عسل و ژل رویال', weight: '۲ کیلوگرم' },
]

// --- Catalog (نمونه)
const catalog = [
  { name: 'عسل گشنیز ممتاز', price: '۳۹۰,۰۰۰' },
  { name: 'عسل مرکبات ارگانیک', price: '۴۵۰,۰۰۰' },
  { name: 'گرده گل طبیعی', price: '۳۲۰,۰۰۰' },
  { name: 'عسل وحشی کوهستان', price: '۷۸۰,۰۰۰' },
]

// پالت عسلی کمی پررنگ‌تر ولی همچنان ملایم
const softBg   = 'linear-gradient(135deg, #FFF7EA 0%, #FEF1DA 50%, #FCEBD0 100%)'
const softHoney= 'linear-gradient(135deg, #F3DCB0 0%, #E8C178 50%, #D8A24A 100%)'
const softBar  = 'linear-gradient(90deg, #E9CC94 0%, #E0B567 50%, #C48F39 100%)'

export default function HoneyShopProfile() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState(initialUser)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ name: user.name, phone: user.phone, address: user.address })

  const favoriteByOrders = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const o of recentOrders) counts[o.product] = (counts[o.product] ?? 0) + 1
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))
  }, [])

  const suggestions = useMemo(() => {
    const topFavs = favoriteByOrders.slice(0, 2).map(f => ({ name: f.name, reason: 'بر اساس خریدهای اخیر' }))
    const fill = catalog.slice(0, Math.max(0, 3 - topFavs.length)).map(c => ({ name: c.name, reason: 'پیشنهاد فروشگاه' }))
    return [...topFavs, ...fill]
  }, [favoriteByOrders])

  const handleSave = () => {
    setUser(prev => ({ ...prev, ...form }))
    setEditMode(false)
  }

  const handleLogout = () => {
    try { localStorage.removeItem('token') } catch {}
    router.push('/login')
  }

  return (
    <div className="min-h-screen" style={{ background: softBg }}>
      {/* Header */}
      <motion.div initial="hidden" animate="show" variants={fadeIn} className="relative overflow-hidden pb-16 sm:pb-24" style={{ background: softHoney }}>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50V16l28-16 28 16v34L28 66z' fill='none' stroke='%23ffffff' stroke-width='1.2'/%3E%3C/svg%3E")`,
              backgroundSize: '56px 100px',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-3 sm:px-4 pt-4 sm:pt-8">
          <div className="flex justify-start items-center mb-4 sm:mb-6">
            <motion.div variants={scaleIn} className="flex gap-2 sm:gap-3">
              <Button asChild className="h-10 sm:h-11 rounded-full shadow-sm text-gray-900 border border-amber-300 bg-white/80 hover:bg-white px-3 sm:px-4">
                <Link href="/products" className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">محصولات</span>
                </Link>
              </Button>
              <Button onClick={handleLogout} className="h-10 sm:h-11 rounded-full bg-white/75 text-gray-800 border border-amber-300 hover:bg-white px-3 sm:px-4" variant="outline" title="خروج">
                <LogOut className="w-4 h-4 ml-0.5 sm:ml-1" />
                <span className="hidden sm:inline">خروج</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main */}
      <div className="relative z-10 -mt-12 sm:-mt-20 mx-auto max-w-5xl px-3 sm:px-4">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          {/* Profile Card */}
          <motion.div variants={fadeInUp}>
            <Card className="mb-4 sm:mb-6 shadow-xl border border-amber-300/40 overflow-hidden bg-white/95 rounded-2xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6">
                  <motion.div variants={bounceIn} className="w-full">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-amber-800" />
                        {!editMode ? (
                          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{user.name}</h1>
                        ) : (
                          <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="h-10 text-base md:text-lg" placeholder="نام" />
                        )}
                      </div>
                      <Button size="icon" onClick={() => setEditMode(v => !v)} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-300 bg-white hover:bg-amber-50" title={editMode ? 'لغو ویرایش' : 'ویرایش'}>
                        <Edit2 className="w-4 h-4 text-amber-900" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-5">
                      <div className="flex items-center gap-2 text-gray-900 p-2.5 sm:p-3 rounded-xl bg-amber-50/70 border border-amber-300/70">
                        <Phone className="w-4 h-4 text-amber-800" />
                        {!editMode ? (
                          <span className="text-[13px] sm:text-sm" dir="ltr">{user.phone}</span>
                        ) : (
                          <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} dir="ltr" placeholder="شماره تماس" className="h-10" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-gray-900 p-2.5 sm:p-3 rounded-xl bg-amber-50/70 border border-amber-300/70">
                        <MapPin className="w-4 h-4 text-amber-800" />
                        {!editMode ? (
                          <span className="text-[13px] sm:text-sm">{user.address}</span>
                        ) : (
                          <Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="آدرس" className="h-10" />
                        )}
                      </div>
                    </div>

                    {editMode && (
                      <div className="mt-3 sm:mt-4 flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => { setForm({ name: user.name, phone: user.phone, address: user.address }); setEditMode(false) }} className="h-10 rounded-full border border-amber-300 text-gray-900 bg-white hover:bg-amber-50 px-4 sm:px-5">
                          لغو
                        </Button>
                        <Button onClick={handleSave} className="h-10 rounded-full text-gray-900 bg-amber-200 hover:bg-amber-300 border border-amber-300 px-4 sm:px-5">
                          ذخیره تغییرات
                        </Button>
                      </div>
                    )}

                    <div className="mt-4 sm:mt-6 grid grid-cols-12">
                      <div className="col-span-12 sm:col-span-4 md:col-span-3 rounded-2xl p-3 sm:p-4 bg-white border border-amber-300/70">
                        <div className="text-xs text-gray-600">کل سفارش‌ها</div>
                        <div className="font-bold text-gray-900 mt-1 text-lg sm:text-xl">{user.totalOrders.toLocaleString('fa-IR')}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={fadeInUp}>
            <Card className="shadow-lg border border-amber-300/40 bg-white/95 rounded-2xl">
              <CardContent className="p-3 sm:p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
                  {/* نوار تب‌ها: فقط flex + اسکرول افقی در موبایل */}
                  <div className="relative -mx-3 sm:mx-0">
                    <div className="overflow-x-auto no-scrollbar scroll-smooth px-3 sm:px-0">
                      <TabsList className="flex items-stretch gap-1 bg-amber-50/80 border border-amber-300 rounded-full p-1 w-max sm:w-full">
                        {[
                          { val: 'overview', label: 'نمای کلی' },
                          { val: 'orders', label: 'سفارشات اخیر' },
                          { val: 'favorites', label: 'علاقه‌مندی‌ها' },
                        ].map(t => (
                          <TabsTrigger
                            key={t.val}
                            value={t.val}
                            className="
                              inline-flex items-center justify-center
                              px-4 py-2 text-sm font-medium whitespace-nowrap select-none
                              text-gray-900 hover:text-amber-900
                              data-[state=active]:bg-white data-[state=active]:text-amber-900
                              data-[state=active]:shadow-sm
                              focus-visible:ring-0 focus:outline-none border-0
                              rounded-full
                              min-w-[120px]
                              md:min-w-0 md:basis-1/3 md:grow
                              snap-start
                            "
                          >
                            {t.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                  </div>

                  {/* Overview */}
                  <TabsContent value="overview" className="mt-4 sm:mt-6">
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 items-stretch">
                      {/* Suggestions */}
                      <div className="rounded-2xl border border-amber-300 bg-white p-4 sm:p-5 flex flex-col">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          <Star className="w-5 h-5 text-amber-900" />
                          <h3 className="font-bold text-gray-900 text-base sm:text-lg">پیشنهاد خرید برای شما</h3>
                        </div>
                        <div className="space-y-2.5 sm:space-y-3">
                          {suggestions.map((s, i) => (
                            <div key={i} className="flex items-center justify-between rounded-2xl border border-amber-300 bg-amber-50/70 p-3">
                              <div>
                                <div className="font-medium text-gray-900 text-[15px] sm:text-base">{s.name}</div>
                                <div className="text-xs text-gray-700">{s.reason}</div>
                              </div>
                              <Button asChild size="sm" className="h-9 rounded-full bg-amber-200 hover:bg-amber-300 text-gray-900 border border-amber-300 px-3">
                                <Link href={`/products?highlight=${encodeURIComponent(s.name)}`}>مشاهده</Link>
                              </Button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 sm:mt-4 text-left">
                          <Button asChild variant="ghost" className="h-9 rounded-full text-amber-900 hover:bg-amber-50 px-3">
                            <Link href="/products">مشاهده همه محصولات</Link>
                          </Button>
                        </div>
                      </div>

                      {/* Quick CTA */}
                      <div className="rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50/90 to-amber-100/70 p-4 sm:p-5 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold mb-1.5 sm:mb-2 text-gray-900 text-base sm:text-lg">سریع به محصولات برو</h3>
                          <p className="text-sm text-gray-800 mb-3 sm:mb-4">انواع عسل‌های ویژه با تخفیف‌های دوره‌ای</p>
                        </div>
                        <div>
                          <Button asChild className="h-10 sm:h-11 rounded-full bg-amber-200 hover:bg-amber-300 text-gray-900 border border-amber-300 px-5 sm:px-6">
                            <Link href="/products" className="flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4" />
                              <span className="hidden xs:inline">مشاهده محصولات</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Orders */}
                  <TabsContent value="orders" className="mt-4 sm:mt-6">
                    <div className="space-y-2.5 sm:space-y-3">
                      {recentOrders.map((o) => (
                        <div key={o.id} className="rounded-2xl border border-amber-300 bg-white p-3 sm:p-4 flex flex-col md:flex-row md:items-center gap-1.5 sm:gap-2 md:gap-4">
                          <div className="font-bold text-gray-900 text-[15px] sm:text-base">{o.product}</div>
                          <div className="text-sm text-gray-700">{o.weight}</div>
                          <div className="text-sm text-gray-900 md:ml-auto order-last md:order-none">{o.amount} تومان</div>
                          <div className="text-xs text-gray-700">تاریخ: {o.date}</div>
                          <div className="text-[11px] sm:text-xs rounded-full px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 w-max">
                            {o.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Favorites */}
                  <TabsContent value="favorites" className="mt-4 sm:mt-6">
                    <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
                      {favoriteByOrders.length === 0 && (
                        <div className="text-sm text-gray-800">فعلاً محصولی در علاقه‌مندی‌ها یافت نشد.</div>
                      )}
                      {favoriteByOrders.map((f) => (
                        <div key={f.name} className="rounded-2xl border border-amber-300 bg-white p-3 sm:p-4 flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900 text-[15px] sm:text-base">{f.name}</div>
                            <div className="text-xs text-gray-700">تعداد سفارش: {f.count.toLocaleString('fa-IR')}</div>
                          </div>
                          <Button asChild size="sm" className="h-9 rounded-full bg-amber-200 hover:bg-amber-300 text-gray-900 border border-amber-300 px-3">
                            <Link href={`/products?search=${encodeURIComponent(f.name)}`}>خرید مجدد</Link>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
