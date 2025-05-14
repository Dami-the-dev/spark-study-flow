
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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={label}>
        <NavLink
          to={to}
          className={({ isActive }) => 
            `flex w-full items-center gap-2 rounded-lg p-2 ${
              isActive 
                ? 'bg-primary text-white font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <span className="shrink-0">{icon}</span>
          <span>{label}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const DashboardSidebar: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      {/* Mobile header with menu trigger */}
      {isMobile && (
        <div className="fixed top-0 left-0 z-50 w-full bg-white border-b p-4 flex items-center justify-between">
          <NavLink to="/" className="text-xl font-bold text-primary font-poppins">
            edu<span className="text-secondary">spark</span>
          </NavLink>
          <SidebarTrigger>
            <Button variant="ghost" size="icon" className="text-black">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SidebarTrigger>
        </div>
      )}

      <div className="flex h-screen w-full">
        <Sidebar className="border-r border-gray-200 bg-white text-gray-800 z-40">
          <SidebarHeader className="p-4 border-b">
            {!isMobile && (
              <NavLink to="/" className="text-xl font-bold text-primary font-poppins">
                edu<span className="text-secondary">spark</span>
              </NavLink>
            )}
          </SidebarHeader>
          
          <SidebarContent className="py-2">
            <SidebarMenu>
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
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="mt-auto border-t p-4">
            {!isMobile && (
              <SidebarTrigger>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Menu className="mr-2 h-4 w-4" />
                  Collapse Sidebar
                </Button>
              </SidebarTrigger>
            )}
          </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
};

export default DashboardSidebar;
