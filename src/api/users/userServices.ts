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


export const getUserInfo = async () => {
  const res = await Instance.get('/user/me');
  return res.data;
};


export const editUser = async (updatedData: any) => {
  const res = await Instance.patch(
    `/user/edit`,
    updatedData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
