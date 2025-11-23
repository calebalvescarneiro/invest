'use client';

import { Shield } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/features/auth/auth-context';

export function PlanStatus() {
  const { session, loading, refresh } = useAuth();

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
        <p className="text-sm text-muted-foreground">
          Usuário ativo: <strong>{session?.user.email ?? 'carregando...'}</strong>
        </p>
        <p className="text-sm text-muted-foreground">
          Status de cobrança: <strong>{session?.subscriptionStatus ?? '—'}</strong>
        </p>
        <Button variant="outline" size="sm" onClick={() => refresh()} disabled={loading}>
          {loading ? 'Atualizando...' : 'Recarregar sessão da API'}
        </Button>
      </CardContent>
    </Card>
  );
}
