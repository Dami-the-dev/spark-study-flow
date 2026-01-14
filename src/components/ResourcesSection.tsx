
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const ResourcesSection: React.FC = () => {
  const resources = [
    {
      title: "Study Guides",
      description: "Comprehensive guides covering various subjects and topics to enhance your learning experience.",
      icon: "📚",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Video Tutorials",
      description: "Visual learning resources to help explain complex topics in simple, understandable formats.",
      icon: "🎬",
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Practice Tests",
      description: "Test your knowledge and prepare for exams with our practice tests and quizzes.",
      icon: "📝",
      color: "bg-green-100 text-green-700"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Educational Resources</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enhance your learning journey with our carefully curated resources designed to help you excel in your studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-full ${resource.color} flex items-center justify-center text-2xl mb-4`}>
                  {resource.icon}
                </div>
                <CardTitle>{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {resource.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/signup">Access Resources</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/signup">Sign Up to Access All Resources</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSection;
