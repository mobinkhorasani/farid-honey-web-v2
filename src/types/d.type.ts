// src/types/d.type.ts
import type { ComponentType } from "react";

export type Category = {
  id: string;
  title: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
};

/**
 * شکل داده‌ای که از API می‌آید
 * توجه: price اختیاری است تا با بک‌اند فعلی (که ممکن است قیمت ندهد) سازگار باشد.
 */
export interface ApiProduct {
  id: string;
  name: string;
  image_url: string | null;
  price?: number | null;     // ← اضافه شد تا خطای "price وجود ندارد" رفع شود
}

/**
 * پاسخ لیست محصولات از API
 */
export interface ProductsResponse {
  products: ApiProduct[];
}

/**
 * داده‌ی موردنیاز کامپوننت کارت (ProductCard)
 * این همانی است که به ProductCard پاس می‌دهیم.
 */
export interface ProductCardData {
  id: string | number;
  title: string;             // از name
  subtitle?: string;
  price: number;             // برای کارت اجباری نگه‌داشتیم؛ در ترنسفورم مقدار پیش‌فرض بده
  images: string[];
  tag?: string;
}
