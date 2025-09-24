"use client";

import { Trash2 } from "lucide-react";
import { useDeleteItem } from "../hooks";
import { Button } from "@/components/ui/button";


interface DeleteButtonProps {
    productId: string;
    refetch: () => void
}

export const DeleteItemButton = ({ productId, refetch }: DeleteButtonProps) => {
    const { mutate: deleteItem, isPending } = useDeleteItem(refetch);

    return (
        <Button
            onClick={() => deleteItem(productId)}
            disabled={isPending}
            className="p-2 hover:bg-red-50 rounded-lg transition group disabled:opacity-50"
        >
            {isPending ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
            ) : (
                <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
            )}
        </Button>
    );
}
