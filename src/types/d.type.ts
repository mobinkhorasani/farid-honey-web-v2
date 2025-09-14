export type Category = {
  id: string;
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  badge?: string;
};
