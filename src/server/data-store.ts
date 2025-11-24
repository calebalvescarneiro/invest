import crypto from "crypto";

export type Plan = 'free' | 'pro';

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  targetDate: string;
  monthlyContribution: number;
  expectedReturn: number;
};

export type Contribution = {
  id: string;
  amount: number;
  date: string;
  note?: string;
};

export type UserRecord = {
  id: string;
  email: string;
  name: string;
  plan: Plan;
  subscriptionStatus: 'trialing' | 'active' | 'canceled' | 'past_due' | 'none';
  goals: Goal[];
  contributions: Contribution[];
};

type Database = {
  users: Record<string, UserRecord>;
};

const globalForDb = globalThis as typeof globalThis & { __INVEST_DB__?: Database };

function getDb(): Database {
  if (!globalForDb.__INVEST_DB__) {
    globalForDb.__INVEST_DB__ = {
      users: {
        'demo-user': {
          id: 'demo-user',
          email: 'demo@invest.local',
          name: 'Invest Demo',
          plan: 'free',
          subscriptionStatus: 'none',
          goals: [
            {
              id: 'g-1',
              name: 'Reserva em 5 anos',
              targetAmount: 150_000,
              targetDate: '2029-12-31',
              monthlyContribution: 1200,
              expectedReturn: 0.085,
            },
          ],
          contributions: [
            {
              id: 'c-1',
              amount: 1200,
              date: new Date().toISOString().slice(0, 10),
              note: 'Aporte inicial',
            },
          ],
        },
      },
    };
  }
  return globalForDb.__INVEST_DB__;
}

export function getOrCreateUser(userId: string): UserRecord {
  const db = getDb();
  if (!db.users[userId]) {
    db.users[userId] = {
      id: userId,
      email: `${userId}@invest.local`,
      name: 'Novo usuário',
      plan: 'free',
      subscriptionStatus: 'trialing',
      goals: [],
      contributions: [],
    };
  }
  return db.users[userId];
}

export function upsertUserPlan(userId: string, plan: Plan, status: UserRecord['subscriptionStatus']) {
  const user = getOrCreateUser(userId);
  user.plan = plan;
  user.subscriptionStatus = status;
  return user;
}

export function addGoal(userId: string, goal: Omit<Goal, 'id'>) {
  const user = getOrCreateUser(userId);
  const id = `g-${crypto.randomUUID()}`;
  const record: Goal = { ...goal, id };
  user.goals.unshift(record);
  return record;
}

export function listGoals(userId: string) {
  return getOrCreateUser(userId).goals;
}

export function addContribution(userId: string, contribution: Omit<Contribution, 'id'>) {
  const user = getOrCreateUser(userId);
  const id = `c-${crypto.randomUUID()}`;
  const record: Contribution = { ...contribution, id };
  user.contributions.unshift(record);
  return record;
}

export function listContributions(userId: string) {
  return getOrCreateUser(userId).contributions;
}

export function getUser(userId: string) {
  return getOrCreateUser(userId);
}
