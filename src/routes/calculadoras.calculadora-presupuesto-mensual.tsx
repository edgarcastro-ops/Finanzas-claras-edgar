import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { BudgetCalculator } from "@/components/calculators/BudgetCalculator";
import { calculatorGuides } from "@/data/calculator-guides";
import { absoluteUrl } from "@/lib/seo";

const title = "Calculadora de presupuesto mensual";
const description = "Registra tus ingresos y gastos del mes y ve tu balance y tu tasa de ahorro.";
const path = "/calculadoras/calculadora-presupuesto-mensual";

export const Route = createFileRoute("/calculadoras/calculadora-presupuesto-mensual")({
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
      category="Presupuesto"
      intro="Registra tus ingresos y gastos del mes para ver tu balance y tu tasa de ahorro. También puedes comparar tus categorías con la referencia 50/30/20."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Adapta los porcentajes</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            En ciudades con alquileres altos es normal que las necesidades superen el 50%. Lo
            importante es que el ahorro nunca sea lo que sobra al final del mes, sino una cantidad
            que apartas al principio.
          </p>
        </>
      }
      guide={calculatorGuides["calculadora-presupuesto-mensual"]}
    >
      <BudgetCalculator />
    </ToolPage>
  );
}
