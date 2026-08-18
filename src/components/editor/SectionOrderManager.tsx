import React from 'react';
import { SectionType } from '../../types/cv';
import { Layers, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';

interface SectionOrderManagerProps {
  sectionOrder: SectionType[];
  sectionVisibility?: Record<string, boolean>;
  onChange: (order: SectionType[]) => void;
  onToggleVisibility?: (secKey: string) => void;
}

const SECTION_LABELS: Record<string, string> = {
  summary: 'Professional Summary / Objective',
  biodata: 'Personal Details & Bio-Data',
  education: 'Academic Education',
  experience: 'Work & Office Experience',
  projects: 'Key Projects',
  skills: 'Skills & Competencies',
  certifications: 'Certifications & Training',
  extracurricular: 'Extracurricular & Social Activities',
  languages: 'Languages Known',
  awards: 'Awards & Honors',
  references: 'References'
};

export const SectionOrderManager: React.FC<SectionOrderManagerProps> = ({
  sectionOrder,
  sectionVisibility = {},
  onChange,
  onToggleVisibility
}) => {
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
          Section Order & Visibility Controls
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Toggle sections ON/OFF or reorder the sequence in which sections appear on your CV.
        </p>
      </div>

      <div className="space-y-2">
        {sectionOrder.map((secKey, idx) => {
          const label = SECTION_LABELS[secKey] || secKey;
          const isVisible = sectionVisibility[secKey] !== false;

          return (
            <div
              key={secKey}
              className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                isVisible
                  ? 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/70 text-slate-900 dark:text-slate-100'
                  : 'bg-slate-100/60 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-75'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px] flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <div>
                  <span className={`font-medium text-xs ${!isVisible ? 'line-through text-slate-400' : ''}`}>
                    {label}
                  </span>
                  {!isVisible && (
                    <span className="ml-2 text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded">
                      Hidden / OFF
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Visibility Toggle Button */}
                {onToggleVisibility && (
                  <button
                    type="button"
                    onClick={() => onToggleVisibility(secKey)}
                    className={`p-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition ${
                      isVisible
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-300'
                    }`}
                    title={isVisible ? 'Click to hide this section' : 'Click to show this section'}
                  >
                    {isVisible ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">ON</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">OFF</span>
                      </>
                    )}
                  </button>
                )}

                {/* Move Up */}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveUp(idx)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700 rounded-lg disabled:opacity-20 transition"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>

                {/* Move Down */}
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

