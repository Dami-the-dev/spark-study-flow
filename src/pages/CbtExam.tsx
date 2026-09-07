import React, { useState, useEffect, useRef, useCallback } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Loader2, Clock, Flag, Calculator as CalcIcon, X, ChevronLeft, ChevronRight,
  CheckCircle2, XCircle, Timer, History, RotateCcw, Award
} from 'lucide-react';

interface RawQuestion {
  id: string;
  subject: string;
  year: number;
  question: string;
  options: any;
  correct_answer: string;
  explanation: string | null;
}

interface ExamQuestion {
  id: string;
  subject: string;
  year: number;
  question: string;
  options: { key: string; label: string; value: string }[];
  correctValue: string;
  explanation: string;
}

interface AttemptRecord {
  date: string;
  subjects: string[];
  score: number;
  total: number;
  perSubject: { subject: string; correct: number; total: number }[];
  durationUsedSeconds: number;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const HISTORY_KEY = 'sparkstudy_cbt_history';

const OTHER_SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Literature', 'Government',
  'Economics', 'Christian Religious Studies', 'Islamic Religious Studies', 'Commerce',
  'Accounting', 'Further Mathematics', 'Geography', 'Agricultural Science',
  'Civic Education', 'History', 'Computer Studies', 'French', 'Arabic', 'Music',
  'Fine Arts', 'Home Economics', 'Physical Education', 'Technical Drawing',
  'Yoruba', 'Igbo', 'Hausa',
];

const normalize = (q: RawQuestion): ExamQuestion | null => {
  let pairs: { key: string; value: string }[] = [];
  if (Array.isArray(q.options)) {
    pairs = q.options.map((o: any, i: number) => ({ key: LETTERS[i] ?? String(i), value: String(o ?? '') }));
  } else if (q.options && typeof q.options === 'object') {
    pairs = Object.entries(q.options).map(([k, v]) => ({ key: k, value: String(v ?? '') }));
  }
  pairs = pairs.filter(p => p.value.trim() !== '');
  if (pairs.length < 2) return null;

  const ca = String(q.correct_answer ?? '').trim();
  let correctValue = '';
  const byKey = pairs.find(p => p.key.toUpperCase() === ca.toUpperCase());
  if (byKey) correctValue = byKey.value;
  else {
    const byValue = pairs.find(p => p.value.trim().toLowerCase() === ca.toLowerCase());
    correctValue = byValue ? byValue.value : '';
  }
  if (!correctValue) return null;

  return {
    id: q.id,
    subject: q.subject,
    year: q.year,
    question: q.question,
    options: pairs.map((p, i) => ({ key: p.key, label: LETTERS[i] ?? p.key, value: p.value })),
    correctValue,
    explanation: q.explanation ?? '',
  };
};

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const fmtTime = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h > 0 ? `${h}:` : ''}${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

/* ---------------- On-screen calculator ---------------- */
const OnScreenCalculator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [display, setDisplay] = useState('0');
  const [expr, setExpr] = useState('');

  const press = (v: string) => {
    if (v === 'C') { setDisplay('0'); setExpr(''); return; }
    if (v === '⌫') { setDisplay(d => (d.length > 1 ? d.slice(0, -1) : '0')); return; }
    if (v === '=') {
      try {
        const safe = display.replace(/[^0-9+\-*/.()%]/g, '');
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict";return (${safe})`)();
        setExpr(display + ' =');
        setDisplay(String(Number.isFinite(result) ? Math.round(result * 1e8) / 1e8 : 'Error'));
      } catch { setDisplay('Error'); }
      return;
    }
    if (v === '√') {
      try {
        const n = parseFloat(display);
        setDisplay(String(Math.sqrt(n)));
      } catch { setDisplay('Error'); }
      return;
    }
    setDisplay(d => (d === '0' || d === 'Error' ? v : d + v));
  };

  const keys = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', '(', ')', '√', '%'];

  return (
    <div className="fixed bottom-4 right-4 z-50 w-64 rounded-lg border bg-card shadow-xl">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="text-sm font-medium">Calculator</span>
        <button onClick={onClose} aria-label="Close calculator"><X className="h-4 w-4" /></button>
      </div>
      <div className="px-3 py-2 text-right">
        <div className="h-4 text-xs text-muted-foreground truncate">{expr}</div>
        <div className="text-2xl font-semibold truncate">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-1 p-2">
        <Button variant="secondary" className="col-span-2" onClick={() => press('C')}>C</Button>
        <Button variant="secondary" className="col-span-2" onClick={() => press('⌫')}>⌫</Button>
        {keys.map(k => (
          <Button
            key={k}
            variant={k === '=' ? 'default' : 'outline'}
            className="h-10 p-0"
            onClick={() => press(k)}
          >{k}</Button>
        ))}
      </div>
    </div>
  );
};

