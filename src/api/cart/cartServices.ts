import { Instance } from '@/lib/axiosInstance';

export const getCartInfo = async (token?: string) => {
  const res = await Instance.get('/cart/get-cart',
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  return res.data;
};


export const addToCart = async (data: any, token?: string) => {
  const res = await Instance.post("/cart/add-cart", data, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
  return res.data
}


export const deleteItem = async (id: string, token?: string) => {
  const res = await Instance.delete(`/cart/delete-item/${id}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return res.data;
};




export const editCart = async (updatedData: any, token?: string , productId ?: string | number) => {
  const res = await Instance.patch(
    `/cart/update-item/${productId}`,
    updatedData,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  return res.data;
};
