
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
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password."
    },
    {
      question: "Can I download past questions for offline study?",
      answer: "Yes! On the Past Questions page, you'll see a download button for each question pack. Click it to save the questions as a PDF for offline access."
    },
    {
      question: "How is my study progress tracked?",
      answer: "Your study progress is tracked automatically when you complete quizzes, practice past questions, or mark study tasks as done in your planner."
    },
    {
      question: "Can I get notifications for planned study sessions?",
      answer: "Absolutely! In the Study Planner, you can enable email or SMS notifications for upcoming study sessions by adjusting your reminder settings."
    },
    {
      question: "How does the AI assistant help with my studies?",
      answer: "Our AI assistant can explain complex topics, summarize information, create study plans, generate practice questions, and provide instant feedback on your answers."
    },
    {
      question: "What subjects are available for past questions?",
      answer: "We have past questions for all major JAMB and WAEC subjects including Mathematics, English, Physics, Chemistry, Biology, Government, Economics, Literature, Geography, Accounting, and more."
    },
    {
      question: "How do I use the JAMB Syllabus feature?",
      answer: "Navigate to the JAMB Syllabus page from your dashboard. Select any subject to view its topics and subtopics. You can also download the official PDF syllabus for offline study."
    },
    {
      question: "Can I upload my own study materials?",
      answer: "Yes! Use the Upload Materials feature to upload PDF or Word documents. Our system will generate practice questions from your materials to help you study more effectively."
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
                        href="mailto:favouroludairo@gmail.com" 
                        className="text-primary hover:underline font-medium"
                      >
                        favouroludairo@gmail.com
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
