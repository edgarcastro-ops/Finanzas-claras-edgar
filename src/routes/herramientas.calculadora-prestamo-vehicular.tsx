import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { AmortizationCalculator } from "@/components/calculators/AmortizationCalculator";

const title = "Calculadora de préstamo vehicular";
const description = "Calcula la cuota de tu crédito de auto con enganche incluido, el total de intereses y la tabla de pagos mes a mes.";
const path = "/herramientas/calculadora-prestamo-vehicular";

export const Route = createFileRoute("/herramientas/calculadora-prestamo-vehicular")({
  head: () => ({
    meta: [
      { title: `${title} | FinanzasClaras` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | FinanzasClaras` },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: path }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolPage
      title={title}
      category="Vehículo"
      intro="Financiar un coche parece sencillo hasta que sumas los intereses. Introduce el precio del vehículo, tu enganche, la tasa y el plazo para ver cuánto te costará realmente."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">El coche pierde valor, la deuda no</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Un vehículo se deprecia rápido durante los primeros años, así que con plazos largos es fácil deber más de lo que vale el coche. Un enganche mayor y un plazo corto reducen ese riesgo y los intereses.
          </p>
        </>
      }
    >
      <AmortizationCalculator config={{
              "amountLabel": "Precio del vehículo",
              "amountDefault": 25000,
              "amountMin": 2000,
              "amountMax": 200000,
              "amountStep": 500,
              "rateLabel": "Tasa anual",
              "rateDefault": 9,
              "rateMax": 40,
              "monthsLabel": "Plazo",
              "monthsDefault": 60,
              "monthsMin": 12,
              "monthsMax": 96,
              "allowDownPayment": true,
              "downPaymentLabel": "Enganche / entrada",
              "downPaymentDefault": 5000,
              "allowExtra": true,
              "tableTitle": "Tabla de pagos del crédito vehicular"
      }} />
    </ToolPage>
  );
}
