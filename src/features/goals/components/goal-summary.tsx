import { TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const forecasts = [
  {
    label: 'Aporte mensal',
    value: 'R$ 1.200',
    detail: 'ajustável pelo usuário',
  },
  {
    label: 'Meta principal',
    value: 'R$ 150.000',
    detail: 'prazo de 5 anos',
  },
  {
    label: 'Retorno esperado',
    value: '8.5% a.a.',
    detail: 'perfil moderado',
  },
];

export function GoalSummary() {
  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle>Projeção de meta</CardTitle>
          <CardDescription>
            Sliders de aporte e prazo para salvar cenários e comparar evolução.
          </CardDescription>
        </div>
        <Badge className="flex items-center gap-1" variant="secondary">
          <TrendingUp className="h-4 w-4" />
          Simulação em tempo real
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        {forecasts.map((item) => (
          <div key={item.label} className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="text-2xl font-semibold">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.detail}</p>
          </div>
        ))}
        <div className="sm:col-span-3 rounded-lg bg-primary/5 p-4 text-sm text-muted-foreground">
          Dica: mostre CTA para salvar a simulação como meta ativa e validar o plano
          grátis com limite de 1 meta.
        </div>
      </CardContent>
    </Card>
  );
}
