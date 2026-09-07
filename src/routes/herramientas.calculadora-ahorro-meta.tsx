import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { SavingsGoalCalculator } from "@/components/calculators/SavingsGoalCalculator";

const title = "Calculadora de meta de ahorro";
const description = "Calcula cuánto ahorrar cada mes para alcanzar tu meta en el plazo que te propongas, con o sin rendimiento.";
const path = "/herramientas/calculadora-ahorro-meta";

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
      category="Ahorro"
      intro="Define cuánto dinero necesitas, en cuánto tiempo lo quieres y qué tienes ahorrado hoy. Verás el aporte mensual exacto y cómo avanza tu meta mes a mes."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Cómo usar esta meta</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Trata el aporte mensual como un gasto fijo más y prográmalo el mismo día que cobras. Si la cifra te parece alta, alarga el plazo o baja el objetivo: es preferible una meta realista que sostienes a una ambiciosa que abandonas al segundo mes.
          </p>
        </>
      }
    >
      <SavingsGoalCalculator />
    </ToolPage>
  );
}
