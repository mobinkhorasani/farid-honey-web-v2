"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export const EmptyCart = () => {
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
