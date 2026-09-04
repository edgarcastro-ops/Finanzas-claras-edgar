import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { CreditCardCalculator } from "@/components/calculators/CreditCardCalculator";

const title = "Calculadora de tarjeta de crédito";
const description =
  "Descubre en cuánto tiempo saldas la deuda de tu tarjeta y cuánto ahorras frente a pagar solo el mínimo mensual.";

export const Route = createFileRoute("/herramientas/calculadora-tarjeta-credito")({
  head: () => ({
    meta: [
      { title: `${title} | FinanzasClaras` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | FinanzasClaras` },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/herramientas/calculadora-tarjeta-credito" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/herramientas/calculadora-tarjeta-credito" }],
  }),
  component: Page,
});

function Page() {
  return (
    <ToolPage
      title={title}
      category="Deuda"
      intro="Pagar solo el mínimo de la tarjeta puede convertir una deuda pequeña en años de intereses. Introduce tu saldo, la tasa anual y el pago mensual que puedes asumir para comparar ambos escenarios."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Sobre el pago mínimo</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Para el escenario de pago mínimo usamos una regla habitual: el 2% del saldo más los
            intereses del mes, con un suelo de 25 $. Cada emisor aplica su propia fórmula, así que
            revisa tu contrato. La conclusión no cambia: cualquier importe fijo por encima del mínimo
            reduce drásticamente el tiempo y el coste total de la deuda.
          </p>
        </>
      }
    >
      <CreditCardCalculator />
    </ToolPage>
  );
}
