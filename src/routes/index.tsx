import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Gauge, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { AdSlot } from "@/components/site/AdSlot";
import { ToolCard } from "@/components/site/ToolCard";
import { activeTools, blogCategories, placeholderPosts } from "@/data/tools";

const description =
  "Calculadoras gratuitas de interés compuesto, préstamos y tarjetas de crédito, más guías claras para ahorrar, invertir y salir de deudas.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FinanzasClaras — Calculadoras y guías de finanzas personales" },
      { name: "description", content: description },
      {
        property: "og:title",
        content: "FinanzasClaras — Calculadoras y guías de finanzas personales",
      },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const highlights = [
  { icon: Gauge, title: "Resultados al instante", text: "Mueve un valor y todo se recalcula en tiempo real." },
  { icon: ShieldCheck, title: "Sin registro ni datos", text: "Todo se calcula en tu navegador. Nada se envía a un servidor." },
  { icon: BadgeCheck, title: "Fórmulas transparentes", text: "Explicamos el método detrás de cada resultado." },
];

function Index() {
  return (
    <main>
      <section className="hero-surface relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-14 sm:px-6 sm:pt-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground shadow-soft">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              3 calculadoras gratuitas, sin registro
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-6xl">
              Decisiones de dinero <span className="text-gradient-brand">con números claros</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Simula tus inversiones, tus préstamos y tus deudas en segundos. FinanzasClaras
              convierte fórmulas complicadas en respuestas que puedes usar hoy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/herramientas">
                  Explorar calculadoras <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/sobre-nosotros">Conoce el proyecto</Link>
              </Button>
            </div>
          </div>

          <ul className="mt-14 grid gap-4 sm:grid-cols-3">
            {highlights.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 80}>
                <div className="card-hover h-full rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <item.icon className="h-5 w-5 text-brand" />
                  <h2 className="mt-3 font-display text-sm font-semibold">{item.title}</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdSlot />
      </div>

      <section aria-labelledby="herramientas-destacadas" className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <Reveal>
          <div className="grid gap-4 sm:flex sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2 id="herramientas-destacadas" className="text-2xl font-bold sm:text-3xl">
                Herramientas destacadas
              </h2>
              <p className="mt-3 text-muted-foreground">
                Las tres calculadoras que más ayudan a poner orden en tus finanzas.
              </p>
            </div>
            <Link
              to="/herramientas"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              Ver todas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activeTools.map((tool, i) => (
            <Reveal key={tool.slug} delay={i * 70}>
              <ToolCard tool={tool} />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="ultimos-articulos" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <h2 id="ultimos-articulos" className="text-2xl font-bold sm:text-3xl">
            Últimos artículos del blog
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Estamos preparando la primera tanda de guías. Estos serán los primeros en publicarse.
          </p>
        </Reveal>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          {placeholderPosts.map((post, i) => (
            <Reveal as="li" key={post.title} delay={i * 70}>
              <article className="card-hover h-full rounded-2xl border border-dashed border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                  {post.category}
                </p>
                <h3 className="mt-3 font-display text-base font-semibold">{post.title}</h3>
                <p className="mt-4 text-xs text-muted-foreground">
                  {post.readTime} de lectura · Próximamente
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="categorias" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <h2 id="categorias" className="text-2xl font-bold sm:text-3xl">
            Explora por categoría
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogCategories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 50}>
              <Link
                to="/blog"
                className="card-hover group block h-full rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <h3 className="font-display text-base font-semibold">{cat.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Ver artículos
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <AdSlot />
      </div>
    </main>
  );
}
