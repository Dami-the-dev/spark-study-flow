import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Loader2, Upload, FileUp, Sparkles, FileText, BookOpen, File } from 'lucide-react';

const jambSubjects = [
  'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology',
  'Government', 'Economics', 'Literature', 'Geography', 'Accounting',
  'Commerce', 'Agricultural Science', 'Civic Education', 'Christian Religious Studies',
  'Islamic Religious Studies', 'History', 'French', 'Arabic', 'Igbo', 'Yoruba', 'Hausa'
];

const UploadMaterials: React.FC = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [questionCount, setQuestionCount] = useState('50');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);

  const acceptedFileTypes = '.pdf,.doc,.docx,.txt,.rtf';
  const acceptedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/rtf'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValidType = acceptedMimeTypes.some(type => file.type === type) || 
                          file.name.endsWith('.doc') || 
                          file.name.endsWith('.docx') ||
                          file.name.endsWith('.pdf') ||
                          file.name.endsWith('.txt') ||
                          file.name.endsWith('.rtf');
      
      if (!isValidType) {
        toast.error('Please upload a PDF, Word document, or text file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.pdf')) return <FileText className="h-6 w-6 text-red-500" />;
    if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) return <FileText className="h-6 w-6 text-blue-500" />;
    return <File className="h-6 w-6 text-muted-foreground" />;
  };

  const handleGenerateQuestions = async () => {
    if (!selectedFile || !selectedSubject) {
      toast.error('Please select a file and subject');
      return;
    }

    setIsGenerating(true);
    setGeneratedQuestions([]);
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Content = (e.target?.result as string)?.split(',')[1];
        
        if (!base64Content) {
          toast.error('Failed to read file');
          setIsGenerating(false);
          return;
        }

        try {
          const { data, error } = await supabase.functions.invoke('generate-questions-from-pdf', {
            body: {
              pdfContent: base64Content,
              subject: selectedSubject,
              questionCount: parseInt(questionCount),
              fileName: selectedFile.name,
              examType: 'JAMB'
            }
          });

          if (error) throw error;
          
          if (data?.questions && data.questions.length > 0) {
            setGeneratedQuestions(data.questions);
            toast.success(`Generated ${data.questions.length} practice questions!`);
          } else {
            toast.error('No questions could be generated from this file');
          }
        } catch (error: any) {
          console.error('Error generating questions:', error);
          toast.error(error.message || 'Failed to generate questions');
        } finally {
          setIsGenerating(false);
        }
      };
      
      reader.readAsDataURL(selectedFile);
    } catch (error: any) {
      console.error('Error reading file:', error);
      toast.error('Failed to read file');
      setIsGenerating(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setGeneratedQuestions([]);
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="py-4 px-4 md:py-6 md:px-8 max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-foreground">
              <Upload className="h-6 w-6 text-primary" />
              Upload Materials
            </h1>
            <p className="text-sm text-muted-foreground">Upload JAMB study materials and generate practice questions</p>
          </div>

          {/* Upload Section */}
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg text-foreground">Generate Questions from Documents</CardTitle>
              </div>
              <CardDescription>
                Upload your study materials (PDF, Word, or text files) and let AI convert them into JAMB-style practice questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subject Selection */}
              <div className="space-y-2">
                <Label className="text-foreground">Select JAMB Subject</Label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {jambSubjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label className="text-foreground">Upload Document</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept={acceptedFileTypes}
                    onChange={handleFileChange}
                    className="hidden"
                    id="material-upload"
                  />
                  <label htmlFor="material-upload" className="cursor-pointer">
                    {selectedFile ? (
                      <div className="flex items-center justify-center gap-3">
                        {getFileIcon(selectedFile.name)}
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => { e.preventDefault(); clearSelection(); }}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <>
                        <FileUp className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF, Word (.doc, .docx), or Text files (max 10MB)
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Question Count */}
              <div className="space-y-2">
                <Label className="text-foreground">Number of Questions</Label>
                <Select value={questionCount} onValueChange={setQuestionCount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of questions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20 Questions</SelectItem>
                    <SelectItem value="30">30 Questions</SelectItem>
                    <SelectItem value="50">50 Questions</SelectItem>
                    <SelectItem value="75">75 Questions</SelectItem>
                    <SelectItem value="100">100 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerateQuestions} 
                disabled={!selectedFile || !selectedSubject || isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating JAMB-Style Questions...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Practice Questions
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Questions */}
          {generatedQuestions.length > 0 && (
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <BookOpen className="h-5 w-5" />
                  Generated Questions ({generatedQuestions.length})
                </CardTitle>
                <CardDescription>
                  Practice questions generated from your {selectedSubject} material
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatedQuestions.map((q, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-background">
                      <p className="font-medium mb-2 text-foreground">
                        {index + 1}. {q.question}
                      </p>
                      {q.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                          {Object.entries(q.options).map(([key, value]) => (
                            <div 
                              key={key} 
                              className={`p-2 rounded text-sm ${
                                key === q.correct_answer 
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700' 
                                  : 'bg-muted'
                              }`}
                            >
                              <span className="font-medium">{key}.</span> {String(value)}
                            </div>
                          ))}
                        </div>
                      )}
                      {q.explanation && (
                        <p className="text-sm text-muted-foreground border-t pt-2 mt-2">
                          <span className="font-medium">Explanation:</span> {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {generatedQuestions.length === 0 && !isGenerating && (
            <Card className="text-center py-12 bg-card">
              <CardContent>
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">No Questions Yet</h3>
                <p className="text-muted-foreground">
                  Upload a document above to generate JAMB-style practice questions
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadMaterials;
