import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Field } from "@/components/calculators/Field";
import { CalcShell, ChartCard, ResultStat } from "@/components/calculators/Shared";
import { monthlySavingForGoal, monthsToText, savingSeries } from "@/lib/finance";
import { useCurrency } from "@/lib/currency";

export function SavingsGoalCalculator() {
  const { money, option } = useCurrency();
  const [goal, setGoal] = useState(10000);
  const [initial, setInitial] = useState(1000);
  const [months, setMonths] = useState(24);
  const [rate, setRate] = useState(3);

  const monthly = useMemo(
    () => monthlySavingForGoal(goal, initial, rate, months),
    [goal, initial, rate, months],
  );
  const series = useMemo(
    () => savingSeries(initial, monthly, rate, months),
    [initial, monthly, rate, months],
  );
  const aportado = initial + monthly * months;

  return (
    <CalcShell
      inputs={
        <>
          <Field id="goal" label="Meta de ahorro" value={goal} onChange={setGoal} min={100} max={200000} step={100} prefix={option.symbol} />
          <Field id="initial" label="Ya tengo ahorrado" value={initial} onChange={setInitial} min={0} max={200000} step={100} prefix={option.symbol} />
          <Field id="months" label="Plazo" value={months} onChange={setMonths} min={1} max={240} suffix="meses" />
          <Field id="rate" label="Rendimiento anual" value={rate} onChange={setRate} min={0} max={15} step={0.1} suffix="%" />
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Ahorro mensual necesario" value={money(monthly, 2)} highlight sub={monthsToText(months)} />
        <ResultStat label="Total que aportarás" value={money(aportado)} />
        <ResultStat label="Intereses ganados" value={money(Math.max(goal - aportado, 0))} accent />
      </div>

      <ChartCard title="Camino hacia tu meta">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="gGoal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.55} />
                <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="mes" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
            <YAxis tickLine={false} axisLine={false} width={62} fontSize={12} stroke="var(--color-muted-foreground)" tickFormatter={(v) => money(Number(v))} />
            <Tooltip
              formatter={(v: number, name) => [money(v), name === "total" ? "Saldo" : "Aportado"]}
              labelFormatter={(l) => `Mes ${l}`}
              contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
            />
            <Area type="monotone" dataKey="aportado" stroke="var(--color-chart-1)" fill="none" strokeWidth={2} animationDuration={700} />
            <Area type="monotone" dataKey="total" stroke="var(--color-chart-2)" fill="url(#gGoal)" strokeWidth={2.5} animationDuration={700} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </CalcShell>
  );
}
