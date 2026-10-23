import assert from "node:assert/strict";
import test from "node:test";
import {
  countEditableNumberCharacters,
  formatThousandsInput,
  getFormattedCaretPosition,
  getNumberInputMax,
  normalizeNumberInput,
  parseFormattedNumberInput,
} from "./number-input.ts";

test("normalizeNumberInput handles empty, invalid, negative, and out-of-range values", () => {
  assert.equal(normalizeNumberInput("", 0, 100), 0);
  assert.equal(normalizeNumberInput("not a number", 0, 100), 0);
  assert.equal(normalizeNumberInput("-25", 0, 100), 0);
  assert.equal(normalizeNumberInput("125", 0, 100), 100);
  assert.equal(normalizeNumberInput("42.5", 0, 100), 42.5);
});

test("normalizeNumberInput uses a finite fallback maximum when one is omitted", () => {
  assert.equal(normalizeNumberInput("", 0), 0);
  assert.equal(normalizeNumberInput("1000000000001", 0), 1_000_000_000_000);
});

test("getNumberInputMax separates text limits from slider ranges", () => {
  assert.equal(getNumberInputMax("%"), 100);
  assert.equal(getNumberInputMax("años"), 100);
  assert.equal(getNumberInputMax("mes"), 1200);
  assert.equal(getNumberInputMax("meses"), 1200);
  assert.equal(getNumberInputMax("pagas"), 24);
  assert.equal(getNumberInputMax(undefined), 1_000_000_000_000);
  assert.equal(getNumberInputMax("meses", 360), 360);
  assert.equal(getNumberInputMax("meses", 360, 480), 480);
});

test("number input maxima preserve large amounts and clamp percentages and negatives", () => {
  assert.equal(normalizeNumberInput("2500000", 500, getNumberInputMax(undefined, undefined, 500)), 2_500_000);
  assert.equal(normalizeNumberInput("", 500, getNumberInputMax(undefined, undefined, 500)), 500);
  assert.equal(normalizeNumberInput("-5", 0, getNumberInputMax(undefined)), 0);
  assert.equal(normalizeNumberInput("150", 0, getNumberInputMax("%")), 100);
});

test("thousands formatting preserves decimals and accepts pasted grouped values", () => {
  assert.equal(formatThousandsInput("8000000"), "8,000,000");
  assert.equal(formatThousandsInput("1234567.89"), "1,234,567.89");
  assert.equal(formatThousandsInput("1234567."), "1,234,567.");
  assert.equal(formatThousandsInput("8,000,000.25"), "8,000,000.25");
  assert.equal(parseFormattedNumberInput("8,000,000.25"), "8000000.25");
  assert.equal(normalizeNumberInput(parseFormattedNumberInput("8,000,000.25")), 8_000_000.25);
});

test("formatted input caret tracks numeric characters across inserted separators", () => {
  const formatted = formatThousandsInput("8000000");
  const charactersBeforeCaret = countEditableNumberCharacters("8000");
  assert.equal(formatted, "8,000,000");
  assert.equal(getFormattedCaretPosition(formatted, charactersBeforeCaret), 5);
  assert.equal(getFormattedCaretPosition(formatted, 0), 0);
  assert.equal(getFormattedCaretPosition(formatted, 20), formatted.length);
});

test("formatted number input keeps decimal and negative editing characters", () => {
  assert.equal(formatThousandsInput("-1234567.50"), "-1,234,567.50");
  assert.equal(parseFormattedNumberInput("-1,234,567.50"), "-1234567.50");
});
