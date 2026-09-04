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
import { ResultStat, CalcShell, ChartCard } from "@/components/calculators/Shared";
import { compoundInterest, currency } from "@/lib/finance";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CompoundCalculator() {
  const [initial, setInitial] = useState(2000);
  const [monthly, setMonthly] = useState(200);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(20);

  const rows = useMemo(
    () => compoundInterest(initial, monthly, rate, years),
    [initial, monthly, rate, years],
  );
  const last = rows[rows.length - 1]!;

  return (
    <CalcShell
      inputs={
        <>
          <Field
            id="initial"
            label="Monto inicial"
            value={initial}
            onChange={setInitial}
            min={0}
            max={100000}
            step={100}
            prefix="$"
          />
          <Field
            id="monthly"
            label="Aporte mensual"
            value={monthly}
            onChange={setMonthly}
            min={0}
            max={3000}
            step={25}
            prefix="$"
          />
          <Field
            id="rate"
            label="Tasa anual estimada"
            value={rate}
            onChange={setRate}
            min={0}
            max={20}
            step={0.1}
            suffix="%"
          />
          <Field
            id="years"
            label="Plazo"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            suffix="años"
          />
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Valor final" value={currency(last.total)} highlight />
        <ResultStat label="Total aportado" value={currency(last.aportado)} />
        <ResultStat label="Intereses generados" value={currency(last.intereses)} accent />
      </div>

      <ChartCard title="Crecimiento de tu inversión">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={rows} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="gApor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.55} />
                <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gTot" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.55} />
                <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}a`}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={62}
              tickFormatter={(v) => currency(Number(v))}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip
              formatter={(v: number, name) => [currency(v), name]}
              labelFormatter={(l) => `Año ${l}`}
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="total"
              name="Total"
              stroke="var(--color-chart-1)"
              fill="url(#gTot)"
              strokeWidth={2.5}
              animationDuration={800}
            />
            <Area
              type="monotone"
              dataKey="aportado"
              name="Aportado"
              stroke="var(--color-chart-2)"
              fill="url(#gApor)"
              strokeWidth={2}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <div className="max-h-80 overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead>Año</TableHead>
                <TableHead className="text-right">Aportado</TableHead>
                <TableHead className="text-right">Intereses</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.slice(1).map((row) => (
                <TableRow key={row.year}>
                  <TableCell className="font-medium">{row.year}</TableCell>
                  <TableCell className="text-right">{currency(row.aportado)}</TableCell>
                  <TableCell className="text-right text-brand">{currency(row.intereses)}</TableCell>
                  <TableCell className="text-right font-semibold">{currency(row.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </CalcShell>
  );
}
