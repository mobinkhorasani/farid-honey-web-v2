"use client";

import { getProductsList } from "@/api/products/productsServices";
import { useQuery } from "@tanstack/react-query";

export default function ProductsPage() {

    const {
        data: products = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["products"],
        queryFn: getProductsList,
    });

    console.log(products?.products);
    


    return (
        <div>
            products page
        </div>
    );
};