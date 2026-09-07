import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { PrepaymentCalculator } from "@/components/calculators/PrepaymentCalculator";

const title = "Calculadora de pago anticipado de préstamo";
const description = "Descubre cuánto ahorras en intereses y cuántos meses te quitas abonando capital extra a tu préstamo cada mes o de una sola vez.";
const path = "/herramientas/calculadora-pago-anticipado";

export const Route = createFileRoute("/herramientas/calculadora-pago-anticipado")({
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
      intro="Abonar capital extra reduce la deuda directamente, así que los intereses de todos los meses siguientes bajan. Introduce tu saldo pendiente y cuánto puedes abonar para ver el ahorro."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Revisa la comisión por amortización anticipada</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Algunos contratos cobran un porcentaje por adelantar capital y otros no permiten hacerlo libremente. Consulta esa cláusula antes: si la comisión es baja, el ahorro en intereses casi siempre compensa.
          </p>
        </>
      }
    >
      <PrepaymentCalculator />
    </ToolPage>
  );
}
