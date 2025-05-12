
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AIAssistant from "./pages/AIAssistant";
import PastQuestions from "./pages/PastQuestions";
import StudyPlanner from "./pages/StudyPlanner";
import QuizArena from "./pages/QuizArena";
import Support from "./pages/Support";
import About from "./pages/About";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

// Create context for authentication
export const AuthContext = createContext<{
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, firstName: string, lastName: string) => void;
  logout: () => void;
}>({
  isLoggedIn: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
});

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = JSON.parse(localStorage.getItem('eduspark_auth') || '{"isLoggedIn": false}');
  
  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem('eduspark_auth');
    return savedAuth ? JSON.parse(savedAuth) : { isLoggedIn: false, user: null };
  });

  useEffect(() => {
    localStorage.setItem('eduspark_auth', JSON.stringify(auth));
  }, [auth]);

  const login = (email: string, password: string) => {
    // In a real app, you would validate against a backend
    // For now, just simulate a successful login
    setAuth({
      isLoggedIn: true,
      user: { email, name: email.split('@')[0] }
    });
  };

  const signup = (email: string, password: string, firstName: string, lastName: string) => {
    // Send email notification about new signup
    const notifySignup = async () => {
      try {
        // In a real app, this would be an API call to your backend
        console.log(`New user signup: ${firstName} ${lastName} (${email})`);
        
        // For demonstration purposes, we're showing how you would typically handle this
        // In a real environment, this would be handled by a server-side function
        const adminEmail = "favouroludairo@gmail.com";
        console.log(`Notification sent to admin: ${adminEmail}`);
      } catch (error) {
        console.error("Failed to send signup notification", error);
      }
    };

    notifySignup();

    // Create user
    setAuth({
      isLoggedIn: true,
      user: { email, name: `${firstName} ${lastName}` }
    });
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, user: null });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isLoggedIn: auth.isLoggedIn, login, signup, logout }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/ai-assistant" element={
                <ProtectedRoute>
                  <AIAssistant />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/past-questions" element={
                <ProtectedRoute>
                  <PastQuestions />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/planner" element={
                <ProtectedRoute>
                  <StudyPlanner />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/quiz" element={
                <ProtectedRoute>
                  <QuizArena />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/support" element={
                <ProtectedRoute>
                  <Support />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
