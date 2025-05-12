
import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, FileText, Calendar } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-8">
          <h1 className="text-2xl font-bold mb-6">Welcome back, Favour!</h1>
          
          <h2 className="text-lg font-semibold mb-4">Today's Planner</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Mathematics</CardTitle>
                <CardDescription>10:00 AM - 12:00 PM</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Revise calculus concepts and complete practice problems.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Physics</CardTitle>
                <CardDescription>2:00 PM - 4:00 PM</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Read chapter 7 and answer end-of-chapter questions.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">History</CardTitle>
                <CardDescription>6:00 PM - 7:30 PM</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Complete essay outline for assignment due Friday.</p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span>Ask AI Assistant</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
              <FileText className="h-6 w-6 text-primary" />
              <span>Summarize PDF</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span>Create Study Plan</span>
            </Button>
          </div>
          
          <h2 className="text-lg font-semibold mb-4">Study Statistics</h2>
          <Card>
            <CardHeader>
              <CardTitle>Weekly Study Hours</CardTitle>
              <CardDescription>Track your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-gray-500">
                Chart placeholder: Weekly hours studied by subject
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
