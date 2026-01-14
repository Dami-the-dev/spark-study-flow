import React, { useState, useEffect } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Moon, Sun, User, Type, ZoomIn } from 'lucide-react';
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

const fontOptions = [
  { id: 'inter', name: 'Inter', family: "'Inter', sans-serif" },
  { id: 'poppins', name: 'Poppins', family: "'Poppins', sans-serif" },
  { id: 'montserrat', name: 'Montserrat', family: "'Montserrat', sans-serif" },
  { id: 'times', name: 'Times New Roman', family: "'Times New Roman', Times, serif" },
  { id: 'georgia', name: 'Georgia', family: "'Georgia', serif" },
  { id: 'arial', name: 'Arial', family: "'Arial', sans-serif" },
  { id: 'verdana', name: 'Verdana', family: "'Verdana', sans-serif" },
  { id: 'roboto', name: 'Roboto', family: "'Roboto', sans-serif" },
];

const Settings: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  const [displayName, setDisplayName] = useState(user?.user_metadata?.full_name || user?.email?.split('@')[0] || '');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('default');
  const [avatarLevel, setAvatarLevel] = useState(1);
  const [readingHours, setReadingHours] = useState(0);
  const [selectedFont, setSelectedFont] = useState('inter');
  const [fontSize, setFontSize] = useState(16);
  
  useEffect(() => {
    const userPrefs = JSON.parse(localStorage.getItem('eduspark_user_preferences') || '{}');
    if (userPrefs.isDarkMode !== undefined) setIsDarkMode(userPrefs.isDarkMode);
    if (userPrefs.displayName) setDisplayName(userPrefs.displayName);
    if (userPrefs.selectedAvatar) setSelectedAvatar(userPrefs.selectedAvatar);
    if (userPrefs.selectedFont) setSelectedFont(userPrefs.selectedFont);
    if (userPrefs.fontSize) setFontSize(userPrefs.fontSize);
    
    applyTheme(userPrefs.isDarkMode || false);
    applyFont(userPrefs.selectedFont || 'inter');
    applyFontSize(userPrefs.fontSize || 16);
    
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
      displayName,
      selectedAvatar,
      selectedFont,
      fontSize
    };
    localStorage.setItem('eduspark_user_preferences', JSON.stringify(userPreferences));
    
    applyTheme(isDarkMode);
    applyFont(selectedFont);
    applyFontSize(fontSize);
    
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
  
  const applyTheme = (dark: boolean) => {
    const root = document.documentElement;
    
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const applyFont = (fontId: string) => {
    const font = fontOptions.find(f => f.id === fontId);
    if (font) {
      document.documentElement.style.setProperty('--app-font-family', font.family);
      document.body.style.fontFamily = font.family;
    }
  };

  const applyFontSize = (size: number) => {
    document.documentElement.style.fontSize = `${size}px`;
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
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-foreground">Personalize Your Experience</h1>
        
        <div className="grid gap-4 sm:gap-8">
          {/* Profile Section with Avatar */}
          <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-4">
              <User size={isMobile ? 18 : 20} className="text-foreground" />
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Profile Settings</h2>
            </div>
            
            <div className="space-y-6">
              {/* Avatar Selection */}
              <div>
                <Label className="mb-3 block text-foreground">Choose Your Avatar</Label>
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
                <Label htmlFor="displayName" className="text-foreground">Display Name</Label>
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
              {isDarkMode ? <Moon size={isMobile ? 18 : 20} className="text-foreground" /> : <Sun size={isMobile ? 18 : 20} className="text-foreground" />}
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Theme Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between max-w-md">
                <Label htmlFor="dark-mode" className="text-foreground">Dark Mode</Label>
                <Switch 
                  id="dark-mode" 
                  checked={isDarkMode}
                  onCheckedChange={(checked) => {
                    setIsDarkMode(checked);
                    applyTheme(checked);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Font Settings */}
          <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Type size={isMobile ? 18 : 20} className="text-foreground" />
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Font Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid gap-2 max-w-md">
                <Label htmlFor="font-family" className="text-foreground">Font Style</Label>
                <Select value={selectedFont} onValueChange={(value) => {
                  setSelectedFont(value);
                  applyFont(value);
                }}>
                  <SelectTrigger id="font-family">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.id} value={font.id} style={{ fontFamily: font.family }}>
                        {font.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Preview: The quick brown fox jumps over the lazy dog.</p>
              </div>
            </div>
          </div>

          {/* Font Size Settings */}
          <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-4">
              <ZoomIn size={isMobile ? 18 : 20} className="text-foreground" />
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Accessibility</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid gap-4 max-w-md">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size" className="text-foreground">Font Size</Label>
                  <span className="text-sm font-medium text-primary">{fontSize}px</span>
                </div>
                <Slider 
                  id="font-size"
                  min={12}
                  max={24}
                  step={1}
                  value={[fontSize]}
                  onValueChange={(value) => {
                    setFontSize(value[0]);
                    applyFontSize(value[0]);
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Small (12px)</span>
                  <span>Default (16px)</span>
                  <span>Large (24px)</span>
                </div>
                <p className="text-xs text-muted-foreground">Adjust the font size for better readability. Great for students with visual impairments.</p>
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
