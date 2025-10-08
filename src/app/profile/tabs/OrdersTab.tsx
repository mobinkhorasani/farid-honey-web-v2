'use client';

import React from 'react';
import { Package } from 'lucide-react';

export const OrdersTab: React.FC = () => {
  return (
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
  );
};
