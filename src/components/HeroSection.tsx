
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 animate-fade-in text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight">
              Study Smart. <br />
              <span className="hero-gradient-text">Stay Ahead.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
              Personalized study tools, past questions, AI-powered summaries & more.
              Master your studies with intelligent assistance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button size={isMobile ? "default" : "lg"} className="sm:w-auto" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0">
            <div className="relative z-10 animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Students collaborating on laptops" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
              <div className={`absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 bg-accent rounded-full p-3 md:p-4 shadow-lg hidden sm:block`}>
                <svg width={isMobile ? "30" : "40"} height={isMobile ? "30" : "40"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V12" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" stroke="#2E2E2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-secondary opacity-20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
