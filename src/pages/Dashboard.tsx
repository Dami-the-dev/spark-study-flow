import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, BookOpen, Brain, FileText, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, isToday, parseISO } from 'date-fns';

const inspirationalQuotes = [
  { quote: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { quote: "There is no limit to what we, as women, can accomplish.", author: "Michelle Obama" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { quote: "Change will not come if we wait for some other person or some other time.", author: "Barack Obama" },
  { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "Think big and don't listen to people who tell you it can't be done.", author: "Ben Carson" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Education is not the filling of a pail, but the lighting of a fire.", author: "W.B. Yeats" },
  { quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { quote: "One child, one teacher, one book, one pen can change the world.", author: "Malala Yousafzai" },
  { quote: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King" },
  { quote: "Once you learn to read, you will be forever free.", author: "Frederick Douglass" },
];

interface StudyPlan {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  subjects: string[];
}

const Dashboard: React.FC = () => {
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [todaysPlans, setTodaysPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [quote, setQuote] = useState({ quote: '', author: '' });
  
  const userName = 'Student';

  useEffect(() => {
    // Get random quote based on session/day
    const savedQuoteIndex = sessionStorage.getItem('eduspark_quote_index');
    let quoteIndex: number;
    
    if (savedQuoteIndex) {
      quoteIndex = parseInt(savedQuoteIndex);
    } else {
      quoteIndex = Math.floor(Math.random() * inspirationalQuotes.length);
      sessionStorage.setItem('eduspark_quote_index', quoteIndex.toString());
    }
    
    setQuote(inspirationalQuotes[quoteIndex]);
  }, []);

  useEffect(() => {
    loadStudyPlans();
  }, []);

  const loadStudyPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('study_plans')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;
      
      const plans = (data || []).map(p => ({
        ...p,
        subjects: p.subjects as string[]
      }));
      
      setStudyPlans(plans);
      
      // Filter plans that are active today
      const today = new Date();
      const activePlans = plans.filter(plan => {
        const startDate = parseISO(plan.start_date);
        const endDate = parseISO(plan.end_date);
        return today >= startDate && today <= endDate;
      });
      
      setTodaysPlans(activePlans);
    } catch (error) {
      console.error('Error loading study plans:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="p-4 md:p-8">
          <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Welcome back, {userName}!</h1>
          
          {/* Inspirational Quote Card */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl mb-6 md:mb-8">
            <div className="flex items-start gap-4">
              <span className="text-4xl">💡</span>
              <div>
                <p className="text-lg md:text-xl italic text-foreground mb-2">"{quote.quote}"</p>
                <p className="text-sm text-muted-foreground">— {quote.author}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Today's Planner Card - Only show if there are plans */}
            {todaysPlans.length > 0 && (
              <div className="bg-card p-4 md:p-6 rounded-lg shadow-sm border border-border">
                <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Today's Study Plan
                </h2>
                <div className="space-y-3">
                  {todaysPlans.map((plan) => (
                    <div key={plan.id} className="pb-3 border-b border-border last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">{plan.title}</span>
                      </div>
                      {plan.subjects && plan.subjects.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {plan.subjects.map((subject, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Link 
                  to="/dashboard/planner" 
                  className="text-sm text-primary hover:underline mt-3 inline-block"
                >
                  View all plans →
                </Link>
              </div>
            )}
            
            {/* Quick Access Card */}
            <div className={`bg-card p-4 md:p-6 rounded-lg shadow-sm border border-border ${todaysPlans.length === 0 ? 'md:col-span-2' : ''}`}>
              <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Quick Access</h2>
              <div className={`grid ${todaysPlans.length === 0 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2'} gap-2 md:gap-3`}>
                <Link 
                  to="/dashboard/ai-assistant"
                  className="bg-muted hover:bg-muted/80 transition-colors p-3 md:p-4 rounded-md flex flex-col items-center justify-center"
                >
                  <Brain className="h-8 w-8 mb-2 text-primary" />
                  <span className="text-xs md:text-sm text-foreground text-center">Ask AI</span>
                </Link>
                <Link 
                  to="/dashboard/past-questions"
                  className="bg-muted hover:bg-muted/80 transition-colors p-3 md:p-4 rounded-md flex flex-col items-center justify-center"
                >
                  <FileText className="h-8 w-8 mb-2 text-primary" />
                  <span className="text-xs md:text-sm text-foreground text-center">Past Questions</span>
                </Link>
                <Link 
                  to="/dashboard/upload-materials"
                  className="bg-muted hover:bg-muted/80 transition-colors p-3 md:p-4 rounded-md flex flex-col items-center justify-center"
                >
                  <BookOpen className="h-8 w-8 mb-2 text-primary" />
                  <span className="text-xs md:text-sm text-foreground text-center">Upload Materials</span>
                </Link>
                <Link 
                  to="/dashboard/planner"
                  className="bg-muted hover:bg-muted/80 transition-colors p-3 md:p-4 rounded-md flex flex-col items-center justify-center"
                >
                  <Calendar className="h-8 w-8 mb-2 text-primary" />
                  <span className="text-xs md:text-sm text-foreground text-center">Study Planner</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* No Plans Message */}
          {todaysPlans.length === 0 && studyPlans.length === 0 && (
            <div className="bg-card p-6 rounded-lg shadow-sm border border-border text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Study Plans Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first study plan to see it displayed here on your dashboard.
              </p>
              <Link 
                to="/dashboard/planner"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Create Study Plan
              </Link>
            </div>
          )}

          {/* Upcoming Plans */}
          {studyPlans.length > 0 && todaysPlans.length === 0 && (
            <div className="bg-card p-4 md:p-6 rounded-lg shadow-sm border border-border">
              <h2 className="text-lg md:text-xl font-bold mb-4">Your Study Plans</h2>
              <div className="space-y-3">
                {studyPlans.slice(0, 3).map((plan) => (
                  <div key={plan.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{plan.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(parseISO(plan.start_date), 'MMM dd')} - {format(parseISO(plan.end_date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    {plan.subjects && plan.subjects.length > 0 && (
                      <div className="flex gap-1">
                        {plan.subjects.slice(0, 2).map((subject, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                          >
                            {subject}
                          </span>
                        ))}
                        {plan.subjects.length > 2 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                            +{plan.subjects.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Link 
                to="/dashboard/planner" 
                className="text-sm text-primary hover:underline mt-4 inline-block"
              >
                View all plans →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;