import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary font-poppins">edu<span className="text-secondary">spark</span></span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Personalized study tools, past questions, AI-powered summaries & more.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/success-stories" className="text-muted-foreground hover:text-primary transition-colors">Success Stories</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} EduSpark. All rights reserved.
          </p>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground/60">Made with codes, coffee, and a little holy hustle.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
