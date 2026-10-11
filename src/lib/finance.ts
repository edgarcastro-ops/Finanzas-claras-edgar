export const percent = (value: number) =>
  `${(Number.isFinite(value) ? value : 0).toLocaleString("es-ES", { maximumFractionDigits: 2 })}%`;

const MAX_SIMULATION_MONTHS = 1200;
const MAX_STRATEGY_MONTHS = 600;

function validNonNegative(...values: number[]) {
  return values.every((value) => Number.isFinite(value) && value >= 0);
}

function validTerm(value: number, maximum = MAX_SIMULATION_MONTHS) {
  return Number.isInteger(value) && value > 0 && value <= maximum;
}

/* ---------------- Interés compuesto ---------------- */

export interface CompoundYear {
  year: number;
  aportado: number;
  intereses: number;
  total: number;
}

export function compoundInterest(
  initial: number,
  monthly: number,
  annualRate: number,
  years: number,
): CompoundYear[] {
  if (
    !validNonNegative(initial, monthly, annualRate, years) ||
    years <= 0 ||
    years > MAX_SIMULATION_MONTHS
  ) {
    return [];
  }

  const r = annualRate / 100 / 12;
  const rows: CompoundYear[] = [];
  let balance = initial;
  let contributed = initial;

  rows.push({ year: 0, aportado: initial, intereses: 0, total: initial });

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthly;
      contributed += monthly;
      if (!validNonNegative(balance, contributed)) return [];
    }
    rows.push({
      year: y,
      aportado: Math.round(contributed),
      intereses: Math.round(balance - contributed),
      total: Math.round(balance),
    });
  }
  return rows;
}

/* ---------------- Préstamo personal ---------------- */

export interface AmortRow {
  mes: number;
  cuota: number;
  capital: number;
  interes: number;
  saldo: number;
  capitalAcum: number;
  interesAcum: number;
}

export function monthlyPayment(principal: number, annualRate: number, months: number) {
  if (!validNonNegative(principal, annualRate) || !validTerm(months)) return 0;

  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  const payment = (principal * r) / (1 - Math.pow(1 + r, -months));
  return Number.isFinite(payment) && payment >= 0 ? payment : 0;
}

export function amortizationSchedule(
  principal: number,
  annualRate: number,
  months: number,
): AmortRow[] {
  if (!validNonNegative(principal, annualRate) || !validTerm(months)) return [];

  const r = annualRate / 100 / 12;
  const cuota = monthlyPayment(principal, annualRate, months);
  if (principal > 0 && cuota === 0) return [];
  const rows: AmortRow[] = [];
  let saldo = principal;
  let capitalAcum = 0;
  let interesAcum = 0;

  for (let m = 1; m <= months; m++) {
    const interes = saldo * r;
    const capital = Math.min(cuota - interes, saldo);
    if (!validNonNegative(interes, capital)) return [];
    saldo = Math.max(saldo - capital, 0);
    capitalAcum += capital;
    interesAcum += interes;
    rows.push({ mes: m, cuota, capital, interes, saldo, capitalAcum, interesAcum });
  }
  return rows;
}

/* ---------------- Tarjeta de crédito ---------------- */

export interface CardPayoff {
  months: number;
  totalInterest: number;
  totalPaid: number;
  feasible: boolean;
  series: { mes: number; saldo: number }[];
}

export function creditCardPayoff(
  balance: number,
  annualRate: number,
  payment: number,
  minPercent = 0.02,
  minFloor = 25,
): CardPayoff {
  const emptyResult: CardPayoff = {
    months: 0,
    totalInterest: 0,
    totalPaid: 0,
    feasible: false,
    series: [],
  };
  if (!validNonNegative(balance, annualRate, payment, minPercent, minFloor)) return emptyResult;

  const r = annualRate / 100 / 12;
  let saldo = balance;
  let totalInterest = 0;
  let months = 0;
  const series: { mes: number; saldo: number }[] = [{ mes: 0, saldo: balance }];
  const isMinimum = payment === 0;

  if (balance === 0) return { ...emptyResult, feasible: true, series };

  if (!isMinimum && payment <= balance * r) {
    return { ...emptyResult, series };
  }

  while (saldo > 0.01 && months < 1200) {
    const interes = saldo * r;
    const pago = isMinimum
      ? Math.max(Math.min(saldo + interes, minFloor), saldo * minPercent + interes)
      : Math.min(payment, saldo + interes);
    if (!validNonNegative(interes, pago) || pago <= interes) return emptyResult;
    totalInterest += interes;
    saldo = saldo + interes - pago;
    if (!validNonNegative(totalInterest, saldo)) return emptyResult;
    months += 1;
    if (months % 3 === 0 || saldo <= 0.01) series.push({ mes: months, saldo: Math.max(saldo, 0) });
  }

  return {
    months,
    totalInterest,
    totalPaid: balance + totalInterest,
    feasible: months < 1200,
    series,
  };
}

