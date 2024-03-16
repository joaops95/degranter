type CompareFunction<T> = (a: T, b: T) => boolean;
export function max<T>(
  items: T[],
  cmp: CompareFunction<T> = (a, b) => a < b
): T | null {
  return items.reduce(
    (prev, curr) => (prev === null ? curr : prev > curr ? prev : curr),
    null
  );
}

export function formatNumber(number: number): string {
  // Convert number to string
  let numStr = number.toString();

  // Split the string into parts for integer and decimal
  let parts = numStr.split(".");
  let integerPart = parts[0];
  let decimalPart = parts.length > 1 ? "." + parts[1] : "";

  // Add thousand separator to the integer part
  let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Combine integer and decimal parts
  let formattedNumber = formattedInteger + decimalPart;

  return formattedNumber;
}
