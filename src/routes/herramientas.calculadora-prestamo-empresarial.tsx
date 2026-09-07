import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { AmortizationCalculator } from "@/components/calculators/AmortizationCalculator";

const title = "Calculadora de préstamo empresarial";
const description = "Calcula la cuota de un crédito para tu negocio, los intereses totales y su tabla de amortización para planificar tu flujo de caja.";
const path = "/herramientas/calculadora-prestamo-empresarial";

export const Route = createFileRoute("/herramientas/calculadora-prestamo-empresarial")({
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
      category="Negocio"
      intro="Un crédito para tu negocio debe caber en el flujo de caja del mes más flojo del año. Introduce el importe, la tasa y el plazo para ver la cuota y el coste financiero total."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Contrástalo con tu flujo de caja</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Compara la cuota con tu margen operativo mensual, no con la facturación. Y recuerda que muchos créditos empresariales incluyen comisiones de apertura y estudio que no aparecen en el tipo nominal.
          </p>
        </>
      }
    >
      <AmortizationCalculator config={{
              "amountLabel": "Importe del crédito",
              "amountDefault": 50000,
              "amountMin": 2000,
              "amountMax": 1000000,
              "amountStep": 1000,
              "rateLabel": "Tasa anual",
              "rateDefault": 11,
              "rateMax": 45,
              "monthsLabel": "Plazo",
              "monthsDefault": 60,
              "monthsMin": 6,
              "monthsMax": 180,
              "allowExtra": true,
              "tableTitle": "Tabla de amortización del crédito empresarial"
      }} />
    </ToolPage>
  );
}
