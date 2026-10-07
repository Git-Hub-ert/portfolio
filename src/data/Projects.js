// data/Projects.js

const projectsData = [
        {
    id: 'portfolio',
    title: 'Portfolio',
    category: 'Web Development',
    tagline: 'The website you are currently viewing',
    description: "My most complete React website to date. Building it meant learning things I had never worked with before, which made it all the more interesting to develop.",
    detailedDescription: `This portfolio is a single-page React application, deployed as a static site on GitHub Pages with my own domain. There is no back end: the contact form sends messages through EmailJS, a third-party email service. Keeping the site static also means there is no server to maintain or attack.

    I used AI assistants to scaffold the project, then designed the visual style myself and reviewed, adapted and debugged the generated code. The parts I am proudest of are the interactive D3 graphs on the Skills and Certifications pages, which needed specific work to stay usable on phones, and the dark and light themes built on CSS variables.

    The site is a work in progress: I published it as soon as I could, and I keep improving it, especially its accessibility and security hardening.`,
    technologies: ['React', 'JavaScript', 'HTML', 'CSS', 'D3.js', 'EmailJS', 'Git', 'GitHub Pages', 'AI Assistants', 'Graphic Design'],
    role: 'Designer & Developer',
    contributions: [
      'Used AI assistants to scaffold the project, then reviewed, adapted and debugged the generated code',
      'Designed the visual identity and the dark and light themes using CSS variables',
      'Built interactive D3 force graphs with zoom, pan and drag, adapted for mobile screens',
      'Set up SEO: per-page meta tags, structured data (JSON-LD), sitemap and robots.txt',
      'Integrated a contact form through EmailJS, with a honeypot field against spam bots',
      'Deployed the site on GitHub Pages with a custom domain'
    ],
    timeframe: 'Dec 2025 - Present',
    links: [
      { type: 'GitHub', url: 'https://github.com/Git-Hub-ert/portfolio', label: 'View Source Code' },
    ],
    status: 'Ongoing',
    teamSize: 'Solo project',
    highlights: [
      'My most complete React application to date',
      'First time working on SEO',
      'First interactive data visualization (D3)',
      'Learned to work effectively with AI coding assistants'
    ]
  },
  {
    id: 'battle-x',
    title: 'Battle-X',
    category: 'Web Development',
    tagline: 'Real-time multiplayer naval battle game',
    description: 'My first React website that allowed two users to play naval battle in real-time. This full-stack project demonstrated my ability to build interactive web applications with real-time communication.',
    detailedDescription: `Battle-X is a full-stack web application that brings the classic naval battle game to the browser. 
    
    Built as my first ever React project, it features real-time gameplay between two players, complete session management, and persistent game state through a SQL database.

    The project required strong collaboration skills, version control with GitHub, and understanding of both frontend and backend architecture. Players could create games, join existing matches, and play against each other with live updates.`,
    technologies: ['React', 'Node.js', 'MySQL', 'Git', 'Session Cookies', 'HTML', 'CSS', 'JavaScript'],
    role: 'Full-Stack Developer & Team Lead',
    contributions: [
      'Led team coordination and project management',
      'Designed and implemented SQL database schema',
      'Designed data storage in the database',
      'Developed approximately 50% of frontend React components',
      'Helped in the implementation of session cookie authentication',
      'Managed GitHub repository and code reviews'
    ],
    timeframe: 'April 2025 - June 2025',
    links: [
      { type: 'GitHub', url: 'https://github.com/Git-Hub-ert/battle-X', label: 'View Source Code' },
    ],
    status: 'Completed',
    teamSize: '5 developers',
    highlights: [
      'First full-stack React application',
      'Real-time multiplayer functionality',
      'Team leadership experience',
      'Complete CRUD operations with SQL'
    ]
  },
  {
    id: 'optiattack',
    title: 'OptiAttack',
    category: 'Security Tool',
    tagline: 'Adversarial attack generation tool for AI robustness testing',
    description: 'A sophisticated tool for generating adversarial attacks on machine learning models. Developed during my internship in Turkey with an international team of 6 developers.',
    detailedDescription: `OptiAttack is a professional-grade tool designed to test and improve the robustness of AI models by generating adversarial attacks.
    
    Adversarial attacks are subtle perturbations to input data that cause machine learning models to make incorrect predictions. OptiAttack automates the generation of these attacks, helping security researchers and ML engineers identify vulnerabilities in their models.
    
    This project was developed during my internship at Erciyes University in Turkey, requiring strong English communication skills and international collaboration. The tool features an intuitive React dashboard for configuring attacks and visualizing results, backed by powerful Python algorithms.
    
    Working with a diverse, international team taught me valuable lessons in cross-cultural communication, distributed development, and professional software engineering practices.`,
    technologies: ['React', 'Python', 'Machine Learning', 'NumPy', 'Node.js', 'Git'],
    role: 'Frontend Developer & E2E Engineer',
    contributions: [
      'Developed interactive React dashboard for attack configuration',
      'Modified Python command-line tools for better usability',
      'Performed comprehensive end-to-end testing',
      'Collaborated with international team in English',
      'Analyzed and documented attack results in JSON format'
    ],
    timeframe: 'June 2025 - August 2025',
    links: [
      { type: 'GitHub', url: 'https://github.com/OAResearch/optiattack', label: 'View Source code' },
      { type: 'Research', url: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5263658', label: 'Related Research' }
    ],
    status: 'Completed',
    teamSize: '6 developers',
    highlights: [
      'International collaboration experience',
      'Cybersecurity and AI intersection',
      'Professional internship project',
      'Deeper understanding of AIs flaws'
    ]
  },
  {
    id: 'cocarhina',
    title: 'Cocarhina',
    category: 'Network',
    tagline: 'Fictional enterprise simulation for network implementation',
    description: 'A fake company created from scratch with classmates in order to learn every network equipment from a company point of view.',
    detailedDescription: `Cocarhina is an academic project that simulated running a complete fictional enterprise from the ground up.
    
    This project required creating organizational charts, financial projections, IT knowledge, questioning and operational procedures. It demonstrated my ability to think beyond technical implementation and understand the business context in which technology operates.
    
    Working on such a long project helped me develop crucial soft skills including strategic planning, and understanding how IT departments integrate with broader organizational goals - essential knowledge for any future CISO.`,
    technologies: ['Project Management', 'Microsoft Office', 'Presentation Tools'],
    role: 'Project Manager & Network Administrator',
    contributions: [
      'Designed organizational structure',
      'Coordinated team deliverables',
      'Presented final project to stakeholders (teachers)',
      'Implemented every Linux server'
    ],
    timeframe: 'September 2023 - June 2024',
    links: [],
    status: 'Completed',
    teamSize: '3 students',
    highlights: [
      'Comprehensive business simulation',
      'Leadership and coordination',
      'Business-IT alignment understanding',
      'Professional presentation skills'
    ]
  },
  {
    id: 'powerlifting-meet',
    title: 'Sports Competitions Organization',
    category: 'Event Management',
    tagline: 'Helped organize and run 7 powerlifting competitions',
    description: 'Helped organize powerlifting competitions, first as a volunteer, then as part of the organizing team, and now running the livestream.',
    detailedDescription: `As a member of my powerlifting association, I have helped organize and run 7 competitions, each welcoming around 300 athletes on average and involving 20 to 40 organizers and volunteers.

    I started as a volunteer, guiding athletes and visitors. At a later meet, I ran the meet secretariat, which records every attempt and result and is one of the most critical roles during a competition. I now also run the livestream: choosing which camera to show, managing transitions and updating the on-screen overlays.

    Events of this size never run without issues. They taught me to keep the quality of my work high under pressure and to set priorities quickly, for example deciding which services to restore first after a power failure.`,
    technologies: ['OBS Studio', 'Live Video Production'],
    role: 'Volunteer, then member of the organizing team',
    contributions: [
      'Guided athletes and visitors',
      'Set up and maintained competition infrastructure',
      'Prioritized which services to restore first after a power failure',
      'Managed the disassembly of the warm-up room',
      'Ran the meet secretariat (scoring table)',
      'Running the livestream production in OBS Studio: camera selection, transitions and overlays'
    ],
    timeframe: 'Sep 2023 - Present',
    links: [
      { type: 'YouTube', url: 'https://www.youtube.com/watch?v=QXyE6-H1Qv8', label: 'Livestream: Lyon Powermeet 2025', shortLabel: 'Lyon 2025' },
      { type: 'YouTube', url: 'https://www.youtube.com/watch?v=Xw9bL8XHsdY&t=30459s', label: 'Livestream: Silent Worker Meet, Winter Edition 2024', shortLabel: 'Silent Worker 2024' }
    ],
    status: 'Ongoing',
    teamSize: '20–40 people per meet',
    highlights: [
      'Team leadership',
      'Conflict resolution',
      'Event management experience',
      'Live video production'
    ]
  }
];

export default projectsData;