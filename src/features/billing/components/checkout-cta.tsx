'use client';

import { useState } from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/features/auth/auth-context';
import { createCheckout } from '@/lib/api';

export function CheckoutCta() {
  const { session, upgradeToPro } = useAuth();
  const [loading, setLoading] = useState(false);
  const isPro = session?.plan === 'pro';

  async function handleCheckout() {
    setLoading(true);
    try {
      const { checkoutUrl } = await createCheckout(window.location.href);
      window.open(checkoutUrl, '_blank', 'noopener');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle>Monetização rápida</CardTitle>
          <CardDescription>
            Hosted checkout Lemon Squeezy com webhooks para provisionar planos.
          </CardDescription>
        </div>
        <ShieldCheck className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Plano atual: <strong>{session?.plan ?? 'carregando...'}</strong> — status {session?.subscriptionStatus ?? '—'}.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-sm font-semibold">Free</p>
            <p className="text-sm text-muted-foreground">
              1 meta, 1 carteira, 15 transações/mês, trilha básica.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm font-semibold">Pro</p>
            <p className="text-sm text-muted-foreground">
              Metas ilimitadas, múltiplas carteiras, trilhas avançadas e exportação.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="flex-1 sm:flex-none" size="lg" onClick={handleCheckout} disabled={loading || isPro}>
            <CreditCard className="mr-2 h-4 w-4" />
            {isPro ? 'Já é Pro' : loading ? 'Gerando checkout...' : 'Abrir checkout Lemon Squeezy'}
          </Button>
          <Button variant="outline" onClick={upgradeToPro} disabled={isPro}>
            Simular upgrade via API
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Webhook configurado em <code className="rounded bg-muted px-1 py-0.5">/api/webhooks/lemon</code> usando HMAC.
        </p>
      </CardContent>
    </Card>
  );
}
