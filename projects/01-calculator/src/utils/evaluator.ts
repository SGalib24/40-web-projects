import { Operator } from '../types';

export interface EvaluationResult {
  value: number;
  formatted: string;
  error?: string;
}

/**
 * Normalizes floating-point inaccuracies like 0.1 + 0.2 = 0.30000000000000004
 */
export function normalizeFloat(value: number): number {
  if (!isFinite(value)) return value;
  // Use toPrecision to strip trailing IEEE 754 precision noise
  return parseFloat(value.toPrecision(12));
}

/**
 * Safely evaluates an arithmetic expression represented by alternating number and operator tokens
 * strictly respecting operator precedence (multiplication & division before addition & subtraction).
 */
export function evaluateExpression(tokens: string[]): EvaluationResult {
  if (tokens.length === 0) {
    return { value: 0, formatted: '0' };
  }

  // If only one token and it's a valid number
  if (tokens.length === 1) {
    const val = parseFloat(tokens[0]);
    if (isNaN(val)) {
      return { value: 0, formatted: '0', error: 'Invalid Input' };
    }
    return { value: val, formatted: tokens[0] };
  }

  // Ensure tokens alternate between number and operator
  const workingTokens: string[] = [...tokens];

  // If the last token is an operator, ignore it for evaluation
  if (isOperator(workingTokens[workingTokens.length - 1])) {
    workingTokens.pop();
  }

  if (workingTokens.length === 0) {
    return { value: 0, formatted: '0' };
  }

  // First pass: perform multiplication (*) and division (/)
  const intermediateTokens: string[] = [];
  let i = 0;

  while (i < workingTokens.length) {
    const token = workingTokens[i];

    if (token === '*' || token === '/') {
      const prevNumStr = intermediateTokens.pop();
      const nextNumStr = workingTokens[i + 1];

      if (prevNumStr === undefined || nextNumStr === undefined) {
        return { value: 0, formatted: '0', error: 'Malformed Expression' };
      }

      const prevNum = parseFloat(prevNumStr);
      const nextNum = parseFloat(nextNumStr);

      if (isNaN(prevNum) || isNaN(nextNum)) {
        return { value: 0, formatted: '0', error: 'Invalid Number' };
      }

      if (token === '/') {
        if (nextNum === 0) {
          return { value: 0, formatted: '0', error: 'Cannot divide by zero' };
        }
        const res = normalizeFloat(prevNum / nextNum);
        intermediateTokens.push(res.toString());
      } else {
        const res = normalizeFloat(prevNum * nextNum);
        intermediateTokens.push(res.toString());
      }

      i += 2; // Skip operator and right operand
    } else {
      intermediateTokens.push(token);
      i += 1;
    }
  }

  // Second pass: perform addition (+) and subtraction (-)
  if (intermediateTokens.length === 0) {
    return { value: 0, formatted: '0' };
  }

  let finalValue = parseFloat(intermediateTokens[0]);
  if (isNaN(finalValue)) {
    return { value: 0, formatted: '0', error: 'Invalid Number' };
  }

  let j = 1;
  while (j < intermediateTokens.length) {
    const op = intermediateTokens[j];
    const nextNumStr = intermediateTokens[j + 1];

    if (nextNumStr === undefined) {
      break;
    }

    const nextNum = parseFloat(nextNumStr);
    if (isNaN(nextNum)) {
      return { value: 0, formatted: '0', error: 'Invalid Number' };
    }

    if (op === '+') {
      finalValue = normalizeFloat(finalValue + nextNum);
    } else if (op === '-') {
      finalValue = normalizeFloat(finalValue - nextNum);
    }

    j += 2;
  }

  return {
    value: finalValue,
    formatted: finalValue.toString(),
  };
}

export function isOperator(token: string): token is Operator {
  return token === '+' || token === '-' || token === '*' || token === '/';
}

/**
 * Formats operators for visual display
 */
export function displayOperator(op: string): string {
  switch (op) {
    case '*':
      return '×';
    case '/':
      return '÷';
    case '-':
      return '−';
    case '+':
      return '+';
    default:
      return op;
  }
}
