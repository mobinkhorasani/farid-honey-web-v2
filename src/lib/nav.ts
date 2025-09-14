// lib/nav.ts
import type { LucideIcon } from "lucide-react";
import { User , ShoppingCart } from "lucide-react";

export type NavItem = { title: string; href: string };
export type NavActionItem = { title: string; href: string; icon: LucideIcon };

// لینک‌های متنی اصلی (بدون ورود و سبد خرید)
export const mainNav: NavItem[] = [
  { title: "خانه", href: "/" },
  { title: "محصولات", href: "/products" },
  { title: "درباره ما", href: "/about" },
  { title: "تماس", href: "/contact" },
];

// اکشن‌های آیکنی (جایگزین ورود و سبد خرید)
export const actionNav: NavActionItem[] = [
  { title: "ورود", href: "/login", icon: User  },
  { title: "سبد خرید", href: "/cart", icon: ShoppingCart },
];
