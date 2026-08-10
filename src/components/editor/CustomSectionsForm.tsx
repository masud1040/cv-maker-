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
      <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <FolderPlus className="w-4 h-4 text-blue-600" />
            Custom Sections
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Add additional tailored sections (e.g. Publications, Volunteer Work, Key Courses).</p>
        </div>
        <button
          type="button"
          onClick={handleAddSection}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Custom Section
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-xs text-slate-500">No custom sections created.</p>
          <button
            type="button"
            onClick={handleAddSection}
            className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
          >
            + Create a custom section
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((sec) => (
            <div key={sec.id} className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => handleUpdateTitle(sec.id, e.target.value)}
                  placeholder="Section Title (e.g., Publications)"
                  className="flex-1 font-bold text-xs px-2.5 py-1 border border-slate-300 rounded-lg bg-white"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteSection(sec.id)}
                  className="p-1 text-slate-400 hover:text-red-600 rounded"
                  title="Delete Section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {sec.items.map((item) => (
                  <div key={item.id} className="p-2 bg-white rounded-lg border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-700">Item Details</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(sec.id, item.id)}
                        className="p-0.5 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateItem(sec.id, item.id, 'title', e.target.value)}
                        placeholder="Title / Role / Heading"
                        className="px-2 py-1 border border-slate-300 rounded"
                      />
                      <input
                        type="text"
                        value={item.subtitle || ''}
                        onChange={(e) => handleUpdateItem(sec.id, item.id, 'subtitle', e.target.value)}
                        placeholder="Organization / Subtitle"
                        className="px-2 py-1 border border-slate-300 rounded"
                      />
                      <input
                        type="text"
                        value={item.date || ''}
                        onChange={(e) => handleUpdateItem(sec.id, item.id, 'date', e.target.value)}
                        placeholder="Date / Period"
                        className="px-2 py-1 border border-slate-300 rounded"
                      />
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleUpdateItem(sec.id, item.id, 'description', e.target.value)}
                        placeholder="Description..."
                        className="px-2 py-1 border border-slate-300 rounded"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddItem(sec.id)}
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 pt-1"
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
