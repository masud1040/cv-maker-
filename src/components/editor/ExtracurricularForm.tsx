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
      <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            Extracurricular & Leadership
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Clubs, student societies, volunteering, or community leadership.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Activity
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-xs text-slate-500">No extracurricular activities added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add club role or activity
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((extra) => (
            <div key={extra.id} className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                <span className="text-xs font-bold text-slate-800">
                  {extra.role || 'New Leadership Role'}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(extra.id)}
                  className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Role / Title</label>
                  <input
                    type="text"
                    value={extra.role}
                    onChange={(e) => handleUpdate(extra.id, 'role', e.target.value)}
                    placeholder="e.g. Vice President of Tech"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Organization / Club</label>
                  <input
                    type="text"
                    value={extra.organization}
                    onChange={(e) => handleUpdate(extra.id, 'organization', e.target.value)}
                    placeholder="e.g. University Computer Club"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Date / Period</label>
                  <input
                    type="text"
                    value={extra.date}
                    onChange={(e) => handleUpdate(extra.id, 'date', e.target.value)}
                    placeholder="e.g. Jan 2024 - Present"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={extra.description}
                    onChange={(e) => handleUpdate(extra.id, 'description', e.target.value)}
                    placeholder="e.g. Organized 4 hackathons with 350+ participants..."
                    className="w-full p-2 text-xs border border-slate-300 rounded-lg"
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
