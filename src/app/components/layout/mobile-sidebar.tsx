"use client";

import Link from "next/link";
import {
  PhoneCall,
  Clock,
  Instagram,
  Send,
  MessageCircle,
  X,
  Home,
  ShoppingBag,
  Info,
  Phone,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav, actionNav } from "@/lib/nav";
import { companyInfo, socials } from "@/lib/stores";
import { Logo } from "./Header";

const socialIcons = {
  Instagram,
  X: () => <X className="w-5 h-5" />,
  Send,
  MessageCircle,
};

type MobileSidebarProps = {
  pathname: string;
  isOpen: boolean;
  onClose: () => void;
};

export const MobileSidebar = ({
  pathname,
  isOpen,
  onClose,
}: MobileSidebarProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - بدون انیمیشن */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-80 max-w-[80vw] bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="منوی موبایل"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-amber-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-0 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl"></div>

        <div className="relative flex h-full flex-col">
          {/* Header */}
          <div className="bg-white/70 backdrop-blur-sm px-6 py-4 border-b border-amber-100">
            <div className="flex items-center justify-between">
              <Logo textSize="lg" />
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-amber-100 transition-colors"
                aria-label="بستن منو"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-6 py-4 bg-white/50 backdrop-blur-sm border-b border-amber-100">
            <div className="flex items-center gap-3">
              {actionNav
                .filter(item => item.title !== "سبد خرید" && item.title !== "ورود")
                .map(({ href, title, icon: Icon }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "flex-1 flex flex-col items-center gap-1 p-3 rounded-xl transition-colors",
                        isActive
                          ? "bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700"
                          : "hover:bg-amber-50 text-gray-600"
                      )}
                      onClick={onClose}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{title}</span>
                    </Link>
                  );
                })}
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-2">
              {mainNav.map((item) => {
                const isActive = pathname === item.href;
                const icons: { [key: string]: any } = {
                  "/": Home,
                  "/products": ShoppingBag,
                  "/about": Info,
                  "/contact": Phone,
                };
                const ItemIcon = icons[item.href] || Sparkles;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 text-base font-medium py-3 px-4 rounded-xl transition-colors",
                        isActive
                          ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-md"
                          : "text-gray-700 hover:bg-white/60 hover:text-amber-600"
                      )}
                      aria-current={isActive ? "page" : undefined}
                      onClick={onClose}
                    >
                      <ItemIcon className="w-5 h-5" />
                      <span>{item.title}</span>
                      {isActive && (
                        <div className="mr-auto w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Special Offer Banner */}
            <div className="mt-6 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-bold text-orange-700">پیشنهاد ویژه</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                عسل فرید – صددرصد طبیعی، با ارسال رایگان و تضمین آزمایشگاهی + ضمانت بازگشت وجه
              </p>
              <Link
                href="/products"
                className="inline-block mt-3 text-xs font-medium text-orange-600 hover:text-orange-700"
                onClick={onClose}
              >
                مشاهده محصولات ←
              </Link>
            </div>
          </nav>

          {/* Footer Info */}
          <div className="bg-white/70 backdrop-blur-sm px-6 py-4 border-t border-amber-100">
            {/* Contact Info */}
            <div className="space-y-3 mb-4">
              <a
                href={`tel:${companyInfo.supportPhone}`}
                className="flex items-center text-sm text-gray-600 hover:text-amber-600 transition-colors"
              >
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center ml-3">
                  <PhoneCall className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="font-medium">{companyInfo.supportPhone}</div>
                  <div className="text-xs text-gray-500">پشتیبانی ۲۴ ساعته</div>
                </div>
              </a>

              <div className="flex items-center text-sm text-gray-600">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center ml-3">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <div className="font-medium">ساعات کاری</div>
                  <div className="text-xs text-gray-500">همه روزه ۹ صبح تا ۹ شب</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-amber-100">
              {socials.map((social) => {
                const IconComponent = socialIcons[social.icon as keyof typeof socialIcons];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-700 hover:from-amber-200 hover:to-orange-200 transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};