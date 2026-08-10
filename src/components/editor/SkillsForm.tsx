import React, { useState } from 'react';
import { SkillsData } from '../../types/cv';
import { Wrench, Plus, X, Code2, Cpu, Users } from 'lucide-react';

interface SkillsFormProps {
  skills: SkillsData;
  onChange: (skills: SkillsData) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const [techInput, setTechInput] = useState('');
  const [toolInput, setToolInput] = useState('');
  const [softInput, setSoftInput] = useState('');

  const handleAddTag = (category: keyof SkillsData, inputVal: string, setInput: (v: string) => void) => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    const current = skills[category] || [];
    if (!current.includes(trimmed)) {
      onChange({
        ...skills,
        [category]: [...current, trimmed]
      });
    }
    setInput('');
  };

  const handleRemoveTag = (category: keyof SkillsData, indexToRemove: number) => {
    const current = skills[category] || [];
    onChange({
      ...skills,
      [category]: current.filter((_, idx) => idx !== indexToRemove)
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    category: keyof SkillsData,
    inputVal: string,
    setInput: (v: string) => void
  ) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(category, inputVal, setInput);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-2">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Wrench className="w-4 h-4 text-blue-600" />
          Skills & Competencies
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Categorized skills. Press Enter or comma to add tags.</p>
      </div>

      {/* Technical Skills */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 text-blue-600" />
          Technical & Programming Skills
        </label>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'technical', techInput, setTechInput)}
            placeholder="e.g. JavaScript, Python, React, PostgreSQL..."
            className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => handleAddTag('technical', techInput, setTechInput)}
            className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {skills.technical?.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 bg-white border border-slate-300 text-slate-800 text-xs px-2.5 py-1 rounded-md shadow-xs">
              {item}
              <button
                type="button"
                onClick={() => handleRemoveTag('technical', idx)}
                className="text-slate-400 hover:text-red-500 ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {(!skills.technical || skills.technical.length === 0) && (
            <span className="text-[11px] text-slate-400 italic">No technical skills added yet.</span>
          )}
        </div>
      </div>

      {/* Tools & Platforms */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-blue-600" />
          Tools, Frameworks & Platforms
        </label>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={toolInput}
            onChange={(e) => setToolInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'tools', toolInput, setToolInput)}
            placeholder="e.g. Git, Docker, Postman, VS Code, Figma..."
            className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => handleAddTag('tools', toolInput, setToolInput)}
            className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {skills.tools?.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 bg-white border border-slate-300 text-slate-800 text-xs px-2.5 py-1 rounded-md shadow-xs">
              {item}
              <button
                type="button"
                onClick={() => handleRemoveTag('tools', idx)}
                className="text-slate-400 hover:text-red-500 ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {(!skills.tools || skills.tools.length === 0) && (
            <span className="text-[11px] text-slate-400 italic">No tools added yet.</span>
          )}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-blue-600" />
          Soft Skills & Leadership
        </label>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'soft', softInput, setSoftInput)}
            placeholder="e.g. Problem Solving, Team Collaboration, Agile/Scrum..."
            className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => handleAddTag('soft', softInput, setSoftInput)}
            className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {skills.soft?.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 bg-white border border-slate-300 text-slate-800 text-xs px-2.5 py-1 rounded-md shadow-xs">
              {item}
              <button
                type="button"
                onClick={() => handleRemoveTag('soft', idx)}
                className="text-slate-400 hover:text-red-500 ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {(!skills.soft || skills.soft.length === 0) && (
            <span className="text-[11px] text-slate-400 italic">No soft skills added yet.</span>
          )}
        </div>
      </div>
    </div>
  );
};
