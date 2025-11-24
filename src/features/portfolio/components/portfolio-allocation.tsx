'use client';

import { useEffect, useMemo, useState } from 'react';
import { PieChart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createContribution, listContributions } from '@/lib/api';

type Contribution = { id: string; amount: number; date: string; note?: string };

export function PortfolioAllocation() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [form, setForm] = useState({ amount: 500, date: new Date().toISOString().slice(0, 10), note: 'Aporte mensal' });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await listContributions();
        setContributions(data.contributions);
        setError(undefined);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao carregar aportes');
      }
    };
    void load();
  }, []);

  const totalAportes = useMemo(
    () => contributions.reduce((acc, contribution) => acc + Number(contribution.amount || 0), 0),
    [contributions],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      await createContribution({
        amount: Number(form.amount),
        date: form.date,
        note: form.note,
      });
      const data = await listContributions();
      setContributions(data.contributions);
      setError(undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar aporte');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle>Distribuição da carteira</CardTitle>
          <CardDescription>Persistência de aportes mensais e resumo por classe.</CardDescription>
        </div>
        <Badge className="flex items-center gap-1" variant="secondary">
          <PieChart className="h-4 w-4" />
          Preferências do perfil
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-6">
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Aportes registrados</p>
            <p className="text-2xl font-semibold">{contributions.length}</p>
            <p className="text-xs text-muted-foreground">persistidos no Supabase</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Total aportado</p>
            <p className="text-2xl font-semibold">R$ {totalAportes.toLocaleString('pt-BR')}</p>
            <p className="text-xs text-muted-foreground">soma das operações</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Último aporte</p>
            <p className="text-2xl font-semibold">
              {contributions[0]?.date ? new Date(contributions[0].date).toLocaleDateString('pt-BR') : '—'}
            </p>
            <p className="text-xs text-muted-foreground">mantido no backend</p>
          </div>
        </div>

        <div className="grid gap-3">
          <p className="text-sm font-semibold">Registrar aporte</p>
          <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                type="number"
                value={form.amount}
                onChange={(event) => setForm({ ...form, amount: Number(event.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(event) => setForm({ ...form, date: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Nota</Label>
              <Input id="note" value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} />
            </div>
            <div className="sm:col-span-3 flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar aporte na API'}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
