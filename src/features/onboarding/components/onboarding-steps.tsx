import { Lightbulb, Target, Wallet } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
  {
    icon: <Wallet className="h-6 w-6 text-primary" />,
    title: 'Perfil e aporte',
    description: 'Coletamos idade, horizonte e aporte mensal para calibrar a simulação.',
  },
  {
    icon: <Target className="h-6 w-6 text-primary" />,
    title: 'Meta configurada',
    description: 'Apresente uma projeção simples com retorno esperado e inflação ajustada.',
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    title: 'Educação guiada',
    description: 'Sugira trilhas de conteúdo aderentes ao perfil e limites do plano.',
  },
];

export function OnboardingSteps() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Onboarding rápido</CardTitle>
        <CardDescription>
          Fluxo em 3 passos para ativar o usuário e coletar dados essenciais.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        {steps.map((step) => (
          <div key={step.title} className="flex gap-3 rounded-lg border p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              {step.icon}
            </div>
            <div>
              <p className="font-semibold leading-tight">{step.title}</p>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
