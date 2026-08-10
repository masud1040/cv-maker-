import React from 'react';
import { FileText, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'landing' | 'templates' | 'my-cvs') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 text-xs font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white text-black rounded flex items-center justify-center font-bold italic shadow-xs">
            C
          </div>
          <span className="font-extrabold text-white text-sm tracking-tight">CV.GENIUS</span>
          <span className="text-zinc-500 text-[11px] uppercase tracking-wider">• ATS & HR Resume Architecture</span>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold">
          <button onClick={() => onNavigate('landing')} className="hover:text-white transition">Home</button>
          <button onClick={() => onNavigate('templates')} className="hover:text-white transition">Templates</button>
          <button onClick={() => onNavigate('my-cvs')} className="hover:text-white transition">My CVs</button>
        </div>

        <div className="text-[11px] text-zinc-500 flex items-center gap-1 font-mono">
          <span>Local Storage</span>
          <Shield className="w-3 h-3 text-zinc-400" />
          <span>• 100% Private</span>
        </div>
      </div>
    </footer>
  );
};
