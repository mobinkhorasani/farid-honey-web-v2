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


// api/users/userServices.ts
export const getUserInfo = async (token?: string) => {
  const res = await Instance.get('/user/me', {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  // برگرداندن user به جای کل response
  return res.data.user || res.data;
};

export const editUser = async (updatedData: any, token?: string) => {
  const res = await Instance.patch('/user/edit', updatedData, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return res.data.user || res.data;
};