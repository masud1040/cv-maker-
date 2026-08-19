import React from 'react';
import { FileText, Lightbulb, Sparkles } from 'lucide-react';

interface SummaryFormProps {
  summary: string;
  onChange: (value: string) => void;
  onOpenAIModal?: () => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ summary, onChange, onOpenAIModal }) => {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            Professional Summary / Objective
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            A concise 2-4 sentence overview highlighting your core strengths and career goals.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onOpenAIModal && (
            <button
              type="button"
              onClick={onOpenAIModal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 rounded-lg shadow-2xs transition"
              title="Enhance Summary with Gemini AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>AI Polish</span>
            </button>
          )}
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
            {summary.length} chars
          </span>
        </div>
      </div>

      <div className="relative">
        <textarea
          rows={5}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Dedicated Computer Science student with strong problem-solving skills and experience in full-stack web development. Passionate about building accessible, scalable software applications..."
          className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white leading-relaxed text-slate-900 dark:text-slate-100 transition"
        />
        {onOpenAIModal && summary.trim().length > 10 && (
          <button
            type="button"
            onClick={onOpenAIModal}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 border border-indigo-200 dark:border-indigo-800 rounded-md shadow-xs transition backdrop-blur-xs"
          >
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span>AI Rewrite</span>
          </button>
        )}
      </div>

      <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/70 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
        <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>ATS Recommendations</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-400 pl-1">
          <li>Include target job keywords relevant to the role you are applying for.</li>
          <li>Keep it focused: 50–100 words works best for single-page and entry-level resumes.</li>
          <li>State measurable areas of expertise and primary technical focus.</li>
        </ul>
      </div>
    </div>
  );
};

