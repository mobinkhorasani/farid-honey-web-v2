import { useMutation } from "@tanstack/react-query";
import { editCart } from "@/api/cart/cartServices";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";

interface EditQuantityParams {
  productId: string;
  updatedData: any;
}

export const useEditQuantity = (refetch?: () => void) => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: ({ productId, updatedData }: EditQuantityParams) =>
      editCart(updatedData, token ?? undefined , productId),
    onSuccess: () => {
    //   refetch?.();
      toast.success("مقدار با موفقیت ویرایش شد");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "خطا در ویرایش سبد خرید");
    },
  });
};
