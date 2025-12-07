import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Palette, Type, Moon, Sun, User, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

const avatarOptions = [
  { id: 'default', url: '/placeholder.svg', name: 'Default' },
  { id: 'student1', emoji: '👨‍🎓', name: 'Scholar' },
  { id: 'student2', emoji: '👩‍🎓', name: 'Graduate' },
  { id: 'reader1', emoji: '📚', name: 'Bookworm' },
  { id: 'reader2', emoji: '🎓', name: 'Academic' },
  { id: 'scientist', emoji: '🔬', name: 'Scientist' },
  { id: 'artist', emoji: '🎨', name: 'Creative' },
  { id: 'coder', emoji: '💻', name: 'Coder' },
];

const Settings: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  const [displayName, setDisplayName] = useState(user?.user_metadata?.full_name || user?.email?.split('@')[0] || '');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('default');
  const [fontPreference, setFontPreference] = useState('default');
  const [selectedAvatar, setSelectedAvatar] = useState('default');
  const [avatarLevel, setAvatarLevel] = useState(1);
  const [readingHours, setReadingHours] = useState(0);
  
  useEffect(() => {
    const userPrefs = JSON.parse(localStorage.getItem('eduspark_user_preferences') || '{}');
    if (userPrefs.isDarkMode !== undefined) setIsDarkMode(userPrefs.isDarkMode);
    if (userPrefs.primaryColor) setPrimaryColor(userPrefs.primaryColor);
    if (userPrefs.fontPreference) setFontPreference(userPrefs.fontPreference);
    if (userPrefs.displayName) setDisplayName(userPrefs.displayName);
    if (userPrefs.selectedAvatar) setSelectedAvatar(userPrefs.selectedAvatar);
    
    applyTheme(userPrefs.isDarkMode || false, userPrefs.primaryColor || 'default', userPrefs.fontPreference || 'default');
    
    if (user) {
      loadProfileData();
    }
  }, [user]);

  const loadProfileData = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('reading_hours, avatar_level, custom_avatar')
        .eq('id', user?.id)
        .single();
      
      if (data) {
        setReadingHours(data.reading_hours || 0);
        setAvatarLevel(data.avatar_level || 1);
        if (data.custom_avatar) setSelectedAvatar(data.custom_avatar);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };
  
  const saveSettings = async () => {
    const userPreferences = {
      isDarkMode,
      primaryColor,
      fontPreference,
      displayName,
      selectedAvatar
    };
    localStorage.setItem('eduspark_user_preferences', JSON.stringify(userPreferences));
    
    applyTheme(isDarkMode, primaryColor, fontPreference);
    
    if (user) {
      try {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            custom_avatar: selectedAvatar,
            full_name: displayName,
            updated_at: new Date().toISOString()
          });
        
        if (error) throw error;
      } catch (error) {
        console.error('Error saving profile:', error);
      }
    }
    
    toast.success("Settings saved successfully!");
  };
  
  const applyTheme = (dark: boolean, color: string, font: string) => {
    const root = document.documentElement;
    
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    root.removeAttribute('data-theme-color');
    if (color !== 'default') {
      root.setAttribute('data-theme-color', color);
    }
    
    root.removeAttribute('data-font');
    if (font !== 'default') {
      root.setAttribute('data-font', font);
    }
  };

  const getAvatarDisplay = (avatarId: string) => {
    const avatar = avatarOptions.find(a => a.id === avatarId);
    if (avatar?.emoji) {
      const sizeMultiplier = 1 + (avatarLevel - 1) * 0.1;
      return (
        <span style={{ fontSize: `${2 * sizeMultiplier}rem` }}>
          {avatar.emoji}
        </span>
      );
    }
    return null;
  };
  
  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 pt-16 sm:pt-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">Personalize Your Experience</h1>
        
        <div className="grid gap-4 sm:gap-8">
          {/* Profile Section with Avatar */}
          <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-4">
              <User size={isMobile ? 18 : 20} />
              <h2 className="text-lg sm:text-xl font-semibold">Profile Settings</h2>
            </div>
            
            <div className="space-y-6">
              {/* Avatar Selection */}
              <div>
                <Label className="mb-3 block">Choose Your Avatar</Label>
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted">
                    {getAvatarDisplay(selectedAvatar) || (
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{displayName?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Level {avatarLevel}</p>
                    <p className="text-xs text-muted-foreground">{readingHours} hours read</p>
                    <p className="text-xs text-primary mt-1">Keep reading to level up!</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {avatarOptions.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedAvatar === avatar.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {avatar.emoji ? (
                        <span className="text-2xl">{avatar.emoji}</span>
                      ) : (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={avatar.url} />
                          <AvatarFallback>D</AvatarFallback>
                        </Avatar>
                      )}
                    </button>
                  ))}
                </div>
              </div>

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
          <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border">
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
                  onCheckedChange={(checked) => {
                    setIsDarkMode(checked);
                    applyTheme(checked, primaryColor, fontPreference);
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Color Settings */}
          <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border">
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
                  onValueChange={(value) => {
                    if (value) {
                      setPrimaryColor(value);
                      applyTheme(isDarkMode, value, fontPreference);
                    }
                  }}
                  className="flex flex-nowrap"
                >
                  <ToggleGroupItem 
                    value="default" 
                    className="whitespace-nowrap data-[state=on]:bg-[#2C3EFA] data-[state=on]:text-white"
                  >
                    🔵 Royal Blue
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="purple" 
                    className="whitespace-nowrap data-[state=on]:bg-purple-500 data-[state=on]:text-white"
                  >
                    🟣 Purple
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="green" 
                    className="whitespace-nowrap data-[state=on]:bg-green-500 data-[state=on]:text-white"
                  >
                    🟢 Green
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="blue" 
                    className="whitespace-nowrap data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                  >
                    🔷 Sky Blue
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>
          
          {/* Font Settings */}
          <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border">
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
                  onValueChange={(value) => {
                    if (value) {
                      setFontPreference(value);
                      applyTheme(isDarkMode, primaryColor, value);
                    }
                  }}
                  className="flex flex-nowrap"
                >
                  <ToggleGroupItem value="default" className="font-poppins">
                    Modern (Default)
                  </ToggleGroupItem>
                  <ToggleGroupItem value="serif" style={{ fontFamily: 'Merriweather, Georgia, serif' }}>
                    Classic Serif
                  </ToggleGroupItem>
                  <ToggleGroupItem value="sans" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
                    Clean Sans
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