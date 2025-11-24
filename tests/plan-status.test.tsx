import React from 'react';
import { render, screen } from '@testing-library/react';

import { AuthContext } from '@/features/auth/auth-context';
import { PlanStatus } from '@/features/auth/components/plan-status';
import { PLAN_LIMITS } from '@/lib/plan-limits';

type ProviderProps = { children: React.ReactNode; value?: Partial<React.ContextType<typeof AuthContext>> };

const AuthProviderMock = ({ children, value }: ProviderProps) => (
  // @ts-expect-error partial for tests
  <AuthContext.Provider
    value={{
      session: {
        user: { id: '1', email: 'teste@invest.local', name: 'Teste' },
        plan: 'free',
        subscriptionStatus: 'trialing',
      },
      loading: false,
      refresh: async () => {},
      upgradeToPro: async () => {},
      signIn: async () => {},
      signOut: async () => {},
      ...value,
    }}
  >
    {children}
  </AuthContext.Provider>
);

describe('PlanStatus component', () => {
  it('renders plan limits for free', () => {
    render(
      <AuthProviderMock>
        <PlanStatus />
      </AuthProviderMock>
    );

    expect(screen.getByText(/Usuário ativo:/)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Limites do plano: metas ${PLAN_LIMITS.free.goals} • aportes/ mês ${PLAN_LIMITS.free.contributions}`,
      ),
    ).toBeInTheDocument();
  });
});
