// ============================================
// File: components/Sidebar-Menu.tsx
// ============================================
'use client';

import React, { useCallback } from 'react';
import { ChevronRight, User, MapPin, Package, Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

type MenuId = 'profile' | 'addresses' | 'orders' | 'favorites';

type SidebarMenuProps = {
  activeTab: MenuId;
  onChangeTab: (id: MenuId) => void;
  onLogout: () => void;
};

const menuItems: { id: MenuId; label: string; icon: React.ComponentType<any> }[] = [
  { id: 'profile', label: 'اطلاعات حساب', icon: User },
  { id: 'addresses', label: 'آدرس‌ها', icon: MapPin },
  { id: 'orders', label: 'سفارشات', icon: Package },
  { id: 'favorites', label: 'علاقه‌مندی‌ها', icon: Heart },
];

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  activeTab,
  onChangeTab,
  onLogout,
}) => {
  const handleTabClick = useCallback(
    (id: MenuId) => () => {
      onChangeTab(id);
    },
    [onChangeTab]
  );

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg overflow-hidden sticky top-8">
      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <Button
              key={item.id}
              onClick={handleTabClick(item.id)}
              variant="ghost"
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl mb-2 transition ${
                isActive
                  ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700'
                  : 'hover:bg-amber-50 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight
                className={`w-4 h-4 transition ${isActive ? 'rotate-90' : ''}`}
              />
            </Button>
          );
        })}

        <hr className="my-4 border-amber-100" />

        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">خروج از حساب</span>
        </Button>
      </nav>
    </div>
  );
};
