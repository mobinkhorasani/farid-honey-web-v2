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

export const refreshToken = async () => {
  const res = await InstanceAuth.post(`/auth/refresh-token`);
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

export type UpdateUserPayload = {
  name: string;
  phone_number: string;
};

export type UserDto = {
  id: number;
  name: string;
  phone_number: string;
};

export const editUser = async (updatedData: UpdateUserPayload, token?: string): Promise<UserDto> => {
  const res = await Instance.patch('/user/edit', updatedData, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return res.data.user || res.data;
};