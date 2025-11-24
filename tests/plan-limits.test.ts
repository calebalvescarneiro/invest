import { canCreateContribution, canCreateGoal, PLAN_LIMITS } from '@/lib/plan-limits';

describe('plan limits', () => {
  it('respects free limits for goals and contributions', () => {
    expect(PLAN_LIMITS.free.goals).toBe(1);
    expect(canCreateGoal('free', 0)).toBe(true);
    expect(canCreateGoal('free', 1)).toBe(false);
    expect(canCreateContribution('free', 14)).toBe(true);
    expect(canCreateContribution('free', 15)).toBe(false);
  });

  it('allows unlimited actions for pro', () => {
    expect(canCreateGoal('pro', 99)).toBe(true);
    expect(canCreateContribution('pro', 200)).toBe(true);
  });
});
