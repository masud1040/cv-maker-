import React, { useState, useRef, useEffect } from 'react';
import { CVData, TemplateId } from '../../types/cv';
import {
  TEMPLATES,
  SAMPLE_STUDENT_CV,
  SAMPLE_GENERAL_CV,
  SAMPLE_BIODATA_CV,
  SAMPLE_DEVELOPER_CV,
  SAMPLE_HR_CV,
  SAMPLE_MODERN_CV,
  getBlankCVData,
  getSampleDataForTemplate
} from '../../data/templates';
import { PersonalInfoForm } from './PersonalInfoForm';
import { SummaryForm } from './SummaryForm';
import { EducationForm } from './EducationForm';
import { ExperienceForm } from './ExperienceForm';
import { ProjectsForm } from './ProjectsForm';
import { SkillsForm } from './SkillsForm';
import { CertificationsForm } from './CertificationsForm';
import { ExtracurricularForm } from './ExtracurricularForm';
import { LanguagesForm } from './LanguagesForm';
import { AwardsForm } from './AwardsForm';
import { ReferencesForm } from './ReferencesForm';
import { SignatureForm } from './SignatureForm';
import { CustomSectionsForm } from './CustomSectionsForm';
import { SectionOrderManager } from './SectionOrderManager';
import { BioDataForm } from './BioDataForm';
import { ATSSectionView } from './ATSSectionView';
import { ATSAnalysisModal } from './ATSAnalysisModal';
import { ATSRealtimeIndicator } from './ATSRealtimeIndicator';
import { AIImproveModal, AIImproveTarget } from './AIImproveModal';
import { DesignTab } from './DesignTab';
import { analyzeCVForATS } from '../../utils/atsScanner';
import { LiveCVPreview } from '../preview/LiveCVPreview';
import { PreviewModal } from '../PreviewModal';
import { generatePDFFromElement } from '../../utils/pdfExport';
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  RotateCcw,
  User,
  FileText,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Wrench,
  Award,
  Users,
  Languages,
  Trophy,
  UserCheck,
  FolderPlus,
  Layers,
  Palette,
  PenTool,
  Contact,
  Sun,
  Moon,
  ChevronDown,
  MoreVertical,
  Type,
  Loader2,
  Target,
  Sparkles,
  Eraser,
  Sparkle
} from 'lucide-react';


interface CVEditorProps {
  cvData: CVData;
  onSave: (data: CVData) => void;
  onBackToTemplates: () => void;
  onBackToMyCVs: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

type EditorTab =
  | 'personal'
  | 'biodata'
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
  | 'signature'
  | 'custom'
  | 'order'
  | 'ats';

export const CVEditor: React.FC<CVEditorProps> = ({
  cvData,
  onSave,
  onBackToTemplates,
  onBackToMyCVs,
  darkMode = false,
  onToggleDarkMode
}) => {
  const [data, setData] = useState<CVData>(cvData);
  const [workspaceMode, setWorkspaceMode] = useState<'editor' | 'design'>('editor');
  const [mobileTab, setMobileTab] = useState<'editor' | 'design' | 'preview'>('editor');
  const [showSampleInDesign, setShowSampleInDesign] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<EditorTab>('personal');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isATSModalOpen, setIsATSModalOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('general');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiModalTarget, setAiModalTarget] = useState<AIImproveTarget | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [showMobileMoreMenu, setShowMobileMoreMenu] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Compute preview data: when in design mode with empty data or toggle ON, show populated template sample
  const isDataEmpty = !data.personalInfo.fullName && !data.summary && (!data.experience || data.experience.length === 0) && (!data.education || data.education.length === 0);
  const sampleDataForCurrentTemplate = getSampleDataForTemplate(data.templateId);

  const displayPreviewData: CVData = (workspaceMode === 'design' && (showSampleInDesign || isDataEmpty))
    ? {
        ...sampleDataForCurrentTemplate,
        id: data.id,
        title: data.title,
        templateId: data.templateId,
        fontSize: data.fontSize,
        sectionOrder: data.sectionOrder || sampleDataForCurrentTemplate.sectionOrder,
        sectionVisibility: data.sectionVisibility || sampleDataForCurrentTemplate.sectionVisibility
      }
    : data;

  // Real-time ATS report calculation
  const atsReport = analyzeCVForATS(data, '', selectedIndustry);

