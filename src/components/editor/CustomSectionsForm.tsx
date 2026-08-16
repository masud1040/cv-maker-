import React from 'react';
import { CustomSection, CustomItem } from '../../types/cv';
import { FolderPlus, Plus, Trash2 } from 'lucide-react';

interface CustomSectionsFormProps {
  sections: CustomSection[];
  onChange: (sections: CustomSection[]) => void;
}

export const CustomSectionsForm: React.FC<CustomSectionsFormProps> = ({ sections, onChange }) => {
  const handleAddSection = () => {
    const newSection: CustomSection = {
      id: 'custom-' + Date.now(),
      title: 'Custom Section',
      items: [
        {
          id: 'citem-' + Date.now(),
          title: 'Title / Item',
          subtitle: '',
          date: '',
          description: ''
        }
      ]
    };
    onChange([...sections, newSection]);
  };

  const handleDeleteSection = (id: string) => {
    onChange(sections.filter(s => s.id !== id));
  };

  const handleUpdateTitle = (id: string, newTitle: string) => {
    onChange(sections.map(s => s.id === id ? { ...s, title: newTitle } : s));
  };

  const handleAddItem = (sectionId: string) => {
    onChange(sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: [
            ...s.items,
            {
              id: 'citem-' + Date.now(),
              title: '',
              subtitle: '',
              date: '',
              description: ''
            }
          ]
        };
      }
      return s;
    }));
  };

  const handleUpdateItem = (sectionId: string, itemId: string, field: keyof CustomItem, value: string) => {
    onChange(sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: s.items.map(it => it.id === itemId ? { ...it, [field]: value } : it)
        };
      }
      return s;
    }));
  };

  const handleDeleteItem = (sectionId: string, itemId: string) => {
    onChange(sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          items: s.items.filter(it => it.id !== itemId)
        };
      }
      return s;
    }));
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <FolderPlus className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            Custom Sections
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Add additional tailored sections (e.g. Publications, Volunteer Work, Key Courses).</p>
        </div>
        <button
          type="button"
          onClick={handleAddSection}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Custom Section
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">No custom sections created.</p>
          <button
            type="button"
            onClick={handleAddSection}
            className="mt-2 text-xs font-medium text-slate-900 dark:text-white underline underline-offset-2 hover:opacity-80"
          >
            + Create a custom section
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((sec) => (
            <div key={sec.id} className="p-4 bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700/70 pb-2.5">
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => handleUpdateTitle(sec.id, e.target.value)}
                  placeholder="Section Title (e.g., Publications)"
                  className="flex-1 font-semibold text-xs px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteSection(sec.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
                  title="Delete Section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Items */}
              <div className="space-y-2.5">
                {sec.items.map((item) => (
                  <div key={item.id} className="p-3 bg-white dark:bg-slate-850 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 text-xs">Item Details</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(sec.id, item.id)}
                        className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateItem(sec.id, item.id, 'title', e.target.value)}
                        placeholder="Title / Role / Heading"
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                      />
                      <input
                        type="text"
                        value={item.subtitle || ''}
                        onChange={(e) => handleUpdateItem(sec.id, item.id, 'subtitle', e.target.value)}
                        placeholder="Organization / Subtitle"
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                      />
                      <input
                        type="text"
                        value={item.date || ''}
                        onChange={(e) => handleUpdateItem(sec.id, item.id, 'date', e.target.value)}
                        placeholder="Date / Period"
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                      />
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleUpdateItem(sec.id, item.id, 'description', e.target.value)}
                        placeholder="Description..."
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddItem(sec.id)}
                  className="text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 pt-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Item to {sec.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

