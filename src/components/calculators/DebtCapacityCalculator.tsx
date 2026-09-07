import { useMemo, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Field } from "@/components/calculators/Field";
import { CalcShell, ChartCard, ResultStat } from "@/components/calculators/Shared";
import { useCurrency } from "@/lib/currency";

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  fontSize: 12,
};

export function DebtCapacityCalculator() {
  const { money, option } = useCurrency();
  const [income, setIncome] = useState(2000);
  const [otherIncome, setOtherIncome] = useState(0);
  const [debts, setDebts] = useState(350);
  const [newPayment, setNewPayment] = useState(300);
  const [limit, setLimit] = useState(35);

  const total = Math.max(income + otherIncome, 0);

  const { dtiActual, dtiNuevo, maxCuota, margen } = useMemo(() => {
    const dtiActual = total > 0 ? (debts / total) * 100 : 0;
    const dtiNuevo = total > 0 ? ((debts + newPayment) / total) * 100 : 0;
    const maxCuota = Math.max((total * limit) / 100 - debts, 0);
    return { dtiActual, dtiNuevo, maxCuota, margen: maxCuota - newPayment };
  }, [total, debts, newPayment, limit]);

  const nivel =
    dtiNuevo <= limit
      ? { texto: "Saludable", detalle: "Tu carga de deuda queda dentro del límite recomendado." }
      : dtiNuevo <= limit + 10
        ? { texto: "Ajustado", detalle: "Superas el límite recomendado: negocia plazo o importe." }
        : { texto: "Riesgo alto", detalle: "La mayoría de entidades rechazaría esta solicitud." };

  const reparto = [
    { name: "Deudas actuales", value: Math.round(debts) },
    { name: "Nueva cuota", value: Math.round(newPayment) },
    { name: "Ingreso disponible", value: Math.max(Math.round(total - debts - newPayment), 0) },
  ];

  return (
    <CalcShell
      inputs={
        <>
          <Field id="income" label="Ingreso mensual neto" value={income} onChange={setIncome} min={0} max={20000} step={50} prefix={option.symbol} />
          <Field id="otherIncome" label="Otros ingresos estables" value={otherIncome} onChange={setOtherIncome} min={0} max={10000} step={50} prefix={option.symbol} />
          <Field id="debts" label="Cuotas de deudas actuales" value={debts} onChange={setDebts} min={0} max={10000} step={25} prefix={option.symbol} />
          <Field id="newPayment" label="Cuota del nuevo crédito" value={newPayment} onChange={setNewPayment} min={0} max={10000} step={25} prefix={option.symbol} />
          <Field id="limit" label="Límite de endeudamiento" value={limit} onChange={setLimit} min={20} max={50} step={1} suffix="%" />
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat
          label="Endeudamiento con el nuevo crédito"
          value={`${dtiNuevo.toFixed(1)}%`}
          highlight
          sub={nivel.texto}
        />
        <ResultStat label="Endeudamiento actual" value={`${dtiActual.toFixed(1)}%`} />
        <ResultStat label="Cuota máxima recomendada" value={money(maxCuota, 0)} accent sub={`Con un límite del ${limit}%`} />
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground shadow-soft">
        {margen >= 0 ? (
          <>
            La cuota que planteas cabe en tu presupuesto: aún te quedaría un margen de{" "}
            <strong className="text-foreground">{money(margen, 0)}</strong> al mes antes de llegar al
            límite del {limit}%. {nivel.detalle}
          </>
        ) : (
          <>
            La cuota supera tu capacidad en{" "}
            <strong className="text-foreground">{money(Math.abs(margen), 0)}</strong> al mes.{" "}
            {nivel.detalle}
          </>
        )}
      </div>

      <ChartCard title="Reparto de tu ingreso mensual">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={reparto} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3} animationDuration={700}>
              <Cell fill="var(--color-chart-1)" />
              <Cell fill="var(--color-chart-3)" />
              <Cell fill="var(--color-chart-2)" />
            </Pie>
            <Tooltip formatter={(v: number, name) => [money(v), name]} contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </CalcShell>
  );
}
