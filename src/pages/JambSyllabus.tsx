import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Download, BookOpen, FileText, ExternalLink, CheckCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SyllabusTopic {
  topic: string;
  subtopics: string[];
}

interface SubjectSyllabus {
  name: string;
  pdfUrl: string;
  topics: SyllabusTopic[];
}

const syllabusData: SubjectSyllabus[] = [
  {
    name: 'Mathematics',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Mathematics-Syllabus.pdf',
    topics: [
      {
        topic: 'Number and Numeration',
        subtopics: [
          'Number bases (operations in different bases)',
          'Fractions, decimals and approximation',
          'Indices, logarithms and surds',
          'Sets and Venn diagrams',
        ]
      },
      {
        topic: 'Algebra',
        subtopics: [
          'Polynomials and factorization',
          'Change of subject of formula',
          'Quadratic equations',
          'Linear and quadratic inequalities',
          'Arithmetic and geometric progressions',
          'Binary operations',
        ]
      },
      {
        topic: 'Geometry and Trigonometry',
        subtopics: [
          'Euclidean geometry (angles, triangles, polygons)',
          'Circle theorems',
          'Trigonometric ratios and identities',
          'Mensuration (areas and volumes)',
          'Coordinate geometry',
        ]
      },
      {
        topic: 'Calculus',
        subtopics: [
          'Differentiation of algebraic functions',
          'Integration and area under curves',
          'Applications of differentiation',
        ]
      },
      {
        topic: 'Statistics and Probability',
        subtopics: [
          'Measures of central tendency',
          'Measures of dispersion',
          'Probability concepts',
          'Permutation and combination',
        ]
      },
    ]
  },
  {
    name: 'English Language',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Use-of-English-Syllabus.pdf',
    topics: [
      {
        topic: 'Comprehension',
        subtopics: [
          'Understanding explicit and implicit information',
          'Making inferences and deductions',
          'Identifying main ideas and supporting details',
          'Understanding vocabulary in context',
        ]
      },
      {
        topic: 'Lexis and Structure',
        subtopics: [
          'Synonyms and antonyms',
          'Sentence patterns and structure',
          'Word classes and their functions',
          'Idioms and expressions',
          'Collocations',
        ]
      },
      {
        topic: 'Oral English',
        subtopics: [
          'Vowel sounds (monophthongs and diphthongs)',
          'Consonant sounds',
          'Stress patterns (word and sentence stress)',
          'Intonation patterns',
          'Sound contrasts',
        ]
      },
      {
        topic: 'Register and Style',
        subtopics: [
          'Formal and informal language',
          'Technical vocabulary',
          'Appropriateness of language use',
        ]
      },
    ]
  },
  {
    name: 'Physics',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Physics-Syllabus.pdf',
    topics: [
      {
        topic: 'Mechanics',
        subtopics: [
          'Measurements and units',
          'Scalars and vectors',
          'Motion (linear, projectile, circular)',
          'Newton\'s laws of motion',
          'Work, energy and power',
          'Simple harmonic motion',
        ]
      },
      {
        topic: 'Thermal Physics',
        subtopics: [
          'Temperature and thermometers',
          'Heat transfer (conduction, convection, radiation)',
          'Thermal expansion',
          'Gas laws and kinetic theory',
          'Latent heat and specific heat capacity',
        ]
      },
      {
        topic: 'Waves',
        subtopics: [
          'Wave types and properties',
          'Sound waves and acoustics',
          'Light waves and optics',
          'Electromagnetic spectrum',
        ]
      },
      {
        topic: 'Electricity and Magnetism',
        subtopics: [
          'Electrostatics',
          'Current electricity and circuits',
          'Electromagnetic induction',
          'Magnetic fields and forces',
        ]
      },
      {
        topic: 'Modern Physics',
        subtopics: [
          'Atomic structure',
          'Radioactivity',
          'Nuclear reactions',
          'Photoelectric effect',
        ]
      },
    ]
  },
  {
    name: 'Chemistry',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Chemistry-Syllabus.pdf',
    topics: [
      {
        topic: 'Separation Techniques and Purification',
        subtopics: [
          'Filtration, evaporation, distillation',
          'Chromatography',
          'Crystallization',
          'Sublimation',
        ]
      },
      {
        topic: 'Chemical Bonding',
        subtopics: [
          'Ionic bonding',
          'Covalent bonding',
          'Metallic bonding',
          'Van der Waals forces',
          'Hydrogen bonding',
        ]
      },
      {
        topic: 'Stoichiometry',
        subtopics: [
          'Mole concept',
          'Chemical equations and balancing',
          'Mass relationships in reactions',
          'Limiting reagents',
        ]
      },
      {
        topic: 'Acids, Bases and Salts',
        subtopics: [
          'Properties of acids and bases',
          'pH and indicators',
          'Neutralization reactions',
          'Salt preparation',
        ]
      },
      {
        topic: 'Organic Chemistry',
        subtopics: [
          'Hydrocarbons (alkanes, alkenes, alkynes)',
          'Functional groups',
          'Petroleum and petrochemicals',
          'Polymers',
        ]
      },
      {
        topic: 'Electrochemistry',
        subtopics: [
          'Electrolysis',
          'Electrochemical cells',
          'Faraday\'s laws',
        ]
      },
    ]
  },
  {
    name: 'Biology',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Biology-Syllabus.pdf',
    topics: [
      {
        topic: 'Organization of Life',
        subtopics: [
          'Cell structure and function',
          'Cell division (mitosis and meiosis)',
          'Levels of organization',
          'Classification of living organisms',
        ]
      },
      {
        topic: 'Plant Biology',
        subtopics: [
          'Plant nutrition (photosynthesis)',
          'Transport in plants',
          'Plant hormones',
          'Plant reproduction',
        ]
      },
      {
        topic: 'Animal Biology',
        subtopics: [
          'Nutrition in animals',
          'Circulatory system',
          'Respiratory system',
          'Excretory system',
          'Nervous system',
          'Reproductive system',
        ]
      },
      {
        topic: 'Genetics and Evolution',
        subtopics: [
          'Heredity and variation',
          'Mendelian genetics',
          'Sex determination',
          'Mutation',
          'Evolution theories',
        ]
      },
      {
        topic: 'Ecology',
        subtopics: [
          'Ecosystems and biomes',
          'Food chains and webs',
          'Population dynamics',
          'Conservation of natural resources',
          'Pollution and its effects',
        ]
      },
    ]
  },
  {
    name: 'Government',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Government-Syllabus.pdf',
    topics: [
      {
        topic: 'Basic Concepts',
        subtopics: [
          'Power, authority and legitimacy',
          'Sovereignty and political culture',
          'Citizenship and political participation',
        ]
      },
      {
        topic: 'Political Institutions',
        subtopics: [
          'Arms of government (executive, legislature, judiciary)',
          'Systems of government',
          'Political parties and pressure groups',
          'Electoral systems',
        ]
      },
      {
        topic: 'Nigerian Government',
        subtopics: [
          'Constitutional development in Nigeria',
          'Nigerian federalism',
          'Military rule in Nigeria',
          'Public administration in Nigeria',
        ]
      },
      {
        topic: 'International Relations',
        subtopics: [
          'Foreign policy',
          'International organizations (UN, AU, ECOWAS)',
          'Globalization',
        ]
      },
    ]
  },
  {
    name: 'Economics',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Economics-Syllabus.pdf',
    topics: [
      {
        topic: 'Basic Economic Concepts',
        subtopics: [
          'Scarcity, choice and scale of preference',
          'Opportunity cost',
          'Production possibility curve',
          'Economic systems',
        ]
      },
      {
        topic: 'Demand and Supply',
        subtopics: [
          'Laws of demand and supply',
          'Price determination',
          'Elasticity of demand and supply',
          'Price controls',
        ]
      },
      {
        topic: 'Production and Costs',
        subtopics: [
          'Factors of production',
          'Production functions',
          'Costs of production',
          'Economies and diseconomies of scale',
        ]
      },
      {
        topic: 'Money and Banking',
        subtopics: [
          'Functions of money',
          'Commercial and central banking',
          'Monetary policy',
          'Inflation',
        ]
      },
      {
        topic: 'International Trade',
        subtopics: [
          'Balance of payments',
          'Exchange rate',
          'Trade policies',
          'Economic integration',
        ]
      },
    ]
  },
  {
    name: 'Literature in English',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Literature-in-English-Syllabus.pdf',
    topics: [
      {
        topic: 'Literary Terms and Devices',
        subtopics: [
          'Figures of speech (metaphor, simile, personification)',
          'Literary devices (irony, symbolism, imagery)',
          'Narrative techniques',
          'Themes and motifs',
        ]
      },
      {
        topic: 'Drama',
        subtopics: [
          'Elements of drama',
          'Types of drama (tragedy, comedy)',
          'Characterization in drama',
          'Set texts for drama',
        ]
      },
      {
        topic: 'Poetry',
        subtopics: [
          'Types of poetry',
          'Poetic devices',
          'Analysis of poems',
          'Set poems for study',
        ]
      },
      {
        topic: 'Prose',
        subtopics: [
          'Types of prose (fiction, non-fiction)',
          'Narrative techniques',
          'Character development',
          'Set novels for study',
        ]
      },
    ]
  },
  {
    name: 'Geography',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Geography-Syllabus.pdf',
    topics: [
      {
        topic: 'Physical Geography',
        subtopics: [
          'Earth structure and rocks',
          'Landforms and their formation',
          'Climate and weather',
          'Vegetation zones',
        ]
      },
      {
        topic: 'Human Geography',
        subtopics: [
          'Population distribution and growth',
          'Settlement patterns',
          'Migration',
          'Urbanization',
        ]
      },
      {
        topic: 'Map Reading',
        subtopics: [
          'Types of maps and scales',
          'Contours and relief representation',
          'Map interpretation',
          'Bearing and distance calculation',
        ]
      },
      {
        topic: 'Regional Geography',
        subtopics: [
          'Geography of Nigeria',
          'Geography of Africa',
          'Natural resources and industries',
        ]
      },
    ]
  },
  {
    name: 'Accounting',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Principles-of-Accounts-Syllabus.pdf',
    topics: [
      {
        topic: 'Basic Accounting Concepts',
        subtopics: [
          'Accounting principles and conventions',
          'Double entry bookkeeping',
          'Books of original entry',
          'Ledger accounts',
        ]
      },
      {
        topic: 'Financial Statements',
        subtopics: [
          'Trial balance',
          'Trading, profit and loss account',
          'Balance sheet',
          'Bank reconciliation',
        ]
      },
      {
        topic: 'Partnership Accounts',
        subtopics: [
          'Partnership formation',
          'Profit sharing',
          'Admission and retirement of partners',
        ]
      },
      {
        topic: 'Company Accounts',
        subtopics: [
          'Share capital and debentures',
          'Company final accounts',
          'Interpretation of accounts',
        ]
      },
    ]
  },
];

