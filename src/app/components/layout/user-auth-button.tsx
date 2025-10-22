"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserData {
    name: string;
    phone_number: string;
    email: string;
    role: string;
}

interface UserAuthButtonProps {
    className?: string;
    isMobile?: boolean;
}

export const UserAuthButton = ({ className = "", isMobile = false }: UserAuthButtonProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("auth_token");
            const userStr = localStorage.getItem("auth_user");

            if (token && userStr) {
                try {
                    const user = JSON.parse(userStr);
                    setUserData(user);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Error parsing user data:", error);
                    setIsAuthenticated(false);
                    setUserData(null);
                }
            } else {
                setIsAuthenticated(false);
                setUserData(null);
            }
        };

        checkAuth();

        window.addEventListener("storage", checkAuth);
        window.addEventListener("authChange", checkAuth);

        return () => {
            window.removeEventListener("storage", checkAuth);
            window.removeEventListener("authChange", checkAuth);
        };
    }, []);

    useEffect(() => {
        setShowDropdown(false);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".user-dropdown")) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener("click", handleClickOutside);
            return () => document.removeEventListener("click", handleClickOutside);
        }
    }, [showDropdown]);

    const handleLogout = () => {

        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");

        window.dispatchEvent(new Event("authChange"));


        window.location.href = "/";
    };


    if (isMobile) {
        return (
            <Link
                href={isAuthenticated ? "/profile" : "/auth/login"}
                aria-label={isAuthenticated ? "پروفایل" : "ورود"}
                className={cn(
                    "inline-flex items-center justify-center w-10 h-10 rounded-lg",
                    "text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none",
                    className
                )}
            >
                <User className={cn("w-6 h-6", isAuthenticated && "text-orange-600")} />
            </Link>
        );
    }


    return (
        <div className="relative user-dropdown">
            {!isAuthenticated ? (
                <Link
                    href="/auth/login"
                    aria-label="ورود"
                    className={cn(
                        "relative inline-flex h-10 w-10 items-center justify-center rounded-full",
                        "transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/40",
                        "text-gray-700 hover:bg-gray-50 hover:text-orange-600",
                        pathname === "/auth/login" && "bg-orange-50 text-orange-600",
                        className
                    )}
                >
                    <User className="w-5 h-5" />
                    <span className="sr-only">ورود</span>
                </Link>
            ) : (
                <>
                    <button
                        type="button"
                        onClick={() => setShowDropdown(!showDropdown)}
                        aria-label="منوی کاربر"
                        aria-expanded={showDropdown}
                        className={cn(
                            "relative inline-flex h-10 w-10 items-center justify-center rounded-full",
                            "transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/40",
                            "bg-orange-50 text-orange-600 hover:bg-orange-100",
                            className
                        )}
                    >
                        <User className="w-5 h-5" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white" />
                    </button>


                    {showDropdown && (
                        <div className="absolute top-12 left-0 z-50 w-60 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-900">
                                    {userData?.name || "کاربر عزیز"}
                                </p>

                                {userData?.email && (
                                    <p className="text-xs text-gray-500 mt-1 truncate">{userData.email}</p>
                                )}

                                {userData?.phone_number && (
                                    <p className="text-xs text-gray-400 mt-1">{userData.phone_number}</p>
                                )}

                                {userData?.role && (
                                    <span
                                        className={`mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full
                                        ${userData.role === "ADMIN"
                                                ? "bg-purple-100 text-purple-600"
                                                : "bg-blue-100 text-blue-600"
                                            }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${userData.role === "ADMIN" ? "bg-purple-500" : "bg-blue-500"
                                                }`}
                                        ></span>
                                        {userData.role === "ADMIN" ? "ادمین" : "مشتری"}
                                    </span>
                                )}
                            </div>


                            <Link
                                href="/profile"
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                <Settings className="w-4 h-4 text-gray-400" />
                                <span>تنظیمات پروفایل</span>
                            </Link>


                            <div className="border-t border-gray-100 my-1" />


                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-right"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>خروج از حساب</span>
                            </button>
                        </div>
                    )}

                </>
            )}
        </div>
    );
};