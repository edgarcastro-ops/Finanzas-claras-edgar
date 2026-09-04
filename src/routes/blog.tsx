import { createFileRoute, Link } from "@tanstack/react-router";
import { blogCategories, placeholderPosts } from "@/data/tools";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

const description =
  "Guías claras sobre ahorro, inversión, deudas y presupuesto. Próximamente publicaremos artículos nuevos cada semana.";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog de finanzas personales | FinanzasClaras" },
      { name: "description", content: description },
      { property: "og:title", content: "Blog de finanzas personales | FinanzasClaras" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6">
      <header className="max-w-2xl">
        <span className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
          Blog
        </span>
        <h1 className="mt-4 text-3xl font-bold sm:text-5xl">Aprende a manejar tu dinero</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Estamos preparando la biblioteca de artículos. Mientras tanto, puedes usar nuestras
          calculadoras para poner números a tus decisiones.
        </p>
        <Button asChild variant="hero" size="lg" className="mt-6">
          <Link to="/herramientas">Ver calculadoras</Link>
        </Button>
      </header>

      <section aria-label="Categorías" className="mt-12">
        <h2 className="font-display text-xl font-semibold">Categorías</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogCategories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 50}>
              <div className="card-hover h-full rounded-2xl border border-border bg-card p-5 shadow-soft">
                <h3 className="font-display text-base font-semibold">{cat.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-label="Próximos artículos" className="mt-12">
        <h2 className="font-display text-xl font-semibold">Próximos artículos</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {placeholderPosts.map((post, i) => (
            <Reveal as="li" key={post.title} delay={i * 60}>
              <article className="card-hover h-full rounded-2xl border border-dashed border-border bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                  {post.category}
                </p>
                <h3 className="mt-2 font-display text-base font-semibold">{post.title}</h3>
                <p className="mt-3 text-xs text-muted-foreground">{post.readTime} de lectura · Próximamente</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>
    </main>
  );
}
