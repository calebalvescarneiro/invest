import { PieChart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const allocations = [
  { label: 'Renda fixa', percent: 45, note: 'Tesouro Selic e CDBs pós' },
  { label: 'FIIs', percent: 20, note: 'Renda passiva e diversificação' },
  { label: 'ETFs', percent: 15, note: 'Exposição global simples' },
  { label: 'Ações', percent: 15, note: 'Blue chips e setores defensivos' },
  { label: 'Cripto', percent: 5, note: 'Limite claro para perfil moderado' },
];

export function PortfolioAllocation() {
  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle>Alocação sugerida</CardTitle>
          <CardDescription>
            Limite por classe, rebalanceamento e registro manual de aportes.
          </CardDescription>
        </div>
        <Badge className="flex items-center gap-1" variant="secondary">
          <PieChart className="h-4 w-4" />
          Carteira free: 1 carteira, 15 transações
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {allocations.map((item) => (
          <div key={item.label} className="grid items-center gap-2 sm:grid-cols-[1fr,120px,1fr]">
            <p className="text-sm font-medium">{item.label}</p>
            <div className="flex items-center gap-3">
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${item.percent}%` }}
                  aria-hidden
                />
              </div>
              <span className="text-sm font-semibold">{item.percent}%</span>
            </div>
            <p className="text-sm text-muted-foreground">{item.note}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
