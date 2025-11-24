import { NextResponse } from 'next/server';

import { createSupabaseServerClient, getSessionProfile } from '@/lib/supabase/server';

export async function GET() {
  const { user, profile } = await getSessionProfile();

  if (!user || !profile) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  return NextResponse.json({
    user: { id: user.id, email: profile.email, name: profile.full_name ?? profile.email },
    plan: profile.plan ?? 'free',
    subscriptionStatus: profile.subscription_status ?? 'none',
  });
}

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();
  const body = await request.json();

  if (body.action === 'sign-out') {
    await supabase.auth.signOut();
    return NextResponse.json({ success: true });
  }

  if (body.plan) {
    const { user, profile } = await getSessionProfile();
    if (!user || !profile) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({ plan: body.plan, subscription_status: body.subscriptionStatus ?? 'active' })
      .eq('id', user.id)
      .select('id, email, full_name, plan, subscription_status')
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message || 'Erro ao atualizar plano' }, { status: 500 });
    }

    return NextResponse.json({
      user: { id: data.id, email: data.email, name: data.full_name ?? data.email },
      plan: data.plan,
      subscriptionStatus: data.subscription_status,
    });
  }

  return NextResponse.json({ error: 'Requisição inválida' }, { status: 400 });
}
