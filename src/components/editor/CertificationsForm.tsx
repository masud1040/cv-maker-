import React from 'react';
import { CertificationEntry } from '../../types/cv';
import { Award, Plus, Trash2, Link as LinkIcon, Calendar, Building2 } from 'lucide-react';

interface CertificationsFormProps {
  entries: CertificationEntry[];
  onChange: (entries: CertificationEntry[]) => void;
}

export const CertificationsForm: React.FC<CertificationsFormProps> = ({ entries, onChange }) => {
  const handleAdd = () => {
    const newEntry: CertificationEntry = {
      id: 'cert-' + Date.now(),
      name: '',
      organization: '',
      year: new Date().getFullYear().toString(),
      link: ''
    };
    onChange([...entries, newEntry]);
  };

  const handleUpdate = (id: string, field: keyof CertificationEntry, value: string) => {
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
            <Award className="w-4 h-4 text-blue-600" />
            Certifications & Training
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Professional credentials, online courses, and licenses.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Certification
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-xs text-slate-500">No certifications added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add certification
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((cert) => (
            <div key={cert.id} className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                <span className="text-xs font-bold text-slate-800">
                  {cert.name || 'New Certification'}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(cert.id)}
                  className="p-1 text-slate-400 hover:text-red-600 rounded transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Certification Name</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleUpdate(cert.id, 'name', e.target.value)}
                    placeholder="e.g. AWS Certified Developer"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Issuing Organization</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cert.organization}
                      onChange={(e) => handleUpdate(cert.id, 'organization', e.target.value)}
                      placeholder="e.g. Amazon Web Services / Coursera"
                      className="w-full pl-7 pr-2 py-1 text-xs border border-slate-300 rounded-lg"
                    />
                    <Building2 className="w-3 h-3 text-slate-400 absolute left-2 top-2" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Year</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cert.year}
                      onChange={(e) => handleUpdate(cert.id, 'year', e.target.value)}
                      placeholder="2024"
                      className="w-full pl-7 pr-2 py-1 text-xs border border-slate-300 rounded-lg"
                    />
                    <Calendar className="w-3 h-3 text-slate-400 absolute left-2 top-2" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-1">Credential URL (Optional)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cert.link || ''}
                      onChange={(e) => handleUpdate(cert.id, 'link', e.target.value)}
                      placeholder="e.g. verify.link/abc"
                      className="w-full pl-7 pr-2 py-1 text-xs border border-slate-300 rounded-lg"
                    />
                    <LinkIcon className="w-3 h-3 text-slate-400 absolute left-2 top-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
