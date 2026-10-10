export function dominicanSeveranceDays(completedMonths: number): number {
  const months = Math.max(Math.floor(completedMonths), 0);
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    if (months >= 6) return 13;
    return months >= 3 ? 6 : 0;
  }

  const daysPerYear = months >= 60 ? 23 : 21;
  const fractionDays = remainingMonths >= 6 ? 13 : remainingMonths >= 3 ? 6 : 0;
  return years * daysPerYear + fractionDays;
}

export function dominicanNoticeDays(completedMonths: number): number {
  const months = Math.max(Math.floor(completedMonths), 0);
  if (months >= 12) return 28;
  if (months >= 6) return 14;
  return months >= 3 ? 7 : 0;
}
