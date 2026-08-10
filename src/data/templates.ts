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
