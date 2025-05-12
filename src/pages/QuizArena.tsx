import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Timer, Brain, Zap } from 'lucide-react';

const QuizArena: React.FC = () => {
  // Mock quiz categories
  const quizCategories = [
    { id: 1, title: 'Fun Facts', description: 'Test your general knowledge with these fun quizzes', icon: Brain },
    { id: 2, title: 'Exam Prep', description: 'Serious questions to prepare you for upcoming exams', icon: Trophy },
    { id: 3, title: 'Speed Run', description: 'Race against time to answer as many as you can', icon: Zap },
  ];

  // Mock leaderboard data
  const leaderboard = [
    { id: 1, name: 'AlexTheGreat', points: 2450, avatar: '/placeholder.svg', badges: 15 },
    { id: 2, name: 'MathMaster', points: 2300, avatar: '/placeholder.svg', badges: 12 },
    { id: 3, name: 'QuizWizard', points: 2200, avatar: '/placeholder.svg', badges: 10 },
    { id: 4, name: 'BrainiacSam', points: 2100, avatar: '/placeholder.svg', badges: 9 },
    { id: 5, name: 'Favour', points: 1950, avatar: '/placeholder.svg', badges: 8 },
  ];

  // Mock daily quiz
  const dailyQuiz = {
    title: "Today's Challenge",
    topic: "Chemistry Basics",
    questions: 10,
    timeLimit: "15 minutes",
    xpReward: 200,
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-8">
          <h1 className="text-2xl font-bold mb-6">Quiz Arena</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2 bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">{dailyQuiz.title}</CardTitle>
                <CardDescription className="text-white/90">{dailyQuiz.topic}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-white/20">{dailyQuiz.questions} Questions</Badge>
                    <div className="flex items-center space-x-1">
                      <Timer size={14} />
                      <span className="text-sm">{dailyQuiz.timeLimit}</span>
                    </div>
                  </div>
                  <div className="text-xl font-bold">
                    +{dailyQuiz.xpReward} XP
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-white text-purple-600 hover:bg-white/90">Start Challenge</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 text-yellow-500" />
                  Leaderboard
                </CardTitle>
                <CardDescription>Top performers this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player, index) => (
                    <div key={player.id} className={`flex items-center justify-between p-2 rounded-lg ${index === 4 ? 'bg-blue-50 border border-blue-100' : ''}`}>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold w-5">{index + 1}</span>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={player.avatar} alt={player.name} />
                          <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{player.name}</span>
                      </div>
                      <div className="text-sm font-bold">{player.points} XP</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Categories</TabsTrigger>
              <TabsTrigger value="fun">Fun Facts</TabsTrigger>
              <TabsTrigger value="exam">Exam Prep</TabsTrigger>
              <TabsTrigger value="speed">Speed Run</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quizCategories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{category.title}</CardTitle>
                      <category.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">Choose from a variety of topics and test your knowledge in this category.</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Browse Quizzes</Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            {/* Other tab contents would be similar but filtered by category */}
            <TabsContent value="fun">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-2">Fun Facts Quizzes</h3>
                  <p className="text-gray-500">Test your general knowledge with these fun and engaging quizzes.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Quiz items would go here */}
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                      <span className="font-medium">Science Trivia</span>
                      <span className="text-xs text-gray-500">15 questions • 10 min</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                      <span className="font-medium">History Facts</span>
                      <span className="text-xs text-gray-500">12 questions • 8 min</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Your Quiz Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total XP</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">1,950</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Quizzes Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">27</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Correct Answers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">215</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Longest Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">5 days</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizArena;
