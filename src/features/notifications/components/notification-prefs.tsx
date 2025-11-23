import { BellRing, CalendarClock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const reminders = [
  { label: 'Lembrete de aporte', detail: 'Todo dia 5 via email ou push' },
  { label: 'Meta fora da rota', detail: 'Notifique quando retorno ficar < -10% do esperado' },
  { label: 'Aviso de renovação', detail: '7 dias antes de renovar a assinatura Pro' },
];

export function NotificationPrefs() {
  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle>Notificações</CardTitle>
          <CardDescription>
            Configurações simples para ativar engajamento sem esforço.
          </CardDescription>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <BellRing className="h-4 w-4" />
          Email + push
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {reminders.map((item) => (
          <div key={item.label} className="flex items-start gap-3 rounded-lg border p-4">
            <CalendarClock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.detail}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
