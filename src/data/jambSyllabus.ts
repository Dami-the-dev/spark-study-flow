// 2025/2026 JAMB UTME syllabus data, shared by the syllabus, past questions and CBT pages.
export interface SyllabusTopic {
  topic: string;
  subtopics: string[];
}

export interface SubjectSyllabus {
  name: string;
  pdfUrl: string;
  topics: SyllabusTopic[];
}

export const syllabusData: SubjectSyllabus[] = [
  {
    name: 'Mathematics',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Mathematics-Syllabus.pdf',
    topics: [
      {
        topic: 'Number and Numeration',
        subtopics: [
          'Number bases (operations in different number bases from 2 to 10)',
          'Fractions, decimals and approximation',
          'Indices, logarithms and surds',
          'Sets (types, Venn diagrams, operations)',
          'Ratio and proportion',
          'Percentages and simple interest',
        ]
      },
      {
        topic: 'Algebra',
        subtopics: [
          'Polynomials (addition, subtraction, multiplication, factorization)',
          'Change of subject of formula/relation',
          'Quadratic equations (factorization, formula, completing the square)',
          'Linear and quadratic inequalities',
          'Arithmetic and geometric progressions (nth term, sum)',
          'Binary operations',
          'Matrices and determinants (2×2)',
          'Variation (direct, inverse, joint, partial)',
          'Simultaneous linear equations',
          'Remainder and factor theorem',
        ]
      },
      {
        topic: 'Geometry and Trigonometry',
        subtopics: [
          'Euclidean geometry (angles, triangles, polygons, circles)',
          'Circle theorems (tangent, chord, segment)',
          'Trigonometric ratios (sine, cosine, tangent) and identities',
          'Sine and cosine rules',
          'Angles of elevation and depression',
          'Bearings and distances',
          'Mensuration (areas and volumes of regular shapes and solids)',
          'Coordinate geometry (distance, midpoint, gradient, equation of lines)',
          'Loci in two dimensions',
        ]
      },
      {
        topic: 'Calculus',
        subtopics: [
          'Differentiation of algebraic functions from first principles',
          'Differentiation of polynomials (sum, product, quotient rules)',
          'Integration as the reverse of differentiation',
          'Integration of polynomial functions',
          'Application of differentiation (maxima, minima, rate of change)',
          'Area under curves using integration',
          'Velocity and acceleration problems',
        ]
      },
      {
        topic: 'Statistics and Probability',
        subtopics: [
          'Measures of central tendency (mean, median, mode for grouped/ungrouped data)',
          'Measures of dispersion (range, mean deviation, variance, standard deviation)',
          'Frequency distribution tables and histograms',
          'Cumulative frequency curves (ogives)',
          'Probability (simple, compound, conditional events)',
          'Permutation and combination',
          'Addition and multiplication rules of probability',
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
          'Summarizing and paraphrasing passages',
          'Distinguishing between facts and opinions',
        ]
      },
      {
        topic: 'Lexis and Structure',
        subtopics: [
          'Synonyms, antonyms, and homonyms',
          'Sentence patterns and structure (SVO, SVC, SVOA)',
          'Word classes and their functions (nouns, verbs, adjectives, adverbs)',
          'Idioms, expressions, and phrasal verbs',
          'Collocations and word associations',
          'Affixation (prefixes and suffixes)',
          'Clause types (noun, adjectival, adverbial)',
          'Concord (subject-verb agreement)',
          'Question tags',
        ]
      },
      {
        topic: 'Oral English',
        subtopics: [
          'Vowel sounds (pure vowels and diphthongs)',
          'Consonant sounds (plosives, fricatives, affricates, nasals)',
          'Stress patterns (word stress and sentence stress)',
          'Intonation patterns (falling, rising, fall-rise)',
          'Sound contrasts and minimal pairs',
          'Syllable structure and phonetic transcription',
          'Connected speech (assimilation, elision, linking)',
        ]
      },
      {
        topic: 'Register and Style',
        subtopics: [
          'Formal and informal language',
          'Technical/specialized vocabulary',
          'Appropriateness of language use in context',
          'Figurative language vs literal language',
        ]
      },
      {
        topic: 'Essay and Letter Writing',
        subtopics: [
          'Types of essays (narrative, descriptive, argumentative, expository)',
          'Formal and informal letter writing',
          'Speech writing',
          'Report writing',
          'Article writing for publication',
        ]
      },
      {
        topic: 'Recommended Reading Text — 2026',
        subtopics: [
          '"The Lekki Headmaster" — Recommended prose text for JAMB 2026 Use of English',
          'Reading comprehension passages drawn from the text',
          'Vocabulary in context: character names, settings, social themes',
          'Summary and inference questions based on the text',
          'Understanding the author\'s purpose, tone, and style',
        ]
      },
    ]
  },
  {
    name: 'Physics',
    pdfUrl: 'https://www.jamb.gov.ng/wp-content/uploads/2024/01/Physics-Syllabus.pdf',
    topics: [
      {
        topic: 'Measurements and Units',
        subtopics: [
          'Fundamental and derived quantities',
          'Units and dimensions',
          'Measurement of mass, length, time, and temperature',
          'Errors and accuracy of measurement',
          'Use of measuring instruments (vernier caliper, micrometer)',
        ]
      },
      {
        topic: 'Mechanics',
        subtopics: [
          'Scalars and vectors (addition, resolution of vectors)',
          'Linear motion (speed, velocity, acceleration, equations of motion)',
          'Projectile motion',
          'Circular motion (centripetal force and acceleration)',
          'Newton\'s laws of motion and applications',
          'Friction (static, kinetic, laws of friction)',
          'Work, energy and power (kinetic and potential energy)',
          'Simple machines (mechanical advantage, velocity ratio, efficiency)',
          'Equilibrium of forces (moments, couple, centre of gravity)',
          'Simple harmonic motion (pendulum, spring)',
          'Gravitational field (acceleration due to gravity, escape velocity)',
        ]
      },
      {
        topic: 'Thermal Physics',
        subtopics: [
          'Temperature and thermometers (types and calibration)',
          'Heat transfer (conduction, convection, radiation)',
          'Linear and volume expansion of solids, liquids, and gases',
          'Gas laws (Boyle\'s, Charles\', Pressure, General gas equation)',
          'Kinetic theory of gases',
          'Specific heat capacity and latent heat',
          'Evaporation, boiling, and vapour pressure',
          'Calorimetry',
        ]
      },
      {
        topic: 'Waves and Optics',
        subtopics: [
          'Wave types (transverse, longitudinal) and properties',
          'Wave equations (v = fλ)',
          'Reflection, refraction, diffraction, and interference of waves',
          'Sound waves (speed, echo, resonance, vibration in pipes)',
          'Light waves (reflection, refraction, total internal reflection)',
          'Mirrors and lenses (concave, convex, applications)',
          'Dispersion of light and electromagnetic spectrum',
          'Optical instruments (microscope, telescope, camera)',
        ]
      },
      {
        topic: 'Electricity and Magnetism',
        subtopics: [
          'Electrostatics (charge, electric field, capacitance)',
          'Current electricity (Ohm\'s law, resistors in series and parallel)',
          'Electrical energy and power',
          'Kirchhoff\'s laws and circuit analysis',
          'Magnetic fields and forces on current-carrying conductors',
          'Electromagnetic induction (Faraday\'s and Lenz\'s laws)',
          'Transformers (step-up, step-down, efficiency)',
          'A.C. and D.C. circuits',
          'Electrical measuring instruments (galvanometer, ammeter, voltmeter)',
        ]
      },
      {
        topic: 'Modern Physics',
        subtopics: [
          'Atomic structure (Bohr\'s model, electron configuration)',
          'Radioactivity (types, half-life, decay equations)',
          'Nuclear reactions (fission, fusion)',
          'Photoelectric effect (threshold frequency, work function)',
          'Wave-particle duality',
          'X-rays (production, properties, uses)',
          'Energy quantization (Planck\'s constant)',
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
          'Pure and impure substances',
          'Filtration, evaporation, distillation (simple and fractional)',
          'Chromatography (paper, column, thin layer)',
          'Crystallization and recrystallization',
          'Sublimation',
          'Separating funnel (immiscible liquids)',
          'Centrifugation and decantation',
        ]
      },
      {
        topic: 'Atomic Structure and Bonding',
        subtopics: [
          'Structure of the atom (protons, neutrons, electrons)',
          'Atomic number, mass number, isotopes',
          'Electronic configuration and orbitals',
          'Periodic table (periods, groups, trends)',
          'Ionic bonding and electrovalent compounds',
          'Covalent bonding (single, double, triple, dative)',
          'Metallic bonding',
          'Van der Waals forces and hydrogen bonding',
          'Shapes of molecules (VSEPR theory)',
        ]
      },
      {
        topic: 'Stoichiometry and Chemical Reactions',
        subtopics: [
          'Mole concept and Avogadro\'s number',
          'Chemical equations and balancing',
          'Mass, molar mass, and molar volume',
          'Empirical and molecular formulae',
          'Limiting reagents and percentage yield',
          'Chemical laws (conservation of mass, definite proportions)',
        ]
      },
      {
        topic: 'States of Matter',
        subtopics: [
          'Properties of solids, liquids, and gases',
          'Kinetic theory of matter',
          'Gas laws (Boyle\'s, Charles\', Dalton\'s, Graham\'s)',
          'Ideal and real gases',
          'Changes of state and phase diagrams',
        ]
      },
      {
        topic: 'Acids, Bases and Salts',
        subtopics: [
          'Properties and types of acids and bases',
          'pH scale and indicators',
          'Neutralization reactions and titration calculations',
          'Salt preparation methods',
          'Buffer solutions',
          'Water of crystallization',
        ]
      },
      {
        topic: 'Redox Reactions and Electrochemistry',
        subtopics: [
          'Oxidation and reduction (electron transfer)',
          'Oxidation numbers/states',
          'Electrolysis (of brine, water, molten compounds)',
          'Electrochemical cells (voltaic, electrolytic)',
          'Faraday\'s laws of electrolysis',
          'Corrosion and its prevention',
        ]
      },
      {
        topic: 'Energy Changes in Reactions',
        subtopics: [
          'Exothermic and endothermic reactions',
          'Enthalpy changes (combustion, formation, neutralization)',
          'Hess\'s law and energy cycle diagrams',
          'Bond energy calculations',
        ]
      },
      {
        topic: 'Rates of Reaction and Equilibrium',
        subtopics: [
          'Factors affecting reaction rate',
          'Collision theory and activation energy',
          'Catalysis (types and examples)',
          'Chemical equilibrium and Le Chatelier\'s principle',
          'Equilibrium constants',
        ]
      },
      {
        topic: 'Organic Chemistry',
        subtopics: [
          'Hydrocarbons: alkanes, alkenes, alkynes (nomenclature, reactions)',
          'Isomerism (structural, geometric)',
          'Functional groups (alcohols, carboxylic acids, esters, amines)',
          'Petrochemicals and fractional distillation of crude oil',
          'Polymers (addition and condensation)',
          'Fats, oils, proteins, and carbohydrates',
          'Soaps and detergents',
        ]
      },
      {
        topic: 'Chemistry and Industry',
        subtopics: [
          'Metals and their extraction',
          'Alloys and their uses',
          'Chemical industries in Nigeria',
          'Environmental pollution (air, water, soil)',
          'Biotechnology and fermentation',
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
          'Cell structure and function (plant and animal cells)',
          'Cell organelles and their functions',
          'Cell division (mitosis and meiosis)',
          'Levels of organization (cells, tissues, organs, systems)',
          'Classification of living organisms (five kingdoms)',
          'Viruses (structure, types, diseases)',
          'Use of microscope',
        ]
      },
      {
        topic: 'Plant Biology',
        subtopics: [
          'Plant nutrition (photosynthesis – light and dark reactions)',
          'Mineral nutrition and deficiency symptoms',
          'Transport in plants (osmosis, diffusion, transpiration)',
          'Translocation of organic solutes',
          'Plant hormones (auxins, gibberellins, abscisic acid)',
          'Tropisms and nastic movements',
          'Plant reproduction (asexual and sexual)',
          'Pollination and fertilization',
          'Seed and fruit formation, dispersal, and germination',
        ]
      },
      {
        topic: 'Animal Biology',
        subtopics: [
          'Nutrition in animals (holozoic, saprophytic, parasitic)',
          'Digestive system and enzymes',
          'Circulatory system (blood, heart, blood vessels, lymph)',
          'Respiratory system (gas exchange, breathing mechanism)',
          'Excretory system (kidney structure and function)',
          'Nervous system (central and peripheral, reflex arc)',
          'Sense organs (eye, ear)',
          'Endocrine system and hormones',
          'Reproductive system (male and female)',
          'Skeletal and muscular systems',
          'Homeostasis (temperature, blood sugar regulation)',
        ]
      },
      {
        topic: 'Genetics and Evolution',
        subtopics: [
          'Heredity and variation',
          'Mendelian genetics (monohybrid and dihybrid crosses)',
          'Sex determination and sex-linked traits',
          'Mutation (gene and chromosomal)',
          'Blood groups and genotypes',
          'Probability in genetics',
          'Evolution theories (Lamarck, Darwin)',
          'Evidence of evolution (fossils, comparative anatomy)',
          'Natural selection and adaptation',
          'Genetic engineering and biotechnology basics',
        ]
      },
      {
        topic: 'Ecology',
        subtopics: [
          'Ecosystems and biomes (aquatic, terrestrial)',
          'Components of an ecosystem (biotic and abiotic)',
          'Food chains, food webs, and trophic levels',
          'Energy flow and nutrient cycling',
          'Population dynamics (growth, carrying capacity)',
          'Ecological succession',
          'Conservation of natural resources',
          'Pollution (types, effects, control)',
          'Waste management and recycling',
          'Climate change and its effects',
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
          'Figures of speech (metaphor, simile, personification, irony, hyperbole)',
          'Literary devices (symbolism, imagery, allegory, foreshadowing)',
          'Narrative techniques (point of view, flashback, stream of consciousness)',
          'Themes, motifs, and subject matter',
          'Tone, mood, and atmosphere',
          'Satire, parody, and sarcasm',
          'Diction, register, and style',
          'Foil characters, soliloquy, aside, dramatic irony',
          'Enjambment, caesura, and poetic line structure',
          'Stream of consciousness, interior monologue',
        ]
      },
      {
        topic: 'Drama — 2026 Recommended Texts',
        subtopics: [
          'Elements of drama (plot, character, dialogue, setting, conflict)',
          'Types of drama (tragedy, comedy, tragicomedy, melodrama)',
          'Dramatic techniques (soliloquy, aside, dramatic irony, stagecraft)',
          'AFRICAN DRAMA: "The Marriage of Anansewa" by Efua T. Sutherland (Ghana) — Anansesem tradition, trickster motif, marriage customs',
          'AFRICAN DRAMA: "Once Upon an Elephant" by Bosede Ademilua-Afolayan (Nigeria) — power, corruption, African oral fable tradition',
          'NON-AFRICAN DRAMA: "Antony and Cleopatra" by William Shakespeare — love vs duty, Rome and Egypt, tragedy',
          'NON-AFRICAN DRAMA: "An Inspector Calls" by J.B. Priestley — social responsibility, class, moral accountability',
        ]
      },
      {
        topic: 'Poetry — 2026 Recommended Poems',
        subtopics: [
          'Types of poetry (lyric, narrative, dramatic, epic, ode, sonnet, elegy)',
          'Poetic devices (rhyme, rhythm, meter, alliteration, assonance, enjambment)',
          'Analysis and interpretation of poems',
          'AFRICAN POEMS:',
          '"Once Upon a Time" — Gabriel Okara (loss of sincerity, Westernisation)',
          '"New Tongue" — Elizabeth L.A. Kamara (colonial language, African identity)',
          '"Night" — Wole Soyinka (darkness, foreboding, political menace)',
          '"Not My Business" — Niyi Osundare (political apathy, oppression)',
          '"Hearty Garlands" — S.O.H. Afriyie-Vidza (cultural celebration, community)',
          '"The Breast of the Sea" — Syl Cheney-Coker (diaspora, slavery, memory)',
          'NON-AFRICAN POEMS:',
          '"She Walks in Beauty" — Lord Byron (beauty, inner virtue, light and dark imagery)',
          '"The Nun\'s Priest\'s Tale" (shortened) — Geoffrey Chaucer (beast fable, flattery, moral lesson)',
          'RECOMMENDED POETRY ANTHOLOGIES:',
          '"Of Shadows and Rainbows: Musings in Times of COVID" — Obafemi, O. & Agoi (eds.), PEN Nigeria',
          '"Naked Soles" — Gbemisola, A. (2005), Ibadan: Kraft',
          '"The Penguin Book of English Verse" — Hayward, J. (ed.) (1968)',
          '"New Poetry from Africa" — Johnson, R. et al (eds.) (1996)',
          '"West African Verse" — Nwoga, D. (ed.) (1967)',
          '"A Selection of African Poetry" — Senanu, K.E. & Vincent, T. (eds.) (1993)',
          '"Poems of Black Africa" — Soyinka, W. (ed.) (1987)',
        ]
      },
      {
        topic: 'Prose — 2026 Recommended Texts',
        subtopics: [
          'Types of prose (fiction, non-fiction, novel, novella, short story)',
          'Narrative techniques (first person, third person, omniscient narrator)',
          'Character development, plot structure (exposition, climax, denouement)',
          'Setting and its social/thematic significance',
          'AFRICAN PROSE: "So the Path Does Not Die" by Pede Hollist (Sierra Leone) — identity, tradition vs Westernisation, community resilience',
          'AFRICAN PROSE: "Redemption Road" by Elma Shaw (Liberia) — civil war, healing, forgiveness, post-conflict recovery',
          'NON-AFRICAN PROSE: "To Kill a Mockingbird" by Harper Lee (USA) — racial injustice, moral courage, the American South',
          'NON-AFRICAN PROSE: "Path of Lucas: The Journey He Endured" by Susanne Bellefeuille — identity, self-discovery, endurance',
        ]
      },
      {
        topic: 'Critical Texts & References',
        subtopics: [
          '"A Glossary of Literary Terms" (4th Ed.) — Abrams, M.H. (1981)',
          '"A Dictionary of Literature" — Emeaba, O.E. (1982)',
          '"Understanding Unseen: An Introduction to English Poetry and the English Novel" — Murphy, M.J. (1972)',
          'Historical and social context of literary works',
          'Comparative analysis of texts',
          'Relationship between literature and society',
          'African literary tradition and oral literature',
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

// Question-bank subject names differ slightly from syllabus names.
const SUBJECT_ALIASES: Record<string, string> = {
  'English': 'English Language',
  'Use of English': 'English Language',
  'Literature': 'Literature in English',
  'Literature-in-English': 'Literature in English',
  'CRS': 'Christian Religious Studies',
  'IRS': 'Islamic Religious Studies',
  'Maths': 'Mathematics',
};

export const getSyllabusForSubject = (subject?: string): SubjectSyllabus | undefined => {
  if (!subject) return undefined;
  const name = SUBJECT_ALIASES[subject] ?? subject;
  const lower = name.toLowerCase();
  return (
    syllabusData.find(s => s.name.toLowerCase() === lower) ||
    syllabusData.find(s => s.name.toLowerCase().startsWith(lower)) ||
    syllabusData.find(s => lower.startsWith(s.name.toLowerCase()))
  );
};

export const getSyllabusTopics = (subject?: string): string[] =>
  getSyllabusForSubject(subject)?.topics.map(t => t.topic) ?? [];
