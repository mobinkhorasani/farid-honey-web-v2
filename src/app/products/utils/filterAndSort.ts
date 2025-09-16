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


export const filterProducts = (
  items: ProductCardData[],
  category: string,
  priceRange: string
): ProductCardData[] => {
  return items.filter((p) => {
    if (category !== "محبوب‌ترین" && category !== "همه") {
      const t = p.name.toLowerCase();
      switch (category) {
        case "عسل‌های گل‌دار":
          if (!(t.includes("شوید") || t.includes("اکالیپتوس") || t.includes("یونجه"))) return false;
          break;
        case "عسل‌های درختی":
          if (!(t.includes("کنار") || t.includes("زردآلو") || t.includes("سنجد"))) return false;
          break;
        case "عسل‌های کوهستانی":
          if (!(t.includes("کوهستان") || t.includes("آویشن") || t.includes("اسپند"))) return false;
          break;
        case "محصولات زنبور":
          if (!(t.includes("ژل رویال") || t.includes("گرده گل") || t.includes("موم"))) return false;
          break;
        default:
          break;
      }
    }

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


