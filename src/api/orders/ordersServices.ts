import { Instance } from "@/lib/axiosInstance";



export const submitOrder = async (CartId: string) => {
    const res = await Instance.post(`/orders/submit-order`, CartId, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.data;
};
