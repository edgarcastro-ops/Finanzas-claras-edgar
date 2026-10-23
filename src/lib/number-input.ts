const DEFAULT_MAX = 1_000_000_000_000;

const EDITABLE_NUMBER_CHARACTER = /[\d.-]/;

export function getNumberInputMax(
  suffix: string | undefined,
  maxInput?: number,
  min = 0,
): number {
  const defaultMax =
    suffix === "%" || suffix === "años"
      ? 100
      : suffix === "mes" || suffix === "meses"
        ? 1200
        : suffix === "pagas"
          ? 24
          : DEFAULT_MAX;
  const lower = Number.isFinite(min) ? min : 0;
  const upper =
    maxInput !== undefined && Number.isFinite(maxInput) ? maxInput : defaultMax;
  return Math.max(upper, lower);
}

export function formatThousandsInput(value: string): string {
  const withoutGrouping = value.replace(/,/g, "");
  const negative = withoutGrouping.startsWith("-");
  const sanitized = withoutGrouping.replace(/[^\d.]/g, "");
  const decimalIndex = sanitized.indexOf(".");
  const integerPart = decimalIndex < 0 ? sanitized : sanitized.slice(0, decimalIndex);
  const decimalPart = decimalIndex < 0 ? "" : sanitized.slice(decimalIndex + 1).replace(/\./g, "");
  const groupedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const sign = negative ? "-" : "";
  return `${sign}${groupedInteger}${decimalIndex < 0 ? "" : `.${decimalPart}`}`;
}

export function parseFormattedNumberInput(value: string): string {
  return value.replace(/,/g, "").trim();
}

export function getFormattedCaretPosition(value: string, characterCount: number): number {
  if (characterCount <= 0) return 0;
  let seen = 0;
  for (let index = 0; index < value.length; index += 1) {
    if (EDITABLE_NUMBER_CHARACTER.test(value[index] ?? "")) {
      seen += 1;
      if (seen === characterCount) return index + 1;
    }
  }
  return value.length;
}

export function countEditableNumberCharacters(value: string): number {
  return Array.from(value).filter((character) => EDITABLE_NUMBER_CHARACTER.test(character)).length;
}

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
