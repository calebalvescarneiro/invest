import crypto from 'crypto';
import { NextResponse } from 'next/server';

import { createSupabaseServerClient, getSessionProfile } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();
  const { user, profile } = await getSessionProfile();

  if (!user || !profile) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const payload = await request.json();
  const redirectUrl = payload.returnUrl || process.env.APP_URL || 'http://localhost:3000';

  const paymentId = crypto.randomUUID();
  const pixPayload = `00020126360014BR.GOV.BCB.PIX0114+5511987654320520400005303986540540.005802BR5925Invest SaaS Pro Plan6009SAO PAULO62290525${paymentId}6304ABCD`;

  await supabase
    .from('payments')
    .upsert({
      id: paymentId,
      user_id: user.id,
      amount: payload.amount ?? 2900,
      currency: 'BRL',
      status: 'pending',
      provider: 'pix-demo',
      redirect_url: redirectUrl,
    })
    .select('id');

  return NextResponse.json({
    paymentId,
    checkoutUrl: redirectUrl,
    pix: {
      copyAndPaste: pixPayload,
      qrCode: pixPayload,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    },
    plan: profile.plan,
  });
}
