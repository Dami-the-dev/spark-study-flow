import React, { useState, useRef, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { streamChat } from '@/utils/streamChat';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const userMsg = inputMessage.trim();
    const newUserMessage: Message = {
      id: Date.now(),
      text: userMsg,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    let assistantContent = '';
    const tempAssistantId = Date.now() + 1;

    try {
      await streamChat({
        messages: [...messages, newUserMessage].map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        })),
        onDelta: (chunk) => {
          assistantContent += chunk;
          setMessages(prev => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg?.sender === 'ai' && lastMsg.id === tempAssistantId) {
              return prev.map(m => 
                m.id === tempAssistantId 
                  ? { ...m, text: assistantContent }
                  : m
              );
            }
            return [...prev, {
              id: tempAssistantId,
              text: assistantContent,
              sender: 'ai' as const,
              timestamp: new Date(),
            }];
          });
        },
        onDone: () => {
          setIsLoading(false);
        },
        onError: (error) => {
          toast.error(error);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white">
          <h1 className="text-2xl font-bold">AI Study Assistant</h1>
          <p className="text-gray-600">Ask anything educational, summarize a topic, or plan your study week...</p>
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
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card'
                }`}>
                  <CardContent className="p-4 flex gap-2">
                    {message.sender === 'ai' && (
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap break-words">{message.text}</p>
                      <p className={`text-xs mt-2 ${
                        message.sender === 'user' 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
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
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending
                </>
              ) : (
                'Send'
              )}
            </Button>
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default AIAssistant;
