import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Field } from "@/components/calculators/Field";
import { CalcShell, ChartCard, ResultStat } from "@/components/calculators/Shared";
import { amortizationSchedule, monthlyPayment, monthsToText } from "@/lib/finance";
import { useCurrency } from "@/lib/currency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function LoanCalculator() {
  const { money, option } = useCurrency();
  const [amount, setAmount] = useState(15000);
  const [rate, setRate] = useState(9.5);
  const [months, setMonths] = useState(48);

  const { schedule, cuota, totalInteres } = useMemo(() => {
    const schedule = amortizationSchedule(amount, rate, months);
    const cuota = monthlyPayment(amount, rate, months);
    const totalInteres = schedule.reduce((acc, r) => acc + r.interes, 0);
    return { schedule, cuota, totalInteres };
  }, [amount, rate, months]);

  const yearly = useMemo(() => {
    const out: { periodo: string; capital: number; interes: number }[] = [];
    for (let i = 0; i < schedule.length; i += 12) {
      const chunk = schedule.slice(i, i + 12);
      out.push({
        periodo: `Año ${Math.floor(i / 12) + 1}`,
        capital: Math.round(chunk.reduce((a, r) => a + r.capital, 0)),
        interes: Math.round(chunk.reduce((a, r) => a + r.interes, 0)),
      });
    }
    return out;
  }, [schedule]);

  const split = [
    { name: "Capital", value: Math.round(amount) },
    { name: "Intereses", value: Math.round(totalInteres) },
  ];

  return (
    <CalcShell
      inputs={
        <>
          <Field
            id="amount"
            label="Monto del préstamo"
            value={amount}
            onChange={setAmount}
            min={500}
            max={150000}
            step={500}
            prefix={option.symbol}
          />
          <Field
            id="rate"
            label="Tasa anual (TIN)"
            value={rate}
            onChange={setRate}
            min={0}
            max={40}
            step={0.1}
            suffix="%"
          />
          <Field
            id="months"
            label="Plazo"
            value={months}
            onChange={setMonths}
            min={3}
            max={180}
            suffix="meses"
          />
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Cuota mensual" value={money(cuota, 2)} highlight sub={monthsToText(months)} />
        <ResultStat label="Total intereses" value={money(totalInteres)} accent />
        <ResultStat label="Total a pagar" value={money(amount + totalInteres)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <ChartCard title="Capital vs. interés por año">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearly} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="periodo" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
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
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="capital" name="Capital" stackId="a" fill="var(--color-chart-2)" radius={[0, 0, 0, 0]} animationDuration={700} />
              <Bar dataKey="interes" name="Interés" stackId="a" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} animationDuration={700} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Reparto del total pagado">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={split}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
                animationDuration={700}
              >
                <Cell fill="var(--color-chart-2)" />
                <Cell fill="var(--color-chart-1)" />
              </Pie>
              <Tooltip
                formatter={(v: number, name) => [money(v), name]}
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <h2 className="border-b border-border p-5 font-display text-base font-semibold">
          Tabla de amortización
        </h2>
        <div className="max-h-96 overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead>Mes</TableHead>
                <TableHead className="text-right">Cuota</TableHead>
                <TableHead className="text-right">Capital</TableHead>
                <TableHead className="text-right">Interés</TableHead>
                <TableHead className="text-right">Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((row) => (
                <TableRow key={row.mes}>
                  <TableCell className="font-medium">{row.mes}</TableCell>
                  <TableCell className="text-right">{money(row.cuota, 2)}</TableCell>
                  <TableCell className="text-right">{money(row.capital, 2)}</TableCell>
                  <TableCell className="text-right text-brand">{money(row.interes, 2)}</TableCell>
                  <TableCell className="text-right font-semibold">{money(row.saldo, 2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </CalcShell>
  );
}
