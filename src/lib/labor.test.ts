import assert from "node:assert/strict";
import test from "node:test";
import { dominicanNoticeDays, dominicanSeveranceDays } from "./labor.ts";

test("Dominican severance thresholds match the Ministry of Labor calculator", () => {
  assert.equal(dominicanSeveranceDays(2), 0);
  assert.equal(dominicanSeveranceDays(3), 6);
  assert.equal(dominicanSeveranceDays(6), 13);
  assert.equal(dominicanSeveranceDays(12), 21);
  assert.equal(dominicanSeveranceDays(12 * 4 + 6), 97);
  assert.equal(dominicanSeveranceDays(60), 115);
  assert.equal(dominicanSeveranceDays(12 * 5 + 6), 128);
});

test("Dominican notice thresholds include the one-year boundary", () => {
  assert.equal(dominicanNoticeDays(2), 0);
  assert.equal(dominicanNoticeDays(3), 7);
  assert.equal(dominicanNoticeDays(6), 14);
  assert.equal(dominicanNoticeDays(11), 14);
  assert.equal(dominicanNoticeDays(12), 28);
});
