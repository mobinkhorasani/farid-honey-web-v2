"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { useEditQuantity } from "../hooks";

interface QuantityButtonProps {
  type: "increment" | "decrement";
  productId: string;
  currentQuantity: number;
  onQuantityChange: (newQty: number) => void; // اضافه شد
}

export const QuantityButton = ({
  type,
  productId,
  currentQuantity,
  onQuantityChange,
}: QuantityButtonProps) => {

  const isIncrease = type === "increment";
  const { mutate, isPending } = useEditQuantity();

  const handleClick = () => {
    if (!isIncrease && currentQuantity <= 1) return;

    const newQty = isIncrease ? currentQuantity + 1 : currentQuantity - 1;

    // آپدیت فوری UI
    onQuantityChange(newQty);

    // ارسال به سرور
    mutate({
      productId,
      updatedData: { action: type },
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending || (!isIncrease && currentQuantity <= 1)}
      className={`w-8 h-8 rounded transition flex items-center justify-center
        ${isPending || (!isIncrease && currentQuantity <= 1) ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-100"}
      `}
    >
      {isIncrease ? <Plus className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
    </Button>
  );
};
