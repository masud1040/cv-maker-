import React, { useRef, useState } from 'react';
import { CVData } from '../types/cv';
import { LiveCVPreview } from './preview/LiveCVPreview';
import { generatePDFFromElement } from '../utils/pdfExport';
import { X, Download, ZoomIn, ZoomOut, FileCheck, Printer } from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CVData;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, data }) => {
  const [scale, setScale] = useState<number>(0.85);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const previewRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const targetEl = previewRef.current?.querySelector('[data-pdf-content="true"]') as HTMLElement;
      if (targetEl) {
        await generatePDFFromElement(targetEl, data.personalInfo.fullName);
      }
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950/90 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Top Modal Header */}
      <header className="bg-zinc-900 text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-zinc-800 shrink-0 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 text-white rounded-md">
            <FileCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-zinc-100">CV Document Preview</h3>
            <p className="text-[11px] text-zinc-400">{data.title || 'Untitled CV'} • A4 Print Ready</p>
          </div>
        </div>

        {/* Toolbar controls */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-zinc-800 rounded-md p-1 border border-zinc-700">
            <button
              onClick={() => setScale(s => Math.max(0.4, s - 0.1))}
              className="p-1.5 text-zinc-300 hover:text-white rounded hover:bg-zinc-700"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs text-zinc-300 px-2 font-mono">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale(s => Math.min(1.2, s + 0.1))}
              className="p-1.5 text-zinc-300 hover:text-white rounded hover:bg-zinc-700"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md border border-zinc-700 transition"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-white text-black hover:bg-zinc-200 rounded-md shadow-xs transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Preview Container */}
      <div className="flex-1 overflow-auto p-2 sm:p-6 flex justify-center bg-zinc-950/80" ref={previewRef}>
        <div className="w-full max-w-[794px] flex justify-center">
          <LiveCVPreview data={data} scale={scale} />
        </div>
      </div>
    </div>
  );
};
