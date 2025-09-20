import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    meta?: {
      requireAuth?: boolean; // اگر true بود و 401 آمد → ریدایرکت به لاگین
    };
  }
}
