import { Instance, InstanceAuth } from '@/lib/axiosInstance';

export const signUp = async (Data: any) => {
    const res = await Instance.post(`/user/register`, Data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};


export const login = async (Data: any) => {
    const res = await InstanceAuth.post(`/auth/login`, Data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};


export const getUserInfo = async (token?: string) => {
  const res = await Instance.get('/user/me', {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return res.data.user || res.data;
};

// @/api/users/userServices.ts
export type UpdateUserPayload = {
  name: string;
  phone_number: string; // ← مطمئن شو فرم هم همین کلید رو می‌فرسته
};

export type UserDto = {
  id: number;
  name: string;
  phone_number: string;
  // هر فیلد دیگری که API برمی‌گرداند...
};

// همانی که دادی + تایپ خروجی
export const editUser = async (updatedData: UpdateUserPayload, token?: string): Promise<UserDto> => {
  const res = await Instance.patch('/user/edit', updatedData, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  // API تو گفتی res.data.user یا res.data
  return res.data.user || res.data;
};