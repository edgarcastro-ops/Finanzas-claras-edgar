import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Field } from "@/components/calculators/Field";
import { CalcShell, ChartCard, ResultStat } from "@/components/calculators/Shared";
import { monthlyPayment, monthsToText } from "@/lib/finance";
import { useCurrency } from "@/lib/currency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  fontSize: 12,
};

interface Offer {
  nombre: string;
  monto: number;
  tasa: number;
  meses: number;
  comision: number;
}

const initial: Offer[] = [
  { nombre: "Oferta A", monto: 10000, tasa: 12, meses: 48, comision: 1 },
  { nombre: "Oferta B", monto: 10000, tasa: 9.5, meses: 60, comision: 2 },
  { nombre: "Oferta C", monto: 10000, tasa: 14, meses: 36, comision: 0 },
];

export function LoanComparisonCalculator() {
  const { money, option } = useCurrency();
  const [offers, setOffers] = useState<Offer[]>(initial);

  const update = (i: number, patch: Partial<Offer>) =>
    setOffers((prev) => prev.map((o, idx) => (idx === i ? { ...o, ...patch } : o)));

  const rows = useMemo(
    () =>
      offers.map((o) => {
        const cuota = monthlyPayment(o.monto, o.tasa, o.meses);
        const totalPagado = cuota * o.meses;
        const comisionImporte = (o.monto * o.comision) / 100;
        const intereses = totalPagado - o.monto;
        return {
          ...o,
          cuota,
          intereses,
          comisionImporte,
          costeTotal: intereses + comisionImporte,
          total: totalPagado + comisionImporte,
        };
      }),
    [offers],
  );

  const mejor = rows.reduce((best, r) => (r.costeTotal < best.costeTotal ? r : best), rows[0]);
  const peor = rows.reduce((worst, r) => (r.costeTotal > worst.costeTotal ? r : worst), rows[0]);

  return (
    <CalcShell
      inputs={
        <div className="space-y-8">
          {offers.map((o, i) => (
            <div key={o.nombre} className="space-y-4 border-t border-border pt-5 first:border-0 first:pt-0">
              <p className="font-display text-sm font-semibold text-brand">{o.nombre}</p>
              <Field id={`monto-${i}`} label="Importe" value={o.monto} onChange={(v) => update(i, { monto: v })} min={500} max={200000} step={500} prefix={option.symbol} />
              <Field id={`tasa-${i}`} label="Tasa anual" value={o.tasa} onChange={(v) => update(i, { tasa: v })} min={0} max={80} step={0.1} suffix="%" />
              <Field id={`meses-${i}`} label="Plazo" value={o.meses} onChange={(v) => update(i, { meses: v })} min={3} max={360} suffix="meses" />
              <Field id={`comision-${i}`} label="Comisión de apertura" value={o.comision} onChange={(v) => update(i, { comision: v })} min={0} max={10} step={0.1} suffix="%" />
            </div>
          ))}
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Oferta más barata" value={mejor.nombre} highlight sub={`Coste total: ${money(mejor.costeTotal)}`} />
        <ResultStat label="Cuota mensual" value={money(mejor.cuota, 2)} sub={monthsToText(mejor.meses)} />
        <ResultStat label="Ahorro frente a la más cara" value={money(peor.costeTotal - mejor.costeTotal)} accent sub={`Comparado con ${peor.nombre}`} />
      </div>

      <ChartCard title="Coste del crédito por oferta">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="nombre" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
            <YAxis tickLine={false} axisLine={false} width={62} fontSize={12} stroke="var(--color-muted-foreground)" tickFormatter={(v) => money(Number(v))} />
            <Tooltip formatter={(v: number, name) => [money(v), name]} contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="intereses" name="Intereses" stackId="a" fill="var(--color-chart-1)" animationDuration={700} />
            <Bar dataKey="comisionImporte" name="Comisiones" stackId="a" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} animationDuration={700} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <h2 className="border-b border-border p-5 font-display text-base font-semibold">Comparativa lado a lado</h2>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Concepto</TableHead>
                {rows.map((r) => (
                  <TableHead key={r.nombre} className="text-right">
                    {r.nombre}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { label: "Cuota mensual", get: (r: (typeof rows)[number]) => money(r.cuota, 2) },
                { label: "Plazo", get: (r: (typeof rows)[number]) => monthsToText(r.meses) },
                { label: "Intereses", get: (r: (typeof rows)[number]) => money(r.intereses) },
                { label: "Comisión de apertura", get: (r: (typeof rows)[number]) => money(r.comisionImporte) },
                { label: "Coste del crédito", get: (r: (typeof rows)[number]) => money(r.costeTotal) },
                { label: "Total desembolsado", get: (r: (typeof rows)[number]) => money(r.total) },
              ].map((row) => (
                <TableRow key={row.label}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  {rows.map((r) => (
                    <TableCell key={r.nombre} className="text-right tabular-nums">
                      {row.get(r)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </CalcShell>
  );
}
