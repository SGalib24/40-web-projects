import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface KeyboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { key: '0 – 9', description: 'Enter digits' },
  { key: '.', description: 'Decimal point' },
  { key: '+  −  *  /', description: 'Basic arithmetic operators' },
  { key: 'Enter or =', description: 'Calculate result' },
  { key: 'Backspace', description: 'Delete last character' },
  { key: 'Esc or C', description: 'Clear all (Reset)' },
  { key: '%', description: 'Percentage' },
];

export const KeyboardModal: React.FC<KeyboardModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-white font-bold">
            <Keyboard className="w-5 h-5 text-sky-400" />
            <span>Keyboard Shortcuts</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close shortcuts"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-2.5">
          {SHORTCUTS.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg bg-slate-800/40 border border-slate-800"
            >
              <kbd className="px-2 py-1 rounded bg-slate-800 text-sky-300 font-mono font-bold border border-slate-700 shadow-sm">
                {item.key}
              </kbd>
              <span className="text-slate-400 font-medium">{item.description}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
