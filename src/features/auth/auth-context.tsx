'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { getSession, updatePlan, type Session } from '@/lib/api';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export type AuthContextValue = {
  session?: Session;
  loading: boolean;
  refresh: () => Promise<void>;
  upgradeToPro: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error?: string;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const supabase = createSupabaseBrowserClient();

  const loadSession = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSession();
      setSession(data);
      setError(undefined);
    } catch (err) {
      setSession(undefined);
      setError(err instanceof Error ? err.message : 'Falha ao carregar sessão');
    }
    setLoading(false);
  }, []);

  const upgradeToPro = useCallback(async () => {
    const data = await updatePlan('pro');
    setSession(data);
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
      }
      await loadSession();
      setLoading(false);
    },
    [loadSession, supabase]
  );

  const signOut = useCallback(async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setSession(undefined);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    void loadSession();
  }, [loadSession]);

  return (
    <AuthContext.Provider value={{ session, loading, refresh: loadSession, upgradeToPro, signIn, signOut, error }}>
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
