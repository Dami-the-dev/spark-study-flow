
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import ResourcesSection from '@/components/ResourcesSection';
import CTASection from '@/components/CTASection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 flex-grow">
        <HeroSection />
        <ResourcesSection />
        <CTASection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
