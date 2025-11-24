import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();
  const payload = await request.json();

  const paymentId = payload?.data?.id || payload?.paymentId;
  const userId = payload?.data?.attributes?.user_id || payload?.userId;
  const status = payload?.data?.attributes?.status || payload?.status || 'active';

  if (!paymentId || !userId) {
    return NextResponse.json({ error: 'Payload inválido' }, { status: 400 });
  }

  await supabase.from('payments').upsert({ id: paymentId, user_id: userId, status });

  if (status === 'paid' || status === 'active') {
    await supabase
      .from('profiles')
      .update({ plan: 'pro', subscription_status: 'active' })
      .eq('id', userId);
  }

  return NextResponse.json({ received: true });
}
