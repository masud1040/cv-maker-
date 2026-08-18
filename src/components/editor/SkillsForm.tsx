import React, { useState } from 'react';
import { SkillsData } from '../../types/cv';
import { Wrench, Plus, X, Sparkles, Layers, Sliders } from 'lucide-react';

interface SkillsFormProps {
  skills: SkillsData;
  onChange: (skills: SkillsData) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const [singleInput, setSingleInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [toolInput, setToolInput] = useState('');
  const [softInput, setSoftInput] = useState('');
  const [isAdvancedCategorized, setIsAdvancedCategorized] = useState(false);

  // All skills merged for unified view
  const allSkills = [
    ...(skills.technical || []),
    ...(skills.tools || []),
    ...(skills.soft || [])
  ];

  // Quick suggestions popular for general & office profiles
  const quickSuggestions = [
    'MS Office (Word, Excel, PowerPoint)',
    'Data Entry & Fast Typing',
    'Bengali & English Typing',
    'Computer Hardware & Troubleshooting',
    'Internet & Email Operations',
    'Tailoring & Sewing / সেলাই কাজ',
    'Hand Embroidery / হাতের কাজ',
    'Front Desk & Customer Support',
    'Time Management & Punctuality',
    'Teamwork & Collaboration'
  ];

  const handleAddSingleSkill = (val?: string) => {
    const textToAdd = (val !== undefined ? val : singleInput).trim();
    if (!textToAdd) return;

    // Support comma-separated batch adding
    const items = textToAdd.split(',').map(s => s.trim()).filter(Boolean);
    const currentTech = skills.technical || [];
    const newItems = items.filter(item => !allSkills.includes(item));

    if (newItems.length > 0) {
      onChange({
        ...skills,
        technical: [...currentTech, ...newItems]
      });
    }
    setSingleInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange({
      technical: (skills.technical || []).filter(s => s !== skillToRemove),
      tools: (skills.tools || []).filter(s => s !== skillToRemove),
      soft: (skills.soft || []).filter(s => s !== skillToRemove)
    });
  };

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
    action: () => void
  ) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Wrench className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            Skills & Competencies
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Type your skills into the text field. All skills sit side-by-side on your CV.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdvancedCategorized(!isAdvancedCategorized)}
          className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          {isAdvancedCategorized ? (
            <>
              <Layers className="w-3 h-3" />
              Simple Field View
            </>
          ) : (
            <>
              <Sliders className="w-3 h-3" />
              Categorize (Dev/IT)
            </>
          )}
        </button>
      </div>

      {!isAdvancedCategorized ? (
        /* Simple Unified Single Text Field (Side-by-Side Skills) */
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-3">
            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
              Enter Skills (Type name & press Enter, or separate with commas)
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={singleInput}
                onChange={(e) => setSingleInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, () => handleAddSingleSkill())}
                placeholder="e.g. MS Word & Excel, Data Entry, Tailoring, Driving..."
                className="flex-1 px-3 py-2 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
              />
              <button
                type="button"
                onClick={() => handleAddSingleSkill()}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg transition shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Skill
              </button>
            </div>

            {/* Current Side-by-Side Skills */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                Active Skills ({allSkills.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs px-3 py-1.5 rounded-lg shadow-2xs font-medium"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                      title={`Remove ${skill}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {allSkills.length === 0 && (
                  <span className="text-xs text-slate-400 italic">
                    No skills added yet. Type your skill above or click quick suggestions below.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-200/80 dark:border-slate-700/50">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Quick Suggestions (Click to add)</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {quickSuggestions.map((suggestion, idx) => {
                const isAdded = allSkills.includes(suggestion);
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAdded}
                    onClick={() => handleAddSingleSkill(suggestion)}
                    className={`text-xs px-2.5 py-1 rounded-md transition border ${
                      isAdded
                        ? 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700 cursor-default'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-slate-900 dark:hover:border-white hover:bg-slate-50'
                    }`}
                  >
                    {isAdded ? '✓ ' : '+ '}
                    {suggestion}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Advanced 3-Category Mode for Tech/Dev CVs */
        <div className="space-y-4">
          {/* Technical Skills */}
          <div className="p-4 bg-slate-50/70 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-3">
            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              Technical & Core Skills
            </label>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, () => handleAddTag('technical', techInput, setTechInput))}
                placeholder="e.g. TypeScript, React, Accounting..."
                className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
              />
              <button
                type="button"
                onClick={() => handleAddTag('technical', techInput, setTechInput)}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.technical?.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs px-2.5 py-1 rounded-md shadow-2xs">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag('technical', idx)}
                    className="text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Tools & Platforms */}
          <div className="p-4 bg-slate-50/70 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-3">
            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              Tools, Software & Platforms
            </label>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={toolInput}
                onChange={(e) => setToolInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, () => handleAddTag('tools', toolInput, setToolInput))}
                placeholder="e.g. Git, Docker, Photoshop, Google Workspace..."
                className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
              />
              <button
                type="button"
                onClick={() => handleAddTag('tools', toolInput, setToolInput)}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.tools?.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs px-2.5 py-1 rounded-md shadow-2xs">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag('tools', idx)}
                    className="text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="p-4 bg-slate-50/70 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-3">
            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              Soft Skills & Attributes
            </label>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={softInput}
                onChange={(e) => setSoftInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, () => handleAddTag('soft', softInput, setSoftInput))}
                placeholder="e.g. Communication, Problem Solving, Leadership..."
                className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
              />
              <button
                type="button"
                onClick={() => handleAddTag('soft', softInput, setSoftInput)}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.soft?.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs px-2.5 py-1 rounded-md shadow-2xs">
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag('soft', idx)}
                    className="text-slate-400 hover:text-red-500 dark:hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

