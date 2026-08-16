import React from 'react';
import { ReferencesData, ReferenceItem } from '../../types/cv';
import { UserCheck, Plus, Trash2 } from 'lucide-react';

interface ReferencesFormProps {
  data: ReferencesData;
  onChange: (data: ReferencesData) => void;
}

export const ReferencesForm: React.FC<ReferencesFormProps> = ({ data, onChange }) => {
  const handleToggleAvailableOnRequest = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...data,
      availableOnRequest: e.target.checked
    });
  };

  const handleAddRef = () => {
    const newItem: ReferenceItem = {
      id: 'ref-' + Date.now(),
      name: '',
      title: '',
      company: '',
      email: '',
      phone: ''
    };
    onChange({
      ...data,
      availableOnRequest: false,
      items: [...(data.items || []), newItem]
    });
  };

  const handleUpdateRef = (id: string, field: keyof ReferenceItem, value: string) => {
    const updated = (data.items || []).map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange({ ...data, items: updated });
  };

  const handleDeleteRef = (id: string) => {
    onChange({
      ...data,
      items: (data.items || []).filter(item => item.id !== id)
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            References
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Professional or academic referees.</p>
        </div>
      </div>

      <div className="p-4 bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-4">
        <label className="inline-flex items-center gap-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 cursor-pointer">
          <input
            type="checkbox"
            checked={data.availableOnRequest}
            onChange={handleToggleAvailableOnRequest}
            className="rounded border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-slate-900 dark:focus:ring-white"
          />
          Display "References available upon request" (Standard industry practice)
        </label>

        {!data.availableOnRequest && (
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Specific Referees</span>
              <button
                type="button"
                onClick={handleAddRef}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg transition"
              >
                <Plus className="w-3.5 h-3.5" /> Add Referee
              </button>
            </div>

            {(!data.items || data.items.length === 0) ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 italic">No referees added yet.</p>
            ) : (
              <div className="space-y-3">
                {data.items.map((ref) => (
                  <div key={ref.id} className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700/70 pb-2">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{ref.name || 'New Referee'}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteRef(ref.id)}
                        className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded-md transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <input
                        type="text"
                        value={ref.name}
                        onChange={(e) => handleUpdateRef(ref.id, 'name', e.target.value)}
                        placeholder="Referee Full Name"
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                      />
                      <input
                        type="text"
                        value={ref.title}
                        onChange={(e) => handleUpdateRef(ref.id, 'title', e.target.value)}
                        placeholder="Job Title (e.g. Engineering Lead)"
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                      />
                      <input
                        type="text"
                        value={ref.company}
                        onChange={(e) => handleUpdateRef(ref.id, 'company', e.target.value)}
                        placeholder="Company / University"
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                      />
                      <input
                        type="email"
                        value={ref.email}
                        onChange={(e) => handleUpdateRef(ref.id, 'email', e.target.value)}
                        placeholder="Email Address"
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

