import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { AmortizationCalculator } from "@/components/calculators/AmortizationCalculator";

const title = "Calculadora de hipoteca";
const description = "Calcula la cuota de tu hipoteca, los intereses totales y la tabla de amortización, incluyendo entrada y abonos extra a capital.";
const path = "/herramientas/calculadora-hipoteca";

export const Route = createFileRoute("/herramientas/calculadora-hipoteca")({
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
      category="Vivienda"
      intro="Una hipoteca es el crédito más largo que firmarás. Introduce el precio de la vivienda, tu entrada, el tipo de interés y el plazo para ver la cuota real y cuánto pagarás de intereses a lo largo de los años."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Lo que no incluye la cuota</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Al coste mensual hay que sumarle seguro de hogar, seguro de vida si lo exige el banco, impuestos y comunidad. Y ojo con el plazo: alargarlo baja la cuota, pero los intereses de una hipoteca a 30 años pueden acercarse al precio de la vivienda.
          </p>
        </>
      }
    >
      <AmortizationCalculator config={{
              "amountLabel": "Precio de la vivienda",
              "amountDefault": 200000,
              "amountMin": 20000,
              "amountMax": 1500000,
              "amountStep": 1000,
              "rateLabel": "Tipo de interés anual",
              "rateDefault": 3.5,
              "rateMax": 15,
              "monthsLabel": "Plazo",
              "monthsDefault": 300,
              "monthsMin": 60,
              "monthsMax": 480,
              "allowDownPayment": true,
              "downPaymentLabel": "Entrada aportada",
              "downPaymentDefault": 40000,
              "allowExtra": true,
              "tableTitle": "Tabla de amortización de la hipoteca"
      }} />
    </ToolPage>
  );
}
