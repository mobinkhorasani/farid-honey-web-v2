import { Instance } from '@/lib/axiosInstance';

export const getProductsList = async () => {
  const res = await Instance.get('/products/get-products');
  return res.data;
};

export const getProductsInfo = async (id:string) => {
  const res = await Instance.get(`/products/product-Info/${id}`);
  return res.data;
};

export const searchProducts = async (text: string) => {
  const params = new URLSearchParams();
  if (text && text.trim()) params.append('search', text.trim());

  const res = await Instance.get(`/products/search-products?${params}`);
  return res.data;
};
