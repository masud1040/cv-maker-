import React, { useRef } from 'react';
import { RichTextToolbar } from './RichTextToolbar';
import { formatRichText } from '../../utils/richText';

interface RichTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
  className?: string;
  showPreview?: boolean;
  showBullets?: boolean;
  onOpenAIModal?: () => void;
  helperText?: string;
}

export const RichTextarea: React.FC<RichTextareaProps> = ({
  value,
  onChange,
  placeholder,
  rows = 4,
  label,
  className = '',
  showPreview = true,
  showBullets = true,
  onOpenAIModal,
  helperText
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = React.useState<'write' | 'preview'>('write');

  // Handle Ctrl+B and Ctrl+I keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
      e.preventDefault();
      const el = textareaRef.current;
      if (!el) return;
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const sel = value.substring(start, end);
      const newVal = value.substring(0, start) + `**${sel || 'bold'}**` + value.substring(end);
      onChange(newVal);
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start + 2, start + 2 + (sel ? sel.length : 4));
      }, 0);
    } else if ((e.ctrlKey || e.metaKey) && (e.key === 'i' || e.key === 'I')) {
      e.preventDefault();
      const el = textareaRef.current;
      if (!el) return;
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      const sel = value.substring(start, end);
      const newVal = value.substring(0, start) + `*${sel || 'italic'}*` + value.substring(end);
      onChange(newVal);
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start + 1, start + 1 + (sel ? sel.length : 6));
      }, 0);
    }
  };

  const hasFormatting = value.includes('**') || value.includes('*') || value.includes('•') || value.includes('_');

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Header bar with Label, Write/Preview tabs, and Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 pb-0.5">
        <div className="flex items-center gap-2">
          {label && (
            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
              {label}
            </label>
          )}

          {showPreview && value.trim().length > 0 && (
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-md p-0.5 text-[10px] border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setActiveTab('write')}
                className={`px-1.5 py-0.5 rounded font-medium transition cursor-pointer ${
                  activeTab === 'write'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-1.5 py-0.5 rounded font-medium transition cursor-pointer flex items-center gap-1 ${
                  activeTab === 'preview'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Preview</span>
                {hasFormatting && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block"></span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Toolbar */}
        {activeTab === 'write' && (
          <RichTextToolbar
            textareaRef={textareaRef}
            value={value}
            onChange={onChange}
            showBullets={showBullets}
            onOpenAIModal={onOpenAIModal}
          />
        )}
      </div>

      {/* Editor Body or Preview Body */}
      {activeTab === 'write' ? (
        <div className="relative">
          <textarea
            ref={textareaRef}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full p-3 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white focus:border-slate-900 dark:focus:border-white leading-relaxed transition shadow-2xs resize-y"
          />
        </div>
      ) : (
        <div className="min-h-[90px] p-3 text-xs bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 leading-relaxed font-sans select-text">
          {formatRichText(value)}
        </div>
      )}

      {/* Helper text or formatting hint */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
        <span>{helperText || 'Use **bold**, *italic*, or • bullet list'}</span>
        <span>{value.length} chars</span>
      </div>
    </div>
  );
};
