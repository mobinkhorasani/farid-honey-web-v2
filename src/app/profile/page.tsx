'use client'

import React, { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Phone, MapPin, Edit2, LogOut, ShoppingBag, User, Star, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { bounceIn, fadeIn, fadeInUp, scaleIn, stagger } from '@/components/motion/variants'
import { toast } from 'sonner'
import { editUser, getUserInfo } from '@/api/users/userServices'
import { useAuth } from '@/context/authContext'


const softBg = 'linear-gradient(135deg, #FFF7EA 0%, #FEF1DA 50%, #FCEBD0 100%)'
const softHoney = 'linear-gradient(135deg, #F3DCB0 0%, #E8C178 50%, #D8A24A 100%)'

export default function HoneyShopProfile() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { token, logout, user: authUser } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '' })

  // دریافت اطلاعات کاربر از API
  const { data: apiResponse, isLoading, isError, error } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(token ?? undefined),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!token,
  })

  // استخراج user از response
  const userData = apiResponse?.user || apiResponse

  // Mutation برای ویرایش اطلاعات کاربر
  const editMutation = useMutation({
    mutationFn: (updatedData: any) => editUser(updatedData, token ?? undefined),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] })
      setEditMode(false)
      toast.success('اطلاعات با موفقیت به‌روزرسانی شد')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'خطا در به‌روزرسانی اطلاعات')
    },
  })

  // تنظیم فرم
  useEffect(() => {
    const user = userData || authUser
    if (user) {
      console.log('Setting form with user:', user)
      setForm({
        name: user.name || user.fullName || '',
        phone: user.phone || user.phone_number || user.phoneNumber || '',
        address: user.address || '',
      })
    }
  }, [userData, authUser])

  // Debug
  useEffect(() => {
    console.log('Token:', token)
    console.log('Auth User:', authUser)
    console.log('API Response:', apiResponse)
    console.log('User Data:', userData)
    console.log('Form:', form)
  }, [token, authUser, apiResponse, userData, form])

  // محاسبه محصولات محبوب
  const favoriteProducts = useMemo(() => {
    if (!userData?.orders || userData.orders.length === 0) return []
    
    const counts: Record<string, { count: number; product: any }> = {}
    
    userData.orders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        const productName = item.product?.name || item.productName || 'محصول'
        if (!counts[productName]) {
          counts[productName] = { count: 0, product: item.product }
        }
        counts[productName].count += item.quantity || 1
      })
    })
    
    return Object.entries(counts)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([name, data]) => ({ name, count: data.count, product: data.product }))
  }, [userData?.orders])

  // پیشنهادات خرید
  const suggestions = useMemo(() => {
    const topFavorites = favoriteProducts
      .slice(0, 3)
      .map(f => ({ 
        name: f.name, 
        reason: 'بر اساس خریدهای اخیر',
        productId: f.product?._id || f.product?.id
      }))
    
    return topFavorites
  }, [favoriteProducts])

  const handleSave = () => {
    const currentUser = userData || authUser
    const updatedData: any = {}
    
    if (form.name !== (currentUser?.name || currentUser?.fullName)) {
      updatedData.name = form.name
    }
    if (form.phone !== (currentUser?.phone || currentUser?.phone_number || currentUser?.phoneNumber)) {
      updatedData.phone = form.phone
    }
    if (form.address !== currentUser?.address) {
      updatedData.address = form.address
    }

    console.log('Saving data:', updatedData)

    if (Object.keys(updatedData).length > 0) {
      editMutation.mutate(updatedData)
    } else {
      setEditMode(false)
      toast.info('هیچ تغییری اعمال نشد')
    }
  }

  const handleLogout = () => {
    logout()
    queryClient.clear()
    router.push('/auth/login')
  }

  // نمایش لودینگ
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: softBg }}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-amber-800 mx-auto mb-4" />
          <p className="text-gray-900">در حال بارگذاری اطلاعات...</p>
        </div>
      </div>
    )
  }

  // اگر توکن نیست
  if (!token) {
    return null
  }

  // نمایش خطا
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: softBg }}>
        <Card className="max-w-md mx-4 border border-red-300">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-red-800 mb-2">خطا در دریافت اطلاعات</h2>
            <p className="text-gray-700 mb-4">{(error as any)?.message || 'لطفاً دوباره تلاش کنید'}</p>
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => queryClient.invalidateQueries({ queryKey: ['userInfo'] })}
                className="rounded-full"
              >
                تلاش مجدد
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="rounded-full"
              >
                خروج
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // استفاده از userData اگر موجود است، در غیر این صورت از authUser
  const user = userData || authUser || {}
  const totalOrders = user.totalOrders || user.ordersCount || user.orders?.length || 0
  const recentOrders = user.orders?.slice(0, 4) || []

  return (
    <div className="min-h-screen" style={{ background: softBg }}>
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="relative overflow-hidden pb-16 sm:pb-24"
        style={{ background: softHoney }}
      >
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
              <Button
                asChild
                className="h-10 sm:h-11 rounded-full shadow-sm text-gray-900 border border-amber-300 bg-white/80 hover:bg-white px-3 sm:px-4"
              >
                <Link href="/products" className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="hidden sm:inline">محصولات</span>
                </Link>
              </Button>
              <Button
                onClick={handleLogout}
                className="h-10 sm:h-11 rounded-full bg-white/75 text-gray-800 border border-amber-300 hover:bg-white px-3 sm:px-4"
                variant="outline"
                title="خروج"
              >
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
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <User className="w-5 h-5 text-amber-800 flex-shrink-0" />
                        {!editMode ? (
                          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                            {user.name || user.fullName || 'کاربر'}
                          </h1>
                        ) : (
                          <Input
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            className="h-10 text-base md:text-lg"
                            placeholder="نام"
                          />
                        )}
                      </div>
                      <Button
                        size="icon"
                        onClick={() => {
                          if (editMode) {
                            setForm({
                              name: user.name || user.fullName || '',
                              phone: user.phone || user.phone_number || user.phoneNumber || '',
                              address: user.address || '',
                            })
                          }
                          setEditMode(v => !v)
                        }}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-amber-300 bg-white hover:bg-amber-50 flex-shrink-0"
                        title={editMode ? 'لغو ویرایش' : 'ویرایش'}
                      >
                        <Edit2 className="w-4 h-4 text-amber-900" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-5">
                      <div className="flex items-center gap-2 text-gray-900 p-2.5 sm:p-3 rounded-xl bg-amber-50/70 border border-amber-300/70">
                        <Phone className="w-4 h-4 text-amber-800 flex-shrink-0" />
                        {!editMode ? (
                          <span className="text-[13px] sm:text-sm flex-1 truncate" dir="ltr">
                            {user.phone || user.phone_number || user.phoneNumber || 'تلفن ثبت نشده'}
                          </span>
                        ) : (
                          <Input
                            value={form.phone}
                            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                            dir="ltr"
                            placeholder="شماره تماس"
                            className="h-10 flex-1"
                          />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-900 p-2.5 sm:p-3 rounded-xl bg-amber-50/70 border border-amber-300/70">
                        <MapPin className="w-4 h-4 text-amber-800 flex-shrink-0" />
                        {!editMode ? (
                          <span className="text-[13px] sm:text-sm flex-1 line-clamp-1">
                            {user.address || 'آدرس ثبت نشده'}
                          </span>
                        ) : (
                          <Input
                            value={form.address}
                            onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                            placeholder="آدرس"
                            className="h-10 flex-1"
                          />
                        )}
                      </div>
                    </div>

                    {editMode && (
                      <div className="mt-3 sm:mt-4 flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setForm({
                              name: user.name || user.fullName || '',
                              phone: user.phone || user.phone_number || user.phoneNumber || '',
                              address: user.address || '',
                            })
                            setEditMode(false)
                          }}
                          className="h-10 rounded-full border border-amber-300 text-gray-900 bg-white hover:bg-amber-50 px-4 sm:px-5"
                          disabled={editMutation.isPending}
                        >
                          لغو
                        </Button>
                        <Button
                          onClick={handleSave}
                          className="h-10 rounded-full text-gray-900 bg-amber-200 hover:bg-amber-300 border border-amber-300 px-4 sm:px-5"
                          disabled={editMutation.isPending}
                        >
                          {editMutation.isPending ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin ml-2" />
                              در حال ذخیره...
                            </>
                          ) : (
                            'ذخیره تغییرات'
                          )}
                        </Button>
                      </div>
                    )}

                    <div className="mt-4 sm:mt-6 grid grid-cols-12 gap-3">
                      <div className="col-span-12 sm:col-span-4 md:col-span-3 rounded-2xl p-3 sm:p-4 bg-white border border-amber-300/70">
                        <div className="text-xs text-gray-600">کل سفارش‌ها</div>
                        <div className="font-bold text-gray-900 mt-1 text-lg sm:text-xl">
                          {totalOrders.toLocaleString('fa-IR')}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs - بقیه کد مانند قبل... */}
          <motion.div variants={fadeInUp}>
            <Card className="shadow-lg border border-amber-300/40 bg-white/95 rounded-2xl">
              <CardContent className="p-3 sm:p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
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
                      <div className="rounded-2xl border border-amber-300 bg-white p-4 sm:p-5 flex flex-col">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          <Star className="w-5 h-5 text-amber-900" />
                          <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                            پیشنهاد خرید برای شما
                          </h3>
                        </div>
                        <div className="text-sm text-gray-700 text-center py-8">
                          هنوز سفارشی ثبت نشده است
                        </div>
                      </div>

                      <div className="rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50/90 to-amber-100/70 p-4 sm:p-5 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold mb-1.5 sm:mb-2 text-gray-900 text-base sm:text-lg">
                            سریع به محصولات برو
                          </h3>
                          <p className="text-sm text-gray-800 mb-3 sm:mb-4">
                            انواع عسل‌های ویژه با تخفیف‌های دوره‌ای
                          </p>
                        </div>
                        <div>
                          <Button
                            asChild
                            className="h-10 sm:h-11 rounded-full bg-amber-200 hover:bg-amber-300 text-gray-900 border border-amber-300 px-5 sm:px-6 w-full sm:w-auto"
                          >
                            <Link href="/products" className="flex items-center justify-center gap-2">
                              <ShoppingBag className="w-4 h-4" />
                              <span>مشاهده محصولات</span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Orders */}
                  <TabsContent value="orders" className="mt-4 sm:mt-6">
                    <div className="text-center py-12 text-gray-700">
                      <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-base font-medium">هنوز سفارشی ثبت نشده است</p>
                      <Button
                        asChild
                        className="mt-4 h-10 rounded-full bg-amber-200 hover:bg-amber-300 text-gray-900 border border-amber-300"
                      >
                        <Link href="/products">شروع خرید</Link>
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Favorites */}
                  <TabsContent value="favorites" className="mt-4 sm:mt-6">
                    <div className="text-center py-12 text-gray-700">
                      <Star className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-base font-medium">فعلاً محصولی در علاقه‌مندی‌ها یافت نشد</p>
                      <Button
                        asChild
                        className="mt-4 h-10 rounded-full bg-amber-200 hover:bg-amber-300 text-gray-900 border border-amber-300"
                      >
                        <Link href="/products">کشف محصولات</Link>
                      </Button>
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