"use client"

import { getCartInfo } from "@/api/cart/cartServices";
import { useAuth } from "@/context/authContext";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CartFeatures, CartItem, CartSummary, EmptyCart } from "./components";
import { LoadingPage } from "../components/loading-page";
import { ErrorHandler } from "../components/error-handler";
import { convertPersianPrice } from "@/lib/convertPersianPrice";
import { convertPersianToEnglish } from "@/lib/converEnglishToPersianNumber";
import { LoginRequired } from "../components/login-required";


export default function CartPage() {
    const { token } = useAuth();
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});


    const { data, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ["Cart"],
        queryFn: () => getCartInfo(token ?? undefined),
        enabled: !!token
    });


    const formatPrice = (price: number) => {
        return price.toLocaleString('fa-IR');
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setQuantities(prev => ({
            ...prev,
            [productId]: newQuantity
        }));
    };


    if (!token) {
        return <LoginRequired />;
    }

    if (isLoading || isFetching) {
        return <LoadingPage />;
    }

    if (isError || !data) {
        return (
            <ErrorHandler text="مشکلی در بارگذاری سبد خرید پیش آمده" onRetry={refetch} />
        );
    }

    const isEmpty = !data.products || data.products.length === 0;

    if (isEmpty) {
        return <EmptyCart />;
    }

    const calculateTotal = () => {
        if (data?.total_price) {
            return convertPersianPrice(data.total_price);
        }

        return data?.products.reduce((total: number, product: any) => {
            const quantity = Number(
                quantities[product.id] ?? convertPersianToEnglish(product.quantity, true)
            );
            const price = Number(convertPersianPrice(product.price));
            return total + price * quantity;
        }, 0);
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
            <div className="fixed top-20 right-20 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl" />
            <div className="fixed bottom-20 left-20 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">سبد خرید</h1>
                    <p className="text-gray-600">{data?.products?.length} محصول در سبد خرید شما</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {data?.products.map((product: any) => {
                            const currentQuantity =
                                quantities[product.id] || convertPersianToEnglish(product.quantity);

                            return (
                                <CartItem
                                    key={product.id}
                                    product={product}
                                    currentQuantity={currentQuantity}
                                    updateQuantity={updateQuantity}
                                    refetch={refetch}
                                />
                            );
                        })}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-[100px] space-y-4">
                            <CartSummary total={calculateTotal()} formatPrice={formatPrice} />
                            <CartFeatures />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
