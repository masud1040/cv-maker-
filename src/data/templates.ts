import { CVData, TemplateConfig } from '../types/cv';

export const TEMPLATES: TemplateConfig[] = [
  {
    id: 'ats-student',
    name: 'ATS Student',
    badge: 'Format 1 - Student & Grad',
    category: 'ATS',
    tagline: 'Single-column, high-clarity layout built specifically for internships & new graduates.',
    description: 'Follows strict ATS parsing guidelines: zero skill bars, clean standard typography, logical section flow starting with Education & Key Projects.',
    features: [
      'Strict ATS 1-column structure',
      'Optimized for Academic & Entry-level',
      'Highlights Education & Projects',
      'Zero parsing errors in ATS scanners',
      'Clean A4 printable layout'
    ],
    supportsPhoto: false,
    recommendedFor: 'Students, Fresh Graduates, Career Changers, Academic Applications',
    previewThumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'ats-professional',
    name: 'ATS Professional',
    badge: 'Format 2 - Work Experience Focused',
    category: 'ATS',
    tagline: 'Industry-standard single-column format tailored for experienced job seekers.',
    description: 'Maximizes readability for recruiters and automated HR parsers. Features clear action-verb bullet points and structured experience layout.',
    features: [
      '100% ATS Friendly Parsing',
      'Experience & Achievement Focused',
      'High contrast section headers',
      'Standardized dates & locations',
      'Perfect single or multi-page flow'
    ],
    supportsPhoto: false,
    recommendedFor: 'Mid-Senior Professionals, Industry Specialists, Management Roles',
    previewThumbnail: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'hr-professional',
    name: 'HR Professional',
    badge: 'Format 3 - Visual Two-Column',
    category: 'HR',
    tagline: 'Elegant two-column design with sidebar for profile summary, skills & optional photo.',
    description: 'Designed for human recruiters and direct email applications. Balances visual elegance with dense structured information presentation.',
    features: [
      'Refined 2-Column Sidebar Layout',
      'Supports Profile Photo Upload',
      'Distinctive visual hierarchy',
      'Dedicated Skills & Languages Sidebar',
      'Ideal for Direct Email Submissions'
    ],
    supportsPhoto: true,
    recommendedFor: 'Creative & Tech Professionals, Direct HR Submissions, Senior Roles',
    previewThumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'modern-two-column',
    name: 'Modern Executive Two-Column',
    badge: 'Format 4 - Top Header & Sidebar Card',
    category: 'HR',
    tagline: 'Featured modern format with light top box, left contact/skills panel, and structured experience column.',
    description: 'Matches the popular software engineer & tech executive layout: top summary header with optional profile photo, light tinted contact/skills sidebar, and clean main column.',
    features: [
      'Light Tinted Top Header Card',
      'Left Sidebar for Contacts, Skills & Tools',
      'Right Column for Work, Education & Projects',
      'Graceful alignment if fields are omitted',
      'Supports Circular Profile Photo'
    ],
    supportsPhoto: true,
    recommendedFor: 'Software Engineers, Full Stack Developers, Tech Leads, Management',
    previewThumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'developer-clean',
    name: 'Developer / Programming Hero Clean',
    badge: 'Format 5 - Developer Clean Layout',
    category: 'ATS',
    tagline: 'High-impact single-column developer format with categorized tech skills and project tech stacks.',
    description: 'Specially crafted for Full Stack & Web Engineers: prominent project tech stacks, categorized skills (Languages, Frontend, Backend, DB, Tools), and fully optional sections.',
    features: [
      'Categorized Skills & Project Tech Stack',
      'All sections 100% Optional & Flexible',
      'Underlined header & section dividers',
      '100% ATS & Recruiter Friendly',
      'Optimized single-page layout'
    ],
    supportsPhoto: false,
    recommendedFor: 'Full Stack Developers, Web Engineers, Programming Hero Graduates, Junior/Senior Devs',
    previewThumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80'
  }
];

