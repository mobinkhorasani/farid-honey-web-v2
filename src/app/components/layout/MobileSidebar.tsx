"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PhoneCall, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, actionNav } from "@/lib/nav";
import { companyInfo, socials } from "@/lib/stores";
import { Logo } from "./Header";

const socialIcons = {
  Instagram: require("lucide-react").Instagram,
  X: require("lucide-react").X,
  Send: require("lucide-react").Send,
  MessageCircle: require("lucide-react").MessageCircle,
};

type MobileSidebarProps = {
  pathname: string;
  isOpen: boolean;
  onClose: () => void;
};

export const MobileSidebar = ({ pathname, isOpen, onClose }: MobileSidebarProps) => {
  return (
    <>
      {/* بک‌گراند تار با fade */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      />

      {/* سایدبار با انیمیشن نرم */}
      <motion.aside
        className="fixed inset-y-0 right-0 z-50 w-80 max-w-sm bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="منوی موبایل"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 250, damping: 28 }}
      >
        <div className="flex h-full flex-col p-6">
          <div className="mb-4">
            <Logo textSize="lg" />
          </div>

          {/* اکشن‌ها */}
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
                    onClick={onClose}
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
                      onClick={onClose}
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
      </motion.aside>
    </>
  );
};
