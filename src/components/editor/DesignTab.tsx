import React from 'react';
import { CVData, TemplateId } from '../../types/cv';
import { TEMPLATES } from '../../data/templates';
import { Palette, Check, Layers, Eye, Type, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';

interface DesignTabProps {
  currentTemplateId: TemplateId;
  fontSize: CVData['fontSize'];
  sectionVisibility: Record<string, boolean>;
  sectionOrder?: string[];
  showSamplePreview?: boolean;
  onToggleSamplePreview?: (showSample: boolean) => void;
  onSelectTemplate: (id: TemplateId) => void;
  onChangeFontSize: (size: 'compact' | 'standard' | 'spacious') => void;
  onToggleVisibility: (key: string) => void;
  onChangeSectionOrder: (order: string[]) => void;
}

const SECTION_LABELS: Record<string, string> = {
  summary: 'Career Summary / Objective',
  biodata: 'Personal Details & Bio Data',
  education: 'Academic Education',
  experience: 'Work Experience',
  projects: 'Key Projects',
  skills: 'Skills & Competencies',
  certifications: 'Certifications & Training',
  extracurricular: 'Extracurricular Activities',
  languages: 'Languages Known',
  awards: 'Awards & Honors',
  references: 'References',
  custom: 'Custom Section',
  signature: 'Place, Date & Signature'
};

const TemplateMiniWireframe: React.FC<{ id: TemplateId }> = ({ id }) => {
  switch (id) {
    case 'ats-student':
      return (
        <div className="w-full h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 flex flex-col items-center justify-start space-y-1 overflow-hidden shadow-2xs">
          <div className="w-1/2 h-2 bg-slate-800 dark:bg-slate-200 rounded-xs mb-0.5"></div>
          <div className="w-2/3 h-1 bg-slate-300 dark:bg-slate-600 rounded-xs"></div>
          <div className="w-full h-[1px] bg-slate-300 dark:bg-slate-700 my-0.5"></div>
          <div className="w-full text-[7px] font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 pb-0.5">
            EDUCATION
          </div>
          <div className="w-full space-y-1">
            <div className="w-3/4 h-1 bg-slate-300 dark:bg-slate-600 rounded-xs"></div>
            <div className="w-1/2 h-1 bg-slate-200 dark:bg-slate-700 rounded-xs"></div>
          </div>
        </div>
      );
    case 'modern-two-column':
      return (
        <div className="w-full h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex overflow-hidden shadow-2xs">
          <div className="w-1/3 bg-slate-800 p-1.5 flex flex-col items-center space-y-1 shrink-0">
            <div className="w-5 h-5 rounded-full bg-slate-600 border border-slate-500 mb-0.5"></div>
            <div className="w-full h-1 bg-slate-400 rounded-xs"></div>
            <div className="w-2/3 h-1 bg-slate-500 rounded-xs"></div>
            <div className="w-full h-[1px] bg-slate-700 my-0.5"></div>
            <div className="w-full h-1 bg-cyan-400 rounded-xs"></div>
            <div className="w-3/4 h-1 bg-slate-500 rounded-xs"></div>
          </div>
          <div className="w-2/3 p-2 flex flex-col space-y-1">
            <div className="w-3/4 h-2 bg-slate-800 dark:bg-slate-200 rounded-xs"></div>
            <div className="w-1/2 h-1 bg-cyan-600 rounded-xs"></div>
            <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700 my-0.5"></div>
            <div className="w-full h-1 bg-slate-300 dark:bg-slate-600 rounded-xs"></div>
            <div className="w-4/5 h-1 bg-slate-200 dark:bg-slate-700 rounded-xs"></div>
          </div>
        </div>
      );
    case 'hr-professional':
      return (
        <div className="w-full h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-2xs">
          <div className="w-full bg-blue-900 p-2 flex flex-col justify-center space-y-0.5 shrink-0">
            <div className="w-2/3 h-2 bg-white rounded-xs"></div>
            <div className="w-1/3 h-1 bg-blue-200 rounded-xs"></div>
          </div>
          <div className="p-2 space-y-1">
            <div className="w-1/3 h-1.5 bg-blue-800 dark:bg-blue-400 rounded-xs"></div>
            <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-xs"></div>
            <div className="w-5/6 h-1 bg-slate-200 dark:bg-slate-700 rounded-xs"></div>
          </div>
        </div>
      );
    case 'job-biodata':
      return (
        <div className="w-full h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 flex flex-col overflow-hidden shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <div className="space-y-1 w-2/3">
              <div className="w-3/4 h-2 bg-emerald-800 dark:bg-emerald-400 rounded-xs"></div>
              <div className="w-1/2 h-1 bg-slate-400 rounded-xs"></div>
            </div>
            <div className="w-5 h-6 border border-slate-300 dark:border-slate-700 rounded-xs bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[5px] font-bold text-slate-400">
              PHOTO
            </div>
          </div>
          <div className="w-full h-[1px] bg-emerald-600 my-0.5"></div>
          <div className="grid grid-cols-2 gap-1 border border-slate-200 dark:border-slate-700 p-1 rounded-xs">
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-xs"></div>
            <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded-xs"></div>
            <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-xs"></div>
            <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded-xs"></div>
          </div>
        </div>
      );
    case 'developer-clean':
      return (
        <div className="w-full h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 flex flex-col overflow-hidden shadow-2xs space-y-1">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-1">
            <div className="space-y-0.5">
              <div className="w-2/3 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-xs"></div>
              <div className="w-1/3 h-1 bg-slate-400 rounded-xs"></div>
            </div>
            <div className="px-1 py-0.5 bg-slate-800 text-indigo-300 rounded text-[6px] font-mono">
              &lt;code&gt;
            </div>
          </div>
          <div className="flex gap-1 mt-1">
            <div className="w-1/3 space-y-1">
              <div className="w-full h-1 bg-indigo-500 rounded-xs"></div>
              <div className="w-3/4 h-1 bg-slate-200 dark:bg-slate-700 rounded-xs"></div>
            </div>
            <div className="w-2/3 space-y-1">
              <div className="w-full h-1 bg-slate-300 dark:bg-slate-600 rounded-xs"></div>
              <div className="w-4/5 h-1 bg-slate-200 dark:bg-slate-700 rounded-xs"></div>
            </div>
          </div>
        </div>
      );
    case 'ats-professional':
      return (
        <div className="w-full h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 flex flex-col overflow-hidden shadow-2xs space-y-1">
          <div className="w-full bg-teal-800 p-1.5 rounded-xs space-y-0.5">
            <div className="w-1/2 h-2 bg-white rounded-xs"></div>
            <div className="w-1/3 h-1 bg-teal-200 rounded-xs"></div>
          </div>
          <div className="w-full h-1 bg-teal-700 rounded-xs mt-0.5"></div>
          <div className="w-full space-y-1">
            <div className="w-3/4 h-1 bg-slate-300 dark:bg-slate-600 rounded-xs"></div>
            <div className="w-2/3 h-1 bg-slate-200 dark:bg-slate-700 rounded-xs"></div>
          </div>
        </div>
      );
    case 'general-cv':
    default:
      return (
        <div className="w-full h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 flex flex-col overflow-hidden shadow-2xs space-y-1">
          <div className="border-l-2 border-blue-600 pl-1 space-y-0.5">
            <div className="w-2/3 h-2 bg-slate-800 dark:bg-slate-200 rounded-xs"></div>
            <div className="w-1/3 h-1 bg-slate-400 rounded-xs"></div>
          </div>
          <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700 my-0.5"></div>
          <div className="w-full space-y-1">
            <div className="w-1/3 h-1 bg-blue-600 rounded-xs"></div>
            <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-xs"></div>
            <div className="w-3/4 h-1 bg-slate-200 dark:bg-slate-700 rounded-xs"></div>
          </div>
        </div>
      );
  }
};

export const DesignTab: React.FC<DesignTabProps> = ({
  currentTemplateId,
  fontSize = 'standard',
  sectionVisibility = {},
  sectionOrder = [
    'summary',
    'biodata',
    'education',
    'experience',
    'projects',
    'skills',
    'certifications',
    'extracurricular',
    'languages',
    'awards',
    'references',
    'custom',
    'signature'
  ],
  showSamplePreview = false,
  onToggleSamplePreview,
  onSelectTemplate,
  onChangeFontSize,
  onToggleVisibility,
  onChangeSectionOrder
}) => {
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    onChangeSectionOrder(newOrder);
  };

  return (
    <div className="space-y-8 pb-8 text-slate-800 dark:text-slate-100">
      {/* DEMO DATA PREVIEW TOGGLE BANNER */}
      {onToggleSamplePreview && (
        <div className="p-3 bg-gradient-to-r from-cyan-900/10 via-indigo-900/10 to-purple-900/10 dark:from-cyan-950/40 dark:to-purple-950/40 rounded-2xl border border-cyan-500/30 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-600 text-white shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                টেমপ্লেটের আসল ডিজাইন ডেমো দেখুন (Sample Data Preview)
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Turn on demo preview to see how this design looks when filled with real content.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onToggleSamplePreview(!showSamplePreview)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer ${
              showSamplePreview
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
            }`}
          >
            {showSamplePreview ? '✓ Demo ON (স্যাম্পল)' : 'Show Demo (স্যাম্পল)'}
          </button>
        </div>
      )}

      {/* 1. TEMPLATE SELECTION GALLERY */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            1. Select CV Template / ডিজাইন লেআউট পছন্দ করুন
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Click any design below to apply it to your CV and view its layout structure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATES.map((tmpl) => {
            const isSelected = tmpl.id === currentTemplateId;

            return (
              <div
                key={tmpl.id}
                onClick={() => onSelectTemplate(tmpl.id)}
                className={`group relative rounded-2xl border-2 p-3.5 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-600 dark:border-cyan-400 bg-cyan-50/40 dark:bg-cyan-950/30 shadow-md ring-2 ring-cyan-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {tmpl.category}
                    </span>

                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-600 text-white shadow-2xs">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Select
                      </span>
                    )}
                  </div>

                  {/* VISUAL MINI WIREFRAME PREVIEW */}
                  <div className="my-1">
                    <TemplateMiniWireframe id={tmpl.id} />
                  </div>

                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                      {tmpl.name}
                    </h4>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug line-clamp-2">
                      {tmpl.tagline}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">
                    {tmpl.supportsPhoto ? '📷 Photo' : '📄 Text Only'}
                  </span>
                  <button
                    type="button"
                    className={`font-bold px-2.5 py-1 rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 group-hover:bg-cyan-600 group-hover:text-white'
                    }`}
                  >
                    {isSelected ? 'Active Design' : 'Apply Design'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. TEXT DENSITY & TYPOGRAPHY SPACING */}
      <div className="space-y-3 pt-2">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Type className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            2. Font Size & Layout Density / টেক্সটের আকার ও স্পেসিং
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Adjust line height and font scale to fit all details perfectly on 1 or 2 pages.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => onChangeFontSize('compact')}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              fontSize === 'compact'
                ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-bold shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className="block text-xs font-bold mb-0.5">Compact</span>
            <span className="block text-[10px] text-slate-400">Fits more content on 1 page</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeFontSize('standard')}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              fontSize === 'standard' || !fontSize
                ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-bold shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className="block text-xs font-bold mb-0.5">Normal</span>
            <span className="block text-[10px] text-slate-400">Standard standard sizing</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeFontSize('spacious')}
            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
              fontSize === 'spacious'
                ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200 font-bold shadow-xs'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className="block text-xs font-bold mb-0.5">Spacious</span>
            <span className="block text-[10px] text-slate-400">Larger text & relaxed spacing</span>
          </button>
        </div>
      </div>

      {/* 3. SECTION VISIBILITY TOGGLES */}
      <div className="space-y-3 pt-2">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            3. Show or Hide Sections / সেকশন চালু বা বন্ধ করুন
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Turn sections ON to display or OFF to hide them from the final PDF document.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(SECTION_LABELS).map(([key, label]) => {
            const isON = sectionVisibility[key] !== false;

            return (
              <div
                key={key}
                onClick={() => onToggleVisibility(key)}
                className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition-all ${
                  isON
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/30 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-500 line-through'
                }`}
              >
                <span className="text-xs font-semibold">{label}</span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    isON
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {isON ? 'ON' : 'OFF'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. SECTION ORDERING */}
      <div className="space-y-3 pt-2">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            4. Reorder Sections / সেকশনের ক্রম পরিবর্তন করুন
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Move sections up or down to arrange how they flow on your resume.
          </p>
        </div>

        <div className="space-y-1.5">
          {sectionOrder.map((secKey, index) => {
            const isON = sectionVisibility[secKey] !== false;
            const label = SECTION_LABELS[secKey] || secKey;

            return (
              <div
                key={secKey}
                className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    {index + 1}
                  </span>
                  <span className={!isON ? 'line-through text-slate-400' : ''}>{label}</span>
                  {!isON && (
                    <span className="text-[9px] font-bold uppercase text-amber-600 bg-amber-50 dark:bg-amber-950 px-1.5 py-0.2 rounded">
                      OFF
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveSection(index, 'up')}
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === sectionOrder.length - 1}
                    onClick={() => moveSection(index, 'down')}
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
