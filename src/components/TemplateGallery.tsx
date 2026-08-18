import React, { useState } from 'react';
import { TEMPLATES, SAMPLE_STUDENT_CV, SAMPLE_GENERAL_CV, SAMPLE_HR_CV, SAMPLE_MODERN_CV, SAMPLE_DEVELOPER_CV, SAMPLE_BIODATA_CV } from '../data/templates';
import { TemplateConfig, TemplateId } from '../types/cv';
import { LiveCVPreview } from './preview/LiveCVPreview';
import { Check, Eye, ArrowRight, X, LayoutGrid, CheckCircle } from 'lucide-react';

interface TemplateGalleryProps {
  onSelectTemplate: (templateId: TemplateId) => void;
  onBackToLanding?: () => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'ATS' | 'HR'>('ALL');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateConfig | null>(null);

  const filteredTemplates = TEMPLATES.filter(t => {
    if (selectedFilter === 'ATS') return t.category === 'ATS';
    if (selectedFilter === 'HR') return t.category === 'HR';
    return true;
  });

  const getSampleForTemplate = (templateId: TemplateId) => {
    if (templateId === 'general-cv') return SAMPLE_GENERAL_CV;
    if (templateId === 'job-biodata') return SAMPLE_BIODATA_CV;
    if (templateId === 'developer-clean') return SAMPLE_DEVELOPER_CV;
    if (templateId === 'hr-professional') return SAMPLE_HR_CV;
    if (templateId === 'modern-two-column') return SAMPLE_MODERN_CV;
    if (templateId === 'ats-professional') {
      return { ...SAMPLE_STUDENT_CV, templateId: 'ats-professional' as const };
    }
    return SAMPLE_STUDENT_CV;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Choose Your Resume Template
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Select between single-column ATS templates for online job portals or modern two-column formats for direct applications.
          </p>

          {/* Filter Pills */}
          <div className="flex justify-center items-center gap-1.5 pt-3">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedFilter === 'ALL'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              All Formats ({TEMPLATES.length})
            </button>
            <button
              onClick={() => setSelectedFilter('ATS')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedFilter === 'ATS'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              ATS Optimized
            </button>
            <button
              onClick={() => setSelectedFilter('HR')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedFilter === 'HR'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              HR & Modern
            </button>
          </div>
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200 flex flex-col overflow-hidden shadow-2xs group"
            >
              {/* Scaled Mini Cover Preview */}
              <div className="relative h-64 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden flex items-start justify-center pt-3 px-2 group-hover:bg-slate-200/50 dark:group-hover:bg-slate-900/60 transition-colors">
                {/* Mini Scaled Live CV Document */}
                <div className="transform origin-top scale-[0.30] pointer-events-none select-none shadow-md rounded bg-white">
                  <LiveCVPreview data={getSampleForTemplate(template.id)} scale={1} />
                </div>

                {/* Badge Top Left */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 rounded shadow-xs backdrop-blur-xs">
                    {template.badge}
                  </span>
                </div>

                {/* Quick Preview Button */}
                <button
                  onClick={() => setPreviewTemplate(template)}
                  className="absolute bottom-3 right-3 z-10 px-3 py-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg shadow-sm hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 flex items-center gap-1.5 transition-all border border-slate-200 dark:border-slate-700"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
              </div>

              {/* Template Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {template.name}
                    </h3>
                    <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">{template.category}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{template.description}</p>
                </div>

                {/* Recommended For */}
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs border border-slate-200 dark:border-slate-700/60">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-wider block mb-0.5">
                    Recommended for:
                  </span>
                  <span className="text-slate-600 dark:text-slate-400 text-[11px]">{template.recommendedFor}</span>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onSelectTemplate(template.id)}
                  className="w-full py-2 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Select Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800">
            <header className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{previewTemplate.name} Sample Preview</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{previewTemplate.tagline}</p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100 dark:bg-slate-950 flex justify-center items-start overflow-x-hidden">
              <div className="w-full max-w-[794px] flex justify-center">
                <div className="shadow-lg bg-white rounded-sm overflow-hidden">
                  <LiveCVPreview data={getSampleForTemplate(previewTemplate.id)} scale={0.65} />
                </div>
              </div>
            </div>

            <footer className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center">
              <span className="text-xs text-slate-500 dark:text-slate-400">Standard A4 Layout</span>
              <button
                onClick={() => {
                  const tid = previewTemplate.id;
                  setPreviewTemplate(null);
                  onSelectTemplate(tid);
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
              >
                Use {previewTemplate.name}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

