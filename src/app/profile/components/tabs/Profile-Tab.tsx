// ============================================
// File: components/tabs/Profile-Tab.tsx
// ============================================
'use client';

import React, { useCallback } from 'react';
import { User, Edit2,  } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export type ProfileTabProps = {
  name: string;
  phoneNumber: string;
  email?: string;
  birthDate?: string;
  onEditClick?: () => void;
};

export const ProfileTab: React.FC<ProfileTabProps> = ({
  name,
  phoneNumber,
  email = '',
  birthDate = '',
  onEditClick,
}) => {
  const handleEdit = useCallback(() => {
    onEditClick?.();
  }, [onEditClick]);

  const formatBirthDate = (date: string) => {
    if (!date) return '';
    // تبدیل فرمت تاریخ به شمسی اگر نیاز باشد
    return date;
  };

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 text-black">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <User className="w-6 h-6 text-amber-500" />
        اطلاعات شخصی
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* نام و نام خانوادگی */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            نام و نام خانوادگی
          </label>
          <div className="relative">
            <Input
              type="text"
              readOnly
              value={name}
              className="pr-12 bg-amber-50/50 border border-amber-200 rounded-xl focus-visible:ring-0 focus:border-amber-400 text-gray-800"
            />
            <Button
              type="button"
              onClick={handleEdit}
              variant="ghost"
              size="icon"
              title="ویرایش اطلاعات"
              aria-label="ویرایش اطلاعات"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg hover:bg-amber-100"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* شماره موبایل */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            شماره موبایل
          </label>
          <div className="relative">
            <Input
              type="text"
              readOnly
              value={phoneNumber}
              dir="ltr"
              inputMode="tel"
              className="pr-12 bg-amber-50/50 border border-amber-200 rounded-xl focus-visible:ring-0 focus:border-amber-400 text-gray-800"
            />
            <Button
              type="button"
              onClick={handleEdit}
              variant="ghost"
              size="icon"
              title="ویرایش اطلاعات"
              aria-label="ویرایش اطلاعات"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg hover:bg-amber-100"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* ایمیل */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700 items-center gap-1">
            
            آدرس ایمیل
          </label>
          <div className="relative">
            <Input
              type="email"
              readOnly
              value={email}
              dir="ltr"
              inputMode="email"
              className="pr-12 bg-amber-50/50 border border-amber-200 rounded-xl focus-visible:ring-0 focus:border-amber-400 text-gray-800"
              placeholder="example@gmail.com"
            />
            <Button
              type="button"
              onClick={handleEdit}
              variant="ghost"
              size="icon"
              title="ویرایش اطلاعات"
              aria-label="ویرایش اطلاعات"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg hover:bg-amber-100"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* تاریخ تولد */}
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-gray-700 items-center gap-1">
            
            تاریخ تولد
          </label>
          <div className="relative">
            <Input
              type="text"
              readOnly
              value={formatBirthDate(birthDate)}
              className="pr-12 bg-amber-50/50 border border-amber-200 rounded-xl focus-visible:ring-0 focus:border-amber-400 text-gray-800"
              placeholder="1370/01/01"
            />
            <Button
              type="button"
              onClick={handleEdit}
              variant="ghost"
              size="icon"
              title="ویرایش اطلاعات"
              aria-label="ویرایش اطلاعات"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg hover:bg-amber-100"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* دکمه ویرایش در موبایل */}
      <div className="mt-6 flex justify-center md:hidden">
        <Button
          onClick={handleEdit}
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl flex items-center gap-2"
        >
          <Edit2 className="w-4 h-4" />
          ویرایش اطلاعات
        </Button>
      </div>
    </div>
  );
};