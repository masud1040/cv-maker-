/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CVData, TemplateId } from './types/cv';
import {
  loadSavedCVs,
  saveSingleCV,
  createNewCV,
  duplicateCV,
  deleteCV,
  getActiveCVId,
  setActiveCVId
} from './utils/storage';
import { generatePDFFromElement } from './utils/pdfExport';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { TemplateGallery } from './components/TemplateGallery';
import { CVEditor } from './components/editor/CVEditor';
import { MyCVs } from './components/MyCVs';

type ViewMode = 'landing' | 'templates' | 'editor' | 'my-cvs';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [cvs, setCvs] = useState<CVData[]>([]);
  const [activeCv, setActiveCv] = useState<CVData | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('cv_genius_theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sync dark class on document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cv_genius_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cv_genius_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Initial load
  useEffect(() => {
    const list = loadSavedCVs();
    setCvs(list);
    const activeId = getActiveCVId();
    if (activeId) {
      const found = list.find(item => item.id === activeId);
      if (found) setActiveCv(found);
      else setActiveCv(list[0] || null);
    } else if (list.length > 0) {
      setActiveCv(list[0]);
    }
  }, []);

  // Handlers
  const handleCreateNewFromTemplate = (templateId: TemplateId) => {
    const newCv = createNewCV(templateId);
    setCvs(loadSavedCVs());
    setActiveCv(newCv);
    setCurrentView('editor');
  };

  const handleStartCreate = () => {
    setCurrentView('templates');
  };

  const handleEditCv = (id: string) => {
    const found = cvs.find(c => c.id === id);
    if (found) {
      setActiveCv(found);
      setActiveCVId(id);
      setCurrentView('editor');
    }
  };

  const handleSaveCv = (updated: CVData) => {
    const newList = saveSingleCV(updated);
    setCvs(newList);
    setActiveCv(updated);
  };

  const handleDuplicateCv = (id: string) => {
    const result = duplicateCV(id);
    setCvs(result.list);
    if (result.newCv) {
      setActiveCv(result.newCv);
    }
  };

  const handleDeleteCv = (id: string) => {
    const newList = deleteCV(id);
    setCvs(newList);
    if (activeCv?.id === id) {
      setActiveCv(newList[0] || null);
    }
  };

  const handleDownloadDirect = async (cv: CVData) => {
    // Open editor view and trigger download
    setActiveCv(cv);
    setActiveCVId(cv.id);
    setCurrentView('editor');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col font-sans transition-colors">
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onCreateNew={handleStartCreate}
        savedCount={cvs.length}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage
            onCreateClick={handleStartCreate}
            onExploreTemplatesClick={() => setCurrentView('templates')}
            onMyCVsClick={() => setCurrentView('my-cvs')}
          />
        )}

        {currentView === 'templates' && (
          <TemplateGallery
            onSelectTemplate={handleCreateNewFromTemplate}
            onBackToLanding={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'editor' && activeCv && (
          <CVEditor
            cvData={activeCv}
            onSave={handleSaveCv}
            onBackToTemplates={() => setCurrentView('templates')}
            onBackToMyCVs={() => setCurrentView('my-cvs')}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        )}

        {currentView === 'my-cvs' && (
          <MyCVs
            cvs={cvs}
            onEdit={handleEditCv}
            onCreateNew={handleStartCreate}
            onDuplicate={handleDuplicateCv}
            onDelete={handleDeleteCv}
            onDownload={handleDownloadDirect}
          />
        )}
      </main>

      {currentView !== 'editor' && (
        <Footer onNavigate={(view) => setCurrentView(view)} />
      )}
    </div>
  );
};
