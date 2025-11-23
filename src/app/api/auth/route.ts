import { NextResponse } from 'next/server';

import { getUser, upsertUserPlan } from '@/server/data-store';

const DEFAULT_USER_ID = 'demo-user';

export async function GET() {
  const user = getUser(DEFAULT_USER_ID);
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    plan: user.plan,
    subscriptionStatus: user.subscriptionStatus,
  });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const plan = payload.plan === 'pro' ? 'pro' : 'free';
  const status = plan === 'pro' ? 'active' : 'trialing';
  const user = upsertUserPlan(DEFAULT_USER_ID, plan, status);

  return NextResponse.json({
    user: {
      id: user.id,
      email: payload.email || user.email,
      name: payload.name || user.name,
    },
    plan: user.plan,
    subscriptionStatus: user.subscriptionStatus,
  });
}
