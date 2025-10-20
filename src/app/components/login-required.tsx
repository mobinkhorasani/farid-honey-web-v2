"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export const LoginRequired = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex justify-center items-center px-4">
      <div className="text-center bg-white/80 backdrop-blur p-8 rounded-3xl shadow-xl max-w-md">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
            <LogIn className="w-10 h-10 text-amber-500" />
          </div>
        </div>
        <p className="text-gray-800 text-xl font-semibold mb-6">
          شما برای مشاهده‌ی سبد خرید خود ابتدا وارد اکانت خود شوید
        </p>
        <Button
          onClick={() => router.push("/auth/login")}
          className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-lg transition cursor-pointer"
        >
          ورود به حساب کاربری
        </Button>
      </div>
    </div>
  );
};
