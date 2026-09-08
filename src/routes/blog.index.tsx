import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { blogCategories } from "@/data/tools";
import { posts } from "@/data/posts";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

const description =
  "Guías claras sobre ahorro, inversión, deudas y presupuesto para tomar mejores decisiones con tu dinero.";

export const Route = createFileRoute("/blog/")({
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
  const [category, setCategory] = useState("Todas");
  const [query, setQuery] = useState("");
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "Todas" || post.category === category;
      const matchesQuery =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6">
      <header className="max-w-2xl">
        <span className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
          Blog
        </span>
        <h1 className="mt-4 text-3xl font-bold sm:text-5xl">Aprende a manejar tu dinero</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Ideas prácticas para organizar tus finanzas, entender el crédito y construir hábitos que
          funcionen en tu vida real.
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
              <button
                type="button"
                onClick={() => setCategory(cat.name)}
                className={`card-hover h-full w-full rounded-2xl border bg-card p-5 text-left shadow-soft ${
                  category === cat.name ? "border-brand ring-2 ring-brand/20" : "border-border"
                }`}
              >
                <h3 className="font-display text-base font-semibold">{cat.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-label="Artículos" className="mt-12 pb-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold">Artículos recientes</h2>
            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
              {["Todas", ...blogCategories.map((cat) => cat.name)].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                    category === item
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-brand hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <label className="w-full sm:max-w-xs">
            <span className="sr-only">Buscar artículos</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar artículos..."
              className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>

        {filteredPosts.length > 0 ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 60}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="card-hover block h-full rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">{post.category}</p>
                  <h3 className="mt-2 font-display text-lg font-semibold">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {post.readTime} de lectura · {new Date(post.date).toLocaleDateString("es", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="mt-8 rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No encontramos artículos con esos criterios.
          </p>
        )}
      </section>
    </main>
  );
}
