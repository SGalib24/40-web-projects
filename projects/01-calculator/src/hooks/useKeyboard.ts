import { useEffect, useState } from 'react';
import { Operator } from '../types';

interface KeyboardHandlers {
  inputDigit: (d: string) => void;
  inputDecimal: () => void;
  inputOperator: (op: Operator) => void;
  calculate: () => void;
  clearAll: () => void;
  backspace: () => void;
  inputPercent: () => void;
}

export function useKeyboard({
  inputDigit,
  inputDecimal,
  inputOperator,
  calculate,
  clearAll,
  backspace,
  inputPercent,
}: KeyboardHandlers) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is focusing an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key;

      if (/^[0-9]$/.test(key)) {
        setActiveKey(key);
        inputDigit(key);
      } else if (key === '.' || key === ',') {
        setActiveKey('.');
        inputDecimal();
      } else if (key === '+') {
        setActiveKey('+');
        inputOperator('+');
      } else if (key === '-') {
        setActiveKey('-');
        inputOperator('-');
      } else if (key === '*' || key.toLowerCase() === 'x') {
        setActiveKey('*');
        inputOperator('*');
      } else if (key === '/') {
        e.preventDefault(); // Prevent browser quick-find
        setActiveKey('/');
        inputOperator('/');
      } else if (key === '%') {
        setActiveKey('%');
        inputPercent();
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        setActiveKey('=');
        calculate();
      } else if (key === 'Backspace') {
        setActiveKey('Backspace');
        backspace();
      } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        setActiveKey('Escape');
        clearAll();
      }
    };

    const handleKeyUp = () => {
      setActiveKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [inputDigit, inputDecimal, inputOperator, calculate, clearAll, backspace, inputPercent]);

  return { activeKey };
}
