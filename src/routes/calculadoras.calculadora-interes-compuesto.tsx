import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { CompoundCalculator } from "@/components/calculators/CompoundCalculator";
import { calculatorGuides } from "@/data/calculator-guides";
import { absoluteUrl } from "@/lib/seo";

const title = "Calculadora de interés compuesto";
const description =
  "Calcula cuánto crecerá tu dinero con aportes mensuales: gráfico de crecimiento, tabla anual y total de intereses generados.";
const path = "/calculadoras/calculadora-interes-compuesto";

export const Route = createFileRoute("/calculadoras/calculadora-interes-compuesto")({
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
      category="Inversión"
      intro="El interés compuesto hace que tus ganancias generen nuevas ganancias. Introduce tu capital inicial, cuánto aportas cada mes y la tasa anual que esperas: verás año a año cuánto pusiste tú y cuánto trabajó tu dinero por ti."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Cómo interpretar el resultado</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            La simulación capitaliza mensualmente y asume una tasa constante. En la práctica los
            mercados suben y bajan, así que utiliza este cálculo como referencia de largo plazo y no
            como una promesa de rendimiento. Cuanto antes empieces, mayor será la parte del
            resultado que proviene de los intereses y no de tu bolsillo.
          </p>
        </>
      }
      guide={calculatorGuides["calculadora-interes-compuesto"]}
    >
      <CompoundCalculator />
    </ToolPage>
  );
}
