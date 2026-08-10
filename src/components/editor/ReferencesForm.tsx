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
      <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-600" />
            References
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Professional or academic referees.</p>
        </div>
      </div>

      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
        <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={data.availableOnRequest}
            onChange={handleToggleAvailableOnRequest}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Display "References available upon request" (Recommended)
        </label>

        {!data.availableOnRequest && (
          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-700">Specific Referees</span>
              <button
                type="button"
                onClick={handleAddRef}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-3.5 h-3.5" /> Add Referee
              </button>
            </div>

            {(!data.items || data.items.length === 0) ? (
              <p className="text-xs text-slate-400 italic">No referees added yet.</p>
            ) : (
              <div className="space-y-3">
                {data.items.map((ref) => (
                  <div key={ref.id} className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                      <span className="text-xs font-bold text-slate-800">{ref.name || 'New Referee'}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteRef(ref.id)}
                        className="text-slate-400 hover:text-red-600 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <input
                        type="text"
                        value={ref.name}
                        onChange={(e) => handleUpdateRef(ref.id, 'name', e.target.value)}
                        placeholder="Referee Name"
                        className="px-2 py-1 border border-slate-300 rounded"
                      />
                      <input
                        type="text"
                        value={ref.title}
                        onChange={(e) => handleUpdateRef(ref.id, 'title', e.target.value)}
                        placeholder="Job Title"
                        className="px-2 py-1 border border-slate-300 rounded"
                      />
                      <input
                        type="text"
                        value={ref.company}
                        onChange={(e) => handleUpdateRef(ref.id, 'company', e.target.value)}
                        placeholder="Company / University"
                        className="px-2 py-1 border border-slate-300 rounded"
                      />
                      <input
                        type="email"
                        value={ref.email}
                        onChange={(e) => handleUpdateRef(ref.id, 'email', e.target.value)}
                        placeholder="Email Address"
                        className="px-2 py-1 border border-slate-300 rounded"
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
