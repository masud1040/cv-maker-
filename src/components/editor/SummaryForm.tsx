import React, { useState } from 'react';
import { Lightbulb, Check, Copy, FileText, CheckCircle2, BookmarkPlus } from 'lucide-react';

interface SummaryFormProps {
  summary: string;
  onChange: (value: string) => void;
}

export interface SummaryPreset {
  id: string;
  title: string;
  badge: string;
  text: string;
}

export const GENERAL_SUMMARY_PRESETS: SummaryPreset[] = [
  {
    id: 'general-primary',
    title: 'Standard Career Objective (General)',
    badge: 'Recommended / Standard',
    text: 'To build up my career in the reputed organization where there is immense scope to and prove ones expertise and to maneuver positive contribution in organization by sincerely accomplishing the duties and responsibilities assigned to me.'
  },
  {
    id: 'general-executive',
    title: 'Executive & Dedication Focus',
    badge: 'Corporate & Office',
    text: 'Seeking a challenging and responsible position in a well-established organization where I can utilize my educational qualifications, interpersonal skills, and professional dedication to contribute effectively to the organization\'s growth and achieve organizational goals.'
  },
  {
    id: 'general-entry',
    title: 'Proactive & Fast-Learning',
    badge: 'Entry-Level / Fresh Candidate',
    text: 'A proactive, self-motivated, and hardworking individual seeking an opportunity in a progressive company to enhance my practical knowledge, develop professional skills, and contribute productively through disciplined teamwork.'
  },
  {
    id: 'general-operations',
    title: 'Operational & Problem-Solving Focus',
    badge: 'Operations & Management',
    text: 'To secure a responsible career position in an esteemed environment where I can apply my administrative capabilities, analytical thinking, and problem-solving abilities to ensure smooth operations and continuous organizational progress.'
  }
];

export const SummaryForm: React.FC<SummaryFormProps> = ({ summary, onChange }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApplyPreset = (text: string) => {
    onChange(text);
  };

  const wordCount = summary.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="space-y-5">
      {/* Textarea Input Container */}
      <div className="space-y-2">
        <div className="relative">
          <textarea
            rows={5}
            value={summary}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write your career objective or professional summary here, or select from the pre-written general options below..."
            className="w-full p-3.5 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white leading-relaxed text-slate-900 dark:text-slate-100 transition shadow-2xs resize-y"
          />
        </div>

        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] text-slate-400 font-mono">
            {wordCount} words • {summary.length} characters
          </span>

          {summary.trim().length > 0 && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-[11px] text-slate-400 hover:text-red-500 transition cursor-pointer"
            >
              Clear text
            </button>
          )}
        </div>
      </div>

      {/* Ready-Made General Objectives Section */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <BookmarkPlus className="w-3.5 h-3.5 text-indigo-500" />
            <span>Pre-written General Objectives & Summaries</span>
          </h4>
          <span className="text-[11px] text-slate-400">
            Click any option to insert into your CV
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {GENERAL_SUMMARY_PRESETS.map((preset) => {
            const isApplied = summary.trim() === preset.text.trim();

            return (
              <div
                key={preset.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isApplied
                    ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-800 shadow-2xs'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {preset.title}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {preset.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(preset.id, preset.text)}
                      className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded transition cursor-pointer"
                      title="Copy to clipboard"
                    >
                      {copiedId === preset.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleApplyPreset(preset.text)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                        isApplied
                          ? 'bg-emerald-600 text-white dark:bg-emerald-500 shadow-2xs'
                          : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-2xs'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-3 h-3" />
                          <span>Use This</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  "{preset.text}"
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pro Tip Box */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong className="text-slate-900 dark:text-white">Tip:</strong> You can click <strong className="text-slate-800 dark:text-slate-200">"Use This"</strong> on any pre-written objective above and customize the wording to match your specific target job position or industry.
        </p>
      </div>
    </div>
  );
};
