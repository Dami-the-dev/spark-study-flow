import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/dashboard/ai-assistant" className="text-gray-700 hover:text-primary transition-colors">AI Assistant</Link>
          </div>
          <Button asChild>
            <Link to="/dashboard">Get Started</Link>
          </Button>
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
            <Link to="/dashboard" className="text-gray-700 hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            <Link to="/dashboard/ai-assistant" className="text-gray-700 hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>AI Assistant</Link>
            <Button className="w-full" asChild>
              <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
