
import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, FileQuestion, ThumbsUp, Send, MessageCircle } from 'lucide-react';

const Support: React.FC = () => {
  const [message, setMessage] = useState('');

  // Mock FAQ data
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
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically send the message to a support system
    alert('Your message has been sent! Our team will get back to you soon.');
    setMessage('');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-8">
          <h1 className="text-2xl font-bold mb-6">Support & Help Center</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                        <p className="text-gray-700">{faq.answer}</p>
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
                  <MessageSquare className="mr-2" />
                  Contact Support
                </CardTitle>
                <CardDescription>Something not working? We're here for you, smarty!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                      <Input id="subject" placeholder="What's this about?" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message</label>
                      <Textarea 
                        id="message" 
                        placeholder="Describe your issue in detail..." 
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="urgent" className="mr-2" />
                      <label htmlFor="urgent" className="text-sm">Mark as urgent</label>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                  <Send size={14} className="mr-2" /> Send Message
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Live Chat Support</CardTitle>
              <CardDescription>Chat with our support team in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-white">
                <div className="space-y-4">
                  <div className="flex">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>ES</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Hello! Welcome to EduSpark support. How can we help you today?</p>
                      <span className="text-xs text-gray-500 mt-1">10:30 AM</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-row-reverse">
                    <div className="bg-primary text-white rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Hi there! I'm just exploring the support section for now. Thanks!</p>
                      <span className="text-xs text-white/70 mt-1">10:32 AM</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button>
                    <MessageCircle size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;
