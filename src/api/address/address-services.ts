import { Instance } from '@/lib/axios-Instance';

export interface Address {
  id?: number;
  province: string;
  city: string;
  address: string;
  plate: string;
  unit: string;
  Postal_code: string;
  receiver: string;
  isDefault?: boolean;
}

// Helper to convert Persian/Arabic digits to English
const toEnglishDigits = (str: string): string => {
  if (!str) return '';
  return str
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString())
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());
};

export const getMyAddresses = async (token?: string) => {
  const res = await Instance.get('/address/my-addresses', {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return res.data.addresses || res.data;
};

export const addAddress = async (addressData: Address, token?: string) => {
  // Convert digits to English
  const cleanData = {
    ...addressData,
    plate: toEnglishDigits(addressData.plate || ''),
    unit: toEnglishDigits(addressData.unit || ''),
    postal_code: toEnglishDigits(addressData.Postal_code || ''),
  };
  
  const res = await Instance.post('/address/add-address', cleanData, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return res.data.address || res.data;
};

export const editAddress = async (
  addressId: number,
  updatedData: Partial<Address>,
  token?: string
) => {
  // Convert digits to English
  const cleanData: any = { ...updatedData };
  
  if (cleanData.plate) cleanData.plate = toEnglishDigits(cleanData.plate);
  if (cleanData.unit) cleanData.unit = toEnglishDigits(cleanData.unit);
  if (cleanData.Postal_code) {
    cleanData.postal_code = toEnglishDigits(cleanData.Postal_code);
    delete cleanData.Postal_code;
  }
  
  const res = await Instance.patch(
    `/address/edit-address/${addressId}`,
    cleanData,
    {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  return res.data.address || res.data;
};

export const deleteAddress = async (addressId: number, token?: string) => {
  const res = await Instance.delete(`/address/delete-address/${addressId}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return res.data;
};