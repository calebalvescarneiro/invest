'use client';

import { useEffect, useMemo, useState } from 'react';
import { TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createGoal, listGoals } from '@/lib/api';

type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  targetDate: string;
  monthlyContribution: number;
  expectedReturn: number;
};

export function GoalSummary() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: 'Nova meta',
    targetAmount: 150000,
    targetDate: '2029-12-31',
    monthlyContribution: 1200,
    expectedReturn: 8.5,
  });

  useEffect(() => {
    const loadGoals = async () => {
      const data = await listGoals();
      setGoals(data.goals);
    };
    void loadGoals();
  }, []);

  const activeGoal = goals[0];

  const projection = useMemo(() => {
    if (!activeGoal) return null;
    const years = Math.max(1, new Date(activeGoal.targetDate).getFullYear() - new Date().getFullYear());
    const rate = activeGoal.expectedReturn;
    const futureValue =
      activeGoal.monthlyContribution *
      ((Math.pow(1 + rate / 12, years * 12) - 1) / (rate / 12 || 1)) *
      (1 + rate / 12);

    return {
      monthly: activeGoal.monthlyContribution,
      target: activeGoal.targetAmount,
      expected: futureValue,
      gap: Math.max(0, activeGoal.targetAmount - futureValue),
      years,
      rate: rate * 100,
    };
  }, [activeGoal]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await createGoal({
      name: form.name,
      targetAmount: Number(form.targetAmount),
      targetDate: form.targetDate,
      monthlyContribution: Number(form.monthlyContribution),
      expectedReturn: Number(form.expectedReturn) / 100,
    });
    const data = await listGoals();
    setGoals(data.goals);
    setLoading(false);
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle>Projeção de meta</CardTitle>
          <CardDescription>
            Ajuste aporte e retorno esperado, salve e acompanhe no painel.
          </CardDescription>
        </div>
        <Badge className="flex items-center gap-1" variant="secondary">
          <TrendingUp className="h-4 w-4" />
          Dados persistidos
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-6">
        {projection && (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Aporte mensal</p>
              <p className="text-2xl font-semibold">R$ {projection.monthly.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-muted-foreground">ajustável e salvo na API</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Meta principal</p>
              <p className="text-2xl font-semibold">R$ {projection.target.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-muted-foreground">prazo de {projection.years} anos</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Retorno esperado</p>
              <p className="text-2xl font-semibold">{projection.rate.toFixed(1)}% a.a.</p>
              <p className="text-xs text-muted-foreground">perfil moderado</p>
            </div>
            <div className="sm:col-span-3 rounded-lg bg-primary/5 p-4 text-sm text-muted-foreground">
              Valor projetado: R$ {projection.expected.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} | Gap
              para meta: R$ {projection.gap.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border p-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="name">Nome da meta</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Aposentadoria, reserva, imóvel"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetAmount">Meta (R$)</Label>
            <Input
              id="targetAmount"
              type="number"
              value={form.targetAmount}
              onChange={(event) => setForm({ ...form, targetAmount: Number(event.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyContribution">Aporte mensal (R$)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              value={form.monthlyContribution}
              onChange={(event) => setForm({ ...form, monthlyContribution: Number(event.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expectedReturn">Retorno esperado (% a.a.)</Label>
            <Input
              id="expectedReturn"
              type="number"
              step="0.1"
              value={form.expectedReturn}
              onChange={(event) => setForm({ ...form, expectedReturn: Number(event.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetDate">Prazo</Label>
            <Input
              id="targetDate"
              type="date"
              value={form.targetDate}
              onChange={(event) => setForm({ ...form, targetDate: event.target.value })}
            />
          </div>
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar projeção na API'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
