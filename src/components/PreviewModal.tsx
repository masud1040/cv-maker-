import React, { useRef, useState } from 'react';
import { CVData } from '../types/cv';
import { LiveCVPreview } from './preview/LiveCVPreview';
import { generatePDFFromElement } from '../utils/pdfExport';
import { X, Download, ZoomIn, ZoomOut, FileCheck, Printer, Loader2 } from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CVData;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, data }) => {
  const [scale, setScale] = useState<number>(0.75);
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
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200">
      {/* Top Modal Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg">
            <FileCheck className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-xs sm:text-sm text-white">CV Document Preview</h3>
            <p className="text-[11px] text-slate-400">{data.title || 'Untitled Resume'} • A4 High-Resolution Format</p>
          </div>
        </div>

        {/* Toolbar controls */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
            <button
              onClick={() => setScale(s => Math.max(0.4, Number((s - 0.1).toFixed(2))))}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-700 transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-200 px-2.5 font-mono">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale(s => Math.min(1.2, Number((s + 0.1).toFixed(2))))}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-700 transition"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            Print
          </button>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 rounded-lg shadow-sm transition disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            title="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Preview Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-8 flex justify-center items-start bg-slate-950" ref={previewRef}>
        <div className="w-full max-w-[794px] flex justify-center">
          <LiveCVPreview data={data} scale={scale} />
        </div>
      </div>
    </div>
  );
};

