import { 
  Droplet, 
  Sparkles, 
  Flower2, 
  Package 
} from 'lucide-react';

export const categories = [
  {
    id: 1,
    title: 'همه محصولات',
    href: '/products',
    icon: Package,
  },
  {
    id: 2,
    title: 'عسل طبیعی',
    href: '/products?category=عسل طبیعی',
    icon: Droplet,
  },
  {
    id: 3,
    title: 'ژل رویال',
    href: '/products?category=ژل رویال',
    icon: Sparkles,
  },
  {
    id: 4,
    title: 'گرده گل',
    href: '/products?category=گرده گل',
    icon: Flower2,
  },
];