import React from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';

interface SummaryFormProps {
  summary: string;
  onChange: (value: string) => void;
  onOpenAIModal?: () => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ summary, onChange, onOpenAIModal }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          rows={6}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Dedicated Computer Science graduate with strong problem-solving abilities and hands-on experience in full-stack web application development. Proven track record in collaborating on cross-functional teams to build performant, user-friendly digital products..."
          className="w-full p-3.5 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white leading-relaxed text-slate-900 dark:text-slate-100 transition shadow-2xs resize-y"
        />

        <div className="flex items-center justify-between mt-2 px-1">
          <span className="text-[11px] text-slate-400 font-mono">
            {summary.trim().split(/\s+/).filter(Boolean).length} words • {summary.length} characters
          </span>

          {onOpenAIModal && (
            <button
              type="button"
              onClick={onOpenAIModal}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Optimize with AI</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong className="text-slate-900 dark:text-white">Pro Tip:</strong> Aim for 3–5 sentences highlighting your core area of expertise, top 2 achievements or projects, and the value you bring to your prospective employer.
        </p>
      </div>
    </div>
  );
};

