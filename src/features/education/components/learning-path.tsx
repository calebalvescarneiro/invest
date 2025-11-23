import { BookOpen, Lock, Unlock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const tracks = [
  {
    title: 'Fundamentos e crenças',
    level: 'Iniciante',
    lessons: 6,
    locked: false,
  },
  {
    title: 'FIIs, ETFs e ações',
    level: 'Intermediário',
    lessons: 8,
    locked: true,
  },
  {
    title: 'Cripto e previdência',
    level: 'Avançado',
    lessons: 5,
    locked: true,
  },
];

export function LearningPath() {
  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle>Trilhas de educação</CardTitle>
          <CardDescription>
            Conteúdo do básico ao avançado com gating por plano e progresso salvo.
          </CardDescription>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <BookOpen className="h-4 w-4" />
          Free + Pro
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        {tracks.map((track) => (
          <div key={track.title} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">{track.title}</h3>
              {track.locked ? (
                <Lock className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Unlock className="h-4 w-4 text-primary" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{track.level}</p>
            <p className="text-sm font-medium">{track.lessons} aulas</p>
            <p className="text-xs text-muted-foreground">
              Sugira CTA de upgrade para liberar módulos avançados e trilhas Pro.
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
