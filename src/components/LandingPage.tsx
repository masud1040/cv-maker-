import React, { useState } from 'react';
import { TEMPLATES, SAMPLE_STUDENT_CV } from '../data/templates';
import { LiveCVPreview } from './preview/LiveCVPreview';
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
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onCreateClick: () => void;
  onExploreTemplatesClick: () => void;
  onMyCVsClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onCreateClick,
  onExploreTemplatesClick,
  onMyCVsClick
}) => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-18 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>ATS-Friendly & Recruiter Approved</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Build a professional resume that gets noticed.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
            Create clean, job-ready resumes formatted for applicant tracking systems and human recruiters. Real-time A4 preview with instant PDF export.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onCreateClick}
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm rounded-lg shadow-xs transition-all flex items-center justify-center gap-2"
            >
              Create My Resume
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreTemplatesClick}
              className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-lg border border-slate-300 dark:border-slate-700 shadow-2xs transition-all flex items-center justify-center gap-2"
            >
              Explore Templates
            </button>
          </div>

          <div className="pt-3 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium flex-wrap">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" /> Free & Private
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" /> No Sign-Up Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" /> Print-Ready A4 PDF
            </span>
          </div>
        </div>

        {/* Hero Interactive Document Showcase */}
        <div className="mt-12 sm:mt-14 max-w-4xl mx-auto rounded-xl bg-slate-900 dark:bg-slate-900 p-3 sm:p-5 shadow-xl border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 mb-3 px-2">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
              </div>
              <span className="ml-2 font-mono text-[11px] text-slate-400">Preview Canvas (A4 Standard)</span>
            </div>
            <div className="text-[11px] font-medium text-slate-400">
              Live Interactive Document
            </div>
          </div>

          <div className="flex justify-center bg-slate-200/90 dark:bg-slate-950 p-2 sm:p-6 rounded-lg overflow-hidden">
            <div className="shadow-lg rounded-sm overflow-hidden bg-white text-slate-900 max-w-full">
              <LiveCVPreview data={SAMPLE_STUDENT_CV} scale={0.78} />
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars / Features */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Designed for career success
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Structured to pass algorithmic screening and impress hiring managers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-2.5 transition-colors">
              <div className="w-9 h-9 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">ATS Compliant Layouts</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Standard semantic headers and clean single-column structure ensure automated parsing without dropped data.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-2.5 transition-colors">
              <div className="w-9 h-9 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg flex items-center justify-center font-bold">
                <Eye className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Real-Time A4 Preview</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                See exact print margins and page breaks update instantaneously as you type your experience.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-2.5 transition-colors">
              <div className="w-9 h-9 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg flex items-center justify-center font-bold">
                <Download className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Vector-Clean PDF</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Export high-resolution PDFs automatically formatted and named for professional job applications.
              </p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/70 space-y-2.5 transition-colors">
              <div className="w-9 h-9 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg flex items-center justify-center font-bold">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Private & Local Storage</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your data stays exclusively in your local browser storage. No account creation or data harvesting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Showcase */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Curated Resume Templates
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Tailored for students, early-career graduates, and seasoned industry professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEMPLATES.map((t) => (
              <div
                key={t.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs hover:border-slate-400 dark:hover:border-slate-600 transition-all p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded border border-slate-200 dark:border-slate-700">
                    {t.badge}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{t.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{t.description}</p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs space-y-1 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase text-[10px] tracking-wider block">
                    Ideal For:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">{t.recommendedFor}</p>
                </div>

                <button
                  onClick={onExploreTemplatesClick}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-lg transition-colors"
                >
                  Use {t.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Workflow */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Simple 3-Step Process
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              From blank page to job-ready PDF in under ten minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-center">
              <div className="w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center font-bold text-xs mx-auto">
                1
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Choose a Format</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Select an ATS-optimized template that matches your career level.</p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-center">
              <div className="w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center font-bold text-xs mx-auto">
                2
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Fill In Details</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Add education, work history, projects, and skills with structured forms.</p>
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-center">
              <div className="w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center font-bold text-xs mx-auto">
                3
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Export Clean PDF</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Download high-resolution A4 PDF ready for instant job applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to craft your resume?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
            Build your resume with ATS-ready structure and start applying with confidence today.
          </p>
          <div>
            <button
              onClick={onCreateClick}
              className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs rounded-lg shadow-md transition-all inline-flex items-center gap-2"
            >
              Start Building Now
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