/* ---------------- Main page ---------------- */
type Phase = 'setup' | 'loading' | 'exam' | 'result';

const CbtExam: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('setup');
  const [selected, setSelected] = useState<string[]>([]);
  const [durationMin, setDurationMin] = useState(120);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [showCalc, setShowCalc] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [result, setResult] = useState<AttemptRecord | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [history, setHistory] = useState<AttemptRecord[]>([]);
  const startedAt = useRef<number>(0);
  const submittedRef = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const finishExam = useCallback((auto: boolean) => {
    if (submittedRef.current) return;
    submittedRef.current = true;

    setQuestions(qs => {
      setAnswers(ans => {
        const perSubjectMap: Record<string, { correct: number; total: number }> = {};
        let score = 0;
        qs.forEach(q => {
          const bucket = perSubjectMap[q.subject] ?? (perSubjectMap[q.subject] = { correct: 0, total: 0 });
          bucket.total += 1;
          if (ans[q.id] && ans[q.id] === q.correctValue) { bucket.correct += 1; score += 1; }
        });
        const record: AttemptRecord = {
          date: new Date().toISOString(),
          subjects: Object.keys(perSubjectMap),
          score,
          total: qs.length,
          perSubject: Object.entries(perSubjectMap).map(([subject, v]) => ({ subject, ...v })),
          durationUsedSeconds: Math.round((Date.now() - startedAt.current) / 1000),
        };
        setResult(record);
        setHistory(prev => {
          const next = [record, ...prev].slice(0, 20);
          try { localStorage.setItem(HISTORY_KEY, JSON.stringify(next)); } catch { /* ignore */ }
          return next;
        });
        return ans;
      });
      return qs;
    });

    setPhase('result');
    if (auto) toast.info("Time's up — your exam was submitted automatically.");
  }, []);

  useEffect(() => {
    if (phase !== 'exam') return;
    const t = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) { clearInterval(t); finishExam(true); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, finishExam]);

  const toggleSubject = (s: string) => {
    setSelected(prev => {
      if (prev.includes(s)) return prev.filter(x => x !== s);
      if (prev.length >= 3) { toast.error('Pick exactly 3 subjects besides English.'); return prev; }
      return [...prev, s];
    });
  };

  const startExam = async () => {
    if (selected.length !== 3) { toast.error('Select 3 subjects to go with English.'); return; }
    setPhase('loading');
    try {
      const subjectPlan: { subject: string; count: number }[] = [
        { subject: 'English', count: 60 },
        ...selected.map(s => ({ subject: s, count: 40 })),
      ];

      const results = await Promise.all(
        subjectPlan.map(async ({ subject, count }) => {
          const { data, error } = await supabase
            .from('past_questions')
            .select('id,subject,year,question,options,correct_answer,explanation')
            .eq('exam_name', 'JAMB')
            .eq('subject', subject)
            .limit(400);
          if (error) throw error;
          const clean = (data as RawQuestion[] | null ?? [])
            .map(normalize)
            .filter((q): q is ExamQuestion => q !== null);
          return shuffle(clean).slice(0, count);
        })
      );

      const all = results.flat();
      if (all.length === 0) { toast.error('No questions available right now.'); setPhase('setup'); return; }

      setQuestions(all);
      setAnswers({});
      setFlagged({});
      setIndex(0);
      setResult(null);
      setReviewMode(false);
      submittedRef.current = false;
      startedAt.current = Date.now();
      setSecondsLeft(durationMin * 60);
      setPhase('exam');
    } catch (e: any) {
      toast.error(e?.message || 'Could not start the exam.');
      setPhase('setup');
    }
  };

  const current = questions[index];
  const answeredCount = Object.keys(answers).length;

  /* ---------------- Setup ---------------- */
  if (phase === 'setup' || phase === 'loading') {
    return (
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto pt-16 md:pt-0">
          <div className="py-4 px-4 md:py-6 md:px-8 max-w-4xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold mb-1">CBT Exam Hall</h1>
            <p className="text-sm text-muted-foreground mb-6">
              A real UTME simulation: 4 subjects, 180 questions, one countdown, one submit.
            </p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-base">1. Your subject combination</CardTitle>
                <CardDescription>Use of English is compulsory. Choose 3 more.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-2 rounded-lg border p-3">
                  <Checkbox checked disabled />
                  <span className="text-sm font-medium">Use of English (60 questions)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {OTHER_SUBJECTS.map(s => (
                    <label
                      key={s}
                      className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer text-sm ${
                        selected.includes(s) ? 'border-primary bg-primary/10' : 'hover:bg-muted'
                      }`}
                    >
                      <Checkbox checked={selected.includes(s)} onCheckedChange={() => toggleSubject(s)} />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-base">2. Time allowed</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {[60, 90, 120].map(m => (
                  <Button
                    key={m}
                    variant={durationMin === m ? 'default' : 'outline'}
                    onClick={() => setDurationMin(m)}
                  >
                    <Timer className="h-4 w-4 mr-2" />{m} minutes
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Button size="lg" className="w-full" onClick={startExam} disabled={phase === 'loading'}>
              {phase === 'loading'
                ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Preparing your exam…</>
                : <>Start Exam ({selected.length}/3 subjects chosen)</>}
            </Button>

            {history.length > 0 && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <History className="h-4 w-4" /> Your past mock exams
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {history.map((h, i) => (
                    <div key={i} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3 text-sm">
                      <div>
                        <div className="font-medium">{h.score}/{h.total} · {Math.round((h.score / h.total) * 400)} / 400</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(h.date).toLocaleString()} · {h.subjects.join(', ')}
                        </div>
                      </div>
                      <Badge variant="secondary">{fmtTime(h.durationUsedSeconds)}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Result ---------------- */
  if (phase === 'result' && result) {
    if (reviewMode) {
      return (
        <div className="min-h-screen bg-background">
          <div className="sticky top-0 z-20 border-b bg-card px-4 py-3 flex items-center justify-between">
            <span className="font-semibold text-sm">Review answers</span>
            <Button size="sm" variant="outline" onClick={() => setReviewMode(false)}>Back to results</Button>
          </div>
          <div className="max-w-3xl mx-auto p-4 space-y-4">
            {questions.map((q, i) => {
              const chosen = answers[q.id];
              const ok = chosen === q.correctValue;
              return (
                <Card key={q.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary">{q.subject}</Badge>
                      {ok ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                    </div>
                    <CardTitle className="text-sm font-medium leading-relaxed">{i + 1}. {q.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm">
                    {q.options.map(o => (
                      <div
                        key={o.label}
                        className={`rounded-md border p-2 ${
                          o.value === q.correctValue ? 'border-green-500 bg-green-500/10'
                            : o.value === chosen ? 'border-red-500 bg-red-500/10' : ''
                        }`}
                      >
                        <span className="font-semibold mr-2">{o.label}.</span>{o.value}
                      </div>
                    ))}
                    {!chosen && <p className="text-xs text-muted-foreground pt-1">You skipped this question.</p>}
                    {q.explanation && (
                      <p className="pt-2 text-xs text-muted-foreground"><strong>Explanation:</strong> {q.explanation}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      );
    }

    const pct = Math.round((result.score / result.total) * 100);
    return (
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto pt-16 md:pt-0">
          <div className="py-6 px-4 md:px-8 max-w-3xl mx-auto">
            <Card className="mb-6 text-center">
              <CardHeader>
                <Award className="h-10 w-10 mx-auto text-primary" />
                <CardTitle className="text-2xl">{result.score} / {result.total}</CardTitle>
                <CardDescription>
                  Estimated UTME score: <strong>{Math.round((result.score / result.total) * 400)} / 400</strong> · {pct}% ·
                  finished in {fmtTime(result.durationUsedSeconds)}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="mb-6">
              <CardHeader><CardTitle className="text-base">Score by subject</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {result.perSubject.map(s => (
                  <div key={s.subject}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{s.subject}</span>
                      <span className="text-muted-foreground">{s.correct}/{s.total}</span>
                    </div>
                    <Progress value={(s.correct / s.total) * 100} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1" onClick={() => setReviewMode(true)}>Review my answers</Button>
              <Button variant="outline" className="flex-1" onClick={() => setPhase('setup')}>
                <RotateCcw className="h-4 w-4 mr-2" /> Take another exam
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Exam ---------------- */
  if (!current) return null;
  const lowTime = secondsLeft <= 300;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Exam header */}
      <div className="sticky top-0 z-30 border-b bg-card">
        <div className="flex items-center justify-between gap-2 px-3 py-2">
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">JAMB CBT Mock</div>
            <div className="text-xs text-muted-foreground">{answeredCount}/{questions.length} answered</div>
          </div>
          <div className={`flex items-center gap-1 rounded-md px-3 py-1.5 font-mono text-sm font-bold ${
            lowTime ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'
          }`}>
            <Clock className="h-4 w-4" />{fmtTime(secondsLeft)}
          </div>
        </div>
        {/* Subject tabs */}
        <div className="flex gap-1 overflow-x-auto border-t px-2 py-1">
          {Array.from(new Set(questions.map(q => q.subject))).map(sub => {
            const first = questions.findIndex(q => q.subject === sub);
            const active = current.subject === sub;
            return (
              <button
                key={sub}
                onClick={() => setIndex(first)}
                className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium ${
                  active ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                }`}
              >{sub}</button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-3xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <Badge variant="secondary">Question {index + 1} of {questions.length}</Badge>
          <Button
            size="sm"
            variant={flagged[current.id] ? 'default' : 'outline'}
            onClick={() => setFlagged(f => ({ ...f, [current.id]: !f[current.id] }))}
          >
            <Flag className="h-4 w-4 mr-1" />{flagged[current.id] ? 'Flagged' : 'Flag'}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium leading-relaxed whitespace-pre-line">
              {current.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {current.options.map(o => {
              const chosen = answers[current.id] === o.value;
              return (
                <button
                  key={o.label}
                  onClick={() => setAnswers(a => ({ ...a, [current.id]: o.value }))}
                  className={`flex w-full items-start gap-3 rounded-lg border-2 p-3 text-left text-sm transition-colors ${
                    chosen ? 'border-primary bg-primary/10' : 'border-border hover:border-primary'
                  }`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                    chosen ? 'border-primary bg-primary text-primary-foreground' : ''
                  }`}>{o.label}</span>
                  <span>{o.value}</span>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {showGrid && (
          <Card className="mt-4">
            <CardHeader className="pb-2"><CardTitle className="text-sm">Question grid</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5">
                {questions.map((q, i) => {
                  const answered = !!answers[q.id];
                  const isFlagged = !!flagged[q.id];
                  return (
                    <button
                      key={q.id}
                      onClick={() => { setIndex(i); setShowGrid(false); }}
                      className={`relative h-8 rounded text-xs font-medium ${
                        i === index ? 'ring-2 ring-primary' : ''
                      } ${answered ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}
                    >
                      {i + 1}
                      {isFlagged && <Flag className="absolute -top-1 -right-1 h-3 w-3 text-amber-500 fill-amber-500" />}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-primary inline-block" /> Answered</span>
                <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-muted inline-block" /> Not answered</span>
                <span className="flex items-center gap-1"><Flag className="h-3 w-3 text-amber-500 fill-amber-500" /> Flagged</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {showCalc && <OnScreenCalculator onClose={() => setShowCalc(false)} />}

      {/* Bottom exam toolbar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t bg-card px-3 py-2">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <Button size="icon" variant="outline" disabled={index === 0} onClick={() => setIndex(i => i - 1)} aria-label="Previous question">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowGrid(g => !g)}>Grid</Button>
          <Button size="icon" variant="outline" onClick={() => setShowCalc(c => !c)} aria-label="Calculator">
            <CalcIcon className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="ml-auto"
            onClick={() => {
              const left = questions.length - answeredCount;
              if (left > 0 && !window.confirm(`You still have ${left} unanswered question(s). Submit anyway?`)) return;
              finishExam(false);
            }}
          >Submit</Button>
          <Button size="icon" variant="outline" disabled={index === questions.length - 1} onClick={() => setIndex(i => i + 1)} aria-label="Next question">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CbtExam;
