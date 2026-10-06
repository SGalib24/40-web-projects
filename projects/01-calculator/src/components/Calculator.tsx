import React, { useState } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { useKeyboard } from '../hooks/useKeyboard';
import { Header } from './Header';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { HistoryDrawer } from './HistoryDrawer';
import { KeyboardModal } from './KeyboardModal';

export const Calculator: React.FC = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const {
    currentInput,
    currentExpression,
    error,
    history,
    inputDigit,
    inputDecimal,
    inputOperator,
    calculate,
    clearAll,
    toggleSign,
    inputPercent,
    backspace,
    recallHistory,
    clearHistory,
  } = useCalculator();

  const { activeKey } = useKeyboard({
    inputDigit,
    inputDecimal,
    inputOperator,
    calculate,
    clearAll,
    backspace,
    inputPercent,
  });

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
      {/* Decorative ambient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-blue-500/10 to-indigo-500/20 rounded-[36px] blur-xl opacity-70 -z-10" />

      {/* Main Calculator Card */}
      <div className="relative bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-[32px] p-5 sm:p-6 shadow-2xl flex flex-col gap-4 overflow-hidden">
        {/* Top Header */}
        <Header
          onToggleHistory={() => setIsHistoryOpen((prev) => !prev)}
          onToggleShortcuts={() => setIsShortcutsOpen(true)}
          isHistoryOpen={isHistoryOpen}
          historyCount={history.length}
          isDark={isDark}
          onToggleDark={toggleTheme}
        />

        {/* Display Screen */}
        <Display
          currentInput={currentInput}
          expression={currentExpression}
          error={error}
        />

        {/* Keypad Buttons */}
        <Keypad
          onDigit={inputDigit}
          onDecimal={inputDecimal}
          onOperator={inputOperator}
          onCalculate={calculate}
          onClearAll={clearAll}
          onToggleSign={toggleSign}
          onPercent={inputPercent}
          onBackspace={backspace}
          activeKey={activeKey}
          hasInput={currentInput !== '0' || currentExpression !== ''}
        />

        {/* Collapsible History Drawer */}
        <HistoryDrawer
          history={history}
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          onRecall={recallHistory}
          onClear={clearHistory}
        />

        {/* Keyboard Shortcuts Reference Modal */}
        <KeyboardModal
          isOpen={isShortcutsOpen}
          onClose={() => setIsShortcutsOpen(false)}
        />
      </div>
    </div>
  );
};
