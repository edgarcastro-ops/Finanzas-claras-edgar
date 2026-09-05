export const percent = (value: number) => `${value.toLocaleString("es-ES", { maximumFractionDigits: 2 })}%`;

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
  const r = annualRate / 100 / 12;
  const rows: CompoundYear[] = [];
  let balance = initial;
  let contributed = initial;

  rows.push({ year: 0, aportado: initial, intereses: 0, total: initial });

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthly;
      contributed += monthly;
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
  const r = annualRate / 100 / 12;
  if (months <= 0) return 0;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

export function amortizationSchedule(
  principal: number,
  annualRate: number,
  months: number,
): AmortRow[] {
  const r = annualRate / 100 / 12;
  const cuota = monthlyPayment(principal, annualRate, months);
  const rows: AmortRow[] = [];
  let saldo = principal;
  let capitalAcum = 0;
  let interesAcum = 0;

  for (let m = 1; m <= months; m++) {
    const interes = saldo * r;
    const capital = Math.min(cuota - interes, saldo);
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
  const r = annualRate / 100 / 12;
  let saldo = balance;
  let totalInterest = 0;
  let months = 0;
  const series: { mes: number; saldo: number }[] = [{ mes: 0, saldo: balance }];
  const isMinimum = payment <= 0;

  if (!isMinimum && payment <= balance * r) {
    return { months: 0, totalInterest: 0, totalPaid: 0, feasible: false, series };
  }

  while (saldo > 0.01 && months < 1200) {
    const interes = saldo * r;
    const pago = isMinimum
      ? Math.max(Math.min(saldo + interes, minFloor), saldo * minPercent + interes)
      : Math.min(payment, saldo + interes);
    if (pago <= interes) return { months: 0, totalInterest: 0, totalPaid: 0, feasible: false, series };
    totalInterest += interes;
    saldo = saldo + interes - pago;
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
  const r = annualRate / 100 / 12;
  const cuota = monthlyPayment(principal, annualRate, months);
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
  const list = debts
    .filter((d) => d.balance > 0)
    .map((d) => ({ ...d, saldo: d.balance }));
  const totalStart = list.reduce((a, d) => a + d.saldo, 0);
  const series: { mes: number; saldo: number }[] = [{ mes: 0, saldo: Math.round(totalStart) }];
  const order: string[] = [];
  let totalInterest = 0;
  let months = 0;

  while (list.some((d) => d.saldo > 0.01) && months < 600) {
    months += 1;
    let pool = extra;
    // intereses + mínimos
    for (const d of list) {
      if (d.saldo <= 0.01) continue;
      const interes = (d.saldo * d.rate) / 100 / 12;
      d.saldo += interes;
      totalInterest += interes;
    }
    const actives = list.filter((d) => d.saldo > 0.01);
    for (const d of actives) {
      const pago = Math.min(d.minimum, d.saldo);
      d.saldo -= pago;
      if (d.saldo <= 0.01 && !order.includes(d.name)) order.push(d.name);
    }
    const targets = list
      .filter((d) => d.saldo > 0.01)
      .sort((a, b) => (method === "snowball" ? a.saldo - b.saldo : b.rate - a.rate));
    for (const d of targets) {
      if (pool <= 0) break;
      const pago = Math.min(pool, d.saldo);
      d.saldo -= pago;
      pool -= pago;
      if (d.saldo <= 0.01 && !order.includes(d.name)) order.push(d.name);
    }
    const restante = list.reduce((a, d) => a + Math.max(d.saldo, 0), 0);
    series.push({ mes: months, saldo: Math.round(restante) });
  }

  return {
    months,
    totalInterest,
    totalPaid: totalStart + totalInterest,
    feasible: months < 600,
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
  if (months <= 0) return 0;
  const r = annualRate / 100 / 12;
  const futureInitial = initial * Math.pow(1 + r, months);
  const remaining = Math.max(goal - futureInitial, 0);
  if (r === 0) return remaining / months;
  return (remaining * r) / (Math.pow(1 + r, months) - 1);
}

export function savingSeries(
  initial: number,
  monthly: number,
  annualRate: number,
  months: number,
) {
  const r = annualRate / 100 / 12;
  let balance = initial;
  let aportado = initial;
  const out = [{ mes: 0, aportado: Math.round(initial), total: Math.round(initial) }];
  for (let m = 1; m <= months; m++) {
    balance = balance * (1 + r) + monthly;
    aportado += monthly;
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
  const r = annualReturn / 100 / 12;
  let balance = currentSavings;
  let aportado = currentSavings;
  const series = [{ edad: currentAge, total: Math.round(balance), aportado: Math.round(aportado) }];
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthly;
      aportado += monthly;
    }
    series.push({ edad: currentAge + y, total: Math.round(balance), aportado: Math.round(aportado) });
  }
  return { series, final: balance, aportado, intereses: balance - aportado };
}

export function sustainableWithdrawal(capital: number, rate = 4) {
  return (capital * rate) / 100 / 12;
}
