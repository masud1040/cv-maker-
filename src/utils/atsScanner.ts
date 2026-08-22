import { CVData } from '../types/cv';

export interface ATSCheckItem {
  id: string;
  category: 'contact' | 'summary' | 'experience' | 'skills' | 'education' | 'format';
  title: string;
  description: string;
  status: 'pass' | 'warning' | 'fail';
  weight: number; // contribution to total score
  earned: number;
  recommendation: string;
  targetTab: string;
}

export interface KeywordMatchResult {
  keyword: string;
  found: boolean;
  category: string;
}

export interface ATSSuggestion {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  category: 'contact' | 'summary' | 'experience' | 'skills' | 'education' | 'format';
  targetTab: string;
  actionLabel?: string;
  suggestedItems?: string[];
}

export interface ATSAnalysisReport {
  overallScore: number; // 0 to 100
  grade: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
  color: string;
  checklist: ATSCheckItem[];
  categoryScores: {
    contact: number;
    summary: number;
    experience: number;
    skills: number;
    education: number;
    format: number;
  };
  detectedActionVerbs: string[];
  missingActionVerbs: string[];
  metricsDetected: string[];
  wordCount: number;
  industryKeywordMatches: KeywordMatchResult[];
  matchedKeywordCount: number;
  totalIndustryKeywords: number;
  keywordMatchPercentage: number;
  missingIndustryKeywords: string[];
  matchedIndustryKeywords: string[];
  topSuggestions: ATSSuggestion[];
  jobDescriptionMatchScore?: number;
  jobDescriptionMissingKeywords?: string[];
  jobDescriptionMatchedKeywords?: string[];
}

export const COMMON_ACTION_VERBS = [
  'managed', 'developed', 'designed', 'spearheaded', 'implemented', 'optimized',
  'orchestrated', 'streamlined', 'collaborated', 'delivered', 'resolved', 'supervised',
  'engineered', 'executed', 'formulated', 'generated', 'initiated', 'negotiated',
  'programmed', 'reduced', 'increased', 'trained', 'organized', 'accelerated',
  'coordinated', 'automated', 'achieved', 'launched', 'structured', 'facilitated',
  'mentored', 'constructed', 'deployed', 'monitored', 'authored', 'transformed'
];

export interface IndustryDefinition {
  id: string;
  name: string;
  iconName: string;
  description: string;
  keywords: string[];
}

