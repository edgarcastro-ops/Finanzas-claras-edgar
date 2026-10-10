import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalcShell } from "@/components/calculators/Shared";
import { CurrencySelect } from "@/components/site/CurrencySelect";
import { ToolPage } from "@/components/site/ToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrency } from "@/lib/currency";
import { dominicanNoticeDays, dominicanSeveranceDays } from "@/lib/labor";
import { normalizeNumberInput } from "@/lib/number-input";

const title = "Calculadora de prestaciones laborales de República Dominicana";
const description = "Estima preaviso, cesantía, vacaciones y regalía pascual según el Código de Trabajo dominicano.";
const path = "/calculadoras/calculadora-prestaciones-rd";
const disclaimer = "Este cálculo es una estimación basada en el Código de Trabajo de la República Dominicana (Ley 16-92). No incluye horas extras, comisiones variables ni otras bonificaciones que puedan afectar el salario promedio real. Para casos específicos o en disputa, consulta con un abogado laboral o el Ministerio de Trabajo.";

export const Route = createFileRoute("/calculadoras/calculadora-prestaciones-rd")({
  head: () => ({
    meta: [
      { title: `${title} | Finanzas a tu Bolsillo` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Finanzas a tu Bolsillo` },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: path }],
  }),
  component: Page,
});

type EndReason = "desahucio" | "renuncia" | "causa";

function dateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year!, month! - 1, day!);
}

function addMonths(date: Date, months: number) {
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth() + 1, 0).getDate();
  return new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), Math.min(date.getDate(), lastDay));
}

function completedMonths(start: Date, end: Date) {
  let months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  if (end < addMonths(start, months)) months -= 1;
  return Math.max(months, 0);
}

function dateStamp(date: Date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysInclusive(start: Date, end: Date) {
  return Math.max(Math.floor((dateStamp(end) - dateStamp(start)) / 86_400_000) + 1, 0);
}

function formatDop(value: number) {
  return new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP", maximumFractionDigits: 2 }).format(value);
}

function Page() {
  const now = new Date();
  const defaultStart = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const [salary, setSalary] = useState(50000);
  const [startDate, setStartDate] = useState(dateInputValue(defaultStart));
  const [endDate, setEndDate] = useState(dateInputValue(now));
  const [reason, setReason] = useState<EndReason>("desahucio");
  const [noticeGiven, setNoticeGiven] = useState(false);
  const { option } = useCurrency();

  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const validDates = Number.isFinite(start.getTime()) && Number.isFinite(end.getTime()) && end >= start;
  const months = validDates ? completedMonths(start, end) : 0;
  const dailySalary = Math.max(salary, 0) / 23.83;
  const atLeastFiveYears = validDates && months >= 60;

  const noticeDays =
    reason === "desahucio" && !noticeGiven ? dominicanNoticeDays(months) : 0;
  const severanceDays = reason === "desahucio" ? dominicanSeveranceDays(months) : 0;

  const calendarYearStart = new Date(end.getFullYear(), 0, 1);
  const periodStart = validDates && start > calendarYearStart ? start : calendarYearStart;
  const workedDaysThisYear = validDates ? daysInclusive(periodStart, end) : 0;
  const daysInYear = (Date.UTC(end.getFullYear() + 1, 0, 1) - Date.UTC(end.getFullYear(), 0, 1)) / 86_400_000;
  const workedMonthsThisYear = workedDaysThisYear * 12 / daysInYear;
  const vacationEntitlement = atLeastFiveYears ? 18 : 14;
  const vacationDays = validDates ? vacationEntitlement * Math.min(workedMonthsThisYear / 12, 1) : 0;
  const noticeAmount = dailySalary * noticeDays;
  const severanceAmount = dailySalary * severanceDays;
  const vacationAmount = dailySalary * vacationDays;
  const christmasBonus = Math.max(salary, 0) * Math.min(workedMonthsThisYear / 12, 1);
  const total = noticeAmount + severanceAmount + vacationAmount + christmasBonus;

  return (
    <ToolPage
      title={title}
      category="Laboral"
      intro="Estima los conceptos de prestaciones laborales según el motivo de terminación y el tiempo trabajado. Ingresa el salario mensual en pesos dominicanos (DOP)."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Referencia legal y moneda</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Estimación basada en los artículos 76, 80, 82, 177 y 219 del Código de Trabajo (Ley 16-92) y contrastada con el cálculo público del <a className="font-medium text-brand underline" href="https://calculo.mt.gob.do/" target="_blank" rel="noreferrer">Ministerio de Trabajo</a>. El cálculo oficial puede variar por modalidad de pago, tipo de trabajo y promedios salariales; esta página simplifica esos datos. El selector de moneda del sitio no convierte este cálculo: ingresa el salario en DOP y los resultados siempre se muestran en pesos dominicanos.
          </p>
        </>
      }
    >
      <CalcShell
        inputs={
          <>
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="rd-salary" className="text-sm font-medium">Salario mensual (DOP)</Label>
              <CurrencySelect />
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-2">
              <span className="text-sm text-muted-foreground">RD$</span>
              <Input id="rd-salary" type="number" min="0" max="100000000" step="500" value={salary} onChange={(event) => setSalary(normalizeNumberInput(event.target.value, 0, 100000000))} className="border-0 text-right shadow-none focus-visible:ring-0" />
            </div>
            <p className="-mt-4 text-xs leading-relaxed text-muted-foreground">La moneda global seleccionada es {option.code}; no se aplica conversión.</p>
            <DateField id="rd-start" label="Fecha de inicio del contrato" value={startDate} onChange={setStartDate} max={endDate} />
            <DateField id="rd-end" label="Fecha de terminación" value={endDate} onChange={setEndDate} min={startDate} />
            <div className="space-y-2">
              <Label htmlFor="rd-reason" className="text-sm font-medium">Motivo de terminación</Label>
              <Select value={reason} onValueChange={(value) => setReason(value as EndReason)}>
                <SelectTrigger id="rd-reason"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="desahucio">Despido sin causa (desahucio)</SelectItem>
                  <SelectItem value="renuncia">Renuncia voluntaria (dimisión)</SelectItem>
                  <SelectItem value="causa">Despido con causa justificada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {reason === "desahucio" && (
              <label className="flex items-start gap-3 text-sm leading-relaxed">
                <input type="checkbox" checked={noticeGiven} onChange={(event) => setNoticeGiven(event.target.checked)} className="mt-1 size-4 accent-primary" />
                El empleador dio el preaviso
              </label>
            )}
            {!validDates && <p className="text-xs text-destructive">La fecha de terminación debe ser igual o posterior a la fecha de inicio.</p>}
          </>
        }
      >
        <ResultBreakdown
          items={[
            { label: "Preaviso (Art. 76)", amount: noticeAmount, detail: `${noticeDays} días` },
            { label: "Cesantía (Art. 80)", amount: severanceAmount, detail: `${severanceDays.toFixed(2)} días` },
            { label: "Vacaciones proporcionales (Art. 177)", amount: vacationAmount, detail: `${vacationDays.toFixed(2)} días` },
            { label: "Regalía pascual proporcional (Art. 219)", amount: christmasBonus, detail: `${workedMonthsThisYear.toFixed(2)} meses trabajados este año` },
          ]}
          total={total}
          disclaimer={disclaimer}
        />
      </CalcShell>
    </ToolPage>
  );
}

function DateField({ id, label, value, onChange, min, max }: { id: string; label: string; value: string; onChange: (value: string) => void; min?: string; max?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      <Input id={id} type="date" value={value} min={min} max={max} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function ResultBreakdown({ items, total, disclaimer }: { items: { label: string; amount: number; detail: string }[]; total: number; disclaimer: string }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <h2 className="font-display text-lg font-semibold">Desglose estimado en DOP</h2>
      <div className="mt-4 divide-y divide-border">
        {items.map((item) => (
          <div key={item.label} className="flex items-start justify-between gap-4 py-3 text-sm">
            <div><p className="font-medium">{item.label}</p><p className="mt-1 text-xs text-muted-foreground">{item.detail}</p></div>
            <span className="shrink-0 font-semibold tabular-nums">{formatDop(item.amount)}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between gap-4 border-t border-border pt-4">
        <span className="font-semibold">Total estimado</span>
        <span className="font-display text-2xl font-bold tabular-nums text-brand">{formatDop(total)}</span>
      </div>
      <p className="mt-5 rounded-lg bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground">{disclaimer}</p>
    </section>
  );
}