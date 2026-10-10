import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalcShell } from "@/components/calculators/Shared";
import { CurrencySelect } from "@/components/site/CurrencySelect";
import { ToolPage } from "@/components/site/ToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCurrency } from "@/lib/currency";
import { normalizeNumberInput } from "@/lib/number-input";

const title = "Calculadora de finiquito y liquidación de México";
const description = "Estima el finiquito y la liquidación laboral conforme a la Ley Federal del Trabajo de México.";
const path = "/calculadoras/calculadora-finiquito-mexico";
const disclaimer = "Este cálculo es una estimación basada en la Ley Federal del Trabajo (LFT) vigente. No incluye el cálculo del Salario Diario Integrado (SDI) completo, PTU (reparto de utilidades), ni retenciones de ISR sobre la indemnización. Para tu caso específico, consulta con un especialista o acude a la PROFEDET (Procuraduría Federal de la Defensa del Trabajo).";
const seniorityCap = 630.08;

export const Route = createFileRoute("/calculadoras/calculadora-finiquito-mexico")({
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

type EndReason = "renuncia" | "justificado" | "injustificado";
type SalaryMode = "mensual" | "diario";

function formatMxn(value: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 2 }).format(value);
}

function Page() {
  const [salaryMode, setSalaryMode] = useState<SalaryMode>("mensual");
  const [salary, setSalary] = useState(30000);
  const [years, setYears] = useState(3);
  const [months, setMonths] = useState(0);
  const today = new Date();
  const yearStartUtc = Date.UTC(today.getFullYear(), 0, 1);
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const [daysWorked, setDaysWorked] = useState(Math.floor((todayUtc - yearStartUtc) / 86_400_000) + 1);
  const [unusedVacation, setUnusedVacation] = useState(0);
  const [reason, setReason] = useState<EndReason>("injustificado");
  const { option } = useCurrency();

  const dailySalary = Math.max(salary, 0) / (salaryMode === "mensual" ? 30 : 1);
  const completedYears = Math.max(Math.floor(years), 0);
  const serviceYears = completedYears + Math.max(0, Math.min(months, 11)) / 12;
  const bonusDays = 15 * Math.min(Math.max(daysWorked, 0), 365) / 365;
  const bonusAmount = dailySalary * bonusDays;
  const vacationAmount = dailySalary * Math.max(unusedVacation, 0);
  const vacationPremium = vacationAmount * 0.25;
  const isUnjustifiedDismissal = reason === "injustificado";
  const qualifiesForResignationPremium = reason === "renuncia" && serviceYears >= 15;
  const constitutionalIndemnity = isUnjustifiedDismissal ? dailySalary * 90 : 0;
  const serviceCompensation = isUnjustifiedDismissal ? dailySalary * 20 * completedYears : 0;
  const seniorityPremium = isUnjustifiedDismissal || qualifiesForResignationPremium
    ? Math.min(dailySalary, seniorityCap) * 12 * completedYears
    : 0;
  const total = bonusAmount + vacationAmount + vacationPremium + constitutionalIndemnity + serviceCompensation + seniorityPremium;

  const rows = [
    { label: "Aguinaldo proporcional (Art. 87)", amount: bonusAmount, detail: `${bonusDays.toFixed(2)} días de salario` },
    { label: "Vacaciones no disfrutadas (Arts. 76-81)", amount: vacationAmount, detail: `${Math.max(unusedVacation, 0)} días` },
    { label: "Prima vacacional (25%)", amount: vacationPremium, detail: "25% de vacaciones no disfrutadas" },
    ...(isUnjustifiedDismissal ? [
      { label: "Indemnización constitucional (Art. 48)", amount: constitutionalIndemnity, detail: "90 días de salario" },
      { label: "20 días por año de servicio (Art. 50)", amount: serviceCompensation, detail: `${completedYears} años completos` },
    ] : []),
    ...((isUnjustifiedDismissal || qualifiesForResignationPremium) ? [
      { label: "Prima de antigüedad (Arts. 162-163)", amount: seniorityPremium, detail: `${completedYears} años completos; salario base máximo ${formatMxn(seniorityCap)}/día` },
    ] : []),
  ];

  return (
    <ToolPage
      title={title}
      category="Laboral"
      intro="Estima el finiquito que corresponde al terminar la relación laboral y, si aplica, los conceptos adicionales de liquidación. Los resultados se muestran en pesos mexicanos (MXN)."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Tope de prima de antigüedad</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Para la prima de antigüedad se usa un salario base máximo de $630.08 MXN diarios como referencia 2026 (dos veces el salario mínimo diario general); verifica el tope vigente aplicable a tu caso. Esta estimación incluye la prima únicamente para despido injustificado o renuncia con 15 años de servicio y puede omitir otros supuestos del artículo 162. Los 90 días y los 20 días por año tampoco se generan automáticamente en todos los casos: la procedencia depende de las circunstancias y de la vía de reclamación. Consulta la <a className="font-medium text-brand underline" href="https://www.diputados.gob.mx/LeyesBiblio/pdf/LFT.pdf" target="_blank" rel="noreferrer">Ley Federal del Trabajo</a> y la <a className="font-medium text-brand underline" href="https://www.gob.mx/profedet" target="_blank" rel="noreferrer">PROFEDET</a>; este cálculo no determina derechos ni sustituye asesoría laboral.
          </p>
        </>
      }
    >
      <CalcShell
        inputs={
          <>
            <div className="space-y-2">
              <Label htmlFor="mx-salary-mode" className="text-sm font-medium">Tipo de salario</Label>
              <Select value={salaryMode} onValueChange={(value) => setSalaryMode(value as SalaryMode)}>
                <SelectTrigger id="mx-salary-mode"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensual">Salario mensual</SelectItem>
                  <SelectItem value="diario">Salario diario</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="mx-salary" className="text-sm font-medium">{salaryMode === "mensual" ? "Salario mensual (MXN)" : "Salario diario (MXN)"}</Label>
                <CurrencySelect />
              </div>
              <Input id="mx-salary" type="number" inputMode="decimal" min="0" max="100000000" step="100" value={salary} onChange={(event) => setSalary(normalizeNumberInput(event.target.value, 0, 100000000))} />
              <p className="text-xs text-muted-foreground">La moneda global seleccionada es {option.code}; no hay conversión y los resultados siempre se muestran en MXN.</p>
            </div>
            <p className="-mt-4 text-xs text-muted-foreground">Salario diario calculado: {formatMxn(dailySalary)}</p>
            <NumberField id="mx-years" label="Años completos de antigüedad" value={years} onChange={(value) => setYears(Math.min(Math.floor(value), 60))} min={0} max={60} />
            <NumberField id="mx-months" label="Meses completos adicionales" value={months} onChange={(value) => setMonths(Math.min(value, 11))} min={0} max={11} />
            <NumberField id="mx-days-worked" label="Días trabajados en el año" value={daysWorked} onChange={setDaysWorked} min={0} max={365} />
            <NumberField id="mx-vacation" label="Días de vacaciones no disfrutados" value={unusedVacation} onChange={setUnusedVacation} min={0} max={365} step={0.5} />
            <div className="space-y-2">
              <Label htmlFor="mx-reason" className="text-sm font-medium">Motivo de terminación</Label>
              <Select value={reason} onValueChange={(value) => setReason(value as EndReason)}>
                <SelectTrigger id="mx-reason"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="renuncia">Renuncia voluntaria</SelectItem>
                  <SelectItem value="justificado">Despido justificado</SelectItem>
                  <SelectItem value="injustificado">Despido injustificado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        }
      >
        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
          <h2 className="font-display text-lg font-semibold">Desglose estimado en MXN</h2>
          <div className="mt-4 divide-y divide-border">
            {rows.map((row) => (
              <div key={row.label} className="flex items-start justify-between gap-4 py-3 text-sm">
                <div><p className="font-medium">{row.label}</p><p className="mt-1 text-xs text-muted-foreground">{row.detail}</p></div>
                <span className="shrink-0 font-semibold tabular-nums">{formatMxn(row.amount)}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between gap-4 border-t border-border pt-4">
            <span className="font-semibold">Total estimado</span>
            <span className="font-display text-2xl font-bold tabular-nums text-brand">{formatMxn(total)}</span>
          </div>
          <p className="mt-5 rounded-lg bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground">{disclaimer}</p>
        </section>
      </CalcShell>
    </ToolPage>
  );
}

function NumberField({ id, label, value, onChange, min, max, step = 1 }: { id: string; label: string; value: number; onChange: (value: number) => void; min: number; max: number; step?: number }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      <Input id={id} type="number" inputMode="decimal" value={value} min={min} max={max} step={step} onChange={(event) => onChange(normalizeNumberInput(event.target.value, min, max))} />
    </div>
  );
}