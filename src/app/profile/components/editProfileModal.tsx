

// ============================================
// File: components/Edit-Profile-Modal.tsx
// ============================================
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { validateName, validatePhone, digitsFaToEn } from '../utils/validation';

type EditProfileModalProps = {
  open: boolean;
  onClose: () => void;
  initialName?: string;
  initialPhone?: string;
  onSubmit: (payload: { name: string; phone_number: string }) => void;
  submitting?: boolean;
};

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  onClose,
  initialName = '',
  initialPhone = '',
  onSubmit,
  submitting = false,
}) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  useEffect(() => {
    if (open) {
      setName(initialName);
      setPhone(initialPhone);
      setErrors({});
    }
  }, [open, initialName, initialPhone]);

  useEffect(() => {
    if (!open) return;
    
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const validate = useCallback(() => {
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    
    const newErrors: { name?: string; phone?: string } = {};
    
    if (nameError) newErrors.name = nameError;
    if (phoneError) newErrors.phone = phoneError;
    
    setErrors(newErrors);

    if (nameError || phoneError) {
      toast.error('خطای اعتبارسنجی', {
        description: nameError ?? phoneError,
      });
    }

    return Object.keys(newErrors).length === 0;
  }, [name, phone]);

  const handleSubmit = useCallback(() => {
    if (submitting) return;
    if (!validate()) return;

    const payload = {
      name: name.trim(),
      phone_number: digitsFaToEn(phone.trim()),
    };

    onSubmit(payload);
  }, [validate, submitting, name, phone, onSubmit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !submitting) {
      e.preventDefault();
      handleSubmit();
    }
  }, [submitting, handleSubmit]);

  useEffect(() => {
    if (!open) return;
    
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !submitting) onClose();
    };
    
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, submitting, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="edit-profile-title"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => !submitting && onClose()}
        aria-hidden="true"
      />

      <div className="relative z-[1001] w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-black">
        <div className="flex items-center justify-between mb-4">
          <h3 id="edit-profile-title" className="text-lg font-semibold">
            ویرایش اطلاعات کاربر
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            aria-label="بستن"
            disabled={submitting}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4" onKeyDown={handleKeyDown}>
          <div>
            <label htmlFor="profile-name" className="block text-sm mb-2">
              نام و نام خانوادگی
            </label>
            <Input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              className={`border ${
                errors.name
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-amber-200 focus:border-amber-400'
              } rounded-lg`}
              placeholder="مثلاً علی رضایی"
              disabled={submitting}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="profile-phone" className="block text-sm mb-2">
              شماره موبایل
            </label>
            <Input
              id="profile-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              className={`border ${
                errors.phone
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-amber-200 focus:border-amber-400'
              } rounded-lg`}
              placeholder="مثلاً 0912xxxxxxx"
              disabled={submitting}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button
            onClick={onClose}
            disabled={submitting}
            variant="secondary"
            className="rounded-lg"
          >
            انصراف
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-500 text-black disabled:opacity-50"
          >
            {submitting ? 'در حال ذخیره...' : 'ذخیره'}
          </Button>
        </div>
      </div>
    </div>
  );
};