export const SAMPLE_STUDENT_CV: CVData = {
  id: 'sample-student-1',
  title: 'Software Engineering Graduate CV',
  templateId: 'ats-student',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: 'Saiful Alam Masud',
    professionalTitle: 'Computer Science & Engineering Student',
    email: 'saiful.masud@example.com',
    phone: '+880 1712 345678',
    location: 'Dhaka, Bangladesh',
    linkedin: 'linkedin.com/in/saifulmasud',
    github: 'github.com/saifulmasud',
    website: 'saifulmasud.dev'
  },
  summary: 'Motivated Senior Computer Science Student with strong fundamentals in Data Structures, Algorithms, Full-Stack Web Development, and Cloud Architecture. Proven ability to build scalable web apps, collaborate in Agile teams, and publish open-source tools.',
  education: [
    {
      id: 'edu-1',
      institution: 'BRAC University',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science & Engineering',
      gpa: '3.85 / 4.00',
      location: 'Dhaka, Bangladesh',
      startDate: 'Jan 2022',
      endDate: 'Dec 2025',
      isCurrent: true,
      description: 'Relevant Coursework: Algorithms & Data Structures, Operating Systems, Database Management Systems, Software Engineering, Artificial Intelligence.'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      jobTitle: 'Software Engineering Intern',
      company: 'TechCraft Innovations',
      location: 'Dhaka, Bangladesh',
      startDate: 'Jun 2024',
      endDate: 'Sep 2024',
      isCurrent: false,
      description: 'Worked on backend microservices and client-side web application optimization.',
      bullets: [
        'Developed 12 RESTful API endpoints using Node.js, Express, and PostgreSQL, reducing query latency by 24%.',
        'Implemented JWT authentication and RBAC authorization across 3 microservices.',
        'Collaborated with 5 senior engineers in daily Scrum standups and sprint planning sessions.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'AI-Powered Smart Task Planner',
      date: 'Mar 2025',
      technologies: 'React, TypeScript, Express, Tailwind CSS, Gemini API',
      link: 'github.com/saifulmasud/smart-task-planner',
      description: 'A responsive full-stack task management web application integrated with natural language processing.',
      bullets: [
        'Engineered dynamic task auto-prioritization using Google Gemini API based on user deadlines and priority metrics.',
        'Built local offline fallback using LocalStorage and indexed DB for instant UI responsiveness.',
        'Achieved 98+ Lighthouse score for performance, accessibility, and SEO.'
      ]
    },
    {
      id: 'proj-2',
      name: 'Real-Time Collaborative Code Editor',
      date: 'Nov 2024',
      technologies: 'Node.js, WebSocket, Monaco Editor, Docker',
      link: 'github.com/saifulmasud/collab-code',
      description: 'A multi-user web-based IDE allowing simultaneous real-time code editing and execution.',
      bullets: [
        'Implemented Operational Transformation algorithm using WebSockets to synchronize code cursor movements for up to 20 concurrent users.',
        'Containerized code execution engine using Docker sandbox to safely execute untrusted Python and JavaScript snippets.'
      ]
    }
  ],
  skills: {
    technical: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Node.js', 'Express.js', 'Python', 'PostgreSQL', 'Git/GitHub', 'REST APIs', 'HTML5/CSS3', 'Tailwind CSS'],
    soft: ['Problem Solving', 'Team Collaboration', 'Agile/Scrum', 'Time Management', 'Critical Thinking', 'Technical Communication'],
    tools: ['VS Code', 'Postman', 'Docker', 'Vite', 'Figma', 'Linux Terminal', 'Vercel']
  },
  certifications: [
    {
      id: 'cert-1',
      name: 'Meta Front-End Developer Professional Certificate',
      organization: 'Coursera / Meta',
      year: '2024',
      link: 'coursera.org/verify/meta-frontend'
    },
    {
      id: 'cert-2',
      name: 'AWS Certified Cloud Practitioner',
      organization: 'Amazon Web Services',
      year: '2024'
    }
  ],
  extracurricular: [
    {
      id: 'extra-1',
      role: 'Vice President of Technology',
      organization: 'BRAC University Computer Club',
      date: 'Jan 2024 - Present',
      description: 'Organized 4 university-wide hackathons with over 350 participants. Conducted 6 technical workshops on Git, React, and Open Source contributions.'
    }
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Fluent' },
    { id: 'lang-2', name: 'Bengali', proficiency: 'Native' }
  ],
  awards: [
    {
      id: 'award-1',
      title: '1st Runner Up - National Inter-University Hackathon',
      issuer: 'ICT Division Bangladesh',
      date: 'Oct 2024',
      description: 'Awarded $1,500 prize out of 80 competing teams for developing an accessible healthcare appointment platform.'
    }
  ],
  references: {
    availableOnRequest: true,
    items: []
  },
  customSections: [],
  sectionOrder: ['summary', 'education', 'skills', 'projects', 'experience', 'certifications', 'extracurricular', 'languages', 'awards', 'references'],
  signature: {
    enabled: true,
    signerName: 'Saiful Alam Masud',
    signerTitle: 'Applicant Signature',
    date: '10 Aug 2026'
  },
  fontSize: 'standard',
  accentColor: '#1e3a8a'
};

