import { NextResponse } from 'next/server';

import { canCreateGoal } from '@/lib/plan-limits';
import { createSupabaseServerClient, getSessionProfile } from '@/lib/supabase/server';

export async function GET() {
  const { user } = await getSessionProfile();
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('goals')
    .select('id, name, target_amount, target_date, monthly_contribution, expected_return')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const goals = (data || []).map((goal) => ({
    id: goal.id,
    name: goal.name,
    targetAmount: Number(goal.target_amount),
    targetDate: goal.target_date,
    monthlyContribution: Number(goal.monthly_contribution),
    expectedReturn: Number(goal.expected_return),
  }));

  return NextResponse.json({ goals });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const supabase = createSupabaseServerClient();
  const { user, profile } = await getSessionProfile();

  if (!user || !profile) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { data: existingGoals } = await supabase.from('goals').select('id').eq('user_id', user.id);
  const currentCount = existingGoals?.length ?? 0;

  if (!canCreateGoal(profile.plan as 'free' | 'pro', currentCount)) {
    return NextResponse.json({ error: 'Limite de metas do plano atingido' }, { status: 403 });
  }

  const { data, error } = await supabase
    .from('goals')
    .insert({
      user_id: user.id,
      name: payload.name || 'Nova meta',
      target_amount: Number(payload.targetAmount) || 0,
      target_date: payload.targetDate || new Date().toISOString().slice(0, 10),
      monthly_contribution: Number(payload.monthlyContribution) || 0,
      expected_return: Number(payload.expectedReturn) || 0,
    })
    .select('id, name, target_amount, target_date, monthly_contribution, expected_return')
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Erro ao salvar meta' }, { status: 500 });
  }

  return NextResponse.json(
    {
      id: data.id,
      name: data.name,
      targetAmount: Number(data.target_amount),
      targetDate: data.target_date,
      monthlyContribution: Number(data.monthly_contribution),
      expectedReturn: Number(data.expected_return),
    },
    { status: 201 }
  );
}
