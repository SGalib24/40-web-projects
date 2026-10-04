import React from 'react';
import { History, Keyboard, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onToggleHistory: () => void;
  onToggleShortcuts: () => void;
  isHistoryOpen: boolean;
  historyCount: number;
  isDark: boolean;
  onToggleDark: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleHistory,
  onToggleShortcuts,
  isHistoryOpen,
  historyCount,
  isDark,
  onToggleDark,
}) => {
  return (
    <div className="flex items-center justify-between pb-4">
      {/* Branding */}
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
          #01
        </span>
        <h1 className="text-xl font-bold tracking-tight text-white dark:text-slate-100">
          Calculator
        </h1>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1.5">
        {/* Keyboard shortcut guide */}
        <button
          onClick={onToggleShortcuts}
          title="Keyboard shortcuts"
          aria-label="View keyboard shortcuts"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <Keyboard className="w-4 h-4" />
        </button>

        {/* History drawer toggle */}
        <button
          onClick={onToggleHistory}
          title="Toggle history"
          aria-label="Toggle history"
          className={`relative p-2 rounded-xl transition-colors ${
            isHistoryOpen
              ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <History className="w-4 h-4" />
          {historyCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-500 text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
              {historyCount > 9 ? '9+' : historyCount}
            </span>
          )}
        </button>

        {/* Theme mode toggle */}
        <button
          onClick={onToggleDark}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label="Toggle theme"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
