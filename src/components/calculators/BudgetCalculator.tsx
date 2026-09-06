import { useMemo, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Field } from "@/components/calculators/Field";
import { CalcShell, ChartCard, ResultStat } from "@/components/calculators/Shared";
import { useCurrency } from "@/lib/currency";

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function BudgetCalculator() {
  const { money, option } = useCurrency();
  const [income, setIncome] = useState(2500);
  const [vivienda, setVivienda] = useState(800);
  const [comida, setComida] = useState(400);
  const [transporte, setTransporte] = useState(180);
  const [deudas, setDeudas] = useState(250);
  const [otros, setOtros] = useState(300);

  const gastos = useMemo(
    () => [
      { name: "Vivienda", value: vivienda },
      { name: "Alimentación", value: comida },
      { name: "Transporte", value: transporte },
      { name: "Deudas", value: deudas },
      { name: "Otros", value: otros },
    ],
    [vivienda, comida, transporte, deudas, otros],
  );

  const totalGastos = gastos.reduce((a, g) => a + g.value, 0);
  const balance = income - totalGastos;
  const tasaAhorro = income > 0 ? (balance / income) * 100 : 0;

  return (
    <CalcShell
      inputs={
        <>
          <Field id="income" label="Ingresos mensuales netos" value={income} onChange={setIncome} min={0} max={20000} step={50} prefix={option.symbol} />
          <Field id="vivienda" label="Vivienda (alquiler/hipoteca)" value={vivienda} onChange={setVivienda} min={0} max={8000} step={25} prefix={option.symbol} />
          <Field id="comida" label="Alimentación" value={comida} onChange={setComida} min={0} max={3000} step={25} prefix={option.symbol} />
          <Field id="transporte" label="Transporte" value={transporte} onChange={setTransporte} min={0} max={2000} step={10} prefix={option.symbol} />
          <Field id="deudas" label="Pago de deudas" value={deudas} onChange={setDeudas} min={0} max={5000} step={25} prefix={option.symbol} />
          <Field id="otros" label="Otros gastos" value={otros} onChange={setOtros} min={0} max={5000} step={25} prefix={option.symbol} />
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Balance mensual" value={money(balance)} highlight sub={balance >= 0 ? "Te sobra dinero" : "Estás en números rojos"} />
        <ResultStat label="Total gastos" value={money(totalGastos)} accent />
        <ResultStat label="Tasa de ahorro" value={`${tasaAhorro.toFixed(1)}%`} sub="Un 20% o más es una buena señal" />
      </div>

      <ChartCard title="Reparto de tus gastos">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={gastos} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3} animationDuration={700}>
              {gastos.map((g, i) => (
                <Cell key={g.name} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v: number, name) => [money(v), name]}
              contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="font-display text-base font-semibold">Peso de cada gasto sobre tus ingresos</h2>
        <ul className="mt-4 space-y-3">
          {gastos.map((g, i) => {
            const pct = income > 0 ? (g.value / income) * 100 : 0;
            return (
              <li key={g.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{g.name}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {money(g.value)} · {pct.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(pct, 100)}%`, background: COLORS[i % COLORS.length] }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </CalcShell>
  );
}
