// ============================================
// File: components/Edit-Profile-Modal.tsx
// ============================================
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { X, Mail, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  validateName, 
  validatePhone, 
  validateEmail,
  validateBirthDate,
  digitsFaToEn 
} from '../utils/validation';

type EditProfileModalProps = {
  open: boolean;
  onClose: () => void;
  initialName?: string;
  initialPhone?: string;
  initialEmail?: string;
  initialBirthDate?: string;
  onSubmit: (payload: { 
    name: string; 
    phone_number: string; 
    email?: string; 
    birth_date?: string; 
  }) => void;
  submitting?: boolean;
};

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  onClose,
  initialName = '',
  initialPhone = '',
  initialEmail = '',
  initialBirthDate = '',
  onSubmit,
  submitting = false,
}) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);
  const [birthDate, setBirthDate] = useState(initialBirthDate);
  const [errors, setErrors] = useState<{ 
    name?: string; 
    phone?: string; 
    email?: string;
    birthDate?: string;
  }>({});

  useEffect(() => {
    if (open) {
      setName(initialName);
      setPhone(initialPhone);
      setEmail(initialEmail);
      setBirthDate(initialBirthDate);
      setErrors({});
    }
  }, [open, initialName, initialPhone, initialEmail, initialBirthDate]);

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
    const emailError = email ? validateEmail(email) : undefined;
    const birthDateError = birthDate ? validateBirthDate(birthDate) : undefined;
    
    const newErrors: { 
      name?: string; 
      phone?: string; 
      email?: string;
      birthDate?: string;
    } = {};
    
    if (nameError) newErrors.name = nameError;
    if (phoneError) newErrors.phone = phoneError;
    if (emailError) newErrors.email = emailError;
    if (birthDateError) newErrors.birthDate = birthDateError;
    
    setErrors(newErrors);

    if (nameError || phoneError || emailError || birthDateError) {
      const firstError = nameError ?? phoneError ?? emailError ?? birthDateError;
      toast.error('خطای اعتبارسنجی', {
        description: firstError,
      });
    }

    return Object.keys(newErrors).length === 0;
  }, [name, phone, email, birthDate]);

  const handleSubmit = useCallback(() => {
    if (submitting) return;
    if (!validate()) return;

    const payload = {
      name: name.trim(),
      phone_number: digitsFaToEn(phone.trim()),
      email: email ? email.trim() : undefined,
      birth_date: birthDate ? birthDate.trim() : undefined,
    };

    onSubmit(payload);
  }, [validate, submitting, name, phone, email, birthDate, onSubmit]);

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
          {/* نام و نام خانوادگی */}
          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium mb-2 text-gray-700">
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

          {/* شماره موبایل */}
          <div>
            <label htmlFor="profile-phone" className="block text-sm font-medium mb-2 text-gray-700">
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

          {/* ایمیل */}
          <div>
            <label htmlFor="profile-email" className="block text-sm font-medium mb-2 text-gray-700 items-center gap-1">
              <Mail className="w-4 h-4 text-amber-500" />
              آدرس ایمیل
            </label>
            <Input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputMode="email"
              dir="ltr"
              className={`border ${
                errors.email
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-amber-200 focus:border-amber-400'
              } rounded-lg`}
              placeholder="example@gmail.com"
              disabled={submitting}
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            <p className="mt-1 text-xs text-gray-500">ایمیل اختیاری است</p>
          </div>

          {/* تاریخ تولد */}
          <div>
            <label htmlFor="profile-birthdate" className="block text-sm font-medium mb-2 text-gray-700 items-center gap-1">
              <Calendar className="w-4 h-4 text-amber-500" />
              تاریخ تولد
            </label>
            <Input
              id="profile-birthdate"
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className={`border ${
                errors.birthDate
                  ? 'border-red-400 focus:border-red-400'
                  : 'border-amber-200 focus:border-amber-400'
              } rounded-lg`}
              placeholder="1370/01/01"
              disabled={submitting}
            />
            {errors.birthDate && <p className="mt-1 text-xs text-red-600">{errors.birthDate}</p>}
            <p className="mt-1 text-xs text-gray-500">تاریخ تولد اختیاری است</p>
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