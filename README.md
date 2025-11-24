# Invest web app

MVP do SaaS de planejamento de aportes e educação financeira. O projeto usa Next.js 14
(App Router), TypeScript, TailwindCSS e componentes Shadcn para acelerar a entrega do
web app com foco em monetização rápida via Pix no Brasil com Supabase para auth e dados.

## Tech stack
- Next.js 14 + TypeScript
- TailwindCSS + design tokens do Shadcn UI
- Estrutura orientada a features em `src/features`
- Supabase (auth, Postgres, middleware) — configure `.env.local` com `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` e idealmente `SUPABASE_SERVICE_ROLE_KEY`.

## Estrutura
```
src/
  app/           # rotas e layout base
  components/    # componentes de UI (design system)
  features/      # blocos de produto: onboarding, metas, carteira, educação, billing etc.
  lib/           # utilidades compartilhadas
```

## API pronta no MVP
- Auth e plano: `/api/auth` (Supabase Auth) retorna sessão, plano e status de cobrança.
- Metas: `/api/goals` (GET/POST) usando Supabase Postgres com RLS.
- Aportes: `/api/contributions` (GET/POST) para registrar evolução mensal no Supabase.
- Billing: `/api/billing/checkout` gera payload Pix (placeholder) e salva pagamento.
- Webhook: `/api/webhooks/lemon` aceita callbacks (Pix/pagamento) e promove para Pro.

## Próximos passos
1. Configurar as tabelas `profiles`, `goals`, `contributions` e `payments` no Supabase (RLS com user_id).
2. Criar usuários de teste no Supabase (email/senha) para usar o formulário de login.
3. Integrar provedor de Pix (Pagar.me, Gerencianet etc.) e apontar o webhook para `/api/webhooks/lemon`.
4. Rodar testes locais: `npm test` (Vitest) garante gating de plano e UI base.
