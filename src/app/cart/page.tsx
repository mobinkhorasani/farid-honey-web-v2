"use client"

import { getCartInfo } from "@/api/cart/cartServices";
import { useAuth } from "@/context/authContext";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { CartFeatures, CartItem, CartSummary } from "./components";
import { LoadingPage } from "../components/loading-page";
import { ErrorHandler } from "../components/error-handler";
import {
    ShoppingBag,
    ArrowLeft,
} from "lucide-react";

export default function CartPage() {
    const { token } = useAuth();
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    const { data, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ["Cart"],
        queryFn: () => getCartInfo(token ?? undefined),
        enabled: !!token
    });


    const convertPersianPrice = (price: string) => {
        if (!price) return 0;
        const englishNumbers = price
            .replace(/۰/g, '0')
            .replace(/۱/g, '1')
            .replace(/۲/g, '2')
            .replace(/۳/g, '3')
            .replace(/۴/g, '4')
            .replace(/۵/g, '5')
            .replace(/۶/g, '6')
            .replace(/۷/g, '7')
            .replace(/۸/g, '8')
            .replace(/۹/g, '9')
            .replace(/٬/g, '')
            .replace(/,/g, '');
        return parseInt(englishNumbers);
    };

    const convertPersianToEnglishNumber = (persianNum: string) => {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        let englishNum = persianNum;
        for (let i = 0; i < persianNumbers.length; i++) {
            englishNum = englishNum.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
        }
        return parseInt(englishNum);
    };

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

    if (isLoading || isFetching) {
        return (
            <LoadingPage />
        );
    }

    if (isError || !data) {
        return (
            <ErrorHandler text="مشکلی در بارگذاری سبد خرید پیش آمده" onRetry={refetch} />
        );
    }

    const isEmpty = !data.products || data.products.length === 0;

    if (isEmpty) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex justify-center items-center">
                <div className="text-center">
                    <div className="relative inline-block">
                        <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                            <ShoppingBag className="w-16 h-16 text-amber-500" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            0
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">سبد خرید شما خالی است</h2>
                    <p className="text-gray-600 mb-8">محصولات مورد علاقه خود را اضافه کنید</p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-xl transform hover:-translate-y-0.5 transition"
                    >
                        مشاهده محصولات
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        );
    }


    console.log(data);

    const calculateTotal = () => {
        if (data?.total_price) {
            return convertPersianPrice(data.total_price);
        }
        return data?.products.reduce((total: number, product: any) => {
            const quantity = quantities[product.id] || convertPersianToEnglishNumber(product.quantity);
            const price = convertPersianPrice(product.price);
            return total + (price * quantity);
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
                                quantities[product.id] || convertPersianToEnglishNumber(product.quantity);

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
                        <div className="sticky top-8 space-y-4">
                            <CartSummary total={calculateTotal()} formatPrice={formatPrice} />
                            <CartFeatures />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}