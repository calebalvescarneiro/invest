export type Plan = 'free' | 'pro';

export const PLAN_LIMITS: Record<Plan, { goals: number; contributions: number }> = {
  free: { goals: 1, contributions: 15 },
  pro: { goals: Number.POSITIVE_INFINITY, contributions: Number.POSITIVE_INFINITY },
};

export function canCreateGoal(plan: Plan, currentGoals: number) {
  const limit = PLAN_LIMITS[plan].goals;
  return currentGoals < limit;
}

export function canCreateContribution(plan: Plan, currentContributions: number) {
  const limit = PLAN_LIMITS[plan].contributions;
  return currentContributions < limit;
}
