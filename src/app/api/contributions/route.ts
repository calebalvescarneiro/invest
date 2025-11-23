import { NextResponse } from 'next/server';

import { addContribution, listContributions } from '@/server/data-store';

const DEFAULT_USER_ID = 'demo-user';

export async function GET() {
  const contributions = listContributions(DEFAULT_USER_ID);
  return NextResponse.json({ contributions });
}

export async function POST(request: Request) {
  const payload = await request.json();
  const created = addContribution(DEFAULT_USER_ID, {
    amount: Number(payload.amount) || 0,
    date: payload.date || new Date().toISOString().slice(0, 10),
    note: payload.note,
  });

  return NextResponse.json(created, { status: 201 });
}
