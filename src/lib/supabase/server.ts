import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase URL ou key não configuradas. Configure NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.');
}

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(supabaseUrl ?? '', supabaseKey ?? '', {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: { [key: string]: any }) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: { [key: string]: any }) {
        cookieStore.set({ name, value: '', ...options });
      },
    },
  });
}

export async function getSessionProfile() {
  const supabase = createSupabaseServerClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) {
    return { user: null, profile: null } as const;
  }

  const userId = authData.user.id;
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, full_name, plan, subscription_status')
    .eq('id', userId)
    .single();

  if (!profile) {
    const fallbackProfile = {
      id: userId,
      email: authData.user.email ?? 'user@invest.local',
      full_name: authData.user.user_metadata?.full_name ?? 'Novo usuário',
      plan: 'free',
      subscription_status: 'trialing',
    } as const;
    await supabase.from('profiles').upsert(fallbackProfile);
    return { user: authData.user, profile: fallbackProfile } as const;
  }

  return { user: authData.user, profile } as const;
}
