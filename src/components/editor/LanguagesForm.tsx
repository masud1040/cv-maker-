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
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Languages className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            Languages
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Spoken and written language proficiencies.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Language
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">No languages added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs font-medium text-slate-900 dark:text-white underline underline-offset-2 hover:opacity-80"
          >
            + Add language
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {entries.map((lang) => (
            <div key={lang.id} className="p-3 bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/70 flex items-center gap-3">
              <input
                type="text"
                value={lang.name}
                onChange={(e) => handleUpdate(lang.id, 'name', e.target.value)}
                placeholder="e.g. English, Bengali, German"
                className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
              />
              <select
                value={lang.proficiency}
                onChange={(e) => handleUpdate(lang.id, 'proficiency', e.target.value as LanguageProficiency)}
                className="px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
              >
                {PROFICIENCIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleDelete(lang.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
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

