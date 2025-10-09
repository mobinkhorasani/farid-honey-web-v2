// ============================================
// File: components/tabs/Addresses-Tab.tsx
// ============================================
'use client';

import React, { useState, useCallback } from 'react';
import { useAuth } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import { getMyAddresses, type Address } from '@/api/address/addressServices';
import { MapPin, Home, Edit2, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ErrorHandler } from '@/app/components/error-handler';
import { AddressForm } from '../Address-Form';
import {
  useAddAddress,
  useDeleteAddress,
  useEditAddress,
} from '../../hooks/use-Address-Mutations';
import { validateAddress } from '../../utils/validation';

const EMPTY_ADDRESS: Address = {
  province: '',
  city: '',
  address: '',
  plate: '',
  unit: '',
  Postal_code: '',
  receiver: '',
};

export const AddressesTab: React.FC = () => {
  const { token } = useAuth();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Address>(EMPTY_ADDRESS);

  const {
    data: addresses = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['myAddresses'],
    queryFn: () => getMyAddresses(token ?? undefined),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const resetForm = useCallback(() => {
    setForm(EMPTY_ADDRESS);
  }, []);

  const cancelAll = useCallback(() => {
    setEditingId(null);
    setIsAdding(false);
    resetForm();
  }, [resetForm]);

  const addMut = useAddAddress(token ?? undefined, {
    onSuccess: () => {
      cancelAll();
    },
    onError: (error: any) => {
      console.error('Error adding address:', error);
    },
  });

  const editMut = useEditAddress(token ?? undefined, {
    onSuccess: () => {
      cancelAll();
    },
    onError: (error: any) => {
      console.error('Error editing address:', error);
    },
  });

  const delMut = useDeleteAddress(token ?? undefined, {
    onSuccess: () => {
    },
    onError: (error: any) => {
      console.error('Error deleting address:', error);
    },
  });

  const startEdit = useCallback((address: any) => {
    setEditingId(address.id);
    setIsAdding(false);
    setForm({
      province: address.province || '',
      city: address.city || '',
      address: address.address || '',
      plate: address.plate || '',
      unit: address.unit || '',
      Postal_code: address.Postal_code || '',
      receiver: address.receiver || '',
    });
  }, []);

  const startAdding = useCallback(() => {
    resetForm();
    setEditingId(null);
    setIsAdding(true);
  }, [resetForm]);

  const handleAdd = useCallback(() => {
    if (!validateAddress(form)) {
      return;
    }
    addMut.mutate(form);
  }, [form, addMut]);

  const handleEdit = useCallback(
    (id: number) => () => {
      if (!validateAddress(form)) {
        return;
      }
      editMut.mutate({ id, data: form });
    },
    [form, editMut]
  );

  const handleDelete = useCallback(
    (id: number) => () => {
      if (window.confirm('آیا از حذف این آدرس اطمینان دارید؟')) {
        delMut.mutate(id);
      }
    },
    [delMut]
  );

  const isFormActive = isAdding || editingId !== null;
  const isMutating = addMut.isPending || editMut.isPending || delMut.isPending;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto" />
            <p className="text-gray-600 mt-4">در حال بارگذاری...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <ErrorHandler text="خطا در بارگذاری آدرس‌ها" onRetry={refetch} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-amber-500" />
            آدرس‌های من
          </h2>
          {!isFormActive && (
            <Button
              onClick={startAdding}
              disabled={isMutating}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow hover:shadow-lg transition flex items-center gap-2 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              آدرس جدید
            </Button>
          )}
        </div>

        {isAdding && (
          <AddressForm
            title="افزودن آدرس جدید"
            form={form}
            onChange={setForm}
            onSubmit={handleAdd}
            onCancel={cancelAll}
            submitting={addMut.isPending}
          />
        )}

        {addresses.length === 0 && !isAdding ? (
          <div className="text-center py-12">
            <MapPin className="w-20 h-20 text-amber-200 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">هنوز آدرسی ثبت نکرده‌اید</p>
            <Button
              onClick={startAdding}
              disabled={isMutating}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow hover:shadow-lg transition inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              افزودن اولین آدرس
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address: any) => (
              <div key={address.id}>
                {editingId === address.id ? (
                  <AddressForm
                    title="ویرایش آدرس"
                    form={form}
                    onChange={setForm}
                    onSubmit={handleEdit(address.id)}
                    onCancel={cancelAll}
                    submitting={editMut.isPending}
                  />
                ) : (
                  <div className="relative p-5 rounded-xl border-2 border-gray-200 hover:border-amber-200 bg-white/50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Home className="w-4 h-4 text-amber-600" />
                          <h3 className="font-semibold text-gray-800">
                            {address.receiver}
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          {address.province} - {address.city} - {address.address}
                          {address.plate && ` - پلاک ${address.plate}`}
                          {address.unit && ` - واحد ${address.unit}`}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>کد پستی: {address.Postal_code}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEdit(address)}
                          disabled={isMutating || isFormActive}
                          variant="ghost"
                          size="icon"
                          className="p-2 hover:bg-amber-100 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                          title="ویرایش"
                        >
                          <Edit2 className="w-4 h-4 text-gray-400 hover:text-amber-600" />
                        </Button>
                        <Button
                          onClick={handleDelete(address.id)}
                          disabled={isMutating}
                          variant="ghost"
                          size="icon"
                          className="p-2 hover:bg-red-50 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
