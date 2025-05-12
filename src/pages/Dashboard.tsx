
import React, { useContext } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { AuthContext } from '@/App';

const Dashboard: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const auth = JSON.parse(localStorage.getItem('eduspark_auth') || '{}');
  const userName = auth.user?.name || 'Student';

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Welcome back, {userName}!</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-3">Today's Planner</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b">
                  <span>📚 Math Review</span>
                  <span className="text-primary font-medium">9:00 AM</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b">
                  <span>📝 English Essay</span>
                  <span className="text-primary font-medium">11:30 AM</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b">
                  <span>🧪 Science Quiz Prep</span>
                  <span className="text-primary font-medium">2:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🏃 Study Break</span>
                  <span className="text-primary font-medium">4:30 PM</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-3">Stats This Week</h2>
              <div className="h-40 flex items-center justify-center">
                <div className="w-full flex items-end justify-around h-32">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-16 w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1">Mon</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-24 w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1">Tue</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-12 w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1">Wed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-28 w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1">Thu</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-20 w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1">Fri</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-8 w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1">Sat</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-4 w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1">Sun</span>
                  </div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-500 mt-2">
                Study hours tracked: 18.5h
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-3">Quick Access</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-gray-50 hover:bg-gray-100 transition-colors p-3 rounded-md flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">💬</span>
                  <span className="text-sm">Ask AI</span>
                </button>
                <button className="bg-gray-50 hover:bg-gray-100 transition-colors p-3 rounded-md flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">📄</span>
                  <span className="text-sm">Summarize PDF</span>
                </button>
                <button className="bg-gray-50 hover:bg-gray-100 transition-colors p-3 rounded-md flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">🎮</span>
                  <span className="text-sm">Resume Quiz</span>
                </button>
                <button className="bg-gray-50 hover:bg-gray-100 transition-colors p-3 rounded-md flex flex-col items-center justify-center">
                  <span className="text-2xl mb-1">📚</span>
                  <span className="text-sm">Past Questions</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4">Upcoming Deadlines</h2>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2">Subject</th>
                  <th className="pb-2">Task</th>
                  <th className="pb-2">Due Date</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Mathematics</td>
                  <td className="py-3">Assignment #4</td>
                  <td className="py-3">Tomorrow</td>
                  <td className="py-3"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">In Progress</span></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Physics</td>
                  <td className="py-3">Lab Report</td>
                  <td className="py-3">May 15</td>
                  <td className="py-3"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Started</span></td>
                </tr>
                <tr>
                  <td className="py-3">Computer Science</td>
                  <td className="py-3">Final Project</td>
                  <td className="py-3">May 20</td>
                  <td className="py-3"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Not Started</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
