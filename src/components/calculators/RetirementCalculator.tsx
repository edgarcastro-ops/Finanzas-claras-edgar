import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Field } from "@/components/calculators/Field";
import { CalcShell, ChartCard, ResultStat } from "@/components/calculators/Shared";
import { retirementProjection, sustainableWithdrawal } from "@/lib/finance";
import { useCurrency } from "@/lib/currency";

export function RetirementCalculator() {
  const { money, option } = useCurrency();
  const [age, setAge] = useState(32);
  const [retireAge, setRetireAge] = useState(65);
  const [savings, setSavings] = useState(8000);
  const [monthly, setMonthly] = useState(250);
  const [rate, setRate] = useState(6);

  const result = useMemo(
    () => retirementProjection(age, Math.max(retireAge, age), savings, monthly, rate),
    [age, retireAge, savings, monthly, rate],
  );
  const renta = sustainableWithdrawal(result.final);

  return (
    <CalcShell
      inputs={
        <>
          <Field id="age" label="Edad actual" value={age} onChange={setAge} min={18} max={70} suffix="años" />
          <Field id="retireAge" label="Edad de retiro" value={retireAge} onChange={setRetireAge} min={40} max={80} suffix="años" />
          <Field id="savings" label="Ahorro acumulado" value={savings} onChange={setSavings} min={0} max={500000} step={500} prefix={option.symbol} />
          <Field id="monthly" label="Aporte mensual" value={monthly} onChange={setMonthly} min={0} max={5000} step={25} prefix={option.symbol} />
          <Field id="rate" label="Rendimiento anual estimado" value={rate} onChange={setRate} min={0} max={15} step={0.1} suffix="%" />
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Capital al retirarte" value={money(result.final)} highlight sub={`A los ${Math.max(retireAge, age)} años`} />
        <ResultStat label="Total aportado" value={money(result.aportado)} />
        <ResultStat label="Generado por rendimientos" value={money(result.intereses)} accent />
      </div>

      <div className="mt-4">
        <ResultStat
          label="Renta mensual estimada al retirarte"
          value={money(renta)}
          sub="Retirando un 4% anual de tu capital, una regla habitual de planificación"
        />
      </div>

      <ChartCard title="Crecimiento de tu fondo de retiro">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={result.series} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="gRet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.55} />
                <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="edad" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
            <YAxis tickLine={false} axisLine={false} width={62} fontSize={12} stroke="var(--color-muted-foreground)" tickFormatter={(v) => money(Number(v))} />
            <Tooltip
              formatter={(v: number, name) => [money(v), name === "total" ? "Capital" : "Aportado"]}
              labelFormatter={(l) => `${l} años`}
              contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
            />
            <Area type="monotone" dataKey="aportado" stroke="var(--color-chart-1)" fill="none" strokeWidth={2} animationDuration={700} />
            <Area type="monotone" dataKey="total" stroke="var(--color-chart-2)" fill="url(#gRet)" strokeWidth={2.5} animationDuration={700} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </CalcShell>
  );
}
