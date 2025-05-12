
import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Calendar as CalendarIcon, Bell } from 'lucide-react';

const StudyPlanner: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock study tasks
  const subjects = [
    { name: 'Mathematics', progress: 75 },
    { name: 'Physics', progress: 40 },
    { name: 'Chemistry', progress: 90 },
    { name: 'Biology', progress: 60 },
  ];
  
  // Mock scheduled tasks
  const scheduledTasks = [
    { id: 1, title: 'Calculus Revision', subject: 'Mathematics', time: '10:00 AM - 12:00 PM', date: new Date() },
    { id: 2, title: 'Physics Problem Set', subject: 'Physics', time: '2:00 PM - 4:00 PM', date: new Date() },
    { id: 3, title: 'Chemistry Lab Report', subject: 'Chemistry', time: '5:00 PM - 6:30 PM', date: new Date() },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Study Planner</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Study Task</DialogTitle>
                  <DialogDescription>
                    Create a new study task for your planner.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="task-title">Task Title</label>
                    <Input id="task-title" placeholder="Enter task title" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="subject">Subject</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <label>Date</label>
                    <div className="border rounded-md p-2">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="p-3 pointer-events-auto"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="start-time">Start Time</label>
                      <Input id="start-time" type="time" />
                    </div>
                    <div>
                      <label htmlFor="end-time">End Time</label>
                      <Input id="end-time" type="time" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="reminder" />
                    <label htmlFor="reminder">Set Reminder</label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="calendar">
            <TabsList className="mb-4">
              <TabsTrigger value="calendar">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Calendar View
              </TabsTrigger>
              <TabsTrigger value="progress">
                <Bell className="mr-2 h-4 w-4" />
                Subject Progress
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {scheduledTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-500">{task.subject} · {task.time}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button size="sm" variant="secondary">
                            <Bell size={14} className="mr-1" />
                            Remind
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar 
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-3 pointer-events-auto"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {subjects.map((subject, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{subject.name}</span>
                          <span className="text-sm text-gray-500">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Reminders Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Email Reminders</div>
                        <div className="text-sm text-gray-500">Receive study plan reminders via email</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" checked id="email-reminders" className="ml-auto" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-gray-500">Get text messages for upcoming study sessions</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="sms-reminders" className="ml-auto" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;
