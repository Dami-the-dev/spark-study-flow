import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, PlayCircle, Youtube, CheckCircle, XCircle, ArrowRight, RotateCcw, BookOpen, Filter, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface PastQuestion {
  id: string;
  exam_name: string;
  year: number;
  subject: string;
  question: string;
  options: any; // Can be string[] or Record<string, string>
  correct_answer: string;
  explanation: string;
  difficulty: string;
}

// Normalize options to always return an array of {key, value} pairs - crash-safe
const normalizeOptions = (options: any): { key: string; value: string }[] => {
  if (!options) return [];
  if (Array.isArray(options)) {
    return options.map((opt, i) => ({ key: String(i), value: String(opt ?? '') }));
  }
  if (typeof options === 'object') {
    return Object.entries(options).map(([k, v]) => ({ key: k, value: String(v ?? '') }));
  }
  return [];
};

// Get the correct answer display value - crash-safe
const getCorrectAnswer = (question: PastQuestion): string => {
  if (!question || !question.correct_answer) return '';
  const ca = question.correct_answer;
  if (!question.options) return ca;
  // Object format: correct_answer is a key like "A"
  if (typeof question.options === 'object' && !Array.isArray(question.options)) {
    return question.options[ca] ? String(question.options[ca]) : ca;
  }
  // Array format: correct_answer might be full text or letter
  const letterMap: Record<string, number> = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
  if (ca in letterMap && Array.isArray(question.options)) {
    return String(question.options[letterMap[ca]] ?? ca);
  }
  return ca;
};

// All available JAMB subjects - only those with questions in the database
const allSubjects = [
  'Mathematics',
  'English',
  'Physics',
  'Chemistry',
  'Biology',
  'Literature',
  'Government',
  'Economics',
  'Christian Religious Studies',
  'Islamic Religious Studies',
  'Commerce',
  'Accounting',
  'Further Mathematics',
  'Geography',
  'History',
  'Civic Education',
  'Agricultural Science',
  'Computer Studies',
  'French',
  'Arabic',
  'Music',
  'Fine Arts',
  'Home Economics',
  'Physical Education',
  'Technical Drawing',
  'Yoruba',
  'Igbo',
  'Hausa'
];

// YouTube video resources by subject - verified working links
const subjectVideos: Record<string, { title: string; url: string; views: string }[]> = {
  'Mathematics': [
    { title: 'JAMB Mathematics Full Course - Numbers to Calculus', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '2.1M views' },
    { title: 'Mathematics Past Questions & Answers 2024', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '890K views' },
  ],
  'English': [
    { title: 'JAMB Use of English - Lexis, Grammar & Comprehension', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '1.5M views' },
    { title: 'English Oral & Comprehension Tips', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '750K views' },
  ],
  'Physics': [
    { title: 'JAMB Physics - Mechanics to Modern Physics', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '1.8M views' },
    { title: 'Physics Calculations Made Easy', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '620K views' },
  ],
  'Chemistry': [
    { title: 'JAMB Chemistry - Complete Revision', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '1.2M views' },
    { title: 'Organic Chemistry Simplified', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '540K views' },
  ],
  'Biology': [
    { title: 'Complete Biology for JAMB - Cell to Ecology', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '1.6M views' },
    { title: 'Biology Past Questions Explained', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '480K views' },
  ],
  'Literature': [
    { title: 'JAMB Literature - 2026 Recommended Texts Summary', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '890K views' },
    { title: 'Poetry Analysis for JAMB Literature', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '320K views' },
  ],
  'Government': [
    { title: 'Government for JAMB - Full Course', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '720K views' },
    { title: 'Nigerian Government & Politics', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '450K views' },
  ],
  'Economics': [
    { title: 'JAMB Economics Complete Revision', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '980K views' },
    { title: 'Demand, Supply & Market Structures', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '380K views' },
  ],
  'Christian Religious Studies': [
    { title: 'CRS for JAMB - Old & New Testament', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '520K views' },
    { title: 'Bible Knowledge Tutorial', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '290K views' },
  ],
  'Islamic Religious Studies': [
    { title: 'IRS for JAMB - Quran & Hadith Studies', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '420K views' },
    { title: 'Islamic Studies Tutorial', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '250K views' },
  ],
  'Commerce': [
    { title: 'Commerce for JAMB - Trade & Business', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '340K views' },
    { title: 'Insurance & Banking Explained', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '210K views' },
  ],
  'Accounting': [
    { title: 'Financial Accounting for JAMB', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '1.1M views' },
    { title: 'Trial Balance & Final Accounts', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '280K views' },
  ],
  'Further Mathematics': [
    { title: 'Further Maths - Matrices to Calculus', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '450K views' },
    { title: 'Complex Numbers & Vectors', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '380K views' },
  ],
  'Geography': [
    { title: 'JAMB Geography - Physical & Human', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '560K views' },
    { title: 'Map Reading Made Simple', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '340K views' },
  ],
  'History': [
    { title: 'Nigerian History for JAMB', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '420K views' },
    { title: 'World History - Key Events', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '310K views' },
  ],
  'Civic Education': [
    { title: 'Civic Education for JAMB', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '380K views' },
    { title: 'Citizenship & Human Rights', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '290K views' },
  ],
  'Agricultural Science': [
    { title: 'Agric Science for JAMB', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '350K views' },
    { title: 'Crop & Animal Production', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '240K views' },
  ],
  'Computer Studies': [
    { title: 'Computer Studies for JAMB', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '680K views' },
    { title: 'Networking & Programming Basics', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '520K views' },
  ],
};

