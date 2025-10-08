'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/authContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMyAddresses,
  addAddress,
  editAddress,
  deleteAddress,
  type Address,
} from '@/api/address/addressServices';
import { ErrorHandler } from '../../components/error-handler';
import { MapPin, Home, Edit2, Trash2, Plus } from 'lucide-react';
import { AddressForm } from '../components/AddressForm';
import { Button } from '@/components/ui/button';


export const AddressesTab: React.FC = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Address>({
    province: '',
    city: '',
    address: '',
    plate: '',
    unit: '',
    Postal_code: '',
    receiver: '',
  });

  const {
    data: addresses,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['myAddresses', token],
    queryFn: () => getMyAddresses(token ?? undefined),
    enabled: !!token,
  });

  const resetForm = () =>
    setForm({
      province: '',
      city: '',
      address: '',
      plate: '',
      unit: '',
      Postal_code: '',
      receiver: '',
    });

  const validate = () =>
    !!(form.province && form.city && form.address && form.receiver && form.Postal_code);

  const addMut = useMutation({
    mutationFn: (data: Address) => addAddress(data, token ?? undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAddresses'] });
      setIsAdding(false);
      resetForm();
      alert('آدرس با موفقیت اضافه شد');
    },
    onError: (error: any) => {
      alert('خطا در افزودن آدرس: ' + (error?.response?.data?.message || 'خطای نامشخص'));
    },
  });

  const editMut = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Address> }) =>
      editAddress(id, data, token ?? undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAddresses'] });
      setEditingId(null);
      resetForm();
      alert('آدرس با موفقیت ویرایش شد');
    },
    onError: (error: any) => {
      alert('خطا در ویرایش آدرس: ' + (error?.response?.data?.message || 'خطای نامشخص'));
    },
  });

  const delMut = useMutation({
    mutationFn: (id: number) => deleteAddress(id, token ?? undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myAddresses'] });
      alert('آدرس با موفقیت حذف شد');
    },
    onError: (error: any) => {
      alert('خطا در حذف آدرس: ' + (error?.response?.data?.message || 'خطای نامشخص'));
    },
  });

  const startEdit = (a: any) => {
    setEditingId(a.id);
    setIsAdding(false);
    setForm({
      province: a.province || '',
      city: a.city || '',
      address: a.address || '',
      plate: a.plate || '',
      unit: a.unit || '',
      Postal_code: a.Postal_code || '',
      receiver: a.receiver || '',
    });
  };

  const cancelAll = () => {
    setEditingId(null);
    setIsAdding(false);
    resetForm();
  };

  const handleAdd = () => {
    if (!validate()) {
      alert('لطفاً تمام فیلدهای ضروری را پر کنید');
      return;
    }
    addMut.mutate(form);
  };

  const handleEdit = (id: number) => {
    if (!validate()) {
      alert('لطفاً تمام فیلدهای ضروری را پر کنید');
      return;
    }
    editMut.mutate({ id, data: form });
  };

  const handleDelete = (id: number) => {
    if (confirm('آیا از حذف این آدرس اطمینان دارید؟')) {
      delMut.mutate(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-amber-500" />
            آدرس‌های من
          </h2>
          {!isAdding && editingId === null && (
            <Button
              onClick={() => {
                resetForm();
                setIsAdding(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow hover:shadow-lg transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              آدرس جدید
            </Button>
          )}
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">در حال بارگذاری...</p>
          </div>
        )}

        {isError && <ErrorHandler text="خطا در بارگذاری آدرس‌ها" onRetry={refetch} />}

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

        <div className="space-y-4">
          {!isLoading && addresses && addresses.length > 0 ? (
            addresses.map((a: any) => (
              <div key={a.id}>
                {editingId === a.id ? (
                  <AddressForm
                    title="ویرایش آدرس"
                    form={form}
                    onChange={setForm}
                    onSubmit={() => handleEdit(a.id)}
                    onCancel={cancelAll}
                    submitting={editMut.isPending}
                  />
                ) : (
                  <div className="relative p-5 rounded-xl border-2 border-gray-200 hover:border-amber-200 bg-white/50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Home className="w-4 h-4 text-amber-600" />
                          <h3 className="font-semibold text-gray-800">{a.receiver}</h3>
                        </div>
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          {a.province} - {a.city} - {a.address}
                          {a.plate && ` - پلاک ${a.plate}`}
                          {a.unit && ` - واحد ${a.unit}`}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>کد پستی: {a.Postal_code}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEdit(a)}
                          disabled={delMut.isPending}
                          className="p-2 hover:bg-amber-100 rounded-lg transition group"
                          title="ویرایش"
                        >
                          <Edit2 className="w-4 h-4 text-gray-400 group-hover:text-amber-600" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(a.id)}
                          disabled={delMut.isPending}
                          className="p-2 hover:bg-red-50 rounded-lg transition group disabled:opacity-50"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            !isLoading && (
              <div className="text-center py-12">
                <MapPin className="w-20 h-20 text-amber-200 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">هنوز آدرسی ثبت نکرده‌اید</p>
                {!isAdding && editingId === null && (
                  <Button
                    onClick={() => {
                      resetForm();
                      setIsAdding(true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow hover:shadow-lg transition inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    افزودن اولین آدرس
                  </Button>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
