import React, { useState, useEffect } from 'react';
import { CVData } from '../../types/cv';
import {
  Sparkles,
  X,
  Check,
  Copy,
  ArrowRight,
  RefreshCw,
  Sliders,
  Flame,
  Target,
  Zap,
  Briefcase,
  FileText,
  FolderGit2,
  Bookmark,
  Layers,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  improveCVText,
  AIImprovementGoal,
  AISuggestion,
  AIImprovementResponse,
} from '../../utils/aiService';

export interface AIImproveTarget {
  sectionKey: 'summary' | 'experience' | 'project' | 'custom' | 'freeform';
  itemId?: string; // id of experience entry or project entry or custom section
  subIndex?: number; // index of bullet point if applicable
  fieldName?: string; // 'description' or 'bullet'
  initialText?: string;
  contextTitle?: string;
}

interface AIImproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData;
  initialTarget?: AIImproveTarget | null;
  onApplyText: (target: AIImproveTarget, newText: string) => void;
}

export const AIImproveModal: React.FC<AIImproveModalProps> = ({
  isOpen,
  onClose,
  cvData,
  initialTarget,
  onApplyText,
}) => {
  const [selectedSection, setSelectedSection] = useState<'summary' | 'experience' | 'project' | 'custom' | 'freeform'>('summary');
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [selectedSubIndex, setSelectedSubIndex] = useState<number>(0);
  const [selectedFieldType, setSelectedFieldType] = useState<'description' | 'bullet'>('description');
  
  const [currentText, setCurrentText] = useState<string>('');
  const [goal, setGoal] = useState<AIImprovementGoal>('executive');
  const [customInstructions, setCustomInstructions] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [response, setResponse] = useState<AIImprovementResponse | null>(null);
  const [selectedSuggestionId, setSelectedSuggestionId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  // Synchronize target when modal opens
  useEffect(() => {
    if (!isOpen) return;

    setErrorMessage(null);
    if (initialTarget) {
      setSelectedSection(initialTarget.sectionKey);
      if (initialTarget.itemId) setSelectedItemId(initialTarget.itemId);
      if (initialTarget.subIndex !== undefined) setSelectedSubIndex(initialTarget.subIndex);
      if (initialTarget.fieldName === 'bullet' || initialTarget.fieldName === 'description') {
        setSelectedFieldType(initialTarget.fieldName);
      }
      if (initialTarget.initialText !== undefined) {
        setCurrentText(initialTarget.initialText);
      } else {
        extractTextFromData(initialTarget.sectionKey, initialTarget.itemId, initialTarget.subIndex, initialTarget.fieldName);
      }
    } else {
      // Default to summary
      setSelectedSection('summary');
      extractTextFromData('summary');
    }
  }, [isOpen, initialTarget]);

  const extractTextFromData = (
    sec: 'summary' | 'experience' | 'project' | 'custom' | 'freeform',
    itemId?: string,
    subIdx = 0,
    field: 'description' | 'bullet' = 'description'
  ) => {
    if (sec === 'summary') {
      setCurrentText(cvData.summary || '');
      return;
    }

    if (sec === 'experience') {
      const expList = cvData.experience || [];
      const targetExp = itemId ? expList.find(e => e.id === itemId) : expList[0];
      if (targetExp) {
        setSelectedItemId(targetExp.id);
        if (field === 'bullet') {
          const bullets = targetExp.bullets || [];
          setCurrentText(bullets[subIdx] || bullets[0] || '');
        } else {
          setCurrentText(targetExp.description || '');
        }
      } else {
        setCurrentText('');
      }
      return;
    }

    if (sec === 'project') {
      const projList = cvData.projects || [];
      const targetProj = itemId ? projList.find(p => p.id === itemId) : projList[0];
      if (targetProj) {
        setSelectedItemId(targetProj.id);
        if (field === 'bullet') {
          const bullets = targetProj.bullets || [];
          setCurrentText(bullets[subIdx] || bullets[0] || '');
        } else {
          setCurrentText(targetProj.description || '');
        }
      } else {
        setCurrentText('');
      }
      return;
    }

    if (sec === 'custom') {
      const customList = cvData.customSections || [];
      const targetCust = itemId ? customList.find(c => c.id === itemId) : customList[0];
      if (targetCust) {
        setSelectedItemId(targetCust.id);
        const itemDesc = targetCust.items?.[0]?.description || '';
        setCurrentText(itemDesc || targetCust.title || '');
      } else {
        setCurrentText('');
      }
      return;
    }

    if (sec === 'freeform') {
      // Keep existing text or clear
    }
  };

  // Section change handler
  const handleSectionChange = (sec: 'summary' | 'experience' | 'project' | 'custom' | 'freeform') => {
    setSelectedSection(sec);
    setSelectedItemId('');
    setSelectedSubIndex(0);
    setSelectedFieldType('description');
    setResponse(null);
    setErrorMessage(null);
    setSelectedSuggestionId(null);
    extractTextFromData(sec);
  };

  // Experience entry change handler
  const handleExperienceSelect = (expId: string, field: 'description' | 'bullet', bIdx = 0) => {
    setSelectedItemId(expId);
    setSelectedFieldType(field);
    setSelectedSubIndex(bIdx);
    setResponse(null);
    setErrorMessage(null);
    setSelectedSuggestionId(null);
    extractTextFromData('experience', expId, bIdx, field);
  };

  // Project entry change handler
  const handleProjectSelect = (projId: string, field: 'description' | 'bullet', bIdx = 0) => {
    setSelectedItemId(projId);
    setSelectedFieldType(field);
    setSelectedSubIndex(bIdx);
    setResponse(null);
    setErrorMessage(null);
    setSelectedSuggestionId(null);
    extractTextFromData('project', projId, bIdx, field);
  };

  // Pre-fill starter text based on profile
  const handleAutoFillFromProfile = () => {
    const role = cvData.personalInfo?.professionalTitle || 'Software Engineer';
    const allSkills = [
      ...(cvData.skills?.technical || []),
      ...(cvData.skills?.tools || []),
    ].slice(0, 5);

    if (selectedSection === 'summary') {
      setCurrentText(
        `Dynamic ${role} with strong background in ${allSkills.length > 0 ? allSkills.join(', ') : 'modern development methodologies'}. Passionate about building robust, scalable solutions and optimizing workflow efficiency.`
      );
    } else if (selectedSection === 'experience') {
      setCurrentText(
        `Developed and maintained high-performance features as ${role}, collaborating with cross-functional teams to streamline delivery.`
      );
    } else if (selectedSection === 'project') {
      setCurrentText(
        `Built scalable web application leveraging modern stack, improving user engagement and automating core workflows.`
      );
    } else {
      setCurrentText(
        `Executed key deliverables and collaborated with team members to achieve operational excellence.`
      );
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setAppliedNotification(null);

    let mappedSectionType: 'summary' | 'experience_bullet' | 'experience_desc' | 'project_desc' | 'skills_list' | 'custom' | 'general' = 'general';
    if (selectedSection === 'summary') mappedSectionType = 'summary';
    else if (selectedSection === 'experience') {
      mappedSectionType = selectedFieldType === 'bullet' ? 'experience_bullet' : 'experience_desc';
    } else if (selectedSection === 'project') {
      mappedSectionType = 'project_desc';
    } else if (selectedSection === 'custom') {
      mappedSectionType = 'custom';
    }

    const effectiveText = currentText.trim()
      ? currentText.trim()
      : `Professional ${cvData.personalInfo?.professionalTitle || 'Candidate'} with expertise in ${
          (cvData.skills?.technical || []).slice(0, 4).join(', ') || 'industry best practices'
        }`;

    try {
      const res = await improveCVText({
        text: effectiveText,
        sectionType: mappedSectionType,
        goal,
        customInstructions,
        context: {
          jobTitle: cvData.personalInfo?.professionalTitle || 'Software Professional',
          targetRole: cvData.personalInfo?.professionalTitle || 'Professional',
          applicantName: cvData.personalInfo?.fullName || 'Candidate',
          skills: [
            ...(cvData.skills?.technical || []),
            ...(cvData.skills?.tools || []),
            ...(cvData.skills?.soft || []),
          ],
        },
      });

      if (!res || !res.suggestions || res.suggestions.length === 0) {
        throw new Error('No suggestions returned from AI service. Please try again.');
      }

      setResponse(res);
      setSelectedSuggestionId(res.suggestions[0].id);
    } catch (error: any) {
      console.error('Error rewriting text with AI:', error);
      setErrorMessage(error?.message || 'Failed to generate suggestions. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = (suggestionText: string) => {
    const target: AIImproveTarget = {
      sectionKey: selectedSection,
      itemId: selectedItemId || undefined,
      subIndex: selectedFieldType === 'bullet' ? selectedSubIndex : undefined,
      fieldName: selectedFieldType,
    };

    onApplyText(target, suggestionText);
    setAppliedNotification('Content successfully updated in your CV!');
    setTimeout(() => {
      setAppliedNotification(null);
      onClose();
    }, 1200);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const goalsList: { id: AIImprovementGoal; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    {
      id: 'executive',
      label: 'Executive & High Impact',
      icon: Flame,
      desc: 'Metrics-driven, leadership tone emphasizing business outcomes & ROI.',
    },
    {
      id: 'action_oriented',
      label: 'STAR Method & Power Verbs',
      icon: Zap,
      desc: 'Action-oriented structure starting with decisive verbs and measurable results.',
    },
    {
      id: 'ats_optimized',
      label: 'ATS Keyword Booster',
      icon: Target,
      desc: 'Infuses standard industry skills and clear keyword taxonomy for parsers.',
    },
    {
      id: 'concise',
      label: 'Concise & Space-Saving',
      icon: Sliders,
      desc: 'Cuts filler words and redundant phrases for clean, single-page CV density.',
    },
    {
      id: 'creative',
      label: 'Polished & Formal',
      icon: Sparkles,
      desc: 'Elevated, graceful phrasing tailored for prestigious corporate standards.',
    },
  ];

  const quickInstructionChips = [
    '+ Add quantified metrics & percentages',
    '+ Highlight leadership & ownership',
    '+ Emphasize problem-solving ability',
    '+ Use technical terminology',
    '+ Make it 2 crisp sentences',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden transition-colors">
        {/* MODAL HEADER */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 via-white to-white dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  AI Text Rewriter & Tone Optimizer
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800/60">
                  Gemini Powered
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Rewrite any resume section for higher ATS score, executive punch, and recruiter appeal.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NOTIFICATION BANNER */}
        {appliedNotification && (
          <div className="px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/50 border-b border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 animate-in fade-in slide-in-from-top-2 duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{appliedNotification}</span>
          </div>
        )}

        {/* MODAL BODY (TWO COLUMN LAYOUT ON DESKTOP) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 custom-scrollbar">
          {/* LEFT PANEL: CONFIGURATION & INPUT (5 COLUMNS) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              {/* SECTION PICKER */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                  1. Select Section to Improve
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => handleSectionChange('summary')}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      selectedSection === 'summary'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Summary</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSectionChange('experience')}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      selectedSection === 'experience'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Experience</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSectionChange('project')}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      selectedSection === 'project'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Projects</span>
                  </button>
                </div>

                {/* Sub-item selectors for Experience */}
                {selectedSection === 'experience' && (cvData.experience || []).length > 0 && (
                  <div className="mt-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                        Select Role:
                      </span>
                      <select
                        value={selectedItemId}
                        onChange={(e) => handleExperienceSelect(e.target.value, selectedFieldType, selectedSubIndex)}
                        className="w-full text-xs font-medium bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:outline-none"
                      >
                        {(cvData.experience || []).map((exp) => (
                          <option key={exp.id} value={exp.id}>
                            {exp.jobTitle || 'Untitled Role'} {exp.company ? `(${exp.company})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Choose Description or Bullet Point */}
                    {selectedItemId && (
                      <div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleExperienceSelect(selectedItemId, 'description')}
                            className={`flex-1 py-1 text-[11px] font-semibold rounded-md border ${
                              selectedFieldType === 'description'
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            Job Description
                          </button>
                          <button
                            type="button"
                            onClick={() => handleExperienceSelect(selectedItemId, 'bullet', 0)}
                            className={`flex-1 py-1 text-[11px] font-semibold rounded-md border ${
                              selectedFieldType === 'bullet'
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            Bullet Point
                          </button>
                        </div>

                        {selectedFieldType === 'bullet' && (
                          <div className="mt-2">
                            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                              Select Bullet #
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {((cvData.experience?.find((e) => e.id === selectedItemId)?.bullets || []).map((_, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => handleExperienceSelect(selectedItemId, 'bullet', idx)}
                                  className={`w-7 h-7 text-xs font-bold rounded-md border transition ${
                                    selectedSubIndex === idx
                                      ? 'bg-indigo-600 text-white border-indigo-600'
                                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                                  }`}
                                >
                                  {idx + 1}
                                </button>
                              )))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Sub-item selectors for Projects */}
                {selectedSection === 'project' && (cvData.projects || []).length > 0 && (
                  <div className="mt-2.5 p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                        Select Project:
                      </span>
                      <select
                        value={selectedItemId}
                        onChange={(e) => handleProjectSelect(e.target.value, selectedFieldType, selectedSubIndex)}
                        className="w-full text-xs font-medium bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:outline-none"
                      >
                        {(cvData.projects || []).map((proj) => (
                          <option key={proj.id} value={proj.id}>
                            {proj.name || 'Untitled Project'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* CURRENT CONTENT INPUT */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    2. Original Text / Draft
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAutoFillFromProfile}
                      className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                      title="Insert starter text based on your profile"
                    >
                      <Sparkles className="w-3 h-3" />
                      Auto-Draft
                    </button>
                    <span className="text-[11px] font-mono text-slate-400">
                      {currentText.trim().split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                </div>
                <textarea
                  rows={4}
                  value={currentText}
                  onChange={(e) => setCurrentText(e.target.value)}
                  placeholder="Paste or write your text here, or click Auto-Draft to generate from your profile role..."
                  className="w-full p-3 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition leading-relaxed"
                />
              </div>

              {/* GOAL / TONE SELECTION */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                  3. Improvement Goal & Style
                </label>
                <div className="space-y-1.5">
                  {goalsList.map((g) => {
                    const Icon = g.icon;
                    const isSelected = goal === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGoal(g.id)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 text-slate-900 dark:text-white'
                            : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold flex items-center justify-between">
                            <span>{g.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                            {g.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CUSTOM INSTRUCTIONS */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider">
                  Optional Custom Prompts
                </label>
                <input
                  type="text"
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  placeholder="e.g. Focus on full-stack architecture, mention 40% efficiency gains..."
                  className="w-full p-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
                />

                {/* Quick Chips */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {quickInstructionChips.map((chip, cIdx) => (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => setCustomInstructions(chip.replace('+ ', ''))}
                      className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md transition"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* GENERATE BUTTON */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing & Generating with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {currentText.trim() ? 'Rewrite & Optimize with AI' : 'Generate Starter Text with AI'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL: AI SUGGESTIONS & COMPARISON (7 COLUMNS) */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      AI Optimized Variations
                    </h3>
                    {response?.source === 'gemini' && (
                      <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800/60">
                        Live Gemini Output
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Compare tailored rewrites and apply the highest-impact variation directly to your resume.
                  </p>
                </div>
                {response && (
                  <button
                    type="button"
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="p-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1 shadow-2xs cursor-pointer"
                    title="Regenerate alternatives"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Regenerate</span>
                  </button>
                )}
              </div>

              {/* ERROR MESSAGE BANNER */}
              {errorMessage && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-2.5 text-xs text-red-800 dark:text-red-300">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold">Generation Error</p>
                    <p className="text-[11px] text-red-700 dark:text-red-400 mt-0.5">{errorMessage}</p>
                    <button
                      type="button"
                      onClick={handleGenerate}
                      className="mt-2 px-2.5 py-1 bg-red-600 text-white rounded-md text-[11px] font-bold hover:bg-red-700 transition"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* EMPTY STATE */}
              {!response && !isLoading && (
                <div className="py-12 flex flex-col items-center justify-center text-center px-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3.5 shadow-xs">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    Ready to Transform Your Content
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-4">
                    Select a section or enter your text on the left, pick your target tone (e.g. Executive, STAR Method, ATS Optimizer), and click <span className="font-semibold text-indigo-600 dark:text-indigo-400">Rewrite & Optimize</span>.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-left w-full max-w-md text-[11px] text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Eliminates passive filler words</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Injects power action verbs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Structures measurable metrics</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>100% ATS parser compliant</span>
                    </div>
                  </div>
                </div>
              )}

              {/* LOADING SKELETON */}
              {isLoading && (
                <div className="space-y-3 py-6 animate-pulse">
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-4/5"></div>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-3/4"></div>
                  </div>
                </div>
              )}

              {/* SUGGESTIONS LIST */}
              {response && !isLoading && (
                <div className="space-y-3">
                  {response.suggestions.map((sug, idx) => {
                    const isSelected = selectedSuggestionId === sug.id;
                    const wordDiff = sug.wordCount - currentText.trim().split(/\s+/).filter(Boolean).length;

                    return (
                      <div
                        key={sug.id || idx}
                        onClick={() => setSelectedSuggestionId(sug.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white dark:bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                            : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                isSelected
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                              {sug.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-400">
                              {sug.wordCount} words ({wordDiff > 0 ? `+${wordDiff}` : wordDiff})
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(sug.text, sug.id);
                              }}
                              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                              title="Copy text"
                            >
                              {copiedId === sug.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Rewritten Text Content */}
                        <p className="text-xs text-slate-800 dark:text-slate-100 leading-relaxed font-medium bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800 mb-2.5 select-all">
                          {sug.text}
                        </p>

                        {/* Impact note */}
                        <div className="text-[11px] text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 mb-2 font-medium">
                          <Zap className="w-3 h-3 shrink-0" />
                          <span>{sug.impactNote}</span>
                        </div>

                        {/* Key Improvements Tags */}
                        {sug.keyChanges && sug.keyChanges.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {sug.keyChanges.map((change, cIdx) => (
                              <span
                                key={cIdx}
                                className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50"
                              >
                                <Check className="w-2.5 h-2.5" />
                                <span>{change}</span>
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Action CTA */}
                        {isSelected && (
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              Selected variation
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApply(sug.text);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg shadow-xs transition"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                              <span>Apply to Resume</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* MODAL FOOTER NOTE */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>AI generates ATS-aligned phrasing with standard keyword compliance</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="hover:underline text-slate-500 dark:text-slate-400 font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
