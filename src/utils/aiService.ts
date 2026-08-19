export type AIImprovementGoal =
  | 'executive'
  | 'action_oriented'
  | 'ats_optimized'
  | 'concise'
  | 'creative';

export interface AISuggestion {
  id: string;
  title: string;
  text: string;
  impactNote: string;
  keyChanges: string[];
  wordCount: number;
}

export interface AIImprovementResponse {
  original: string;
  sectionType: string;
  suggestions: AISuggestion[];
  source?: 'gemini' | 'fallback';
  note?: string;
  error?: string;
}

export interface ImproveTextParams {
  text: string;
  sectionType: 'summary' | 'experience_bullet' | 'experience_desc' | 'project_desc' | 'skills_list' | 'custom' | 'general';
  goal?: AIImprovementGoal;
  customInstructions?: string;
  context?: {
    jobTitle?: string;
    company?: string;
    skills?: string[];
    [key: string]: any;
  };
}

export interface KeywordSuggestions {
  actionVerbs: string[];
  technicalSkills: string[];
  softSkills: string[];
}

/**
 * Call server-side Gemini API endpoint to improve text with professional tone, impact, and ATS optimization.
 */
export async function improveCVText(params: ImproveTextParams): Promise<AIImprovementResponse> {
  try {
    const res = await fetch('/api/ai/improve-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Server responded with status ${res.status}`);
    }

    const data: AIImprovementResponse = await res.json();
    return data;
  } catch (error: any) {
    console.error('Failed to improve text via AI:', error);
    throw error;
  }
}

/**
 * Fetch top action verbs and keywords for a specific role and industry
 */
export async function fetchKeywordSuggestions(jobTitle: string, industry = 'Technology'): Promise<KeywordSuggestions> {
  try {
    const res = await fetch('/api/ai/suggest-keywords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobTitle, industry }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch keywords (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching keywords:', error);
    return {
      actionVerbs: ['Spearheaded', 'Architected', 'Engineered', 'Optimized', 'Delivered', 'Automated', 'Formulated', 'Pioneered'],
      technicalSkills: ['System Design', 'API Integration', 'Data Modeling', 'Workflow Automation', 'Quality Assurance'],
      softSkills: ['Cross-Functional Collaboration', 'Strategic Problem Solving', 'Agile Execution', 'Technical Leadership'],
    };
  }
}
