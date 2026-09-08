import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { Plus, Trash2, CalendarDays, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

interface StudyPlan {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  subjects: string[];
  completed?: boolean;
}

const STORAGE_KEY = 'sparkstudy_study_plans';

const loadStored = (): StudyPlan[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StudyPlan[]) : [];
  } catch {
    return [];
  }
};

const StudyPlanner: React.FC = () => {
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [subjects, setSubjects] = useState('');

  useEffect(() => {
    setPlans(loadStored());
  }, []);

  const persist = (next: StudyPlan[]) => {
    setPlans(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartDate(new Date());
    setEndDate(new Date());
    setSubjects('');
  };

  const handleCreatePlan = () => {
    if (!title.trim() || !startDate || !endDate) {
      toast.error('Please add a title and pick both dates');
      return;
    }
    if (endDate < startDate) {
      toast.error('End date cannot be before the start date');
      return;
    }

    const plan: StudyPlan = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      start_date: format(startDate, 'yyyy-MM-dd'),
      end_date: format(endDate, 'yyyy-MM-dd'),
      subjects: subjects.split(',').map((s) => s.trim()).filter(Boolean),
      completed: false,
    };

    persist([plan, ...plans]);
    toast.success('Study plan created!');
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDeletePlan = (id: string) => {
    persist(plans.filter((p) => p.id !== id));
    toast.success('Study plan deleted');
  };

  const toggleComplete = (id: string) => {
    persist(plans.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p)));
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="py-4 px-4 md:py-6 md:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <CalendarDays className="h-6 w-6 text-primary" /> Study Planner
              </h1>
              <p className="text-sm text-muted-foreground">Plan your JAMB &amp; WAEC study schedule</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="mr-2 h-4 w-4" /> Create Plan
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Study Plan</DialogTitle>
                  <DialogDescription>Set your goals, subjects and dates.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Plan Title</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., JAMB Final Revision" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your study goals..." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="subjects">Subjects (comma-separated)</Label>
                    <Input id="subjects" value={subjects} onChange={(e) => setSubjects(e.target.value)} placeholder="e.g., Mathematics, Physics, Chemistry" />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid gap-2">
                      <Label>Start Date</Label>
                      <div className="flex justify-center">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} className="rounded-md border w-fit max-w-full" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>End Date</Label>
                      <div className="flex justify-center">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} className="rounded-md border w-fit max-w-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreatePlan} className="w-full sm:w-auto">Create Plan</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {plans.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No study plans yet. Create your first plan to get started!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {plans.map((plan) => (
                <Card key={plan.id} className={plan.completed ? 'opacity-70' : ''}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg">{plan.title}</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => handleDeletePlan(plan.id)} aria-label="Delete plan">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {plan.description && <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Start:</span>
                        <span>{format(new Date(plan.start_date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">End:</span>
                        <span>{format(new Date(plan.end_date), 'MMM dd, yyyy')}</span>
                      </div>
                      {plan.subjects?.length > 0 && (
                        <div className="mt-2">
                          <span className="text-muted-foreground">Subjects:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {plan.subjects.map((subject, idx) => (
                              <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">{subject}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <Button variant={plan.completed ? 'secondary' : 'outline'} size="sm" className="mt-4 w-full" onClick={() => toggleComplete(plan.id)}>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {plan.completed ? 'Completed' : 'Mark as complete'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;
