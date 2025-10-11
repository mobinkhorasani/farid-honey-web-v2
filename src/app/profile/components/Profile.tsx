'use client';

import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/authContext';
import { getUserInfo } from '@/api/users/userServices';
import { ErrorHandler } from '../../components/error-handler';
import { LoadingPage } from '../../components/loading-page';
import { SidebarMenu } from './Sidebar-Menu';
import { ProfileTab } from './tabs/Profile-Tab';
import { AddressesTab } from './tabs/Addresses-Tab';
import { OrdersTab } from './tabs/Orders-Tab';
import { FavoritesTab } from './tabs/Favorites-Tab';
import { EditProfileModal } from './Edit-Profile-Modal';
import { HeaderCard } from './Header-Card';
import { useEditUser } from '../hooks/use-User-Mutations';
import { normalizeUser } from '../utils/helpers';

type TabId = 'profile' | 'addresses' | 'orders' | 'favorites';

export const HoneyShopProfile: React.FC = () => {
  const { token, logout } = useAuth();

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
    select: normalizeUser,
    staleTime: 5 * 60 * 1000,
  });

  const editMut = useEditUser(token ?? undefined, {
    refetch: refetchUser,
    onSuccess: () => {
      setEditOpen(false);
    },
  });

  const handleEditSubmit = useCallback(
    (payload: { name: string; phone_number: string }) => {
      editMut.mutate(payload);
    },
    [editMut]
  );

  const handleTabChange = useCallback((id: TabId) => {
    setActiveTab(id);
  }, []);

  const handleEditOpen = useCallback(() => {
    setEditOpen(true);
  }, []);

  const handleEditClose = useCallback(() => {
    setEditOpen(false);
  }, []);

  if (userLoading) return <LoadingPage />;
  
  if (userError) {
    return (
      <ErrorHandler
        text="مشکلی در بارگذاری اطلاعات کاربر پیش آمده"
        onRetry={refetchUser}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 text-black">
      <div className="fixed top-10 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl" />
      <div className="fixed bottom-20 right-20 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <HeaderCard userName={userData?.name} phoneNumber={userData?.phone_number} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SidebarMenu
              activeTab={activeTab}
              onChangeTab={handleTabChange}
              onLogout={logout}
            />
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <ProfileTab
                name={userData?.name ?? ''}
                phoneNumber={userData?.phone_number ?? ''}
                onEditClick={handleEditOpen}
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
        onClose={handleEditClose}
        initialName={userData?.name}
        initialPhone={userData?.phone_number}
        submitting={editMut.isPending}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};