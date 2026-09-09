// Questions a student generates from their own uploaded material.
// Stored on the device (the app has no login) and merged into the JAMB / WAEC banks.

export interface GeneratedQuestion {
  id: string;
  exam_name: 'JAMB' | 'WAEC';
  year: number;
  subject: string;
  question: string;
  options: Record<string, string> | string[];
  correct_answer: string;
  explanation: string;
  difficulty: string;
  source: 'upload';
  file_name?: string;
  created_at: string;
}

const KEY = 'sparkstudy_uploaded_questions';
const MAX = 1000;

export const getUploadedQuestions = (examName?: 'JAMB' | 'WAEC'): GeneratedQuestion[] => {
  try {
    const raw = localStorage.getItem(KEY);
    const all: GeneratedQuestion[] = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(all)) return [];
    const valid = all.filter(q => q && q.question && q.options && q.correct_answer);
    return examName ? valid.filter(q => q.exam_name === examName) : valid;
  } catch {
    return [];
  }
};

export const saveUploadedQuestions = (
  questions: any[],
  meta: { examName: 'JAMB' | 'WAEC'; subject: string; fileName?: string }
): GeneratedQuestion[] => {
  const now = new Date();
  const prepared: GeneratedQuestion[] = questions
    .filter(q => q && q.question && q.options && q.correct_answer)
    .map((q, i) => ({
      id: `upload-${now.getTime()}-${i}`,
      exam_name: meta.examName,
      year: now.getFullYear(),
      subject: meta.subject,
      question: String(q.question),
      options: q.options,
      correct_answer: String(q.correct_answer),
      explanation: String(q.explanation ?? ''),
      difficulty: 'medium',
      source: 'upload',
      file_name: meta.fileName,
      created_at: now.toISOString(),
    }));

  const merged = [...prepared, ...getUploadedQuestions()].slice(0, MAX);
  try {
    localStorage.setItem(KEY, JSON.stringify(merged));
  } catch {
    // storage full — keep only the newest batch
    try { localStorage.setItem(KEY, JSON.stringify(prepared)); } catch { /* ignore */ }
  }
  return prepared;
};

export const clearUploadedQuestions = () => {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
};
