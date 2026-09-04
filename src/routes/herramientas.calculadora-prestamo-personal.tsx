import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { LoanCalculator } from "@/components/calculators/LoanCalculator";

const title = "Calculadora de préstamo personal";
const description =
  "Calcula la cuota mensual de tu préstamo, el total de intereses y consulta la tabla de amortización completa mes a mes.";

export const Route = createFileRoute("/herramientas/calculadora-prestamo-personal")({
  head: () => ({
    meta: [
      { title: `${title} | FinanzasClaras` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | FinanzasClaras` },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/herramientas/calculadora-prestamo-personal" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/herramientas/calculadora-prestamo-personal" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolPage
      title={title}
      category="Crédito"
      intro="Antes de firmar un préstamo conviene saber exactamente cuánto pagarás. Introduce el importe, la tasa anual y el plazo para ver tu cuota, el reparto entre capital e intereses y la tabla de amortización completa."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Qué tener en cuenta</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            El cálculo usa el sistema francés de cuota fija, el más habitual en préstamos personales.
            No incluye comisiones de apertura, seguros vinculados ni otros gastos: para comparar
            ofertas reales fíjate siempre en la TAE, no solo en el tipo de interés nominal. Alargar
            el plazo baja la cuota, pero incrementa el total de intereses que pagarás.
          </p>
        </>
      }
    >
      <LoanCalculator />
    </ToolPage>
  );
}
