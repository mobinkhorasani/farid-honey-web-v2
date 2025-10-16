"use client";

import { getProductsInfo } from "@/api/products/productsServices";
import { useQuery } from "@tanstack/react-query";
import {
  Star,
  Shield,
  Truck,
  Award,
  Check,
  Sparkles,
  Zap,
  Package,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AddToCartButton } from "../components";
import { LoadingPage } from "@/app/components/loading-page";
import { ErrorHandler } from "@/app/components/error-handler";
import { companyInfo } from "@/lib/stores";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(0);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductsInfo(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !data?.product) {
    return <ErrorHandler text="مشکلی در بارگذاری پیش آمده" onRetry={refetch} />;
  }

  const product = data.product;
  const currentSize = product.sizes?.[selectedSize];

  const convertPersianPrice = (price: string) => {
    if (!price) return 0;
    const englishNumbers = price
      .replace(/۰/g, "0")
      .replace(/۱/g, "1")
      .replace(/۲/g, "2")
      .replace(/۳/g, "3")
      .replace(/۴/g, "4")
      .replace(/۵/g, "5")
      .replace(/۶/g, "6")
      .replace(/۷/g, "7")
      .replace(/۸/g, "8")
      .replace(/۹/g, "9")
      .replace(/٬/g, "")
      .replace(/,/g, "");
    return parseInt(englishNumbers);
  };

  const toEnglishNumbers = (str: string) => {
    return str
      .replace(/۰/g, "0")
      .replace(/۱/g, "1")
      .replace(/۲/g, "2")
      .replace(/۳/g, "3")
      .replace(/۴/g, "4")
      .replace(/۵/g, "5")
      .replace(/۶/g, "6")
      .replace(/۷/g, "7")
      .replace(/۸/g, "8")
      .replace(/۹/g, "9");
  };

  const formatPrice = (price: string) => {
    const numPrice = convertPersianPrice(price);
    return numPrice.toLocaleString("fa-IR");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="fixed top-10 right-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl"></div>
      <div className="fixed bottom-20 left-20 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        <nav className="flex items-center gap-2 text-sm mb-8">
          <span className="text-amber-600 hover:text-amber-700 cursor-pointer">
            خانه
          </span>
          <span className="text-amber-400">/</span>
          <span className="text-amber-600 hover:text-amber-700 cursor-pointer">
            محصولات
          </span>
          <span className="text-amber-400">/</span>
          <span className="text-amber-800 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="sticky top-24">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-300 to-orange-300 rounded-3xl blur opacity-25 group-hover:opacity-40 transition"></div>
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                  <div className="relative w-full h-[500px]">
                    {/* <Image
                      src={product.image_url || "/default-honey.jpg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="object-cover"
                      priority
                      quality={90}
                    /> */}

                    {/* <div className="relative w-full h-64 overflow-hidden rounded-lg"> */}
                      <img
                        src={product.image_url || "/default-honey.jpg"}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    {/* </div> */}

                  </div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {product.category}
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-6 mt-8">
                <div className="text-center">
                  <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-2">
                    <Shield className="w-7 h-7 text-amber-600" />
                  </div>
                  <p className="text-xs text-gray-600">ضمانت اصالت</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-2">
                    <Truck className="w-7 h-7 text-amber-600" />
                  </div>
                  <p className="text-xs text-gray-600">ارسال رایگان</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-2">
                    <Award className="w-7 h-7 text-amber-600" />
                  </div>
                  <p className="text-xs text-gray-600">کیفیت تضمینی</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <div>
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="text-amber-700 font-medium">4.8</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">
                  محصول ویژه
                </span>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur rounded-2xl p-6 border border-amber-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                ویژگی‌های محصول
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {product.description ||
                  "عسل طبیعی با کیفیت برتر، برداشت شده از بهترین مناطق کشور"}
              </p>

              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">100% طبیعی و ارگانیک</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">
                    بدون افزودنی و مواد نگهدارنده
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">دارای مجوز بهداشت</span>
                </div>
              </div>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="bg-white/60 backdrop-blur rounded-2xl p-6 border border-amber-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber-500" />
                  انتخاب سایز
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.sizes.map((size: any, index: number) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(index)}
                      className={`relative p-4 rounded-xl border-2 transition-all ${selectedSize === index
                        ? "border-amber-500 bg-amber-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-amber-300 bg-white/50"
                        }`}
                    >
                      {selectedSize === index && (
                        <div className="absolute top-2 right-2">
                          <Check className="w-5 h-5 text-amber-600" />
                        </div>
                      )}
                      <p className="font-medium text-gray-800 mb-1">
                        {size.size}
                      </p>
                      <p className="text-sm text-amber-600 font-bold">
                        {size.price} تومان
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">قیمت نهایی</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-800">
                      {currentSize ? formatPrice(currentSize.price) : "---"}
                    </span>
                    <span className="text-gray-600">تومان</span>
                  </div>
                  {currentSize && (
                    <p className="text-sm text-gray-500 mt-1">
                      برای سایز {currentSize.size}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-700 font-medium">تعداد:</span>
                <div className="flex items-center gap-2 bg-white rounded-xl p-1 text-black">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg hover:bg-amber-100 transition flex items-center justify-center text-xl font-medium"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg hover:bg-amber-100 transition flex items-center justify-center text-xl font-medium"
                  >
                    +
                  </button>
                </div>
              </div>

              {currentSize && (
                <div className="bg-white/70 backdrop-blur rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      قیمت کل ({quantity} عدد):
                    </span>
                    <span className="text-2xl font-bold text-amber-600">
                      {(
                        convertPersianPrice(currentSize.price) * quantity
                      ).toLocaleString("fa-IR")}{" "}
                      تومان
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <AddToCartButton
                  disabled={!currentSize}
                  product_id={product.id}
                  size={currentSize ? toEnglishNumbers(currentSize.size) : ""}
                  quantity={quantity}
                />
                <a
                  href={`https://wa.me/${toEnglishNumbers(
                    companyInfo.whatsapp || "989359558289"
                  )}?text=${encodeURIComponent(
                    `سلام ، من می‌خوام سفارش عمده محصول "${product.name}" با سایز "${currentSize?.size}" ثبت کنم`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 border-2 rounded-2xl font-medium transition text-center ${currentSize
                    ? "bg-white border-amber-400 text-amber-600 hover:bg-amber-50"
                    : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed pointer-events-none"
                    }`}
                >
                  خرید عمده
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/70 backdrop-blur rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-amber-600">7</p>
                <p className="text-xs text-gray-600">روز ضمانت بازگشت</p>
              </div>
              <div className="bg-white/70 backdrop-blur rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-amber-600">24</p>
                <p className="text-xs text-gray-600">ساعت پشتیبانی</p>
              </div>
              <div className="bg-white/70 backdrop-blur rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-amber-600">+1000</p>
                <p className="text-xs text-gray-600">مشتری راضی</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