export const SAMPLE_HR_CV: CVData = {
  ...SAMPLE_STUDENT_CV,
  id: 'sample-hr-1',
  title: 'Senior Software Engineer CV (HR Layout)',
  templateId: 'hr-professional',
  personalInfo: {
    ...SAMPLE_STUDENT_CV.personalInfo,
    fullName: 'Saiful Alam Masud',
    professionalTitle: 'Lead Full-Stack Web Developer',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
  },
  summary: 'Results-driven Senior Full-Stack Engineer with 5+ years of hands-on experience designing, scaling, and deploying mission-critical web applications. Expert in React, TypeScript, Node.js, and cloud platforms. Passionate about clean code architecture, mentorship, and user-centric design.',
  sectionOrder: ['summary', 'experience', 'projects', 'education', 'skills', 'certifications', 'languages', 'references'],
  fontSize: 'standard',
  accentColor: '#2563eb'
};

export const SAMPLE_MODERN_CV: CVData = {
  ...SAMPLE_STUDENT_CV,
  id: 'sample-modern-1',
  title: 'Software Engineer CV (Modern Two-Column)',
  templateId: 'modern-two-column',
  personalInfo: {
    fullName: 'Afsara Moriom',
    professionalTitle: 'SOFTWARE ENGINEER | FULL STACK WEB DEVELOPER',
    email: 'afsaram@gmail.com',
    phone: '+880 1712-345678',
    location: 'Dhaka, Bangladesh',
    linkedin: 'Afsara Moriom',
    github: 'github.com/afsaramoriom',
    website: 'afsaramoriom.dev',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
  },
  summary: 'A highly motivated Software Engineer with over 4 years of experience in designing, developing, and maintaining scalable web applications. Skilled in modern JavaScript frameworks, REST APIs, cloud technologies, and database management. Passionate about building user-centric digital products and collaborating with cross-functional teams to deliver high-quality software solutions.',
  education: [
    {
      id: 'edu-1',
      institution: 'BRAC University',
      degree: 'B.Sc. in Computer Science & Engineering',
      fieldOfStudy: 'Major: Management',
      gpa: '3.85',
      location: 'Dhaka, Bangladesh',
      startDate: '2019',
      endDate: '2022',
      isCurrent: false
    },
    {
      id: 'edu-2',
      institution: 'Viquarunnisa Noon School and College',
      degree: 'Higher Secondary Certificate (HSC)',
      fieldOfStudy: 'Group: Science (English Version)',
      gpa: '5.00',
      location: 'Dhaka, Bangladesh',
      startDate: '2016',
      endDate: '2018',
      isCurrent: false
    },
    {
      id: 'edu-3',
      institution: 'Viquarunnisa Noon School and College',
      degree: 'Secondary School Certificate (SSC)',
      fieldOfStudy: 'Group: Science (English Version)',
      gpa: '5.00',
      location: 'Dhaka, Bangladesh',
      startDate: '2014',
      endDate: '2016',
      isCurrent: false
    }
  ],
  experience: [
    {
      id: 'exp-1',
      jobTitle: 'Senior Full Stack Software Engineer',
      company: 'Brain Station 23 PLC',
      location: 'Dhaka, Bangladesh',
      startDate: 'Jan 2024',
      endDate: 'Present',
      isCurrent: true,
      description: '',
      bullets: [
        'Designed scalable enterprise applications using React.js, Laravel, and Node.js.',
        'Improved application performance by 38% through database optimization.',
        'Led a team of 5 developers for ERP development projects.',
        'Integrated payment gateways including SSLCommerz and bKash.'
      ]
    },
    {
      id: 'exp-2',
      jobTitle: 'Full Stack Web Developer',
      company: 'REVE Systems',
      location: 'Dhaka, Bangladesh',
      startDate: 'Jan 2022',
      endDate: 'Dec 2023',
      isCurrent: false,
      description: '',
      bullets: [
        'Developed customer portals using Laravel and Vue.js.',
        'Built API integrations with third-party communication services.',
        'Increased system efficiency by optimizing SQL queries.',
        'Worked closely with QA teams to maintain software quality.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Smart Inventory Management System',
      date: 'January 2026',
      technologies: 'React.js, Laravel, MySQL',
      description: '',
      bullets: [
        'Developed a complete inventory management solution featuring role-based authentication, product tracking, purchase orders, sales reports, barcode support, and real-time analytics for SMEs.'
      ]
    }
  ],
  skills: {
    technical: [
      'Full Stack Development',
      'REST API Development',
      'React.js & Next.js',
      'Node.js & Express.js',
      'Laravel & PHP'
    ],
    soft: [],
    tools: [
      'Visual Studio Code',
      'IntelliJ IDEA',
      'Docker'
    ]
  },
  certifications: [
    {
      id: 'cert-1',
      name: 'Professional Web Development',
      organization: 'BASIS Institute of Technology & Management (BITM)',
      year: '2024'
    },
    {
      id: 'cert-2',
      name: 'AWS Cloud Practitioner Essentials',
      organization: 'Amazon Web Services',
      year: '2024'
    },
    {
      id: 'cert-3',
      name: 'Advanced React Development',
      organization: 'Programming Hero / Ostad Bangladesh',
      year: '2023'
    }
  ],
  awards: [
    {
      id: 'award-1',
      title: 'Champion',
      issuer: 'National Hackathon Bangladesh',
      date: '2021'
    },
    {
      id: 'award-2',
      title: '2nd Runners Up',
      issuer: 'IUT CSE Fest',
      date: '2019'
    },
    {
      id: 'award-3',
      title: 'Finalist',
      issuer: 'National ICT Innovation Challenge',
      date: '2023'
    }
  ],
  references: {
    availableOnRequest: false,
    items: [
      {
        id: 'ref-1',
        name: 'Engr. Mahmud Hasan',
        title: 'Senior Software Engineer',
        company: 'Brain Station 23 PLC',
        email: 'mahmud.hasan@bs23.com',
        phone: ''
      }
    ]
  },
  sectionOrder: ['education', 'experience', 'projects', 'awards'],
  fontSize: 'standard'
};

export const SAMPLE_DEVELOPER_CV: CVData = {
  ...SAMPLE_STUDENT_CV,
  id: 'sample-developer-1',
  title: 'Full Stack Web Developer CV (Developer Format)',
  templateId: 'developer-clean',
  personalInfo: {
    fullName: 'SAIFUL ALAM MASUD',
    professionalTitle: 'Aspiring Full Stack Web Developer',
    email: 'saiful.masud@email.com',
    phone: '+880 1712-345678',
    location: 'Dhaka, Bangladesh',
    linkedin: 'linkedin.com/in/saifulmasud',
    github: 'github.com/saifulmasud',
    website: 'saifulmasud.dev'
  },
  summary: 'Motivated developer transitioning into web development after completing Programming Hero\'s Complete Web Development Course / AI-Driven Full Stack Web Engineering Bootcamp. Built 3+ real-world projects using React, Node.js, Express, MongoDB. Known for fast learning, discipline, and problem solving. Seeking a Junior / Trainee Developer role to apply hands-on project experience and continue growing as an engineer.',
  skills: {
    technical: [
      'Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3',
      'Frontend: React.js, Next.js, Tailwind CSS, Redux, Bootstrap',
      'Backend: Node.js, Express.js, REST API design, Authentication (JWT)',
      'Database: MongoDB, Mongoose, PostgreSQL, MySQL',
      'Currently Learning: AWS basics, Next.js App Router'
    ],
    tools: ['Git & GitHub', 'Postman', 'Vercel', 'Firebase', 'VS Code'],
    soft: ['Problem Solving', 'Teamwork', 'Ownership', 'Communication']
  },
  projects: [
    {
      id: 'dev-proj-1',
      name: 'E-commerce Platform — Social Shopping Web App',
      date: 'Jan 2026',
      technologies: 'React.js, Node.js, Express, MongoDB, JWT, Tailwind CSS',
      link: 'Live Link | GitHub',
      description: '',
      bullets: [
        'Built a full-stack e-commerce web application allowing users to browse, filter, and purchase products.',
        'Implemented JWT-based authentication, role-based access control, and bKash / Stripe payment gateway integration.',
        'Result / impact: reduced page load time by 30% and served 100+ active test users.'
      ]
    },
    {
      id: 'dev-proj-2',
      name: 'Dashboard Utility App — Smart Task & Analytics',
      date: 'Nov 2025',
      technologies: 'Next.js, Tailwind CSS, MongoDB, Recharts',
      link: 'Live Link | GitHub',
      description: '',
      bullets: [
        'Developed dynamic analytics dashboard with offline state synchronization and drag-and-drop task prioritization.',
        'Solved state synchronization challenge across multi-device user sessions.'
      ]
    }
  ],
  experience: [
    {
      id: 'dev-exp-1',
      jobTitle: 'Technical Support Specialist',
      company: 'TechCorp Solutions',
      location: 'Dhaka, Bangladesh',
      startDate: 'Jan 2024',
      endDate: 'Present',
      isCurrent: true,
      description: '',
      bullets: [
        'Demonstrated transferable soft skills: teamwork, ownership, deadlines, and technical communication.'
      ]
    }
  ],
  education: [
    {
      id: 'dev-edu-1',
      institution: 'BRAC University',
      degree: 'B.Sc. in Computer Science & Engineering',
      fieldOfStudy: '',
      gpa: '3.82',
      location: 'Dhaka, Bangladesh',
      startDate: '2021',
      endDate: '2025',
      isCurrent: false,
      description: 'Relevant coursework: Data Structures, Algorithms, Web Engineering, Database Systems.'
    }
  ],
  certifications: [
    {
      id: 'dev-cert-1',
      name: 'Complete Web Development Course',
      organization: 'Programming Hero (Batch 9)',
      year: '2024',
      link: 'programming-hero.com'
    },
    {
      id: 'dev-cert-2',
      name: 'AWS Certified Cloud Practitioner',
      organization: 'Amazon Web Services',
      year: '2024'
    }
  ],
  extracurricular: [
    {
      id: 'dev-extra-1',
      role: 'Hackathon Participant & Vice President of Technology',
      organization: 'BRAC University Computer Club',
      date: '2024 - Present',
      description: 'Organized 4 university-wide hackathons with over 350 participants. Conducted technical workshops on Git and React.'
    }
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Fluent' },
    { id: 'lang-2', name: 'Bengali', proficiency: 'Native' }
  ],
  awards: [
    {
      id: 'dev-award-1',
      title: '1st Runner Up - National Inter-University Hackathon',
      issuer: 'ICT Division Bangladesh',
      date: 'Oct 2024',
      description: 'Awarded prize out of 80 competing teams for developing an accessible healthcare appointment platform.'
    }
  ],
  references: {
    availableOnRequest: true,
    items: []
  },
  sectionOrder: ['summary', 'skills', 'projects', 'experience', 'education', 'certifications', 'extracurricular', 'languages', 'awards', 'references'],
  fontSize: 'standard'
};

