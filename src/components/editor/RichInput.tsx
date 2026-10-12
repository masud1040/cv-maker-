import React, { useRef } from 'react';
import { Bold, Italic, List } from 'lucide-react';

interface RichInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showBulletToggle?: boolean;
}

export const RichInput: React.FC<RichInputProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
  showBulletToggle = true
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const applyFormat = (wrapper: string) => {
    const el = inputRef.current;
    if (!el) {
      onChange(`${value}${wrapper}text${wrapper}`);
      return;
    }

    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const sel = value.substring(start, end);

    if (sel) {
      const wrapLen = wrapper.length;
      const beforeSel = value.substring(Math.max(0, start - wrapLen), start);
      const afterSel = value.substring(end, end + wrapLen);

      if (beforeSel === wrapper && afterSel === wrapper) {
        // Toggle off
        const newVal = value.substring(0, start - wrapLen) + sel + value.substring(end + wrapLen);
        onChange(newVal);
        setTimeout(() => {
          el.focus();
          el.setSelectionRange(start - wrapLen, end - wrapLen);
        }, 0);
        return;
      }

      const newVal = value.substring(0, start) + `${wrapper}${sel}${wrapper}` + value.substring(end);
      onChange(newVal);
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start + wrapLen, end + wrapLen);
      }, 0);
    } else {
      const placeholderText = 'key point';
      const newVal = value.substring(0, start) + `${wrapper}${placeholderText}${wrapper}` + value.substring(end);
      onChange(newVal);
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start + wrapper.length, start + wrapper.length + placeholderText.length);
      }, 0);
    }
  };

  const toggleBullet = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = inputRef.current;
    if (value.startsWith('• ')) {
      onChange(value.replace(/^•\s*/, ''));
    } else {
      onChange(`• ${value.replace(/^[-*]\s*/, '')}`);
    }
    setTimeout(() => el?.focus(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
      e.preventDefault();
      applyFormat('**');
    } else if ((e.ctrlKey || e.metaKey) && (e.key === 'i' || e.key === 'I')) {
      e.preventDefault();
      applyFormat('*');
    }
  };

  return (
    <div className={`relative flex items-center group/rich-input ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-3 pr-16 py-1.5 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition"
      />

      {/* Floating Mini Formatting Action Bar */}
      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-60 group-hover/rich-input:opacity-100 focus-within:opacity-100 transition-opacity bg-white/95 dark:bg-slate-800/95 pl-1 rounded">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('**');
          }}
          className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition"
          title="Bold (**text**)"
          aria-label="Bold text"
        >
          <Bold className="w-3 h-3 font-bold" />
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('*');
          }}
          className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition"
          title="Italic (*text*)"
          aria-label="Italic text"
        >
          <Italic className="w-3 h-3" />
        </button>

        {showBulletToggle && (
          <button
            type="button"
            onMouseDown={toggleBullet}
            className={`p-1 rounded transition ${
              value.startsWith('• ')
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                : 'text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
            title="Bullet point (•)"
            aria-label="Bullet point"
          >
            <List className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
