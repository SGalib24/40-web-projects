import React, { useState } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { formatDisplayNumber, getDisplayFontSizeClass } from '../utils/formatter';

interface DisplayProps {
  currentInput: string;
  expression: string;
  error: string | null;
}

export const Display: React.FC<DisplayProps> = ({ currentInput, expression, error }) => {
  const [copied, setCopied] = useState(false);

  const displayValue = error ? error : formatDisplayNumber(currentInput);
  const fontSizeClass = error ? 'text-2xl sm:text-3xl' : getDisplayFontSizeClass(displayValue.length);

  const handleCopy = () => {
    if (error) return;
    navigator.clipboard.writeText(currentInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative p-5 sm:p-6 bg-slate-900/90 dark:bg-slate-950/90 rounded-2xl border border-slate-800 dark:border-slate-800 shadow-inner flex flex-col justify-end min-h-[140px] sm:min-h-[160px] overflow-hidden select-text">
      {/* Top Expression / Running Formula Tape */}
      <div className="h-6 flex items-center justify-between text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-400 overflow-hidden">
        <span className="truncate tracking-wide">{expression || '\u00A0'}</span>

        {/* Copy to clipboard button */}
        {!error && currentInput !== '0' && (
          <button
            onClick={handleCopy}
            title="Copy current value"
            aria-label="Copy to clipboard"
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors ml-2 shrink-0"
          >
            {copied ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-sans">
                <Check className="w-3.5 h-3.5" />
                Copied
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>

      {/* Main Display: Current Input or Error */}
      <div className="mt-2 flex items-center justify-end overflow-hidden">
        {error ? (
          <div className="flex items-center gap-2 text-rose-400 font-semibold animate-pulse text-right">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-xl sm:text-2xl font-sans tracking-tight">{error}</span>
          </div>
        ) : (
          <div
            className={`font-mono font-bold tracking-tight text-white dark:text-slate-100 text-right overflow-x-auto whitespace-nowrap scrollbar-none transition-all duration-150 ${fontSizeClass}`}
          >
            {displayValue}
          </div>
        )}
      </div>
    </div>
  );
};