export const monthsToText = (months: number) => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} ${m === 1 ? "mes" : "meses"}`;
  if (m === 0) return `${y} ${y === 1 ? "año" : "años"}`;
  return `${y} ${y === 1 ? "año" : "años"} y ${m} ${m === 1 ? "mes" : "meses"}`;
};

/* ---------------- Amortización con abonos extra ---------------- */

export interface ExtraResult {
  rows: AmortRow[];
  cuota: number;
  months: number;
  totalInterest: number;
  totalPaid: number;
}

export function amortizationWithExtra(
  principal: number,
  annualRate: number,
  months: number,
  extraMonthly = 0,
  lumpSum = 0,
  lumpMonth = 12,
): ExtraResult {
  const emptyResult: ExtraResult = {
    rows: [],
    cuota: 0,
    months: 0,
    totalInterest: 0,
    totalPaid: 0,
  };
  if (
    !validNonNegative(principal, annualRate, extraMonthly, lumpSum, lumpMonth) ||
    !validTerm(months)
  ) {
    return emptyResult;
  }

  const r = annualRate / 100 / 12;
  const cuota = monthlyPayment(principal, annualRate, months);
  if (principal > 0 && cuota === 0) return emptyResult;
  const rows: AmortRow[] = [];
  let saldo = principal;
  let capitalAcum = 0;
  let interesAcum = 0;
  let m = 0;

  while (saldo > 0.01 && m < 1200) {
    m += 1;
    const interes = saldo * r;
    let capital = cuota - interes + Math.max(extraMonthly, 0);
    if (lumpSum > 0 && m === Math.max(1, Math.round(lumpMonth))) capital += lumpSum;
    capital = Math.min(capital, saldo);
    if (!validNonNegative(interes, capital)) return emptyResult;
    if (capital <= 0) break;
    saldo = Math.max(saldo - capital, 0);
    capitalAcum += capital;
    interesAcum += interes;
    rows.push({ mes: m, cuota: capital + interes, capital, interes, saldo, capitalAcum, interesAcum });
  }

  return {
    rows,
    cuota,
    months: m,
    totalInterest: interesAcum,
    totalPaid: principal + interesAcum,
  };
}

/* ---------------- Deudas: bola de nieve vs avalancha ---------------- */

export interface DebtInput {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minimum: number;
}

export interface StrategyResult {
  months: number;
  totalInterest: number;
  totalPaid: number;
  feasible: boolean;
  order: string[];
  series: { mes: number; saldo: number }[];
}

export function payoffStrategy(
  debts: DebtInput[],
  extra: number,
  method: "snowball" | "avalanche",
): StrategyResult {
  const emptyResult: StrategyResult = {
    months: 0,
    totalInterest: 0,
    totalPaid: 0,
    feasible: false,
    order: [],
    series: [],
  };
  if (
    !Array.isArray(debts) ||
    !validNonNegative(extra) ||
    (method !== "snowball" && method !== "avalanche") ||
    debts.some((debt) => !validNonNegative(debt.balance, debt.rate, debt.minimum))
  ) {
    return emptyResult;
  }

  const list = debts
    .filter((d) => d.balance > 0)
    .map((d) => ({ ...d, saldo: d.balance }));
  const totalStart = list.reduce((a, d) => a + d.saldo, 0);
  const totalBudget = list.reduce((total, debt) => total + debt.minimum, 0) + extra;
  if (!validNonNegative(totalStart, totalBudget)) return emptyResult;

  const series: { mes: number; saldo: number }[] = [{ mes: 0, saldo: Math.round(totalStart) }];
  const order: string[] = [];
  let totalInterest = 0;
  let months = 0;

  while (list.some((d) => d.saldo > 0.01) && months < MAX_STRATEGY_MONTHS) {
    months += 1;
    for (const d of list) {
      if (d.saldo <= 0.01) continue;
      const interes = (d.saldo * d.rate) / 100 / 12;
      d.saldo += interes;
      totalInterest += interes;
      if (!validNonNegative(d.saldo, totalInterest)) return emptyResult;
    }

    const actives = list.filter((d) => d.saldo > 0.01);
    let paidMinimums = 0;
    for (const d of actives) {
      const pago = Math.min(d.minimum, d.saldo);
      d.saldo -= pago;
      paidMinimums += pago;
      if (d.saldo <= 0.01) {
        if (!order.includes(d.name)) order.push(d.name);
      }
    }
    let pool = Math.max(totalBudget - paidMinimums, 0);

    const targets = list
      .filter((d) => d.saldo > 0.01)
      .sort((a, b) => (method === "snowball" ? a.saldo - b.saldo : b.rate - a.rate));
    for (const d of targets) {
      if (pool <= 0) break;
      const pago = Math.min(pool, d.saldo);
      d.saldo -= pago;
      pool -= pago;
      if (d.saldo <= 0.01) {
        if (!order.includes(d.name)) order.push(d.name);
      }
    }
    const restante = list.reduce((a, d) => a + Math.max(d.saldo, 0), 0);
    if (!validNonNegative(pool, restante, totalInterest)) return emptyResult;
    series.push({ mes: months, saldo: Math.round(restante) });
  }

  return {
    months,
    totalInterest,
    totalPaid: totalStart + totalInterest,
    feasible: list.every((d) => d.saldo <= 0.01),
    order,
    series,
  };
}

/* ---------------- Ahorro con meta ---------------- */

export function monthlySavingForGoal(
  goal: number,
  initial: number,
  annualRate: number,
  months: number,
): number {
  if (!validNonNegative(goal, initial, annualRate) || !validTerm(months)) return 0;

  const r = annualRate / 100 / 12;
  const futureInitial = initial * Math.pow(1 + r, months);
  if (!Number.isFinite(futureInitial)) return 0;
  const remaining = Math.max(goal - futureInitial, 0);
  if (r === 0) return remaining / months;
  const monthly = (remaining * r) / (Math.pow(1 + r, months) - 1);
  return Number.isFinite(monthly) && monthly >= 0 ? monthly : 0;
}

export function savingSeries(
  initial: number,
  monthly: number,
  annualRate: number,
  months: number,
) {
  if (!validNonNegative(initial, monthly, annualRate) || !validTerm(months)) return [];

  const r = annualRate / 100 / 12;
  let balance = initial;
  let aportado = initial;
  const out = [{ mes: 0, aportado: Math.round(initial), total: Math.round(initial) }];
  for (let m = 1; m <= months; m++) {
    balance = balance * (1 + r) + monthly;
    aportado += monthly;
    if (!validNonNegative(balance, aportado)) return [];
    if (m % Math.max(1, Math.round(months / 24)) === 0 || m === months) {
      out.push({ mes: m, aportado: Math.round(aportado), total: Math.round(balance) });
    }
  }
  return out;
}

/* ---------------- Jubilación ---------------- */

export function retirementProjection(
  currentAge: number,
  retireAge: number,
  currentSavings: number,
  monthly: number,
  annualReturn: number,
) {
  const years = Math.max(retireAge - currentAge, 0);
  if (
    !validNonNegative(currentAge, retireAge, currentSavings, monthly, annualReturn) ||
    years <= 0 ||
    years > MAX_SIMULATION_MONTHS
  ) {
    return { series: [], final: 0, aportado: 0, intereses: 0 };
  }

  const r = annualReturn / 100 / 12;
  let balance = currentSavings;
  let aportado = currentSavings;
  const series = [{ edad: currentAge, total: Math.round(balance), aportado: Math.round(aportado) }];
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthly;
      aportado += monthly;
      if (!validNonNegative(balance, aportado)) {
        return { series: [], final: 0, aportado: 0, intereses: 0 };
      }
    }
    series.push({ edad: currentAge + y, total: Math.round(balance), aportado: Math.round(aportado) });
  }
  return { series, final: balance, aportado, intereses: balance - aportado };
}

export function sustainableWithdrawal(capital: number, rate = 4) {
  if (!validNonNegative(capital, rate)) return 0;
  return (capital * rate) / 100 / 12;
}
