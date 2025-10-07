import type { Metadata } from 'next';
import { AboutHero, AboutVideo, Story, Timeline } from './components';
import { aboutText, timeline, video } from '@/constants/about-data';

export const metadata: Metadata = {
  title: 'درباره ما - زنبورستان فرید',
  description:
    'زنبورستان فرید از سال 1355 به صورت حرفه‌ای شروع به فعالیت نمود و با ابداع لوازم جدید زنبورداری موفق به دریافت گواهی ثبت اختراع گردید.',
  keywords: ['درباره ما', 'زنبورستان فرید', 'تاریخچه', 'عسل طبیعی', 'زنبورداری'],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F9F7F2]">
      <AboutHero />
      {/* <AboutVideo url={video.url} poster={video.poster} /> */}
      <Timeline items={timeline} />
      <Story aboutText={aboutText} />
    </main>
  );
}
