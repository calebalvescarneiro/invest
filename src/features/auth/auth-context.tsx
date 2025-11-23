'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { getSession, updatePlan, type Session } from '@/lib/api';

export type AuthContextValue = {
  session?: Session;
  loading: boolean;
  refresh: () => Promise<void>;
  upgradeToPro: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>();
  const [loading, setLoading] = useState(true);

  const loadSession = useCallback(async () => {
    setLoading(true);
    const data = await getSession();
    setSession(data);
    setLoading(false);
  }, []);

  const upgradeToPro = useCallback(async () => {
    const data = await updatePlan('pro');
    setSession(data);
  }, []);

  useEffect(() => {
    void loadSession();
  }, [loadSession]);

  return (
    <AuthContext.Provider value={{ session, loading, refresh: loadSession, upgradeToPro }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return ctx;
}
