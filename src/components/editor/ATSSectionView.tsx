import React, { useState } from 'react';
import { CVData } from '../../types/cv';
import { analyzeCVForATS, INDUSTRY_CATALOG } from '../../utils/atsScanner';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  FileText,
  Search,
  Plus,
  Layers,
  Copy,
  Check
} from 'lucide-react';

interface ATSSectionViewProps {
  cvData: CVData;
  onNavigateToTab: (tabId: string) => void;
  onAddSkill: (skill: string) => void;
  onOpenFullModal: () => void;
  selectedIndustry?: string;
  onChangeIndustry?: (industry: string) => void;
}

export const ATSSectionView: React.FC<ATSSectionViewProps> = ({
  cvData,
  onNavigateToTab,
  onAddSkill,
  onOpenFullModal,
  selectedIndustry: propIndustry,
  onChangeIndustry
}) => {
  const [internalIndustry, setInternalIndustry] = useState(propIndustry || 'general');
  const [jobDescription, setJobDescription] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const currentIndustry = propIndustry || internalIndustry;

  const handleIndustryChange = (ind: string) => {
    setInternalIndustry(ind);
    if (onChangeIndustry) {
      onChangeIndustry(ind);
    }
  };

  const report = analyzeCVForATS(cvData, jobDescription, currentIndustry);

  const passedCount = report.checklist.filter(i => i.status === 'pass').length;
  const issuesCount = report.checklist.filter(i => i.status !== 'pass').length;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 dark:text-emerald-400 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400 border-blue-500 bg-blue-50 dark:bg-blue-950/30';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400 border-amber-500 bg-amber-50 dark:bg-amber-950/30';
    return 'text-red-600 dark:text-red-400 border-red-500 bg-red-50 dark:bg-red-950/30';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xs shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                ATS Readiness & Keyword Analysis
              </h2>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Live Scanner
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live automated evaluation against standard Applicant Tracking Systems.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenFullModal}
          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-slate-900 dark:hover:border-white text-slate-800 dark:text-slate-200 transition shadow-2xs shrink-0"
        >
          Expand Full Scanner
        </button>
      </div>

      {/* Main Score & Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-stretch">
        {/* Score Card */}
        <div className={`sm:col-span-5 p-4 rounded-2xl border flex items-center gap-4 ${getScoreColor(report.overallScore)}`}>
          <div className="w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center bg-white dark:bg-slate-900 shrink-0">
            <span className="text-xl font-black font-mono leading-none">{report.overallScore}</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase">/100</span>
          </div>

          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              ATS Compliance
            </span>
            <div className="text-base font-black text-slate-900 dark:text-white truncate">
              {report.grade}
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
              {issuesCount === 0
                ? 'All core ATS criteria passed!'
                : `${issuesCount} recommendation(s) found to optimize.`}
            </p>
          </div>
        </div>

        {/* 3 Quick Diagnostics */}
        <div className="sm:col-span-7 grid grid-cols-3 gap-2">
          <div className="p-3 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/70 text-center flex flex-col justify-center">
            <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center justify-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Verbs</span>
            </div>
            <div className="text-base font-black text-slate-900 dark:text-white mt-0.5">
              {report.detectedActionVerbs.length}
            </div>
            <span className="text-[10px] text-slate-400">Action verbs</span>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/70 text-center flex flex-col justify-center">
            <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3 text-blue-500" />
              <span>Metrics</span>
            </div>
            <div className="text-base font-black text-slate-900 dark:text-white mt-0.5">
              {report.metricsDetected.length}
            </div>
            <span className="text-[10px] text-slate-400">Data points</span>
          </div>

          <div className="p-3 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/70 text-center flex flex-col justify-center">
            <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center justify-center gap-1">
              <FileText className="w-3 h-3 text-purple-500" />
              <span>Length</span>
            </div>
            <div className="text-base font-black text-slate-900 dark:text-white mt-0.5">
              {report.wordCount}
            </div>
            <span className="text-[10px] text-slate-400">Total words</span>
          </div>
        </div>
      </div>

      {/* Checklist Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Optimization Checklist ({passedCount}/{report.checklist.length} Passed)</span>
          </h3>
        </div>

        <div className="space-y-2.5">
          {report.checklist.map(item => {
            const isPass = item.status === 'pass';
            const isWarning = item.status === 'warning';

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 transition-all ${
                  isPass
                    ? 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/70'
                    : isWarning
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/90 dark:border-amber-800/50'
                    : 'bg-red-50/50 dark:bg-red-950/20 border-red-200/90 dark:border-red-800/50'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0 flex-1">
                  <div className="mt-0.5 shrink-0">
                    {isPass ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>

                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full ${
                          isPass
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : isWarning
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                        }`}
                      >
                        {isPass ? 'OK' : isWarning ? 'Tip' : 'Missing'}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300">
                      {item.recommendation}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigateToTab(item.targetTab)}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-1 shrink-0 transition"
                >
                  <span>Edit</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Job Description Scanner */}
      <div className="p-4 rounded-2xl border border-blue-200/80 dark:border-blue-900/50 bg-blue-50/40 dark:bg-blue-950/20 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Target Job Description Matcher
            </h4>
          </div>
          {report.jobDescriptionMatchScore !== undefined && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
              {report.jobDescriptionMatchScore}% Keyword Match
            </span>
          )}
        </div>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste Job Description / Requirements to test keyword matching..."
          rows={2}
          className="w-full p-2.5 text-xs bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white"
        />

        {report.jobDescriptionMissingKeywords && report.jobDescriptionMissingKeywords.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 block">
              Missing Job Keywords (Click + to add to Skills):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {report.jobDescriptionMissingKeywords.slice(0, 12).map((kw, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onAddSkill(kw)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 transition"
                  title={`Add "${kw}" to skills`}
                >
                  <Plus className="w-2.5 h-2.5" />
                  <span>{kw}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Industry Keyword Suggestions */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700/70 bg-white dark:bg-slate-800/40 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Essential Industry Keywords</span>
          </h4>

          <select
            value={currentIndustry}
            onChange={(e) => handleIndustryChange(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
          >
            {INDUSTRY_CATALOG.map(ind => (
              <option key={ind.id} value={ind.id}>
                {ind.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {report.industryKeywordMatches.map((item, idx) => (
            <div
              key={idx}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition ${
                item.found
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 font-medium'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {item.found ? (
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <button
                  type="button"
                  onClick={() => onAddSkill(item.keyword)}
                  className="hover:text-slate-900 dark:hover:text-white"
                  title={`Add "${item.keyword}" to skills`}
                >
                  <Plus className="w-3 h-3" />
                </button>
              )}
              <span className="capitalize">{item.keyword}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
