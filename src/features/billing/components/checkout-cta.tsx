import { CreditCard, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CheckoutCta() {
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
          Modelo de assinatura: Free (limites) e Pro mensal/anual. Webhook em
          <code className="rounded bg-muted px-1 py-0.5">/api/webhooks/lemon</code> com HMAC
          para confirmar pagamento e atualizar <strong>subscriptionStatus</strong>.
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
        <Button className="w-full sm:w-auto" size="lg">
          <CreditCard className="mr-2 h-4 w-4" />
          Abrir checkout Lemon Squeezy
        </Button>
        <p className="text-xs text-muted-foreground">
          Próximo passo: usar SDK JS para gerar link/modal com <em>storeId</em> e
          <em>variantId</em> e tratar webhooks de forma idempotente.
        </p>
      </CardContent>
    </Card>
  );
}
