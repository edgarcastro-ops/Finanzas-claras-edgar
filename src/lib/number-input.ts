export function normalizeNumberInput(value: string, min: number, max: number): number {
  if (value.trim() === "") return min;

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return min;

  return Math.min(Math.max(parsed, min), max);
}
