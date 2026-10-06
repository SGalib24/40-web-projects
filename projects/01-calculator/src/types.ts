export type Operator = '+' | '-' | '*' | '/';

export interface CalculationRecord {
  id: string;
  expression: string;
  result: string;
  timestamp: Date;
}

export type ButtonType = 'digit' | 'operator' | 'action' | 'equals';

export interface KeypadButton {
  label: string;
  value: string;
  type: ButtonType;
  ariaLabel?: string;
  className?: string;
  shortcut?: string;
}

export interface CalculatorState {
  currentInput: string;
  tokens: string[]; // e.g. ["12", "+", "5", "*", "2"]
  result: string | null;
  error: string | null;
  history: CalculationRecord[];
}
