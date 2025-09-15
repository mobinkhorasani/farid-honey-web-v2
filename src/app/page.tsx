import { Hero, Categories, FeaturedProducts } from '@/app/components/home';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F9F7F2]">
      <Hero />
      <Categories />
      <FeaturedProducts />
    </main>
  );
}
