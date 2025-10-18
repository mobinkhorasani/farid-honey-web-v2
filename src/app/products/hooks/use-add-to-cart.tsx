import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/api/cart/cartServices";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/authContext";

export const useAddToCart = () => {
  const router = useRouter();
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      if (!token) {
        router.push("/auth/register");
        throw new Error("No token found");
      }

      return await addToCart(data, token);
    },
    retry: false,
    onSuccess: () => {
      toast.success("محصول به سبد خرید اضافه شد 🎉");
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (error: any) => {
      if (error?.response?.status === 401 || error.message === "No token found") {
        toast.error("لطفا ابتدا وارد شوید");
        router.push("/auth/register");
      } else {        
        toast.error(error?.response?.data ||"مشکلی در افزودن محصول پیش آمد ❌");
      }
    },
  });
};
