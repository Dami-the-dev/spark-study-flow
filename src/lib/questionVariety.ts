// Keeps practice sessions varied: removes duplicate questions, shuffles properly,
// and prefers questions the student hasn't seen recently (tracked on the device).

const norm = (s: string) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

export const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const dedupeQuestions = <T extends { question: string }>(qs: T[]): T[] => {
  const seen = new Set<string>();
  return qs.filter(q => {
    const k = norm(q.question);
    if (!k || seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

const getSeen = (key: string): string[] => {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
};

export const pickFreshQuestions = <T extends { id?: string; question: string }>(
  qs: T[],
  count: number | 'All',
  storageKey: string
): T[] => {
  const unique = dedupeQuestions(qs);
  const seen = new Set(getSeen(storageKey));
  const idOf = (q: T) => q.id || norm(q.question);
  const fresh = shuffle(unique.filter(q => !seen.has(idOf(q))));
  const old = shuffle(unique.filter(q => seen.has(idOf(q))));
  const ordered = [...fresh, ...old];
  const picked = count === 'All' ? ordered : ordered.slice(0, count);
  try {
    let next = [...getSeen(storageKey), ...picked.map(idOf)];
    // once nearly everything has been seen, start the cycle again
    if (next.length >= unique.length * 0.9) next = picked.map(idOf);
    localStorage.setItem(storageKey, JSON.stringify(next.slice(-3000)));
  } catch { /* ignore */ }
  return picked;
};

export const youtubeSearchUrl = (title: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(title)}`;
