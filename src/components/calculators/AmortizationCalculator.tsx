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
import {
  amortizationWithExtra,
  monthlyPayment,
  monthsToText,
} from "@/lib/finance";
import { useCurrency } from "@/lib/currency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface AmortizationConfig {
  amountLabel: string;
  amountDefault: number;
  amountMin: number;
  amountMax: number;
  amountStep: number;
  rateLabel: string;
  rateDefault: number;
  rateMax: number;
  monthsLabel: string;
  monthsDefault: number;
  monthsMin: number;
  monthsMax: number;
  allowDownPayment?: boolean;
  downPaymentLabel?: string;
  downPaymentDefault?: number;
  allowExtra?: boolean;
  tableTitle?: string;
}

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  fontSize: 12,
};

export function AmortizationCalculator({ config }: { config: AmortizationConfig }) {
  const { money, option } = useCurrency();
  const [amount, setAmount] = useState(config.amountDefault);
  const [down, setDown] = useState(config.downPaymentDefault ?? 0);
  const [rate, setRate] = useState(config.rateDefault);
  const [months, setMonths] = useState(config.monthsDefault);
  const [extra, setExtra] = useState(0);

  const principal = Math.max(amount - (config.allowDownPayment ? down : 0), 0);

  const base = useMemo(
    () => amortizationWithExtra(principal, rate, months, 0),
    [principal, rate, months],
  );
  const withExtra = useMemo(
    () => amortizationWithExtra(principal, rate, months, config.allowExtra ? extra : 0),
    [principal, rate, months, extra, config.allowExtra],
  );

  const cuota = monthlyPayment(principal, rate, months);
  const ahorro = base.totalInterest - withExtra.totalInterest;
  const mesesMenos = base.months - withExtra.months;

  const yearly = useMemo(() => {
    const out: { periodo: string; capital: number; interes: number }[] = [];
    for (let i = 0; i < withExtra.rows.length; i += 12) {
      const chunk = withExtra.rows.slice(i, i + 12);
      out.push({
        periodo: `Año ${Math.floor(i / 12) + 1}`,
        capital: Math.round(chunk.reduce((a, r) => a + r.capital, 0)),
        interes: Math.round(chunk.reduce((a, r) => a + r.interes, 0)),
      });
    }
    return out;
  }, [withExtra]);

  const split = [
    { name: "Capital", value: Math.round(principal) },
    { name: "Intereses", value: Math.round(withExtra.totalInterest) },
  ];

  return (
    <CalcShell
      inputs={
        <>
          <Field
            id="amount"
            label={config.amountLabel}
            value={amount}
            onChange={setAmount}
            min={config.amountMin}
            max={config.amountMax}
            step={config.amountStep}
            prefix={option.symbol}
          />
          {config.allowDownPayment && (
            <Field
              id="down"
              label={config.downPaymentLabel ?? "Entrada / enganche"}
              value={down}
              onChange={setDown}
              min={0}
              max={config.amountMax}
              step={config.amountStep}
              prefix={option.symbol}
            />
          )}
          <Field
            id="rate"
            label={config.rateLabel}
            value={rate}
            onChange={setRate}
            min={0}
            max={config.rateMax}
            step={0.1}
            suffix="%"
          />
          <Field
            id="months"
            label={config.monthsLabel}
            value={months}
            onChange={setMonths}
            min={config.monthsMin}
            max={config.monthsMax}
            suffix="meses"
          />
          {config.allowExtra && (
            <Field
              id="extra"
              label="Abono extra a capital (mensual)"
              value={extra}
              onChange={setExtra}
              min={0}
              max={Math.max(Math.round(cuota * 3), 500)}
              step={25}
              prefix={option.symbol}
            />
          )}
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat
          label="Cuota mensual"
          value={money(cuota, 2)}
          highlight
          sub={monthsToText(months)}
        />
        <ResultStat label="Total intereses" value={money(withExtra.totalInterest)} accent />
        <ResultStat
          label="Total a pagar"
          value={money(principal + withExtra.totalInterest)}
          sub={`Importe financiado: ${money(principal)}`}
        />
      </div>

      {config.allowExtra && extra > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <ResultStat label="Ahorro en intereses" value={money(ahorro)} accent />
          <ResultStat
            label="Terminas antes"
            value={monthsToText(Math.max(mesesMenos, 0))}
            sub={`Nuevo plazo: ${monthsToText(withExtra.months)}`}
          />
        </div>
      )}

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
              <Tooltip formatter={(v: number, name) => [money(v), name]} contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="capital" name="Capital" stackId="a" fill="var(--color-chart-2)" animationDuration={700} />
              <Bar dataKey="interes" name="Interés" stackId="a" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} animationDuration={700} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Reparto del total pagado">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={split} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3} animationDuration={700}>
                <Cell fill="var(--color-chart-2)" />
                <Cell fill="var(--color-chart-1)" />
              </Pie>
              <Tooltip formatter={(v: number, name) => [money(v), name]} contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <h2 className="border-b border-border p-5 font-display text-base font-semibold">
          {config.tableTitle ?? "Tabla de amortización"}
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
              {withExtra.rows.map((row) => (
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
