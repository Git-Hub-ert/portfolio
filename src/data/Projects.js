// data/Projects.js

const projectsData = [
    {
    id: 'portfolio',
    title: 'Portfolio',
    category: 'Web Development',
    tagline: 'The website you are currently viewing',
    description: "My most advanced React website up to date, I had to implement things I have never worked with before, making it all the way more interesting to develop.",
    detailedDescription: `This portfolio is a full-stack web application designed to showcase my skills, experiences and goals. 
    
    This project was built using different AIs, mostly to build the skeleton. The whole graphic style was decided by myself, and I chose to add in some extra spice with the D3 graphics you might have stumbled upon. Since the project was pretty big, I had a lot of debugging to do, and it is still a work in progress as I wanted to make it public the sooner I could. `,
    technologies: ['React', 'Node.js', 'AI', 'Git', 'APIs', 'HTML', 'CSS', 'JavaScript', 'Graphic Design'],
    role: 'Full-Stack Developer & Team Lead',
    contributions: [
      'Used AIs to build the project, had to learn prompt engineering',
      'Designed and implemented every endpoint',
      'Incorporated a D3 graph',
      'Debugged every page and security issues',
      'Managed the whole SEO'
    ],
    timeframe: 'December 2025 - Today',
    links: [
      { type: 'GitHub', url: 'https://github.com/Git-Hub-ert/portfolio', label: 'View Source Code' },
    ],
    status: 'Ongoing',
    teamSize: '1 developer',
    highlights: [
      'Most complete full-stack React application',
      'First time working on SEO',
      'First time implementing an API',
      'Biggest project to date'
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
    
    Working on such a long project helped me develop crucial soft skills including strategic planning, and understanding how IT departments integrate with broader organizational goals - essential knowledge for any futur CISO.`,
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
    tagline: 'Organized multiple Powerlifting competitions',
    description: 'Organized multiple powerlifting competitions, some as a simple volunteer, others as part of the organization team.',
    detailedDescription: `As part of my commitment to my association, I organized and managed 4 different competitions.
    
    I began as a volunteer in these events and helped guide athletes and visitors. In the last meet though, I had the chance to run the secretary, the single most critical job in the whole competition, before enjoying handling transitions during the live stream.
    Such important events never come with 0 issue, so this made me develop multiple soft skills such as keeping a high quality work even under pressure and prioritizing services to get back up after a power failure.
    It also strengthened my own technical skills as I had to thoroughly understand each challenge to help troubleshoot issues and provide hints to participants.`,
    technologies: ['OBS Studio', 'Advising', 'Team Management', 'Priority Management', 'Event Management', 'Idea Forstering'],
    role: 'Volunteer and Team Leader at times of need',
    contributions: [
      'Guided athletes and visitors',
      'Set up and maintained competition infrastructure',
      'Prioritized on services to put back into good',
      'Managed the whole warming room dissassembly stage',
      'Ran the secretary job'
    ],
    timeframe: 'September 2023 - Present',
    links: [
      { type: 'youtube', url: 'https://www.youtube.com/watch?v=QXyE6-H1Qv8', label: 'Youtube' },
      { type: 'youtube', url: 'https://www.youtube.com/watch?v=Xw9bL8XHsdY&t=30459s&pp=ygUSc2lsZW50IHdvcmtlciBtZWV0', label: 'Youtube' }
    ],
    status: 'Ongoing',
    teamSize: '300 athletes',
    highlights: [
      'Team leadership',
      'Conflict resolution',
      'Event management experience',
      'Technical challenge design'
    ]
  }
];

export default projectsData;