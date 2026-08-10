import React from 'react';
import { FileText, Lightbulb } from 'lucide-react';

interface SummaryFormProps {
  summary: string;
  onChange: (value: string) => void;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({ summary, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            Professional Summary / Objective
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            A concise 2-4 sentence overview highlighting your core strengths and career goals.
          </p>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
          {summary.length} chars
        </span>
      </div>

      <div>
        <textarea
          rows={4}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Dedicated Computer Science student with strong problem-solving skills and experience in full-stack web development. Passionate about building accessible, scalable software applications..."
          className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 leading-relaxed text-slate-800"
        />
      </div>

      <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-xs text-blue-900 space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-blue-800">
          <Lightbulb className="w-4 h-4 text-blue-600 shrink-0" />
          <span>ATS Best Practice Tips:</span>
        </div>
        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-blue-800/90 pl-1">
          <li>Include target job keywords (e.g., Software Engineering, React, Data Analysis).</li>
          <li>Keep it focused: 50-100 words works best for student and entry-level CVs.</li>
          <li>Avoid generic buzzwords; state measurable achievements and primary technical domain.</li>
        </ul>
      </div>
    </div>
  );
};
