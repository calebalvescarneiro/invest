import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: { headers: req.headers } });

  const supabase = createMiddlewareClient({
    supabaseUrl,
    supabaseKey,
    request: req,
    response: res,
  });

  const { data } = await supabase.auth.getSession();
  const protectedApi = ['/api/goals', '/api/contributions', '/api/billing', '/api/auth'];

  if (protectedApi.some((path) => req.nextUrl.pathname.startsWith(path)) && !data.session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  return res;
}

export const config = {
  matcher: ['/api/:path*'],
};
