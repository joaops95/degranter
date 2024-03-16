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

export function calculateTotalYield(
  amount: number,
  apy: number,
  numberOfInstallments: number
): number {
  // Convert APY to monthly interest rate
  const monthlyInterestRate = apy / 12;

  // Calculate monthly payment using the formula for the present value of an annuity
  const monthlyPayment =
    amount *
    (monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfInstallments)));

  // Calculate total amount paid
  const totalAmountPaid = monthlyPayment * numberOfInstallments;

  // Calculate total interest paid
  const totalInterestPaid = totalAmountPaid - amount;

  // Calculate monthly yield
  const monthlyYield = totalInterestPaid / numberOfInstallments;

  return monthlyYield;
}

export function calculateTotalInterest(amount, apy, numberOfInstallments) {
  // Convert APY to decimal and monthly interest rate
  const monthlyInterestRate = apy / 12;

  // Calculate total amount received using compound interest formula
  const totalAmountReceived = amount * Math.pow(1 + monthlyInterestRate, numberOfInstallments);

  // Calculate total interest received
  const totalInterestReceived = totalAmountReceived - amount;

  return totalInterestReceived;
}