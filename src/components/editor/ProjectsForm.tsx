import React from 'react';
import { ProjectEntry } from '../../types/cv';
import { FolderGit2, Plus, Trash2, Link as LinkIcon, ListPlus, Calendar } from 'lucide-react';

interface ProjectsFormProps {
  entries: ProjectEntry[];
  onChange: (entries: ProjectEntry[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ entries, onChange }) => {
  const handleAdd = () => {
    const newEntry: ProjectEntry = {
      id: 'proj-' + Date.now(),
      name: '',
      date: '',
      technologies: '',
      link: '',
      description: '',
      bullets: ['']
    };
    onChange([...entries, newEntry]);
  };

  const handleUpdate = (id: string, field: keyof ProjectEntry, value: any) => {
    const updated = entries.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    onChange(entries.filter(item => item.id !== id));
  };

  const handleBulletChange = (projId: string, index: number, value: string) => {
    const target = entries.find(p => p.id === projId);
    if (!target) return;
    const newBullets = [...target.bullets];
    newBullets[index] = value;
    handleUpdate(projId, 'bullets', newBullets);
  };

  const handleAddBullet = (projId: string) => {
    const target = entries.find(p => p.id === projId);
    if (!target) return;
    handleUpdate(projId, 'bullets', [...target.bullets, '']);
  };

  const handleDeleteBullet = (projId: string, index: number) => {
    const target = entries.find(p => p.id === projId);
    if (!target) return;
    const newBullets = target.bullets.filter((_, i) => i !== index);
    handleUpdate(projId, 'bullets', newBullets.length ? newBullets : ['']);
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-blue-600" />
            Projects
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Software, academic, research, or personal projects.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Project
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-xs text-slate-500">No projects added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((proj, index) => (
            <div key={proj.id} className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-800">
                  Project #{index + 1} {proj.name ? `— ${proj.name}` : ''}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(proj.id)}
                  className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => handleUpdate(proj.id, 'name', e.target.value)}
                    placeholder="e.g. AI-Powered Smart Task Planner"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Date / Period
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={proj.date || ''}
                      onChange={(e) => handleUpdate(proj.id, 'date', e.target.value)}
                      placeholder="e.g. Mar 2025"
                      className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Technologies Used
                  </label>
                  <input
                    type="text"
                    value={proj.technologies || ''}
                    onChange={(e) => handleUpdate(proj.id, 'technologies', e.target.value)}
                    placeholder="e.g. React, TypeScript, Express, Gemini API"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Link */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Project / GitHub URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={proj.link || ''}
                      onChange={(e) => handleUpdate(proj.id, 'link', e.target.value)}
                      placeholder="e.g. github.com/user/project"
                      className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                {/* Short Overview */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Short Overview
                  </label>
                  <input
                    type="text"
                    value={proj.description || ''}
                    onChange={(e) => handleUpdate(proj.id, 'description', e.target.value)}
                    placeholder="e.g. Full-stack web app integrated with natural language processing."
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Bullet Points */}
                <div className="sm:col-span-2 space-y-2 pt-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-semibold text-slate-800">
                      Key Highlights & Impact
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddBullet(proj.id)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <ListPlus className="w-3.5 h-3.5" />
                      Add Highlight
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {proj.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <span className="text-slate-400 text-xs">•</span>
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => handleBulletChange(proj.id, bIdx, e.target.value)}
                          placeholder="e.g. Achieved 98+ Lighthouse performance score and offline sync using LocalStorage."
                          className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {proj.bullets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteBullet(proj.id, bIdx)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
