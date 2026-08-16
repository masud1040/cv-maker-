import React, { useState } from 'react';
import { CVData } from '../types/cv';
import { TEMPLATES } from '../data/templates';
import { Plus, Edit3, Copy, Trash2, Download, Search, FileText, Calendar, Clock, ArrowUpRight, AlertCircle } from 'lucide-react';

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
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredCVs = cvs.filter(cv =>
    cv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cv.personalInfo.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTemplateName = (templateId: string) => {
    const found = TEMPLATES.find(t => t.id === templateId);
    return found ? found.name : templateId;
  };

  const getTemplateCategory = (templateId: string) => {
    const found = TEMPLATES.find(t => t.id === templateId);
    return found?.category || 'Standard';
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  // Determine greeting and user name
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const candidateName = cvs.find(c => Boolean(c.personalInfo.fullName))?.personalInfo.fullName || 'there';
  const firstName = candidateName.split(' ')[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-7">
        {/* Dashboard Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {getGreeting()}, {firstName}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              Create a professional resume in minutes.
            </p>
          </div>

          <button
            onClick={onCreateNew}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs rounded-lg shadow-xs transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            Create New Resume
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resumes by title or name..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 dark:focus:border-white transition-all shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing {filteredCVs.length} of {cvs.length} {cvs.length === 1 ? 'resume' : 'resumes'}
          </div>
        </div>

        {/* Grid of Resume Documents */}
        {filteredCVs.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center space-y-4">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                {searchTerm ? 'No matching resumes found' : 'No resumes yet'}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs max-w-sm mx-auto">
                {searchTerm
                  ? 'Try searching with a different keyword or candidate name.'
                  : 'Create your first professional resume and start building your career.'}
              </p>
            </div>
            <button
              onClick={onCreateNew}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Create Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCVs.map((cv) => (
              <div
                key={cv.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200 p-5 flex flex-col justify-between space-y-4 group shadow-2xs hover:shadow-xs"
              >
                <div className="space-y-3">
                  {/* Top metadata tags */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700">
                      {getTemplateName(cv.templateId)}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 shrink-0 font-medium">
                      <Clock className="w-3 h-3" />
                      {formatDate(cv.updatedAt)}
                    </span>
                  </div>

                  {/* Document Title & Candidate */}
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cv.title || 'Untitled Resume'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {cv.personalInfo.fullName ? (
                        <span>Candidate: <strong className="font-medium text-slate-700 dark:text-slate-200">{cv.personalInfo.fullName}</strong></span>
                      ) : (
                        <span>No applicant name set</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onEdit(cv.id)}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit
                    </button>

                    <button
                      onClick={() => onDownload(cv)}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => onDuplicate(cv.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      Duplicate
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(cv.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 max-w-sm w-full p-6 shadow-xl space-y-4">
            <div className="w-10 h-10 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Delete Resume?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Are you sure you want to delete this resume? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-3.5 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-xs"
              >
                Delete Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

