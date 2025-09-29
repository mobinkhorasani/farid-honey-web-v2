"use client";

import { AlertCircle } from "lucide-react";

interface ErrorHandlerProps {
  text?: string;
  onRetry?: () => void;
}

export const ErrorHandler = ({ text = "مشکلی پیش آمده", onRetry }: ErrorHandlerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex justify-center items-center">
      <div className="text-center bg-white/80 backdrop-blur p-8 rounded-3xl shadow-xl max-w-md">
        <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <p className="text-gray-700 text-xl mb-6">{text}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:shadow-lg transition"
          >
            تلاش مجدد
          </button>
        )}
      </div>
    </div>
  );
};
