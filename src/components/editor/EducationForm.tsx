import React from 'react';
import { EducationEntry } from '../../types/cv';
import { GraduationCap, Plus, Trash2, Calendar, MapPin, Award, Building2 } from 'lucide-react';

interface EducationFormProps {
  entries: EducationEntry[];
  onChange: (entries: EducationEntry[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ entries, onChange }) => {
  const handleAdd = () => {
    const newEntry: EducationEntry = {
      id: 'edu-' + Date.now(),
      institution: '',
      degree: 'Bachelor of Science',
      fieldOfStudy: '',
      gpa: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: true,
      description: ''
    };
    onChange([...entries, newEntry]);
  };

  const handleUpdate = (id: string, field: keyof EducationEntry, value: any) => {
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
            <GraduationCap className="w-4 h-4 text-blue-600" />
            Education
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Academic degrees, diplomas, and relevant coursework.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Education
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-xs text-slate-500">No education entries added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add your university or school
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((edu, index) => (
            <div key={edu.id} className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3 relative group">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-800">
                  Education #{index + 1} {edu.institution ? `— ${edu.institution}` : ''}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(edu.id)}
                  className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Institution */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Institution / University <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                      placeholder="e.g. BRAC University"
                      className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                {/* Degree */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                    placeholder="e.g. Bachelor of Science"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Field of Study */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Field of Study / Major
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => handleUpdate(edu.id, 'fieldOfStudy', e.target.value)}
                    placeholder="e.g. Computer Science & Engineering"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* GPA */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    GPA / CGPA (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={edu.gpa || ''}
                      onChange={(e) => handleUpdate(edu.id, 'gpa', e.target.value)}
                      placeholder="e.g. 3.85 / 4.00"
                      className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <Award className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={edu.location || ''}
                      onChange={(e) => handleUpdate(edu.id, 'location', e.target.value)}
                      placeholder="e.g. Dhaka, Bangladesh"
                      className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                {/* Dates & Currently Enrolled */}
                <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2 items-center">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Start Date</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => handleUpdate(edu.id, 'startDate', e.target.value)}
                        placeholder="Jan 2022"
                        className="w-full pl-8 pr-2 py-1.5 text-xs border border-slate-300 rounded-lg"
                      />
                      <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">End Date</label>
                    <input
                      type="text"
                      disabled={edu.isCurrent}
                      value={edu.isCurrent ? 'Present' : edu.endDate}
                      onChange={(e) => handleUpdate(edu.id, 'endDate', e.target.value)}
                      placeholder="Dec 2025"
                      className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-lg disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1 flex items-center pt-5">
                    <label className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={edu.isCurrent}
                        onChange={(e) => handleUpdate(edu.id, 'isCurrent', e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      Currently Enrolled
                    </label>
                  </div>
                </div>

                {/* Coursework / Description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Relevant Coursework & Achievements
                  </label>
                  <textarea
                    rows={2}
                    value={edu.description || ''}
                    onChange={(e) => handleUpdate(edu.id, 'description', e.target.value)}
                    placeholder="e.g. Relevant Coursework: Algorithms, Database Management, Artificial Intelligence, Software Engineering."
                    className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
