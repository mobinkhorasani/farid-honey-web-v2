"use client";

import Image from "next/image";
import { DeleteItemButton, QuantityButton } from "./";
import React from "react";
import { Package, Sparkles } from "lucide-react";

interface CartItemProps {
    product: any;
    currentQuantity: number;
    updateQuantity: (productId: string, newQty: number) => void;
    refetch: () => void;
}

export const CartItem = ({ product, currentQuantity, updateQuantity, refetch }: CartItemProps) => {
    return (
        <div className="group relative bg-gradient-to-br from-white via-white to-amber-50/30 backdrop-blur rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-orange-200/20 to-transparent rounded-full blur-xl" />

            {/* Mobile Layout */}
            <div className="sm:hidden relative p-4">
                <div className="flex gap-3 mb-4">
                    <div className="relative">
                        <div className="relative w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-50 rounded-2xl overflow-hidden shadow-md">
                            <Image
                                src={product.image_url || "/default-honey.jpg"}
                                alt={product?.name}
                                fill
                                sizes="96px"
                                className="object-cover"
                            />
                            {/* Size Badge */}
                            <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
                                {product.size}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="text-base font-bold text-gray-800 leading-tight">
                                {product?.name}
                            </h3>
                            <DeleteItemButton productId={product?.id} refetch={refetch} />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                            <Package className="w-3 h-3" />
                            <span>سایز {product?.size}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-500 text-transparent bg-clip-text">
                                {product.price}
                            </span>
                            <span className="text-xs text-gray-500">تومان</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">تعداد:</span>
                        <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-lg shadow-sm p-1">
                            <QuantityButton
                                type="decrement"
                                productId={product?.id}
                                currentQuantity={currentQuantity}
                                onQuantityChange={(newQty) => updateQuantity(product.id, newQty)}
                            />
                            <span className="w-12 text-center font-bold text-gray-800 text-lg">
                                {currentQuantity}
                            </span>
                            <QuantityButton
                                type="increment"
                                productId={product?.id}
                                currentQuantity={currentQuantity}
                                onQuantityChange={(newQty) => updateQuantity(product.id, newQty)}
                            />
                        </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-amber-200/50 flex justify-between items-center">
                        <span className="text-xs text-gray-600">قیمت:</span>
                        <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span className="font-bold text-gray-800">
                                {product?.price}
                            </span>
                            <span className="text-xs text-gray-600">تومان</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block p-6">
                <div className="flex gap-6">

                    <div className="relative">
                        <div className="relative w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-50 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                            <Image
                                src={product.image_url || "/default-honey.jpg"}
                                alt={product?.name}
                                fill
                                sizes="128px"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                                {product.size}
                            </div>

                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Package className="w-4 h-4" />
                                    <span>سایز: {product.size}</span>
                                </div>
                            </div>
                            <DeleteItemButton productId={product?.id} refetch={refetch} />
                        </div>

                        <div className="flex items-center justify-between mt-6">

                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600">تعداد:</span>
                                <div className="flex items-center gap-1 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-1.5 shadow-inner">
                                    <QuantityButton
                                        type="decrement"
                                        productId={product?.id}
                                        currentQuantity={currentQuantity}
                                        onQuantityChange={(newQty) => updateQuantity(product.id, newQty)}
                                    />
                                    <span className="w-14 text-center font-bold text-lg text-gray-800">
                                        {currentQuantity}
                                    </span>
                                    <QuantityButton
                                        type="increment"
                                        productId={product?.id}
                                        currentQuantity={currentQuantity}
                                        onQuantityChange={(newQty) => updateQuantity(product.id, newQty)}
                                    />
                                </div>
                            </div>

                            {/* Price Section */}
                            <div className="text-left">
                                <p className="text-xs text-gray-500 mb-1">قیمت</p>
                                <div className="flex items-center gap-1">
                                    <Sparkles className="w-4 h-4 text-amber-500" />
                                    <p className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 text-transparent bg-clip-text">
                                        {product?.price}
                                    </p>
                                    <span className="text-sm text-gray-600">تومان</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};