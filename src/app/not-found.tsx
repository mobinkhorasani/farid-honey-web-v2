'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
            <div className="z-10 w-full max-w-2xl text-center">
                <p className="text-gray-800 mb-6 font-bold text-2xl sm:text-3xl">
                    متأسفیم! آدرسی که وارد کرده‌اید در این سایت وجود ندارد.
                </p>

                <Button
                    onClick={() => router.push('/')}
                    className='w-[250px] text-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-xl transform hover:-translate-y-0.5 rounded-[20px]'
                >
                    بازگشت به صفحه اصلی
                </Button>
            </div>
        </div>
    );
}
