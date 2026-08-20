import React, { useState } from 'react';
import { LayoutGrid, FolderCheck, Plus, Menu, X, Home, Sun, Moon, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'templates' | 'editor' | 'my-cvs';
  onNavigate: (view: 'landing' | 'templates' | 'editor' | 'my-cvs') => void;
  onCreateNew: () => void;
  savedCount: number;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onCreateNew,
  savedCount,
  darkMode = false,
  onToggleDarkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (currentView === 'editor') {
    // CV Editor has its own dedicated sticky workspace toolbar
    return null;
  }

  const handleNav = (view: 'landing' | 'templates' | 'editor' | 'my-cvs') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  const handleCreate = () => {
    onCreateNew();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo - cvdesignr inspired */}
        <div
          onClick={() => handleNav('landing')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 bg-gradient-to-tr from-sky-500 via-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-xs text-white transition-transform group-hover:scale-105">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M7 4a3 3 0 00-3 3v10a3 3 0 003 3h4a1 1 0 000-2H7a1 1 0 01-1-1V7a1 1 0 011-1h10a1 1 0 011 1v4a1 1 0 102 0V7a3 3 0 00-3-3H7zm11 10a1 1 0 00-1 1v1.586l-4.293-4.293a1 1 0 00-1.414 1.414L15.586 18H14a1 1 0 100 2h4a1 1 0 001-1v-4a1 1 0 00-1-1z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
                CV<span className="text-cyan-500">Design</span><span className="text-indigo-600 dark:text-indigo-400">R</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-50 dark:bg-cyan-950/60 text-[10px] font-bold text-cyan-700 dark:text-cyan-300 rounded-full border border-cyan-200/60 dark:border-cyan-800/40">
                <Sparkles className="w-2.5 h-2.5 text-cyan-500" />
                AI Assistant
              </span>
            </div>
            <span className="text-[10px] text-slate-600 dark:text-slate-300 font-medium hidden sm:block -mt-0.5">
              Smart ATS Resume Builder
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => handleNav('landing')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
              currentView === 'landing'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNav('templates')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'templates'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Templates
          </button>

          <button
            onClick={() => handleNav('my-cvs')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              currentView === 'my-cvs'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            <FolderCheck className="w-3.5 h-3.5" />
            My Resumes
            {savedCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-[10px] font-bold bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {/* Theme Toggle Button */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors ml-1"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          )}

          <button
            onClick={handleCreate}
            className="ml-2 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-cyan-500/20 active:scale-98"
          >
            <Plus className="w-4 h-4" />
            Create My CV
          </button>
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center gap-2">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          )}

          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white text-xs font-bold rounded-lg shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNav('landing')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-lg transition-colors text-left ${
              currentView === 'landing' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            <Home className="w-4 h-4 text-slate-500" />
            Home
          </button>

          <button
            onClick={() => handleNav('templates')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-lg transition-colors text-left ${
              currentView === 'templates' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-slate-500" />
            Templates
          </button>

          <button
            onClick={() => handleNav('my-cvs')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-lg transition-colors text-left ${
              currentView === 'my-cvs' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <FolderCheck className="w-4 h-4 text-slate-500" />
              <span>My Resumes</span>
            </div>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};



