# Invest web app

MVP do SaaS de planejamento de aportes e educação financeira. O projeto usa Next.js 14
(App Router), TypeScript, TailwindCSS e componentes Shadcn para acelerar a entrega do
web app com foco em monetização rápida via Lemon Squeezy.

## Tech stack
- Next.js 14 + TypeScript
- TailwindCSS + design tokens do Shadcn UI
- Estrutura orientada a features em `src/features`

## Estrutura
```
src/
  app/           # rotas e layout base
  components/    # componentes de UI (design system)
  features/      # blocos de produto: onboarding, metas, carteira, educação, billing etc.
  lib/           # utilidades compartilhadas
```

## API pronta no MVP
- Auth e plano: `/api/auth` (GET para sessão demo, POST para simular upgrade/free).
- Metas: `/api/goals` (GET/POST) com armazenamento em memória.
- Aportes: `/api/contributions` (GET/POST) para registrar evolução mensal.
- Billing: `/api/billing/checkout` para gerar link hosted do Lemon Squeezy.
- Webhook: `/api/webhooks/lemon` valida HMAC e sobe usuário para Pro.

## Próximos passos
1. Trocar armazenamento em memória por DB (Supabase/Neon) e autenticação real.
2. Proteger rotas com middleware, alinhar limites do plano e adicionar testes de API/UI.
3. Integrar SDK do Lemon Squeezy ou Paddle para criar checkouts reais e tratar eventos.
## Próximos passos
1. Conectar API real e persistir projeções/aportes.
2. Implementar auth + controle de plano (free vs pro).
3. Integrar checkout Lemon Squeezy e webhook `/api/webhooks/lemon`.
4. Adicionar testes de UI e lint quando as dependências estiverem instaladas.
