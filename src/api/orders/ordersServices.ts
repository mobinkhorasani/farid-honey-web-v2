import { Instance } from "@/lib/axiosInstance";



export const submitOrder = async (cartId: string , data : string) => {
    const res = await Instance.post(`/order/submit-order/${cartId}`,data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};
