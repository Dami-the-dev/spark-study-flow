import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI study assistant, here to help you learn and grow. What educational topic can I assist you with today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages([...messages, newUserMessage]);
    setInputMessage('');
    
    // Simulate AI response after a short delay
    // In a real application, you would send `inputMessage` to an AI model
    // and set a system prompt like:
    // "You are an AI study assistant. Your purpose is strictly educational.
    //  Be empathetic, encouraging, and motivating. Help students understand
    //  concepts and stay positive about their learning journey."
    setTimeout(() => {
      let aiTextResponse = "I'm here to help you with your studies! ";
      // Simple logic to make the AI sound a bit more empathetic based on input
      if (inputMessage.toLowerCase().includes("struggling") || inputMessage.toLowerCase().includes("hard") || inputMessage.toLowerCase().includes("confused")) {
        aiTextResponse += "It's okay to find things challenging; that's part of learning. We can break it down together. ";
      } else if (inputMessage.toLowerCase().includes("thank you") || inputMessage.toLowerCase().includes("thanks")) {
        aiTextResponse = "You're very welcome! Keep up the great work. I'm always here if you need more help. ";
      } else {
        aiTextResponse += "Let's explore that. Remember, every question is a step towards understanding. ";
      }
      aiTextResponse += "How can I assist you further in your educational journey today?";

      const aiResponse: Message = {
        id: messages.length + 2, // Ensure unique ID
        text: aiTextResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white">
          <h1 className="text-2xl font-bold">AI Study Assistant</h1>
          <p className="text-gray-600">Ask anything (educational), summarize a topic, or plan your study week...</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <Card className={`max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-white'
                }`}>
                  <CardContent className="p-4 flex">
                    {message.sender === 'ai' && (
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg" alt="AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' 
                          ? 'text-white/70' 
                          : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-white border-t">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your educational query..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
