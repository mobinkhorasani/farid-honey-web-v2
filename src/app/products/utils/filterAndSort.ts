import type { ProductCardData } from "@/types/d.type";

export const inPriceRange = (price: string | number = 0, range: string) => {
  let numPrice: number;
  if (typeof price === "number") {
    numPrice = price;
  } else {
    numPrice = parseInt(
      price
        .replace(/٬/g, '') 
        .replace(/,/g, '') 
        .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString()) 
    ) || 0;
  }

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

// ✨ تابع جدید برای چک کردن دسته‌بندی
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

// ✨ تابع اصلاح‌شده filterProducts
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

export const sortProducts = (items: ProductCardData[], sortBy: string) => {
  const list = [...items];
  switch (sortBy) {
    case "ارزان‌ترین":
      return list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    case "گران‌ترین":
      return list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    case "محبوب‌ترین":
      return list.sort((a, b) => a.name.localeCompare(b.name, "fa"));
    case "پرفروش‌ترین":
      return list;
    case "جدیدترین":
    default:
      return list.sort((a, b) => Number(b.id) - Number(a.id));
  }
};