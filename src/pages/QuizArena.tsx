import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: string;
  subject: string;
  difficulty: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

const QuizArena: React.FC = () => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const formattedData = (data || []).map(q => ({
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

  const handleAnswerSelect = async (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === currentQuestion?.correct_answer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setTotalAnswered(totalAnswered + 1);

    // Save attempt to database
    if (user && currentQuestion) {
      try {
        await supabase.from('quiz_attempts').insert({
          user_id: user.id,
          question_id: currentQuestion.id,
          selected_answer: answer,
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
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Quiz Arena</h1>
            <div className="flex gap-4">
              <Badge className="text-lg py-2 px-4">
                Score: {score}/{totalAnswered}
              </Badge>
            </div>
          </div>

          {currentQuestion ? (
            <div className="max-w-3xl mx-auto">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge>{currentQuestion.subject}</Badge>
                    <Badge variant={currentQuestion.difficulty === 'hard' ? 'destructive' : 'default'}>
                      {currentQuestion.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => !showResult && handleAnswerSelect(option)}
                        disabled={showResult}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                          showResult && option === currentQuestion.correct_answer
                            ? 'border-green-500 bg-green-50'
                            : showResult && option === selectedAnswer && option !== currentQuestion.correct_answer
                            ? 'border-red-500 bg-red-50'
                            : selectedAnswer === option
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-primary'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showResult && option === currentQuestion.correct_answer && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          {showResult && option === selectedAnswer && option !== currentQuestion.correct_answer && (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {showResult && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="font-semibold mb-2">Explanation:</p>
                      <p className="text-gray-700">{currentQuestion.explanation}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {showResult && (
                    <Button onClick={handleNextQuestion} className="w-full">
                      Next Question
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">No questions available yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizArena;
