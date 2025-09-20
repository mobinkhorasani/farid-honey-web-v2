// src/app/components/layout/AuthActions.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export const AuthActions = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="flex items-center gap-3">
      {isAuthenticated ? (
        <>
          {/* متن سلام؛ اگر خواستی روی موبایل مخفی باشه */}
          <span className="hidden sm:inline text-sm text-gray-800">
            سلام {user?.name ?? 'کاربر'}
          </span>

          {/* آیکون خروج */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={logout}
            aria-label="خروج"
            title="خروج"
            className="rounded-full"
          >
            <LogOut className="size-5" />
          </Button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm hover:opacity-90"
          >
            ورود
          </Link>
          <Link
            href="/register"
            className="px-3 py-1.5 rounded-md bg-gray-200 text-gray-900 text-sm hover:bg-gray-300"
          >
            ثبت‌نام
          </Link>
        </>
      )}
    </div>
  );
};
