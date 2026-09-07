import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "@/components/site/ToolPage";
import { NetSalaryCalculator } from "@/components/calculators/NetSalaryCalculator";

const title = "Calculadora de salario neto a partir del bruto";
const description = "Convierte tu sueldo bruto en neto descontando impuestos y seguridad social, con el desglose mensual y anual.";
const path = "/herramientas/calculadora-salario-neto";

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
      category="Ingresos"
      intro="Introduce tu salario bruto anual, el número de pagas y los porcentajes de retención y seguridad social que se te aplican para ver tu sueldo neto real."
      notes={
        <>
          <h2 className="font-display text-lg font-semibold">Los porcentajes son configurables</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Cada país (y cada situación personal) tiene sus propios tramos y deducciones. Ajusta los porcentajes con los datos de tu nómina para que el resultado coincida con lo que recibes en el banco.
          </p>
        </>
      }
    >
      <NetSalaryCalculator />
    </ToolPage>
  );
}
