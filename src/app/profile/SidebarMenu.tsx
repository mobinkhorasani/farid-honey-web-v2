'use client';

import React from 'react';
import { ChevronRight, User, MapPin, Package, Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

type MenuId = 'profile' | 'addresses' | 'orders' | 'favorites';

type SidebarMenuProps = {
  activeTab: MenuId;
  onChangeTab: (id: MenuId) => void;
  onLogout: () => void;
};

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ activeTab, onChangeTab, onLogout }) => {
  const menuItems: { id: MenuId; label: string; icon: React.ComponentType<any> }[] = [
    { id: 'profile', label: 'اطلاعات حساب', icon: User },
    { id: 'addresses', label: 'آدرس‌ها', icon: MapPin },
    { id: 'orders', label: 'سفارشات', icon: Package },
    { id: 'favorites', label: 'علاقه‌مندی‌ها', icon: Heart },
  ];

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg overflow-hidden sticky top-8">
      <nav className="p-4">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            onClick={() => onChangeTab(item.id)}
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
          </Button>
        ))}

        <hr className="my-4 border-amber-100" />

        <Button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">خروج از حساب</span>
        </Button>
      </nav>
    </div>
  );
};
