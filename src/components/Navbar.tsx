import React, { useState } from 'react';
import { LayoutGrid, FolderCheck, Plus, Menu, X, Home, Sun, Moon, FileText } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNav('landing')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-7 h-7 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-md flex items-center justify-center font-bold text-sm tracking-tight transition-transform group-hover:scale-105 shadow-xs">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
              CV.GENIUS
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700">
              Pro Resume Builder
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => handleNav('landing')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              currentView === 'landing'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNav('templates')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              currentView === 'templates'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Templates
          </button>

          <button
            onClick={() => handleNav('my-cvs')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              currentView === 'my-cvs'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <FolderCheck className="w-3.5 h-3.5" />
            My Resumes
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {/* Theme Toggle Button */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors ml-1"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          )}

          <button
            onClick={handleCreate}
            className="ml-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-md transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Create Resume
          </button>
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center gap-2">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          )}

          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium rounded-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-1 shadow-md">
          <button
            onClick={() => handleNav('landing')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-colors text-left ${
              currentView === 'landing' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <Home className="w-4 h-4 text-slate-500" />
            Home
          </button>

          <button
            onClick={() => handleNav('templates')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-colors text-left ${
              currentView === 'templates' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-slate-500" />
            Templates
          </button>

          <button
            onClick={() => handleNav('my-cvs')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors text-left ${
              currentView === 'my-cvs' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FolderCheck className="w-4 h-4 text-slate-500" />
              <span>My Resumes</span>
            </div>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};



