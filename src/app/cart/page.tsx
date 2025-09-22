"use client"

import { getCartInfo } from "@/api/cart/cartServices";
import { useAuth } from "@/context/authContext";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft,
  Package,
  Truck,
  Shield,
  CreditCard,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

export default function CartPage() {
    const { token } = useAuth();
    const [quantities, setQuantities] = useState<{[key: string]: number}>({});

    const { data, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ["Cart"],
        queryFn: () => getCartInfo(token ?? undefined)
    });

    // تبدیل قیمت فارسی به عدد
    const convertPersianPrice = (price: string) => {
        if (!price) return 0;
        const englishNumbers = price
            .replace(/۰/g, '0')
            .replace(/۱/g, '1')
            .replace(/۲/g, '2')
            .replace(/۳/g, '3')
            .replace(/۴/g, '4')
            .replace(/۵/g, '5')
            .replace(/۶/g, '6')
            .replace(/۷/g, '7')
            .replace(/۸/g, '8')
            .replace(/۹/g, '9')
            .replace(/٬/g, '')
            .replace(/,/g, '');
        return parseInt(englishNumbers);
    };

    const convertPersianToEnglishNumber = (persianNum: string) => {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        
        let englishNum = persianNum;
        for (let i = 0; i < persianNumbers.length; i++) {
            englishNum = englishNum.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
        }
        return parseInt(englishNum);
    };

    const formatPrice = (price: number) => {
        return price.toLocaleString('fa-IR');
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setQuantities(prev => ({
            ...prev,
            [productId]: newQuantity
        }));
        // اینجا می‌تونید API call برای آپدیت سرور بزنید
    };

    const removeFromCart = (productId: string) => {
        // API call برای حذف محصول
        console.log('Remove product:', productId);
        refetch();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex justify-center items-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-amber-200 rounded-full animate-pulse"></div>
                        <div className="w-20 h-20 border-4 border-t-amber-500 rounded-full animate-spin absolute top-0"></div>
                    </div>
                    <p className="mt-4 text-amber-700 font-medium">در حال بارگذاری سبد خرید...</p>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex justify-center items-center">
                <div className="text-center bg-white/80 backdrop-blur p-8 rounded-3xl shadow-xl max-w-md">
                    <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                    <p className="text-gray-700 text-xl mb-6">مشکلی در بارگذاری سبد خرید پیش آمده</p>
                    <button 
                        onClick={() => refetch()}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-lg transition"
                    >
                        تلاش مجدد
                    </button>
                </div>
            </div>
        );
    }

    const isEmpty = !data.products || data.products.length === 0;

    if (isEmpty) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex justify-center items-center">
                <div className="text-center">
                    <div className="relative inline-block">
                        <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag className="w-16 h-16 text-amber-500" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            0
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">سبد خرید شما خالی است</h2>
                    <p className="text-gray-600 mb-8">محصولات مورد علاقه خود را اضافه کنید</p>
                    <Link 
                        href="/products"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-xl transform hover:-translate-y-0.5 transition"
                    >
                        مشاهده محصولات
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        );
    }

    // محاسبه قیمت کل با احتساب تغییرات quantity
    const calculateTotal = () => {
        return data.products.reduce((total: number, product: any) => {
            const quantity = quantities[product.id] || convertPersianToEnglishNumber(product.quantity);
            const price = convertPersianPrice(product.price);
            return total + (price * quantity);
        }, 0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
            {/* Decorative Elements */}
            <div className="fixed top-20 right-20 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl"></div>
            <div className="fixed bottom-20 left-20 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">سبد خرید</h1>
                    <p className="text-gray-600">{data.products.length} محصول در سبد خرید شما</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Products List */}
                    <div className="lg:col-span-2 space-y-4">
                        {data.products.map((product: any) => {
                            const currentQuantity = quantities[product.id] || convertPersianToEnglishNumber(product.quantity);
                            
                            return (
                                <div 
                                    key={product.id}
                                    className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
                                >
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        {/* Product Image */}
                                        <div className="relative w-full sm:w-32 h-32 bg-amber-50 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={product.image_url || '/default-honey.jpg'}
                                                alt={product.name}
                                                fill
                                                sizes="(max-width: 640px) 100vw, 128px"
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        سایز: {product.size}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(product.id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg transition group"
                                                >
                                                    <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                                                </button>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                                                {/* Quantity Selector */}
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-600">تعداد:</span>
                                                    <div className="flex items-center gap-1 bg-amber-50 rounded-lg p-1">
                                                        <button
                                                            onClick={() => updateQuantity(product.id, currentQuantity - 1)}
                                                            className="w-8 h-8 rounded hover:bg-amber-100 transition flex items-center justify-center"
                                                            disabled={currentQuantity <= 1}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-10 text-center font-medium">
                                                            {currentQuantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(product.id, currentQuantity + 1)}
                                                            className="w-8 h-8 rounded hover:bg-amber-100 transition flex items-center justify-center"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="text-left">
                                                    <p className="text-sm text-gray-500">قیمت واحد</p>
                                                    <p className="text-lg font-bold text-amber-600">
                                                        {product.price} تومان
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-4">
                            {/* Summary Card */}
                            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">خلاصه سفارش</h2>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>جمع کل</span>
                                        <span>{formatPrice(calculateTotal())} تومان</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>هزینه ارسال</span>
                                        <span className="text-green-600">رایگان</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>تخفیف</span>
                                        <span className="text-red-500">-</span>
                                    </div>
                                    
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-800">مبلغ نهایی</span>
                                            <span className="text-2xl font-bold text-amber-600">
                                                {formatPrice(calculateTotal())} تومان
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Discount Code */}
                                <div className="mb-6">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="کد تخفیف"
                                            className="flex-1 px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400 transition"
                                        />
                                        <button className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition">
                                            اعمال
                                        </button>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition flex items-center justify-center gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    ادامه خرید
                                </button>
                                
                                <Link 
                                    href="/products"
                                    className="w-full mt-3 py-3 border-2 border-amber-300 text-amber-700 rounded-xl font-medium hover:bg-amber-50 transition flex items-center justify-center gap-2"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    ادامه خرید
                                </Link>
                            </div>

                            {/* Features */}
                            <div className="bg-white/60 backdrop-blur rounded-2xl p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                            <Truck className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">ارسال رایگان</p>
                                            <p className="text-xs text-gray-500">برای خرید بالای 500 هزار تومان</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                            <Shield className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">ضمانت اصالت</p>
                                            <p className="text-xs text-gray-500">تضمین کیفیت محصولات</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                            <Package className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">بسته‌بندی ویژه</p>
                                            <p className="text-xs text-gray-500">محافظت کامل از محصولات</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}