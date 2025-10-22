import { storage } from '@/app/auth/utils/storage';
import { refreshTokenApi } from './user-services';
import { Instance, InstanceAdmin } from '@/lib/axios-Instance';

let isRefreshing = false;
let pendingQueue: Array<(t: string | null) => void> = [];

const processQueue = (t: string | null) => { pendingQueue.forEach(cb => cb(t)); pendingQueue = []; };

async function handleRefresh() {
  if (isRefreshing) return new Promise<string | null>(resolve => pendingQueue.push(resolve));
  isRefreshing = true;
  try {
    const { accessToken } = await refreshTokenApi(); 
    storage.set('auth_token', accessToken);
    processQueue(accessToken);
    return accessToken;
  } catch {
    processQueue(null);
    return null;
  } finally {
    isRefreshing = false;
  }
}

function shouldSkipRetry(cfg: any) {
  const url: string = cfg?.url || '';
  return url.includes('/auth/login') || url.includes('/auth/refresh-token') || url.includes('/auth/logout');
}

function isAuthError(status: number, data: any) {
  if (status === 401) return true;

  return false;
}

function setupResponseInterceptor(instance: any) {
  instance.interceptors.response.use(
    (res: any) => res,
    async (error: any) => {
      const original = error?.config || {};
      const status = error?.response?.status;
      const data = error?.response?.data;

      if (!isAuthError(status!, data) || original._retry || shouldSkipRetry(original)) {
        return Promise.reject(error);
      }

      original._retry = true;

      const newToken = await handleRefresh();
      if (newToken) {
        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${newToken}`;
        return instance(original);
      } else {
        storage.remove('auth_token');
        storage.remove('auth_user');
        return Promise.reject(error);
      }
    }
  );
}


setupResponseInterceptor(Instance);
setupResponseInterceptor(InstanceAdmin);
