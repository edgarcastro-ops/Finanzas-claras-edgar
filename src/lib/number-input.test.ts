import assert from "node:assert/strict";
import test from "node:test";
import { normalizeNumberInput } from "./number-input.ts";

test("normalizeNumberInput handles empty, invalid, negative, and out-of-range values", () => {
  assert.equal(normalizeNumberInput("", 0, 100), 0);
  assert.equal(normalizeNumberInput("not a number", 0, 100), 0);
  assert.equal(normalizeNumberInput("-25", 0, 100), 0);
  assert.equal(normalizeNumberInput("125", 0, 100), 100);
  assert.equal(normalizeNumberInput("42.5", 0, 100), 42.5);
});
