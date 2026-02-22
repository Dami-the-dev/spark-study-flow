
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <div className="py-20 bg-primary">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Study Experience?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of students already using Spark Study to achieve better grades with less stress.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/dashboard">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
