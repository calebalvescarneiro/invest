import { NextResponse } from 'next/server';

import { getUser } from '@/server/data-store';

const DEFAULT_USER_ID = 'demo-user';

export async function POST(request: Request) {
  const user = getUser(DEFAULT_USER_ID);
  const body = await request.json();

  const storeId = process.env.LEMON_STORE_ID || 'store-xxxxx';
  const variantId = process.env.LEMON_VARIANT_ID || 'variant-xxxxx';
  const returnUrl = body.returnUrl || process.env.APP_URL || 'http://localhost:3000';

  const hostedUrl = `https://store.lemonsqueezy.com/checkout/buy/${variantId}?embed=1&checkout[custom][user_id]=${user.id}&checkout[email]=${encodeURIComponent(user.email)}&checkout[name]=${encodeURIComponent(user.name)}&checkout[success_url]=${encodeURIComponent(returnUrl)}`;

  return NextResponse.json({
    checkoutUrl: hostedUrl,
    storeId,
    variantId,
  });
}
