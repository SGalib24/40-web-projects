import React from 'react';
import { Trash2, Clock, ArrowDownLeft, X } from 'lucide-react';
import { CalculationRecord } from '../types';

interface HistoryDrawerProps {
  history: CalculationRecord[];
  isOpen: boolean;
  onClose: () => void;
  onRecall: (record: CalculationRecord) => void;
  onClear: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  history,
  isOpen,
  onClose,
  onRecall,
  onClear,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-30 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md rounded-3xl p-5 flex flex-col border border-slate-800 animate-fadeIn">
      {/* Drawer Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Clock className="w-4 h-4 text-sky-400" />
          <span>Calculation History ({history.length})</span>
        </div>
        <div className="flex items-center gap-1">
          {history.length > 0 && (
            <button
              onClick={onClear}
              title="Clear calculation history"
              aria-label="Clear history"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close history"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* History Items List */}
      <div className="flex-1 overflow-y-auto py-3 space-y-2 pr-1 scrollbar-thin">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
            <Clock className="w-8 h-8 mb-2 opacity-40 text-slate-400" />
            <p className="text-sm font-medium text-slate-400">No calculations yet</p>
            <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
              Calculations performed will be recorded here for quick recall.
            </p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onRecall(item);
                onClose();
              }}
              className="group p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/40 hover:border-sky-500/40 cursor-pointer transition-all flex flex-col items-end gap-1 shadow-sm"
            >
              <div className="w-full flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="opacity-0 group-hover:opacity-100 text-sky-400 flex items-center gap-1 font-sans text-[11px] transition-opacity">
                  <ArrowDownLeft className="w-3 h-3" />
                  Recall
                </span>
                <span className="truncate max-w-[240px] text-right">{item.expression}</span>
              </div>
              <div className="text-lg font-bold font-mono text-white group-hover:text-sky-300 transition-colors">
                = {item.result}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer hint */}
      {history.length > 0 && (
        <div className="pt-2 text-center text-[11px] text-slate-500 border-t border-slate-800">
          Click any calculation to load the result into the display
        </div>
      )}
    </div>
  );
};
