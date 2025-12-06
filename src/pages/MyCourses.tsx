import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Loader2, Plus, BookOpen, FileText, Trash2, ExternalLink, GraduationCap, HelpCircle } from 'lucide-react';

interface Course {
  id: string;
  course_name: string;
  course_code: string | null;
  description: string | null;
  created_at: string;
}

interface CourseQuestion {
  id: string;
  course_id: string;
  question: string;
  answer: string | null;
  source_url: string | null;
}

interface CourseMaterial {
  id: string;
  course_id: string;
  title: string;
  material_type: string;
  url: string | null;
  description: string | null;
}

const MyCourses: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseQuestions, setCourseQuestions] = useState<CourseQuestion[]>([]);
  const [courseMaterials, setCourseMaterials] = useState<CourseMaterial[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showAddQuestionDialog, setShowAddQuestionDialog] = useState(false);
  const [showAddMaterialDialog, setShowAddMaterialDialog] = useState(false);
  
  // Form states
  const [newCourse, setNewCourse] = useState({ name: '', code: '', description: '' });
  const [newQuestion, setNewQuestion] = useState({ question: '', answer: '', source_url: '' });
  const [newMaterial, setNewMaterial] = useState({ title: '', type: 'document', url: '', description: '' });

  useEffect(() => {
    if (user) loadCourses();
  }, [user]);

  const loadCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const loadCourseDetails = async (course: Course) => {
    setSelectedCourse(course);
    try {
      const [questionsRes, materialsRes] = await Promise.all([
        supabase.from('custom_course_questions').select('*').eq('course_id', course.id),
        supabase.from('custom_course_materials').select('*').eq('course_id', course.id)
      ]);

      if (questionsRes.error) throw questionsRes.error;
      if (materialsRes.error) throw materialsRes.error;

      setCourseQuestions(questionsRes.data || []);
      setCourseMaterials(materialsRes.data || []);
    } catch (error: any) {
      toast.error('Failed to load course details');
    }
  };

  const handleAddCourse = async () => {
    if (!user || !newCourse.name.trim()) return;
    
    try {
      const { error } = await supabase.from('custom_courses').insert({
        user_id: user.id,
        course_name: newCourse.name.trim(),
        course_code: newCourse.code.trim() || null,
        description: newCourse.description.trim() || null
      });

      if (error) throw error;
      toast.success('Course added successfully!');
      setNewCourse({ name: '', code: '', description: '' });
      setShowAddDialog(false);
      loadCourses();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add course');
    }
  };

  const handleAddQuestion = async () => {
    if (!selectedCourse || !newQuestion.question.trim()) return;
    
    try {
      const { error } = await supabase.from('custom_course_questions').insert({
        course_id: selectedCourse.id,
        question: newQuestion.question.trim(),
        answer: newQuestion.answer.trim() || null,
        source_url: newQuestion.source_url.trim() || null
      });

      if (error) throw error;
      toast.success('Question added!');
      setNewQuestion({ question: '', answer: '', source_url: '' });
      setShowAddQuestionDialog(false);
      loadCourseDetails(selectedCourse);
    } catch (error: any) {
      toast.error('Failed to add question');
    }
  };

  const handleAddMaterial = async () => {
    if (!selectedCourse || !newMaterial.title.trim()) return;
    
    try {
      const { error } = await supabase.from('custom_course_materials').insert({
        course_id: selectedCourse.id,
        title: newMaterial.title.trim(),
        material_type: newMaterial.type,
        url: newMaterial.url.trim() || null,
        description: newMaterial.description.trim() || null
      });

      if (error) throw error;
      toast.success('Material added!');
      setNewMaterial({ title: '', type: 'document', url: '', description: '' });
      setShowAddMaterialDialog(false);
      loadCourseDetails(selectedCourse);
    } catch (error: any) {
      toast.error('Failed to add material');
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const { error } = await supabase.from('custom_courses').delete().eq('id', courseId);
      if (error) throw error;
      toast.success('Course deleted');
      if (selectedCourse?.id === courseId) setSelectedCourse(null);
      loadCourses();
    } catch (error: any) {
      toast.error('Failed to delete course');
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
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="py-4 px-4 md:py-6 md:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                My Courses
              </h1>
              <p className="text-sm text-muted-foreground">Add your university courses and track study materials</p>
            </div>
            
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" /> Add Course
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Course</DialogTitle>
                  <DialogDescription>Add a course you're studying to track materials and FAQs</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input
                    placeholder="Course Name (e.g., Introduction to Psychology)"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  />
                  <Input
                    placeholder="Course Code (e.g., PSY101)"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                  />
                  <Textarea
                    placeholder="Description (optional)"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  />
                </div>
                <DialogFooter>
                  <Button onClick={handleAddCourse} disabled={!newCourse.name.trim()}>
                    Add Course
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {courses.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
                <p className="text-muted-foreground mb-4">Add your first course to start tracking materials and questions</p>
                <Button onClick={() => setShowAddDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Your First Course
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Courses List */}
              <div className="lg:col-span-1 space-y-4">
                <h2 className="font-semibold text-lg">Your Courses</h2>
                {courses.map((course) => (
                  <Card 
                    key={course.id} 
                    className={`cursor-pointer transition-all ${selectedCourse?.id === course.id ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
                    onClick={() => loadCourseDetails(course)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{course.course_name}</CardTitle>
                          {course.course_code && (
                            <Badge variant="secondary" className="mt-1">{course.course_code}</Badge>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardHeader>
                    {course.description && (
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>

              {/* Course Details */}
              <div className="lg:col-span-2">
                {selectedCourse ? (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          {selectedCourse.course_name}
                        </CardTitle>
                        <CardDescription>{selectedCourse.description}</CardDescription>
                      </CardHeader>
                    </Card>

                    {/* FAQs Section */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-5 w-5" />
                          <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                        </div>
                        <Dialog open={showAddQuestionDialog} onOpenChange={setShowAddQuestionDialog}>
                          <DialogTrigger asChild>
                            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Add Question</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <Textarea
                                placeholder="Question"
                                value={newQuestion.question}
                                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                              />
                              <Textarea
                                placeholder="Answer (optional)"
                                value={newQuestion.answer}
                                onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                              />
                              <Input
                                placeholder="Source URL (optional)"
                                value={newQuestion.source_url}
                                onChange={(e) => setNewQuestion({ ...newQuestion, source_url: e.target.value })}
                              />
                            </div>
                            <DialogFooter>
                              <Button onClick={handleAddQuestion}>Add Question</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardHeader>
                      <CardContent>
                        {courseQuestions.length === 0 ? (
                          <p className="text-muted-foreground text-center py-4">No questions yet. Add common exam questions or FAQs.</p>
                        ) : (
                          <div className="space-y-4">
                            {courseQuestions.map((q) => (
                              <div key={q.id} className="border rounded-lg p-4">
                                <p className="font-medium mb-2">{q.question}</p>
                                {q.answer && <p className="text-sm text-muted-foreground">{q.answer}</p>}
                                {q.source_url && (
                                  <a href={q.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 mt-2">
                                    <ExternalLink className="h-3 w-3" /> Source
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Materials Section */}
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          <CardTitle className="text-lg">Study Materials</CardTitle>
                        </div>
                        <Dialog open={showAddMaterialDialog} onOpenChange={setShowAddMaterialDialog}>
                          <DialogTrigger asChild>
                            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add</Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Add Material</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <Input
                                placeholder="Title"
                                value={newMaterial.title}
                                onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
                              />
                              <select 
                                className="w-full border rounded-md p-2"
                                value={newMaterial.type}
                                onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value })}
                              >
                                <option value="document">Document</option>
                                <option value="video">Video</option>
                                <option value="website">Website</option>
                                <option value="book">Book</option>
                              </select>
                              <Input
                                placeholder="URL (optional)"
                                value={newMaterial.url}
                                onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
                              />
                              <Textarea
                                placeholder="Description (optional)"
                                value={newMaterial.description}
                                onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                              />
                            </div>
                            <DialogFooter>
                              <Button onClick={handleAddMaterial}>Add Material</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardHeader>
                      <CardContent>
                        {courseMaterials.length === 0 ? (
                          <p className="text-muted-foreground text-center py-4">No materials yet. Add textbooks, videos, or useful links.</p>
                        ) : (
                          <div className="grid gap-3">
                            {courseMaterials.map((m) => (
                              <div key={m.id} className="flex items-center justify-between border rounded-lg p-3">
                                <div>
                                  <p className="font-medium">{m.title}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline">{m.material_type}</Badge>
                                    {m.description && <span className="text-xs text-muted-foreground">{m.description}</span>}
                                  </div>
                                </div>
                                {m.url && (
                                  <a href={m.url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="icon">
                                      <ExternalLink className="h-4 w-4" />
                                    </Button>
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="h-full flex items-center justify-center py-12">
                    <CardContent className="text-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select a course to view details</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;