import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Book,
  Calendar,
  Award,
  Settings,
  HelpCircle,
  Menu,
  X,
  GraduationCap,
  Timer
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, onClick }) => {
  return (
    <li className="mb-1">
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => 
          `flex items-center gap-2 rounded-lg p-3 ${
            isActive 
              ? 'bg-primary text-primary-foreground font-medium' 
              : 'text-foreground hover:bg-muted'
          }`
        }
      >
        <span className="shrink-0">{icon}</span>
        <span className="text-sm">{label}</span>
      </NavLink>
    </li>
  );
};

const DashboardSidebar: React.FC = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  const navItems = (
    <ul className="space-y-1">
      <NavItem 
        icon={<LayoutDashboard size={18} />} 
        label="Dashboard" 
        to="/dashboard"
        onClick={closeSidebar}
      />
      <NavItem 
        icon={<MessageSquare size={18} />} 
        label="AI Assistant" 
        to="/dashboard/ai-assistant"
        onClick={closeSidebar}
      />
      <NavItem 
        icon={<Book size={18} />} 
        label="JAMB Questions" 
        to="/dashboard/past-questions"
        onClick={closeSidebar}
      />
      <NavItem 
        icon={<Award size={18} />} 
        label="WAEC Questions" 
        to="/dashboard/waec-questions"
        onClick={closeSidebar}
      />
      <NavItem 
        icon={<Timer size={18} />} 
        label="CBT Exam Hall" 
        to="/dashboard/cbt-exam"
        onClick={closeSidebar}
      />
      <NavItem 
        icon={<GraduationCap size={18} />} 
        label="JAMB Syllabus" 
        to="/dashboard/jamb-syllabus"
        onClick={closeSidebar}
      />
      <NavItem 
        icon={<Book size={18} />} 
        label="Upload Materials" 
        to="/dashboard/upload-materials"
        onClick={closeSidebar}
      />
      <NavItem 
        icon={<Calendar size={18} />} 
        label="Study Planner" 
        to="/dashboard/planner"
        onClick={closeSidebar}
      />
      <NavItem 
        icon={<HelpCircle size={18} />} 
        label="Support" 
        to="/dashboard/support"
        onClick={closeSidebar}
      />
      <NavItem 
        icon={<Settings size={18} />} 
        label="Settings" 
        to="/dashboard/settings"
        onClick={closeSidebar}
      />
    </ul>
  );
  
  return (
    <>
      {/* Mobile header */}
      {isMobile && (
        <div className="fixed top-0 left-0 z-50 w-full bg-background border-b p-3 flex items-center justify-between">
          <NavLink to="/" className="text-lg font-bold text-primary font-poppins">
            Spark<span className="text-secondary">Study</span>
          </NavLink>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      )}

      {/* Mobile sidebar overlay */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={closeSidebar}
          />
          <div className="absolute left-0 top-0 h-full w-64 bg-background shadow-lg animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b">
              <NavLink to="/" className="text-lg font-bold text-primary font-poppins" onClick={closeSidebar}>
                Spark<span className="text-secondary">Study</span>
              </NavLink>
            </div>
            <nav className="p-4">
              {navItems}
            </nav>
          </div>
        </div>
      )}
      
      {/* Desktop sidebar */}
      {!isMobile && (
        <div className="min-h-screen w-56 lg:w-64 border-r border-border bg-background shrink-0">
          <div className="p-4 border-b">
            <NavLink to="/" className="text-lg lg:text-xl font-bold text-primary font-poppins">
              Spark<span className="text-secondary">Study</span>
            </NavLink>
          </div>
          <nav className="p-3 lg:p-4">
            {navItems}
          </nav>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;