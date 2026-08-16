import React, { useState, useRef, useEffect } from 'react';
import { CVData, TemplateId } from '../../types/cv';
import { TEMPLATES, SAMPLE_STUDENT_CV } from '../../data/templates';
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
import { LiveCVPreview } from '../preview/LiveCVPreview';
import { PreviewModal } from '../PreviewModal';
import { generatePDFFromElement } from '../../utils/pdfExport';
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Eye,
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
  ChevronDown
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
  | 'order';

export const CVEditor: React.FC<CVEditorProps> = ({
  cvData,
  onSave,
  onBackToTemplates,
  onBackToMyCVs,
  darkMode = false,
  onToggleDarkMode
}) => {
  const [data, setData] = useState<CVData>(cvData);
  const [activeTab, setActiveTab] = useState<EditorTab>('personal');
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const previewRef = useRef<HTMLDivElement>(null);

  // Sync internal state when prop changes
  useEffect(() => {
    setData(cvData);
  }, [cvData.id]);

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

  const handleReset = () => {
    if (confirm('Reset resume data? This will restore sample placeholder values.')) {
      setData({
        ...SAMPLE_STUDENT_CV,
        id: data.id,
        title: data.title
      });
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

  const navTabs: { id: EditorTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'biodata', label: 'Bio Data', icon: Contact },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'extracurricular', label: 'Activities', icon: Users },
    { id: 'languages', label: 'Languages', icon: Languages },
    { id: 'awards', label: 'Awards', icon: Trophy },
    { id: 'references', label: 'References', icon: UserCheck },
    { id: 'signature', label: 'Signature', icon: PenTool },
    { id: 'custom', label: 'Custom', icon: FolderPlus },
    { id: 'order', label: 'Reorder', icon: Layers }
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col font-sans transition-colors">
      {/* Sticky Top Toolbar */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 h-14 flex items-center justify-between gap-3 transition-colors shadow-2xs">
        {/* Left Side: Back + Title + Status */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBackToMyCVs}
            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors shrink-0"
            title="Back to Resumes"
            aria-label="Back to Resumes"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 min-w-0">
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Resume Title"
              className="font-bold text-sm text-slate-900 dark:text-white bg-transparent hover:bg-slate-100/70 dark:hover:bg-slate-800/70 focus:bg-white dark:focus:bg-slate-900 px-2 py-1 rounded-md border border-transparent focus:border-slate-300 dark:focus:border-slate-700 focus:outline-none transition-all truncate max-w-[160px] sm:max-w-[220px]"
            />
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span>{saveStatus === 'saving' ? 'Saving...' : 'Auto-saved'}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Template Selector, Font Size, Preview, Download */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Template Switcher Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-700 dark:text-slate-300">
            <Palette className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <select
              value={data.templateId}
              onChange={(e) => handleTemplateChange(e.target.value as TemplateId)}
              className="bg-transparent font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer text-xs pr-1"
            >
              {TEMPLATES.map(t => (
                <option key={t.id} value={t.id} className="dark:bg-slate-900 dark:text-white">
                  {t.name} ({t.category})
                </option>
              ))}
            </select>
          </div>

          {/* Font Size Selector */}
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
              className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          )}

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            title="Reset to sample data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Preview PDF modal trigger */}
          <button
            onClick={() => setIsPreviewModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Full Preview</span>
          </button>

          {/* Download PDF CTA */}
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg shadow-xs transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? 'Generating...' : 'Download PDF'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Workspace Mode Switcher (visible only on mobile/tablet) */}
      <div className="lg:hidden flex bg-slate-200 dark:bg-slate-900 p-1 border-b border-slate-300 dark:border-slate-800">
        <button
          onClick={() => setMobileView('edit')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
            mobileView === 'edit'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Editor</span>
        </button>
        <button
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
            mobileView === 'preview'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Document</span>
        </button>
      </div>

      {/* Main Two-Panel Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN: FORM EDITOR */}
        <div
          className={`w-full lg:w-[46%] xl:w-[42%] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-[calc(100vh-96px)] lg:h-[calc(100vh-56px)] overflow-hidden ${
            mobileView === 'edit' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Section Navigation Tabs Strip */}
          <div className="flex items-center overflow-x-auto border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 px-2 py-1.5 custom-scrollbar shrink-0 gap-1">
            {navTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const filled = hasContent(tab.id);

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors shrink-0 ${
                    isActive
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white dark:text-slate-900' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {filled && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 inline-block ml-0.5"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 custom-scrollbar">
            {activeTab === 'personal' && (
              <PersonalInfoForm
                data={data.personalInfo}
                templateId={data.templateId}
                onChange={(personalInfo) => setData(prev => ({ ...prev, personalInfo }))}
              />
            )}

            {activeTab === 'biodata' && (
              <BioDataForm
                data={data.bioData || {}}
                personalInfo={data.personalInfo}
                onChange={(bioData) => setData(prev => ({ ...prev, bioData }))}
                onUpdatePersonalInfo={(personalInfo) => setData(prev => ({ ...prev, personalInfo }))}
              />
            )}

            {activeTab === 'summary' && (
              <SummaryForm
                summary={data.summary}
                onChange={(summary) => setData(prev => ({ ...prev, summary }))}
              />
            )}

            {activeTab === 'education' && (
              <EducationForm
                entries={data.education || []}
                onChange={(education) => setData(prev => ({ ...prev, education }))}
              />
            )}

            {activeTab === 'experience' && (
              <ExperienceForm
                entries={data.experience || []}
                onChange={(experience) => setData(prev => ({ ...prev, experience }))}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsForm
                entries={data.projects || []}
                onChange={(projects) => setData(prev => ({ ...prev, projects }))}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsForm
                skills={data.skills || { technical: [], soft: [], tools: [] }}
                onChange={(skills) => setData(prev => ({ ...prev, skills }))}
              />
            )}

            {activeTab === 'certifications' && (
              <CertificationsForm
                entries={data.certifications || []}
                onChange={(certifications) => setData(prev => ({ ...prev, certifications }))}
              />
            )}

            {activeTab === 'extracurricular' && (
              <ExtracurricularForm
                entries={data.extracurricular || []}
                onChange={(extracurricular) => setData(prev => ({ ...prev, extracurricular }))}
              />
            )}

            {activeTab === 'languages' && (
              <LanguagesForm
                entries={data.languages || []}
                onChange={(languages) => setData(prev => ({ ...prev, languages }))}
              />
            )}

            {activeTab === 'awards' && (
              <AwardsForm
                entries={data.awards || []}
                onChange={(awards) => setData(prev => ({ ...prev, awards }))}
              />
            )}

            {activeTab === 'references' && (
              <ReferencesForm
                data={data.references || { availableOnRequest: true, items: [] }}
                onChange={(references) => setData(prev => ({ ...prev, references }))}
              />
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
                onChange={(sectionOrder) => setData(prev => ({ ...prev, sectionOrder }))}
              />
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ARCHITECTURAL A4 DOCUMENT PREVIEW */}
        <div
          className={`w-full lg:w-[54%] xl:w-[58%] bg-slate-200/70 dark:bg-slate-950 h-[calc(100vh-96px)] lg:h-[calc(100vh-56px)] overflow-y-auto p-4 sm:p-8 flex justify-center custom-scrollbar transition-colors ${
            mobileView === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}
          ref={previewRef}
        >
          <div className="w-full max-w-[794px] flex justify-center items-start">
            <div className="bg-white text-slate-900 shadow-md shadow-slate-400/20 dark:shadow-black/60 rounded-xs transition-shadow">
              <LiveCVPreview data={data} scale={0.92} />
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
    </div>
  );
};


