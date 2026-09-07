import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { CurrencyConverterCalculator } from "@/components/calculators/CurrencyConverterCalculator";

const title = "Conversor de moneda";
const description = "Convierte importes entre monedas introduciendo tú mismo el tipo de cambio, y calcula el impacto de las comisiones de cambio.";
const path = "/herramientas/conversor-de-moneda";

export const Route = createFileRoute(path)({
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
      category="Divisas"
      intro="Introduce el importe, el tipo de cambio que te ofrecen y la comisión aplicada para ver exactamente cuánto dinero recibes al final de la operación."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Por qué el tipo de cambio lo pones tú</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Las tasas de mercado cambian a cada minuto y la que realmente te aplican incluye el margen de tu banco o casa de cambio. Copiando la cifra concreta de tu operación el cálculo refleja lo que vas a recibir de verdad.
          </p>
        </>
      }
    >
      <CurrencyConverterCalculator />
    </ToolPage>
  );
}
