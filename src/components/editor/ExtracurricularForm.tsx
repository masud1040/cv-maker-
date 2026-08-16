import React from 'react';
import { ExtracurricularEntry } from '../../types/cv';
import { Users, Plus, Trash2 } from 'lucide-react';

interface ExtracurricularFormProps {
  entries: ExtracurricularEntry[];
  onChange: (entries: ExtracurricularEntry[]) => void;
}

export const ExtracurricularForm: React.FC<ExtracurricularFormProps> = ({ entries, onChange }) => {
  const handleAdd = () => {
    const newEntry: ExtracurricularEntry = {
      id: 'extra-' + Date.now(),
      role: '',
      organization: '',
      date: '',
      description: ''
    };
    onChange([...entries, newEntry]);
  };

  const handleUpdate = (id: string, field: keyof ExtracurricularEntry, value: string) => {
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

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            Extracurricular & Leadership
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Clubs, student societies, volunteering, or community leadership.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Activity
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">No extracurricular activities added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs font-medium text-slate-900 dark:text-white underline underline-offset-2 hover:opacity-80"
          >
            + Add club role or activity
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((extra) => (
            <div key={extra.id} className="p-4 bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700/70 pb-2">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {extra.role || 'New Leadership Role'}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(extra.id)}
                  className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Role / Title</label>
                  <input
                    type="text"
                    value={extra.role}
                    onChange={(e) => handleUpdate(extra.id, 'role', e.target.value)}
                    placeholder="e.g. Vice President of Tech"
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Organization / Club</label>
                  <input
                    type="text"
                    value={extra.organization}
                    onChange={(e) => handleUpdate(extra.id, 'organization', e.target.value)}
                    placeholder="e.g. University Computer Club"
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Date / Period</label>
                  <input
                    type="text"
                    value={extra.date}
                    onChange={(e) => handleUpdate(extra.id, 'date', e.target.value)}
                    placeholder="e.g. Jan 2024 - Present"
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={extra.description}
                    onChange={(e) => handleUpdate(extra.id, 'description', e.target.value)}
                    placeholder="e.g. Organized 4 hackathons with 350+ participants..."
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

