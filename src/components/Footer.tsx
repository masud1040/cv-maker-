import React from 'react';
import {
  Facebook,
  Linkedin,
  Youtube,
  Twitch,
  Instagram,
  Sparkles,
  ShieldCheck,
  Heart,
  ArrowUpRight
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'landing' | 'templates' | 'my-cvs') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800 transition-colors pt-14 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Grid: Brand & Mission + Links Categories */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Mission Column (Span 5 on desktop) */}
          <div className="md:col-span-5 space-y-6">
            {/* Logo */}
            <div
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md group-hover:scale-105 transition-transform">
                CV
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  cvdesignr<span className="text-cyan-500">.</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                  designr
                </span>
              </div>
            </div>

            {/* Mission Statement */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Our mission is to transform the job application process into an incredible journey. We offer a brand new CV building experience for job seekers. CVDesignR focuses on profile and skills to match job offers and custom services.
            </p>

            {/* Social Media Icons Row */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 hover:border-cyan-500 dark:hover:text-cyan-400 dark:hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/40 transition-all shadow-2xs hover:scale-105"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 hover:border-cyan-500 dark:hover:text-cyan-400 dark:hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/40 transition-all shadow-2xs hover:scale-105"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 hover:border-cyan-500 dark:hover:text-cyan-400 dark:hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/40 transition-all shadow-2xs hover:scale-105"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#twitch"
                aria-label="Twitch"
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 hover:border-cyan-500 dark:hover:text-cyan-400 dark:hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/40 transition-all shadow-2xs hover:scale-105"
              >
                <Twitch className="w-4 h-4" />
              </a>
              <a
                href="#tiktok"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 hover:border-cyan-500 dark:hover:text-cyan-400 dark:hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/40 transition-all shadow-2xs hover:scale-105 font-bold text-xs"
              >
                ♪
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-cyan-600 hover:border-cyan-500 dark:hover:text-cyan-400 dark:hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/40 transition-all shadow-2xs hover:scale-105"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns (Span 7 on desktop) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 1: Services for candidates */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">
                Services for candidates
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                <li>
                  <button
                    onClick={() => onNavigate('templates')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                  >
                    Online CV editor
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('templates')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                  >
                    Europass CV
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('my-cvs')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                  >
                    CV examples
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('templates')}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                  >
                    CV templates
                  </button>
                </li>
                <li>
                  <a href="#job-profiles" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Job profiles
                  </a>
                </li>
                <li>
                  <a href="#sectors" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Sectors
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: For professionals */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">
                For professionals
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                <li>
                  <a href="#post-job" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Post a job
                  </a>
                </li>
                <li>
                  <a href="#education" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    CVDesignR for Education
                  </a>
                </li>
                <li>
                  <a href="#talent-picker" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    TalentPicker
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: About CVDesignR */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">
                About CVDesignR
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                <li>
                  <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Terms and conditions
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar / Copyright */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} <strong className="text-slate-700 dark:text-slate-300 font-bold">CVDesignR</strong> — All rights reserved</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              100% Client-Side & Private
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

