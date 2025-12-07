import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

const successStories = [
  {
    name: "Ben Carson",
    title: "Renowned Neurosurgeon",
    story: "Growing up in poverty in Detroit, Ben Carson struggled academically in elementary school. His mother, though barely able to read herself, limited TV time and required weekly book reports. This dedication to reading transformed him from a failing student to a top performer. He went on to become the Director of Pediatric Neurosurgery at Johns Hopkins Hospital and was the first surgeon to successfully separate conjoined twins attached at the head.",
    image: "/placeholder.svg",
    quote: "There is no such thing as an average human being. If you have a normal brain, you are superior.",
    field: "Medicine"
  },
  {
    name: "Oprah Winfrey",
    title: "Media Mogul & Philanthropist",
    story: "Born into poverty in rural Mississippi, Oprah found solace in books and reading. Her grandmother taught her to read at age three, and she began speaking at churches, honing her communication skills. Despite a troubled childhood, her love for learning and reading led her to become one of the most influential women in the world, hosting the highest-rated talk show in TV history and becoming a billionaire.",
    image: "/placeholder.svg",
    quote: "Education is the key to unlocking the world, a passport to freedom.",
    field: "Media"
  },
  {
    name: "Frederick Douglass",
    title: "Abolitionist & Statesman",
    story: "Born into slavery, Frederick Douglass secretly learned to read and write despite laws prohibiting slave literacy. He traded bread for reading lessons from white children and used his master's son's discarded books. This self-education empowered him to escape slavery and become one of the most influential abolitionists in American history, advising President Abraham Lincoln.",
    image: "/placeholder.svg",
    quote: "Once you learn to read, you will be forever free.",
    field: "Civil Rights"
  },
  {
    name: "Malala Yousafzai",
    title: "Nobel Peace Prize Laureate",
    story: "Growing up in Pakistan's Swat Valley, Malala advocated for girls' education despite Taliban threats. After surviving an assassination attempt at age 15, she continued her mission globally. Her dedication to education led her to become the youngest Nobel Prize laureate at 17, inspiring millions worldwide to value education.",
    image: "/placeholder.svg",
    quote: "One child, one teacher, one book, one pen can change the world.",
    field: "Activism"
  },
  {
    name: "Abraham Lincoln",
    title: "16th U.S. President",
    story: "With less than one year of formal education, Abraham Lincoln taught himself to read and became one of America's greatest presidents. He walked miles to borrow books, reading by firelight after long days of farm work. His self-education through reading made him a brilliant lawyer, orator, and leader who preserved the Union and ended slavery.",
    image: "/placeholder.svg",
    quote: "My best friend is a person who will give me a book I have not read.",
    field: "Leadership"
  },
  {
    name: "Chimamanda Ngozi Adichie",
    title: "Award-Winning Author",
    story: "Growing up in Nigeria, Chimamanda was reading at age 4 and began writing at 7. Her early exposure to British and American books shaped her initial writing, but discovering African writers like Chinua Achebe transformed her perspective. Today, she's one of the most celebrated African writers, with her work translated into over 30 languages.",
    image: "/placeholder.svg",
    quote: "Reading makes me feel like I'm not alone, like there's a wider world out there.",
    field: "Literature"
  }
];

const SuccessStories: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how reading and education transformed the lives of these remarkable individuals. 
            Let their stories inspire your own journey of learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successStories.map((story, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={story.image} alt={story.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{story.name}</CardTitle>
                    <CardDescription>{story.title}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {story.field}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-4">
                  {story.story}
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <Quote className="h-4 w-4 text-primary mb-2" />
                  <p className="text-sm italic">"{story.quote}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Your Story Could Be Next</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every great achiever started with a commitment to learning. 
            Start your journey today with EduSpark and write your own success story.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessStories;