import { useMutation } from "@tanstack/react-query";
import { deleteItem } from "@/api/cart/cartServices";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteItem = (refetch: () => void) => {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteItem(id, token ?? undefined),
        onSuccess: () => {
            refetch?.();
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success("محصول مورد نظر با موفقیت از سبد خرید شما حذف شد");
        },
        onError: (error) => {
            toast.error(`${error}`);
        },
    });
};