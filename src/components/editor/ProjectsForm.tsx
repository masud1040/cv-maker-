import React from 'react';
import { ProjectEntry } from '../../types/cv';
import { FolderGit2, Plus, Trash2, Link as LinkIcon, ListPlus, Calendar, Sparkles } from 'lucide-react';

interface ProjectsFormProps {
  entries: ProjectEntry[];
  onChange: (entries: ProjectEntry[]) => void;
  onOpenAIModal?: (target: {
    sectionKey: 'project';
    itemId: string;
    subIndex?: number;
    fieldName: 'description' | 'bullet';
    initialText?: string;
  }) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ entries, onChange, onOpenAIModal }) => {
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
    <div className="space-y-5">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            Projects
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Software, academic, research, or personal projects.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg shadow-2xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Project
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">No projects added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs font-semibold text-slate-900 dark:text-white hover:underline inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((proj, index) => (
            <div
              key={proj.id}
              className="p-4 bg-slate-50/70 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-3.5"
            >
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700/60 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Project #{index + 1} {proj.name ? `— ${proj.name}` : ''}
                  </span>
                  {onOpenAIModal && (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenAIModal({
                          sectionKey: 'project',
                          itemId: proj.id,
                          subIndex: 0,
                          fieldName: 'description',
                          initialText: proj.description || proj.name,
                        })
                      }
                      className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 rounded-md transition"
                      title="Improve this project with AI"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      <span>AI Polish</span>
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(proj.id)}
                  className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-md transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => handleUpdate(proj.id, 'name', e.target.value)}
                    placeholder="e.g. Distributed Task Orchestrator"
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Date / Period
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={proj.date || ''}
                      onChange={(e) => handleUpdate(proj.id, 'date', e.target.value)}
                      placeholder="e.g. Mar 2025"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                    />
                    <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Technologies Used
                  </label>
                  <input
                    type="text"
                    value={proj.technologies || ''}
                    onChange={(e) => handleUpdate(proj.id, 'technologies', e.target.value)}
                    placeholder="e.g. React, TypeScript, Go, PostgreSQL, Docker"
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                  />
                </div>

                {/* Link */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Project / GitHub URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={proj.link || ''}
                      onChange={(e) => handleUpdate(proj.id, 'link', e.target.value)}
                      placeholder="e.g. github.com/username/project"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                    />
                    <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                {/* Short Overview */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Short Overview
                  </label>
                  <input
                    type="text"
                    value={proj.description || ''}
                    onChange={(e) => handleUpdate(proj.id, 'description', e.target.value)}
                    placeholder="e.g. Real-time distributed task execution engine handling 10k+ events/sec."
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                  />
                </div>

                {/* Bullet Points */}
                <div className="sm:col-span-2 space-y-2 pt-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Key Highlights & Impact
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddBullet(proj.id)}
                      className="text-xs font-medium text-slate-900 dark:text-white hover:underline flex items-center gap-1"
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
                          placeholder="e.g. Achieved 99.9% uptime with automated health-check failover."
                          className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                        />
                        {onOpenAIModal && bullet.trim().length > 3 && (
                          <button
                            type="button"
                            onClick={() =>
                              onOpenAIModal({
                                sectionKey: 'project',
                                itemId: proj.id,
                                subIndex: bIdx,
                                fieldName: 'bullet',
                                initialText: bullet,
                              })
                            }
                            className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 rounded-md transition-colors"
                            title="Rewrite bullet with AI"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {proj.bullets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteBullet(proj.id, bIdx)}
                            className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-md transition-colors"
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

