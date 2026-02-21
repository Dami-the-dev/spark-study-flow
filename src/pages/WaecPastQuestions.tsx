import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Loader2, BookOpen, CheckCircle, XCircle, ArrowRight, 
  Trophy, Target, Youtube, ExternalLink, GraduationCap,
  Filter, Play, RotateCcw
} from 'lucide-react';

interface WaecQuestion {
  id: string;
  exam_name: string;
  year: number;
  subject: string;
  question: string;
  options: any;
  correct_answer: string;
  explanation: string | null;
  difficulty: string | null;
}

const waecSubjects = [
  'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology',
  'Further Mathematics', 'Technical Drawing', 'Agricultural Science',
  'Economics', 'Government', 'Literature in English', 'Geography',
  'Civic Education', 'Commerce', 'Accounting', 'Book Keeping',
  'Christian Religious Studies', 'Islamic Religious Studies',
  'History', 'French', 'Yoruba', 'Igbo', 'Hausa',
  'Food and Nutrition', 'Home Management', 'Computer Studies',
  'Data Processing', 'Marketing', 'Office Practice'
];

const subjectVideos: Record<string, { title: string; url: string; views: string }[]> = {
  'Mathematics': [
    { title: 'WAEC Mathematics Complete Revision 2024', url: 'https://www.youtube.com/watch?v=xyDkyFXLvCk', views: '1.2M' },
    { title: 'WAEC Maths Past Questions Solved', url: 'https://www.youtube.com/watch?v=Ws4P9H0JloU', views: '890K' },
  ],
  'English Language': [
    { title: 'WAEC English Language Tips & Tricks', url: 'https://www.youtube.com/watch?v=KHVANa45bHk', views: '750K' },
    { title: 'WAEC English Comprehension Techniques', url: 'https://www.youtube.com/watch?v=W3j4zQZ_VKQ', views: '620K' },
  ],
  'Physics': [
    { title: 'WAEC Physics Complete Revision', url: 'https://www.youtube.com/watch?v=X18mUlDddCo', views: '540K' },
  ],
  'Chemistry': [
    { title: 'WAEC Chemistry Complete Course', url: 'https://www.youtube.com/watch?v=9VWmSNGW1Qk', views: '480K' },
  ],
  'Biology': [
    { title: 'WAEC Biology Full Revision', url: 'https://www.youtube.com/watch?v=8IluKZL2-Tc', views: '670K' },
  ],
};

