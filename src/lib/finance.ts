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
