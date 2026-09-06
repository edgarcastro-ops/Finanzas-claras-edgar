import { useMemo, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Field } from "@/components/calculators/Field";
import { CalcShell, ChartCard, ResultStat } from "@/components/calculators/Shared";
import { useCurrency } from "@/lib/currency";

export function NetSalaryCalculator() {
  const { money, option } = useCurrency();
  const [gross, setGross] = useState(2500);
  const [tax, setTax] = useState(12);
  const [social, setSocial] = useState(6.35);
  const [other, setOther] = useState(0);
  const [payments, setPayments] = useState(12);

  const { impuesto, seguridad, otros, neto, anualBruto, anualNeto } = useMemo(() => {
    const impuesto = (gross * tax) / 100;
    const seguridad = (gross * social) / 100;
    const otros = Math.max(other, 0);
    const neto = Math.max(gross - impuesto - seguridad - otros, 0);
    return {
      impuesto,
      seguridad,
      otros,
      neto,
      anualBruto: gross * payments,
      anualNeto: neto * payments,
    };
  }, [gross, tax, social, other, payments]);

  const data = [
    { name: "Salario neto", value: Math.round(neto) },
    { name: "Impuestos", value: Math.round(impuesto) },
    { name: "Seguridad social", value: Math.round(seguridad) },
    { name: "Otras deducciones", value: Math.round(otros) },
  ].filter((d) => d.value > 0);

  const colors = ["var(--color-chart-2)", "var(--color-chart-1)", "var(--color-chart-3)", "var(--color-chart-4)"];
  const retencionTotal = gross > 0 ? ((gross - neto) / gross) * 100 : 0;

  return (
    <CalcShell
      inputs={
        <>
          <Field id="gross" label="Salario bruto mensual" value={gross} onChange={setGross} min={0} max={20000} step={50} prefix={option.symbol} />
          <Field id="tax" label="Impuesto sobre la renta" value={tax} onChange={setTax} min={0} max={50} step={0.1} suffix="%" />
          <Field id="social" label="Seguridad social / pensión" value={social} onChange={setSocial} min={0} max={30} step={0.05} suffix="%" />
          <Field id="other" label="Otras deducciones fijas" value={other} onChange={setOther} min={0} max={3000} step={10} prefix={option.symbol} />
          <Field id="payments" label="Pagas al año" value={payments} onChange={setPayments} min={12} max={16} suffix="pagas" />
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultStat label="Salario neto mensual" value={money(neto, 2)} highlight sub={`Retención total: ${retencionTotal.toFixed(1)}%`} />
        <ResultStat label="Total deducciones" value={money(gross - neto, 2)} accent />
        <ResultStat label="Neto anual" value={money(anualNeto)} sub={`Bruto anual: ${money(anualBruto)}`} />
      </div>

      <ChartCard title="A dónde va tu salario bruto">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={3} animationDuration={700}>
              {data.map((d, i) => (
                <Cell key={d.name} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v: number, name) => [money(v), name]}
              contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </CalcShell>
  );
}
