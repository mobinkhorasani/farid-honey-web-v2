import type { Metadata } from 'next';
import { AboutHero, Story, Timeline } from './components';
import { aboutText, timeline } from '@/constants/about-data';

export const metadata: Metadata = {
  title: 'درباره ما - زنبورستان فرید',
  description: 'زنبورستان فرید از سال 1355 به صورت حرفه‌ای شروع به فعالیت نمود و با ابداع لوازم جدید زنبورداری موفق به دریافت گواهی ثبت اختراع گردید.',
  keywords: ['درباره ما', 'زنبورستان فرید', 'تاریخچه', 'عسل طبیعی', 'زنبورداری'],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-25 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#E9B15940,transparent_50%)]" />
      <AboutHero />
      <Timeline items={timeline} />
      <Story aboutText={aboutText} />
    </main>
  );
}