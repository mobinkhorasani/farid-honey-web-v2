"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  PhoneCall,
  Clock,
  Instagram,
  MessageCircle,
  Send,
  ShoppingCart,
  User,
} from "lucide-react";
import { mainNav, actionNav } from "@/lib/nav";
import { companyInfo, socials } from "@/lib/stores";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const socialIcons = {
  Instagram,
  X,
  Send,
  MessageCircle,
};

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden flex items-center gap-2">
      {/* آیکون سبد خرید */}
      <Link
        href="/cart"
        aria-label="سبد خرید"
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:outline-none"
      >
        <ShoppingCart className="w-6 h-6" aria-hidden="true" />
      </Link>

      {/* آیکون یوزر / پروفایل */}
      <Link
        href="/auth/register"
        aria-label="پروفایل"
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:outline-none"
      >
        <User className="w-6 h-6" aria-hidden="true" />
      </Link>

      {/* دکمه باز و بستن منوی موبایل */}
      <button
        type="button"
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:outline-none"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "بستن منوی موبایل" : "باز کردن منوی موبایل"}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <Menu className="w-6 h-6" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />

          <div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 z-50 w-80 max-w-sm bg-white shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="منوی موبایل"
          >
            <div className="flex h-full flex-col p-6">
              <div className="mb-4">
                <Logo textSize="lg" />
              </div>

              {/* آیکون‌های اکشن — حذف یوزر و سبد خرید از منو */}
              <div className="mb-6 flex items-center gap-3">
                {actionNav
                  .filter(
                    (item) => item.title !== "سبد خرید" && item.title !== "ورود"
                  )
                  .map(({ href, title, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={href}
                        href={href}
                        aria-label={title}
                        className={cn(
                          "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors",
                          "focus:outline-none focus-visible:outline-none",
                          isActive
                            ? "bg-orange-50 text-orange-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-orange-600"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="sr-only">{title}</span>
                      </Link>
                    );
                  })}
              </div>

              {/* لینک‌های اصلی */}
              <nav className="flex-1">
                <ul className="space-y-1">
                  {mainNav.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block text-lg font-medium py-3 px-4 -mx-4 rounded-lg transition-colors duration-200",
                            isActive
                              ? "text-orange-600 bg-orange-50"
                              : "text-gray-700 hover:text-orange-600 hover:bg-gray-50"
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* اطلاعات تماس و شبکه‌های اجتماعی */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <PhoneCall
                      className="w-4 h-4 text-orange-600 ml-3"
                      aria-hidden="true"
                    />
                    <a
                      href={`tel:${companyInfo.supportPhone}`}
                      className="hover:text-orange-600 transition-colors"
                    >
                      {companyInfo.supportPhone}
                    </a>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Clock
                      className="w-4 h-4 text-orange-600 ml-3"
                      aria-hidden="true"
                    />
                    <span>ساعات کاری: ۹–۲۱</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 mt-6">
                  {socials.map((social) => {
                    const IconComponent =
                      socialIcons[social.icon as keyof typeof socialIcons];
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                        aria-label={social.label}
                      >
                        <IconComponent className="w-5 h-5" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileNav;
