import { createFileRoute } from "@tanstack/react-router";
import { tools } from "@/data/tools";
import { ToolCard } from "@/components/site/ToolCard";
import { Reveal } from "@/components/site/Reveal";
import { AdSlot } from "@/components/site/AdSlot";

export const Route = createFileRoute("/herramientas/")({
  head: () => ({
    meta: [
      { title: "Calculadoras financieras gratuitas | FinanzasClaras" },
      {
        name: "description",
        content:
          "Calculadoras de interés compuesto, préstamos personales y tarjetas de crédito. Gratis, sin registro y con resultados al instante.",
      },
      { property: "og:title", content: "Calculadoras financieras gratuitas | FinanzasClaras" },
      {
        property: "og:description",
        content: "Herramientas para calcular inversiones, cuotas de préstamo y deudas de tarjeta.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/herramientas" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/herramientas" }],
  }),
  component: HerramientasPage,
});

function HerramientasPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6">
      <header className="max-w-2xl">
        <span className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
          Herramientas
        </span>
        <h1 className="mt-4 text-3xl font-bold sm:text-5xl">Calculadoras financieras gratuitas</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Simula escenarios reales con tus propios números. Todas las calculadoras funcionan en tu
          navegador, son gratuitas y no requieren registro.
        </p>
      </header>

      <section aria-label="Listado de calculadoras" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, i) => (
          <Reveal key={tool.slug} delay={i * 60}>
            <ToolCard tool={tool} />
          </Reveal>
        ))}
      </section>

      <AdSlot className="mt-14" />
    </main>
  );
}
