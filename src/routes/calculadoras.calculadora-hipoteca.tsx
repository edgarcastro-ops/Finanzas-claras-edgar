import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { AmortizationCalculator } from "@/components/calculators/AmortizationCalculator";
import { calculatorGuides } from "@/data/calculator-guides";
import { absoluteUrl } from "@/lib/seo";

const title = "Calculadora de hipoteca";
const description = "Calcula la cuota de tu hipoteca, los intereses totales y la tabla de amortización, incluyendo enganche o pago inicial y abonos extra a capital.";
const path = "/calculadoras/calculadora-hipoteca";

export const Route = createFileRoute("/calculadoras/calculadora-hipoteca")({
  head: () => ({
    meta: [
      { title: `${title} | Finanzas a tu Bolsillo` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Finanzas a tu Bolsillo` },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: absoluteUrl(path) },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl(path) }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolPage
      title={title}
      category="Vivienda"
      intro="Una hipoteca suele ser el crédito más largo que firmarás. Introduce el precio de la vivienda, tu enganche o pago inicial, la tasa de interés y el plazo para ver la cuota y cuánto pagarás de intereses a lo largo de los años."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Lo que no incluye la cuota</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Al costo mensual hay que sumarle el seguro de la vivienda, los impuestos y el mantenimiento,
            además de los gastos de la compra (escrituración, avalúo y otros). Y ojo con el plazo:
            alargarlo baja la cuota, pero los intereses de una hipoteca a 20 o 30 años pueden superar
            el monto que pediste.
          </p>
        </>
      }
      guide={calculatorGuides["calculadora-hipoteca"]}
    >
      <AmortizationCalculator config={{
              "amountLabel": "Precio de la vivienda",
              "amountDefault": 200000,
              "amountMin": 20000,
              "amountMax": 2000000,
              "amountStep": 1000,
              "rateLabel": "Tasa de interés anual",
              "rateDefault": 3.5,
              "rateMax": 15,
              "monthsLabel": "Plazo",
              "monthsDefault": 300,
              "monthsMin": 60,
              "monthsMax": 480,
              "allowDownPayment": true,
              "downPaymentLabel": "Enganche o pago inicial",
              "downPaymentDefault": 40000,
              "allowExtra": true,
              "tableTitle": "Tabla de amortización de la hipoteca"
      }} />
    </ToolPage>
  );
}
