
import React, { useState, useContext, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { AuthContext } from '@/App';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Palette, Type, Moon, Sun, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const auth = JSON.parse(localStorage.getItem('eduspark_auth') || '{}');
  const userName = auth.user?.name || 'Student';
  const isMobile = useIsMobile();
  
  // User profile settings
  const [displayName, setDisplayName] = useState(userName);
  
  // Theme settings
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Color scheme settings
  const [primaryColor, setPrimaryColor] = useState('default'); // default, purple, green, blue
  
  // Font settings
  const [fontPreference, setFontPreference] = useState('default'); // default, serif, sans
  
  useEffect(() => {
    // Load user preferences from localStorage
    const userPrefs = JSON.parse(localStorage.getItem('eduspark_user_preferences') || '{}');
    if (userPrefs.isDarkMode !== undefined) setIsDarkMode(userPrefs.isDarkMode);
    if (userPrefs.primaryColor) setPrimaryColor(userPrefs.primaryColor);
    if (userPrefs.fontPreference) setFontPreference(userPrefs.fontPreference);
    if (userPrefs.displayName) setDisplayName(userPrefs.displayName);
    
    // Apply theme settings
    applyTheme(userPrefs.isDarkMode || false, userPrefs.primaryColor || 'default', userPrefs.fontPreference || 'default');
  }, []);
  
  const saveSettings = () => {
    // Save all settings to localStorage
    const userPreferences = {
      isDarkMode,
      primaryColor,
      fontPreference,
      displayName
    };
    localStorage.setItem('eduspark_user_preferences', JSON.stringify(userPreferences));
    
    // Apply theme changes
    applyTheme(isDarkMode, primaryColor, fontPreference);
    
    // Update user display name in auth
    const updatedAuth = { ...auth };
    if (auth.user) {
      updatedAuth.user.name = displayName;
      localStorage.setItem('eduspark_auth', JSON.stringify(updatedAuth));
    }
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    });
  };
  
  const applyTheme = (dark: boolean, color: string, font: string) => {
    const root = document.documentElement;
    
    // Apply dark/light mode
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Apply color scheme
    root.setAttribute('data-theme-color', color);
    
    // Apply font preference
    root.setAttribute('data-font', font);
  };
  
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar />
      
      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 pt-16 sm:pt-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Personalize Your Experience</h1>
        
        <div className="grid gap-4 sm:gap-8">
          {/* Profile Section */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <User size={isMobile ? 18 : 20} />
              <h2 className="text-lg sm:text-xl font-semibold">Profile Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input 
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="max-w-md"
                />
              </div>
            </div>
          </div>
          
          {/* Theme Settings */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              {isDarkMode ? <Moon size={isMobile ? 18 : 20} /> : <Sun size={isMobile ? 18 : 20} />}
              <h2 className="text-lg sm:text-xl font-semibold">Theme Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between max-w-md">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch 
                  id="dark-mode" 
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
              </div>
            </div>
          </div>
          
          {/* Color Settings */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Palette size={isMobile ? 18 : 20} />
              <h2 className="text-lg sm:text-xl font-semibold">Color Scheme</h2>
            </div>
            
            <div className="space-y-4">
              <Label>Primary Color</Label>
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                <ToggleGroup 
                  type="single" 
                  value={primaryColor} 
                  onValueChange={(value) => value && setPrimaryColor(value)}
                  className="flex flex-nowrap"
                >
                  <ToggleGroupItem value="default" className="whitespace-nowrap bg-primary text-white hover:bg-primary/90">
                    Default
                  </ToggleGroupItem>
                  <ToggleGroupItem value="purple" className="whitespace-nowrap bg-purple-500 text-white hover:bg-purple-600">
                    Purple
                  </ToggleGroupItem>
                  <ToggleGroupItem value="green" className="whitespace-nowrap bg-green-500 text-white hover:bg-green-600">
                    Green
                  </ToggleGroupItem>
                  <ToggleGroupItem value="blue" className="whitespace-nowrap bg-blue-500 text-white hover:bg-blue-600">
                    Blue
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>
          
          {/* Font Settings */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Type size={isMobile ? 18 : 20} />
              <h2 className="text-lg sm:text-xl font-semibold">Typography</h2>
            </div>
            
            <div className="space-y-4">
              <Label>Font Style</Label>
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
                <ToggleGroup 
                  type="single" 
                  value={fontPreference} 
                  onValueChange={(value) => value && setFontPreference(value)}
                  className="flex flex-nowrap"
                >
                  <ToggleGroupItem value="default" className="font-poppins">
                    Default
                  </ToggleGroupItem>
                  <ToggleGroupItem value="serif" className="font-serif">
                    Serif
                  </ToggleGroupItem>
                  <ToggleGroupItem value="sans" className="font-sans">
                    Sans
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <Button onClick={saveSettings} className="w-full sm:w-auto sm:max-w-xs">
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
