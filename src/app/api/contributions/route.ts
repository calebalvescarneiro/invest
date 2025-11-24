import { NextResponse } from 'next/server';

import { canCreateContribution } from '@/lib/plan-limits';
import { createSupabaseServerClient, getSessionProfile } from '@/lib/supabase/server';

export async function GET() {
  const { user } = await getSessionProfile();
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('contributions')
    .select('id, amount, date, note')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const contributions = (data || []).map((item) => ({
    id: item.id,
    amount: Number(item.amount),
    date: item.date,
    note: item.note ?? undefined,
  }));

  return NextResponse.json({ contributions });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const supabase = createSupabaseServerClient();
  const { user, profile } = await getSessionProfile();

  if (!user || !profile) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { data: existing } = await supabase.from('contributions').select('id').eq('user_id', user.id);
  const currentCount = existing?.length ?? 0;

  if (!canCreateContribution(profile.plan as 'free' | 'pro', currentCount)) {
    return NextResponse.json({ error: 'Limite de aportes do plano atingido' }, { status: 403 });
  }

  const { data, error } = await supabase
    .from('contributions')
    .insert({
      user_id: user.id,
      amount: Number(payload.amount) || 0,
      date: payload.date || new Date().toISOString().slice(0, 10),
      note: payload.note,
    })
    .select('id, amount, date, note')
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || 'Erro ao salvar aporte' }, { status: 500 });
  }

  return NextResponse.json(
    {
      id: data.id,
      amount: Number(data.amount),
      date: data.date,
      note: data.note ?? undefined,
    },
    { status: 201 }
  );
}
