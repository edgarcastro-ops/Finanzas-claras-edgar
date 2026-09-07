import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Field } from "@/components/calculators/Field";
import { CalcShell, ChartCard, ResultStat } from "@/components/calculators/Shared";
import { amortizationWithExtra, monthsToText } from "@/lib/finance";
import { useCurrency } from "@/lib/currency";

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  fontSize: 12,
};

export function PrepaymentCalculator() {
  const { money, option } = useCurrency();
  const [amount, setAmount] = useState(80000);
  const [rate, setRate] = useState(7);
  const [months, setMonths] = useState(240);
  const [extra, setExtra] = useState(150);
  const [lump, setLump] = useState(3000);
  const [lumpMonth, setLumpMonth] = useState(12);

  const base = useMemo(() => amortizationWithExtra(amount, rate, months, 0), [amount, rate, months]);
  const fast = useMemo(
    () => amortizationWithExtra(amount, rate, months, extra, lump, lumpMonth),
    [amount, rate, months, extra, lump, lumpMonth],
  );

  const series = useMemo(() => {
    const len = Math.max(base.rows.length, fast.rows.length);
    const out: { mes: number; sinAbono: number; conAbono: number }[] = [];
    for (let i = 0; i < len; i += 1) {
      out.push({
        mes: i + 1,
        sinAbono: Math.round(base.rows[i]?.saldo ?? 0),
        conAbono: Math.round(fast.rows[i]?.saldo ?? 0),
      });
    }
    return out;
  }, [base, fast]);

  const ahorro = base.totalInterest - fast.totalInterest;
  const mesesMenos = base.months - fast.months;

  return (
    <CalcShell
      inputs={
        <>
          <Field id="amount" label="Saldo pendiente del préstamo" value={amount} onChange={setAmount} min={500} max={800000} step={500} prefix={option.symbol} />
          <Field id="rate" label="Tasa de interés anual" value={rate} onChange={setRate} min={0} max={60} step={0.1} suffix="%" />
          <Field id="months" label="Plazo restante" value={months} onChange={setMonths} min={6} max={480} suffix="meses" />
          <Field id="extra" label="Abono extra mensual" value={extra} onChange={setExtra} min={0} max={5000} step={25} prefix={option.symbol} />
          <Field id="lump" label="Abono único (una sola vez)" value={lump} onChange={setLump} min={0} max={200000} step={250} prefix={option.symbol} />
          <Field id="lumpMonth" label="Mes del abono único" value={lumpMonth} onChange={setLumpMonth} min={1} max={Math.max(months, 1)} suffix="mes" />
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Ahorro en intereses" value={money(Math.max(ahorro, 0))} highlight sub="Frente a pagar solo la cuota" />
        <ResultStat label="Terminas antes" value={monthsToText(Math.max(mesesMenos, 0))} accent sub={`Nuevo plazo: ${monthsToText(fast.months)}`} />
        <ResultStat label="Cuota mensual base" value={money(base.cuota, 2)} sub={`Con abono: ${money(base.cuota + extra, 2)}`} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ResultStat label="Intereses sin abonos" value={money(base.totalInterest)} sub={monthsToText(base.months)} />
        <ResultStat label="Intereses con abonos" value={money(fast.totalInterest)} sub={monthsToText(fast.months)} />
      </div>

      <ChartCard title="Evolución del saldo pendiente">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="gPrepay" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.55} />
                <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="mes" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
            <YAxis tickLine={false} axisLine={false} width={62} fontSize={12} stroke="var(--color-muted-foreground)" tickFormatter={(v) => money(Number(v))} />
            <Tooltip formatter={(v: number, name) => [money(v), name === "conAbono" ? "Con abonos" : "Sin abonos"]} labelFormatter={(l) => `Mes ${l}`} contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} formatter={(v) => (v === "conAbono" ? "Con abonos" : "Sin abonos")} />
            <Area type="monotone" dataKey="sinAbono" stroke="var(--color-chart-1)" fill="none" strokeWidth={2} animationDuration={700} />
            <Area type="monotone" dataKey="conAbono" stroke="var(--color-chart-2)" fill="url(#gPrepay)" strokeWidth={2.5} animationDuration={700} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </CalcShell>
  );
}
