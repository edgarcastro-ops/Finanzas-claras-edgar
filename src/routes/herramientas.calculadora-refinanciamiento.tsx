import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { RefinanceCalculator } from "@/components/calculators/RefinanceCalculator";

const title = "Calculadora de refinanciamiento de préstamo";
const description = "Compara tu préstamo actual con una nueva oferta y descubre si refinanciar te ahorra dinero, incluyendo comisiones.";
const path = "/herramientas/calculadora-refinanciamiento";

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
      intro="Pon los datos de tu crédito vigente y los de la oferta nueva. Verás la diferencia de cuota, de intereses totales y en cuántos meses recuperas los gastos del cambio."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">El punto de equilibrio manda</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Refinanciar rara vez es gratis: hay comisión de cancelación y gastos de apertura. Si piensas vender o cancelar el préstamo antes del punto de equilibrio, el cambio no compensa por muy baja que sea la nueva tasa.
          </p>
        </>
      }
    >
      <RefinanceCalculator />
    </ToolPage>
  );
}
