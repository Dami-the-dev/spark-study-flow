
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary font-poppins">edu<span className="text-secondary">spark</span></span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-xs">
              Personalized study tools, past questions, AI-powered summaries & more.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="/support" className="text-gray-600 hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-600 mb-4">Get the latest updates</p>
            <div className="flex space-x-2">
              <Input placeholder="Your email" type="email" className="max-w-[200px]" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} EduSpark. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">Made with codes, coffee, and a little holy hustle.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
