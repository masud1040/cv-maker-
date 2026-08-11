import React, { useState } from 'react';
import { LayoutGrid, FolderCheck, Plus, Menu, X, Home, Sun, Moon } from 'lucide-react';

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
    // CV Editor has its own sticky toolbar
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
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNav('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-black dark:bg-white text-white dark:text-zinc-900 rounded-lg flex items-center justify-center font-bold italic shadow-xs group-hover:scale-105 transition-transform">
            C
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tighter text-zinc-900 dark:text-white">
              CV.GENIUS
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 rounded border border-zinc-200 dark:border-zinc-700">
              SaaS / Pro
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => handleNav('landing')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              currentView === 'landing'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNav('templates')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 ${
              currentView === 'templates'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Templates
          </button>

          <button
            onClick={() => handleNav('my-cvs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 ${
              currentView === 'my-cvs'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
            }`}
          >
            <FolderCheck className="w-3.5 h-3.5" />
            My CVs
            {savedCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-extrabold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {/* Theme Toggle Button */}
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition ml-1"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>
          )}

          <button
            onClick={handleCreate}
            className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-semibold rounded-md transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Create CV
          </button>
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center gap-2">
          {onToggleDarkMode && (
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>
          )}

          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold rounded-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-700 dark:text-zinc-200 hover:text-black dark:hover:text-white rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNav('landing')}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition text-left ${
              currentView === 'landing' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>

          <button
            onClick={() => handleNav('templates')}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition text-left ${
              currentView === 'templates' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Templates
          </button>

          <button
            onClick={() => handleNav('my-cvs')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-md transition text-left ${
              currentView === 'my-cvs' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold' : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <FolderCheck className="w-4 h-4" />
              <span>My Saved CVs</span>
            </div>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};


