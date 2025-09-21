'use client'

import React, { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingCart, Trash2, Plus, Minus, CheckCircle2, ArrowRight, Heart } from 'lucide-react'

// shadcn/ui
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

// motion
import { motion, AnimatePresence } from 'framer-motion'

// =============================
// Types
// =============================

type CartItem = {
  id: string | number
  title: string
  subtitle?: string
  price: number
  originalPrice?: number
  image: string
  qty: number
  stock: number
  category?: string
  brand?: string
  weightKg?: number
}

// =============================
// Helpers & Constants
// =============================

const cardCx = 'rounded-xl sm:rounded-2xl border border-neutral-300 bg-white shadow-sm transition-shadow hover:shadow-md'

const formatPrice = (price: number): string => `${price.toLocaleString('fa-IR')} تومان`

// Animations
const easeEnter = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeEnter } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const slideRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeEnter } },
  exit: { opacity: 0, x: 30, transition: { duration: 0.3 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: easeEnter, delay: 0.1 } },
}

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }

// =============================
// Shipping helpers
// =============================

type ShippingMethod = 'pishtaz' | 'tipax' | 'snappbox'

type ShippingState = {
  method: ShippingMethod
  region: 'intra' | 'inter' // فقط برای پست پیشتاز
  distanceKm: number // فقط برای اسنپ باکس
}

const estimatePishtaz = (weightKg: number, region: 'intra' | 'inter'): number => {
  // تا ۱ کیلو: درون‌استان 382,294 ریال ┃ برون‌استان 559,405 ریال (۱۴۰۴)
  // تا ۲ کیلو: درون‌استان 477,334 ریال ┃ برون‌استان 669,271 ریال
  // تبدیل به تومان و افزودهٔ تقریبی برای هر کیلو اضافه
  const base = region === 'intra' ? [38229, 47733] : [55940, 66927]
  if (weightKg <= 1) return base[0]
  if (weightKg <= 2) return base[1]
  const extraPerKg = region === 'intra' ? 10000 : 11000
  return base[1] + Math.ceil(weightKg - 2) * extraPerKg
}

const estimateTipax = (weightKg: number): number => {
  // حدودی بر اساس منابع غیررسمی 1403
  if (weightKg <= 1) return 150000
  if (weightKg <= 3) return 250000
  return 400000
}

const estimateSnappBox = (distanceKm: number): number => {
  // پویا؛ تخمینی برای UI
  const base = 30000
  const perKm = 6000
  return Math.max(0, Math.round(base + distanceKm * perKm))
}

// =============================
// Quantity Stepper
// =============================

