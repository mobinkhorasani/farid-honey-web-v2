"use client" 

import { useQuery } from "@tanstack/react-query";
import { getCartInfo } from "@/api/cart/cartServices";
import { useAuth } from "@/context/authContext";
import { ShoppingCart } from "lucide-react";

export const CartIcon = () => {
  const { token } = useAuth();
  const { data } = useQuery({
    queryKey: ["Cart"],
    queryFn: () => getCartInfo(token ?? undefined),
  });

  const itemCount = data?.products?.length ?? 0;

  return (
    <div className="relative">
      <ShoppingCart className="w-6 h-6 text-gray-800" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
};
