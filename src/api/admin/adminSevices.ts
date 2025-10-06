import { InstanceAdmin } from "@/lib/axiosInstance";

export const getOrders = async (token?: string) => {
  const res = await InstanceAdmin.get('/order/get-orders',
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  return res.data;
};

export const getOrderDeteil = async (token?: string , id?:string) => {
  const res = await InstanceAdmin.get(`order/get-order-detail/${id}`,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  return res.data;
};

export const deleteOrder = async (id: string, token?: string) => {
  const res = await InstanceAdmin.delete(`/order/delete-order/${id}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return res.data;
};