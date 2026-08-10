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
      <div className="border-b border-slate-200 pb-2">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" />
          Reorder CV Sections
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Customize the order in which sections appear on your CV.</p>
      </div>

      <div className="space-y-1.5">
        {sectionOrder.map((secKey, idx) => {
          const label = SECTION_LABELS[secKey] || secKey;
          return (
            <div
              key={secKey}
              className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs text-slate-800"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 font-mono text-[11px] flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span className="font-semibold">{label}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveUp(idx)}
                  className="p-1 text-slate-500 hover:text-blue-600 hover:bg-slate-200 rounded disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === sectionOrder.length - 1}
                  onClick={() => moveDown(idx)}
                  className="p-1 text-slate-500 hover:text-blue-600 hover:bg-slate-200 rounded disabled:opacity-30"
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
