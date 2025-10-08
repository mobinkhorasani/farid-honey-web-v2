'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '@/api/users/userServices'
import { useAuth } from '@/context/authContext'
import { ErrorHandler } from '../components/error-handler'
import { LoadingPage } from '../components/loading-page'
import {
  User,
  Phone,
  MapPin,
  Edit2,
  Plus,
  Package,
  Heart,
  Settings,
  LogOut,
  ShoppingBag,
  Clock,
  Award,
  ChevronRight,
  Home,
  Trash2,
  Check
} from 'lucide-react'

// Mock data for addresses
const mockAddresses = [
  {
    id: '1',
    title: 'خانه',
    address: 'تهران، ولنجک، خیابان شهید باهنر، پلاک ۲۴، واحد ۳',
    postalCode: '۱۹۸۷۶۵۴۳۲۱',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    isDefault: true
  },
  {
    id: '2',
    title: 'محل کار',
    address: 'تهران، میدان آرژانتین، خیابان احمد قصیر، پلاک ۱۲',
    postalCode: '۱۵۱۳۷۸۹۴۵۶',
    phone: '۰۲۱۸۸۷۶۵۴۳۲',
    isDefault: false
  }
]

export default function HoneyShopProfile() {
  const { token, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [editingAddress, setEditingAddress] = useState<string | null>(null)
  const [addresses, setAddresses] = useState(mockAddresses)

  const { data: userData, isLoading, isError, refetch } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(token ?? undefined),
    enabled: !!token,
  })

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })))
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError) {
    return (
      <ErrorHandler text="مشکلی در بارگذاری پیش آمده" onRetry={refetch} />
    )
  }

  const menuItems = [
    { id: 'profile', label: 'اطلاعات حساب', icon: User },
    { id: 'addresses', label: 'آدرس‌ها', icon: MapPin },
    { id: 'orders', label: 'سفارشات', icon: Package },
    { id: 'favorites', label: 'علاقه‌مندی‌ها', icon: Heart },
  ]

  const stats = [
    { label: 'کل سفارشات', value: '۱۲', icon: ShoppingBag, color: 'from-amber-400 to-orange-400' },
    { label: 'در حال ارسال', value: '۲', icon: Clock, color: 'from-blue-400 to-indigo-400' },
    { label: 'امتیاز شما', value: '۲۵۰', icon: Award, color: 'from-green-400 to-emerald-400' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Decorative Elements */}
      <div className="fixed top-10 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl"></div>
      <div className="fixed bottom-20 right-20 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                {userData?.name?.charAt(0) || 'ک'}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition">
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-right">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{userData?.name || 'کاربر عزیز'}</h1>
              <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2">
                <Phone className="w-4 h-4" />
                {userData?.phone_number || '---'}
              </p>
              <p className="text-sm text-amber-600 mt-2 bg-amber-100 inline-block px-3 py-1 rounded-full">
                {userData?.role === 'CUSTOMER' ? 'مشتری ویژه' : userData?.role}
              </p>
            </div>

            <div className="flex gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-2 shadow-lg`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg overflow-hidden sticky top-8">
              <nav className="p-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl mb-2 transition ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700'
                        : 'hover:bg-amber-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition ${activeTab === item.id ? 'rotate-90' : ''}`} />
                  </button>
                ))}
                
                <hr className="my-4 border-amber-100" />
                
                <button
                  onClick={() => logout()}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">خروج از حساب</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-amber-500" />
                  اطلاعات شخصی
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">نام و نام خانوادگی</label>
                    <input
                      type="text"
                      value={userData?.name || ''}
                      className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 transition"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">شماره موبایل</label>
                    <input
                      type="text"
                      value={userData?.phone_number || ''}
                      className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 transition"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">ایمیل</label>
                    <input
                      type="email"
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">تاریخ تولد</label>
                    <input
                      type="text"
                      placeholder="۱۳۷۰/۰۱/۰۱"
                      className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 transition"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition">
                    ذخیره تغییرات
                  </button>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-amber-500" />
                      آدرس‌های من
                    </h2>
                    <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow hover:shadow-lg transition flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      آدرس جدید
                    </button>
                  </div>

                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`relative p-5 rounded-xl border-2 transition ${
                          address.isDefault
                            ? 'border-amber-400 bg-amber-50/30'
                            : 'border-gray-200 hover:border-amber-200 bg-white/50'
                        }`}
                      >
                        {address.isDefault && (
                          <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                            پیش‌فرض
                          </div>
                        )}
                        
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Home className="w-4 h-4 text-amber-600" />
                              <h3 className="font-semibold text-gray-800">{address.title}</h3>
                            </div>
                            <p className="text-gray-600 mb-3 leading-relaxed">{address.address}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                              <span>کد پستی: {address.postalCode}</span>
                              <span>تلفن: {address.phone}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            {!address.isDefault && (
                              <button
                                onClick={() => handleSetDefaultAddress(address.id)}
                                className="p-2 hover:bg-amber-100 rounded-lg transition group"
                                title="تنظیم به عنوان پیش‌فرض"
                              >
                                <Check className="w-4 h-4 text-gray-400 group-hover:text-amber-600" />
                              </button>
                            )}
                            <button
                              onClick={() => setEditingAddress(address.id)}
                              className="p-2 hover:bg-amber-100 rounded-lg transition group"
                            >
                              <Edit2 className="w-4 h-4 text-gray-400 group-hover:text-amber-600" />
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition group"
                            >
                              <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Package className="w-6 h-6 text-amber-500" />
                  سفارشات من
                </h2>
                
                <div className="text-center py-12">
                  <Package className="w-20 h-20 text-amber-200 mx-auto mb-4" />
                  <p className="text-gray-600">هنوز سفارشی ثبت نکرده‌اید</p>
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-amber-500" />
                  علاقه‌مندی‌های من
                </h2>
                
                <div className="text-center py-12">
                  <Heart className="w-20 h-20 text-amber-200 mx-auto mb-4" />
                  <p className="text-gray-600">لیست علاقه‌مندی‌های شما خالی است</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}