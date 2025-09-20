export type AuthUser = {
  accessToken: string;
  name: string;
  phone_number: string;
  role: string;
};

const AUTH_KEY = 'auth';

export const saveAuth = (data: AuthUser): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(data));
};

export const getAuth = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
};

export const clearAuth = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
};

export const getAccessToken = (): string | null => getAuth()?.accessToken ?? null;
