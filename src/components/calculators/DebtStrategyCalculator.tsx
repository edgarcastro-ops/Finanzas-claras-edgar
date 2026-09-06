import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/calculators/Field";
import { CalcShell, ChartCard, ResultStat } from "@/components/calculators/Shared";
import { monthsToText, payoffStrategy, type DebtInput } from "@/lib/finance";
import { useCurrency } from "@/lib/currency";

let nextId = 100;

const initialDebts: DebtInput[] = [
  { id: "d1", name: "Tarjeta de crédito", balance: 3000, rate: 38, minimum: 90 },
  { id: "d2", name: "Préstamo personal", balance: 6000, rate: 14, minimum: 180 },
  { id: "d3", name: "Crédito de tienda", balance: 1200, rate: 45, minimum: 60 },
];

export function DebtStrategyCalculator() {
  const { money, option } = useCurrency();
  const [debts, setDebts] = useState<DebtInput[]>(initialDebts);
  const [extra, setExtra] = useState(150);

  const update = (id: string, patch: Partial<DebtInput>) =>
    setDebts((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  const snowball = useMemo(() => payoffStrategy(debts, extra, "snowball"), [debts, extra]);
  const avalanche = useMemo(() => payoffStrategy(debts, extra, "avalanche"), [debts, extra]);

  const chartData = useMemo(() => {
    const len = Math.max(snowball.series.length, avalanche.series.length);
    return Array.from({ length: len }, (_, i) => ({
      mes: i,
      "Bola de nieve": snowball.series[i]?.saldo ?? 0,
      Avalancha: avalanche.series[i]?.saldo ?? 0,
    }));
  }, [snowball, avalanche]);

  const mejor = avalanche.totalInterest <= snowball.totalInterest ? "Avalancha" : "Bola de nieve";
  const diferencia = Math.abs(snowball.totalInterest - avalanche.totalInterest);
  const totalDeuda = debts.reduce((a, d) => a + d.balance, 0);

  return (
    <CalcShell
      inputs={
        <>
          <Field
            id="extra"
            label="Pago extra mensual"
            value={extra}
            onChange={setExtra}
            min={0}
            max={2000}
            step={25}
            prefix={option.symbol}
          />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Es el dinero que puedes destinar cada mes por encima de los pagos mínimos de todas tus
            deudas.
          </p>
          <ResultStat label="Deuda total actual" value={money(totalDeuda)} />
        </>
      }
    >
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-base font-semibold">Tus deudas</h2>
          <Button
            type="button"
            variant="soft"
            size="sm"
            onClick={() =>
              setDebts((p) => [
                ...p,
                { id: `d${nextId++}`, name: `Deuda ${p.length + 1}`, balance: 1000, rate: 20, minimum: 40 },
              ])
            }
          >
            <Plus className="h-4 w-4" /> Añadir deuda
          </Button>
        </div>

        <div className="mt-4 space-y-4">
          {debts.map((d, i) => (
            <div key={d.id} className="grid gap-3 rounded-xl border border-border p-4 sm:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))_auto]">
              <div>
                <Label htmlFor={`${d.id}-name`} className="text-xs text-muted-foreground">Nombre</Label>
                <Input id={`${d.id}-name`} value={d.name} onChange={(e) => update(d.id, { name: e.target.value })} className="mt-1 h-9" />
              </div>
              <div>
                <Label htmlFor={`${d.id}-bal`} className="text-xs text-muted-foreground">Saldo ({option.symbol})</Label>
                <Input id={`${d.id}-bal`} type="number" inputMode="decimal" value={d.balance} onChange={(e) => update(d.id, { balance: Number(e.target.value) || 0 })} className="mt-1 h-9 text-right tabular-nums" />
              </div>
              <div>
                <Label htmlFor={`${d.id}-rate`} className="text-xs text-muted-foreground">Tasa anual (%)</Label>
                <Input id={`${d.id}-rate`} type="number" inputMode="decimal" value={d.rate} onChange={(e) => update(d.id, { rate: Number(e.target.value) || 0 })} className="mt-1 h-9 text-right tabular-nums" />
              </div>
              <div>
                <Label htmlFor={`${d.id}-min`} className="text-xs text-muted-foreground">Pago mínimo</Label>
                <Input id={`${d.id}-min`} type="number" inputMode="decimal" value={d.minimum} onChange={(e) => update(d.id, { minimum: Number(e.target.value) || 0 })} className="mt-1 h-9 text-right tabular-nums" />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Eliminar ${d.name}`}
                  disabled={debts.length <= 1}
                  onClick={() => setDebts((p) => p.filter((x) => x.id !== d.id))}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <span className="sr-only">Deuda {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h3 className="font-display text-base font-semibold">Bola de nieve</h3>
          <p className="mt-1 text-xs text-muted-foreground">Primero la deuda con menor saldo.</p>
          <p className="mt-4 font-display text-2xl font-bold tabular-nums">{monthsToText(snowball.months)}</p>
          <p className="mt-1 text-sm text-muted-foreground">Intereses: <span className="font-semibold text-brand">{money(snowball.totalInterest)}</span></p>
          <p className="mt-1 text-sm text-muted-foreground">Total pagado: {money(snowball.totalPaid)}</p>
          <p className="mt-3 text-xs text-muted-foreground">Orden: {snowball.order.join(" → ") || "—"}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h3 className="font-display text-base font-semibold">Avalancha</h3>
          <p className="mt-1 text-xs text-muted-foreground">Primero la deuda con mayor tasa.</p>
          <p className="mt-4 font-display text-2xl font-bold tabular-nums">{monthsToText(avalanche.months)}</p>
          <p className="mt-1 text-sm text-muted-foreground">Intereses: <span className="font-semibold text-brand">{money(avalanche.totalInterest)}</span></p>
          <p className="mt-1 text-sm text-muted-foreground">Total pagado: {money(avalanche.totalPaid)}</p>
          <p className="mt-3 text-xs text-muted-foreground">Orden: {avalanche.order.join(" → ") || "—"}</p>
        </div>
      </div>

      <div className="mt-4">
        <ResultStat
          label="Estrategia más barata"
          value={mejor}
          highlight
          sub={diferencia < 1 ? "Ambas cuestan prácticamente lo mismo" : `Ahorras ${money(diferencia)} en intereses`}
        />
      </div>

      <ChartCard title="Evolución de la deuda total">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="mes" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
            <YAxis tickLine={false} axisLine={false} width={62} fontSize={12} stroke="var(--color-muted-foreground)" tickFormatter={(v) => money(Number(v))} />
            <Tooltip
              formatter={(v: number, name) => [money(v), name]}
              labelFormatter={(l) => `Mes ${l}`}
              contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="Bola de nieve" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={false} animationDuration={700} />
            <Line type="monotone" dataKey="Avalancha" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={false} animationDuration={700} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </CalcShell>
  );
}