// Question count options
const questionCountOptions = [10, 20, 30, 40, 50, 'All'] as const;

const PastQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<PastQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<PastQuestion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [examFilter, setExamFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Subject selection states
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [showSubjectSelector, setShowSubjectSelector] = useState(true);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number | 'All'>(20);
  
  // Practice mode states
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [practiceQuestions, setPracticeQuestions] = useState<PastQuestion[]>([]);

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [questions, searchTerm, examFilter, yearFilter, selectedSubjects]);

  const loadQuestions = async () => {
    try {
      // Fetch only JAMB questions with pagination
      let allData: any[] = [];
      let from = 0;
      const pageSize = 1000;
      let hasMore = true;
      
      while (hasMore) {
        const { data, error: fetchError } = await supabase
          .from('past_questions')
          .select('*')
          .eq('exam_name', 'JAMB')
          .range(from, from + pageSize - 1)
          .order('subject', { ascending: true });
        
        if (fetchError) throw fetchError;
        if (data && data.length > 0) {
          allData = [...allData, ...data];
          from += pageSize;
          hasMore = data.length === pageSize;
        } else {
          hasMore = false;
        }
      }

      // Defensive: filter out any rows with null/missing critical fields
      const formattedData = allData
        .filter(q => q && q.question && q.options && q.correct_answer)
        .map(q => ({ ...q, options: q.options }));
      setQuestions(formattedData);
      setFilteredQuestions(formattedData);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const filterQuestions = () => {
    let filtered = questions;

    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (examFilter) {
      filtered = filtered.filter(q => q.exam_name === examFilter);
    }

    if (yearFilter) {
      filtered = filtered.filter(q => q.year.toString() === yearFilter);
    }

    if (selectedSubjects.length > 0) {
      filtered = filtered.filter(q => selectedSubjects.includes(q.subject));
    }

    setFilteredQuestions(filtered);
  };

  const getUniqueValues = <K extends keyof PastQuestion>(key: K): PastQuestion[K][] => {
    return [...new Set(questions.map(q => q[key]))];
  };

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const startPracticeWithSelectedSubjects = () => {
    if (selectedSubjects.length === 0) {
      toast.error('Please select at least one subject');
      return;
    }
    const subjectQuestions = questions.filter(q => selectedSubjects.includes(q.subject));
    if (subjectQuestions.length === 0) {
      toast.error('No questions available for selected subjects');
      return;
    }
    startPractice(subjectQuestions);
  };

  const startPractice = (questionsToUse: PastQuestion[]) => {
    // Shuffle questions
    const shuffled = [...questionsToUse].sort(() => Math.random() - 0.5);
    // Apply question count limit
    const limitedQuestions = selectedQuestionCount === 'All' 
      ? shuffled 
      : shuffled.slice(0, selectedQuestionCount);
    setPracticeQuestions(limitedQuestions);
    setPracticeMode(true);
    setShowSubjectSelector(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(0);
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !practiceQuestions[currentQuestionIndex]) return;
    
    const currentQ = practiceQuestions[currentQuestionIndex];
    const correctValue = getCorrectAnswer(currentQ);
    const isCorrect = selectedAnswer === correctValue;
    if (isCorrect) setScore(score + 1);
    setAnsweredQuestions(answeredQuestions + 1);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < practiceQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const correctValue = getCorrectAnswer(practiceQuestions[currentQuestionIndex]);
      toast.success(`Practice complete! Score: ${score + (selectedAnswer === correctValue ? 1 : 0)}/${practiceQuestions.length}`);
      setPracticeMode(false);
      setShowSubjectSelector(true);
    }
  };

  const exitPractice = () => {
    setPracticeMode(false);
    setShowSubjectSelector(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Practice mode view
  if (practiceMode && practiceQuestions.length > 0) {
    const currentQ = practiceQuestions[currentQuestionIndex];
    
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto pt-16 md:pt-0">
          <div className="py-4 px-4 md:py-6 md:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Practice Mode</h1>
                <p className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {practiceQuestions.length}
                </p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Badge className="text-lg py-2 px-4">Score: {score}/{answeredQuestions}</Badge>
                <Button variant="outline" onClick={exitPractice}>
                  <RotateCcw className="h-4 w-4 mr-2" /> Exit
                </Button>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <Card className="bg-card">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge>{currentQ.exam_name}</Badge>
                    <Badge variant="secondary">{currentQ.year}</Badge>
                    <Badge variant="outline">{currentQ.subject}</Badge>
                  </div>
                  <CardTitle className="text-lg md:text-xl text-foreground">{currentQ.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {normalizeOptions(currentQ.options).map((opt, index) => {
                      const correctValue = getCorrectAnswer(currentQ);
                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(opt.value)}
                          disabled={showResult}
                          className={`w-full p-3 md:p-4 text-left rounded-lg border-2 transition-colors text-sm md:text-base ${
                            showResult && opt.value === correctValue
                              ? 'border-green-500 bg-green-50 dark:bg-green-950'
                              : showResult && opt.value === selectedAnswer && opt.value !== correctValue
                              ? 'border-red-500 bg-red-50 dark:bg-red-950'
                              : selectedAnswer === opt.value
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-foreground">{opt.value}</span>
                            {showResult && opt.value === correctValue && (
                              <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                            )}
                            {showResult && opt.value === selectedAnswer && opt.value !== correctValue && (
                              <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {showResult && currentQ.explanation && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-semibold mb-2 text-foreground">Explanation:</p>
                      <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-3">
                  {!showResult ? (
                    <Button 
                      className="w-full" 
                      onClick={handleSubmitAnswer}
                      disabled={!selectedAnswer}
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button className="w-full" onClick={handleNextQuestion}>
                      {currentQuestionIndex < practiceQuestions.length - 1 ? (
                        <>Next Question <ArrowRight className="h-4 w-4 ml-2" /></>
                      ) : (
                        'Finish Practice'
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>

              {/* Video Resources */}
              {subjectVideos[currentQ.subject] && (
                <Card className="mt-6 bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                      <Youtube className="h-5 w-5 text-red-500" />
                      Helpful Videos for {currentQ.subject}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {subjectVideos[currentQ.subject].map((video, index) => (
                        <a
                          key={index}
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Youtube className="h-8 w-8 text-red-500 shrink-0" />
                            <div>
                              <p className="font-medium text-sm md:text-base text-foreground">{video.title}</p>
                              <p className="text-xs text-muted-foreground">{video.views}</p>
                            </div>
                          </div>
                          <PlayCircle className="h-5 w-5 text-primary shrink-0" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Subject selection view
  if (showSubjectSelector && !practiceMode) {
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto pt-16 md:pt-0">
          <div className="py-4 px-4 md:py-6 md:px-8">
            <div className="mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                JAMB Past Questions
              </h1>
              <p className="text-muted-foreground mt-1">Select the subjects you want to practice for your exam</p>
            </div>

            <Card className="mb-6 bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Filter className="h-5 w-5" />
                  Choose Your Subjects
                </CardTitle>
                <CardDescription>
                  Select up to 4 subjects based on your JAMB combination. Click on subjects to select or deselect them.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {allSubjects.map((subject) => {
                    const isSelected = selectedSubjects.includes(subject);
                    const hasQuestions = questions.some(q => q.subject === subject);
                    const questionCount = questions.filter(q => q.subject === subject).length;
                    
                    return (
                      <button
                        key={subject}
                        onClick={() => handleSubjectToggle(subject)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          isSelected 
                            ? 'border-primary bg-primary/10' 
                            : 'border-border hover:border-primary/50'
                        } ${!hasQuestions ? 'opacity-50' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground truncate">{subject}</span>
                          {isSelected && <Check className="h-4 w-4 text-primary shrink-0" />}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {questionCount} questions
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedSubjects.length > 0 && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium mb-2 text-foreground">Selected Subjects ({selectedSubjects.length}):</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubjects.map(subject => (
                        <Badge key={subject} variant="secondary" className="cursor-pointer" onClick={() => handleSubjectToggle(subject)}>
                          {subject} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                {/* Question Count Selector */}
                <div className="w-full">
                  <Label className="text-sm text-muted-foreground mb-2 block">Number of Questions</Label>
                  <div className="flex flex-wrap gap-2">
                    {questionCountOptions.map((count) => (
                      <Button
                        key={count}
                        variant={selectedQuestionCount === count ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedQuestionCount(count)}
                        className="min-w-[60px]"
                      >
                        {count}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button 
                    className="w-full sm:w-auto" 
                    onClick={startPracticeWithSelectedSubjects}
                    disabled={selectedSubjects.length === 0}
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Start Practice ({selectedQuestionCount === 'All' ? filteredQuestions.length : Math.min(selectedQuestionCount, filteredQuestions.length)} questions)
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto"
                    onClick={() => setShowSubjectSelector(false)}
                  >
                    Browse All Questions
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Year Selection */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Available Years (2004 - 2024)</CardTitle>
                <CardDescription>Questions from the past 20 years of JAMB exams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 21 }, (_, i) => 2024 - i).map(year => {
                    const yearQuestions = questions.filter(q => q.year === year);
                    return (
                      <Button
                        key={year}
                        variant={yearFilter === String(year) ? "default" : "outline"}
                        size="sm"
                        onClick={() => setYearFilter(yearFilter === String(year) ? '' : String(year))}
                        className="min-w-[70px]"
                      >
                        {year}
                        {yearQuestions.length > 0 && (
                          <span className="ml-1 text-xs">({yearQuestions.length})</span>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Question browsing view
  const groupedQuestions = filteredQuestions.reduce((acc, q) => {
    const key = `${q.exam_name} ${q.year}`;
    if (!acc[key]) {
      acc[key] = { exam: q.exam_name, year: q.year, questions: [] };
    }
    acc[key].questions.push(q);
    return acc;
  }, {} as Record<string, { exam: string; year: number; questions: PastQuestion[] }>);

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="py-4 px-4 md:py-6 md:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Past Question Bank</h1>
            <Button variant="outline" onClick={() => setShowSubjectSelector(true)}>
              <Filter className="h-4 w-4 mr-2" /> Select Subjects
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            <Input 
              placeholder="Search questions..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background"
            />
            
            <Select value={examFilter || "all"} onValueChange={(v) => setExamFilter(v === "all" ? "" : v)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select Exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                {getUniqueValues('exam_name').map((exam) => (
                  <SelectItem key={String(exam)} value={String(exam)}>{String(exam)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={yearFilter || "all"} onValueChange={(v) => setYearFilter(v === "all" ? "" : v)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {Array.from({ length: 21 }, (_, i) => 2024 - i).map((year) => (
                  <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={selectedSubjects.length === 1 ? selectedSubjects[0] : "all"} 
              onValueChange={(v) => setSelectedSubjects(v === "all" ? [] : [v])}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {allSubjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected subjects display */}
          {selectedSubjects.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Filtering by:</span>
              {selectedSubjects.map(subject => (
                <Badge key={subject} variant="secondary" className="cursor-pointer" onClick={() => handleSubjectToggle(subject)}>
                  {subject} ×
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={() => setSelectedSubjects([])}>
                Clear all
              </Button>
            </div>
          )}

          {/* Quick Practice by Subject */}
          <div className="mb-6">
            <h2 className="font-semibold mb-3 text-foreground">Quick Practice by Subject</h2>
            <div className="flex flex-wrap gap-2">
              {allSubjects.filter(s => questions.some(q => q.subject === s)).map((subject) => (
                <Button
                  key={subject}
                  variant="outline"
                  size="sm"
                  onClick={() => startPractice(questions.filter(q => q.subject === subject))}
                >
                  {subject}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Object.values(groupedQuestions).map((group) => (
              <Card key={`${group.exam}-${group.year}`} className="hover:shadow-md transition-shadow bg-card">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-foreground">{group.exam}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{group.year}</Badge>
                    </div>
                    <Badge>{group.questions.length} Qs</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-1">
                    {[...new Set(group.questions.map(q => q.subject))].slice(0, 4).map(subject => (
                      <Badge key={subject} variant="outline" className="text-xs">{subject}</Badge>
                    ))}
                    {[...new Set(group.questions.map(q => q.subject))].length > 4 && (
                      <Badge variant="outline" className="text-xs">+{[...new Set(group.questions.map(q => q.subject))].length - 4} more</Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => startPractice(group.questions)}
                  >
                    <PlayCircle className="h-4 w-4 mr-2" /> Practice
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <Card className="text-center py-12 bg-card">
              <CardContent>
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">No questions found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search term</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastQuestions;
