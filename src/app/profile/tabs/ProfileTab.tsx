'use client';

import React from 'react';
import { User, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export type ProfileTabProps = {
  name: string;
  phoneNumber: string;
  onEditClick?: () => void;
};

export const ProfileTab: React.FC<ProfileTabProps> = ({ name, phoneNumber, onEditClick }) => {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 text-black">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <User className="w-6 h-6 text-amber-500" />
        اطلاعات شخصی
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* نام و نام خانوادگی */}
        <div className="relative">
          <label className="block text-sm mb-2">نام و نام خانوادگی</label>
          <div className="relative">
            <Input
              type="text"
              readOnly
              value={name}
              // فضای کافی برای دکمه‌ی ویرایش در سمت راست
              className="pr-12 bg-amber-50/50 border border-amber-200 rounded-xl focus-visible:ring-0 focus:border-amber-400"
            />
            <Button
              type="button"
              onClick={onEditClick}
              variant="ghost"
              size="icon"
              title="ویرایش نام"
              aria-label="ویرایش نام"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg hover:bg-amber-100"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* شماره موبایل */}
        <div className="relative">
          <label className="block text-sm mb-2">شماره موبایل</label>
          <div className="relative">
            <Input
              type="text"
              readOnly
              value={phoneNumber}
              dir="ltr"
              inputMode="tel"
              // فضای کافی برای دکمه‌ی ویرایش در سمت راست
              className="pr-12 bg-amber-50/50 border border-amber-200 rounded-xl focus-visible:ring-0 focus:border-amber-400"
            />
            <Button
              type="button"
              onClick={onEditClick}
              variant="ghost"
              size="icon"
              title="ویرایش شماره موبایل"
              aria-label="ویرایش شماره موبایل"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg hover:bg-amber-100"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
