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
  { name: 'Google', symbol: 'G', tag: 'Tech' },
  { name: 'Microsoft', symbol: 'MS', tag: 'Cloud' },
  { name: 'Amazon', symbol: 'a', tag: 'E-Comm' },
  { name: 'Meta', symbol: 'M', tag: 'AI & Social' },
  { name: 'Apple', symbol: '', tag: 'Consumer' },
  { name: 'Spotify', symbol: 'Sp', tag: 'Audio' },
  { name: 'Netflix', symbol: 'N', tag: 'Media' },
  { name: 'Airbnb', symbol: 'Ab', tag: 'Hospitality' },
  { name: 'Uber', symbol: 'Ub', tag: 'Mobility' },
  { name: 'Salesforce', symbol: 'SF', tag: 'Enterprise' },
  { name: 'Stripe', symbol: 'St', tag: 'FinTech' },
  { name: 'NVIDIA', symbol: 'NV', tag: 'Hardware' },
  { name: 'Adobe', symbol: 'Ad', tag: 'Design' },
  { name: 'ByteDance', symbol: 'BD', tag: 'Video' },
  { name: 'LinkedIn', symbol: 'in', tag: 'Career' }
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
      <section className="py-12 border-y border-slate-200/70 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/60 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Top Hiring Partners
          </div>
          <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Candidates secured interviews and jobs at
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Our ATS-optimized templates helped applicants land roles at world-class companies
          </p>
        </div>

        {/* Marquee Container with Left and Right Fade Gradients */}
        <div className="relative w-full overflow-hidden">
          {/* Left Gradient Edge Mask */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />

          {/* Right Gradient Edge Mask */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />

          {/* Continuous Ticker */}
          <div className="animate-marquee flex items-center gap-4 py-2">
            {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="group shrink-0 flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs hover:shadow-md hover:border-cyan-500/40 dark:hover:border-cyan-500/40 hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 cursor-default"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-950 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
                  {company.symbol}
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors block">
                    {company.name}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block">
                    {company.tag}
                  </span>
                </div>
              </div>
            ))}
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
