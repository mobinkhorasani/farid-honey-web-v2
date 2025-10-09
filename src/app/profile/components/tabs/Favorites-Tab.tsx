// ============================================
// File: components/tabs/Favorites-Tab.tsx
// ============================================
'use client';

import React from 'react';
import { Heart } from 'lucide-react';

export const FavoritesTab: React.FC = () => {
  return (
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
  );
};
