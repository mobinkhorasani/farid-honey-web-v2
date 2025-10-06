'use client';

import { motion } from 'framer-motion';
import { Sparkles, Droplet, Flower2, Grid3x3 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categories: Category[] = [
  { id: 'همه محصولات', label: 'همه', icon: Grid3x3 },
  { id: 'عسل طبیعی', label: 'عسل', icon: Droplet },
  { id: 'ژل رویال', label: 'ژل رویال', icon: Sparkles },
  { id: 'گرده گل', label: 'گرده گل', icon: Flower2 },
];

interface CategoryTabsProps {
  selected: string;
  onSelect: (category: string) => void;
}

export const CategoryTabs = ({ selected, onSelect }: CategoryTabsProps) => {
  const router = useRouter();

  const handleSelect = (categoryId: string) => {
    onSelect(categoryId);
    
    if (categoryId === 'همه محصولات') {
      router.push('/products', { scroll: false });
    } else {
      router.push(`/products?category=${encodeURIComponent(categoryId)}`, { scroll: false });
    }
  };

  return (
    <div className="w-full">
      <div className="hidden sm:flex bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 border border-gray-100/50 shadow-sm gap-1.5">
        {categories.map((category) => {
          const isActive = selected === category.id;
          const Icon = category.icon;

          return (
            <button
              key={category.id}
              onClick={() => handleSelect(category.id)}
              className="relative flex-1 group"
            >
              <div
                className={`
                  relative px-4 py-2.5 rounded-xl font-medium text-sm
                  transition-all duration-300
                  flex items-center justify-center gap-2
                  ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-600 hover:text-amber-700 hover:bg-amber-50/70'
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-md"
                    initial={false}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-4 h-4" />
                  {category.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="sm:hidden grid grid-cols-2 gap-2">
        {categories.map((category) => {
          const isActive = selected === category.id;
          const Icon = category.icon;

          return (
            <button
              key={category.id}
              onClick={() => handleSelect(category.id)}
              className={`
                relative px-4 py-3 rounded-xl font-medium text-sm
                transition-all duration-300
                flex items-center justify-center gap-2
                border
                ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md border-amber-400'
                    : 'bg-white/80 text-gray-600 hover:text-amber-700 hover:bg-amber-50 border-gray-100'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};