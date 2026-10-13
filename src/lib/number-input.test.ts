import assert from "node:assert/strict";
import test from "node:test";
import { getNumberInputMax, normalizeNumberInput } from "./number-input.ts";

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
