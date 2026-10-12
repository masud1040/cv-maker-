import React, { useRef } from 'react';
import { Bold, Italic, List, Sparkles } from 'lucide-react';

interface RichTextToolbarProps {
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
  showBullets?: boolean;
  onOpenAIModal?: () => void;
  size?: 'sm' | 'xs';
}

export const RichTextToolbar: React.FC<RichTextToolbarProps> = ({
  textareaRef,
  inputRef,
  value,
  onChange,
  className = '',
  showBullets = true,
  onOpenAIModal,
  size = 'xs'
}) => {
  const getActiveElement = (): HTMLTextAreaElement | HTMLInputElement | null => {
    if (textareaRef && textareaRef.current) return textareaRef.current;
    if (inputRef && inputRef.current) return inputRef.current;
    return null;
  };

  const applyWrapFormat = (wrapper: string) => {
    const el = getActiveElement();
    if (!el) {
      // Fallback: append or wrap whatever text is selected or placeholder
      onChange(`${value}${wrapper}text${wrapper}`);
      return;
    }

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const selectedText = value.substring(start, end);

    if (selectedText) {
      // Check if already wrapped, if so toggle off
      const wrapLen = wrapper.length;
      const beforeSel = value.substring(Math.max(0, start - wrapLen), start);
      const afterSel = value.substring(end, end + wrapLen);

      if (beforeSel === wrapper && afterSel === wrapper) {
        // Toggle off
        const newVal = value.substring(0, start - wrapLen) + selectedText + value.substring(end + wrapLen);
        onChange(newVal);
        setTimeout(() => {
          el.focus();
          el.setSelectionRange(start - wrapLen, end - wrapLen);
        }, 0);
        return;
      }

      // Check if selectedText itself starts and ends with wrapper
      if (selectedText.startsWith(wrapper) && selectedText.endsWith(wrapper) && selectedText.length >= wrapLen * 2) {
        const unwrapped = selectedText.substring(wrapLen, selectedText.length - wrapLen);
        const newVal = value.substring(0, start) + unwrapped + value.substring(end);
        onChange(newVal);
        setTimeout(() => {
          el.focus();
          el.setSelectionRange(start, start + unwrapped.length);
        }, 0);
        return;
      }

      // Wrap selected text
      const newVal = value.substring(0, start) + `${wrapper}${selectedText}${wrapper}` + value.substring(end);
      onChange(newVal);
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start + wrapLen, end + wrapLen);
      }, 0);
    } else {
      // Insert placeholder
      const placeholder = 'formatted text';
      const newVal = value.substring(0, start) + `${wrapper}${placeholder}${wrapper}` + value.substring(end);
      onChange(newVal);
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start + wrapper.length, start + wrapper.length + placeholder.length);
      }, 0);
    }
  };

  const handleBold = (e: React.MouseEvent) => {
    e.preventDefault();
    applyWrapFormat('**');
  };

  const handleItalic = (e: React.MouseEvent) => {
    e.preventDefault();
    applyWrapFormat('*');
  };

  const handleBulletPoint = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = getActiveElement();
    if (!el) {
      onChange(value ? `${value}\n• ` : '• ');
      return;
    }

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;

    // If textarea, apply bullets to each selected line
    if (el instanceof HTMLTextAreaElement) {
      const before = value.substring(0, start);
      const after = value.substring(end);
      const selected = value.substring(start, end);

      if (selected) {
        const lines = selected.split('\n');
        // If all lines already start with bullet, toggle off
        const allBulleted = lines.every(l => l.trim().startsWith('• ') || l.trim().startsWith('- '));
        const newLines = lines.map(line => {
          if (allBulleted) {
            return line.replace(/^(\s*)([•\-]\s*)/, '$1');
          }
          return line.trim() ? `• ${line.replace(/^(\s*)([•\-]\s*)/, '')}` : line;
        });
        const replaced = newLines.join('\n');
        const newVal = before + replaced + after;
        onChange(newVal);
        setTimeout(() => {
          el.focus();
          el.setSelectionRange(start, start + replaced.length);
        }, 0);
      } else {
        // Just insert a bullet at cursor
        const lineStart = before.lastIndexOf('\n') + 1;
        const currentLinePrefix = before.substring(lineStart);
        const bulletPrefix = currentLinePrefix.trim() ? '\n• ' : '• ';
        const newVal = before + bulletPrefix + after;
        onChange(newVal);
        setTimeout(() => {
          el.focus();
          const newPos = start + bulletPrefix.length;
          el.setSelectionRange(newPos, newPos);
        }, 0);
      }
    } else {
      // Single line input
      if (value.startsWith('• ')) {
        // Toggle off
        onChange(value.replace(/^•\s*/, ''));
      } else {
        // Prepend bullet
        onChange(`• ${value.replace(/^[-*]\s*/, '')}`);
      }
      setTimeout(() => el.focus(), 0);
    }
  };

  const btnPadding = size === 'sm' ? 'p-1.5' : 'p-1';
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-3 h-3';

  return (
    <div
      className={`inline-flex items-center gap-0.5 bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 rounded-lg p-0.5 shadow-2xs ${className}`}
      role="toolbar"
      aria-label="Formatting options"
    >
      <button
        type="button"
        onMouseDown={handleBold}
        className={`${btnPadding} text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer font-bold`}
        title="Bold text (**text**) - Ctrl/Cmd+B"
        aria-label="Bold text"
      >
        <Bold className={iconSize} />
      </button>

      <button
        type="button"
        onMouseDown={handleItalic}
        className={`${btnPadding} text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer italic`}
        title="Italic text (*text*) - Ctrl/Cmd+I"
        aria-label="Italic text"
      >
        <Italic className={iconSize} />
      </button>

      {showBullets && (
        <button
          type="button"
          onMouseDown={handleBulletPoint}
          className={`${btnPadding} text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer`}
          title="Add / Toggle Bullet point (• text)"
          aria-label="Bullet point"
        >
          <List className={iconSize} />
        </button>
      )}

      {onOpenAIModal && (
        <>
          <div className="w-px h-3.5 bg-slate-200 dark:bg-slate-700 mx-0.5"></div>
          <button
            type="button"
            onClick={onOpenAIModal}
            className={`${btnPadding} text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 rounded-md transition-colors flex items-center gap-1 font-semibold text-[10px]`}
            title="Polish with AI"
          >
            <Sparkles className={iconSize} />
            <span className="hidden xs:inline">AI</span>
          </button>
        </>
      )}
    </div>
  );
};
