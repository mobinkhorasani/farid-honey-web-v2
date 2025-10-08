'use client';

import React from 'react';
import type { Address } from '@/api/address/addressServices';
import { X } from 'lucide-react';

// ⬅️ shadcn/ui
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
  const set = (patch: Partial<Address>) => onChange({ ...form, ...patch });

  return (
    <div className="mb-4 p-5 rounded-xl border-2 border-amber-300 bg-amber-50/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-black">{title}</h3>
        {showClose && (
          <button
            onClick={onCancel}
            className="p-1 hover:bg-amber-100 rounded"
            title="بستن"
          >
            <X className="w-5 h-5 text-black/60" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          placeholder="استان *"
          value={form.province}
          onChange={(e) => set({ province: e.target.value })}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
        />
        <Input
          type="text"
          placeholder="شهر *"
          value={form.city}
          onChange={(e) => set({ city: e.target.value })}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
        />
        <Input
          type="text"
          placeholder="آدرس کامل *"
          value={form.address}
          onChange={(e) => set({ address: e.target.value })}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400 md:col-span-2"
        />
        <Input
          type="text"
          placeholder="پلاک"
          value={form.plate}
          onChange={(e) => set({ plate: e.target.value })}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
        />
        <Input
          type="text"
          placeholder="واحد"
          value={form.unit}
          onChange={(e) => set({ unit: e.target.value })}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
        />
        <Input
          type="text"
          placeholder="کد پستی *"
          value={form.Postal_code}
          onChange={(e) => set({ Postal_code: e.target.value })}
          className="px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-400"
        />
        <Input
          type="text"
          placeholder="نام گیرنده *"
          value={form.receiver}
          onChange={(e) => set({ receiver: e.target.value })}
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
