import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, TrendingDown } from "lucide-react";
import { Field } from "@/components/calculators/Field";
import { CalcShell, ChartCard, ResultStat } from "@/components/calculators/Shared";
import { creditCardPayoff, currency, monthsToText } from "@/lib/finance";

export function CreditCardCalculator() {
  const [balance, setBalance] = useState(3500);
  const [rate, setRate] = useState(24);
  const [payment, setPayment] = useState(200);

  const { plan, minimum, series } = useMemo(() => {
    const plan = creditCardPayoff(balance, rate, payment);
    const minimum = creditCardPayoff(balance, rate, 0);
    const maxMes = Math.max(
      plan.series[plan.series.length - 1]?.mes ?? 0,
      minimum.series[minimum.series.length - 1]?.mes ?? 0,
    );
    const byMonth = new Map<number, { mes: number; tuPago?: number; minimo?: number }>();
    for (let m = 0; m <= maxMes; m++) byMonth.set(m, { mes: m });
    plan.series.forEach((p) => {
      const row = byMonth.get(p.mes);
      if (row) row.tuPago = Math.round(p.saldo);
    });
    minimum.series.forEach((p) => {
      const row = byMonth.get(p.mes);
      if (row) row.minimo = Math.round(p.saldo);
    });
    const series = [...byMonth.values()].filter((r) => r.tuPago !== undefined || r.minimo !== undefined);
    return { plan, minimum, series };
  }, [balance, rate, payment]);

  const ahorro = minimum.totalInterest - plan.totalInterest;

  return (
    <CalcShell
      inputs={
        <>
          <Field
            id="balance"
            label="Saldo actual"
            value={balance}
            onChange={setBalance}
            min={100}
            max={50000}
            step={100}
            prefix={option.symbol}
          />
          <Field
            id="rate"
            label="Tasa anual (TAE)"
            value={rate}
            onChange={setRate}
            min={1}
            max={60}
            step={0.5}
            suffix="%"
          />
          <Field
            id="payment"
            label="Pago mensual fijo"
            value={payment}
            onChange={setPayment}
            min={10}
            max={5000}
            step={10}
            prefix={option.symbol}
          />
        </>
      }
    >
      {!plan.feasible ? (
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <div>
            <h2 className="font-display text-base font-semibold text-destructive">
              Tu pago no cubre los intereses
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Con este pago mensual la deuda nunca se salda: aumenta el importe para empezar a
              reducir el saldo.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <ResultStat
            label="Tiempo para saldar"
            value={monthsToText(plan.months)}
            highlight
            sub={`Pagando ${money(payment)} al mes`}
          />
          <ResultStat label="Intereses totales" value={money(plan.totalInterest)} accent />
          <ResultStat label="Coste total" value={money(plan.totalPaid)} />
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft card-hover">
          <h2 className="font-display text-base font-semibold">Solo pago mínimo</h2>
          <p className="mt-1 text-xs text-muted-foreground">2% del saldo (mínimo {money(25)}) + intereses</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tiempo</dt>
              <dd className="font-semibold tabular-nums">
                {minimum.feasible ? monthsToText(minimum.months) : "Nunca"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Intereses</dt>
              <dd className="font-semibold tabular-nums text-destructive">
                {money(minimum.totalInterest)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-brand/40 bg-brand-soft p-5 shadow-soft card-hover">
          <h2 className="flex items-center gap-2 font-display text-base font-semibold text-accent-foreground">
            <TrendingDown className="h-4 w-4" /> Con tu pago fijo
          </h2>
          <p className="mt-1 text-xs text-accent-foreground/80">{money(payment)} cada mes</p>
          <dl className="mt-4 space-y-2 text-sm text-accent-foreground">
            <div className="flex justify-between">
              <dt className="opacity-80">Tiempo</dt>
              <dd className="font-semibold tabular-nums">
                {plan.feasible ? monthsToText(plan.months) : "Nunca"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="opacity-80">Ahorro en intereses</dt>
              <dd className="font-semibold tabular-nums">
                {plan.feasible && ahorro > 0 ? money(ahorro) : "—"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <ChartCard title="Evolución del saldo: mínimo vs. tu pago">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              stroke="var(--color-muted-foreground)"
              tickFormatter={(v) => `${v}m`}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={62}
              fontSize={12}
              stroke="var(--color-muted-foreground)"
              tickFormatter={(v) => money(Number(v))}
            />
            <Tooltip
              formatter={(v: number, name) => [money(v), name]}
              labelFormatter={(l) => `Mes ${l}`}
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="minimo"
              name="Solo mínimo"
              stroke="var(--color-chart-5)"
              strokeWidth={2}
              dot={false}
              connectNulls
              animationDuration={700}
            />
            <Line
              type="monotone"
              dataKey="tuPago"
              name="Tu pago"
              stroke="var(--color-chart-1)"
              strokeWidth={2.5}
              dot={false}
              connectNulls
              animationDuration={700}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </CalcShell>
  );
}
