"use client";

import { CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  total: number;
  formatPrice: (price: number) => string;
}

export const CartSummary = ({ total, formatPrice }: CartSummaryProps) => {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-6">خلاصه سفارش</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>جمع کل</span>
          <span>{formatPrice(total)} تومان</span>
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
              {formatPrice(total)} تومان
            </span>
          </div>
        </div>
      </div>

      <Button className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition flex items-center justify-center gap-2">
        <CreditCard className="w-5 h-5" />
        ادامه خرید
      </Button>

      <Link
        href="/products"
        className="w-full mt-3 py-3 border-2 border-amber-300 text-amber-700 rounded-xl font-medium hover:bg-amber-50 transition flex items-center justify-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        برگشت به صفحه محصولات
      </Link>
    </div>
  );
};
