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
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            Certifications & Training
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Professional credentials, online courses, and licenses.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Certification
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">No certifications added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs font-medium text-slate-900 dark:text-white underline underline-offset-2 hover:opacity-80"
          >
            + Add certification
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((cert) => (
            <div key={cert.id} className="p-4 bg-slate-50/70 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700/70 pb-2">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {cert.name || 'New Certification'}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(cert.id)}
                  className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Certification Name</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => handleUpdate(cert.id, 'name', e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect"
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Issuing Organization</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cert.organization}
                      onChange={(e) => handleUpdate(cert.id, 'organization', e.target.value)}
                      placeholder="e.g. Amazon Web Services"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                    />
                    <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Year</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cert.year}
                      onChange={(e) => handleUpdate(cert.id, 'year', e.target.value)}
                      placeholder="2024"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                    />
                    <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Credential URL (Optional)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cert.link || ''}
                      onChange={(e) => handleUpdate(cert.id, 'link', e.target.value)}
                      placeholder="e.g. creds.link/verify"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
                    />
                    <LinkIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
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

