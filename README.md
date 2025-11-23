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

## Próximos passos
1. Conectar API real e persistir projeções/aportes.
2. Implementar auth + controle de plano (free vs pro).
3. Integrar checkout Lemon Squeezy e webhook `/api/webhooks/lemon`.
4. Adicionar testes de UI e lint quando as dependências estiverem instaladas.
