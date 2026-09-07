import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { BudgetCalculator } from "@/components/calculators/BudgetCalculator";

const title = "Calculadora de presupuesto mensual 50/30/20";
const description = "Reparte tu ingreso mensual entre necesidades, gustos y ahorro con la regla 50/30/20 y ajusta los porcentajes a tu realidad.";
const path = "/herramientas/calculadora-presupuesto-mensual";

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
      category="Presupuesto"
      intro="Introduce tu ingreso neto y reparte tu dinero entre lo imprescindible, lo que disfrutas y lo que guardas. La regla 50/30/20 es un punto de partida, no una camisa de fuerza."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Adapta los porcentajes</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            En ciudades con alquileres altos es normal que las necesidades superen el 50%. Lo importante es que el ahorro nunca sea lo que sobra al final del mes, sino una cantidad que apartas al principio.
          </p>
        </>
      }
    >
      <BudgetCalculator />
    </ToolPage>
  );
}
