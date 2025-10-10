// ============================================
// File: components/Address-Form.tsx
// ============================================
'use client';

import React, { useCallback } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { validationPatterns, digitsFaToEn } from '../utils/validation';

type Address = {
  province: string;
  city: string;
  address: string;
  plate: string;
  unit: string;
  Postal_code: string;
  receiver: string;
};

type AddressFormProps = {
  title: string;
  form: Address;
  onChange: (next: Address) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitting?: boolean;
  showClose?: boolean;
};

export const AddressForm: React.FC<AddressFormProps> = ({
  title,
  form,
  onChange,
  onSubmit,
  onCancel,
  submitting,
  showClose = true,
}) => {
  const set = useCallback(
    (patch: Partial<Address>) => {
      onChange({ ...form, ...patch });
    },
    [form, onChange]
  );

  const handleInputChange = useCallback(
    (field: keyof Address, value: string) => {
      const patternKey = field === 'Postal_code' ? 'postal_code' : field;
      const pattern = validationPatterns[patternKey];

      let processedValue = value;
      if (field === 'plate' || field === 'unit' || field === 'Postal_code') {
        processedValue = digitsFaToEn(value);
      }

      if (processedValue === '' || pattern.test(processedValue)) {
        set({ [field]: processedValue });
      }
    },
    [set]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !submitting) {
        e.preventDefault();
        onSubmit();
      }
    },
    [submitting, onSubmit]
  );

  return (
    <div className="mb-4 p-5 rounded-xl border-2 border-amber-300 bg-amber-50/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-black">{title}</h3>
        {showClose && (
          <button
            onClick={onCancel}
            className="p-1 hover:bg-amber-100 rounded"
            title="بستن"
            disabled={submitting}
          >
            <X className="w-5 h-5 text-black/60" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" onKeyDown={handleKeyDown}>
        <Input
          type="text"
          placeholder="استان *"
          value={form.province}
          onChange={(e) => handleInputChange('province', e.target.value)}
          disabled={submitting}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
        />
        <Input
          type="text"
          placeholder="شهر *"
          value={form.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          disabled={submitting}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
        />
        <Input
          type="text"
          placeholder="آدرس کامل *"
          value={form.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          disabled={submitting}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400 md:col-span-2"
        />
        <Input
          type="text"
          placeholder="پلاک"
          value={form.plate}
          onChange={(e) => handleInputChange('plate', e.target.value)}
          disabled={submitting}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
        />
        <Input
          type="text"
          placeholder="واحد"
          value={form.unit}
          onChange={(e) => handleInputChange('unit', e.target.value)}
          disabled={submitting}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
        />
        <Input
          type="text"
          placeholder="کد پستی * (10 رقم)"
          value={form.Postal_code}
          onChange={(e) => handleInputChange('Postal_code', e.target.value)}
          disabled={submitting}
          maxLength={10}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
        />
        <Input
          type="text"
          placeholder="نام گیرنده *"
          value={form.receiver}
          onChange={(e) => handleInputChange('receiver', e.target.value)}
          disabled={submitting}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
        />
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          onClick={onSubmit}
          disabled={submitting}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-black"
        >
          {submitting ? 'در حال ذخیره...' : 'ذخیره'}
        </Button>

        <Button
          onClick={onCancel}
          disabled={submitting}
          variant="secondary"
          className="px-4 py-2 rounded-lg font-medium transition"
        >
          انصراف
        </Button>
      </div>
    </div>
  );
};