'use client';

import { useState } from 'react';
import { Shield } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/features/auth/auth-context';
import { PLAN_LIMITS } from '@/lib/plan-limits';

export function PlanStatus() {
  const { session, loading, refresh, signIn, signOut, error } = useAuth();
  const [email, setEmail] = useState('demo@invest.local');
  const [password, setPassword] = useState('invest-demo');

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle>Plano e autenticação</CardTitle>
          <CardDescription>Estado do usuário demo e gating free vs. pro.</CardDescription>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Shield className="h-4 w-4" />
          {session?.plan ?? 'carregando'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="space-y-2">
            <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="email" type="email" />
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="senha"
              type="password"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => signIn(email, password)} disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar via Supabase'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => signOut()} disabled={loading}>
                Sair
              </Button>
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>
          <div className="space-y-2 rounded-lg border p-3 text-sm text-muted-foreground">
            <p>
              Usuário ativo: <strong>{session?.user.email ?? 'não autenticado'}</strong>
            </p>
            <p>
              Status de cobrança: <strong>{session?.subscriptionStatus ?? '—'}</strong>
            </p>
            <p>
              Limites do plano: metas {PLAN_LIMITS[(session?.plan ?? 'free')].goals} • aportes/
              mês {PLAN_LIMITS[(session?.plan ?? 'free')].contributions}
            </p>
            <Button variant="ghost" size="sm" onClick={() => refresh()} disabled={loading}>
              {loading ? 'Atualizando...' : 'Recarregar sessão'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
