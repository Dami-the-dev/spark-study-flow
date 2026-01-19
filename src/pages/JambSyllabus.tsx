import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Download, BookOpen, FileText, ExternalLink, CheckCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

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
  {
    name: 'History',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/History-Syllabus.pdf',
    topics: [
      {
        topic: 'Pre-Colonial Nigeria',
        subtopics: [
          'Early Nigerian peoples and civilizations',
          'Major Nigerian kingdoms and empires (Benin, Oyo, Hausa states)',
          'The Sokoto Caliphate',
          'Social and political organization',
        ]
      },
      {
        topic: 'Colonial Nigeria',
        subtopics: [
          'European exploration and trade',
          'British colonization and administration',
          'Indirect rule system',
          'Nationalism and independence movements',
        ]
      },
      {
        topic: 'Post-Colonial Nigeria',
        subtopics: [
          'First Republic and its challenges',
          'Military interventions',
          'Civil War (1967-1970)',
          'Return to democratic rule',
        ]
      },
      {
        topic: 'African History',
        subtopics: [
          'Ancient African civilizations (Egypt, Kush, Axum)',
          'Trans-Saharan trade',
          'Scramble for Africa and colonization',
          'Decolonization and independence movements',
        ]
      },
      {
        topic: 'World History',
        subtopics: [
          'Industrial Revolution',
          'World War I and II',
          'Cold War',
          'International organizations (UN, AU)',
        ]
      },
    ]
  },
  {
    name: 'Computer Studies',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Computer-Studies-Syllabus.pdf',
    topics: [
      {
        topic: 'Introduction to Computers',
        subtopics: [
          'History and generations of computers',
          'Types of computers',
          'Components of a computer system',
          'Input and output devices',
        ]
      },
      {
        topic: 'Computer Hardware',
        subtopics: [
          'Central Processing Unit (CPU)',
          'Memory types (RAM, ROM, Cache)',
          'Storage devices',
          'Peripheral devices',
        ]
      },
      {
        topic: 'Computer Software',
        subtopics: [
          'System software (operating systems)',
          'Application software',
          'Programming languages',
          'Software development life cycle',
        ]
      },
      {
        topic: 'Networking and Internet',
        subtopics: [
          'Computer networks (LAN, WAN, MAN)',
          'Network topologies',
          'Internet services (WWW, email)',
          'Cybersecurity basics',
        ]
      },
      {
        topic: 'Data Processing',
        subtopics: [
          'Data representation (binary, hexadecimal)',
          'Database concepts',
          'Spreadsheet applications',
          'Word processing',
        ]
      },
    ]
  },
  {
    name: 'French',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/French-Syllabus.pdf',
    topics: [
      {
        topic: 'Grammar (Grammaire)',
        subtopics: [
          'Articles (definite, indefinite, partitive)',
          'Nouns and adjectives (gender, number)',
          'Pronouns (personal, possessive, relative)',
          'Verb conjugation (present, past, future)',
          'Tenses and moods (indicative, subjunctive, conditional)',
        ]
      },
      {
        topic: 'Vocabulary (Vocabulaire)',
        subtopics: [
          'Family and relationships',
          'Education and school',
          'Daily activities and routines',
          'Travel and transportation',
          'Health and the body',
        ]
      },
      {
        topic: 'Comprehension (Compréhension)',
        subtopics: [
          'Reading comprehension passages',
          'Listening comprehension',
          'Text analysis and interpretation',
          'Vocabulary in context',
        ]
      },
      {
        topic: 'Written Expression (Expression Écrite)',
        subtopics: [
          'Letter writing (formal and informal)',
          'Essay writing',
          'Dialogue and conversation',
          'Translation (French to English)',
        ]
      },
    ]
  },
  {
    name: 'Arabic',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Arabic-Syllabus.pdf',
    topics: [
      {
        topic: 'Arabic Grammar (النحو)',
        subtopics: [
          'Arabic alphabet and pronunciation',
          'Noun types and declensions',
          'Verb conjugation (past, present, imperative)',
          'Sentence structure (nominal and verbal)',
        ]
      },
      {
        topic: 'Arabic Morphology (الصرف)',
        subtopics: [
          'Root system and word patterns',
          'Derived forms of verbs',
          'Active and passive participles',
          'Broken plurals',
        ]
      },
      {
        topic: 'Comprehension and Translation',
        subtopics: [
          'Reading comprehension',
          'Translation (Arabic to English)',
          'Translation (English to Arabic)',
          'Text analysis',
        ]
      },
      {
        topic: 'Arabic Literature',
        subtopics: [
          'Classical Arabic poetry',
          'Modern Arabic prose',
          'Literary devices in Arabic',
          'Selected texts for study',
        ]
      },
    ]
  },
  {
    name: 'Islamic Religious Studies',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Islamic-Studies-Syllabus.pdf',
    topics: [
      {
        topic: 'Quran Studies',
        subtopics: [
          'Recitation and Tajweed',
          'Tafsir (interpretation) of selected Surahs',
          'Memorization of selected passages',
          'Quranic themes and messages',
        ]
      },
      {
        topic: 'Hadith Studies',
        subtopics: [
          'Selected Hadith collections',
          'Classification of Hadith',
          'Application of Hadith in daily life',
          'Major Hadith scholars',
        ]
      },
      {
        topic: 'Fiqh (Islamic Jurisprudence)',
        subtopics: [
          'Pillars of Islam (Arkan al-Islam)',
          'Pillars of Faith (Arkan al-Iman)',
          'Islamic worship (Ibadah)',
          'Family law and inheritance',
        ]
      },
      {
        topic: 'Islamic History',
        subtopics: [
          'Life of Prophet Muhammad (PBUH)',
          'The Rightly Guided Caliphs',
          'Spread of Islam in Africa',
          'Islam in Nigeria',
        ]
      },
    ]
  },
  {
    name: 'Christian Religious Studies',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/CRS-Syllabus.pdf',
    topics: [
      {
        topic: 'Old Testament Studies',
        subtopics: [
          'Creation and the fall of man',
          'The Patriarchs (Abraham, Isaac, Jacob)',
          'Moses and the Exodus',
          'Prophets and their messages',
          'The Monarchy in Israel',
        ]
      },
      {
        topic: 'New Testament Studies',
        subtopics: [
          'Life and teachings of Jesus Christ',
          'Miracles and parables',
          'The early church (Acts of Apostles)',
          'Pauline epistles',
          'The Book of Revelation',
        ]
      },
      {
        topic: 'Christian Ethics',
        subtopics: [
          'Love and forgiveness',
          'Social justice and equality',
          'Christian family values',
          'Work and stewardship',
        ]
      },
      {
        topic: 'Church History',
        subtopics: [
          'Early church development',
          'Christianity in Africa',
          'Christianity in Nigeria',
          'Ecumenism and Christian unity',
        ]
      },
    ]
  },
  {
    name: 'Agricultural Science',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Agricultural-Science-Syllabus.pdf',
    topics: [
      {
        topic: 'Crop Production',
        subtopics: [
          'Soil types and properties',
          'Tillage and land preparation',
          'Crop propagation methods',
          'Fertilizers and manures',
          'Pest and disease control',
        ]
      },
      {
        topic: 'Animal Production',
        subtopics: [
          'Livestock classification',
          'Animal nutrition and feeding',
          'Animal reproduction and breeding',
          'Animal health management',
          'Poultry and fish farming',
        ]
      },
      {
        topic: 'Forestry and Wildlife',
        subtopics: [
          'Forest types and resources',
          'Forest conservation',
          'Wildlife management',
          'Environmental impact',
        ]
      },
      {
        topic: 'Agricultural Economics',
        subtopics: [
          'Farm management',
          'Agricultural marketing',
          'Agricultural finance and credit',
          'Government agricultural policies',
        ]
      },
      {
        topic: 'Agricultural Technology',
        subtopics: [
          'Farm tools and machinery',
          'Irrigation systems',
          'Post-harvest technology',
          'Biotechnology in agriculture',
        ]
      },
    ]
  },
  {
    name: 'Civic Education',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Civic-Education-Syllabus.pdf',
    topics: [
      {
        topic: 'Citizenship',
        subtopics: [
          'Types of citizenship',
          'Rights and responsibilities of citizens',
          'Civic duties and obligations',
          'National identity and symbols',
        ]
      },
      {
        topic: 'Democracy and Human Rights',
        subtopics: [
          'Principles of democracy',
          'Electoral process',
          'Rule of law',
          'Fundamental human rights',
        ]
      },
      {
        topic: 'National Values',
        subtopics: [
          'Honesty and integrity',
          'Discipline and self-reliance',
          'Cooperation and tolerance',
          'National consciousness and patriotism',
        ]
      },
      {
        topic: 'Social Issues',
        subtopics: [
          'Drug abuse and trafficking',
          'Human trafficking',
          'Cultism and violence',
          'Corruption and its effects',
        ]
      },
    ]
  },
  {
    name: 'Commerce',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Commerce-Syllabus.pdf',
    topics: [
      {
        topic: 'Trade',
        subtopics: [
          'Types of trade (home, foreign)',
          'Aids to trade',
          'Balance of trade',
          'Trade associations',
        ]
      },
      {
        topic: 'Business Organizations',
        subtopics: [
          'Types of business ownership',
          'Sole proprietorship and partnerships',
          'Limited liability companies',
          'Cooperative societies',
        ]
      },
      {
        topic: 'Banking and Finance',
        subtopics: [
          'Types of banks',
          'Banking services',
          'Central Bank functions',
          'Stock exchange',
        ]
      },
      {
        topic: 'Insurance',
        subtopics: [
          'Types of insurance',
          'Principles of insurance',
          'Insurance documents',
          'Claims and settlements',
        ]
      },
      {
        topic: 'Transportation and Communication',
        subtopics: [
          'Modes of transportation',
          'Importance of transportation',
          'Communication methods',
          'Modern communication technology',
        ]
      },
    ]
  },
  {
    name: 'Further Mathematics',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Further-Mathematics-Syllabus.pdf',
    topics: [
      {
        topic: 'Pure Mathematics',
        subtopics: [
          'Complex numbers',
          'Matrices and determinants',
          'Mathematical induction',
          'Binomial theorem',
          'Partial fractions',
        ]
      },
      {
        topic: 'Calculus',
        subtopics: [
          'Limits and continuity',
          'Differentiation techniques',
          'Integration techniques',
          'Applications of calculus',
          'Differential equations',
        ]
      },
      {
        topic: 'Coordinate Geometry',
        subtopics: [
          'Conic sections (parabola, ellipse, hyperbola)',
          'Parametric equations',
          'Polar coordinates',
          'Three-dimensional geometry',
        ]
      },
      {
        topic: 'Trigonometry',
        subtopics: [
          'Compound and multiple angles',
          'Factor formulae',
          'Inverse trigonometric functions',
          'Trigonometric equations',
        ]
      },
      {
        topic: 'Vectors and Mechanics',
        subtopics: [
          'Vector algebra',
          'Scalar and vector products',
          'Kinematics and dynamics',
          'Statics and equilibrium',
        ]
      },
    ]
  },
  {
    name: 'Music',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Music-Syllabus.pdf',
    topics: [
      {
        topic: 'Rudiments of Music',
        subtopics: [
          'Staff notation and clefs',
          'Notes and rests',
          'Time signatures and rhythm',
          'Scales and key signatures',
        ]
      },
      {
        topic: 'Theory of Music',
        subtopics: [
          'Intervals and transposition',
          'Chords and cadences',
          'Modulation',
          'Harmony and counterpoint',
        ]
      },
      {
        topic: 'History of Music',
        subtopics: [
          'Music in the Medieval and Renaissance periods',
          'Baroque and Classical periods',
          'Romantic period',
          'Modern and contemporary music',
        ]
      },
      {
        topic: 'African Music',
        subtopics: [
          'Traditional African music and instruments',
          'Nigerian folk music',
          'Popular Nigerian music genres',
          'Art music in Nigeria',
        ]
      },
      {
        topic: 'Western Classical Music',
        subtopics: [
          'Musical forms (sonata, symphony, concerto)',
          'Opera and oratorio',
          'Famous composers and their works',
          'Orchestral instruments',
        ]
      },
    ]
  },
  {
    name: 'Fine Arts',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Fine-Arts-Syllabus.pdf',
    topics: [
      {
        topic: 'Drawing and Painting',
        subtopics: [
          'Elements of art (line, shape, form, color)',
          'Principles of design',
          'Still life and figure drawing',
          'Perspective drawing',
        ]
      },
      {
        topic: 'Sculpture',
        subtopics: [
          'Types of sculpture (relief, in-the-round)',
          'Sculpting materials and techniques',
          'Modeling and carving',
          'Famous sculptors and works',
        ]
      },
      {
        topic: 'Art History',
        subtopics: [
          'Ancient and medieval art',
          'Renaissance art',
          'Modern and contemporary art movements',
          'Nigerian and African art traditions',
        ]
      },
      {
        topic: 'Nigerian Art',
        subtopics: [
          'Nok, Ife, and Benin art',
          'Traditional crafts and textiles',
          'Modern Nigerian artists',
          'Cultural significance of Nigerian art',
        ]
      },
      {
        topic: 'Graphic Design',
        subtopics: [
          'Typography and lettering',
          'Poster and logo design',
          'Printmaking techniques',
          'Digital art basics',
        ]
      },
    ]
  },
  {
    name: 'Home Economics',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Home-Economics-Syllabus.pdf',
    topics: [
      {
        topic: 'Food and Nutrition',
        subtopics: [
          'Classes of food nutrients',
          'Balanced diet',
          'Food preservation methods',
          'Food hygiene and safety',
        ]
      },
      {
        topic: 'Clothing and Textiles',
        subtopics: [
          'Types of fibers and fabrics',
          'Clothing construction',
          'Garment care and maintenance',
          'Fashion and design',
        ]
      },
      {
        topic: 'Home Management',
        subtopics: [
          'Family resource management',
          'Budgeting and financial planning',
          'Consumer education',
          'Work simplification',
        ]
      },
      {
        topic: 'Child Development',
        subtopics: [
          'Stages of child development',
          'Child care and nutrition',
          'Immunization and health care',
          'Nursery and childcare facilities',
        ]
      },
      {
        topic: 'Housing and Interior Decoration',
        subtopics: [
          'Types of housing',
          'Space planning and furniture arrangement',
          'Color schemes and lighting',
          'Home safety and maintenance',
        ]
      },
    ]
  },
  {
    name: 'Physical Education',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Physical-Education-Syllabus.pdf',
    topics: [
      {
        topic: 'Anatomy and Physiology',
        subtopics: [
          'Skeletal system',
          'Muscular system',
          'Cardiovascular system',
          'Respiratory system',
        ]
      },
      {
        topic: 'Health and Fitness',
        subtopics: [
          'Components of physical fitness',
          'Exercise and training principles',
          'First aid and injury prevention',
          'Nutrition for athletes',
        ]
      },
      {
        topic: 'Sports and Games',
        subtopics: [
          'Track and field events',
          'Ball games (football, basketball, volleyball)',
          'Racket sports (tennis, table tennis, badminton)',
          'Swimming and aquatic sports',
        ]
      },
      {
        topic: 'Recreation and Leisure',
        subtopics: [
          'Importance of recreation',
          'Types of recreational activities',
          'Organization of recreational programs',
          'Career opportunities in sports',
        ]
      },
      {
        topic: 'Sports Administration',
        subtopics: [
          'Organization of sports in Nigeria',
          'Role of sports governing bodies',
          'Olympic and international sports',
          'Sports facilities and equipment',
        ]
      },
    ]
  },
  {
    name: 'Technical Drawing',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Technical-Drawing-Syllabus.pdf',
    topics: [
      {
        topic: 'Basic Drawing Techniques',
        subtopics: [
          'Drawing equipment and materials',
          'Lettering and dimensioning',
          'Types of lines and their uses',
          'Freehand sketching',
        ]
      },
      {
        topic: 'Geometric Construction',
        subtopics: [
          'Bisection of lines and angles',
          'Construction of polygons',
          'Tangent constructions',
          'Loci and conic sections',
        ]
      },
      {
        topic: 'Orthographic Projection',
        subtopics: [
          'First and third angle projection',
          'Sectional views',
          'Auxiliary views',
          'True shapes and developments',
        ]
      },
      {
        topic: 'Pictorial Drawing',
        subtopics: [
          'Isometric projection',
          'Oblique projection',
          'Perspective drawing',
          'Exploded views',
        ]
      },
      {
        topic: 'Building Drawing',
        subtopics: [
          'Floor plans and elevations',
          'Sectional drawings',
          'Site plans',
          'Working drawings',
        ]
      },
    ]
  },
  {
    name: 'Yoruba',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Yoruba-Syllabus.pdf',
    topics: [
      {
        topic: 'Yoruba Grammar (Gírámà)',
        subtopics: [
          'Yoruba alphabet and tonal marks',
          'Parts of speech (noun, verb, adjective)',
          'Sentence structure',
          'Proverbs and idioms (Òwe àti Àkànlò Èdè)',
        ]
      },
      {
        topic: 'Yoruba Literature (Lítíréṣọ̀)',
        subtopics: [
          'Traditional poetry (Ewì)',
          'Prose works (Àròkọ)',
          'Drama (Eré Oníṣe)',
          'Set texts for study',
        ]
      },
      {
        topic: 'Yoruba Culture (Àṣà àti Ìṣe)',
        subtopics: [
          'Traditional festivals',
          'Marriage and naming ceremonies',
          'Traditional occupations',
          'Yoruba beliefs and religion',
        ]
      },
      {
        topic: 'Oral Literature (Lítíréṣọ̀ Àtẹnudénú)',
        subtopics: [
          'Folktales (Àlọ́)',
          'Riddles (Àlọ́ Àpamọ̀)',
          'Praise poetry (Oríkì)',
          'Incantations (Ogede)',
        ]
      },
    ]
  },
  {
    name: 'Igbo',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Igbo-Syllabus.pdf',
    topics: [
      {
        topic: 'Igbo Grammar (Ụtọasụsụ)',
        subtopics: [
          'Igbo alphabet and tone marks',
          'Parts of speech (mkpụrụokwu)',
          'Sentence construction',
          'Proverbs and idioms (Ilu na Akpaalaokwu)',
        ]
      },
      {
        topic: 'Igbo Literature (Agụmagụ)',
        subtopics: [
          'Poetry (Abụ)',
          'Prose (Akụkọ)',
          'Drama (Ejije)',
          'Set texts for study',
        ]
      },
      {
        topic: 'Igbo Culture (Omenala)',
        subtopics: [
          'Traditional festivals (Emume)',
          'Marriage customs (Ọlụlụ)',
          'Title taking and ceremonies',
          'Traditional religion and beliefs',
        ]
      },
      {
        topic: 'Oral Literature (Agụmagụ Ọdịnala)',
        subtopics: [
          'Folktales (Akụkọ ala)',
          'Riddles (Agwụgwa)',
          'Praise songs (Egwu otito)',
          'Proverbs (Ilu)',
        ]
      },
    ]
  },
  {
    name: 'Hausa',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Hausa-Syllabus.pdf',
    topics: [
      {
        topic: 'Hausa Grammar (Nahawu)',
        subtopics: [
          'Hausa alphabet and writing system',
          'Parts of speech (Sassan Jimla)',
          'Sentence structure',
          'Proverbs and idioms (Karin Magana)',
        ]
      },
      {
        topic: 'Hausa Literature (Adabin Hausa)',
        subtopics: [
          'Poetry (Waƙa)',
          'Prose (Rubutaccen Adabi)',
          'Drama (Wasan Kwaikwayo)',
          'Set texts for study',
        ]
      },
      {
        topic: 'Hausa Culture (Al\'adun Hausa)',
        subtopics: [
          'Traditional festivals',
          'Marriage and naming ceremonies',
          'Traditional occupations',
          'Hausa institutions and titles',
        ]
      },
      {
        topic: 'Oral Literature (Adabin Baka)',
        subtopics: [
          'Folktales (Tatsuniya)',
          'Riddles (Kacici-kacici)',
          'Praise singing (Roko)',
          'Traditional poetry (Waƙoƙin Gargajiya)',
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

  const downloadSyllabusPDF = (subject: SubjectSyllabus) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      let yPosition = 20;
      const lineHeight = 7;
      const margin = 20;
      const maxWidth = pageWidth - margin * 2;

      // Title
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(`JAMB ${subject.name} Syllabus`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Subtitle
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Official Syllabus for UTME Examination', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 5;
      doc.text('Source: Joint Admissions and Matriculation Board (JAMB)', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Topics
      subject.topics.forEach((topic, topicIndex) => {
        // Check if we need a new page
        if (yPosition > 260) {
          doc.addPage();
          yPosition = 20;
        }

        // Topic header
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`${topicIndex + 1}. ${topic.topic}`, margin, yPosition);
        yPosition += lineHeight + 2;

        // Subtopics
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        topic.subtopics.forEach((subtopic, subIndex) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          const lines = doc.splitTextToSize(`• ${subtopic}`, maxWidth - 10);
          lines.forEach((line: string) => {
            doc.text(line, margin + 5, yPosition);
            yPosition += lineHeight;
          });
        });
        yPosition += 5;
      });

      // Footer
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.text('Generated by EduSpark - www.eduspark.com', pageWidth / 2, 285, { align: 'center' });

      // Save the PDF
      doc.save(`JAMB_${subject.name}_Syllabus.pdf`);
      toast.success(`${subject.name} syllabus downloaded successfully!`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

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
                      <Button variant="outline" onClick={() => downloadSyllabusPDF(selectedSubject)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
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
