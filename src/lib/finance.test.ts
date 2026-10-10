import assert from "node:assert/strict";
import test from "node:test";
import {
  amortizationSchedule,
  amortizationWithExtra,
  compoundInterest,
  creditCardPayoff,
  monthlyPayment,
  monthlySavingForGoal,
  payoffStrategy,
} from "./finance.ts";

test("monthlyPayment handles zero interest and standard amortization", () => {
  assert.equal(monthlyPayment(1200, 0, 12), 100);
  assert.ok(Math.abs(monthlyPayment(15000, 9.5, 48) - 376.84705006403937) < 0.000001);
});

test("monthlySavingForGoal reaches the target at zero and positive interest", () => {
  assert.equal(monthlySavingForGoal(1200, 0, 0, 12), 100);
  const monthly = monthlySavingForGoal(10000, 1000, 3, 24);
  let balance = 1000;
  for (let month = 0; month < 24; month += 1) balance = balance * (1 + 0.03 / 12) + monthly;
  assert.ok(Math.abs(balance - 10000) < 0.000001);
});

test("compound interest and amortization cover zero rates and extra payments", () => {
  const compound = compoundInterest(1000, 100, 0, 1);
  assert.equal(compound.at(-1)?.total, 2200);

  const schedule = amortizationSchedule(1200, 0, 12);
  assert.equal(schedule[0]?.cuota, 100);
  assert.equal(schedule.at(-1)?.saldo, 0);

  const withExtra = amortizationWithExtra(1200, 0, 12, 100);
  assert.equal(withExtra.months, 6);
  assert.equal(withExtra.totalInterest, 0);
});

test("creditCardPayoff returns a finite payoff and rejects payments below interest", () => {
  const payoff = creditCardPayoff(3500, 24, 200);
  assert.equal(payoff.feasible, true);
  assert.equal(payoff.months, 22);
  assert.ok(Math.abs(payoff.totalInterest - 851.132139956781) < 0.000001);

  assert.equal(creditCardPayoff(1000, 24, 10).feasible, false);
});

test("payoff strategies roll freed minimum payments into remaining debt", () => {
  const result = payoffStrategy(
    [
      { id: "small", name: "Small balance", balance: 100, rate: 0, minimum: 50 },
      { id: "large", name: "Large balance", balance: 1000, rate: 0, minimum: 50 },
    ],
    0,
    "snowball",
  );

  assert.equal(result.feasible, true);
  assert.equal(result.months, 11);
  assert.equal(result.totalInterest, 0);
  assert.deepEqual(result.order, ["Small balance", "Large balance"]);
});

test("payoff strategies apply minimums greater than a debt's last balance once", () => {
  const result = payoffStrategy(
    [
      { id: "small", name: "Small balance", balance: 10, rate: 0, minimum: 50 },
      { id: "large", name: "Large balance", balance: 100, rate: 0, minimum: 10 },
    ],
    0,
    "snowball",
  );

  assert.equal(result.feasible, true);
  assert.equal(result.months, 2);
});
