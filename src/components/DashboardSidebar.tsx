
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Book,
  Calendar,
  Award,
  Settings,
  HelpCircle,
  Menu
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to }) => {
  return (
    <li className="mb-1">
      <NavLink
        to={to}
        className={({ isActive }) => 
          `flex items-center gap-2 rounded-lg p-3 ${
            isActive 
              ? 'bg-primary text-white font-medium' 
              : 'text-gray-700 hover:bg-gray-100'
          }`
        }
      >
        <span className="shrink-0">{icon}</span>
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

const DashboardSidebar: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {/* Mobile header */}
      {isMobile && (
        <div className="fixed top-0 left-0 z-50 w-full bg-white border-b p-4 flex items-center justify-between">
          <NavLink to="/" className="text-xl font-bold text-primary font-poppins">
            edu<span className="text-secondary">spark</span>
          </NavLink>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-black md:hidden"
            onClick={() => {
              // Toggle mobile menu visibility
              const sidebar = document.getElementById('mobile-sidebar');
              if (sidebar) {
                sidebar.classList.toggle('hidden');
              }
            }}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      )}

      {/* Sidebar for mobile (initially hidden) */}
      {isMobile && (
        <div 
          id="mobile-sidebar" 
          className="fixed inset-0 z-40 hidden"
        >
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              const sidebar = document.getElementById('mobile-sidebar');
              if (sidebar) {
                sidebar.classList.add('hidden');
              }
            }}
          ></div>
          <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
            <div className="p-4 border-b">
              <NavLink to="/" className="text-xl font-bold text-primary font-poppins">
                edu<span className="text-secondary">spark</span>
              </NavLink>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                <NavItem 
                  icon={<LayoutDashboard size={18} />} 
                  label="Dashboard" 
                  to="/dashboard" 
                />
                <NavItem 
                  icon={<MessageSquare size={18} />} 
                  label="AI Assistant" 
                  to="/dashboard/ai-assistant" 
                />
                <NavItem 
                  icon={<Book size={18} />} 
                  label="Past Questions" 
                  to="/dashboard/past-questions" 
                />
                <NavItem 
                  icon={<Calendar size={18} />} 
                  label="Study Planner" 
                  to="/dashboard/planner" 
                />
                <NavItem 
                  icon={<Award size={18} />} 
                  label="Quiz Arena" 
                  to="/dashboard/quiz" 
                />
                <NavItem 
                  icon={<HelpCircle size={18} />} 
                  label="Support" 
                  to="/dashboard/support" 
                />
                <NavItem 
                  icon={<Settings size={18} />} 
                  label="Settings" 
                  to="/dashboard/settings" 
                />
              </ul>
            </nav>
          </div>
        </div>
      )}
      
      {/* Desktop sidebar (always visible) */}
      {!isMobile && (
        <div className="min-h-screen w-64 border-r border-gray-200 bg-white">
          <div className="p-4 border-b">
            <NavLink to="/" className="text-xl font-bold text-primary font-poppins">
              edu<span className="text-secondary">spark</span>
            </NavLink>
          </div>
          <nav className="p-4">
            <ul className="space-y-1">
              <NavItem 
                icon={<LayoutDashboard size={18} />} 
                label="Dashboard" 
                to="/dashboard" 
              />
              <NavItem 
                icon={<MessageSquare size={18} />} 
                label="AI Assistant" 
                to="/dashboard/ai-assistant" 
              />
              <NavItem 
                icon={<Book size={18} />} 
                label="Past Questions" 
                to="/dashboard/past-questions" 
              />
              <NavItem 
                icon={<Calendar size={18} />} 
                label="Study Planner" 
                to="/dashboard/planner" 
              />
              <NavItem 
                icon={<Award size={18} />} 
                label="Quiz Arena" 
                to="/dashboard/quiz" 
              />
              <NavItem 
                icon={<HelpCircle size={18} />} 
                label="Support" 
                to="/dashboard/support" 
              />
              <NavItem 
                icon={<Settings size={18} />} 
                label="Settings" 
                to="/dashboard/settings" 
              />
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
