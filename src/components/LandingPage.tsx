import React from 'react';
import { TEMPLATES, SAMPLE_STUDENT_CV } from '../data/templates';
import { LiveCVPreview } from './preview/LiveCVPreview';
import {
  FileText,
  Sparkles,
  ShieldCheck,
  Zap,
  Download,
  Eye,
  CheckCircle2,
  ArrowRight,
  Layers,
  Award,
  BookOpen,
  Briefcase,
  Smartphone
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
  return (
    <div className="min-h-screen bg-[#F4F4F5] text-[#18181B] font-sans antialiased">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-100 border border-zinc-300 text-zinc-900 text-xs font-bold rounded-full shadow-2xs">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="uppercase tracking-widest text-[10px]">CV Guidebook Approved & ATS Optimized</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-tight">
            Create a Job-Ready CV in <span className="underline decoration-black decoration-2 underline-offset-8">Minutes</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Build ATS-friendly and HR-tailored professional resumes approved for internships, graduate programs, and corporate jobs. Real-time A4 live preview with crisp PDF export.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onCreateClick}
              className="w-full sm:w-auto px-7 py-3.5 bg-black hover:bg-zinc-800 text-white font-bold text-sm rounded-md shadow-sm transition flex items-center justify-center gap-2"
            >
              Create My CV
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreTemplatesClick}
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-zinc-100 text-zinc-900 font-bold text-sm rounded-md border border-zinc-300 shadow-2xs transition flex items-center justify-center gap-2"
            >
              Explore Templates
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-zinc-500 font-semibold flex-wrap uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-black" /> 100% Free & Local
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-black" /> No Sign-Up Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-black" /> ATS Friendly Formats
            </span>
          </div>
        </div>

        {/* Hero Interactive Mockup Showcase */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto rounded-xl bg-zinc-900 p-3 sm:p-6 shadow-xl border border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs text-zinc-400 mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-zinc-700 inline-block"></span>
              <span className="ml-2 font-mono text-[11px] text-zinc-400">CV_GENIUS_A4_LivePreview.pdf</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-emerald-400 bg-emerald-950/50 px-2.5 py-0.5 rounded border border-emerald-800/40 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> ATS Score: 98/100
            </div>
          </div>

          <div className="flex justify-center bg-[#E4E4E7] p-2 sm:p-6 rounded-lg overflow-hidden">
            <LiveCVPreview data={SAMPLE_STUDENT_CV} scale={0.8} />
          </div>
        </div>
      </section>

      {/* Why Use This CV Maker? */}
      <section className="py-16 bg-white border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">01 ARCHITECTURE & STANDARDS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Why Use CV.GENIUS?
            </h2>
            <p className="text-zinc-600 text-sm">
              Engineered according to modern HR recruitment standards and automated ATS parser guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#F4F4F5] rounded-xl border border-zinc-200 space-y-3 hover:border-black transition">
              <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-zinc-900 text-base">100% ATS Compliant</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Single-column ATS formats avoid graphics, skill bars, and tables that cause applicant tracking systems to fail.
              </p>
            </div>

            <div className="p-6 bg-[#F4F4F5] rounded-xl border border-zinc-200 space-y-3 hover:border-black transition">
              <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-zinc-900 text-base">Real-Time A4 Live Preview</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Watch your CV update instantly as you type. See exact printable page breaks and margins in real-time.
              </p>
            </div>

            <div className="p-6 bg-[#F4F4F5] rounded-xl border border-zinc-200 space-y-3 hover:border-black transition">
              <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-zinc-900 text-base">High Quality PDF Export</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Export crisp, vector-clean A4 PDFs named automatically after you (e.g., <code className="bg-zinc-200 px-1 py-0.5 rounded text-[11px] font-mono">Saiful_Alam_Masud_CV.pdf</code>).
              </p>
            </div>

            <div className="p-6 bg-[#F4F4F5] rounded-xl border border-zinc-200 space-y-3 hover:border-black transition">
              <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-zinc-900 text-base">Auto-Save & Local Storage</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                All data is stored directly in your browser. Create multiple tailored CV versions without signing up or losing work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guidebook Formats Showcase */}
      <section className="py-16 bg-[#F4F4F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">02 PROVEN FORMATS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
              3 Guidebook Approved Templates
            </h2>
            <p className="text-zinc-600 text-sm">
              Designed for different application stages: from university students to industry specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEMPLATES.map((t) => (
              <div key={t.id} className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-black transition p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black text-white rounded">
                    {t.badge}
                  </span>
                  <h3 className="text-lg font-bold text-zinc-900 pt-2">{t.name}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">{t.description}</p>
                </div>

                <div className="p-3 bg-zinc-50 rounded-lg text-xs space-y-1 border border-zinc-200">
                  <span className="font-bold text-zinc-800 uppercase text-[10px] tracking-wider">Recommended for:</span>
                  <p className="text-zinc-600">{t.recommendedFor}</p>
                </div>

                <button
                  onClick={onExploreTemplatesClick}
                  className="w-full py-2 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded transition"
                >
                  Select {t.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">03 WORKFLOW</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
              How It Works
            </h2>
            <p className="text-zinc-600 text-sm">
              Build your job-ready CV in 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2 p-4 bg-[#F4F4F5] rounded-xl border border-zinc-200">
              <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-extrabold text-sm mx-auto shadow-xs">
                01
              </div>
              <h3 className="font-bold text-zinc-900 text-sm">Choose Template</h3>
              <p className="text-xs text-zinc-500">Pick from ATS Student, ATS Professional, or HR Visual formats.</p>
            </div>

            <div className="text-center space-y-2 p-4 bg-[#F4F4F5] rounded-xl border border-zinc-200">
              <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-extrabold text-sm mx-auto shadow-xs">
                02
              </div>
              <h3 className="font-bold text-zinc-900 text-sm">Fill Details</h3>
              <p className="text-xs text-zinc-500">Input your education, experience, projects, skills, and honors.</p>
            </div>

            <div className="text-center space-y-2 p-4 bg-[#F4F4F5] rounded-xl border border-zinc-200">
              <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-extrabold text-sm mx-auto shadow-xs">
                03
              </div>
              <h3 className="font-bold text-zinc-900 text-sm">Live A4 Preview</h3>
              <p className="text-xs text-zinc-500">Watch the live A4 preview update in real-time as you type.</p>
            </div>

            <div className="text-center space-y-2 p-4 bg-[#F4F4F5] rounded-xl border border-zinc-200">
              <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-extrabold text-sm mx-auto shadow-xs">
                04
              </div>
              <h3 className="font-bold text-zinc-900 text-sm">Download PDF</h3>
              <p className="text-xs text-zinc-500">Download a perfectly formatted A4 PDF ready for job applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-zinc-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Build Your Professional CV?
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Join thousands of students and professionals who landed internships and job interviews using ATS-friendly CV formats.
          </p>
          <div>
            <button
              onClick={onCreateClick}
              className="px-8 py-4 bg-white hover:bg-zinc-100 text-black font-extrabold text-sm rounded-md shadow-lg transition inline-flex items-center gap-2"
            >
              Build My Resume Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
