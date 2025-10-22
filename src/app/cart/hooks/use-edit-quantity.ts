import { useMutation } from "@tanstack/react-query";
import { editCart } from "@/api/cart/cart-services";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

interface EditQuantityParams {
  productId: string | number;
  updatedData: any;
}

export const useEditQuantity = () => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ productId, updatedData }: EditQuantityParams) =>
      editCart(updatedData, token ?? undefined , productId),
    onSuccess: () => {
      toast.success("مقدار با موفقیت ویرایش شد");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "خطا در ویرایش سبد خرید");
    },
  });
};
