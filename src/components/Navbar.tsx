import React, { useState } from 'react';
import { LayoutGrid, FolderCheck, Plus, Menu, X, Home } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'templates' | 'editor' | 'my-cvs';
  onNavigate: (view: 'landing' | 'templates' | 'editor' | 'my-cvs') => void;
  onCreateNew: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onCreateNew, savedCount }) => {
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
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNav('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold italic shadow-xs group-hover:scale-105 transition-transform">
            C
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tighter text-zinc-900">
              CV.GENIUS
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-zinc-100 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 rounded border border-zinc-200">
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
                ? 'bg-zinc-100 text-zinc-900 font-bold'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNav('templates')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 ${
              currentView === 'templates'
                ? 'bg-zinc-100 text-zinc-900 font-bold'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Templates
          </button>

          <button
            onClick={() => handleNav('my-cvs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 ${
              currentView === 'my-cvs'
                ? 'bg-zinc-100 text-zinc-900 font-bold'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
            }`}
          >
            <FolderCheck className="w-3.5 h-3.5" />
            My CVs
            {savedCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-extrabold bg-zinc-900 text-white rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={handleCreate}
            className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white text-xs font-semibold rounded-md transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Create CV
          </button>
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white text-xs font-semibold rounded-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-700 hover:text-black rounded-md hover:bg-zinc-100 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNav('landing')}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition text-left ${
              currentView === 'landing' ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>

          <button
            onClick={() => handleNav('templates')}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition text-left ${
              currentView === 'templates' ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Templates
          </button>

          <button
            onClick={() => handleNav('my-cvs')}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-md transition text-left ${
              currentView === 'my-cvs' ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <FolderCheck className="w-4 h-4" />
              <span>My Saved CVs</span>
            </div>
            {savedCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-extrabold bg-zinc-900 text-white rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};

