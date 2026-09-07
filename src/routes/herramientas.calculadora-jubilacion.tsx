import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { RetirementCalculator } from "@/components/calculators/RetirementCalculator";

const title = "Calculadora de jubilación y retiro";
const description = "Proyecta el capital que tendrás al jubilarte según tu edad, tus aportes mensuales y el rendimiento esperado, y la renta que podrías retirar.";
const path = "/herramientas/calculadora-jubilacion";

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
      category="Jubilación"
      intro="Introduce tu edad, cuándo quieres retirarte y cuánto aportas cada mes. Verás el capital estimado al llegar a esa edad y la renta mensual que podría sostener."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Sobre la renta estimada</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            La renta mensual usa la regla del 4% anual, una referencia habitual de planificación a largo plazo. No contempla impuestos, inflación ni pensión pública: úsala para dimensionar el orden de magnitud de tu esfuerzo de ahorro.
          </p>
        </>
      }
    >
      <RetirementCalculator />
    </ToolPage>
  );
}
