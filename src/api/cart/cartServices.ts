import { Instance } from '@/lib/axiosInstance';

export const getCartInfo = async () => {
  const res = await Instance.get('/carts/get-cart');
  return res.data;
};


export const addToCart = async (Data: any) => {
    const res = await Instance.post(`/carts/add-cart`, Data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};


export const deleteItem = async (id:string) => {
    const res = await Instance.delete(`/carts/delete-item/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};




export const editCart= async (updatedData: any) => {
  const res = await Instance.patch(
    `/carts/update-item`,
    updatedData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
