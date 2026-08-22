import React, { useState } from 'react';
import { CVData } from '../../types/cv';
import {
  analyzeCVForATS,
  INDUSTRY_CATALOG,
  ATSSuggestion
} from '../../utils/atsScanner';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
  ChevronDown,
  ChevronUp,
  Plus,
  Copy,
  Check,
  Briefcase,
  TrendingUp,
  FileText,
  Search,
  Wrench,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ATSRealtimeIndicatorProps {
  cvData: CVData;
  selectedIndustry: string;
  onChangeIndustry: (industry: string) => void;
  onNavigateToTab: (tabId: string) => void;
  onAddSkill: (skill: string) => void;
  onOpenFullModal: () => void;
  activeTab?: string;
}

export const ATSRealtimeIndicator: React.FC<ATSRealtimeIndicatorProps> = ({
  cvData,
  selectedIndustry,
  onChangeIndustry,
  onNavigateToTab,
  onAddSkill,
  onOpenFullModal,
  activeTab
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<'keywords' | 'suggestions' | 'verbs' | 'job_match'>('keywords');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Compute live real-time ATS report
  const report = analyzeCVForATS(cvData, jobDescription, selectedIndustry);
  const activeIndustry = INDUSTRY_CATALOG.find(i => i.id === selectedIndustry) || INDUSTRY_CATALOG[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getScoreTheme = (score: number) => {
    if (score >= 85) {
      return {
        text: 'text-emerald-700 dark:text-emerald-300',
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        border: 'border-emerald-200 dark:border-emerald-800/70',
        ring: 'stroke-emerald-500',
        badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
        pill: 'bg-emerald-500',
        label: 'Excellent'
      };
    }
    if (score >= 70) {
      return {
        text: 'text-blue-700 dark:text-blue-300',
        bg: 'bg-blue-50 dark:bg-blue-950/40',
        border: 'border-blue-200 dark:border-blue-800/70',
        ring: 'stroke-blue-500',
        badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200',
        pill: 'bg-blue-500',
        label: 'Good'
      };
    }
    if (score >= 50) {
      return {
        text: 'text-amber-700 dark:text-amber-300',
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        border: 'border-amber-200 dark:border-amber-800/70',
        ring: 'stroke-amber-500',
        badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
        pill: 'bg-amber-500',
        label: 'Needs Work'
      };
    }
    return {
      text: 'text-red-700 dark:text-red-300',
      bg: 'bg-red-50 dark:bg-red-950/40',
      border: 'border-red-200 dark:border-red-800/70',
      ring: 'stroke-red-500',
      badge: 'bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-200',
      pill: 'bg-red-500',
      label: 'Critical'
    };
  };

  const theme = getScoreTheme(report.overallScore);

  // SVG Circular Gauge calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (report.overallScore / 100) * circumference;

  return (
    <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 transition-all">
      {/* Top Real-time Indicator Bar */}
      <div className="px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Gauge + Score + Industry Filter */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Circular Score Gauge */}
          <div
            className="relative flex items-center justify-center cursor-pointer group"
            onClick={() => setIsExpanded(!isExpanded)}
            title="Click to toggle real-time ATS optimization suggestions"
          >
            <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 44 44">
              {/* Background circle */}
              <circle
                cx="22"
                cy="22"
                r={radius}
                className="stroke-slate-200 dark:stroke-slate-700"
                strokeWidth="3.5"
                fill="transparent"
              />
              {/* Animated Progress circle */}
              <circle
                cx="22"
                cy="22"
                r={radius}
                className={`${theme.ring} transition-all duration-700 ease-out`}
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[11px] font-black font-mono leading-none text-slate-900 dark:text-white">
                {report.overallScore}
              </span>
              <span className="text-[7px] font-bold uppercase text-slate-400 leading-none mt-0.5">
                ATS
              </span>
            </div>
          </div>

          {/* Score Info & Grade */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-indigo-500" />
                ATS Score
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${theme.badge}`}>
                {theme.label}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {report.matchedKeywordCount}/{report.totalIndustryKeywords} industry keywords matched ({report.keywordMatchPercentage}%)
            </p>
          </div>
        </div>

        {/* Center/Right: Industry Selector + Suggestions Pills + Expand Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Target Industry Selector */}
          <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-300">
            <Briefcase className="w-3 h-3 text-slate-500 dark:text-slate-400 mr-1.5 shrink-0" />
            <select
              value={selectedIndustry}
              onChange={(e) => onChangeIndustry(e.target.value)}
              className="bg-transparent font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer text-xs pr-1 max-w-[110px] xs:max-w-[140px] sm:max-w-[170px] truncate"
              title="Select your target industry for keyword matching"
            >
              {INDUSTRY_CATALOG.map(ind => (
                <option key={ind.id} value={ind.id} className="dark:bg-slate-900 dark:text-white">
                  {ind.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Suggestions Count Badge */}
          <button
            type="button"
            onClick={() => {
              setActiveSubTab('suggestions');
              setIsExpanded(true);
            }}
            className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
              report.topSuggestions.length > 0
                ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/40'
                : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
            }`}
            title="View Real-Time Suggestions"
          >
            <Zap className="w-3 h-3 text-amber-500" />
            <span>{report.topSuggestions.length} Tips</span>
          </button>

          {/* Toggle Expand / Collapse Details Button */}
          <button
            type="button"
            onClick={() => setIsExpanded(prev => !prev)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
              isExpanded
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60'
            }`}
          >
            <span>{isExpanded ? 'Hide Analysis' : 'Analyze & Keywords'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Full Modal Trigger */}
          <button
            type="button"
            onClick={onOpenFullModal}
            className="hidden md:inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition cursor-pointer"
            title="Open comprehensive 100-point ATS Audit"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Full Audit</span>
          </button>
        </div>
      </div>

      {/* Expanded Real-time Analysis Assistant Drawer */}
      {isExpanded && (
        <div className="p-3.5 sm:p-5 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {/* Sub-Navigation Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-2.5 flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveSubTab('keywords')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  activeSubTab === 'keywords'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Industry Keywords ({report.matchedKeywordCount}/{report.totalIndustryKeywords})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('suggestions')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  activeSubTab === 'suggestions'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Zap className="w-3 h-3 text-amber-500" />
                <span>Actionable Improvements ({report.topSuggestions.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('verbs')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  activeSubTab === 'verbs'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <TrendingUp className="w-3 h-3 text-blue-500" />
                <span>Action Verbs ({report.detectedActionVerbs.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('job_match')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  activeSubTab === 'job_match'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Search className="w-3 h-3 text-emerald-500" />
                <span>Job Matcher</span>
              </button>
            </div>

            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono hidden sm:inline">
              Updates in real-time as you type
            </span>
          </div>

          {/* TAB 1: INDUSTRY KEYWORDS WITH 1-CLICK ADD TO SKILLS */}
          {activeSubTab === 'keywords' && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{activeIndustry.name} Keyword Scanner</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Click any missing keyword to instantly add it to your CV's Skills section.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                    Match Rate: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{report.keywordMatchPercentage}%</span>
                  </span>
                </div>
              </div>

              {/* Missing Keywords Box */}
              {report.missingIndustryKeywords.length > 0 ? (
                <div className="p-3 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      Missing Industry Keywords ({report.missingIndustryKeywords.length}):
                    </span>
                    <span className="text-[10px] text-amber-700 dark:text-amber-400">
                      Click `+` to add directly to Skills
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {report.missingIndustryKeywords.map((kw, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => onAddSkill(kw)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-amber-300 dark:border-amber-800/80 hover:bg-indigo-50 hover:border-indigo-400 dark:hover:bg-indigo-950/50 hover:text-indigo-700 dark:hover:text-indigo-300 rounded-lg shadow-2xs transition group cursor-pointer"
                        title={`Click to add "${kw}" to your CV Skills`}
                      >
                        <Plus className="w-3 h-3 text-indigo-500 group-hover:scale-110 transition-transform" />
                        <span>{kw}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Outstanding! Your resume includes all primary keywords for the <strong>{activeIndustry.name}</strong> industry benchmark.</span>
                </div>
              )}

              {/* Matched Keywords */}
              {report.matchedIndustryKeywords.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Keywords Found in Your CV ({report.matchedIndustryKeywords.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {report.matchedIndustryKeywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 rounded-lg"
                      >
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>{kw}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ACTIONABLE IMPROVEMENTS */}
          {activeSubTab === 'suggestions' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Real-Time Improvement Checklist
                </h4>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {report.topSuggestions.length} recommended optimizations
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {report.topSuggestions.map((sug) => (
                  <div
                    key={sug.id}
                    className="p-3 bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl flex items-start justify-between gap-3 shadow-2xs"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            sug.severity === 'high'
                              ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                              : sug.severity === 'medium'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          }`}
                        >
                          {sug.severity} priority
                        </span>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                          {sug.title}
                        </h5>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {sug.description}
                      </p>

                      {sug.suggestedItems && sug.suggestedItems.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {sug.suggestedItems.map((item, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                if (sug.category === 'skills') {
                                  onAddSkill(item);
                                } else {
                                  handleCopy(item);
                                }
                              }}
                              className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 bg-slate-100 dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-800 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 rounded border border-slate-200 dark:border-slate-600 transition cursor-pointer"
                              title={sug.category === 'skills' ? `Add ${item} to skills` : `Copy ${item}`}
                            >
                              <Plus className="w-2.5 h-2.5" />
                              <span>{item}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {sug.actionLabel && (
                      <button
                        type="button"
                        onClick={() => onNavigateToTab(sug.targetTab)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg shrink-0 shadow-2xs transition cursor-pointer"
                      >
                        <span>{sug.actionLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}

                {report.topSuggestions.length === 0 && (
                  <div className="p-4 text-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      All core checks passed! Your CV is highly optimized for ATS scanners.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ACTION VERBS & METRICS */}
          {activeSubTab === 'verbs' && (
            <div className="space-y-3.5">
              <div className="p-3 bg-white dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                    High-Impact Action Verbs Found ({report.detectedActionVerbs.length})
                  </h4>
                  <span className="text-[11px] text-slate-400">Target: 5+ verbs</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {report.detectedActionVerbs.map((verb, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 rounded-lg capitalize"
                    >
                      ✓ {verb}
                    </span>
                  ))}
                  {report.detectedActionVerbs.length === 0 && (
                    <span className="text-xs text-slate-400 italic">
                      No recognized action verbs found. Use dynamic verbs below in your experience bullets.
                    </span>
                  )}
                </div>
              </div>

              {/* Recommended Power Verbs to Copy */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Recommended Action Verbs to Use (Click to Copy):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {report.missingActionVerbs.slice(0, 12).map((verb, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCopy(verb)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-700 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700 rounded-lg transition cursor-pointer capitalize"
                      title={`Click to copy "${verb}"`}
                    >
                      {copiedText === verb ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-400" />
                      )}
                      <span>{verb}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Measurable Metrics Detected */}
              <div className="p-3 bg-slate-100/70 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <span className="font-bold text-slate-900 dark:text-white">
                  Measurable Metrics Detected ({report.metricsDetected.length}):
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  {report.metricsDetected.length > 0
                    ? `Found: ${report.metricsDetected.join(', ')}`
                    : 'No numerical metrics detected. Add percentages (e.g., "by 25%"), team sizes ("5 engineers"), or volume ("150+ tickets resolved").'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: JOB POSTING MATCHER */}
          {activeSubTab === 'job_match' && (
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Paste Target Job Posting Description
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Paste the requirements from the job opening to see your specific match rate and find missing target keywords.
                </p>
              </div>

              <textarea
                rows={3}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job posting text, required qualifications, or key responsibilities here..."
                className="w-full p-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white text-slate-900 dark:text-slate-100"
              />

              {jobDescription.trim().length > 15 && report.jobDescriptionMatchScore !== undefined && (
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Job Match Score:
                    </span>
                    <span className="text-sm font-black font-mono text-indigo-600 dark:text-indigo-400">
                      {report.jobDescriptionMatchScore}%
                    </span>
                  </div>

                  {report.jobDescriptionMissingKeywords && report.jobDescriptionMissingKeywords.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 block">
                        Keywords in Job Posting Missing From Your CV:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {report.jobDescriptionMissingKeywords.slice(0, 10).map((kw, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => onAddSkill(kw)}
                            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 rounded hover:bg-amber-100 cursor-pointer"
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
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
