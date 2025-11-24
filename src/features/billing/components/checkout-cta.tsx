import { useState } from 'react';
import { CreditCard, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/features/auth/auth-context';
import { createCheckout } from '@/lib/api';

export function CheckoutCta() {
  const { session, upgradeToPro } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pixPayload, setPixPayload] = useState<string>();
  const isPro = session?.plan === 'pro';

  async function handleCheckout() {
    setLoading(true);
    try {
      const { pix } = await createCheckout(window.location.href);
      setPixPayload(pix.copyAndPaste);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle>Monetização rápida</CardTitle>
          <CardDescription>Checkout via Pix (Brasil) com webhook para liberar o plano Pro.</CardDescription>
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
            {isPro ? 'Já é Pro' : loading ? 'Gerando Pix...' : 'Gerar cobrança Pix'}
          </Button>
          <Button variant="outline" onClick={upgradeToPro} disabled={isPro}>
            Simular upgrade via API
          </Button>
        </div>
        {pixPayload ? (
          <div className="rounded-lg border bg-muted/40 p-3 text-xs">
            <p className="font-semibold">Copie e pague via Pix:</p>
            <p className="break-all text-muted-foreground">{pixPayload}</p>
            <p className="mt-1 text-muted-foreground">Webhook: /api/webhooks/lemon atualiza o plano para Pro.</p>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            Webhook configurado em <code className="rounded bg-muted px-1 py-0.5">/api/webhooks/lemon</code> para marcar pagamento.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
