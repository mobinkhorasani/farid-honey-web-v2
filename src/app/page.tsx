import { Hero, Categories, FeaturedProducts } from '@/components/pages/home';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F9F7F2]">
      <Hero />
      <Categories />
      {/* بخش «درباره عسل فرید» عمداً حذف شد طبق درخواست شما */}
      <FeaturedProducts />
    </main>
  );
}
