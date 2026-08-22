import React, { useState } from 'react';
import { CVData } from '../../types/cv';
import { analyzeCVForATS, INDUSTRY_CATALOG } from '../../utils/atsScanner';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Target,
  FileText,
  Search,
  Zap,
  TrendingUp,
  X,
  Plus,
  Copy,
  Check,
  Briefcase,
  User,
  GraduationCap,
  Wrench,
  Layers,
  HelpCircle
} from 'lucide-react';

interface ATSAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData;
  onNavigateToTab?: (tabId: string) => void;
  onAddSkill?: (skill: string) => void;
  selectedIndustry?: string;
  onChangeIndustry?: (industry: string) => void;
}

export const ATSAnalysisModal: React.FC<ATSAnalysisModalProps> = ({
  isOpen,
  onClose,
  cvData,
  onNavigateToTab,
  onAddSkill,
  selectedIndustry: propIndustry,
  onChangeIndustry
}) => {
  const [activeViewTab, setActiveViewTab] = useState<'checklist' | 'keywords' | 'verbs'>('checklist');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [internalIndustry, setInternalIndustry] = useState<string>(propIndustry || 'general');
  const [jobDescriptionInput, setJobDescriptionInput] = useState<string>('');
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  const currentIndustry = propIndustry || internalIndustry;

  const handleIndustryChange = (ind: string) => {
    setInternalIndustry(ind);
    if (onChangeIndustry) {
      onChangeIndustry(ind);
    }
  };

  if (!isOpen) return null;

  const report = analyzeCVForATS(cvData, jobDescriptionInput, currentIndustry);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyword(text);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  const handleAddKeywordToSkills = (keyword: string) => {
    if (onAddSkill) {
      onAddSkill(keyword);
    }
  };

  const handleJumpToTab = (tab: string) => {
    if (onNavigateToTab) {
      onNavigateToTab(tab);
      onClose();
    }
  };

  const filteredChecklist = report.checklist.filter(item => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'issues') return item.status !== 'pass';
    return item.category === filterCategory;
  });

  const passedCount = report.checklist.filter(i => i.status === 'pass').length;
  const issuesCount = report.checklist.filter(i => i.status !== 'pass').length;

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 dark:text-emerald-400 border-emerald-500';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400 border-blue-500';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400 border-amber-500';
    return 'text-red-600 dark:text-red-400 border-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xs">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  ATS Resume Scanner & Keyword Optimizer
                </h2>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  Live Audit
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Automated check against modern Applicant Tracking System (ATS) screening algorithms.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg transition"
            title="Close ATS Scanner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score & Summary Banner */}
        <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-slate-100/70 dark:from-slate-800/40 dark:to-slate-800/20 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Main Score Dial */}
            <div className="md:col-span-4 flex items-center gap-4 bg-white dark:bg-slate-800/80 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/70 shadow-2xs">
              <div className="relative flex items-center justify-center">
                <div className={`w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center ${getScoreColor(report.overallScore)}`}>
                  <span className="text-xl font-black font-mono leading-none">{report.overallScore}</span>
                  <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">/ 100</span>
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    ATS Rating
                  </span>
                </div>
                <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate">
                  {report.grade}
                </div>
                <div className="w-28 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${getScoreBg(report.overallScore)}`}
                    style={{ width: `${report.overallScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Diagnostic Metrics */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/70">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Checks Passed</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {passedCount} <span className="text-xs font-normal text-slate-400">/ {report.checklist.length}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/70">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Action Verbs</span>
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {report.detectedActionVerbs.length} <span className="text-xs font-normal text-slate-400">found</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/70">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Metrics & KPIs</span>
                  <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {report.metricsDetected.length} <span className="text-xs font-normal text-slate-400">stats</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/70">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Word Count</span>
                  <FileText className="w-3.5 h-3.5 text-purple-500" />
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {report.wordCount} <span className="text-xs font-normal text-slate-400">words</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 px-4 sm:px-6 gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveViewTab('checklist')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
              activeViewTab === 'checklist'
                ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Optimization Checklist</span>
            {issuesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
                {issuesCount} to fix
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveViewTab('keywords')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
              activeViewTab === 'keywords'
                ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Keywords & Job Matcher</span>
            {report.jobDescriptionMatchScore !== undefined && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold">
                {report.jobDescriptionMatchScore}% JD Match
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveViewTab('verbs')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
              activeViewTab === 'verbs'
                ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Action Verbs Power-Pack</span>
          </button>
        </div>

        {/* Modal Body / Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-5">
          {/* TAB 1: OPTIMIZATION CHECKLIST */}
          {activeViewTab === 'checklist' && (
            <div className="space-y-4">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-slate-400 text-xs font-semibold mr-1 shrink-0">Filter:</span>
                {[
                  { id: 'all', label: 'All Checks' },
                  { id: 'issues', label: `Issues (${issuesCount})` },
                  { id: 'contact', label: 'Contact' },
                  { id: 'summary', label: 'Summary' },
                  { id: 'experience', label: 'Experience' },
                  { id: 'skills', label: 'Skills' },
                  { id: 'education', label: 'Education' },
                  { id: 'format', label: 'Formatting' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCategory(cat.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition ${
                      filterCategory === cat.id
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Checklist Items */}
              <div className="space-y-3">
                {filteredChecklist.map(item => {
                  const isPass = item.status === 'pass';
                  const isWarning = item.status === 'warning';

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isPass
                          ? 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/70'
                          : isWarning
                          ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/50'
                          : 'bg-red-50/40 dark:bg-red-950/20 border-red-200 dark:border-red-800/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div className="mt-0.5 shrink-0">
                            {isPass ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            ) : isWarning ? (
                              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            )}
                          </div>

                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                {item.title}
                              </span>
                              <span
                                className={`text-[10px] font-bold uppercase px-2 py-0.2 rounded-full ${
                                  isPass
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                    : isWarning
                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                    : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                                }`}
                              >
                                {isPass ? 'Passed' : isWarning ? 'Recommendation' : 'Missing'}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                +{item.earned}/{item.weight} pts
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 dark:text-slate-300">
                              {item.description}
                            </p>

                            <div className="text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800/90 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-2 mt-2">
                              <span>💡 {item.recommendation}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action jump button */}
                        <button
                          type="button"
                          onClick={() => handleJumpToTab(item.targetTab)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-600 hover:border-slate-900 dark:hover:border-white bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 flex items-center gap-1.5 shrink-0 transition"
                          title={`Edit ${item.targetTab} section`}
                        >
                          <span>Edit</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: KEYWORDS & JOB DESCRIPTION MATCHER */}
          {activeViewTab === 'keywords' && (
            <div className="space-y-6">
              {/* Job Description Scanner Box */}
              <div className="p-4 sm:p-5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/50 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Target Job Description (JD) Keyword Scanner
                    </h3>
                  </div>
                  {report.jobDescriptionMatchScore !== undefined && (
                    <div className="flex items-center gap-1.5 bg-blue-600 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                      <span>Match Rate:</span>
                      <span>{report.jobDescriptionMatchScore}%</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Paste the job posting or requirements below to compare your CV text directly against recruiter keywords.
                </p>

                <textarea
                  value={jobDescriptionInput}
                  onChange={(e) => setJobDescriptionInput(e.target.value)}
                  placeholder="Paste Job Description (e.g. Responsibilities, Required Skills, Qualifications)..."
                  rows={3}
                  className="w-full p-3 text-xs bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                />

                {report.jobDescriptionMissingKeywords && report.jobDescriptionMissingKeywords.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Missing Keywords Found in Job Description ({report.jobDescriptionMissingKeywords.length}):</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {report.jobDescriptionMissingKeywords.map((kw, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddKeywordToSkills(kw)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 transition"
                          title="Click to add this keyword to your Skills section"
                        >
                          <Plus className="w-3 h-3" />
                          <span>{kw}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Standard Industry Keywords */}
              <div className="p-4 sm:p-5 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/70 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                      Standard Industry ATS Keyword Packs
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Select your domain to check essential industry search terms.
                    </p>
                  </div>

                  <select
                    value={currentIndustry}
                    onChange={(e) => handleIndustryChange(e.target.value)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                  >
                    {INDUSTRY_CATALOG.map(ind => (
                      <option key={ind.id} value={ind.id}>
                        {ind.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                  {report.industryKeywordMatches.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition ${
                        item.found
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200 font-medium'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {item.found ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0"></span>
                        )}
                        <span className="capitalize truncate">{item.keyword}</span>
                      </div>

                      {!item.found && onAddSkill && (
                        <button
                          type="button"
                          onClick={() => handleAddKeywordToSkills(item.keyword)}
                          className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition shrink-0 ml-1"
                          title={`Add "${item.keyword}" to skills`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACTION VERBS POWER-PACK */}
          {activeViewTab === 'verbs' && (
            <div className="space-y-5">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Active Verbs Detected in Your Resume ({report.detectedActionVerbs.length})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  These verbs give your bullet points dynamic energy and trigger positive ATS ranking signals.
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {report.detectedActionVerbs.map((verb, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 capitalize"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      {verb}
                    </span>
                  ))}
                  {report.detectedActionVerbs.length === 0 && (
                    <span className="text-xs text-slate-400 italic">
                      No standard high-impact action verbs detected yet. Try adding verbs like "Managed", "Designed", "Coordinated", "Implemented".
                    </span>
                  )}
                </div>
              </div>

              {/* Recommended Verbs by Category */}
              <div className="p-4 bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-4">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Recommended Action Verbs to Power Up Bullet Points
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    {
                      category: 'Leadership & Management',
                      verbs: ['Managed', 'Spearheaded', 'Orchestrated', 'Supervised', 'Coordinated', 'Guided']
                    },
                    {
                      category: 'Execution & Development',
                      verbs: ['Developed', 'Engineered', 'Built', 'Implemented', 'Designed', 'Executed']
                    },
                    {
                      category: 'Growth & Optimization',
                      verbs: ['Optimized', 'Streamlined', 'Accelerated', 'Increased', 'Reduced', 'Maximized']
                    },
                    {
                      category: 'Collaboration & Support',
                      verbs: ['Collaborated', 'Facilitated', 'Supported', 'Negotiated', 'Resolved', 'Trained']
                    },
                    {
                      category: 'Research & Organization',
                      verbs: ['Formulated', 'Analyzed', 'Structured', 'Organized', 'Audited', 'Maintained']
                    },
                    {
                      category: 'Initiative & Creation',
                      verbs: ['Initiated', 'Launched', 'Pioneered', 'Authored', 'Generated', 'Established']
                    }
                  ].map((grp, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                        {grp.category}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {grp.verbs.map((v, vIdx) => (
                          <button
                            key={vIdx}
                            type="button"
                            onClick={() => handleCopyText(v)}
                            className="text-xs px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-slate-900 dark:hover:border-white text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition inline-flex items-center gap-1"
                            title="Click to copy verb"
                          >
                            <span>{v}</span>
                            {copiedKeyword === v ? (
                              <Check className="w-2.5 h-2.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-2.5 h-2.5 text-slate-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <HelpCircle className="w-4 h-4" />
            <span>Scores update automatically as you edit in the CV Editor.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-xl transition shadow-xs"
          >
            Done / Continue Editing
          </button>
        </div>
      </div>
    </div>
  );
};
