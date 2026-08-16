import React from 'react';
import { SectionType } from '../../types/cv';
import { Layers, ArrowUp, ArrowDown } from 'lucide-react';

interface SectionOrderManagerProps {
  sectionOrder: SectionType[];
  onChange: (order: SectionType[]) => void;
}

const SECTION_LABELS: Record<string, string> = {
  summary: 'Professional Summary',
  education: 'Education',
  experience: 'Work & Internship Experience',
  projects: 'Projects',
  skills: 'Technical & Soft Skills',
  certifications: 'Certifications',
  extracurricular: 'Extracurricular & Leadership',
  languages: 'Languages',
  awards: 'Awards & Recognition',
  references: 'References'
};

export const SectionOrderManager: React.FC<SectionOrderManagerProps> = ({ sectionOrder, onChange }) => {
  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...sectionOrder];
    const temp = newOrder[index - 1];
    newOrder[index - 1] = newOrder[index];
    newOrder[index] = temp;
    onChange(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === sectionOrder.length - 1) return;
    const newOrder = [...sectionOrder];
    const temp = newOrder[index + 1];
    newOrder[index + 1] = newOrder[index];
    newOrder[index] = temp;
    onChange(newOrder);
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-700 dark:text-slate-300" />
          Reorder CV Sections
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Customize the order in which sections appear on your CV.</p>
      </div>

      <div className="space-y-2">
        {sectionOrder.map((secKey, idx) => {
          const label = SECTION_LABELS[secKey] || secKey;
          return (
            <div
              key={secKey}
              className="p-3 bg-slate-50/80 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/70 flex items-center justify-between text-xs text-slate-800 dark:text-slate-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px] flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span className="font-medium text-xs text-slate-900 dark:text-white">{label}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveUp(idx)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700 rounded-lg disabled:opacity-20 transition"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === sectionOrder.length - 1}
                  onClick={() => moveDown(idx)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700 rounded-lg disabled:opacity-20 transition"
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
  );
};

