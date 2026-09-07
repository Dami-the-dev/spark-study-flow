import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AIAssistant from "./pages/AIAssistant";
import PastQuestions from "./pages/PastQuestions";
import WaecPastQuestions from "./pages/WaecPastQuestions";
import CbtExam from "./pages/CbtExam";
import JambSyllabus from "./pages/JambSyllabus";
import UploadMaterials from "./pages/UploadMaterials";
import StudyPlanner from "./pages/StudyPlanner";
import SuccessStories from "./pages/SuccessStories";
import Support from "./pages/Support";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

const queryClient = new QueryClient();

// Apply theme on app initialization
const applyInitialTheme = () => {
  const userPrefs = JSON.parse(localStorage.getItem('eduspark_user_preferences') || '{}');
  if (userPrefs.isDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const App = () => {
  useEffect(() => {
    applyInitialTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/support" element={<Support />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/ai-assistant" element={<AIAssistant />} />
              <Route path="/dashboard/past-questions" element={<PastQuestions />} />
              <Route path="/dashboard/waec-questions" element={<WaecPastQuestions />} />
              <Route path="/dashboard/cbt-exam" element={<CbtExam />} />
              <Route path="/dashboard/jamb-syllabus" element={<JambSyllabus />} />
              <Route path="/dashboard/upload-materials" element={<UploadMaterials />} />
              <Route path="/dashboard/planner" element={<StudyPlanner />} />
              <Route path="/dashboard/support" element={<Support />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;