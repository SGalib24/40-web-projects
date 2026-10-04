/**
 * Formats a numeric input string for human display with thousands separators
 * while preserving ongoing decimals (e.g. "12." or "0.00").
 */
export function formatDisplayNumber(valueStr: string): string {
  if (!valueStr) return '0';
  if (valueStr === 'Error' || valueStr === 'Cannot divide by zero') return valueStr;

  // Check if negative
  const isNegative = valueStr.startsWith('-');
  const raw = isNegative ? valueStr.slice(1) : valueStr;

  // Split integer and decimal parts
  const [intPart, decPart] = raw.split('.');

  // Format integer part with thousands commas
  const parsedInt = parseFloat(intPart);
  if (isNaN(parsedInt)) {
    return valueStr;
  }

  // Check for extreme large/small numbers
  if (Math.abs(parseFloat(valueStr)) >= 1e12 || (Math.abs(parseFloat(valueStr)) > 0 && Math.abs(parseFloat(valueStr)) < 1e-7)) {
    return parseFloat(valueStr).toExponential(6);
  }

  const formattedInt = parsedInt.toLocaleString('en-US');

  let result = (isNegative ? '-' : '') + formattedInt;
  if (decPart !== undefined) {
    result += '.' + decPart;
  }

  return result;
}

/**
 * Returns dynamic Tailwind font size class according to text length to prevent overflow
 */
export function getDisplayFontSizeClass(length: number): string {
  if (length > 16) return 'text-2xl sm:text-3xl';
  if (length > 12) return 'text-3xl sm:text-4xl';
  if (length > 9) return 'text-4xl sm:text-5xl';
  return 'text-5xl sm:text-6xl';
}
