// Premium status and free-plan limits. The app has no login, so these live on the device.
const PREMIUM_KEY = 'sparkstudy_premium';
const USAGE_KEY = 'sparkstudy_free_usage';
const PERIOD_MS = 31 * 24 * 60 * 60 * 1000;

export const FREE_LIMITS = { uploads: 2, aiQuestions: 2, jambPerSubject: 50 };
export const PREMIUM_JAMB_PER_SUBJECT = 100;

export const isPremium = (): boolean => {
  try {
    const raw = localStorage.getItem(PREMIUM_KEY);
    if (!raw) return false;
    const p = JSON.parse(raw);
    return !!p?.at && Date.now() - p.at < PERIOD_MS;
  } catch { return false; }
};

export const activatePremium = (tx: string) =>
  localStorage.setItem(PREMIUM_KEY, JSON.stringify({ tx, at: Date.now() }));

type UsageKey = 'uploads' | 'aiQuestions';
const readUsage = (): Record<UsageKey, number> => {
  try { return { uploads: 0, aiQuestions: 0, ...JSON.parse(localStorage.getItem(USAGE_KEY) || '{}') }; }
  catch { return { uploads: 0, aiQuestions: 0 }; }
};
export const getUsage = (k: UsageKey) => readUsage()[k];
export const canUse = (k: UsageKey) => isPremium() || getUsage(k) < FREE_LIMITS[k];
export const recordUse = (k: UsageKey) => {
  const u = readUsage(); u[k] = (u[k] || 0) + 1;
  localStorage.setItem(USAGE_KEY, JSON.stringify(u));
};
