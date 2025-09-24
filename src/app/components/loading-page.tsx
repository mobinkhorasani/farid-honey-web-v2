"use client";

interface LoadingPageProps {
  text?: string;
}

export const LoadingPage = ({ text = "در حال بارگذاری..." }: LoadingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex justify-center items-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-amber-200 rounded-full animate-pulse"></div>
          <div className="w-20 h-20 border-4 border-t-amber-500 rounded-full animate-spin absolute top-0"></div>
        </div>
        <p className="mt-4 text-amber-700 font-medium">{text}</p>
      </div>
    </div>
  );
};
