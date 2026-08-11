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
import { LiveCVPreview } from '../preview/LiveCVPreview';
import { PreviewModal } from '../PreviewModal';
import { generatePDFFromElement } from '../../utils/pdfExport';
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Eye,
  RotateCcw,
  Sparkles,
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
  Sun,
  Moon
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
    if (confirm('Are you sure you want to reset this CV? This will restore sample data.')) {
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

  const navTabs = [
    { id: 'personal', label: 'Personal', icon: User },
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
    <div className="min-h-screen bg-[#F4F4F5] dark:bg-zinc-950 flex flex-col font-sans transition-colors">
      {/* Sticky Top Toolbar */}
      <header className="sticky top-0 z-30 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xs transition-colors">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToMyCVs}
            className="p-1.5 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition"
            title="My CVs Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="CV Title"
              className="font-bold text-sm text-zinc-900 dark:text-white bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800 focus:bg-white dark:focus:bg-zinc-900 px-2 py-0.5 rounded border border-transparent focus:border-zinc-300 dark:focus:border-zinc-700 focus:outline-none transition"
            />
            <div className="flex items-center gap-2 px-2 text-[11px] text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                {saveStatus === 'saving' ? 'Saving...' : 'Auto-saved locally'}
              </span>
            </div>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Template Switcher Dropdown */}
          <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-2.5 py-1.5 text-xs text-zinc-700 dark:text-zinc-300">
            <Palette className="w-3.5 h-3.5 text-black dark:text-white" />
            <span className="font-bold uppercase text-[10px] tracking-wider text-zinc-400 dark:text-zinc-500 hidden sm:inline">Template:</span>
            <select
              value={data.templateId}
              onChange={(e) => handleTemplateChange(e.target.value as TemplateId)}
              className="bg-transparent font-bold text-zinc-900 dark:text-white focus:outline-none cursor-pointer text-xs"
            >
              {TEMPLATES.map(t => (
                <option key={t.id} value={t.id} className="dark:bg-zinc-900 dark:text-white">{t.name} ({t.category})</option>
              ))}
            </select>
          </div>

          {/* Font Size Selector */}
          <div className="hidden lg:flex items-center gap-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md p-1 text-xs">
            <button
              onClick={() => setData(p => ({ ...p, fontSize: 'compact' }))}
              className={`px-2 py-0.5 rounded font-medium ${data.fontSize === 'compact' ? 'bg-black dark:bg-white text-white dark:text-zinc-900 font-bold' : 'text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white'}`}
            >
              Compact
            </button>
            <button
              onClick={() => setData(p => ({ ...p, fontSize: 'standard' }))}
              className={`px-2 py-0.5 rounded font-medium ${data.fontSize === 'standard' || !data.fontSize ? 'bg-black dark:bg-white text-white dark:text-zinc-900 font-bold' : 'text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white'}`}
            >
              Normal
            </button>
            <button
              onClick={() => setData(p => ({ ...p, fontSize: 'spacious' }))}
              className={`px-2 py-0.5 rounded font-medium ${data.fontSize === 'spacious' ? 'bg-black dark:bg-white text-white dark:text-zinc-900 font-bold' : 'text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white'}`}
            >
              Spacious
            </button>
          </div>

          {/* Theme Toggle Button */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>
          )}

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition"
            title="Reset to sample data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Preview PDF */}
          <button
            onClick={() => setIsPreviewModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-md transition border border-zinc-200 dark:border-zinc-700"
          >
            <Eye className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
            <span className="hidden sm:inline">Preview PDF</span>
          </button>

          {/* Download PDF CTA */}
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-md shadow-xs transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Downloading...' : `Download ${data.personalInfo.fullName ? data.personalInfo.fullName.split(' ')[0] + '_CV.pdf' : 'CV.pdf'}`}
          </button>
        </div>
      </header>

      {/* Mobile Workspace Mode Switcher (visible only on < lg) */}
      <div className="lg:hidden flex bg-zinc-200 dark:bg-zinc-900 p-1 border-b border-zinc-300 dark:border-zinc-800">
        <button
          onClick={() => setMobileView('edit')}
          className={`flex-1 py-2 text-xs font-bold rounded-md transition flex items-center justify-center gap-1.5 ${
            mobileView === 'edit'
              ? 'bg-black dark:bg-white text-white dark:text-zinc-900 shadow-xs'
              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Edit Details</span>
        </button>
        <button
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-2 text-xs font-bold rounded-md transition flex items-center justify-center gap-1.5 ${
            mobileView === 'preview'
              ? 'bg-black dark:bg-white text-white dark:text-zinc-900 shadow-xs'
              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN: FORM EDITOR */}
        <div
          className={`w-full lg:w-[45%] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-[calc(100vh-105px)] lg:h-[calc(100vh-57px)] overflow-hidden ${
            mobileView === 'edit' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Scrollable Navigation Tabs */}
          <div className="flex items-center overflow-x-auto border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-900/90 px-2 py-2 no-scrollbar shrink-0 gap-1">
            {navTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as EditorTab)}
                  className={`flex items-center gap-1.5 px-3 py-2 sm:py-1.5 text-xs font-bold rounded whitespace-nowrap transition shrink-0 uppercase tracking-wider text-[11px] min-h-[38px] ${
                    isActive
                      ? 'bg-black dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white dark:text-zinc-900' : 'text-zinc-400 dark:text-zinc-500'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
            {activeTab === 'personal' && (
              <PersonalInfoForm
                data={data.personalInfo}
                templateId={data.templateId}
                onChange={(personalInfo) => setData(prev => ({ ...prev, personalInfo }))}
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

        {/* RIGHT COLUMN: LIVE A4 CV PREVIEW */}
        <div
          className={`w-full lg:w-[55%] bg-[#E4E4E7] dark:bg-zinc-950 h-[calc(100vh-105px)] lg:h-[calc(100vh-57px)] overflow-y-auto p-2 sm:p-8 flex justify-center border-l border-zinc-200 dark:border-zinc-800 transition-colors ${
            mobileView === 'preview' ? 'flex' : 'hidden lg:flex'
          }`}
          ref={previewRef}
        >
          <div className="w-full max-w-[794px]">
            <LiveCVPreview data={data} scale={0.9} />
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

