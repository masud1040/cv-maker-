import React, { useState } from 'react';
import { TEMPLATES, SAMPLE_STUDENT_CV, SAMPLE_HR_CV, SAMPLE_MODERN_CV } from '../data/templates';
import { TemplateConfig, TemplateId } from '../types/cv';
import { LiveCVPreview } from './preview/LiveCVPreview';
import { Check, Eye, Sparkles, ArrowRight, X } from 'lucide-react';

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
    if (templateId === 'hr-professional') return SAMPLE_HR_CV;
    if (templateId === 'modern-two-column') return SAMPLE_MODERN_CV;
    if (templateId === 'ats-professional') {
      return { ...SAMPLE_STUDENT_CV, templateId: 'ats-professional' as const };
    }
    return SAMPLE_STUDENT_CV;
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-zinc-300 text-zinc-900 text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span className="uppercase tracking-widest text-[10px]">Guidebook Approved Formats</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Select Your CV Format
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto">
            Choose between strict single-column ATS templates for online portals or visual two-column executive templates for direct submissions.
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center items-center gap-2 pt-2">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition ${
                selectedFilter === 'ALL'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-300'
              }`}
            >
              All Formats ({TEMPLATES.length})
            </button>
            <button
              onClick={() => setSelectedFilter('ATS')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition ${
                selectedFilter === 'ATS'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-300'
              }`}
            >
              ATS Optimized
            </button>
            <button
              onClick={() => setSelectedFilter('HR')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition ${
                selectedFilter === 'HR'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-300'
              }`}
            >
              HR Visual
            </button>
          </div>
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl border border-zinc-200 shadow-2xs hover:border-black transition-all duration-200 flex flex-col overflow-hidden group"
            >
              {/* Scaled Mini Cover Preview */}
              <div className="relative h-72 bg-zinc-200/60 border-b border-zinc-200 overflow-hidden flex items-start justify-center pt-3 px-2 group-hover:bg-zinc-200 transition-colors">
                {/* Mini Scaled Live CV Document */}
                <div className="transform origin-top scale-[0.31] pointer-events-none select-none shadow-md rounded">
                  <LiveCVPreview data={getSampleForTemplate(template.id)} scale={1} />
                </div>

                {/* Badge Top Left */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/90 text-white rounded shadow-xs backdrop-blur-xs">
                    {template.badge}
                  </span>
                </div>

                {/* Quick Preview Button */}
                <button
                  onClick={() => setPreviewTemplate(template)}
                  className="absolute bottom-3 right-3 z-10 px-3.5 py-1.5 bg-white text-zinc-900 text-xs font-bold rounded-lg shadow-md hover:bg-black hover:text-white flex items-center gap-1.5 transition-all border border-zinc-300"
                >
                  <Eye className="w-3.5 h-3.5" /> Full Preview
                </button>
              </div>

              {/* Template Body */}
              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 group-hover:text-black transition">
                    {template.name}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-500 mt-0.5">{template.tagline}</p>
                  <p className="text-xs text-zinc-600 mt-2 leading-relaxed">{template.description}</p>
                </div>

                {/* Recommended For */}
                <div className="p-2.5 bg-[#F4F4F5] rounded text-xs border border-zinc-200">
                  <span className="font-bold text-zinc-800 uppercase text-[10px] tracking-wider">Best for: </span>
                  <span className="text-zinc-600">{template.recommendedFor}</span>
                </div>

                {/* Features list */}
                <ul className="space-y-1.5 text-xs text-zinc-700 flex-1">
                  {template.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Action button */}
                <button
                  onClick={() => onSelectTemplate(template.id)}
                  className="w-full py-2.5 px-4 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded shadow-xs transition flex items-center justify-center gap-2"
                >
                  Use This Template
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Preview Modal (Fitted cleanly without horizontal drag) */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-zinc-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-zinc-300">
            <header className="px-5 py-3 border-b border-zinc-200 flex justify-between items-center bg-zinc-50">
              <div>
                <h3 className="font-bold text-zinc-900 text-sm sm:text-base">{previewTemplate.name} Sample Preview</h3>
                <p className="text-xs text-zinc-500">{previewTemplate.tagline}</p>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 text-zinc-400 hover:text-black rounded-md transition"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Container fitted cleanly without horizontal scrolling */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-zinc-100 flex justify-center items-start overflow-x-hidden">
              <div className="w-full max-w-[794px] flex justify-center">
                <LiveCVPreview data={getSampleForTemplate(previewTemplate.id)} scale={0.65} />
              </div>
            </div>

            <footer className="px-5 py-3 border-t border-zinc-200 bg-white flex justify-between items-center">
              <span className="text-xs text-zinc-500">Includes guidebook sample data</span>
              <button
                onClick={() => {
                  const tid = previewTemplate.id;
                  setPreviewTemplate(null);
                  onSelectTemplate(tid);
                }}
                className="px-5 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded transition shadow-xs flex items-center gap-2"
              >
                Use {previewTemplate.name}
                <ArrowRight className="w-4 h-4" />
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};
