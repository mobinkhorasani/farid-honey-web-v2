import { Instance } from '@/lib/axiosInstance';

export const signUp = async (Data: any) => {
    const res = await Instance.post(`/users/register`, Data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};


export const login = async (Data: any) => {
    const res = await Instance.post(`/auth/login`, Data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};


export const getUserInfo = async () => {
  const res = await Instance.get('/users/me');
  return res.data;
};


export const editUser = async (updatedData: any) => {
  const res = await Instance.patch(
    `/users/edit`,
    updatedData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
