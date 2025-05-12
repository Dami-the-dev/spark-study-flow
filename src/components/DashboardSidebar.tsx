
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Book, Calendar, Award, Settings, HelpCircle } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          isActive 
            ? 'bg-primary text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      {label}
    </NavLink>
  );
};

const DashboardSidebar: React.FC = () => {
  return (
    <div className="w-64 border-r border-gray-200 h-screen bg-white">
      <div className="flex items-center py-6 px-6 border-b">
        <NavLink to="/" className="text-xl font-bold text-primary font-poppins">edu<span className="text-secondary">spark</span></NavLink>
      </div>
      <div className="py-6 px-3">
        <nav className="space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard size={18} />} 
            label="Dashboard" 
            to="/dashboard" 
          />
          <SidebarItem 
            icon={<MessageSquare size={18} />} 
            label="AI Assistant" 
            to="/dashboard/ai-assistant" 
          />
          <SidebarItem 
            icon={<Book size={18} />} 
            label="Past Questions" 
            to="/dashboard/past-questions" 
          />
          <SidebarItem 
            icon={<Calendar size={18} />} 
            label="Study Planner" 
            to="/dashboard/planner" 
          />
          <SidebarItem 
            icon={<Award size={18} />} 
            label="Quiz Arena" 
            to="/dashboard/quiz" 
          />
          <SidebarItem 
            icon={<HelpCircle size={18} />} 
            label="Support" 
            to="/dashboard/support" 
          />
          <SidebarItem 
            icon={<Settings size={18} />} 
            label="Settings" 
            to="/dashboard/settings" 
          />
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
