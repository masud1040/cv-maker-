import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Briefcase,
  Bot,
  User,
  Check,
  MousePointer,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  X
} from 'lucide-react';

export const InteractiveAIAssistantDemo: React.FC = () => {
  // Demo states: 'user_typing' | 'ai_thinking' | 'ai_suggesting' | 'cursor_moving' | 'applied' | 'ignored'
  const [step, setStep] = useState<'user_typing' | 'ai_thinking' | 'ai_suggesting' | 'cursor_moving' | 'applied' | 'ignored'>('user_typing');
  
  // Typed text states
  const fullUserPrompt = "Optimize my job description with high-impact keywords for ATS.";
  const fullAiSuggestion = "Coordination de projets digitaux, suivi des priorités et collaboration avec les équipes marketing, produit et commerciales.";
  
  const [typedUserPrompt, setTypedUserPrompt] = useState("");
  const [typedAiSuggestion, setTypedAiSuggestion] = useState("");
  const [appliedText, setAppliedText] = useState("Gestion de projets et coordination des équipes.");

  const initialDescription = "Gestion de projets et coordination des équipes.";

  // Animation Loop Controller
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (step === 'user_typing') {
      setAppliedText(initialDescription);
      setTypedAiSuggestion("");
      if (typedUserPrompt.length < fullUserPrompt.length) {
        timer = setTimeout(() => {
          setTypedUserPrompt(fullUserPrompt.slice(0, typedUserPrompt.length + 1));
        }, 40);
      } else {
        timer = setTimeout(() => {
          setStep('ai_thinking');
        }, 600);
      }
    } else if (step === 'ai_thinking') {
      timer = setTimeout(() => {
        setStep('ai_suggesting');
      }, 1200);
    } else if (step === 'ai_suggesting') {
      if (typedAiSuggestion.length < fullAiSuggestion.length) {
        timer = setTimeout(() => {
          setTypedAiSuggestion(fullAiSuggestion.slice(0, typedAiSuggestion.length + 1));
        }, 20);
      } else {
        timer = setTimeout(() => {
          setStep('cursor_moving');
        }, 800);
      }
    } else if (step === 'cursor_moving') {
      timer = setTimeout(() => {
        setStep('applied');
        setAppliedText(fullAiSuggestion);
      }, 1400);
    } else if (step === 'applied' || step === 'ignored') {
      timer = setTimeout(() => {
        // Reset cycle
        setTypedUserPrompt("");
        setTypedAiSuggestion("");
        setStep('user_typing');
      }, 4500);
    }

    return () => clearTimeout(timer);
  }, [step, typedUserPrompt, typedAiSuggestion]);

  // Manual Click Handlers
  const handleApply = () => {
    setStep('applied');
    setAppliedText(fullAiSuggestion);
    setTypedAiSuggestion(fullAiSuggestion);
  };

  const handleIgnore = () => {
    setStep('ignored');
  };

  const handleReplay = () => {
    setTypedUserPrompt("");
    setTypedAiSuggestion("");
    setAppliedText(initialDescription);
    setStep('user_typing');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 space-y-4 relative overflow-hidden">
      
      {/* Mockup Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
            <Briefcase className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              Professional Experience
            </h4>
            <span className="text-[10px] text-slate-400 font-medium block -mt-0.5">
              Chef de projet digital
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReplay}
            title="Replay animation"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-600 shadow-xs">
            <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
            AI Assistant Active
          </span>
        </div>
      </div>

      {/* Main Grid: Form Left, AI Chat & Suggestion Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Left Form View (Current Experience Block) */}
        <div className="md:col-span-6 space-y-3">
          <div>
            <label className="text-[11px] font-medium text-slate-400 dark:text-slate-500 block mb-1">
              Job Title
            </label>
            <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-xs font-bold text-slate-800 dark:text-slate-200">
              Chef de projet digital
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-medium text-slate-400 dark:text-slate-500 block">
                Current Description
              </label>
              {step === 'applied' && (
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-pulse">
                  <CheckCircle2 className="w-3 h-3" /> Updated by AI
                </span>
              )}
            </div>

            <motion.div
              animate={{
                borderColor: step === 'applied' ? '#10b981' : '#e2e8f0',
                backgroundColor: step === 'applied' ? '#f0fdf4' : '#f8fafc'
              }}
              transition={{ duration: 0.4 }}
              className={`p-3 rounded-xl border text-xs font-semibold leading-relaxed transition-all relative ${
                step === 'applied'
                  ? 'text-emerald-950 dark:text-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800'
                  : 'text-slate-700 dark:text-slate-300 dark:bg-slate-800/40 dark:border-slate-800'
              }`}
            >
              <p>{appliedText}</p>
              
              {/* ATS Impact Score Badge */}
              <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  ATS Keywords Optimization
                </span>
                <span className={`font-bold px-2 py-0.5 rounded-md ${
                  step === 'applied' 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                }`}>
                  {step === 'applied' ? 'Score: 98/100 (Optimal)' : 'Score: 62/100'}
                </span>
              </div>
            </motion.div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-400 dark:text-slate-500 block mb-1">
              Associated Skills
            </label>
            <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-[11px] font-medium text-slate-600 dark:text-slate-400 flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Gestion de projet</span>
              <span className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Coordination</span>
              <span className="px-2 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">Reporting</span>
            </div>
          </div>
        </div>

        {/* Right AI Assistant & Live Typing Chat Window */}
        <div className="md:col-span-6 flex flex-col justify-between p-3.5 rounded-2xl border-2 border-pink-200/80 dark:border-pink-900/60 bg-gradient-to-b from-pink-50/40 via-purple-50/20 to-white dark:from-pink-950/20 dark:to-slate-900 space-y-3 relative overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center">
                <Bot className="w-3 h-3" />
              </div>
              <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 tracking-tight">
                AI Suggestion Engine
              </span>
            </div>
            <span className="text-[9px] font-extrabold text-pink-600 dark:text-pink-400 uppercase tracking-widest bg-pink-100 dark:bg-pink-950 px-2 py-0.5 rounded-full">
              PROPOSITION
            </span>
          </div>

          {/* Animated Chat Container */}
          <div className="space-y-2.5 flex-1 min-h-[160px] flex flex-col justify-end">
            
            {/* User Chat Bubble (Typing Prompt) */}
            <div className="flex items-start gap-2 justify-end">
              <div className="bg-indigo-600 text-white p-2.5 rounded-2xl rounded-tr-none text-[11px] max-w-[88%] shadow-xs leading-relaxed">
                <p>
                  {typedUserPrompt}
                  {step === 'user_typing' && <span className="inline-block w-1 h-3 bg-white ml-0.5 animate-pulse" />}
                </p>
              </div>
              <div className="w-5 h-5 rounded-full bg-indigo-200 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0 text-[10px]">
                <User className="w-3 h-3" />
              </div>
            </div>

            {/* AI Assistant Response Box */}
            <AnimatePresence mode="wait">
              {step === 'ai_thinking' ? (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-[11px] text-pink-600 dark:text-pink-400 font-semibold bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-pink-200 dark:border-pink-800"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing job role & generating high-impact phrase...</span>
                </motion.div>
              ) : (step === 'ai_suggesting' || step === 'cursor_moving' || step === 'applied' || step === 'ignored') ? (
                <motion.div
                  key="suggestion"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-white dark:bg-slate-800/90 rounded-2xl border border-pink-200 dark:border-pink-800 shadow-sm space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[10px] text-pink-600 dark:text-pink-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Recommended for ATS
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400">+36% Impact</span>
                  </div>
                  <p className="text-[11px] text-slate-800 dark:text-slate-100 font-semibold leading-relaxed">
                    {typedAiSuggestion}
                    {step === 'ai_suggesting' && <span className="inline-block w-1 h-3 bg-pink-500 ml-0.5 animate-pulse" />}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

          </div>

          {/* Action Buttons: Ignorer & Appliquer */}
          <div className="flex items-center gap-2 pt-2 border-t border-pink-100 dark:border-pink-900/40 relative">
            <button
              type="button"
              onClick={handleIgnore}
              className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-colors ${
                step === 'ignored'
                  ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800'
              }`}
            >
              {step === 'ignored' ? 'Ignored' : 'Ignorer'}
            </button>

            <button
              type="button"
              onClick={handleApply}
              className={`flex-1 px-3 py-1.5 text-[11px] font-bold text-white rounded-lg shadow-xs transition-all flex items-center justify-center gap-1.5 ${
                step === 'applied'
                  ? 'bg-emerald-600 hover:bg-emerald-700 scale-102 ring-2 ring-emerald-400'
                  : 'bg-pink-500 hover:bg-pink-600'
              }`}
            >
              {step === 'applied' ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Applied to CV!
                </>
              ) : (
                'Appliquer'
              )}
            </button>

            {/* Simulated Mouse Pointer Click Animation */}
            {step === 'cursor_moving' && (
              <motion.div
                initial={{ x: -120, y: -40, opacity: 0 }}
                animate={{
                  x: [ -100, 30, 25 ],
                  y: [ -30, 0, 0 ],
                  scale: [ 1, 1, 0.85, 1 ],
                  opacity: [ 0, 1, 1, 1 ]
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute right-8 bottom-1 pointer-events-none z-30 flex items-center gap-1"
              >
                <div className="p-1 rounded-full bg-pink-500/20 animate-ping absolute inset-0" />
                <MousePointer className="w-5 h-5 text-slate-900 dark:text-white fill-slate-900 dark:fill-white drop-shadow-md" />
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
