import axios from 'axios';
import { baseURL } from './baseUrl';

const LOGIN_PATH = process.env.NEXT_PUBLIC_LOGIN_PATH ?? '/login';

export const Instance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('auth');
    return raw ? (JSON.parse(raw)?.accessToken ?? null) : null;
  } catch {
    return null;
  }
};

// قبل از هر درخواست: اگر توکن داریم، Authorization بگذار
Instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

// روی 401 فقط اگر درخواست محافظت‌شده بود، ریدایرکت
Instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const requireAuth = error?.config?.meta?.requireAuth;

    if (status === 401 && requireAuth && typeof window !== 'undefined') {
      localStorage.removeItem('auth');
      const next = window.location.pathname + window.location.search;
      const search = new URLSearchParams({ reason: 'expired', next }).toString();
      window.location.href = `${LOGIN_PATH}?${search}`;
      return;
    }
    return Promise.reject(error);
  }
);
