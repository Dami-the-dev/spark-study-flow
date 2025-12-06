import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, PlayCircle } from 'lucide-react';

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

const PastQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<PastQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<PastQuestion[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [examFilter, setExamFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-8">
          <h1 className="text-2xl font-bold mb-6">Past Question Bank</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(groupedQuestions).map((group) => (
              <Card key={`${group.exam}-${group.year}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">
                      {group.exam} {group.year}
                    </CardTitle>
                    <Badge>{group.questions.length} questions</Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    Subjects: {[...new Set(group.questions.map(q => q.subject))].join(', ')}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {group.questions.slice(0, 3).map((q) => (
                      <div key={q.id} className="text-sm text-gray-600 truncate">
                        • {q.question}
                      </div>
                    ))}
                    {group.questions.length > 3 && (
                      <div className="text-sm text-gray-400">
                        +{group.questions.length - 3} more questions
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <PlayCircle size={14} className="mr-1" /> Practice Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">No questions found matching your filters.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastQuestions;
