import React from 'react';
import { LanguageEntry, LanguageProficiency } from '../../types/cv';
import { Languages, Plus, Trash2 } from 'lucide-react';

interface LanguagesFormProps {
  entries: LanguageEntry[];
  onChange: (entries: LanguageEntry[]) => void;
}

const PROFICIENCIES: LanguageProficiency[] = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'];

export const LanguagesForm: React.FC<LanguagesFormProps> = ({ entries, onChange }) => {
  const handleAdd = () => {
    const newEntry: LanguageEntry = {
      id: 'lang-' + Date.now(),
      name: '',
      proficiency: 'Fluent'
    };
    onChange([...entries, newEntry]);
  };

  const handleUpdate = (id: string, field: keyof LanguageEntry, value: any) => {
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
            <Languages className="w-4 h-4 text-blue-600" />
            Languages
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Spoken and written language proficiencies.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Language
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-xs text-slate-500">No languages added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add language
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((lang) => (
            <div key={lang.id} className="p-2.5 bg-slate-50/70 rounded-xl border border-slate-200 flex items-center gap-3">
              <input
                type="text"
                value={lang.name}
                onChange={(e) => handleUpdate(lang.id, 'name', e.target.value)}
                placeholder="e.g. English, Bengali, German"
                className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded-lg"
              />
              <select
                value={lang.proficiency}
                onChange={(e) => handleUpdate(lang.id, 'proficiency', e.target.value as LanguageProficiency)}
                className="px-2.5 py-1 text-xs border border-slate-300 rounded-lg bg-white"
              >
                {PROFICIENCIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleDelete(lang.id)}
                className="p-1 text-slate-400 hover:text-red-600 rounded transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
