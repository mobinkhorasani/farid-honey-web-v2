import { Category } from '@/types/d.type';
import { Droplet, Hexagon, FlaskConical, Flower2 } from 'lucide-react';

export const categories: Category[] = [
  { id: 'honey', title: 'عسل', href: '/products?honey', icon: Droplet },
  { id: 'royal', title: 'ژل رویال', href: '/products?royal', icon: FlaskConical },
  { id: 'pollen', title: 'گرده گل', href: '/products?pollen', icon: Flower2 },
  { id: 'wax', title: 'موم', href: '/products?wax', icon: Hexagon },
];
