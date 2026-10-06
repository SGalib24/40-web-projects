import { useState, useCallback } from 'react';
import { CalculationRecord, Operator } from '../types';
import { evaluateExpression, isOperator, displayOperator, normalizeFloat } from '../utils/evaluator';

export function useCalculator() {
  const [currentInput, setCurrentInput] = useState<string>('0');
  const [tokens, setTokens] = useState<string[]>([]);
  const [isNewInput, setIsNewInput] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<CalculationRecord[]>([]);

  // Clear everything (AC)
  const clearAll = useCallback(() => {
    setCurrentInput('0');
    setTokens([]);
    setIsNewInput(true);
    setError(null);
  }, []);

  // Clear only current entry (CE)
  const clearEntry = useCallback(() => {
    setCurrentInput('0');
    setIsNewInput(true);
    setError(null);
  }, []);

  // Input numeric digit (0-9)
  const inputDigit = useCallback((digit: string) => {
    setError(null);

    setCurrentInput((prev) => {
      // If we are starting a fresh input or previous was '0'
      if (isNewInput || prev === '0') {
        setIsNewInput(false);
        return digit;
      }

      // Limit length to 15 digits
      const digitsOnly = prev.replace(/[^0-9]/g, '');
      if (digitsOnly.length >= 15) {
        return prev;
      }

      return prev + digit;
    });
  }, [isNewInput]);

  // Input decimal separator (.)
  const inputDecimal = useCallback(() => {
    setError(null);

    setCurrentInput((prev) => {
      if (isNewInput) {
        setIsNewInput(false);
        return '0.';
      }

      if (prev.includes('.')) {
        return prev; // Disallow duplicate decimal points
      }

      return prev + '.';
    });
  }, [isNewInput]);

  // Handle binary operator (+, -, *, /)
  const inputOperator = useCallback((op: Operator) => {
    if (error) {
      setError(null);
    }

    setTokens((prevTokens) => {
      // If user hasn't typed a new number and clicks an operator, replace the previous operator
      if (isNewInput && prevTokens.length > 0 && isOperator(prevTokens[prevTokens.length - 1])) {
        const updated = [...prevTokens];
        updated[updated.length - 1] = op;
        return updated;
      }

      return [...prevTokens, currentInput, op];
    });

    setIsNewInput(true);
  }, [currentInput, isNewInput, error]);

  // Calculate final result (=)
  const calculate = useCallback(() => {
    if (error) return;

    if (tokens.length === 0) {
      return; // Nothing to compute
    }

    const fullTokens = [...tokens, currentInput];
    const evaluation = evaluateExpression(fullTokens);

    if (evaluation.error) {
      setError(evaluation.error);
      setCurrentInput('0');
      setTokens([]);
      setIsNewInput(true);
      return;
    }

    // Save to history
    const expressionString = fullTokens
      .map((t) => (isOperator(t) ? displayOperator(t) : t))
      .join(' ') + ' =';

    const newRecord: CalculationRecord = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
      expression: expressionString,
      result: evaluation.formatted,
      timestamp: new Date(),
    };

    setHistory((prev) => [newRecord, ...prev].slice(0, 50)); // Keep last 50
    setCurrentInput(evaluation.formatted);
    setTokens([]);
    setIsNewInput(true);
  }, [currentInput, tokens, error]);

  // Toggle positive / negative (±)
  const toggleSign = useCallback(() => {
    if (error || currentInput === '0') return;

    setCurrentInput((prev) => {
      if (prev.startsWith('-')) {
        return prev.slice(1);
      }
      return '-' + prev;
    });
  }, [currentInput, error]);

  // Percentage calculation (%)
  const inputPercent = useCallback(() => {
    if (error) return;

    setCurrentInput((prev) => {
      const currentVal = parseFloat(prev);
      if (isNaN(currentVal) || currentVal === 0) return '0';

      // Check if there is an active operator and prior number in tokens
      if (tokens.length >= 2) {
        const lastOp = tokens[tokens.length - 1];
        const baseNum = parseFloat(tokens[tokens.length - 2]);

        if (!isNaN(baseNum) && (lastOp === '+' || lastOp === '-')) {
          // For addition and subtraction: 100 + 20% -> 20% of 100 is 20
          const percentVal = normalizeFloat((baseNum * currentVal) / 100);
          return percentVal.toString();
        }
      }

      // Default unary percent: e.g. 50% = 0.5
      const percentVal = normalizeFloat(currentVal / 100);
      return percentVal.toString();
    });
  }, [tokens, error]);

  // Backspace / Delete last character
  const backspace = useCallback(() => {
    if (error) {
      clearAll();
      return;
    }

    if (isNewInput) return;

    setCurrentInput((prev) => {
      if (prev.length <= 1 || (prev.length === 2 && prev.startsWith('-'))) {
        setIsNewInput(true);
        return '0';
      }
      return prev.slice(0, -1);
    });
  }, [error, isNewInput, clearAll]);

  // Recall result from history
  const recallHistory = useCallback((record: CalculationRecord) => {
    setCurrentInput(record.result);
    setTokens([]);
    setIsNewInput(true);
    setError(null);
  }, []);

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // Build the live expression string (e.g. "12 + 4 ×")
  const currentExpression = tokens
    .map((t) => (isOperator(t) ? displayOperator(t) : t))
    .join(' ');

  return {
    currentInput,
    currentExpression,
    tokens,
    error,
    history,
    inputDigit,
    inputDecimal,
    inputOperator,
    calculate,
    clearAll,
    clearEntry,
    toggleSign,
    inputPercent,
    backspace,
    recallHistory,
    clearHistory,
  };
}
