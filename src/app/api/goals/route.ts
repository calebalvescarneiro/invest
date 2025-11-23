import { NextResponse } from 'next/server';

import { addGoal, listGoals } from '@/server/data-store';

const DEFAULT_USER_ID = 'demo-user';

export async function GET() {
  const goals = listGoals(DEFAULT_USER_ID);
  return NextResponse.json({ goals });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const created = addGoal(DEFAULT_USER_ID, {
    name: payload.name || 'Nova meta',
    targetAmount: Number(payload.targetAmount) || 0,
    targetDate: payload.targetDate || new Date().toISOString().slice(0, 10),
    monthlyContribution: Number(payload.monthlyContribution) || 0,
    expectedReturn: Number(payload.expectedReturn) || 0,
  });

  return NextResponse.json(created, { status: 201 });
}
