import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, Heart, BookOpen, Lightbulb, Rocket, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">About Study Spark</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Born from a developer's passion to bridge the gap in student learning and make quality education accessible to everyone.
            </p>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <GraduationCap className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6 text-foreground">Who We Serve</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <BookOpen className="h-6 w-6 text-primary" />
                      JAMB Candidates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Preparing for JAMB? We've got you covered! Access comprehensive past questions across all subjects, 
                      practice with our quiz system, and track your progress. Our platform helps you adequately prepare 
                      for the exam with structured study plans, JAMB syllabus access, and AI assistance.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Award className="h-6 w-6 text-primary" />
                      WAEC Students
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Spark Study is designed to help secondary school students excel in WAEC. Access past questions, 
                      upload your study materials to generate practice questions, and master your subjects efficiently. 
                      Our AI-powered tools adapt to your learning style.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto bg-card">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2 text-foreground">
                  <Lightbulb className="h-8 w-8 text-primary" />
                  Our Story
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Study Spark was created by a developer who experienced firsthand the challenges students face in their educational journey. After struggling with fragmented study tools, inefficient learning methods, and a lack of personalized support, the idea was born to create a comprehensive platform that brings everything a student needs into one place.
                </p>
                <p>
                  We recognized a significant gap: students were juggling multiple apps for studying, planning, practicing, and getting help. They needed AI tutors that actually understood educational context, quiz systems that adapted to their level, and study planners that actually worked. Most importantly, they needed a platform that could grow with them through their entire academic journey.
                </p>
                <p>
                  Study Spark was built to solve these problems. We combined cutting-edge AI technology with tried-and-true educational methodologies to create a platform that doesn't just help students study—it helps them learn how to learn better.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">What Drives Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card">
                <CardHeader>
                  <Target className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-foreground">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To bridge the educational gap by providing students with comprehensive, AI-powered study tools that make learning effective and accessible.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardHeader>
                  <Rocket className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-foreground">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A world where every student has access to personalized learning support that adapts to their unique needs.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardHeader>
                  <Award className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-foreground">Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Innovation in education, commitment to excellence, and student-first design.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card">
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-foreground">Our Promise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Continuous improvement and unwavering dedication to helping students succeed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;