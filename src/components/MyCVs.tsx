import React, { useState } from 'react';
import { CVData } from '../types/cv';
import { TEMPLATES } from '../data/templates';
import { Plus, Edit3, Copy, Trash2, Download, Search, FileText, Calendar, Sparkles } from 'lucide-react';

interface MyCVsProps {
  cvs: CVData[];
  onEdit: (id: string) => void;
  onCreateNew: () => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onDownload: (cv: CVData) => void;
}

export const MyCVs: React.FC<MyCVsProps> = ({
  cvs,
  onEdit,
  onCreateNew,
  onDuplicate,
  onDelete,
  onDownload
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCVs = cvs.filter(cv =>
    cv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cv.personalInfo.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTemplateName = (templateId: string) => {
    const found = TEMPLATES.find(t => t.id === templateId);
    return found ? `${found.name} (${found.category})` : templateId;
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-zinc-300 text-zinc-900 text-xs font-bold rounded-full mb-2">
              <FileText className="w-3.5 h-3.5" /> <span className="uppercase tracking-widest text-[10px]">Saved Resumes</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              My Saved CVs
            </h1>
            <p className="text-zinc-600 text-xs sm:text-sm mt-1">
              Manage, edit, duplicate, or download all your local CV documents.
            </p>
          </div>

          <button
            onClick={onCreateNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs rounded-md shadow-xs transition shrink-0"
          >
            <Plus className="w-4 h-4" />
            Create New CV
          </button>
        </div>

        {/* Search bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search CVs by title or name..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-zinc-300 rounded-md bg-white focus:outline-none focus:border-black shadow-2xs"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
        </div>

        {/* List of CVs */}
        {filteredCVs.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-zinc-300 p-12 text-center space-y-4">
            <div className="w-12 h-12 bg-zinc-100 text-zinc-900 rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">No saved CVs found</h3>
            <p className="text-zinc-500 text-xs max-w-md mx-auto">
              {searchTerm ? 'No CV matches your search query.' : 'You haven’t created any CVs yet. Select a template to start building.'}
            </p>
            <button
              onClick={onCreateNew}
              className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-bold rounded-md hover:bg-zinc-800 transition"
            >
              <Plus className="w-4 h-4" />
              Build My First CV
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCVs.map((cv) => (
              <div
                key={cv.id}
                className="bg-white rounded-xl border border-zinc-200 shadow-2xs hover:border-black transition-all duration-200 p-5 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-zinc-100 text-zinc-800 rounded border border-zinc-200">
                      {getTemplateName(cv.templateId)}
                    </span>
                    <span className="text-[10px] text-zinc-400 flex items-center gap-1 shrink-0 font-mono">
                      <Calendar className="w-3 h-3" />
                      {formatDate(cv.updatedAt)}
                    </span>
                  </div>

                  <h3 className="font-bold text-zinc-900 text-base group-hover:text-black transition truncate">
                    {cv.title || 'Untitled CV'}
                  </h3>

                  <p className="text-xs text-zinc-600">
                    Applicant: <span className="font-semibold text-zinc-800">{cv.personalInfo.fullName || 'Not specified'}</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-zinc-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onEdit(cv.id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-bold rounded transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit CV
                  </button>

                  <button
                    onClick={() => onDownload(cv)}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>

                  <button
                    onClick={() => onDuplicate(cv.id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 text-[11px] font-semibold rounded transition"
                  >
                    <Copy className="w-3 h-3 text-zinc-500" />
                    Duplicate
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete "${cv.title}"?`)) {
                        onDelete(cv.id);
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-[11px] font-semibold rounded transition"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
