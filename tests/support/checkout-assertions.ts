export function moneyToCents(displayText: string): number {
  const match = displayText.match(/\$\s*([\d,]+)(?:\.(\d{1,2}))?/);

  if (!match) {
    throw new Error(`Expected a currency amount in "${displayText}"`);
  }

  const dollars = Number(match[1].replace(/,/g, ''));
  const cents = Number((match[2] ?? '').padEnd(2, '0'));
  return dollars * 100 + cents;
}