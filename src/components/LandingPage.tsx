import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TEMPLATES, SAMPLE_STUDENT_CV, SAMPLE_GENERAL_CV, SAMPLE_DEVELOPER_CV } from '../data/templates';
import { LiveCVPreview } from './preview/LiveCVPreview';
import { InteractiveAIAssistantDemo } from './InteractiveAIAssistantDemo';
import {
  FileText,
  ShieldCheck,
  Zap,
  Download,
  Eye,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Award,
  BookOpen,
  Briefcase,
  Lock,
  ChevronRight,
  TrendingUp,
  Check,
  Target,
  Sliders,
  Sparkle,
  Building2
} from 'lucide-react';

interface LandingPageProps {
  onCreateClick: () => void;
  onExploreTemplatesClick: () => void;
  onMyCVsClick: () => void;
}

const SAMPLE_TABS = [
  { id: 'general', label: 'General CV', subtitle: 'Format 3' },
  { id: 'student', label: 'ATS Student', subtitle: 'Format 1' },
  { id: 'developer', label: 'Developer Clean', subtitle: 'Format 6' }
] as const;

const TRUSTED_COMPANIES = [
  {
    name: 'Google',
    tag: 'Tech',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.2.01 10.04.01 12c0 1.96.46 3.8 1.28 5.42l3.99-3.15z"/>
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
      </svg>
    )
  },
  {
    name: 'Microsoft',
    tag: 'Cloud',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
        <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
        <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
        <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
      </svg>
    )
  },
  {
    name: 'Amazon',
    tag: 'E-Comm',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF9900">
        <path d="M13.87 11.53c0-.98-.62-1.46-1.55-1.46-1.22 0-1.85.73-1.85 1.9 0 1.25.68 1.83 1.85 1.83.95 0 1.55-.45 1.55-1.42v-.85zm-4.7 4.14c.83 0 1.53-.25 2.15-.75l.13 1.3h1.75v-6.42c0-2.31-1.32-3.32-3.46-3.32-1.93 0-3.3.92-3.42 2.38h1.8c.13-.62.72-1 1.62-1 .97 0 1.5.42 1.5 1.32v.63c-.5-.3-1.22-.45-2.02-.45-1.92 0-3.35.82-3.35 2.58 0 1.82 1.35 2.73 3.3 2.73zM21.5 20.3c-2.3 1.7-5.58 2.6-8.48 2.6-4.1 0-7.8-1.5-10.5-4-.2-.2-.02-.45.23-.3 2.85 1.65 6.3 2.65 9.87 2.65 2.58 0 5.37-.62 7.72-1.9.38-.2.68.25.16.95z"/>
      </svg>
    )
  },
  {
    name: 'Meta',
    tag: 'AI & Social',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0668E1">
        <path d="M17.5 3c-2.2 0-4.1 1.2-5.5 2.9C10.6 4.2 8.7 3 6.5 3 2.9 3 0 5.9 0 9.5c0 4.7 4.5 9 10.8 11.2l1.2.4 1.2-.4C19.5 18.5 24 14.2 24 9.5 24 5.9 21.1 3 17.5 3zm-11 12.5C3.8 13.9 2 11.7 2 9.5 2 7 3.9 5 6.5 5c1.8 0 3.3 1 4.1 2.5l1.4 2.5-1.4 2.5c-.8 1.5-2.3 2.5-4.1 2.5zm11 0c-1.8 0-3.3-1-4.1-2.5l-1.4-2.5 1.4-2.5c.8-1.5 2.3-2.5 4.1-2.5 2.6 0 4.5 2 4.5 4.5 0 2.2-1.8 4.4-4.5 6c-.1 0-.1 0 0 0z"/>
      </svg>
    )
  },
  {
    name: 'Apple',
    tag: 'Consumer',
    logo: (
      <svg className="w-5 h-5 text-slate-800 dark:text-slate-200" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.09c.68-.82 1.13-1.96.99-3.09-1 .04-2.22.67-2.92 1.49-.62.73-1.17 1.9-1.02 3.03 1.12.09 2.27-.61 2.95-1.43z"/>
      </svg>
    )
  },
  {
    name: 'Spotify',
    tag: 'Audio',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1ED760">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.48-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.281 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-.1.2-1.2-.42-.18-.6.42-1.2 1.02-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    )
  },
  {
    name: 'Netflix',
    tag: 'Media',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E50914">
        <path d="M5.398 0v24l4.636-2.528V8.125L14.61 24H19.2V0l-4.636 2.528v13.347L9.988 0H5.398z"/>
      </svg>
    )
  },
  {
    name: 'Airbnb',
    tag: 'Hospitality',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF5A5F">
        <path d="M12 0C8.1 0 5 3.1 5 7c0 5.2 7 12.3 7 12.3s7-7.1 7-12.3c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
      </svg>
    )
  },
  {
    name: 'Uber',
    tag: 'Mobility',
    logo: (
      <svg className="w-5 h-5 text-slate-900 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-1-9h2v4h-2z"/>
      </svg>
    )
  },
  {
    name: 'Salesforce',
    tag: 'Enterprise',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#00A1E0">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>
    )
  },
  {
    name: 'Stripe',
    tag: 'FinTech',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#635BFF">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-3.728C17.788 2.457 15.228 1.8 12.37 1.8 7.375 1.8 3.842 4.417 3.842 8.375c0 5.484 7.234 5.86 7.234 8.423 0 .973-.806 1.481-2.253 1.481-2.409 0-5.127-1.127-6.848-2.148l-.946 3.842C2.88 21.05 5.836 22 9.07 22c5.317 0 8.878-2.585 8.878-6.612 0-5.836-7.394-6.17-7.394-8.623-.001-.973.806-1.385 2.253-1.385z"/>
      </svg>
    )
  },
  {
    name: 'NVIDIA',
    tag: 'Hardware',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#76B900">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 18.5c-3.59 0-6.5-2.91-6.5-6.5S8.41 5.5 12 5.5s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5z"/>
      </svg>
    )
  },
  {
    name: 'Adobe',
    tag: 'Design',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M13.966 22h6.034L20 2H13.966v20zM0 2v20h6.034L0 2zm8.384 10.395l2.64 6.326h3.407L9.771 7.218 8.384 12.395z"/>
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    tag: 'Career',
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.58a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/>
      </svg>
    )
  }
];

