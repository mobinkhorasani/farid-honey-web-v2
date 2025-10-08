'use client';

import React from 'react';
import { Phone, ShoppingBag } from 'lucide-react';

type HeaderCardProps = {
  userName?: string;
  phoneNumber?: string;
};

export const HeaderCard: React.FC<HeaderCardProps> = ({ userName, phoneNumber }) => {
  const stats = [{ label: 'کل سفارشات', value: '۱۲', icon: ShoppingBag, color: 'from-amber-400 to-orange-400' }];
  const initial = (userName?.charAt(0) || 'ک');

  return (
    <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-lg mb-8">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
            {initial}
          </div>
        </div>

        <div className="flex-1 text-center sm:text-right">
          <h1 className="text-2xl font-bold">{userName || 'کاربر عزیز'}</h1>
          <p className="mt-2 flex items-center justify-center sm:justify-start gap-2">
            <Phone className="w-4 h-4" />
            {phoneNumber || '---'}
          </p>
        </div>

        <div className="flex gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-2 shadow-lg`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
