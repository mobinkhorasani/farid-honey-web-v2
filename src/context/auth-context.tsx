'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { AuthUser } from '@/lib/auth';
import { getAuth, saveAuth, clearAuth } from '@/lib/auth';

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (data: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const cached = getAuth();
    if (cached) setUser(cached);

    // همگام‌سازی بین تب‌ها
    const bc = typeof window !== 'undefined' ? new BroadcastChannel('auth') : null;
    bc?.addEventListener('message', (ev) => {
      if (ev.data?.type === 'logout') setUser(null);
      if (ev.data?.type === 'login') setUser(getAuth());
    });
    return () => bc?.close?.();
  }, []);

  const login = useCallback((data: AuthUser) => {
    saveAuth(data);
    setUser(data);
    const bc = new BroadcastChannel('auth');
    bc.postMessage({ type: 'login' });
    bc.close();
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
    const bc = new BroadcastChannel('auth');
    bc.postMessage({ type: 'logout' });
    bc.close();
    if (typeof window !== 'undefined') window.location.href = '/login';
  }, []);

  const value = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated: !!user?.accessToken,
    login,
    logout,
  }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
