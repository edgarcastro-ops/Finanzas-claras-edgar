import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { NetSalaryCalculator } from "@/components/calculators/NetSalaryCalculator";
import { calculatorGuides } from "@/data/calculator-guides";
import { absoluteUrl } from "@/lib/seo";

const title = "Calculadora de salario neto estimado";
const description = "Estima tu salario neto con los porcentajes de descuento que ingreses; no aplica tablas tributarias de ningún país.";
const path = "/calculadoras/calculadora-salario-neto";

export const Route = createFileRoute("/calculadoras/calculadora-salario-neto")({
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
      category="Ingresos"
      intro="Introduce tu salario, el número de pagas y los porcentajes de descuento que quieras considerar para obtener una estimación de tu sueldo neto."
      guide={calculatorGuides["calculadora-salario-neto"]}
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Los porcentajes son configurables</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Cada país y cada situación personal tiene reglas propias. Esta herramienta no aplica tablas de impuestos ni de seguridad social de ningún país: introduce tus porcentajes de descuento y contrasta el resultado con tu nómina.
          </p>
        </>
      }
    >
      <NetSalaryCalculator />
    </ToolPage>
  );
}
