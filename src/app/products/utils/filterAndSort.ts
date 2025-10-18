import type { ProductCardData } from "@/types/d.type";

// 🆕 تابع کمکی برای تبدیل قیمت به عدد (بهبود یافته)
const parsePrice = (price: string | number | undefined): number => {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  
  // تبدیل قیمت string به number
  const cleanPrice = price
    .toString()
    .replace(/[٬,]/g, '') // حذف کاما فارسی و انگلیسی
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString()); // تبدیل اعداد فارسی
    
  return parseInt(cleanPrice) || 0;
};

export const inPriceRange = (price: string | number = 0, range: string) => {
  const numPrice = parsePrice(price); // 🆕 استفاده از تابع جدید

  switch (range) {
    case "زیر ۲۰۰ هزار":
      return numPrice < 200_000;
    case "۲۰۰-۴۰۰ هزار":
      return numPrice >= 200_000 && numPrice <= 400_000;
    case "بالای ۴۰۰ هزار":
      return numPrice > 400_000;
    case "فیلتر بر اساس قیمت":
    default:
      return true;
  }
};

export const matchesCategory = (productName: string, category: string): boolean => {
  if (category === "همه محصولات") return true;
  
  const name = productName.toLowerCase();
  
  switch (category) {
    case "ژل رویال":
      return name.includes("ژل رویال") || name.includes("ژل‌رویال");
    case "گرده گل":
      return name.includes("گرده گل") || name.includes("گرده‌گل");
    case "عسل طبیعی":
      return (
        name.includes("عسل") && 
        !name.includes("ژل رویال") && 
        !name.includes("گرده گل")
      );
    default:
      return true;
  }
};

export const filterProducts = (
  items: ProductCardData[],
  category: string,
  priceRange: string
): ProductCardData[] => {
  return items.filter((p) => {
    if (!matchesCategory(p.name, category)) return false;
    if (!inPriceRange(p.price ?? 0, priceRange)) return false;
    return true;
  });
};

// 🆕 تابع مرتب‌سازی بهبود یافته
export const sortProducts = (items: ProductCardData[], sortBy: string): ProductCardData[] => {
  const list = [...items];
  
  switch (sortBy) {
    case "ارزان‌ترین":
      return list.sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        return priceA - priceB;
      });
      
    case "گران‌ترین":
      return list.sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        return priceB - priceA;
      });
      
    case "مرتب‌سازی":
    default:
      return list; // بدون تغییر
  }
};