export const INDUSTRY_CATALOG: IndustryDefinition[] = [
  {
    id: 'general',
    name: 'General Professional',
    iconName: 'Briefcase',
    description: 'Universal business, administration, leadership & communication competencies',
    keywords: [
      'communication', 'teamwork', 'leadership', 'problem solving', 'time management',
      'organization', 'microsoft office', 'excel', 'data analysis', 'customer service',
      'documentation', 'multitasking', 'reporting', 'client relations', 'strategic planning',
      'adaptability', 'critical thinking', 'project coordination'
    ]
  },
  {
    id: 'software',
    name: 'Software & Web Development',
    iconName: 'Code',
    description: 'Frontend, backend, cloud, DevOps, algorithms and full-stack technologies',
    keywords: [
      'typescript', 'javascript', 'react', 'node.js', 'python', 'git', 'rest api',
      'sql', 'database', 'docker', 'ci/cd', 'cloud', 'aws', 'agile', 'scrum',
      'frontend', 'backend', 'full stack', 'testing', 'debugging', 'architecture',
      'html5', 'css3', 'tailwind', 'microservices', 'mongodb', 'performance optimization'
    ]
  },
  {
    id: 'office_admin',
    name: 'Office & Executive Admin',
    iconName: 'FileSpreadsheet',
    description: 'Administrative support, data management, scheduling and office logistics',
    keywords: [
      'administration', 'data management', 'filing', 'correspondence', 'billing',
      'invoicing', 'bookkeeping', 'phone etiquette', 'calendar management', 'inventory',
      'vendor relations', 'procurement', 'spreadsheets', 'office 365', 'google workspace',
      'data entry', 'meeting coordination', 'travel management', 'confidentiality'
    ]
  },
  {
    id: 'marketing_sales',
    name: 'Marketing, Sales & Growth',
    iconName: 'TrendingUp',
    description: 'Digital marketing, CRM, lead gen, campaigns, SEO, and client acquisition',
    keywords: [
      'lead generation', 'crm', 'seo', 'conversion rate', 'social media', 'analytics',
      'b2b', 'b2c', 'content strategy', 'campaigns', 'negotiation', 'roi',
      'market research', 'branding', 'email marketing', 'sales pipeline', 'hubspot',
      'google analytics', 'customer acquisition', 'copywriting', 'pitching'
    ]
  },
  {
    id: 'finance_accounting',
    name: 'Finance & Accounting',
    iconName: 'DollarSign',
    description: 'Financial reporting, reconciliation, ledger, taxation, audit & auditing',
    keywords: [
      'financial reporting', 'reconciliation', 'general ledger', 'accounts payable',
      'accounts receivable', 'audit', 'tax compliance', 'forecasting', 'budgeting',
      'p&l', 'quickbooks', 'tally', 'balance sheet', 'variance analysis', 'compliance',
      'gaap', 'cash flow management', 'financial modeling', 'excel formulas'
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    iconName: 'HeartPulse',
    description: 'Clinical care, patient documentation, triage, diagnosis, and medical protocols',
    keywords: [
      'patient care', 'clinical documentation', 'electronic health records', 'vital signs',
      'cpr', 'bls', 'triage', 'medical terminology', 'patient assessment', 'infection control',
      'pharmacology', 'hipaa', 'diagnostic support', 'medication administration',
      'emergency care', 'interdisciplinary care', 'health education'
    ]
  },
  {
    id: 'education',
    name: 'Education & Teaching',
    iconName: 'GraduationCap',
    description: 'Curriculum design, classroom management, lesson planning, student evaluation',
    keywords: [
      'curriculum development', 'classroom management', 'lesson planning', 'student assessment',
      'differentiated instruction', 'e-learning', 'educational technology', 'parent communication',
      'mentorship', 'academic counseling', 'pedagogy', 'grading', 'interactive learning',
      'special education', 'course design'
    ]
  },
  {
    id: 'engineering',
    name: 'Engineering & Hardware',
    iconName: 'Cpu',
    description: 'CAD design, QA, quality control, prototyping, systems, and safety standards',
    keywords: [
      'cad', 'autocad', 'project management', 'quality assurance', 'product design',
      'simulation', 'technical documentation', 'lean manufacturing', 'troubleshooting',
      'safety compliance', 'prototyping', 'systems engineering', 'six sigma',
      'solidworks', 'schematics', 'testing protocols', 'maintenance'
    ]
  },
  {
    id: 'design_creative',
    name: 'UI/UX & Creative Design',
    iconName: 'Palette',
    description: 'User experience, wireframing, Figma, Adobe Suite, prototyping & visual branding',
    keywords: [
      'ui design', 'ux research', 'figma', 'wireframing', 'prototyping', 'adobe illustrator',
      'photoshop', 'design systems', 'user testing', 'typography', 'visual identity',
      'interaction design', 'responsive design', 'user journeys', 'accessibility'
    ]
  },
  {
    id: 'customer_service',
    name: 'Customer Support & Success',
    iconName: 'Headphones',
    description: 'Client retention, ticket resolution, empathy, helpdesk, SLA management',
    keywords: [
      'customer support', 'ticket management', 'zendesk', 'sla adherence', 'client retention',
      'empathy', 'active listening', 'conflict resolution', 'live chat', 'knowledge base',
      'troubleshooting', 'customer satisfaction', 'crm systems', 'onboarding'
    ]
  }
];

export const INDUSTRY_KEYWORDS: Record<string, string[]> = INDUSTRY_CATALOG.reduce((acc, ind) => {
  acc[ind.id] = ind.keywords;
  return acc;
}, {} as Record<string, string[]>);

/**
 * Scan CV text content and produce a comprehensive ATS compatibility report
 */
export function analyzeCVForATS(cvData: CVData, targetJobDescription = '', industry = 'general'): ATSAnalysisReport {
  const checklist: ATSCheckItem[] = [];

  // Extract all text content from CV for global scanning
  const textParts: string[] = [
    cvData.personalInfo?.fullName || '',
    cvData.personalInfo?.professionalTitle || '',
    cvData.personalInfo?.email || '',
    cvData.personalInfo?.phone || '',
    cvData.personalInfo?.location || '',
    cvData.personalInfo?.linkedin || '',
    cvData.personalInfo?.github || '',
    cvData.personalInfo?.website || '',
    cvData.summary || '',
    ...(cvData.experience || []).flatMap(e => [
      e.jobTitle || '',
      e.company || '',
      e.location || '',
      e.description || '',
      ...(e.bullets || [])
    ]),
    ...(cvData.education || []).flatMap(ed => [
      ed.degree || '',
      ed.institution || '',
      ed.fieldOfStudy || '',
      ed.gpa || '',
      ed.description || ''
    ]),
    ...(cvData.projects || []).flatMap(p => [
      p.name || '',
      p.description || '',
      ...(p.bullets || []),
      p.technologies || ''
    ]),
    ...(cvData.skills?.technical || []),
    ...(cvData.skills?.tools || []),
    ...(cvData.skills?.soft || []),
    ...(cvData.certifications || []).flatMap(c => [c.name, c.organization, c.year || '']),
    ...(cvData.awards || []).flatMap(a => [a.title, a.issuer, a.description || '']),
    ...(cvData.extracurricular || []).flatMap(x => [x.role, x.organization, x.description || '']),
    ...(cvData.languages || []).map(l => `${l.name} ${l.proficiency || ''}`)
  ];

  const fullText = textParts.join(' ').toLowerCase();
  const wordTokens = fullText.match(/\b[a-z0-9+#.-]+\b/g) || [];
  const totalWords = wordTokens.length;

  // 1. CONTACT & HEADER CHECKS
  // Check full name
  const hasName = Boolean(cvData.personalInfo?.fullName && cvData.personalInfo.fullName.trim().length >= 3);
  checklist.push({
    id: 'name_check',
    category: 'contact',
    title: 'Applicant Full Name',
    description: 'A clear, prominent full name is required for ATS parser header identification.',
    status: hasName ? 'pass' : 'fail',
    weight: 8,
    earned: hasName ? 8 : 0,
    recommendation: hasName ? 'Properly identified.' : 'Add your full professional name in Personal Info.',
    targetTab: 'personal'
  });

  // Check email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasValidEmail = Boolean(cvData.personalInfo?.email && emailRegex.test(cvData.personalInfo.email.trim()));
  checklist.push({
    id: 'email_check',
    category: 'contact',
    title: 'Professional Email Address',
    description: 'ATS parsers extract primary email for communication and candidate matching.',
    status: hasValidEmail ? 'pass' : 'fail',
    weight: 8,
    earned: hasValidEmail ? 8 : 0,
    recommendation: hasValidEmail ? 'Valid email format found.' : 'Provide a clean, valid professional email address.',
    targetTab: 'personal'
  });

  // Check phone
  const hasPhone = Boolean(cvData.personalInfo?.phone && cvData.personalInfo.phone.replace(/[^0-9+]/g, '').length >= 7);
  checklist.push({
    id: 'phone_check',
    category: 'contact',
    title: 'Contact Phone Number',
    description: 'Direct phone number format readable by automated HR scanning pipelines.',
    status: hasPhone ? 'pass' : 'fail',
    weight: 6,
    earned: hasPhone ? 6 : 0,
    recommendation: hasPhone ? 'Phone number detected.' : 'Add a valid contact telephone or mobile number.',
    targetTab: 'personal'
  });

  // Check location
  const hasLocation = Boolean(cvData.personalInfo?.location && cvData.personalInfo.location.trim().length >= 3);
  checklist.push({
    id: 'location_check',
    category: 'contact',
    title: 'Location / City / Address',
    description: 'Location info helps recruiters filter candidates by commute or region.',
    status: hasLocation ? 'pass' : 'warning',
    weight: 5,
    earned: hasLocation ? 5 : 2,
    recommendation: hasLocation ? 'Location provided.' : 'Add your city, district or location in Personal Info.',
    targetTab: 'personal'
  });

  // 2. PROFESSIONAL SUMMARY
  const summaryLength = (cvData.summary || '').trim().split(/\s+/).filter(Boolean).length;
  let summaryStatus: 'pass' | 'warning' | 'fail' = 'fail';
  let summaryEarned = 0;
  let summaryRec = 'Write a 40-100 word career summary to highlight your value proposition.';

  if (summaryLength >= 35 && summaryLength <= 130) {
    summaryStatus = 'pass';
    summaryEarned = 10;
    summaryRec = `Optimal length (${summaryLength} words) with strong clarity.`;
  } else if (summaryLength > 0 && summaryLength < 35) {
    summaryStatus = 'warning';
    summaryEarned = 6;
    summaryRec = `Summary is slightly short (${summaryLength} words). Expand to 40+ words for better keyword coverage.`;
  } else if (summaryLength > 130) {
    summaryStatus = 'warning';
    summaryEarned = 7;
    summaryRec = `Summary is quite long (${summaryLength} words). Consider condensing to under 120 words.`;
  }

  checklist.push({
    id: 'summary_check',
    category: 'summary',
    title: 'Professional Summary & Objective',
    description: 'A targeted summary loaded with key career highlights catches recruiter interest.',
    status: summaryStatus,
    weight: 10,
    earned: summaryEarned,
    recommendation: summaryRec,
    targetTab: 'summary'
  });

  // 3. WORK EXPERIENCE & ACTION IMPACT
  const experiences = cvData.experience || [];
  const hasExperience = experiences.length > 0;
  let expStatus: 'pass' | 'warning' | 'fail' = 'fail';
  let expEarned = 0;
  let expRec = 'Add at least one relevant work, internship, or volunteering experience.';

  if (experiences.length >= 2) {
    expStatus = 'pass';
    expEarned = 14;
    expRec = `${experiences.length} experience entries recorded with roles and institutions.`;
  } else if (experiences.length === 1) {
    expStatus = 'pass';
    expEarned = 11;
    expRec = '1 experience entry recorded. Adding more project or role details improves ranking.';
  }

  checklist.push({
    id: 'experience_count_check',
    category: 'experience',
    title: 'Work / Practical Experience Records',
    description: 'Chronological roles with employer names, titles, and dates.',
    status: expStatus,
    weight: 14,
    earned: expEarned,
    recommendation: expRec,
    targetTab: 'experience'
  });

  // Scan Action Verbs
  const detectedActionVerbs = COMMON_ACTION_VERBS.filter(verb => {
    const reg = new RegExp(`\\b${verb}\\b`, 'i');
    return reg.test(fullText);
  });
  const missingActionVerbs = COMMON_ACTION_VERBS.filter(v => !detectedActionVerbs.includes(v)).slice(0, 10);

  let verbStatus: 'pass' | 'warning' | 'fail' = 'fail';
  let verbEarned = 0;
  let verbRec = 'Use strong action verbs (e.g. Managed, Developed, Orchestrated, Optimized).';

  if (detectedActionVerbs.length >= 5) {
    verbStatus = 'pass';
    verbEarned = 8;
    verbRec = `Detected ${detectedActionVerbs.length} high-impact action verbs across your resume.`;
  } else if (detectedActionVerbs.length >= 2) {
    verbStatus = 'warning';
    verbEarned = 5;
    verbRec = `Found only ${detectedActionVerbs.length} action verbs. Try replacing passive phrases with dynamic verbs.`;
  }

  checklist.push({
    id: 'action_verbs_check',
    category: 'experience',
    title: 'High-Impact Action Verbs',
    description: 'ATS scoring systems favor resumes highlighting active contributions over passive tasks.',
    status: verbStatus,
    weight: 8,
    earned: verbEarned,
    recommendation: verbRec,
    targetTab: 'experience'
  });

  // Scan Quantifiable Metrics (%, numbers, $, Tk, BDT, KPI, etc.)
  const metricRegex = /\b(\d+([.,]\d+)?\s*(%|percent|k|m|million|usd|\$|tk|bdt|hours|days|teams|users|clients|projects|increase|growth))\b|\b(\d{1,3}%)\b/gi;
  const matchedMetrics = fullText.match(metricRegex) || [];
  const uniqueMetrics = Array.from(new Set(matchedMetrics));

  let metricStatus: 'pass' | 'warning' | 'fail' = 'warning';
  let metricEarned = 3;
  let metricRec = 'Include measurable results (e.g. "Increased sales by 20%", "Managed team of 5", "Reduced processing time by 30%").';

  if (uniqueMetrics.length >= 3) {
    metricStatus = 'pass';
    metricEarned = 7;
    metricRec = `Found ${uniqueMetrics.length} measurable metrics. Excellent demonstration of tangible value.`;
  } else if (uniqueMetrics.length >= 1) {
    metricStatus = 'pass';
    metricEarned = 5;
    metricRec = `Found ${uniqueMetrics.length} metric. Add 2 more data points for higher ATS ranking.`;
  }

  checklist.push({
    id: 'measurable_metrics_check',
    category: 'experience',
    title: 'Measurable Achievements & Metrics',
    description: 'Quantifying results with percentages, quantities, or currency gives proof of performance.',
    status: metricStatus,
    weight: 7,
    earned: metricEarned,
    recommendation: metricRec,
    targetTab: 'experience'
  });

  // 4. SKILLS & KEYWORD DENSITY
  const totalSkillsCount =
    (cvData.skills?.technical?.length || 0) +
    (cvData.skills?.tools?.length || 0) +
    (cvData.skills?.soft?.length || 0);

  let skillsStatus: 'pass' | 'warning' | 'fail' = 'fail';
  let skillsEarned = 0;
  let skillsRec = 'Add at least 5-10 core skills matching your target job.';

  if (totalSkillsCount >= 8) {
    skillsStatus = 'pass';
    skillsEarned = 14;
    skillsRec = `Strong skills coverage with ${totalSkillsCount} distinct skills logged.`;
  } else if (totalSkillsCount >= 4) {
    skillsStatus = 'warning';
    skillsEarned = 9;
    skillsRec = `Found ${totalSkillsCount} skills. Adding 3-5 more specific tools or software will improve ATS keyword density.`;
  } else if (totalSkillsCount > 0) {
    skillsStatus = 'warning';
    skillsEarned = 5;
    skillsRec = `Only ${totalSkillsCount} skill(s) listed. Boost with common industry tools & competencies.`;
  }

  checklist.push({
    id: 'skills_count_check',
    category: 'skills',
    title: 'Core Skills & Competencies Density',
    description: 'ATS matching algorithms evaluate your skills section against recruiter search queries.',
    status: skillsStatus,
    weight: 14,
    earned: skillsEarned,
    recommendation: skillsRec,
    targetTab: 'skills'
  });

  // 5. EDUCATION & ACADEMIC CREDENTIALS
  const educations = cvData.education || [];
  const hasEducation = educations.length > 0;
  const hasDegreeAndInst = educations.some(e => Boolean(e.degree?.trim() && e.institution?.trim()));

  let eduStatus: 'pass' | 'warning' | 'fail' = 'fail';
  let eduEarned = 0;
  let eduRec = 'Add your highest academic qualification with institution and graduation year.';

  if (hasDegreeAndInst) {
    eduStatus = 'pass';
    eduEarned = 10;
    eduRec = 'Academic background is properly detailed with degree and institution.';
  } else if (hasEducation) {
    eduStatus = 'warning';
    eduEarned = 6;
    eduRec = 'Ensure both Degree Name and Institution Name are filled in Education entries.';
  }

  checklist.push({
    id: 'education_check',
    category: 'education',
    title: 'Academic Degree & Institution',
    description: 'Degree verification is an essential standard criterion in hiring algorithms.',
    status: eduStatus,
    weight: 10,
    earned: eduEarned,
    recommendation: eduRec,
    targetTab: 'education'
  });

  // 6. ATS FORMATTING & SECTION STRUCTURE
  // Check total word count
  let lengthStatus: 'pass' | 'warning' | 'fail' = 'pass';
  let lengthEarned = 5;
  let lengthRec = `Overall word count is healthy (${totalWords} words).`;

  if (totalWords < 120) {
    lengthStatus = 'warning';
    lengthEarned = 2;
    lengthRec = `Resume content is sparse (${totalWords} words). Add more detail to sections.`;
  } else if (totalWords > 900) {
    lengthStatus = 'warning';
    lengthEarned = 3;
    lengthRec = `Resume is quite lengthy (${totalWords} words). Ensure it stays within a concise layout.`;
  }

  checklist.push({
    id: 'word_count_check',
    category: 'format',
    title: 'Document Content Depth',
    description: 'Standard 1-2 page CVs typically range between 250 and 700 words.',
    status: lengthStatus,
    weight: 5,
    earned: lengthEarned,
    recommendation: lengthRec,
    targetTab: 'personal'
  });

  // Check language or extra sections
  const hasLanguages = Boolean(cvData.languages && cvData.languages.length > 0);
  checklist.push({
    id: 'languages_check',
    category: 'format',
    title: 'Languages Proficiency Section',
    description: 'Bilingual or multilingual skills provide competitive advantage in global & local screening.',
    status: hasLanguages ? 'pass' : 'warning',
    weight: 5,
    earned: hasLanguages ? 5 : 2,
    recommendation: hasLanguages
      ? `${cvData.languages?.length} language(s) listed.`
      : 'Add languages (e.g. English, Bengali) with proficiency levels.',
    targetTab: 'languages'
  });

  // Calculate scores
  const totalWeight = checklist.reduce((sum, item) => sum + item.weight, 0);
  const totalEarned = checklist.reduce((sum, item) => sum + item.earned, 0);
  const overallScore = Math.min(100, Math.round((totalEarned / totalWeight) * 100));

  let grade: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor' = 'Needs Improvement';
  let color = 'text-amber-500';

  if (overallScore >= 85) {
    grade = 'Excellent';
    color = 'text-emerald-500';
  } else if (overallScore >= 70) {
    grade = 'Good';
    color = 'text-blue-500';
  } else if (overallScore >= 50) {
    grade = 'Needs Improvement';
    color = 'text-amber-500';
  } else {
    grade = 'Poor';
    color = 'text-red-500';
  }

  // Calculate category breakdowns
  const categoryScores = {
    contact: calculateCategoryScore(checklist, 'contact'),
    summary: calculateCategoryScore(checklist, 'summary'),
    experience: calculateCategoryScore(checklist, 'experience'),
    skills: calculateCategoryScore(checklist, 'skills'),
    education: calculateCategoryScore(checklist, 'education'),
    format: calculateCategoryScore(checklist, 'format')
  };

  // Industry Keyword Matcher
  const targetKeywords = INDUSTRY_KEYWORDS[industry] || INDUSTRY_KEYWORDS.general;
  const industryKeywordMatches: KeywordMatchResult[] = targetKeywords.map(keyword => ({
    keyword,
    found: fullText.includes(keyword.toLowerCase()),
    category: industry
  }));

  const matchedIndustryKeywords = industryKeywordMatches.filter(k => k.found).map(k => k.keyword);
  const missingIndustryKeywords = industryKeywordMatches.filter(k => !k.found).map(k => k.keyword);
  const matchedKeywordCount = matchedIndustryKeywords.length;
  const totalIndustryKeywords = targetKeywords.length;
  const keywordMatchPercentage = totalIndustryKeywords > 0 
    ? Math.round((matchedKeywordCount / totalIndustryKeywords) * 100) 
    : 0;

  // Build Prioritized Top Actionable Suggestions
  const topSuggestions: ATSSuggestion[] = [];

  // 1. Missing keywords suggestion
  if (missingIndustryKeywords.length > 0) {
    topSuggestions.push({
      id: 'missing_keywords',
      title: `Add target ${industry.replace('_', ' ')} keywords`,
      description: `Your CV is missing top industry competencies like ${missingIndustryKeywords.slice(0, 3).map(k => `"${k}"`).join(', ')}.`,
      severity: missingIndustryKeywords.length > 8 ? 'high' : 'medium',
      category: 'skills',
      targetTab: 'skills',
      actionLabel: 'Add to Skills',
      suggestedItems: missingIndustryKeywords.slice(0, 6)
    });
  }

  // 2. Action verbs suggestion
  if (detectedActionVerbs.length < 5) {
    topSuggestions.push({
      id: 'missing_action_verbs',
      title: 'Strengthen role descriptions with active verbs',
      description: `Only ${detectedActionVerbs.length} high-impact action verbs detected. Use verbs like ${missingActionVerbs.slice(0, 4).join(', ')}.`,
      severity: detectedActionVerbs.length < 2 ? 'high' : 'medium',
      category: 'experience',
      targetTab: 'experience',
      actionLabel: 'Enhance Experience',
      suggestedItems: missingActionVerbs.slice(0, 6)
    });
  }

  // 3. Measurable metrics
  if (uniqueMetrics.length < 2) {
    topSuggestions.push({
      id: 'missing_metrics',
      title: 'Include quantifiable results & numbers',
      description: 'Add specific figures, percentages, or scale (e.g., "boosted speed by 35%", "led team of 4").',
      severity: 'medium',
      category: 'experience',
      targetTab: 'experience',
      actionLabel: 'Add Metrics'
    });
  }

  // 4. Summary check
  if (summaryLength === 0) {
    topSuggestions.push({
      id: 'empty_summary',
      title: 'Add a professional career summary',
      description: 'Recruiter screeners look for a 3–5 sentence executive summary at the top of your CV.',
      severity: 'high',
      category: 'summary',
      targetTab: 'summary',
      actionLabel: 'Write Summary'
    });
  } else if (summaryLength < 30) {
    topSuggestions.push({
      id: 'short_summary',
      title: 'Expand summary with target skills',
      description: `Your summary is only ${summaryLength} words. Aim for 40–100 words with your specialization.`,
      severity: 'low',
      category: 'summary',
      targetTab: 'summary',
      actionLabel: 'Expand Summary'
    });
  }

  // 5. Contact information
  if (!hasValidEmail || !hasPhone) {
    topSuggestions.push({
      id: 'contact_missing',
      title: 'Complete essential contact details',
      description: 'Ensure your direct email address and mobile number are formatted cleanly.',
      severity: 'high',
      category: 'contact',
      targetTab: 'personal',
      actionLabel: 'Fix Contact Info'
    });
  }

  // 6. Skills count
  if (totalSkillsCount < 5) {
    topSuggestions.push({
      id: 'low_skills',
      title: 'List more technical and soft skills',
      description: `Currently ${totalSkillsCount} skills listed. Most ATS filters score highest with 8–15 relevant skills.`,
      severity: 'high',
      category: 'skills',
      targetTab: 'skills',
      actionLabel: 'Add More Skills'
    });
  }

  // Target Job Description Keyword Scanner (if provided by user)
  let jobDescriptionMatchScore: number | undefined;
  let jobDescriptionMatchedKeywords: string[] | undefined;
  let jobDescriptionMissingKeywords: string[] | undefined;

  if (targetJobDescription && targetJobDescription.trim().length > 15) {
    const jdTokens = Array.from(new Set(
      (targetJobDescription.toLowerCase().match(/\b[a-z]{3,20}\b/g) || [])
        .filter(w => !['the', 'and', 'for', 'with', 'you', 'will', 'are', 'our', 'that', 'this', 'have', 'from', 'your', 'about', 'must'].includes(w))
    )).slice(0, 30);

    if (jdTokens.length > 0) {
      const matched = jdTokens.filter(k => fullText.includes(k));
      const missing = jdTokens.filter(k => !fullText.includes(k));
      jobDescriptionMatchScore = Math.round((matched.length / jdTokens.length) * 100);
      jobDescriptionMatchedKeywords = matched;
      jobDescriptionMissingKeywords = missing;
    }
  }

  return {
    overallScore,
    grade,
    color,
    checklist,
    categoryScores,
    detectedActionVerbs,
    missingActionVerbs,
    metricsDetected: uniqueMetrics,
    wordCount: totalWords,
    industryKeywordMatches,
    matchedKeywordCount,
    totalIndustryKeywords,
    keywordMatchPercentage,
    missingIndustryKeywords,
    matchedIndustryKeywords,
    topSuggestions,
    jobDescriptionMatchScore,
    jobDescriptionMatchedKeywords,
    jobDescriptionMissingKeywords
  };
}

function calculateCategoryScore(checklist: ATSCheckItem[], category: string): number {
  const items = checklist.filter(i => i.category === category);
  if (items.length === 0) return 100;
  const totalWeight = items.reduce((s, i) => s + i.weight, 0);
  const totalEarned = items.reduce((s, i) => s + i.earned, 0);
  return Math.round((totalEarned / totalWeight) * 100);
}
