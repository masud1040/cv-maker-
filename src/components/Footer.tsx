import React from 'react';
import { FileText, Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'landing' | 'templates' | 'my-cvs') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 text-xs py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg flex items-center justify-center font-bold text-xs shadow-xs">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">CV Maker</span>
            <span className="text-slate-400 dark:text-slate-500 text-xs ml-2 font-normal hidden sm:inline">
              Professional Resume Engine
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-300">
          <button 
            type="button" 
            onClick={() => onNavigate('landing')} 
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Overview
          </button>
          <button 
            type="button" 
            onClick={() => onNavigate('templates')} 
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Templates
          </button>
          <button 
            type="button" 
            onClick={() => onNavigate('my-cvs')} 
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Saved Resumes
          </button>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>100% Client-Side & Private</span>
        </div>
      </div>
    </footer>
  );
};

