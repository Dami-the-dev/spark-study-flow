import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm py-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary font-poppins">Spark<span className="text-secondary">Study</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="space-x-6">
            <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">About</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors">Dashboard</Link>
                <Link to="/dashboard/ai-assistant" className="text-gray-700 hover:text-primary transition-colors">AI Assistant</Link>
              </>
            ) : null}
          </div>
          <div className="space-x-3">
            {user ? (
              <Button variant="outline" onClick={handleLogout}>
                <LogOut size={16} className="mr-2" /> Logout
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/about" className="text-gray-700 hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>About</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <Link to="/dashboard/ai-assistant" className="text-gray-700 hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>AI Assistant</Link>
                <Button variant="outline" className="w-full" onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}>
                  <LogOut size={16} className="mr-2" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