const QtyStepper: React.FC<{
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
  stock: number
}> = ({ value, onChange, min = 1, max = 99, stock }) => {
  const actualMax = Math.min(max, stock)
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => {
    if (value >= actualMax) {
      toast.error('موجودی کافی نیست', { description: `حداکثر ${actualMax} عدد موجود است` })
      return
    }
    onChange(Math.min(actualMax, value + 1))
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" aria-label="کاهش" className="h-8 w-8" onClick={dec} disabled={value <= min}>
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        inputMode="numeric"
        value={String(value)}
        onChange={(e) => {
          const n = Number(e.target.value.replace(/[^\d]/g, ''))
          if (!Number.isNaN(n)) {
            if (n > actualMax) {
              toast.error('موجودی کافی نیست', { description: `حداکثر ${actualMax} عدد موجود است` })
              onChange(actualMax)
            } else {
              onChange(Math.max(min, n))
            }
          }
        }}
        className="h-8 w-14 text-center"
        aria-label="تعداد"
      />
      <Button variant="outline" size="icon" aria-label="افزایش" className="h-8 w-8" onClick={inc} disabled={value >= actualMax}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}

// =============================
// Cart Item Row
// =============================

const CartRow: React.FC<{
  item: CartItem
  onChangeQty: (id: CartItem['id'], qty: number) => void
  onRemove: (id: CartItem['id']) => void
  onMoveToWishlist?: (id: CartItem['id']) => void
}> = ({ item, onChangeQty, onRemove, onMoveToWishlist }) => {
  const hasDiscount = item.originalPrice && item.originalPrice > item.price
  const discountPercent = hasDiscount ? Math.round(((item.originalPrice! - item.price) / item.originalPrice!) * 100) : 0

  return (
    <motion.div variants={slideRight} initial="hidden" animate="visible" exit="exit" layout className="flex items-center gap-4 py-4 group hover:bg-neutral-50 rounded-lg px-2 transition-colors duration-200">
      <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-muted border">
        <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
        {hasDiscount && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive" className="text-xs">{discountPercent}% تخفیف</Badge>
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-medium leading-5 text-neutral-900">{item.title}</p>
              {item.stock <= 3 && (
                <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">{item.stock} عدد باقی‌مانده</Badge>
              )}
            </div>
            {item.subtitle && <p className="text-sm text-neutral-600">{item.subtitle}</p>}
            {item.brand && <p className="text-xs text-neutral-500">برند: {item.brand}</p>}
          </div>

          <div className="text-left space-y-1">
            <p className="font-bold text-lg text-neutral-900">{formatPrice(item.price * item.qty)}</p>
            {hasDiscount && <p className="text-sm text-neutral-500 line-through">{formatPrice(item.originalPrice! * item.qty)}</p>}
            <p className="text-xs text-neutral-600">{formatPrice(item.price)} × {item.qty}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <QtyStepper value={item.qty} onChange={(q) => onChangeQty(item.id, q)} stock={item.stock} />

          <div className="flex items-center gap-1">
            {onMoveToWishlist && (
              <Button variant="ghost" size="icon" aria-label="انتقال به علاقه‌مندی‌ها" className="h-8 w-8 text-neutral-500 hover:text-red-500 hover:bg-red-50" onClick={() => onMoveToWishlist(item.id)}>
                <Heart className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" aria-label="حذف" className="h-8 w-8 text-neutral-500 hover:text-red-600 hover:bg-red-50" onClick={() => onRemove(item.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// =============================
// Discount Code Input
// =============================

const DiscountCodeInput: React.FC<{
  onApply: (code: string) => void
  appliedCode?: string
  onRemove?: () => void
}> = ({ onApply, appliedCode, onRemove }) => {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return
    setIsLoading(true)
    setTimeout(() => {
      onApply(code.trim().toUpperCase())
      setCode('')
      setIsLoading(false)
    }, 800)
  }

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-800">کد تخفیف "{appliedCode}" اعمال شد</span>
        </div>
        {onRemove && (
          <Button variant="ghost" size="sm" onClick={onRemove} className="text-green-700 hover:text-green-900">حذف</Button>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <Input placeholder="کد تخفیف را وارد کنید" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} className="flex-1" />
        <Button type="submit" disabled={!code.trim() || isLoading} className="bg-[#E9B159] hover:bg-[#E9B159]/90 text-black">{isLoading ? '...' : 'اعمال'}</Button>
      </div>
    </form>
  )
}

// =============================
// Summary Card
// =============================

const SummaryCard: React.FC<{
  subtotal: number
  shipping: number
  discount: number
  total: number
  itemsCount: number
  onCheckout: () => void
  onApplyDiscount: (code: string) => void
  appliedDiscountCode?: string
  onRemoveDiscount?: () => void
}> = ({ subtotal, shipping, discount, total, itemsCount, onCheckout, onApplyDiscount, appliedDiscountCode, onRemoveDiscount }) => {
  return (
    <Card className={`${cardCx} md:sticky md:top-4`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-[#E9B159]" />
          <h3 className="font-semibold text-neutral-900">خلاصه سبد خرید</h3>
        </div>
        <p className="text-sm text-neutral-600">{itemsCount} قلم کالا</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">کد تخفیف</h4>
          <DiscountCodeInput onApply={onApplyDiscount} appliedCode={appliedDiscountCode} onRemove={onRemoveDiscount} />
        </div>

        <Separator className="bg-neutral-200" />

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between"><span className="text-neutral-700">قیمت کالاها</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
          {discount > 0 && (
            <div className="flex items-center justify-between text-green-600"><span>تخفیف</span><span className="font-medium">-{formatPrice(discount)}</span></div>
          )}
          <div className="flex items-center justify-between"><span className="text-neutral-700">هزینه ارسال</span><span className="font-medium">{shipping === 0 ? <span className="text-green-600">رایگان</span> : formatPrice(shipping)}</span></div>
          <Separator className="bg-neutral-200" />
          <div className="flex items-center justify-between text-base"><span className="font-semibold">مبلغ نهایی</span><span className="font-bold text-lg">{formatPrice(total)}</span></div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full bg-[#E9B159] hover:bg-[#E9B159]/90 text-black font-medium py-3" size="lg" onClick={onCheckout} disabled={itemsCount === 0}>
          <span>نهایی کردن خرید</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}

// =============================
// Shipping Card (UI)
// =============================

const ShippingCard: React.FC<{ totalWeightKg: number; state: ShippingState; onChange: (next: Partial<ShippingState>) => void; }> = ({ totalWeightKg, state, onChange }) => (
  <Card className={cardCx}>
    <CardHeader className="pb-3">
      <h3 className="font-semibold">روش ارسال</h3>
      <p className="text-xs text-neutral-600">قیمت‌ها تخمینی‌اند؛ برای دقت، به سرویس هر شرکت متصل شوید.</p>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3">
        <div className="flex items-center gap-2">
          <input type="radio" id="ship-pishtaz" name="ship" className="h-4 w-4" checked={state.method==='pishtaz'} onChange={()=>onChange({method:'pishtaz'})} />
          <label htmlFor="ship-pishtaz" className="text-sm">پست پیشتاز</label>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>onChange({region:'intra'})} className={`text-xs rounded-md px-2 py-1 border ${state.region==='intra'?'border-[#E9B159] bg-[#E9B159]/10 text-[#E9B159]':'border-neutral-200 text-neutral-600'}`}>داخل استان</button>
          <button onClick={()=>onChange({region:'inter'})} className={`text-xs rounded-md px-2 py-1 border ${state.region==='inter'?'border-[#E9B159] bg-[#E9B159]/10 text-[#E9B159]':'border-neutral-200 text-neutral-600'}`}>برون‌استان</button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-3">
        <div className="flex items-center gap-2">
          <input type="radio" id="ship-tipax" name="ship" className="h-4 w-4" checked={state.method==='tipax'} onChange={()=>onChange({method:'tipax'})} />
          <label htmlFor="ship-tipax" className="text-sm">تیپاکس</label>
        </div>
        <span className="text-xs text-neutral-500">براساس وزن مرسوله</span>
      </div>

      <div className="space-y-2 rounded-lg border border-neutral-200 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input type="radio" id="ship-snapp" name="ship" className="h-4 w-4" checked={state.method==='snappbox'} onChange={()=>onChange({method:'snappbox'})} />
            <label htmlFor="ship-snapp" className="text-sm">اسنپ باکس (درون‌شهری)</label>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-600">فاصله (km)</span>
            <input type="number" min={1} className="w-16 h-8 rounded-md border border-neutral-200 text-center" value={state.distanceKm} onChange={(e)=>onChange({distanceKm: Math.max(1, Number(e.target.value||1))})} />
          </div>
        </div>
        <p className="text-[11px] text-neutral-500">قیمت‌گذاری پویاست؛ مقدار بالا صرفاً برای برآورد.</p>
      </div>

      <Separator className="bg-neutral-200" />
      <div className="text-xs text-neutral-500">وزن کل مرسوله: {totalWeightKg.toFixed(2)} کیلوگرم</div>
    </CardContent>
  </Card>
)

// =============================
// Main Component
// =============================

const EnhancedCart: React.FC = () => {
  // طبق درخواست قبلی دادهٔ اولیه خالی است (نه نمونه)
  const [items, setItems] = useState<CartItem[]>([])
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [shippingState, setShippingState] = useState<ShippingState>({ method: 'pishtaz', region: 'inter', distanceKm: 5 })

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e)
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const changeQty = (id: CartItem['id'], qty: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, Math.min(qty, it.stock)) } : it)))
    toast.success('تعداد کالا تغییر کرد', { description: 'سبد خرید به‌روزرسانی شد' })
  }

  const removeItem = (id: CartItem['id']) => {
    setItems((prev) => prev.filter((it) => it.id !== id))
    toast.success('کالا حذف شد', { description: 'محصول از سبد خرید حذف شد' })
  }

  const moveToWishlist = (id: CartItem['id']) => {
    removeItem(id)
    toast('به علاقه‌مندی‌ها منتقل شد', { description: 'محصول در لیست علاقه‌مندی‌های شما ذخیره شد' })
  }

  const clearCart = () => {
    setItems([])
    setAppliedDiscountCode(undefined)
    toast('سبد خرید خالی شد', { description: 'تمام محصولات حذف شدند' })
  }

  const applyDiscountCode = (code: string) => {
    const m = code.match(/([0-9]{1,2})/)
    if (!m) {
      toast.error('کد تخفیف نامعتبر', { description: 'فرمت کد درست نیست' })
      return
    }
    setAppliedDiscountCode(code)
    toast.success('کد تخفیف اعمال شد')
  }

  const removeDiscountCode = () => {
    setAppliedDiscountCode(undefined)
    toast('کد تخفیف حذف شد', { description: 'تخفیف از سبد خرید حذف شد' })
  }

  const { subtotal, discount, shipping, total, itemsCount, totalWeightKg } = useMemo(() => {
    const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0)
    const itemsCount = items.reduce((acc, it) => acc + it.qty, 0)
    const totalWeightKg = items.reduce((acc, it) => acc + (it.weightKg ?? 1) * it.qty, 0)

    // محاسبه تخفیف از روی درصد داخل کد (Placeholder)
    let discount = 0
    if (appliedDiscountCode) {
      const m = appliedDiscountCode.match(/([0-9]{1,2})/)
      if (m) {
        const percent = Math.min(50, Math.max(0, parseInt(m[1], 10)))
        discount = Math.round((subtotal * percent) / 100)
      }
    }

    // محاسبه هزینه ارسال بر اساس روش انتخابی
    let shipping = 0
    if (itemsCount > 0) {
      if (shippingState.method === 'pishtaz') shipping = estimatePishtaz(totalWeightKg, shippingState.region)
      if (shippingState.method === 'tipax') shipping = estimateTipax(totalWeightKg)
      if (shippingState.method === 'snappbox') shipping = estimateSnappBox(shippingState.distanceKm)
    }

    const total = (subtotal - discount) + shipping
    return { subtotal, discount, shipping, total, itemsCount, totalWeightKg }
  }, [items, appliedDiscountCode, shippingState])

  const onCheckout = () => {
    setIsLoading(true)
    setTimeout(() => {
      console.log('Checkout', { items, subtotal, discount, shipping, total, appliedDiscountCode })
      toast('درحال هدایت به درگاه پرداخت', { description: 'لطفاً صبر کنید...' })
      setIsLoading(false)
      // router.push('/checkout')
    }, 1200)
  }

  return (
    <div className="min-h-screen w-full bg-white dark:bg-white">
      <section dir="rtl" className="mx-auto max-w-7xl w-full px-4 py-8 sm:py-12">
      <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-8 text-center sm:text-right">
        <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9B159]/20">
            <ShoppingCart className="h-6 w-6 text-[#E9B159]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl text-neutral-900">سبد خرید</h1>
            <p className="text-sm text-neutral-600">مدیریت محصولات انتخابی شما</p>
          </div>
        </div>
      </motion.header>

      <motion.div variants={container} initial="hidden" animate="visible" className="grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <Card className={cardCx}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-neutral-900">{items.length === 0 ? 'سبد خرید شما خالی است' : `محصولات سبد خرید (${itemsCount} قلم)`}</p>
                {items.length > 0 && (
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50" onClick={clearCart}>خالی کردن سبد</Button>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <AnimatePresence mode="wait">
                {items.length === 0 ? (
                  <motion.div key="empty" variants={fadeUp} initial="hidden" animate="visible" className="py-16 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#E9B159]/10">
                      <ShoppingCart className="h-10 w-10 text-[#E9B159]" />
                    </div>
                    <div className="mx-auto max-w-sm space-y-4">
                      <h3 className="text-lg font-semibold text-neutral-900">سبد خرید خالی است</h3>
                      <p className="text-neutral-600">هنوز محصولی به سبد خرید اضافه نکرده‌اید</p>
                      <Button className="bg-[#E9B159] hover:bg-[#E9B159]/90 text-black" asChild>
                        <a href="/products">
                          <span>مشاهده محصولات</span>
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="items" className="divide-y divide-neutral-200">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <CartRow key={item.id} item={item} onChangeQty={changeQty} onRemove={removeItem} onMoveToWishlist={moveToWishlist} />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary */}
        <motion.div variants={scaleIn} className="space-y-4">
          <ShippingCard totalWeightKg={totalWeightKg} state={shippingState} onChange={(next)=> setShippingState((prev)=> ({...prev, ...next}))} />
          <SummaryCard
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            total={total}
            itemsCount={itemsCount}
            onCheckout={onCheckout}
            onApplyDiscount={applyDiscountCode}
            appliedDiscountCode={appliedDiscountCode}
            onRemoveDiscount={removeDiscountCode}
          />
        </motion.div>
      </motion.div>

      {/* Mobile Sticky Checkout */}
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="lg:hidden fixed bottom-4 inset-x-4 z-50">
            <Card className="border shadow-lg bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-500">مبلغ نهایی</span>
                    <span className="font-bold text-lg">{formatPrice(total)}</span>
                    {discount > 0 && <span className="text-xs text-green-600">{formatPrice(discount)} تخفیف اعمال شد</span>}
                  </div>
                  <Button className="bg-[#E9B159] hover:bg-[#E9B159]/90 text-black font-medium px-6" onClick={onCheckout} disabled={isLoading}>
                    {isLoading ? <span>در حال پردازش...</span> : (<><span>نهایی کردن خرید</span><ArrowRight className="h-4 w-4 ml-2" /></>)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toasts */}
      <Toaster richColors closeButton dir="rtl" />
    </section>
    </div>
  )
}

export default EnhancedCart
