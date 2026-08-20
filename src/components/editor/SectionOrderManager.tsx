import React, { useState } from 'react';
import { SectionType } from '../../types/cv';
import { Layers, ArrowUp, ArrowDown, Eye, EyeOff, GripVertical, Check } from 'lucide-react';

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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

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

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    const newOrder = [...sectionOrder];
    const [removed] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, removed);
    onChange(newOrder);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            Section Order & Visibility Controls
          </h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800/60">
            <GripVertical className="w-3 h-3" />
            Drag & drop to reorder
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Drag sections by their handles or use the arrows to customize the order they appear on your CV. Toggle ON/OFF to include or omit sections.
        </p>
      </div>

      <div className="space-y-2">
        {sectionOrder.map((secKey, idx) => {
          const label = SECTION_LABELS[secKey] || secKey;
          const isVisible = sectionVisibility[secKey] !== false;
          const isDragging = draggedIndex === idx;
          const isOver = dragOverIndex === idx && draggedIndex !== null && draggedIndex !== idx;

          return (
            <div
              key={secKey}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onDragEnd={handleDragEnd}
              className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all select-none ${
                isDragging
                  ? 'opacity-40 border-dashed border-cyan-500 bg-cyan-50/30 dark:bg-cyan-950/30 scale-[0.99]'
                  : isOver
                  ? 'border-cyan-500 dark:border-cyan-400 bg-cyan-50/70 dark:bg-cyan-950/50 ring-2 ring-cyan-500/40 shadow-sm'
                  : isVisible
                  ? 'bg-slate-50/90 dark:bg-slate-800/50 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 border-slate-200 dark:border-slate-700/70 text-slate-900 dark:text-slate-100 shadow-2xs'
                  : 'bg-slate-100/60 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-75'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Drag Handle */}
                <div
                  className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 rounded transition-colors"
                  title="Drag to reorder this section"
                >
                  <GripVertical className="w-4 h-4" />
                </div>

                <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10px] flex items-center justify-center font-bold">
                  {idx + 1}
                </span>

                <div>
                  <span className={`font-semibold text-xs ${!isVisible ? 'line-through text-slate-400' : ''}`}>
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
                    className={`px-2 py-1 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition ${
                      isVisible
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-slate-300'
                    }`}
                    title={isVisible ? 'Click to hide this section' : 'Click to show this section'}
                  >
                    {isVisible ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Visible</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Hidden</span>
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

