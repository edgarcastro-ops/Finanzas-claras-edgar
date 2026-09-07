import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { AmortizationCalculator } from "@/components/calculators/AmortizationCalculator";

const title = "Calculadora de préstamo estudiantil";
const description = "Calcula la cuota y el coste total de tu crédito educativo y cuánto ahorras abonando capital extra al terminar los estudios.";
const path = "/herramientas/calculadora-prestamo-estudiantil";

export const Route = createFileRoute("/herramientas/calculadora-prestamo-estudiantil")({
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
      category="Educación"
      intro="Los créditos educativos suelen tener plazos largos y cuotas que empiezan cuando ya estás trabajando. Introduce el importe, la tasa y el plazo para ver cuánto pagarás en total."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Piensa en la cuota, no solo en el importe</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Antes de firmar, compara la cuota con el sueldo realista de tu primer empleo en el sector. Cuando empieces a ganar más, cualquier abono extra a capital recorta años de pagos porque ataca directamente la deuda.
          </p>
        </>
      }
    >
      <AmortizationCalculator config={{
              "amountLabel": "Importe del crédito",
              "amountDefault": 20000,
              "amountMin": 1000,
              "amountMax": 200000,
              "amountStep": 500,
              "rateLabel": "Tasa anual",
              "rateDefault": 6,
              "rateMax": 30,
              "monthsLabel": "Plazo",
              "monthsDefault": 120,
              "monthsMin": 12,
              "monthsMax": 300,
              "allowExtra": true,
              "tableTitle": "Tabla de amortización del crédito educativo"
      }} />
    </ToolPage>
  );
}
