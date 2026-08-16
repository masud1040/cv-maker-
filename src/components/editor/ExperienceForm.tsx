import React from 'react';
import { ExperienceEntry } from '../../types/cv';
import { Briefcase, Plus, Trash2, Calendar, MapPin, Building2, ListPlus } from 'lucide-react';

interface ExperienceFormProps {
  entries: ExperienceEntry[];
  onChange: (entries: ExperienceEntry[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ entries, onChange }) => {
  const handleAdd = () => {
    const newEntry: ExperienceEntry = {
      id: 'exp-' + Date.now(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      bullets: ['']
    };
    onChange([...entries, newEntry]);
  };

  const handleUpdate = (id: string, field: keyof ExperienceEntry, value: any) => {
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

  // Bullet points handlers
  const handleBulletChange = (expId: string, index: number, value: string) => {
    const target = entries.find(e => e.id === expId);
    if (!target) return;
    const newBullets = [...target.bullets];
    newBullets[index] = value;
    handleUpdate(expId, 'bullets', newBullets);
  };

  const handleAddBullet = (expId: string) => {
    const target = entries.find(e => e.id === expId);
    if (!target) return;
    handleUpdate(expId, 'bullets', [...target.bullets, '']);
  };

  const handleDeleteBullet = (expId: string, index: number) => {
    const target = entries.find(e => e.id === expId);
    if (!target) return;
    const newBullets = target.bullets.filter((_, i) => i !== index);
    handleUpdate(expId, 'bullets', newBullets.length ? newBullets : ['']);
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            Work & Internship Experience
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Professional roles, internships, and work accomplishments.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg shadow-2xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Role
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400">No work or internship experience added.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs font-semibold text-slate-900 dark:text-white hover:underline inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add work or internship role
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((exp, index) => (
            <div
              key={exp.id}
              className="p-4 bg-slate-50/70 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-3.5"
            >
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700/60 pb-2.5">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Role #{index + 1} {exp.jobTitle ? `— ${exp.jobTitle}` : ''}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(exp.id)}
                  className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-md transition-colors"
                  title="Delete Role"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Job Title */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Job Title / Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => handleUpdate(exp.id, 'jobTitle', e.target.value)}
                    placeholder="e.g. Software Engineering Intern"
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Company / Organization <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                      placeholder="e.g. Acme Corp"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                    />
                    <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={exp.location || ''}
                      onChange={(e) => handleUpdate(exp.id, 'location', e.target.value)}
                      placeholder="e.g. New York, NY (or Remote)"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                    />
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                {/* Dates & Current */}
                <div className="grid grid-cols-2 gap-2.5 items-center">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                        placeholder="Jun 2023"
                        className="w-full pl-8 pr-2 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                      />
                      <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">End Date</label>
                    <input
                      type="text"
                      disabled={exp.isCurrent}
                      value={exp.isCurrent ? 'Present' : exp.endDate}
                      onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                      placeholder="Aug 2023"
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:text-slate-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="inline-flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.isCurrent}
                      onChange={(e) => handleUpdate(exp.id, 'isCurrent', e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-slate-900"
                    />
                    <span>I currently work here</span>
                  </label>
                </div>

                {/* Bullet Points */}
                <div className="sm:col-span-2 space-y-2 pt-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Key Accomplishments & Bullet Points
                    </label>
                    <button
                      type="button"
                      onClick={() => handleAddBullet(exp.id)}
                      className="text-xs font-medium text-slate-900 dark:text-white hover:underline flex items-center gap-1"
                    >
                      <ListPlus className="w-3.5 h-3.5" />
                      Add Bullet
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {exp.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <span className="text-slate-400 text-xs">•</span>
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => handleBulletChange(exp.id, bIdx, e.target.value)}
                          placeholder="e.g. Developed 12 REST API endpoints using Node.js, reducing latency by 24%."
                          className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                        />
                        {exp.bullets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteBullet(exp.id, bIdx)}
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

