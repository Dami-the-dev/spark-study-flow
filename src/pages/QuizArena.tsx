import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle, Youtube, ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  subject: string;
  difficulty: string;
  question: string;
  options: string[];
  explanation: string;
  // correct_answer is NOT fetched client-side; checked server-side via RPC
}

// YouTube resources for learning
const subjectVideos: Record<string, { title: string; url: string }> = {
  'Mathematics': { title: 'JAMB Mathematics Tutorial', url: 'https://www.youtube.com/watch?v=EaQP3CdNeFk' },
  'English': { title: 'English Comprehension Tips', url: 'https://www.youtube.com/watch?v=3fWdFXhDKvs' },
  'Physics': { title: 'Physics Full Course', url: 'https://www.youtube.com/watch?v=ZM8ECpBuQYE' },
  'Chemistry': { title: 'Chemistry Tutorial', url: 'https://www.youtube.com/watch?v=FSyAehMdpyI' },
  'Biology': { title: 'Biology for JAMB', url: 'https://www.youtube.com/watch?v=8IluKZL2-Tc' },
};

const QuizArena: React.FC = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      // Use the safe view that excludes correct_answer
      const { data, error } = await supabase
        .from('quiz_questions_safe' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const formattedData = (data || []).map((q: any) => ({
        ...q,
        options: q.options as string[]
      }));
      setQuestions(formattedData);
      if (formattedData.length > 0) {
        setCurrentQuestion(formattedData[0]);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !currentQuestion) return;

    // Check answer server-side via RPC
    const { data: isCorrect, error: checkError } = await supabase
      .rpc('check_quiz_answer', {
        _question_id: currentQuestion.id,
        _selected_answer: selectedAnswer,
      });

    if (checkError) {
      toast.error('Failed to check answer');
      return;
    }

    // Fetch the correct answer for display purposes only after submission
    const { data: correct } = await supabase
      .rpc('get_correct_answer', { _question_id: currentQuestion.id });
    setCorrectAnswer(correct);

    if (isCorrect) setScore(score + 1);
    setTotalAnswered(totalAnswered + 1);
    setShowResult(true);

    if (user) {
      try {
        await supabase.from('quiz_attempts').insert({
          user_id: user.id,
          question_id: currentQuestion.id,
          selected_answer: selectedAnswer,
          is_correct: isCorrect,
        });
      } catch (error) {
        console.error('Error saving attempt:', error);
      }
    }
  };

  const handleNextQuestion = () => {
    const currentIndex = questions.findIndex(q => q.id === currentQuestion?.id);
    const nextIndex = (currentIndex + 1) % questions.length;
    setCurrentQuestion(questions[nextIndex]);
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

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="py-4 px-4 md:py-6 md:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold">Quiz Arena</h1>
            <Badge className="text-base md:text-lg py-2 px-4">
              Score: {score}/{totalAnswered}
            </Badge>
          </div>

          {currentQuestion ? (
            <div className="max-w-3xl mx-auto">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge>{currentQuestion.subject}</Badge>
                    <Badge variant={currentQuestion.difficulty === 'hard' ? 'destructive' : 'default'}>
                      {currentQuestion.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg md:text-2xl">{currentQuestion.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={showResult}
                        className={`w-full p-3 md:p-4 text-left rounded-lg border-2 transition-colors text-sm md:text-base ${
                          showResult && option === correctAnswer
                            ? 'border-green-500 bg-green-50 dark:bg-green-950'
                            : showResult && option === selectedAnswer && option !== correctAnswer
                            ? 'border-red-500 bg-red-50 dark:bg-red-950'
                            : selectedAnswer === option
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showResult && option === correctAnswer && (
                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                          )}
                          {showResult && option === selectedAnswer && option !== correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {showResult && (
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <p className="font-semibold mb-2">Explanation:</p>
                      <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  {!showResult ? (
                    <Button 
                      className="w-full" 
                      onClick={handleSubmitAnswer}
                      disabled={!selectedAnswer}
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion} className="w-full">
                      Next Question <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </CardFooter>
              </Card>

              {/* Video resource for the subject */}
              {subjectVideos[currentQuestion.subject] && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg flex items-center gap-2">
                      <Youtube className="h-5 w-5 text-red-500" />
                      Need help with {currentQuestion.subject}?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={subjectVideos[currentQuestion.subject].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Youtube className="h-8 w-8 text-red-500 shrink-0" />
                        <span className="font-medium text-sm md:text-base">
                          {subjectVideos[currentQuestion.subject].title}
                        </span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary shrink-0" />
                    </a>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No questions available yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizArena;