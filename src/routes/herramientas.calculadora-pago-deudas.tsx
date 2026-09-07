import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { DebtStrategyCalculator } from "@/components/calculators/DebtStrategyCalculator";

const title = "Calculadora de pago de deudas: bola de nieve vs. avalancha";
const description = "Compara el método bola de nieve y el método avalancha para saber cuál elimina tus deudas antes y con menos intereses.";
const path = "/herramientas/calculadora-pago-deudas";

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
      category="Deuda"
      intro="Carga tus deudas con su saldo, tasa y pago mínimo, y añade cuánto extra puedes destinar cada mes. Compararemos las dos estrategias más usadas para salir de deudas."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Cuál elegir</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            La avalancha (pagar primero la tasa más alta) siempre ahorra más intereses en el papel. La bola de nieve (liquidar primero la deuda más pequeña) gana en motivación porque cierras cuentas antes. Si la diferencia en dinero es pequeña, elige la que te haga sostener el plan.
          </p>
        </>
      }
    >
      <DebtStrategyCalculator />
    </ToolPage>
  );
}
