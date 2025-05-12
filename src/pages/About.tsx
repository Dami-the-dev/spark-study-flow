
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-primary">About Us</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg mb-6">
                Welcome to Eduspark – your partner in making learning accessible, simple, and engaging. 
                We are a group of passionate individuals committed to transforming the way students 
                experience education. Our mission? To simplify the educational system and provide 
                every student with the tools they need to succeed, regardless of their background or circumstances.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Our Mission</h2>
              <p className="text-lg mb-6">
                In today's world, education should be accessible to all. We believe every student—whether 
                in the classroom or online—deserves the resources to reach their full potential. That's why 
                we've come together to create a platform that empowers students through AI-powered tools, 
                personalized study plans, quizzes, and resources that make learning smarter and more effective.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Our Story</h2>
              <p className="text-lg mb-6">
                We started this journey out of a shared frustration with traditional learning methods that 
                often feel outdated and disconnected from today's student needs. We are a team of educators, 
                developers, and innovators who believe that learning should be engaging, interactive, and most 
                importantly, personalized. From brainstorming ideas in classrooms to coding late into the night, 
                we've worked tirelessly to create a platform that makes studying feel less like a chore and more 
                like an exciting opportunity for growth.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Our Vision</h2>
              <p className="text-lg mb-6">
                Our vision is simple: Simplify education for the average student. We aim to bridge the gap 
                between students and quality resources, offering a space where learning becomes intuitive, 
                tailored, and enjoyable. By harnessing the power of AI, we want to build an educational ecosystem 
                where every student has access to tools that support their unique learning journey.
              </p>
              
              <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Our Values</h2>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li className="text-lg"><strong className="text-primary">Accessibility:</strong> We believe in removing barriers to learning and ensuring that quality education is within everyone's reach.</li>
                <li className="text-lg"><strong className="text-primary">Innovation:</strong> Constantly evolving, we integrate the latest technologies and educational methods to stay ahead of the curve.</li>
                <li className="text-lg"><strong className="text-primary">Collaboration:</strong> Education is a shared experience, and we work closely with students, educators, and developers to create solutions that work.</li>
                <li className="text-lg"><strong className="text-primary">Empathy:</strong> We understand the challenges students face, and we aim to design with their best interests at heart, ensuring that our platform is user-friendly and supportive.</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">Meet the Team</h2>
              <p className="text-lg mb-10">
                Our team is made up of a diverse group of people, united by a single purpose: to simplify the 
                learning experience. We bring together expertise in education, technology, and design, each 
                contributing unique skills to make this platform the best it can be. While we might have different 
                backgrounds, we share one goal: empowering students everywhere to reach their fullest potential.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
