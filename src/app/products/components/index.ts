// app/products/components/index.ts
import type { ApiProduct, ProductCardData } from "@/types/d.type";

/* =========================
 * Transform & Helpers
 * ========================= */
export const DEFAULT_PRICE = 250_000;

const toNumber = (v: number | null | undefined, fallback = DEFAULT_PRICE): number =>
  typeof v === "number" && Number.isFinite(v) ? v : fallback;

/** API -> ProductCardData (همیشه price عدد بازمی‌گرداند) */
export const transformApiToCard = (p: ApiProduct): ProductCardData => ({
  id: p.id,
  title: p.name,
  subtitle: "عسل طبیعی و خالص",
  price: toNumber((p as any).price), // اگر در API نبود، fallback اعمال می‌شود
  images: [p.image_url ?? "/images/honey-placeholder.jpg"],
});

/** بررسی بازه قیمت */
export const inPriceRange = (price = 0, range: string) => {
  switch (range) {
    case "زیر ۲۰۰ هزار":
      return price < 200_000;
    case "۲۰۰-۴۰۰ هزار":
      return price >= 200_000 && price <= 400_000;
    case "بالای ۴۰۰ هزار":
      return price > 400_000;
    case "دسته‌بندی":
    default:
      return true;
  }
};

/** فیلتر روی داده‌ی کارت‌ها */
export const filterProducts = (
  items: ProductCardData[],
  category: string,
  priceRange: string
): ProductCardData[] => {
  return items.filter((p) => {
    // فیلتر دسته (نمایشی بر اساس title)
    if (category !== "محبوب‌ترین" && category !== "همه") {
      const t = p.title.toLowerCase();
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

    // فیلتر قیمت
    if (!inPriceRange(p.price ?? 0, priceRange)) return false;

    return true;
  });
};

/** مرتب‌سازی روی داده‌ی کارت‌ها */
export const sortProducts = (items: ProductCardData[], sortBy: string) => {
  const list = [...items];
  switch (sortBy) {
    case "ارزان‌ترین":
      return list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    case "گران‌ترین":
      return list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    case "محبوب‌ترین":
      return list.sort((a, b) => a.title.localeCompare(b.title, "fa"));
    case "پرفروش‌ترین":
      return list; // فعلاً داده‌ی فروش نداریم
    case "جدیدترین":
    default:
      return list.sort((a, b) => Number(b.id) - Number(a.id));
  }
};

/* =========================
 * Re-exports (Components)
 * ========================= */
// کامپوننت‌های گرید/اسکلت از همین فولدر
export { default as ProductsGrid } from "./ProductsGrid";
export { default as ProductSkeleton } from "./ProductSkeleton";

// کامپوننت‌های Toolbar از فولدر toolbar
export { default as ProductsToolbar } from "./toolbar/ProductsToolbar";
export { default as SearchField } from "./toolbar/SearchField";
export { default as SmartDropdown } from "./toolbar/SmartDropdown";
export { useDropdown } from "./toolbar/useDropdown";

// اگر constants را در toolbar/index.ts تعریف کرده‌ای:
export {
  TOOLBAR_CATEGORIES,
  TOOLBAR_SORT_OPTIONS,
  TOOLBAR_PRICE_RANGES,
} from "./toolbar";
