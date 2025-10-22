import { useMutation } from "@tanstack/react-query";
import { deleteItem } from "@/api/cart/cart-services";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";

export const useDeleteItem = (refetch:()=>void) => {
    const { token } = useAuth();

    return useMutation({
        mutationFn: (id: string) => deleteItem(id, token ?? undefined),
        onSuccess: () => {
            refetch?.()
            toast.success("محصول مورد نظر با موفیقت از سبد خرید شما حذف شد")
        },
        onError: (error) => {
            toast.error(`${error}`)
        },
    });
};
