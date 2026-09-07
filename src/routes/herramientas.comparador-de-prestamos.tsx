import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { LoanComparisonCalculator } from "@/components/calculators/LoanComparisonCalculator";

const title = "Comparador de préstamos: hasta 3 ofertas lado a lado";
const description = "Compara tres ofertas de préstamo a la vez: cuota, intereses, comisiones y coste total, para saber cuál sale realmente más barata.";
const path = "/herramientas/comparador-de-prestamos";

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
      category="Crédito"
      intro="La oferta con la cuota más baja no siempre es la más barata. Introduce hasta tres propuestas con su importe, tasa, plazo y comisión de apertura para verlas comparadas una al lado de la otra."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Compara el coste total, no la cuota</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Un plazo más largo baja la cuota y sube los intereses. Fíjate en la fila de coste del crédito: es la suma de intereses y comisiones, es decir, lo que realmente te cobra el banco por prestarte el dinero.
          </p>
        </>
      }
    >
      <LoanComparisonCalculator />
    </ToolPage>
  );
}
