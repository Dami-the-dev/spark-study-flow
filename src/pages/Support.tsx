
import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileQuestion, ThumbsUp, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Support: React.FC = () => {
  // FAQ data
  const faqs = [
    {
      question: "Do I need an account to use Spark Study?",
      answer: "No. Everything is free and open — just open the dashboard and start studying. Your study plans, mock history and uploaded questions are saved on your device."
    },
    {
      question: "How does the CBT Exam Hall work?",
      answer: "Pick three subjects (English is compulsory), choose a time limit, and sit a full 180-question UTME mock with a timer, calculator, question grid and flag-for-review. When time runs out it submits automatically and shows your score per subject and an estimated UTME score out of 400."
    },
    {
      question: "How do I practise JAMB or WAEC past questions?",
      answer: "Open JAMB Past Questions or WAEC Questions, select your subjects and how many questions you want (10 to All). Questions are shuffled and the app prefers ones you haven't seen recently."
    },
    {
      question: "How do I turn my notes into practice questions?",
      answer: "Go to Upload Materials, choose JAMB or WAEC and a subject, upload a PDF, Word (.docx) or text file, and pick how many questions you want. The questions are added to your JAMB or WAEC practice bank. Scanned/image PDFs can't be read — use text-based files."
    },
    {
      question: "Where can I find the JAMB syllabus?",
      answer: "Open JAMB Syllabus from the menu. Pick a subject to see every examinable topic, download it as a PDF, or jump straight into practice questions or a CBT mock for that subject."
    },
    {
      question: "How do I use the Study Planner?",
      answer: "Open Study Planner, pick a date and time, add your subject and task, and tick it off when done. Plans are stored on your device."
    },
    {
      question: "What can the AI Study Buddy help with?",
      answer: "It explains topics, solves and explains past questions, and gives study tips for JAMB and WAEC subjects. It only answers educational questions."
    },
    {
      question: "Who owns the videos linked on the site?",
      answer: "We don't. Video links open on YouTube and belong to their creators. We don't claim ownership of any linked video."
    },
    {
      question: "Can I change the font size or switch to dark mode?",
      answer: "Yes. Go to Settings to turn on dark mode, adjust the font size and choose a font style."
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-8">
          <h1 className="text-2xl font-bold mb-6 text-foreground">Support & Help Center</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileQuestion className="mr-2" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Find quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                        <div className="mt-2 text-sm text-gray-500 flex items-center">
                          <span>Was this helpful?</span>
                          <Button variant="ghost" size="sm" className="ml-2">
                            <ThumbsUp size={14} />
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2" />
                  Contact Us
                </CardTitle>
                <CardDescription>Get in touch with our team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Email Support</h4>
                      <p className="text-muted-foreground text-sm mb-2">For general inquiries and support</p>
                      <a 
                        href="mailto:SparkStudyus@gmail.com" 
                        className="text-primary hover:underline font-medium"
                      >
                        SparkStudyus@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Phone Support</h4>
                      <p className="text-muted-foreground text-sm mb-2">Available Monday - Friday, 9am - 5pm WAT</p>
                      <p className="text-foreground font-medium">Coming soon</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">Location</h4>
                      <p className="text-muted-foreground text-sm">Lagos, Nigeria</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-primary mb-2">Need Quick Help?</h4>
                    <p className="text-sm text-muted-foreground">
                      Check out our FAQ section for instant answers to common questions. For complex issues, 
                      send us an email and we'll respond within 24-48 hours.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
