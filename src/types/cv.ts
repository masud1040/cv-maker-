export type TemplateId = 'ats-student' | 'ats-professional' | 'hr-professional';

export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  photoUrl?: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  gpa?: string;
  location?: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description?: string;
}

export interface ExperienceEntry {
  id: string;
  jobTitle: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  bullets: string[];
}

export interface ProjectEntry {
  id: string;
  name: string;
  date?: string;
  technologies?: string;
  link?: string;
  description: string;
  bullets: string[];
}

export interface SkillsData {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface CertificationEntry {
  id: string;
  name: string;
  organization: string;
  year: string;
  link?: string;
}

export interface ExtracurricularEntry {
  id: string;
  role: string;
  organization: string;
  date: string;
  description: string;
}

export type LanguageProficiency = 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';

export interface LanguageEntry {
  id: string;
  name: string;
  proficiency: LanguageProficiency;
}

export interface AwardEntry {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
}

export interface ReferencesData {
  availableOnRequest: boolean;
  items: ReferenceItem[];
}

export interface CustomItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomItem[];
}

export type SectionType =
  | 'summary'
  | 'education'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'extracurricular'
  | 'languages'
  | 'awards'
  | 'references'
  | string; // for custom sections

export interface SignatureData {
  enabled: boolean;
  signerName?: string;
  signerTitle?: string;
  date?: string;
  signatureImage?: string;
}

export interface CVData {
  id: string;
  title: string;
  templateId: TemplateId;
  createdAt: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: SkillsData;
  certifications: CertificationEntry[];
  extracurricular: ExtracurricularEntry[];
  languages: LanguageEntry[];
  awards: AwardEntry[];
  references: ReferencesData;
  customSections: CustomSection[];
  sectionOrder: SectionType[];
  signature?: SignatureData;
  fontSize?: 'compact' | 'standard' | 'spacious';
  accentColor?: string;
}

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  badge: string;
  category: 'ATS' | 'HR';
  tagline: string;
  description: string;
  features: string[];
  supportsPhoto: boolean;
  recommendedFor: string;
  previewThumbnail: string;
}
