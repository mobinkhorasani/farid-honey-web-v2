"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useAddToCart } from "../hooks";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AddToCartButtonProps {
  disabled?: boolean;
  product_id: string;
  size: string;
  quantity: number;
}

export const AddToCartButton = ({
  disabled = false,
  product_id,
  size,
  quantity,
}: AddToCartButtonProps) => {
  const mutation = useAddToCart();
  const { token } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (!token) {
      toast.error("لطفا ابتدا وارد اکانت خود شوید")
      router.push("/auth/register");
      return;
    }
    if (!disabled) {
      mutation.mutate({
        product_id,
        size,
        quantity,
      });
    }
  };

  return (
    <Button
      disabled={disabled || mutation.isPending}
      onClick={handleClick}
      className={`flex-1 py-4 rounded-2xl font-medium shadow-lg transition flex items-center justify-center gap-2 ${!disabled
        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-xl transform hover:-translate-y-0.5"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
    >
      <ShoppingCart className="w-5 h-5" />
      {mutation.isPending ? "در حال افزودن..." : "افزودن به سبد خرید"}
    </Button>
  );
}
