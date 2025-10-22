"use client";

import { companyInfo } from "@/lib/stores";
import { convertPersianToEnglish } from "@/lib/conver-english-to-persian-number";

interface BulkOrderButtonProps {
  productName: string;
  currentSize?: { size: string };
  disabled?: boolean;
}

export default function BulkOrderButton({
  productName,
  currentSize,
  disabled,
}: BulkOrderButtonProps) {
  const whatsappNumber = convertPersianToEnglish(
    companyInfo.whatsapp || "989359558289"
  );

  const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `سلام ، من می‌خوام سفارش عمده محصول "${productName}" با سایز "${currentSize?.size || "-"}" ثبت کنم`
  )}`;

  return (
    <a
      href={disabled ? undefined : link}
      target="_blank"
      rel="noopener noreferrer"
      className={`px-6 border-2 rounded-2xl font-medium transition text-center flex items-center justify-center
        ${
          !disabled
            ? "bg-white border-amber-400 text-amber-600 hover:bg-amber-50"
            : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed pointer-events-none"
        }`}
    >
      خرید عمده
    </a>
  );
}
