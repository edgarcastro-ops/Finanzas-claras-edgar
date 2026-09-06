import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Field } from "@/components/calculators/Field";
import { CalcShell, ChartCard, ResultStat } from "@/components/calculators/Shared";
import { monthlyPayment, monthsToText } from "@/lib/finance";
import { useCurrency } from "@/lib/currency";

export function RefinanceCalculator() {
  const { money, option } = useCurrency();
  const [balance, setBalance] = useState(18000);
  const [currentRate, setCurrentRate] = useState(16);
  const [currentMonths, setCurrentMonths] = useState(36);
  const [newRate, setNewRate] = useState(10);
  const [newMonths, setNewMonths] = useState(48);
  const [costs, setCosts] = useState(300);

  const actual = useMemo(() => {
    const cuota = monthlyPayment(balance, currentRate, currentMonths);
    return { cuota, total: cuota * currentMonths, intereses: cuota * currentMonths - balance };
  }, [balance, currentRate, currentMonths]);

  const nuevo = useMemo(() => {
    const cuota = monthlyPayment(balance + costs, newRate, newMonths);
    return {
      cuota,
      total: cuota * newMonths,
      intereses: cuota * newMonths - balance - costs,
    };
  }, [balance, newRate, newMonths, costs]);

  const ahorroCuota = actual.cuota - nuevo.cuota;
  const ahorroTotal = actual.total - nuevo.total;

  const data = [
    { name: "Préstamo actual", Capital: Math.round(balance), Intereses: Math.round(actual.intereses) },
    { name: "Refinanciamiento", Capital: Math.round(balance + costs), Intereses: Math.round(nuevo.intereses) },
  ];

  return (
    <CalcShell
      inputs={
        <>
          <Field id="balance" label="Saldo pendiente actual" value={balance} onChange={setBalance} min={500} max={500000} step={500} prefix={option.symbol} />
          <Field id="cRate" label="Tasa actual" value={currentRate} onChange={setCurrentRate} min={0} max={60} step={0.1} suffix="%" />
          <Field id="cMonths" label="Meses que te quedan" value={currentMonths} onChange={setCurrentMonths} min={1} max={360} suffix="meses" />
          <Field id="nRate" label="Tasa del nuevo préstamo" value={newRate} onChange={setNewRate} min={0} max={60} step={0.1} suffix="%" />
          <Field id="nMonths" label="Plazo del nuevo préstamo" value={newMonths} onChange={setNewMonths} min={1} max={360} suffix="meses" />
          <Field id="costs" label="Comisiones y gastos" value={costs} onChange={setCosts} min={0} max={20000} step={50} prefix={option.symbol} />
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat
          label={ahorroTotal >= 0 ? "Ahorro total con el cambio" : "Coste extra del cambio"}
          value={money(Math.abs(ahorroTotal))}
          highlight
          sub={ahorroTotal >= 0 ? "Refinanciar te conviene" : "Refinanciar te sale más caro"}
        />
        <ResultStat label="Diferencia de cuota" value={money(Math.abs(ahorroCuota), 2)} accent sub={ahorroCuota >= 0 ? "Pagas menos cada mes" : "Pagas más cada mes"} />
        <ResultStat label="Nueva cuota mensual" value={money(nuevo.cuota, 2)} sub={`Antes: ${money(actual.cuota, 2)}`} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h3 className="font-display text-base font-semibold">Préstamo actual</h3>
          <p className="mt-3 text-sm text-muted-foreground">Cuota: <span className="font-semibold text-foreground">{money(actual.cuota, 2)}</span></p>
          <p className="mt-1 text-sm text-muted-foreground">Intereses restantes: <span className="font-semibold text-brand">{money(actual.intereses)}</span></p>
          <p className="mt-1 text-sm text-muted-foreground">Total a pagar: {money(actual.total)}</p>
          <p className="mt-1 text-sm text-muted-foreground">Plazo: {monthsToText(currentMonths)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h3 className="font-display text-base font-semibold">Nuevo préstamo</h3>
          <p className="mt-3 text-sm text-muted-foreground">Cuota: <span className="font-semibold text-foreground">{money(nuevo.cuota, 2)}</span></p>
          <p className="mt-1 text-sm text-muted-foreground">Intereses: <span className="font-semibold text-brand">{money(nuevo.intereses)}</span></p>
          <p className="mt-1 text-sm text-muted-foreground">Total a pagar: {money(nuevo.total)}</p>
          <p className="mt-1 text-sm text-muted-foreground">Plazo: {monthsToText(newMonths)}</p>
        </div>
      </div>

      <ChartCard title="Coste total comparado">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
            <YAxis tickLine={false} axisLine={false} width={62} fontSize={12} stroke="var(--color-muted-foreground)" tickFormatter={(v) => money(Number(v))} />
            <Tooltip formatter={(v: number, name) => [money(v), name]} contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Capital" stackId="a" fill="var(--color-chart-2)" animationDuration={700} />
            <Bar dataKey="Intereses" stackId="a" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} animationDuration={700} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </CalcShell>
  );
}
