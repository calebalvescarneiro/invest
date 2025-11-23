import crypto from 'crypto';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { upsertUserPlan } from '@/server/data-store';

const DEFAULT_USER_ID = 'demo-user';

export async function POST(request: Request) {
  const secret = process.env.LEMON_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret não configurado' }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = headers().get('x-signature') || '';
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

  if (signature !== expected) {
    return NextResponse.json({ error: 'Assinatura inválida' }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const status = payload?.data?.attributes?.status || 'active';
  upsertUserPlan(DEFAULT_USER_ID, 'pro', status);

  return NextResponse.json({ received: true });
}
