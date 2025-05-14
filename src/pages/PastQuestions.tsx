
import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, PlayCircle } from 'lucide-react';

const PastQuestions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const [difficulty, setDifficulty] = useState('');

  // Mock question packs data
  const questionPacks = [
    {
      id: 1,
      title: 'Mathematics Calculus',
      year: '2023',
      difficulty: 'Medium',
      questions: 45,
      completed: false,
    },
    {
      id: 2,
      title: 'Physics Mechanics',
      year: '2022',
      difficulty: 'Hard',
      questions: 30,
      completed: true,
    },
    {
      id: 3,
      title: 'Chemistry Organic',
      year: '2023',
      difficulty: 'Easy',
      questions: 35,
      completed: false,
    },
    {
      id: 4,
      title: 'Biology Cell Structure',
      year: '2021',
      difficulty: 'Medium',
      questions: 40,
      completed: false,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-8">
          <h1 className="text-2xl font-bold mb-6">Past Question Bank</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <Input 
                placeholder="Search questions..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questionPacks.map((pack) => (
              <Card key={pack.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold">{pack.title}</CardTitle>
                    <Badge variant={pack.difficulty === 'Hard' ? 'destructive' : (pack.difficulty === 'Medium' ? 'default' : 'outline')}>
                      {pack.difficulty}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">Year: {pack.year}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{pack.questions} questions</p>
                  {pack.completed && (
                    <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">Completed</Badge>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Download size={14} className="mr-1" /> Download
                  </Button>
                  <Button size="sm">
                    <PlayCircle size={14} className="mr-1" /> Practice
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <div className="text-sm font-semibold mb-2">Your Achievement Badges</div>
            <div className="flex justify-center gap-2">
              <Badge className="bg-yellow-500 hover:bg-yellow-600">Quick Solver</Badge>
              <Badge className="bg-blue-500 hover:bg-blue-600">5-Day Streak</Badge>
              <Badge className="bg-purple-500 hover:bg-purple-600">Math Master</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastQuestions;
