import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { DebtCapacityCalculator } from "@/components/calculators/DebtCapacityCalculator";

const title = "Calculadora de capacidad de endeudamiento (DTI)";
const description = "Calcula qué porcentaje de tu ingreso se va en deudas y cuál es la cuota máxima que puedes asumir antes de pedir un crédito.";
const path = "/herramientas/calculadora-capacidad-endeudamiento";

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
      intro="Antes de solicitar un préstamo, comprueba si la cuota cabe en tu presupuesto. Introduce tus ingresos, las cuotas que ya pagas y la cuota del nuevo crédito para ver tu nivel de endeudamiento."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Por qué el 35% es la referencia</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            La mayoría de entidades no quiere que las cuotas de deuda superen entre el 30% y el 40% de tu ingreso neto. Puedes ajustar ese límite arriba, pero cuanto más lo estires, menos margen tendrás ante un imprevisto.
          </p>
        </>
      }
    >
      <DebtCapacityCalculator />
    </ToolPage>
  );
}
