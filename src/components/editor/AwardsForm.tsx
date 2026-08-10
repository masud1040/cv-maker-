import React from 'react';
import { AwardEntry } from '../../types/cv';
import { Trophy, Plus, Trash2 } from 'lucide-react';

interface AwardsFormProps {
  entries: AwardEntry[];
  onChange: (entries: AwardEntry[]) => void;
}

export const AwardsForm: React.FC<AwardsFormProps> = ({ entries, onChange }) => {
  const handleAdd = () => {
    const newEntry: AwardEntry = {
      id: 'award-' + Date.now(),
      title: '',
      issuer: '',
      date: '',
      description: ''
    };
    onChange([...entries, newEntry]);
  };

  const handleUpdate = (id: string, field: keyof AwardEntry, value: string) => {
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
            <Trophy className="w-4 h-4 text-blue-600" />
            Awards & Honors
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Competitions, hackathons, academic honors, or scholarships.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Award
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-xs text-slate-500">No awards added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add award or competition win
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((award) => (
            <div key={award.id} className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                <span className="text-xs font-bold text-slate-800">
                  {award.title || 'New Award'}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(award.id)}
                  className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Award Title</label>
                  <input
                    type="text"
                    value={award.title}
                    onChange={(e) => handleUpdate(award.id, 'title', e.target.value)}
                    placeholder="e.g. 1st Runner Up - National Hackathon"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Issuer / Organization</label>
                  <input
                    type="text"
                    value={award.issuer}
                    onChange={(e) => handleUpdate(award.id, 'issuer', e.target.value)}
                    placeholder="e.g. ICT Division"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={award.date}
                    onChange={(e) => handleUpdate(award.id, 'date', e.target.value)}
                    placeholder="Oct 2024"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Description (Optional)</label>
                  <input
                    type="text"
                    value={award.description || ''}
                    onChange={(e) => handleUpdate(award.id, 'description', e.target.value)}
                    placeholder="e.g. Awarded $1,500 prize out of 80 competing teams."
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg"
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