const JambSyllabus: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectSyllabus | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubjects = syllabusData.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto pt-16 md:pt-0">
        <div className="py-4 px-4 md:py-6 md:px-8">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-foreground">
              <BookOpen className="h-6 w-6 text-primary" />
              JAMB Syllabus
            </h1>
            <p className="text-sm text-muted-foreground">
              View and download the official JAMB syllabus for all subjects
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Subject List */}
            <div className="lg:col-span-1">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Select Subject</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search subjects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-2">
                      {filteredSubjects.map((subject) => (
                        <button
                          key={subject.name}
                          onClick={() => setSelectedSubject(subject)}
                          className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between ${
                            selectedSubject?.name === subject.name
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted hover:bg-muted/80 text-foreground'
                          }`}
                        >
                          <span className="font-medium">{subject.name}</span>
                          {selectedSubject?.name === subject.name && (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Syllabus Content */}
            <div className="lg:col-span-2">
              {selectedSubject ? (
                <Card className="bg-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-foreground">{selectedSubject.name} Syllabus</CardTitle>
                        <CardDescription>
                          Topics and subtopics for JAMB {selectedSubject.name}
                        </CardDescription>
                      </div>
                      <Button variant="outline" asChild>
                        <a href={selectedSubject.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" className="w-full">
                      {selectedSubject.topics.map((topic, index) => (
                        <AccordionItem key={index} value={`topic-${index}`}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="mr-2">
                                {index + 1}
                              </Badge>
                              <span className="font-medium text-foreground">{topic.topic}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 pl-8">
                              {topic.subtopics.map((subtopic, subIndex) => (
                                <li key={subIndex} className="flex items-start gap-2 text-muted-foreground">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                  <span>{subtopic}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Note:</span> This syllabus is based on the official JAMB syllabus. 
                        For the most up-to-date version, please download the official PDF from JAMB.
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-2" asChild>
                        <a href="https://www.jamb.gov.ng" target="_blank" rel="noopener noreferrer">
                          Visit JAMB Official Website <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="text-center py-12 bg-card">
                  <CardContent>
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Select a Subject</h3>
                    <p className="text-muted-foreground">
                      Choose a subject from the list to view its JAMB syllabus
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JambSyllabus;