  // Sync internal state when prop changes
  useEffect(() => {
    setData(cvData);
  }, [cvData.id]);

  // Close mobile more menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setShowMobileMoreMenu(false);
      }
    };
    if (showMobileMoreMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMobileMoreMenu]);

  // Auto-save debouncer
  useEffect(() => {
    setSaveStatus('saving');
    const timer = setTimeout(() => {
      onSave(data);
      setSaveStatus('saved');
    }, 400);
    return () => clearTimeout(timer);
  }, [data]);

  const handleTemplateChange = (templateId: TemplateId) => {
    setData(prev => ({
      ...prev,
      templateId
    }));
  };

  const handleClearAllFields = () => {
    if (confirm('সব ফিল্ড খালি করতে চান? (This will clear all text inputs so you start with a blank CV)')) {
      const blank = getBlankCVData(data.templateId, data.title);
      setData({
        ...blank,
        id: data.id
      });
      setShowMobileMoreMenu(false);
    }
  };

  const handleLoadSampleData = () => {
    if (confirm('স্যাম্পল তথ্য লোড করতে চান? (This will load demo content)')) {
      let baseSample = SAMPLE_STUDENT_CV;
      if (data.templateId === 'general-cv') baseSample = SAMPLE_GENERAL_CV;
      else if (data.templateId === 'job-biodata') baseSample = SAMPLE_BIODATA_CV;
      else if (data.templateId === 'developer-clean') baseSample = SAMPLE_DEVELOPER_CV;
      else if (data.templateId === 'hr-professional') baseSample = SAMPLE_HR_CV;
      else if (data.templateId === 'modern-two-column') baseSample = SAMPLE_MODERN_CV;

      setData({
        ...baseSample,
        id: data.id,
        title: data.title,
        templateId: data.templateId
      });
      setShowMobileMoreMenu(false);
    }
  };


  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      const targetEl = previewRef.current?.querySelector('[data-pdf-content="true"]') as HTMLElement;
      if (targetEl) {
        await generatePDFFromElement(targetEl, data.personalInfo.fullName);
      }
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Helper to check if section has content
  const hasContent = (tabId: EditorTab): boolean => {
    switch (tabId) {
      case 'personal':
        return Boolean(data.personalInfo.fullName);
      case 'biodata':
        return Boolean(data.bioData?.fatherName || data.bioData?.permanentAddress || data.bioData?.nidNumber);
      case 'summary':
        return Boolean(data.summary && data.summary.trim().length > 0);
      case 'education':
        return (data.education || []).length > 0;
      case 'experience':
        return (data.experience || []).length > 0;
      case 'projects':
        return (data.projects || []).length > 0;
      case 'skills':
        return Boolean(
          (data.skills?.technical || []).length ||
          (data.skills?.soft || []).length ||
          (data.skills?.tools || []).length
        );
      case 'certifications':
        return (data.certifications || []).length > 0;
      case 'extracurricular':
        return (data.extracurricular || []).length > 0;
      case 'languages':
        return (data.languages || []).length > 0;
      case 'awards':
        return (data.awards || []).length > 0;
      case 'references':
        return Boolean(data.references?.items?.length);
      case 'signature':
        return Boolean(data.signature?.enabled);
      case 'custom':
        return (data.customSections || []).length > 0;
      default:
        return false;
    }
  };

  const handleAddSkill = (newSkill: string) => {
    if (!newSkill || !newSkill.trim()) return;
    const clean = newSkill.trim();
    setData(prev => {
      const currentTech = prev.skills?.technical || [];
      const currentTools = prev.skills?.tools || [];
      const currentSoft = prev.skills?.soft || [];
      if ([...currentTech, ...currentTools, ...currentSoft].includes(clean)) {
        return prev;
      }
      return {
        ...prev,
        skills: {
          ...prev.skills,
          technical: [...currentTech, clean],
          tools: currentTools,
          soft: currentSoft
        }
      };
    });
  };

  const handleOpenAIModal = (target?: AIImproveTarget) => {
    setAiModalTarget(target || null);
    setIsAIModalOpen(true);
  };

  const handleApplyAIText = (target: AIImproveTarget, newText: string) => {
    if (!newText) return;

    setData(prev => {
      if (target.sectionKey === 'summary') {
        return { ...prev, summary: newText };
      }

      if (target.sectionKey === 'experience' && target.itemId) {
        const updatedExp = (prev.experience || []).map(exp => {
          if (exp.id === target.itemId) {
            if (target.fieldName === 'bullet' && target.subIndex !== undefined) {
              const newBullets = [...(exp.bullets || [])];
              newBullets[target.subIndex] = newText;
              return { ...exp, bullets: newBullets };
            }
            return { ...exp, description: newText };
          }
          return exp;
        });
        return { ...prev, experience: updatedExp };
      }

      if (target.sectionKey === 'project' && target.itemId) {
        const updatedProj = (prev.projects || []).map(proj => {
          if (proj.id === target.itemId) {
            if (target.fieldName === 'bullet' && target.subIndex !== undefined) {
              const newBullets = [...(proj.bullets || [])];
              newBullets[target.subIndex] = newText;
              return { ...proj, bullets: newBullets };
            }
            return { ...proj, description: newText };
          }
          return proj;
        });
        return { ...prev, projects: updatedProj };
      }

      if (target.sectionKey === 'custom' && target.itemId) {
        const updatedCust = (prev.customSections || []).map(cust => {
          if (cust.id === target.itemId) {
            return { ...cust, content: newText };
          }
          return cust;
        });
        return { ...prev, customSections: updatedCust };
      }

      return prev;
    });
  };

  const isSectionVisible = (secKey: string): boolean => {
    return data.sectionVisibility?.[secKey] !== false;
  };

  const toggleSectionVisibility = (secKey: string) => {
    setData(prev => {
      const currentVis = prev.sectionVisibility || {};
      const nextState = currentVis[secKey] === false ? true : false;
      return {
        ...prev,
        sectionVisibility: {
          ...currentVis,
          [secKey]: nextState
        }
      };
    });
  };

  const renderSectionHeader = (secKey: string, title: string, subtitle?: string, actionBtn?: React.ReactNode) => {
    const visible = isSectionVisible(secKey);
    return (
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {title}
            </h3>
            {!visible && (
              <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Hidden
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {actionBtn}
          <button
            type="button"
            onClick={() => toggleSectionVisibility(secKey)}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition ${
              visible
                ? 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60'
            }`}
            title={visible ? 'Hide section from CV document' : 'Show section in CV document'}
          >
            {visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px] font-semibold">{visible ? 'Visible' : 'Hidden'}</span>
          </button>
        </div>
      </div>
    );
  };

  const navTabs: { id: EditorTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'biodata', label: 'Bio Data', icon: Contact },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'certifications', label: 'Certs', icon: Award },
    { id: 'extracurricular', label: 'Activities', icon: Users },
    { id: 'languages', label: 'Languages', icon: Languages },
    { id: 'awards', label: 'Awards', icon: Trophy },
    { id: 'references', label: 'References', icon: UserCheck },
    { id: 'signature', label: 'Signature', icon: PenTool },
    { id: 'custom', label: 'Custom', icon: FolderPlus },
    { id: 'order', label: 'Reorder', icon: Layers },
    { id: 'ats', label: 'ATS Scan', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col font-sans transition-colors w-full max-w-full overflow-x-hidden">
      {/* Sticky Top Toolbar - Mobile First Responsive Architecture */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-2 sm:px-4 lg:px-6 h-14 flex items-center justify-between gap-1.5 sm:gap-3 transition-colors shadow-xs w-full">
        {/* Left Side: Back Button + Title + Status */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 flex-1 max-w-[50%] sm:max-w-[45%]">
          <button
            onClick={onBackToMyCVs}
            className="inline-flex items-center gap-1 p-2 sm:px-2.5 sm:py-1.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0 font-medium text-xs border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800 sm:bg-transparent sm:dark:bg-transparent"
            title="Back to Resumes"
            aria-label="Back to Resumes"
          >
            <ArrowLeft className="w-4 h-4 text-slate-900 dark:text-white" />
            <span className="hidden sm:inline font-semibold">Back</span>
          </button>

          <div className="flex items-center gap-2 min-w-0 flex-1">
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Resume Title"
              className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white bg-transparent hover:bg-slate-100/80 dark:hover:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-900 px-1.5 sm:px-2 py-1 rounded-md border border-transparent focus:border-slate-300 dark:focus:border-slate-700 focus:outline-none transition-all truncate w-full"
            />
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium shrink-0">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span>{saveStatus === 'saving' ? 'Saving...' : 'Saved'}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Template Selector, ATS Score, Font Size, Theme, Preview, Download */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Template Switcher Dropdown */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-300 max-w-[110px] xs:max-w-[140px] sm:max-w-[180px]">
            <Palette className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 shrink-0" />
            <select
              value={data.templateId}
              onChange={(e) => handleTemplateChange(e.target.value as TemplateId)}
              className="bg-transparent font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer text-xs w-full truncate"
              title="Change Template"
            >
              {TEMPLATES.map(t => (
                <option key={t.id} value={t.id} className="dark:bg-slate-900 dark:text-white">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* ATS Analysis Score Pill */}
          <button
            type="button"
            onClick={() => setIsATSModalOpen(true)}
            className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-xs font-bold rounded-lg border transition shadow-2xs ${
              atsReport.overallScore >= 80
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800/60'
                : atsReport.overallScore >= 60
                ? 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800/60'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 dark:text-amber-300 dark:border-amber-800/60'
            }`}
            title="Open Live ATS Scanner & Optimization Checklist"
          >
            <Target className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">ATS:</span>
            <span className="font-mono">{atsReport.overallScore}%</span>
          </button>

          {/* AI Text Improver Button */}
          <button
            type="button"
            onClick={() => handleOpenAIModal()}
            className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 text-xs font-bold rounded-lg border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 transition shadow-2xs"
            title="AI Text Improvement & Tone Optimizer (Gemini)"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden xs:inline">AI Polish</span>
          </button>

          {/* Desktop Font Size Selector */}
          <div className="hidden xl:flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setData(p => ({ ...p, fontSize: 'compact' }))}
              className={`px-2 py-0.5 rounded-md font-medium text-[11px] transition-colors ${
                data.fontSize === 'compact'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Compact
            </button>
            <button
              onClick={() => setData(p => ({ ...p, fontSize: 'standard' }))}
              className={`px-2 py-0.5 rounded-md font-medium text-[11px] transition-colors ${
                data.fontSize === 'standard' || !data.fontSize
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setData(p => ({ ...p, fontSize: 'spacious' }))}
              className={`px-2 py-0.5 rounded-md font-medium text-[11px] transition-colors ${
                data.fontSize === 'spacious'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Spacious
            </button>
          </div>

          {/* Theme Toggle Button */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 sm:p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          )}

          {/* Desktop Clear All Fields button */}
          <button
            onClick={handleClearAllFields}
            className="hidden md:inline-flex p-1.5 sm:p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Clear all text fields (সব ফিল্ড খালি করুন)"
          >
            <Eraser className="w-3.5 h-3.5" />
          </button>


          {/* Desktop Preview PDF modal trigger */}
          <button
            onClick={() => setIsPreviewModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Full Preview</span>
          </button>

          {/* Mobile More Options Dropdown */}
          <div className="relative md:hidden" ref={mobileMenuRef}>
            <button
              type="button"
              onClick={() => setShowMobileMoreMenu(prev => !prev)}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
              title="More Actions"
              aria-label="More actions"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMobileMoreMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Text Density
                </div>
                <div className="grid grid-cols-3 gap-1 px-3 py-1 mb-2">
                  <button
                    onClick={() => setData(p => ({ ...p, fontSize: 'compact' }))}
                    className={`py-1 text-[11px] rounded font-medium border ${
                      data.fontSize === 'compact'
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent font-bold'
                        : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Compact
                  </button>
                  <button
                    onClick={() => setData(p => ({ ...p, fontSize: 'standard' }))}
                    className={`py-1 text-[11px] rounded font-medium border ${
                      data.fontSize === 'standard' || !data.fontSize
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent font-bold'
                        : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setData(p => ({ ...p, fontSize: 'spacious' }))}
                    className={`py-1 text-[11px] rounded font-medium border ${
                      data.fontSize === 'spacious'
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent font-bold'
                        : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Spacious
                  </button>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    setShowMobileMoreMenu(false);
                    setIsATSModalOpen(true);
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 flex items-center gap-2"
                >
                  <Target className="w-4 h-4 text-emerald-500" />
                  <span>ATS Scanner ({atsReport.overallScore}%)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowMobileMoreMenu(false);
                    handleOpenAIModal();
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span>AI Polish & Rewrite</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowMobileMoreMenu(false);
                    setIsPreviewModalOpen(true);
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-slate-400" />
                  Full Document Preview
                </button>

                <button
                  type="button"
                  onClick={handleClearAllFields}
                  className="w-full px-3.5 py-2 text-left text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2"
                >
                  <Eraser className="w-4 h-4 text-red-500" />
                  Clear All Fields (সব ফিল্ড খালি করুন)
                </button>

              </div>
            )}
          </div>

          {/* Download PDF CTA */}
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg shadow-xs transition-colors disabled:opacity-50 shrink-0"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span className="hidden xs:inline sm:inline">PDF</span>
                <span className="hidden sm:inline">Download</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Primary Clean Sub-Header & Navigation Bar */}
      <div className="bg-slate-50/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 py-2 flex items-center justify-between gap-2 shrink-0">
        {/* Workspace Mode Tabs (Desktop + Mobile Unified) */}
        <div className="flex items-center bg-slate-200/70 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-300/60 dark:border-slate-700/60 text-xs font-semibold">
          {/* Editor Tab */}
          <button
            type="button"
            onClick={() => {
              setWorkspaceMode('editor');
              setMobileTab('editor');
            }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              (mobileTab === 'editor' && workspaceMode === 'editor')
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Content Editor</span>
          </button>

          {/* Design & Style Tab */}
          <button
            type="button"
            onClick={() => {
              setWorkspaceMode('design');
              setMobileTab('design');
            }}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              workspaceMode === 'design' || mobileTab === 'design'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-indigo-500" />
            <span>Design & Themes</span>
          </button>

          {/* Mobile Live Document Tab */}
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`lg:hidden px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              mobileTab === 'preview'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-500" />
            <span>Live Document</span>
          </button>
        </div>

        {/* Right Actions: Quick Load Sample & Clear */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSampleData}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition cursor-pointer"
            title="Load demo sample text"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Load Sample</span>
          </button>

          <button
            type="button"
            onClick={handleClearAllFields}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg border border-slate-200 dark:border-slate-700 transition cursor-pointer"
            title="Clear all fields"
          >
            <Eraser className="w-3.5 h-3.5 text-red-500" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Main Two-Panel Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full max-w-full">
        {/* LEFT COLUMN: FORM EDITOR or DESIGN CENTER */}
        <div
          className={`w-full lg:w-[46%] xl:w-[42%] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-[calc(100vh-108px)] lg:h-[calc(100vh-108px)] overflow-hidden min-w-0 ${
            mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {workspaceMode === 'design' || mobileTab === 'design' ? (
            /* DESIGN CENTER VIEW */
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-white dark:bg-slate-900">
              <DesignTab
                currentTemplateId={data.templateId}
                fontSize={data.fontSize}
                sectionVisibility={data.sectionVisibility || {}}
                sectionOrder={data.sectionOrder}
                showSamplePreview={showSampleInDesign}
                onToggleSamplePreview={setShowSampleInDesign}
                onSelectTemplate={(templateId) => setData(prev => ({ ...prev, templateId }))}
                onChangeFontSize={(fontSize) => setData(prev => ({ ...prev, fontSize }))}
                onToggleVisibility={toggleSectionVisibility}
                onChangeSectionOrder={(sectionOrder) => setData(prev => ({ ...prev, sectionOrder }))}
              />
            </div>
          ) : (
            /* FORM EDITOR VIEW */
            <>
              {/* Real-time ATS Score & Industry Keywords Assistant */}
              <ATSRealtimeIndicator
                cvData={data}
                selectedIndustry={selectedIndustry}
                onChangeIndustry={setSelectedIndustry}
                onNavigateToTab={(tabId) => setActiveTab(tabId as EditorTab)}
                onAddSkill={handleAddSkill}
                onOpenFullModal={() => setIsATSModalOpen(true)}
                activeTab={activeTab}
              />

              {/* Section Navigation Tabs Strip */}
              <div className="flex items-center overflow-x-auto border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 px-2 py-1.5 custom-scrollbar shrink-0 gap-1 w-full">
                {navTabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  const filled = hasContent(tab.id);
                  const isExplicitlyHidden = data.sectionVisibility?.[tab.id] === false;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-xs'
                          : isExplicitlyHidden
                          ? 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400 hover:bg-slate-200/40'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white dark:text-slate-900' : isExplicitlyHidden ? 'text-slate-400 dark:text-slate-600' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span className={isExplicitlyHidden && !isActive ? 'line-through text-slate-400 dark:text-slate-500' : ''}>
                        {tab.label}
                      </span>
                      {isExplicitlyHidden && (
                        <span className="text-[9px] font-bold uppercase px-1 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          OFF
                        </span>
                      )}
                      {filled && !isActive && !isExplicitlyHidden && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block ml-0.5"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Form Content Area */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 space-y-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 custom-scrollbar">
                {activeTab === 'personal' && (
                  <PersonalInfoForm
                    data={data.personalInfo}
                    templateId={data.templateId}
                    onChange={(personalInfo) => setData(prev => ({ ...prev, personalInfo }))}
                  />
                )}

                {activeTab === 'biodata' && (
                  <div>
                    {renderSectionHeader('biodata', 'Bio-Data / Personal Details', 'Traditional personal and parental background fields')}
                    <BioDataForm
                      data={data.bioData || {}}
                      personalInfo={data.personalInfo}
                      onChange={(bioData) => setData(prev => ({ ...prev, bioData }))}
                      onUpdatePersonalInfo={(personalInfo) => setData(prev => ({ ...prev, personalInfo }))}
                    />
                  </div>
                )}

                {activeTab === 'summary' && (
                  <div>
                    {renderSectionHeader(
                      'summary',
                      'Career Summary / Objective',
                      'Concise overview highlighting core competencies',
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenAIModal({
                            sectionKey: 'summary',
                            fieldName: 'description',
                            initialText: data.summary || '',
                          })
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 rounded-lg border border-indigo-200 dark:border-indigo-800 transition"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                        <span>AI Polish</span>
                      </button>
                    )}
                    <SummaryForm
                      summary={data.summary}
                      onChange={(summary) => setData(prev => ({ ...prev, summary }))}
                      onOpenAIModal={() =>
                        handleOpenAIModal({
                          sectionKey: 'summary',
                          fieldName: 'description',
                          initialText: data.summary || '',
                        })
                      }
                    />
                  </div>
                )}

                {activeTab === 'education' && (
                  <div>
                    {renderSectionHeader('education', 'Academic Education', 'Degrees, institutions, grades, and passing years')}
                    <EducationForm
                      entries={data.education || []}
                      onChange={(education) => setData(prev => ({ ...prev, education }))}
                    />
                  </div>
                )}

                {activeTab === 'experience' && (
                  <div>
                    {renderSectionHeader('experience', 'Work Experience', 'Professional roles, responsibilities, and achievements')}
                    <ExperienceForm
                      entries={data.experience || []}
                      onChange={(experience) => setData(prev => ({ ...prev, experience }))}
                      onOpenAIModal={handleOpenAIModal}
                    />
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div>
                    {renderSectionHeader('projects', 'Key Projects', 'Notable software, research, or organizational projects')}
                    <ProjectsForm
                      entries={data.projects || []}
                      onChange={(projects) => setData(prev => ({ ...prev, projects }))}
                      onOpenAIModal={handleOpenAIModal}
                    />
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div>
                    {renderSectionHeader('skills', 'Skills & Competencies', 'Technical skills, tools, frameworks, and proficiencies')}
                    <SkillsForm
                      skills={data.skills || { technical: [], soft: [], tools: [] }}
                      onChange={(skills) => setData(prev => ({ ...prev, skills }))}
                    />
                  </div>
                )}

                {activeTab === 'certifications' && (
                  <div>
                    {renderSectionHeader('certifications', 'Certifications & Training', 'Professional credentials and courses')}
                    <CertificationsForm
                      entries={data.certifications || []}
                      onChange={(certifications) => setData(prev => ({ ...prev, certifications }))}
                    />
                  </div>
                )}

                {activeTab === 'extracurricular' && (
                  <div>
                    {renderSectionHeader('extracurricular', 'Extracurricular & Leadership', 'Clubs, volunteer experience, and leadership roles')}
                    <ExtracurricularForm
                      entries={data.extracurricular || []}
                      onChange={(extracurricular) => setData(prev => ({ ...prev, extracurricular }))}
                    />
                  </div>
                )}

                {activeTab === 'languages' && (
                  <div>
                    {renderSectionHeader('languages', 'Languages Known', 'Spoken and written language proficiencies')}
                    <LanguagesForm
                      entries={data.languages || []}
                      onChange={(languages) => setData(prev => ({ ...prev, languages }))}
                    />
                  </div>
                )}

                {activeTab === 'awards' && (
                  <div>
                    {renderSectionHeader('awards', 'Awards & Honors', 'Competitions, scholarships, and special recognitions')}
                    <AwardsForm
                      entries={data.awards || []}
                      onChange={(awards) => setData(prev => ({ ...prev, awards }))}
                    />
                  </div>
                )}

                {activeTab === 'references' && (
                  <div>
                    {renderSectionHeader('references', 'References', 'Professional referees and contact verification')}
                    <ReferencesForm
                      data={data.references || { availableOnRequest: true, items: [] }}
                      onChange={(references) => setData(prev => ({ ...prev, references }))}
                    />
                  </div>
                )}

                {activeTab === 'signature' && (
                  <SignatureForm
                    signature={data.signature}
                    defaultName={data.personalInfo.fullName}
                    defaultTitle={data.personalInfo.professionalTitle}
                    onChange={(signature) => setData(prev => ({ ...prev, signature }))}
                  />
                )}

                {activeTab === 'custom' && (
                  <CustomSectionsForm
                    sections={data.customSections || []}
                    onChange={(customSections) => setData(prev => ({ ...prev, customSections }))}
                  />
                )}

                {activeTab === 'order' && (
                  <SectionOrderManager
                    sectionOrder={data.sectionOrder}
                    sectionVisibility={data.sectionVisibility}
                    onChange={(sectionOrder) => setData(prev => ({ ...prev, sectionOrder }))}
                    onToggleVisibility={toggleSectionVisibility}
                  />
                )}

                {activeTab === 'ats' && (
                  <ATSSectionView
                    cvData={data}
                    onNavigateToTab={(tabId) => setActiveTab(tabId as EditorTab)}
                    onAddSkill={handleAddSkill}
                    onOpenFullModal={() => setIsATSModalOpen(true)}
                    selectedIndustry={selectedIndustry}
                    onChangeIndustry={setSelectedIndustry}
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* RIGHT COLUMN: ARCHITECTURAL A4 DOCUMENT PREVIEW */}
        <div
          className={`w-full lg:w-[54%] xl:w-[58%] bg-slate-200/70 dark:bg-slate-950 h-[calc(100vh-108px)] lg:h-[calc(100vh-108px)] overflow-y-auto overflow-x-hidden p-2 sm:p-6 lg:p-8 flex flex-col items-center custom-scrollbar transition-colors ${
            mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}
          ref={previewRef}
        >
          <div className="w-full max-w-[794px] flex flex-col items-center">
            {workspaceMode === 'design' && (
              <div className="w-full mb-3 px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center justify-between gap-2 shadow-xs border border-slate-700">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  {(showSampleInDesign || isDataEmpty) ? 'Showing populated template preview' : 'Showing your entered data'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowSampleInDesign(!showSampleInDesign)}
                  className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-[11px] text-white font-bold transition cursor-pointer"
                >
                  {(showSampleInDesign || isDataEmpty) ? 'Show My Data' : 'Show Demo Sample'}
                </button>
              </div>
            )}

            <div className="bg-white text-slate-900 shadow-md shadow-slate-400/20 dark:shadow-black/60 rounded-xs transition-shadow w-full flex justify-center">
              <LiveCVPreview data={displayPreviewData} scale={0.92} />
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen PDF Preview Modal */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        data={data}
      />

      {/* Full ATS Analysis & Optimization Modal */}
      <ATSAnalysisModal
        isOpen={isATSModalOpen}
        onClose={() => setIsATSModalOpen(false)}
        cvData={data}
        onNavigateToTab={(tabId) => setActiveTab(tabId as EditorTab)}
        onAddSkill={handleAddSkill}
        selectedIndustry={selectedIndustry}
        onChangeIndustry={setSelectedIndustry}
      />

      {/* AI Text Improvement Modal */}
      <AIImproveModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        cvData={data}
        initialTarget={aiModalTarget}
        onApplyText={handleApplyAIText}
      />
    </div>
  );
};



