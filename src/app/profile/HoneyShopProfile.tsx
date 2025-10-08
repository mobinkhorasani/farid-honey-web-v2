'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/context/authContext';
import { getUserInfo, editUser } from '@/api/users/userServices';
import { ErrorHandler } from '../components/error-handler';
import { LoadingPage } from '../components/loading-page';
import { HeaderCard } from './HeaderCard';
import { SidebarMenu } from './SidebarMenu';
import { ProfileTab } from './tabs/ProfileTab';
import { AddressesTab } from './tabs/AddressesTab';
import { OrdersTab } from './tabs/OrdersTab';
import { FavoritesTab } from './tabs/FavoritesTab';
import { EditProfileModal } from './components/EditProfileModal';
import { toast } from 'sonner';

type TabId = 'profile' | 'addresses' | 'orders' | 'favorites';

const normalizeUser = (u: any) => ({
  ...u,
  phone_number: u?.phone_number ?? u?.phoneNumber ?? u?.phone ?? '',
});

export const HoneyShopProfile: React.FC = () => {
  const { token, logout } = useAuth();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [editOpen, setEditOpen] = useState(false);

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(token ?? undefined),
    enabled: !!token,
    select: (raw) => normalizeUser(raw),
  });

  const editMut = useMutation({
    mutationFn: (payload: { name: string; phone_number: string }) =>
      editUser(payload, token ?? undefined),
    onSuccess: (updatedRaw: any) => {
      const updated = normalizeUser(updatedRaw);

      queryClient.setQueryData(['userInfo'], (prev: any) => {
        const prevNorm = prev ? normalizeUser(prev) : {};
        return { ...prevNorm, ...updated };
      });
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });

      setEditOpen(false);
      toast.success('اطلاعات کاربر با موفقیت به‌روز شد');
    },
    onError: (e: any) => {
      const msg = e?.response?.data?.message || e?.message || 'خطای نامشخص';
      toast.error(`خطا در به‌روزرسانی اطلاعات: ${msg}`);
    },
  });

  if (userLoading) return <LoadingPage />;
  if (userError) return <ErrorHandler text="مشکلی در بارگذاری اطلاعات کاربر پیش آمده" onRetry={refetchUser} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 text-black">
      <div className="fixed top-10 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl"></div>
      <div className="fixed bottom-20 right-20 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <HeaderCard userName={userData?.name} phoneNumber={userData?.phone_number} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SidebarMenu
              activeTab={activeTab}
              onChangeTab={(id) => setActiveTab(id)}
              onLogout={logout}
            />
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <ProfileTab
                name={userData?.name ?? ''}
                phoneNumber={userData?.phone_number ?? ''}
                onEditClick={() => setEditOpen(true)}
              />
            )}

            {activeTab === 'addresses' && <AddressesTab />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'favorites' && <FavoritesTab />}
          </div>
        </div>
      </div>

      <EditProfileModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialName={userData?.name}
        initialPhone={userData?.phone_number}
        submitting={editMut.isPending}
        onSubmit={(payload) => editMut.mutate(payload)}
      />
    </div>
  );
};
