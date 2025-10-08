import { Instance } from '@/lib/axiosInstance';

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
  const res = await Instance.post('/address/add-address', addressData, {
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
  const res = await Instance.patch(
    `/address/edit-address/${addressId}`,
    updatedData,
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