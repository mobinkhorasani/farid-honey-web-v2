"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { MobileSidebar } from "../MobileSidebar";
import { UserAuthButton } from "../userAuthButton";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setIsOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden flex items-center gap-2">

      <Link
        href="/cart"
        aria-label="سبد خرید"
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <ShoppingCart className="w-6 h-6" />
      </Link>


      <UserAuthButton />

      <button
        type="button"
        aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <MobileSidebar pathname={pathname} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
