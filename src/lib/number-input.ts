const DEFAULT_MAX = 1_000_000_000_000;

export function normalizeNumberInput(
  value: string,
  min = 0,
  max = DEFAULT_MAX,
): number {
  const lower = Number.isFinite(min) ? min : 0;
  const upper = Number.isFinite(max) ? Math.max(max, lower) : Math.max(DEFAULT_MAX, lower);
  if (value.trim() === "") return lower;

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return lower;

  return Math.min(Math.max(parsed, lower), upper);
}