const WaecPastQuestions: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<WaecQuestion[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [showSubjectSelection, setShowSubjectSelection] = useState(true);
  
  // Practice mode state
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const years = Array.from({ length: 20 }, (_, i) => 2024 - i);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const loadQuestions = async () => {
    if (selectedSubjects.length === 0) {
      toast.error('Please select at least one subject');
      return;
    }

    setLoading(true);
    try {
      let query = supabase
        .from('past_questions')
        .select('*')
        .eq('exam_name', 'WAEC')
        .in('subject', selectedSubjects)
        .order('year', { ascending: false });

      if (selectedYear !== 'all') {
        query = query.eq('year', parseInt(selectedYear));
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Shuffle questions for practice
      const shuffled = (data || []).sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
      setShowSubjectSelection(false);
      
      if (shuffled.length === 0) {
        toast.info('No WAEC questions found for selected subjects. More questions coming soon!');
      }
    } catch (error: any) {
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const startPractice = () => {
    if (questions.length === 0) return;
    setPracticeMode(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTotalAnswered(0);
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setTotalAnswered(prev => prev + 1);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const exitPractice = () => {
    setPracticeMode(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const resetSelection = () => {
    setShowSubjectSelection(true);
    setQuestions([]);
    setPracticeMode(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Subject Selection View
  if (showSubjectSelection) {
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto pt-16 md:pt-0">
          <div className="py-4 px-4 md:py-6 md:px-8">
            <div className="mb-6">
              <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-foreground">
                <GraduationCap className="h-6 w-6 text-primary" />
                WAEC Past Questions
              </h1>
              <p className="text-sm text-muted-foreground">
                Select the subjects you want to practice for your WAEC examination
              </p>
            </div>

            <Card className="mb-6 bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Choose Your WAEC Subjects</CardTitle>
                <CardDescription>
                  Select the subjects you're writing in WAEC. You can choose multiple subjects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {waecSubjects.map((subject) => (
                    <Badge
                      key={subject}
                      variant={selectedSubjects.includes(subject) ? "default" : "outline"}
                      className={`cursor-pointer transition-all py-2 px-3 ${
                        selectedSubjects.includes(subject) 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-primary/10'
                      }`}
                      onClick={() => toggleSubject(subject)}
                    >
                      {subject}
                      {selectedSubjects.includes(subject) && (
                        <CheckCircle className="h-3 w-3 ml-1" />
                      )}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                  <div className="w-full sm:w-48">
                    <label className="text-sm font-medium mb-2 block text-foreground">Filter by Year</label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Years</SelectItem>
                        {years.map(year => (
                          <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={loadQuestions} 
                    disabled={selectedSubjects.length === 0 || loading}
                    className="w-full sm:w-auto"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Start Practice ({selectedSubjects.length} subjects)
                  </Button>
                </div>

                {selectedSubjects.length > 0 && (
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">Selected:</span> {selectedSubjects.join(', ')}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Practice Mode View
  if (practiceMode && currentQuestion) {
    return (
      <div className="flex h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto pt-16 md:pt-0">
          <div className="py-4 px-4 md:py-6 md:px-8 max-w-4xl mx-auto">
            {/* Progress Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </Badge>
                <Badge variant="secondary">
                  {currentQuestion.subject}
                </Badge>
                <Badge variant="outline">
                  {currentQuestion.year}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="font-bold text-foreground">{score}/{totalAnswered}</span>
                <Button variant="ghost" size="sm" onClick={exitPractice}>
                  Exit
                </Button>
              </div>
            </div>

            {/* Question Card */}
            <Card className="mb-6 bg-card">
              <CardHeader>
                <div className="flex items-start gap-2">
                  {currentQuestion.difficulty && (
                    <Badge 
                      variant={
                        currentQuestion.difficulty === 'hard' ? 'destructive' : 
                        currentQuestion.difficulty === 'medium' ? 'default' : 'secondary'
                      }
                    >
                      {currentQuestion.difficulty}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg mt-2 text-foreground">{currentQuestion.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(currentQuestion.options).map(([key, value]) => {
                    const isSelected = selectedAnswer === key;
                    const isCorrect = key === currentQuestion.correct_answer;
                    
                    let bgClass = 'bg-background hover:bg-muted';
                    if (showResult) {
                      if (isCorrect) bgClass = 'bg-green-100 dark:bg-green-900/30 border-green-500';
                      else if (isSelected && !isCorrect) bgClass = 'bg-red-100 dark:bg-red-900/30 border-red-500';
                    } else if (isSelected) {
                      bgClass = 'bg-primary/20 border-primary';
                    }

                    return (
                      <button
                        key={key}
                        onClick={() => handleAnswerSelect(key)}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${bgClass} ${
                          !showResult ? 'cursor-pointer' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-primary">{key}.</span>
                          <span className="text-foreground">{String(value)}</span>
                          {showResult && isCorrect && (
                            <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <XCircle className="h-5 w-5 text-red-500 ml-auto" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showResult && currentQuestion.explanation && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-1">Explanation:</p>
                    <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                  {!showResult ? (
                    <Button 
                      onClick={handleSubmitAnswer} 
                      disabled={!selectedAnswer}
                      className="w-full"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex >= questions.length - 1}
                      className="w-full"
                    >
                      Next Question <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* YouTube Resources */}
            {currentQuestion.subject && subjectVideos[currentQuestion.subject] && (
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                    <Youtube className="h-4 w-4 text-red-500" />
                    Related Videos for {currentQuestion.subject}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {subjectVideos[currentQuestion.subject].map((video, index) => (
                      <a
                        key={index}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors"
                      >
                        <span className="text-sm text-foreground">{video.title}</span>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <span className="text-xs">{video.views} views</span>
                          <ExternalLink className="h-3 w-3" />
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Questions List View
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="py-4 px-4 md:py-6 md:px-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-foreground">
                <GraduationCap className="h-6 w-6 text-primary" />
                WAEC Past Questions
              </h1>
              <p className="text-sm text-muted-foreground">
                {questions.length} questions loaded for {selectedSubjects.join(', ')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={resetSelection}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Change Subjects
              </Button>
              <Button onClick={startPractice} disabled={questions.length === 0}>
                <Play className="h-4 w-4 mr-2" />
                Start Practice
              </Button>
            </div>
          </div>

          {questions.length === 0 ? (
            <Card className="text-center py-12 bg-card">
              <CardContent>
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">No Questions Available Yet</h3>
                <p className="text-muted-foreground mb-4">
                  WAEC questions for these subjects are coming soon!
                </p>
                <Button variant="outline" onClick={resetSelection}>
                  Try Different Subjects
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {questions.slice(0, 20).map((q, index) => (
                <Card key={q.id} className="bg-card">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-primary">{index + 1}.</span>
                      <div className="flex-1">
                        <div className="flex gap-2 mb-2">
                          <Badge variant="secondary">{q.subject}</Badge>
                          <Badge variant="outline">{q.year}</Badge>
                          {q.difficulty && (
                            <Badge variant={q.difficulty === 'hard' ? 'destructive' : 'default'}>
                              {q.difficulty}
                            </Badge>
                          )}
                        </div>
                        <p className="text-foreground">{q.question}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {questions.length > 20 && (
                <p className="text-center text-muted-foreground">
                  Showing 20 of {questions.length} questions. Start practice to see all.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaecPastQuestions;
