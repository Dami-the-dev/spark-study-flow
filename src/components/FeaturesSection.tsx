
import React from 'react';
import { Book, BookOpen, FileText, Calendar, Award, MessageSquare } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="feature-card card-hover">
    <div className="mb-4 text-primary">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Book size={32} />,
      title: "Past Questions Bank",
      description: "Access a comprehensive library of past questions across various subjects and exams."
    },
    {
      icon: <MessageSquare size={32} />,
      title: "AI Study Assistant",
      description: "Get instant answers, explanations and study guidance from our intelligent AI tutor."
    },
    {
      icon: <FileText size={32} />,
      title: "PDF Summarizer Tool",
      description: "Convert long documents into concise summaries to save time and improve retention."
    },
    {
      icon: <Calendar size={32} />,
      title: "Study Planner & Reminder",
      description: "Create personalized study schedules with smart reminders to stay on track."
    },
    {
      icon: <Award size={32} />,
      title: "Daily Quiz Challenges",
      description: "Test your knowledge daily with interactive quizzes tailored to your learning goals."
    },
    {
      icon: <BookOpen size={32} />,
      title: "Feedback & Support Portal",
      description: "Get assistance whenever you need it with our dedicated support system."
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tools designed to enhance your learning experience and maximize academic success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
