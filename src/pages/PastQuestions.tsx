import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, PlayCircle, Youtube, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface PastQuestion {
  id: string;
  exam_name: string;
  year: number;
  subject: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  difficulty: string;
}

// YouTube video resources by subject
const subjectVideos: Record<string, { title: string; url: string; views: string }[]> = {
  'Mathematics': [
    { title: 'Complete JAMB Maths Tutorial', url: 'https://www.youtube.com/watch?v=EaQP3CdNeFk', views: '2.1M views' },
    { title: 'JAMB Mathematics Past Questions', url: 'https://www.youtube.com/watch?v=LwCRRUa8yTU', views: '890K views' },
  ],
  'English': [
    { title: 'JAMB English Comprehension Tips', url: 'https://www.youtube.com/watch?v=3fWdFXhDKvs', views: '1.5M views' },
    { title: 'English Language Complete Tutorial', url: 'https://www.youtube.com/watch?v=SdxXDPgVPdE', views: '750K views' },
  ],
  'Physics': [
    { title: 'JAMB Physics Full Course', url: 'https://www.youtube.com/watch?v=ZM8ECpBuQYE', views: '1.8M views' },
    { title: 'Physics Past Questions Solved', url: 'https://www.youtube.com/watch?v=qZsO-PL-qbU', views: '620K views' },
  ],
  'Chemistry': [
    { title: 'JAMB Chemistry Tutorial', url: 'https://www.youtube.com/watch?v=FSyAehMdpyI', views: '1.2M views' },
    { title: 'Chemistry Past Questions', url: 'https://www.youtube.com/watch?v=V3EeP0QU8Ug', views: '540K views' },
  ],
  'Biology': [
    { title: 'Complete Biology for JAMB', url: 'https://www.youtube.com/watch?v=8IluKZL2-Tc', views: '1.6M views' },
    { title: 'Biology Past Questions Explained', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', views: '480K views' },
  ],
  'Literature': [
    { title: 'JAMB Literature Summary', url: 'https://www.youtube.com/watch?v=LqU7D4xG-54', views: '890K views' },
    { title: 'African Literature Analysis', url: 'https://www.youtube.com/watch?v=Q7m2L3xX8Uo', views: '320K views' },
  ],
  'Government': [
    { title: 'Government for JAMB', url: 'https://www.youtube.com/watch?v=tCkU98lOH7k', views: '720K views' },
    { title: 'Nigerian Government Tutorial', url: 'https://www.youtube.com/watch?v=DxL2HoqLbyA', views: '450K views' },
  ],
  'Economics': [
    { title: 'JAMB Economics Complete', url: 'https://www.youtube.com/watch?v=PHe0bXAIuk0', views: '980K views' },
    { title: 'Economics Past Questions', url: 'https://www.youtube.com/watch?v=_Y0-MxPK8FM', views: '380K views' },
  ],
  'Christian Religious Studies': [
    { title: 'CRS for JAMB', url: 'https://www.youtube.com/watch?v=mT3-1NpNjnY', views: '520K views' },
    { title: 'Bible Studies Tutorial', url: 'https://www.youtube.com/watch?v=vCGtkDzELAI', views: '290K views' },
  ],
  'Commerce': [
    { title: 'Commerce for WASSCE/JAMB', url: 'https://www.youtube.com/watch?v=LfV-3lXh8zA', views: '340K views' },
    { title: 'Business Studies Tutorial', url: 'https://www.youtube.com/watch?v=6ZF9LQkqFNs', views: '210K views' },
  ],
  'Accounting': [
    { title: 'Financial Accounting Basics', url: 'https://www.youtube.com/watch?v=XH3Z2n_XCpU', views: '1.1M views' },
    { title: 'JAMB Accounting Tutorial', url: 'https://www.youtube.com/watch?v=bYexdJmrT94', views: '280K views' },
  ],
  'Further Mathematics': [
    { title: 'Further Maths Complete Course', url: 'https://www.youtube.com/watch?v=HeQX2HjkcNo', views: '450K views' },
    { title: 'Calculus for JAMB', url: 'https://www.youtube.com/watch?v=WsQQvHm4lSw', views: '380K views' },
  ],
};

const PastQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<PastQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<PastQuestion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [examFilter, setExamFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [loading, setLoading] = useState(true);
  
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
  }, [questions, searchTerm, examFilter, yearFilter, subjectFilter]);

  const loadQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('past_questions')
        .select('*')
        .order('year', { ascending: false });

      if (error) throw error;
      const formattedData = (data || []).map(q => ({
        ...q,
        options: q.options as string[]
      }));
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

    if (subjectFilter) {
      filtered = filtered.filter(q => q.subject === subjectFilter);
    }

    setFilteredQuestions(filtered);
  };

  const getUniqueValues = <K extends keyof PastQuestion>(key: K): PastQuestion[K][] => {
    return [...new Set(questions.map(q => q[key]))];
  };

  const startPractice = (questionsToUse: PastQuestion[]) => {
    setPracticeQuestions(questionsToUse);
    setPracticeMode(true);
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
    
    const isCorrect = selectedAnswer === practiceQuestions[currentQuestionIndex].correct_answer;
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
      toast.success(`Practice complete! Score: ${score + (selectedAnswer === practiceQuestions[currentQuestionIndex].correct_answer ? 1 : 0)}/${practiceQuestions.length}`);
      setPracticeMode(false);
    }
  };

  const exitPractice = () => {
    setPracticeMode(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
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
                <h1 className="text-xl md:text-2xl font-bold">Practice Mode</h1>
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
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge>{currentQ.exam_name}</Badge>
                    <Badge variant="secondary">{currentQ.year}</Badge>
                    <Badge variant="outline">{currentQ.subject}</Badge>
                  </div>
                  <CardTitle className="text-lg md:text-xl">{currentQ.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={showResult}
                        className={`w-full p-3 md:p-4 text-left rounded-lg border-2 transition-colors text-sm md:text-base ${
                          showResult && option === currentQ.correct_answer
                            ? 'border-green-500 bg-green-50 dark:bg-green-950'
                            : showResult && option === selectedAnswer && option !== currentQ.correct_answer
                            ? 'border-red-500 bg-red-50 dark:bg-red-950'
                            : selectedAnswer === option
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showResult && option === currentQ.correct_answer && (
                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                          )}
                          {showResult && option === selectedAnswer && option !== currentQ.correct_answer && (
                            <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {showResult && currentQ.explanation && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="font-semibold mb-2">Explanation:</p>
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
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
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
                              <p className="font-medium text-sm md:text-base">{video.title}</p>
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

  // Group questions by exam and year
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
          <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Past Question Bank</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            <Input 
              placeholder="Search questions..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Select value={examFilter || "all"} onValueChange={(v) => setExamFilter(v === "all" ? "" : v)}>
              <SelectTrigger>
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
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {getUniqueValues('year').map((year) => (
                  <SelectItem key={String(year)} value={String(year)}>{String(year)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={subjectFilter || "all"} onValueChange={(v) => setSubjectFilter(v === "all" ? "" : v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {getUniqueValues('subject').map((subject) => (
                  <SelectItem key={String(subject)} value={String(subject)}>{String(subject)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick Practice by Subject */}
          <div className="mb-6">
            <h2 className="font-semibold mb-3">Quick Practice by Subject</h2>
            <div className="flex flex-wrap gap-2">
              {getUniqueValues('subject').map((subject) => (
                <Button
                  key={String(subject)}
                  variant="outline"
                  size="sm"
                  onClick={() => startPractice(questions.filter(q => q.subject === subject))}
                >
                  {String(subject)}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Object.values(groupedQuestions).map((group) => (
              <Card key={`${group.exam}-${group.year}`} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base md:text-lg font-semibold">
                      {group.exam} {group.year}
                    </CardTitle>
                    <Badge>{group.questions.length} questions</Badge>
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Subjects: {[...new Set(group.questions.map(q => q.subject))].join(', ')}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {group.questions.slice(0, 2).map((q) => (
                      <div key={q.id} className="text-xs md:text-sm text-muted-foreground truncate">
                        • {q.question}
                      </div>
                    ))}
                    {group.questions.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{group.questions.length - 2} more questions
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button className="w-full" onClick={() => startPractice(group.questions)}>
                    <PlayCircle size={14} className="mr-1" /> Practice Now
                  </Button>
                  {subjectVideos[group.questions[0]?.subject] && (
                    <a
                      href={subjectVideos[group.questions[0].subject][0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full">
                        <Youtube size={14} className="mr-1 text-red-500" /> Watch Tutorial
                      </Button>
                    </a>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No questions found matching your filters.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastQuestions;