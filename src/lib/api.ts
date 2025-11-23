export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export type Session = {
  user: { id: string; email: string; name: string };
  plan: 'free' | 'pro';
  subscriptionStatus: 'trialing' | 'active' | 'canceled' | 'past_due' | 'none';
};

export async function getSession() {
  return fetchJson<Session>('/api/auth');
}

export async function updatePlan(plan: 'free' | 'pro', email?: string) {
  return fetchJson<Session>('/api/auth', {
    method: 'POST',
    body: JSON.stringify({ plan, email }),
  });
}

export type GoalPayload = {
  name: string;
  targetAmount: number;
  targetDate: string;
  monthlyContribution: number;
  expectedReturn: number;
};

export async function listGoals() {
  return fetchJson<{ goals: any[] }>('/api/goals');
}

export async function createGoal(payload: GoalPayload) {
  return fetchJson('/api/goals', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export type ContributionPayload = {
  amount: number;
  date: string;
  note?: string;
};

export async function listContributions() {
  return fetchJson<{ contributions: any[] }>('/api/contributions');
}

export async function createContribution(payload: ContributionPayload) {
  return fetchJson('/api/contributions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function createCheckout(returnUrl?: string) {
  return fetchJson<{ checkoutUrl: string }>('/api/billing/checkout', {
    method: 'POST',
    body: JSON.stringify({ returnUrl }),
  });
}
