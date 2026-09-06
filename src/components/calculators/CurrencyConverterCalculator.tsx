import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/calculators/Field";
import { CalcShell, ResultStat } from "@/components/calculators/Shared";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CURRENCIES, formatMoney } from "@/lib/currency";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CurrencyConverterCalculator() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("MXN");
  const [rate, setRate] = useState(17.5);
  const [amount, setAmount] = useState(100);

  const converted = amount * (rate > 0 ? rate : 0);
  const inverse = rate > 0 ? 1 / rate : 0;

  const swap = () => {
    setFrom(to);
    setTo(from);
    setRate(rate > 0 ? Number((1 / rate).toFixed(6)) : 0);
  };

  return (
    <CalcShell
      inputs={
        <>
          <Field id="amount" label="Cantidad a convertir" value={amount} onChange={setAmount} min={0} max={100000} step={10} />
          <div className="space-y-2">
            <Label htmlFor="from">Moneda de origen</Label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger id="from"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>{c.flag} {c.code} · {c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="to">Moneda de destino</Label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger id="to"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>{c.flag} {c.code} · {c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Tasa de cambio (1 {from} = ? {to})</Label>
            <Input
              id="rate"
              type="number"
              inputMode="decimal"
              step="0.0001"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value) || 0)}
              className="text-right font-display font-semibold tabular-nums"
            />
          </div>
          <Button type="button" variant="soft" className="w-full" onClick={swap}>
            <ArrowLeftRight className="h-4 w-4" /> Invertir monedas
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Resultado" value={formatMoney(converted, to, 2)} highlight sub={`${formatMoney(amount, from, 2)} convertidos`} />
        <ResultStat label={`1 ${from} equivale a`} value={formatMoney(rate, to, 4)} accent />
        <ResultStat label={`1 ${to} equivale a`} value={formatMoney(inverse, from, 4)} />
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
        <h2 className="font-display text-base font-semibold">Tabla rápida de equivalencias</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {[1, 5, 10, 50, 100, 500, 1000, 5000].map((v) => (
            <li key={v} className="flex items-center justify-between rounded-xl border border-border px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">{formatMoney(v, from, 0)}</span>
              <span className="font-semibold tabular-nums">{formatMoney(v * rate, to, 2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </CalcShell>
  );
}