type SampleTabId = (typeof SAMPLE_TABS)[number]['id'];

export const LandingPage: React.FC<LandingPageProps> = ({
  onCreateClick,
  onExploreTemplatesClick,
  onMyCVsClick
}) => {
  const [activeTabSample, setActiveTabSample] = useState<SampleTabId>('general');

  // Auto-cycle CVs every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTabSample((current) => {
        const idx = SAMPLE_TABS.findIndex((t) => t.id === current);
        const nextIdx = (idx + 1) % SAMPLE_TABS.length;
        return SAMPLE_TABS[nextIdx].id;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const getActiveSample = () => {
    if (activeTabSample === 'student') return SAMPLE_STUDENT_CV;
    if (activeTabSample === 'developer') return SAMPLE_DEVELOPER_CV;
    return SAMPLE_GENERAL_CV;
  };

  const steps = [
    {
      num: 1,
      title: 'Create or import',
      desc: 'Start from a clean template or adapt your existing profile in seconds.'
    },
    {
      num: 2,
      title: 'Improve with AI',
      desc: 'Sharpen your profile, work experience and skills with smart AI rewrites.'
    },
    {
      num: 3,
      title: 'Test your CV',
      desc: 'Check structure, readability, and ATS scanner compatibility in real time.'
    },
    {
      num: 4,
      title: 'Customize effortlessly',
      desc: 'Toggle photo, bio data, awards, and skills with simple one-click switches.'
    },
    {
      num: 5,
      title: 'Export & Apply',
      desc: 'Download crisp, high-resolution A4 PDFs ready for instant job applications.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          {/* Top Trust Badge matching cvdesignr */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-full shadow-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-bold text-cyan-700 dark:text-cyan-400">4x</span>
            <span className="text-slate-600 dark:text-slate-300">more interviews secured with ATS-ready formatting</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-900 dark:text-white">
            <span className="block">Create your professional CV</span>
            <span className="block text-slate-700 dark:text-slate-200">online for free with</span>
            <span className="inline-block bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-xs pt-1">
              CVDesignR
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
            A CV that looks like you, powered by AI. Build clean, ATS-ready professional resumes tailored for human recruiters and applicant tracking systems with instant PDF export.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onCreateClick}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              Create My CV for Free
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreTemplatesClick}
              className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs transition-all flex items-center justify-center gap-2"
            >
              Explore Templates
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium flex-wrap">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 stroke-[3]" /> 100% Free & No Sign-up
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 stroke-[3]" /> ATS & Recruiter Tested
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 stroke-[3]" /> Print-Ready A4 PDF
            </span>
          </div>
        </div>

        {/* Hero Interactive Document Showcase (cvdesignr Device Mockup + Floating Assistant) */}
        <div className="mt-10 sm:mt-16 max-w-5xl mx-auto relative">
          {/* Main Browser / Device Frame */}
          <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 p-2 sm:p-5 shadow-2xl border border-slate-200/80 dark:border-slate-800">
            {/* Header bar of mockup - fully responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 px-2 sm:px-3 border-b border-slate-100 dark:border-slate-800 text-xs">
              {/* Left side: Colorful Traffic Lights + Title */}
              <div className="flex items-center justify-between sm:justify-start gap-3">
                <div className="flex items-center gap-1.5 shrink-0 bg-slate-100/80 dark:bg-slate-800/80 px-2 py-1.5 rounded-full">
                  <span
                    className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/40 shadow-xs inline-block transition-transform hover:scale-110 cursor-pointer"
                    title="Close"
                  ></span>
                  <span
                    className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/40 shadow-xs inline-block transition-transform hover:scale-110 cursor-pointer"
                    title="Minimize"
                  ></span>
                  <span
                    className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/40 shadow-xs inline-block transition-transform hover:scale-110 cursor-pointer"
                    title="Maximize"
                  ></span>
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap text-xs sm:text-sm">
                  CVDesignR Editor
                </span>
              </div>

              {/* Template Switcher Tabs - responsive horizontal scroll / wrap */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto no-scrollbar shrink-0">
                {SAMPLE_TABS.map((tab) => {
                  const isActive = activeTabSample === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabSample(tab.id)}
                      className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-white dark:bg-slate-700 text-cyan-700 dark:text-cyan-300 shadow-xs font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeTabIndicator"
                          className="absolute inset-0 bg-white dark:bg-slate-700 rounded-lg shadow-xs ring-1 ring-cyan-500/20 -z-10"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Document Canvas Container */}
            <div className="relative flex justify-center bg-slate-100/70 dark:bg-slate-950 p-2 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl overflow-hidden mt-3 min-h-[460px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTabSample}
                  initial={{ opacity: 0, y: 10, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.985 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  className="shadow-xl rounded-sm overflow-hidden bg-white text-slate-900 max-w-full"
                >
                  <LiveCVPreview data={getActiveSample()} scale={0.78} showPageBreak={false} />
                </motion.div>
              </AnimatePresence>

              {/* Floating CV Assistant Widget - Inspired by Screenshot 1 */}
              <div className="hidden lg:block absolute right-6 bottom-8 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-indigo-100 dark:border-indigo-900/50 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-fuchsia-500 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">CV Assistant</div>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                        Ready to optimize
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-full">
                    AI Active
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:bg-indigo-50/50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <Target className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                    <span>Strengthen profile with key skills for this role</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:bg-indigo-50/50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Highlight measurable impact & metrics</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:bg-indigo-50/50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Instant ATS keyword optimization</span>
                  </div>
                </div>
              </div>

              {/* Floating 4x Interviews Pill Badge */}
              <div className="hidden sm:flex absolute left-6 top-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-slate-200/80 dark:border-slate-800 items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">4x More Callbacks</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Validated ATS architecture</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Brand Logotypes - Smooth Infinite Horizontal Marquee */}
      <section className="py-10 border-y border-slate-200/70 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 relative">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/60 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Top Hiring Partners
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            Candidates secured interviews and jobs at
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Our ATS-optimized templates helped applicants land roles at world-class companies
          </p>
        </div>

        {/* Bounded Container - Not Fullscreen, Centered with White Shadow Fade Masks */}
        <div className="max-w-4xl sm:max-w-5xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 p-2 sm:p-3 shadow-inner">
            {/* Left White Gradient Edge Mask */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-slate-50 via-slate-50/95 dark:from-slate-900 dark:via-slate-900/95 to-transparent z-20 pointer-events-none" />

            {/* Right White Gradient Edge Mask */}
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-slate-50 via-slate-50/95 dark:from-slate-900 dark:via-slate-900/95 to-transparent z-20 pointer-events-none" />

            {/* Continuous Ticker */}
            <div className="animate-marquee flex items-center gap-3 py-1">
              {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="group shrink-0 flex items-center gap-3 px-3.5 sm:px-4 py-2 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs hover:shadow-md hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-200 cursor-default"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-1.5 shadow-2xs group-hover:scale-110 transition-transform">
                    {company.logo}
                  </div>
                  <div className="text-left">
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors block leading-tight">
                      {company.name}
                    </span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block pt-0.5">
                      {company.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ATS Scanner and Recruiter Perspective Section (Requested Feature) */}
      <section className="py-16 sm:py-20 bg-[#eef7fd] dark:bg-slate-950/80 border-b border-cyan-100/60 dark:border-slate-800/60 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Interactive Visual AI Assistant & ATS Scanner Mockup Card */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <InteractiveAIAssistantDemo />
            </div>

            {/* Right Column: Copy & Value Proposition Cards */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase block">
                  ATS SCANNER AND RECRUITER PERSPECTIVE
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  A good-looking CV is not enough.{' '}
                  <span className="text-pink-500 dark:text-pink-400">It must be easy to read.</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                  Before you send it, analyze your file, its content, readability and the presence of essential sections. You get an overall score and practical recommendations to fix issues that could hinder recruitment software or slow down human readers.
                </p>
              </div>

              {/* Numbered Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Card 1 */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-2.5 hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400 font-bold text-sm flex items-center justify-center shrink-0">
                    1
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Readable by ATS software
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Job titles, dates and sections that recruitment tools can process more easily.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-2.5 hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400 font-bold text-sm flex items-center justify-center shrink-0">
                    2
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Convincing for recruiters
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    A clear hierarchy that quickly brings your value to the forefront.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5-Step Process Timeline - Matching Screenshot 2 exactly */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-block px-3 py-1 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 text-xs font-bold rounded-full">
            HOW IT WORKS
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Bring you closer to your next job
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto">
            From picking a format to landing the interview, our streamlined workflow guides every step.
          </p>
        </div>

        {/* Step-by-step Timeline with pink/cyan connecting line */}
        <div className="relative max-w-2xl mx-auto pl-6 sm:pl-10 space-y-10">
          {/* Vertical connecting line */}
          <div className="absolute left-[19px] sm:left-[35px] top-4 bottom-6 w-0.5 bg-gradient-to-b from-pink-500 via-cyan-500 to-indigo-600"></div>

          {steps.map((step) => (
            <div key={step.num} className="relative flex items-start gap-4 sm:gap-6 group">
              {/* Number Circle */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-pink-500 text-pink-600 dark:text-pink-400 font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 z-10 shadow-xs group-hover:scale-110 transition-transform">
                {step.num}
              </div>

              {/* Step Content */}
              <div className="pt-0.5 space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-12">
          <button
            onClick={onCreateClick}
            className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-2"
          >
            Start Building My CV
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Features Overview Grid */}
      <section className="py-16 bg-white dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Crafted for results & precision
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              Everything you need to create a stand-out CV without the hassle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3 hover:border-cyan-200 dark:hover:border-cyan-800 transition-colors">
              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 rounded-xl flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">ATS Optimized Structure</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Standard single-column and clear hierarchies ensure automated parsers read 100% of your credentials.
              </p>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3 hover:border-cyan-200 dark:hover:border-cyan-800 transition-colors">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 rounded-xl flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">AI Polish & Rewrite</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Powered by Gemini to convert rough bullet points into impactful, action-driven career achievements.
              </p>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3 hover:border-cyan-200 dark:hover:border-cyan-800 transition-colors">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 rounded-xl flex items-center justify-center font-bold">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Flexible Section Toggles</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Easily turn on or off photo, bio data, awards, certificates, and skills with simple switches.
              </p>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3 hover:border-cyan-200 dark:hover:border-cyan-800 transition-colors">
              <div className="w-10 h-10 bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 rounded-xl flex items-center justify-center font-bold">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Instant A4 PDF Export</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                High-definition vector PDF generation formatted strictly to standard international A4 dimensions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Call to Action */}
      <section className="py-16 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to build your winning CV?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto font-normal">
            No signup required. Pick a format, customize in minutes, and export your polished resume.
          </p>
          <div className="pt-2">
            <button
              onClick={onCreateClick}
              className="px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl shadow-lg transition-all inline-flex items-center gap-2 active:scale-98"
            >
              Start Building Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
