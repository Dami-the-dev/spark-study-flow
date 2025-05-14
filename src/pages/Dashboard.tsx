
import React, { useContext } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { AuthContext } from '@/App';

const Dashboard: React.FC = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const auth = JSON.parse(localStorage.getItem('eduspark_auth') || '{}');
  const userName = auth.user?.name || 'Student';

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <DashboardSidebar />
      
      <div className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Welcome back, {userName}!</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Today's Planner Card */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-800">Today's Planner</h2>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-gray-700">📚 Math Review</span>
                  <span className="text-primary font-medium">9:00 AM</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-gray-700">📝 English Essay</span>
                  <span className="text-primary font-medium">11:30 AM</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-gray-700">🧪 Science Quiz Prep</span>
                  <span className="text-primary font-medium">2:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">🏃 Study Break</span>
                  <span className="text-primary font-medium">4:30 PM</span>
                </div>
              </div>
            </div>
            
            {/* Stats Card */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-800">Stats This Week</h2>
              <div className="h-32 md:h-40 flex items-center justify-center">
                <div className="w-full flex items-end justify-around h-full">
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-16 w-6 md:w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1 text-gray-600">Mon</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-24 w-6 md:w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1 text-gray-600">Tue</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-12 w-6 md:w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1 text-gray-600">Wed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-28 w-6 md:w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1 text-gray-600">Thu</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-20 w-6 md:w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1 text-gray-600">Fri</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-8 w-6 md:w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1 text-gray-600">Sat</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-primary h-4 w-6 md:w-8 rounded-t-md"></div>
                    <span className="text-xs mt-1 text-gray-600">Sun</span>
                  </div>
                </div>
              </div>
              <div className="text-center text-xs md:text-sm text-gray-500 mt-2">
                Study hours tracked: 18.5h
              </div>
            </div>
            
            {/* Quick Access Card */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-gray-800">Quick Access</h2>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <button className="bg-gray-50 hover:bg-gray-100 transition-colors p-2 md:p-3 rounded-md flex flex-col items-center justify-center">
                  <span className="text-xl md:text-2xl mb-1">💬</span>
                  <span className="text-xs md:text-sm text-gray-700">Ask AI</span>
                </button>
                <button className="bg-gray-50 hover:bg-gray-100 transition-colors p-2 md:p-3 rounded-md flex flex-col items-center justify-center">
                  <span className="text-xl md:text-2xl mb-1">📄</span>
                  <span className="text-xs md:text-sm text-gray-700">Summarize PDF</span>
                </button>
                <button className="bg-gray-50 hover:bg-gray-100 transition-colors p-2 md:p-3 rounded-md flex flex-col items-center justify-center">
                  <span className="text-xl md:text-2xl mb-1">🎮</span>
                  <span className="text-xs md:text-sm text-gray-700">Resume Quiz</span>
                </button>
                <button className="bg-gray-50 hover:bg-gray-100 transition-colors p-2 md:p-3 rounded-md flex flex-col items-center justify-center">
                  <span className="text-xl md:text-2xl mb-1">📚</span>
                  <span className="text-xs md:text-sm text-gray-700">Past Questions</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Upcoming Deadlines Table */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-gray-800">Upcoming Deadlines</h2>
            <table className="w-full min-w-[500px]">
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
                  <td className="py-3 text-gray-700">Mathematics</td>
                  <td className="py-3 text-gray-700">Assignment #4</td>
                  <td className="py-3 text-gray-700">Tomorrow</td>
                  <td className="py-3"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">In Progress</span></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 text-gray-700">Physics</td>
                  <td className="py-3 text-gray-700">Lab Report</td>
                  <td className="py-3 text-gray-700">May 15</td>
                  <td className="py-3"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Started</span></td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-700">Computer Science</td>
                  <td className="py-3 text-gray-700">Final Project</td>
                  <td className="py-3 text-gray-700">May 20</td>
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
