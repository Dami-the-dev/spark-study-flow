
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  imageUrl: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, role, imageUrl }) => (
  <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100">
    <div className="flex items-center mb-4">
      <Avatar className="h-12 w-12 mr-4">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
    <p className="text-gray-700 italic">&ldquo;{quote}&rdquo;</p>
  </div>
);

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "EduSpark helped me score 320 in JAMB! The past questions and AI assistant made all the difference in my preparation.",
      name: "Favour Okonkwo",
      role: "SS3 Student",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "The WAEC past questions bank and study planner features have completely changed how I prepare for exams. I'm more confident now!",
      name: "Chidi Nwankwo",
      role: "JAMB Candidate",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "As a teacher, I recommend EduSpark to all my students. It helps them prepare effectively for JAMB and WAEC with smart tools.",
      name: "Mrs. Adeyemi",
      role: "Secondary School Teacher",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of students achieving academic excellence with EduSpark.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              imageUrl={testimonial.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
