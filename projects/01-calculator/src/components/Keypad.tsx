import React from 'react';
import { Delete } from 'lucide-react';
import { Operator } from '../types';

interface KeypadProps {
  onDigit: (d: string) => void;
  onDecimal: () => void;
  onOperator: (op: Operator) => void;
  onCalculate: () => void;
  onClearAll: () => void;
  onToggleSign: () => void;
  onPercent: () => void;
  onBackspace: () => void;
  activeKey: string | null;
  hasInput: boolean;
}

export const Keypad: React.FC<KeypadProps> = ({
  onDigit,
  onDecimal,
  onOperator,
  onCalculate,
  onClearAll,
  onToggleSign,
  onPercent,
  onBackspace,
  activeKey,
  hasInput,
}) => {
  const isKeyActive = (keyMatcher: string | string[]) => {
    if (!activeKey) return false;
    if (Array.isArray(keyMatcher)) {
      return keyMatcher.includes(activeKey);
    }
    return activeKey === keyMatcher;
  };

  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-3 p-1">
      {/* ROW 1: Clear, Sign, Percent, Divide */}
      <button
        type="button"
        onClick={onClearAll}
        aria-label="Clear all"
        className={`h-14 sm:h-16 rounded-2xl font-bold text-base sm:text-lg transition-all duration-100 active:scale-95 flex items-center justify-center ${
          isKeyActive(['Escape', 'c', 'C'])
            ? 'bg-rose-500 text-white ring-2 ring-rose-400 scale-95'
            : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 active:bg-rose-500/30 border border-rose-500/30'
        }`}
      >
        {hasInput ? 'C' : 'AC'}
      </button>

      <button
        type="button"
        onClick={onToggleSign}
        aria-label="Toggle sign"
        className={`h-14 sm:h-16 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-100 active:scale-95 flex items-center justify-center bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 active:bg-slate-600/80 border border-slate-700/60`}
      >
        ±
      </button>

      <button
        type="button"
        onClick={onPercent}
        aria-label="Percentage"
        className={`h-14 sm:h-16 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-100 active:scale-95 flex items-center justify-center ${
          isKeyActive('%')
            ? 'bg-sky-500 text-white ring-2 ring-sky-400 scale-95'
            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 active:bg-slate-600/80 border border-slate-700/60'
        }`}
      >
        %
      </button>

      <button
        type="button"
        onClick={() => onOperator('/')}
        aria-label="Divide"
        className={`h-14 sm:h-16 rounded-2xl font-bold text-2xl transition-all duration-100 active:scale-95 flex items-center justify-center ${
          isKeyActive('/')
            ? 'bg-sky-500 text-white ring-2 ring-sky-300 scale-95'
            : 'bg-sky-500/15 text-sky-400 hover:bg-sky-500/25 active:bg-sky-500/35 border border-sky-500/30'
        }`}
      >
        ÷
      </button>

      {/* ROW 2: 7, 8, 9, Multiply */}
      {['7', '8', '9'].map((digit) => (
        <button
          key={digit}
          type="button"
          onClick={() => onDigit(digit)}
          aria-label={`Digit ${digit}`}
          className={`h-14 sm:h-16 rounded-2xl font-bold text-xl sm:text-2xl transition-all duration-100 active:scale-95 flex items-center justify-center ${
            isKeyActive(digit)
              ? 'bg-slate-600 text-white ring-2 ring-sky-400 scale-95'
              : 'bg-slate-800/90 text-white hover:bg-slate-700 active:bg-slate-600 border border-slate-700/60 shadow-sm'
          }`}
        >
          {digit}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onOperator('*')}
        aria-label="Multiply"
        className={`h-14 sm:h-16 rounded-2xl font-bold text-2xl transition-all duration-100 active:scale-95 flex items-center justify-center ${
          isKeyActive('*')
            ? 'bg-sky-500 text-white ring-2 ring-sky-300 scale-95'
            : 'bg-sky-500/15 text-sky-400 hover:bg-sky-500/25 active:bg-sky-500/35 border border-sky-500/30'
        }`}
      >
        ×
      </button>

      {/* ROW 3: 4, 5, 6, Subtract */}
      {['4', '5', '6'].map((digit) => (
        <button
          key={digit}
          type="button"
          onClick={() => onDigit(digit)}
          aria-label={`Digit ${digit}`}
          className={`h-14 sm:h-16 rounded-2xl font-bold text-xl sm:text-2xl transition-all duration-100 active:scale-95 flex items-center justify-center ${
            isKeyActive(digit)
              ? 'bg-slate-600 text-white ring-2 ring-sky-400 scale-95'
              : 'bg-slate-800/90 text-white hover:bg-slate-700 active:bg-slate-600 border border-slate-700/60 shadow-sm'
          }`}
        >
          {digit}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onOperator('-')}
        aria-label="Subtract"
        className={`h-14 sm:h-16 rounded-2xl font-bold text-2xl transition-all duration-100 active:scale-95 flex items-center justify-center ${
          isKeyActive('-')
            ? 'bg-sky-500 text-white ring-2 ring-sky-300 scale-95'
            : 'bg-sky-500/15 text-sky-400 hover:bg-sky-500/25 active:bg-sky-500/35 border border-sky-500/30'
        }`}
      >
        −
      </button>

      {/* ROW 4: 1, 2, 3, Add */}
      {['1', '2', '3'].map((digit) => (
        <button
          key={digit}
          type="button"
          onClick={() => onDigit(digit)}
          aria-label={`Digit ${digit}`}
          className={`h-14 sm:h-16 rounded-2xl font-bold text-xl sm:text-2xl transition-all duration-100 active:scale-95 flex items-center justify-center ${
            isKeyActive(digit)
              ? 'bg-slate-600 text-white ring-2 ring-sky-400 scale-95'
              : 'bg-slate-800/90 text-white hover:bg-slate-700 active:bg-slate-600 border border-slate-700/60 shadow-sm'
          }`}
        >
          {digit}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onOperator('+')}
        aria-label="Add"
        className={`h-14 sm:h-16 rounded-2xl font-bold text-2xl transition-all duration-100 active:scale-95 flex items-center justify-center ${
          isKeyActive('+')
            ? 'bg-sky-500 text-white ring-2 ring-sky-300 scale-95'
            : 'bg-sky-500/15 text-sky-400 hover:bg-sky-500/25 active:bg-sky-500/35 border border-sky-500/30'
        }`}
      >
        +
      </button>

      {/* ROW 5: Backspace, 0, Decimal, Equals */}
      <button
        type="button"
        onClick={onBackspace}
        aria-label="Backspace"
        className={`h-14 sm:h-16 rounded-2xl font-semibold text-lg transition-all duration-100 active:scale-95 flex items-center justify-center ${
          isKeyActive('Backspace')
            ? 'bg-slate-600 text-white ring-2 ring-sky-400 scale-95'
            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 active:bg-slate-600/80 border border-slate-700/60'
        }`}
      >
        <Delete className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={() => onDigit('0')}
        aria-label="Digit 0"
        className={`h-14 sm:h-16 rounded-2xl font-bold text-xl sm:text-2xl transition-all duration-100 active:scale-95 flex items-center justify-center ${
          isKeyActive('0')
            ? 'bg-slate-600 text-white ring-2 ring-sky-400 scale-95'
            : 'bg-slate-800/90 text-white hover:bg-slate-700 active:bg-slate-600 border border-slate-700/60 shadow-sm'
        }`}
      >
        0
      </button>

      <button
        type="button"
        onClick={onDecimal}
        aria-label="Decimal point"
        className={`h-14 sm:h-16 rounded-2xl font-bold text-xl sm:text-2xl transition-all duration-100 active:scale-95 flex items-center justify-center ${
          isKeyActive('.')
            ? 'bg-slate-600 text-white ring-2 ring-sky-400 scale-95'
            : 'bg-slate-800/90 text-white hover:bg-slate-700 active:bg-slate-600 border border-slate-700/60 shadow-sm'
        }`}
      >
        .
      </button>

      <button
        type="button"
        onClick={onCalculate}
        aria-label="Equals"
        className={`h-14 sm:h-16 rounded-2xl font-bold text-2xl transition-all duration-100 active:scale-95 flex items-center justify-center ${
          isKeyActive('=')
            ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white ring-2 ring-white scale-95 shadow-sky-500/50'
            : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 border border-sky-400/40'
        }`}
      >
        =
      </button>
    </div>
  );
};
