import { Clock, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckoutCta } from '@/features/billing/components/checkout-cta';
import { LearningPath } from '@/features/education/components/learning-path';
import { PlanStatus } from '@/features/auth/components/plan-status';
import { GoalSummary } from '@/features/goals/components/goal-summary';
import { NotificationPrefs } from '@/features/notifications/components/notification-prefs';
import { OnboardingSteps } from '@/features/onboarding/components/onboarding-steps';
import { PortfolioAllocation } from '@/features/portfolio/components/portfolio-allocation';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-10">
      <header className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
            <Sparkles className="h-4 w-4" /> MVP focado em entrega e monetização
          </div>
          <h1 className="text-3xl font-bold leading-tight">Invest dashboard</h1>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Web app inicial com layout baseado em features, Shadcn UI e cards que descrevem o
            fluxo de onboarding, metas, carteira, educação e billing (Lemon Squeezy) para lançar o SaaS rápido.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">Documentar endpoints</Button>
          <Button className="gap-2">
            <Clock className="h-4 w-4" />
            Roadmap de 3 semanas
          </Button>
        </div>
      </header>

      <section className="grid gap-6 sm:grid-cols-2">
        <OnboardingSteps />
        <GoalSummary />
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <PortfolioAllocation />
        <LearningPath />
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <CheckoutCta />
        <NotificationPrefs />
      </section>

      <Card className="border-dashed bg-secondary/20">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-6">
          <div>
            <p className="text-sm font-semibold">Próximos passos</p>
            <p className="text-sm text-muted-foreground">
              Conectar API real, salvar projeções, registrar aportes e integrar webhooks de billing.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">Adicionar auth</Button>
            <Button>Configurar banco</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
