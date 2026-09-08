import { createFileRoute, Link } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Clock3 } from "lucide-react";
import { AdSlot } from "@/components/site/AdSlot";
import { Reveal } from "@/components/site/Reveal";
import { posts } from "@/data/posts";
import { tools } from "@/data/tools";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = posts.find((item) => item.slug === params.slug);
    const title = post?.title ?? "Artículo de finanzas personales";
    const description = post?.excerpt ?? "Guías claras de finanzas personales en FinanzasClaras.";
    const path = `/blog/${params.slug}`;

    return {
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
    };
  },
  component: PostPage,
});

function slugifyHeading(heading: string) {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getHeadings(content: string) {
  return content
    .split("\n")
    .map((line) => line.match(/^(#{2,3})\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({ level: match[1].length, title: match[2], id: slugifyHeading(match[2]) }));
}

function ArticleBody({ content }: { content: string }) {
  const blocks = content.split(/\n\s*\n/);
  let paragraphCount = 0;

  return (
    <div className="prose prose-slate max-w-none text-foreground">
      {blocks.map((block, index) => {
        const trimmedBlock = block.trim();
        const isParagraph = Boolean(trimmedBlock) && !/^#{2,3}\s|^>|^[-*]\s/.test(trimmedBlock);
        if (isParagraph) paragraphCount += 1;
        const shouldShowAd = isParagraph && (paragraphCount === 2 || paragraphCount === 4);

        return (
          <div key={`${trimmedBlock.slice(0, 24)}-${index}`}>
            <ReactMarkdown
              components={{
                h2: ({ children }) => {
                  const text = String(children);
                  return (
                    <h2 id={slugifyHeading(text)} className="mt-10 scroll-mt-24 font-display text-2xl font-bold">
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => {
                  const text = String(children);
                  return (
                    <h3 id={slugifyHeading(text)} className="mt-8 scroll-mt-24 font-display text-xl font-semibold">
                      {children}
                    </h3>
                  );
                },
                p: ({ children }) => <p className="mt-5 text-base leading-8 text-muted-foreground">{children}</p>,
                blockquote: ({ children }) => (
                  <blockquote className="my-7 border-l-4 border-brand bg-brand-soft px-5 py-4 text-base italic leading-7 text-foreground">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {trimmedBlock}
            </ReactMarkdown>
            {shouldShowAd && <AdSlot />}
          </div>
        );
      })}
    </div>
  );
}

function PostPage() {
  const { slug } = Route.useParams();
  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-bold">Artículo no encontrado</h1>
        <p className="mt-4 text-muted-foreground">El artículo que buscas no existe o fue movido.</p>
        <Link to="/blog" className="mt-8 inline-flex items-center gap-2 font-semibold text-brand hover:underline">
          <ArrowLeft className="h-4 w-4" /> Volver al blog
        </Link>
      </main>
    );
  }

  const headings = getHeadings(post.content);
  const relatedTool = tools.find((tool) => tool.slug === post.relatedToolSlug);
  const relatedPosts = posts.filter((item) => item.category === post.category && item.slug !== post.slug).slice(0, 3);
  const formattedDate = new Date(post.date).toLocaleDateString("es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumbs" className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground hover:underline">Inicio</Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:text-foreground hover:underline">Blog</Link>
        <span className="mx-2">/</span>
        <span>{post.category}</span>
        <span className="mx-2">/</span>
        <span className="text-foreground">{post.title}</span>
      </nav>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
        <article>
          <header className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">{post.category}</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
            <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{formattedDate}</span>
              <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4" />{post.readTime} de lectura</span>
            </div>
          </header>

          <div className="mt-10 max-w-3xl">
            <ArticleBody content={post.content} />
          </div>

          {relatedTool && (
            <Reveal className="mt-12 max-w-3xl">
              <Link to={relatedTool.href} className="card-hover block rounded-2xl border border-brand/30 bg-brand-soft p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">Calculadora relacionada</p>
                <h2 className="mt-2 font-display text-xl font-semibold">{relatedTool.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{relatedTool.short}</p>
                <span className="mt-4 inline-flex text-sm font-semibold text-brand">Probar calculadora →</span>
              </Link>
            </Reveal>
          )}
        </article>

        {headings.length > 0 && (
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h2 className="font-display text-sm font-semibold">En este artículo</h2>
              <nav aria-label="Tabla de contenidos" className="mt-4 space-y-3">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block text-sm text-muted-foreground hover:text-brand ${heading.level === 3 ? "pl-3" : "font-semibold"}`}
                  >
                    {heading.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>

      {relatedPosts.length > 0 && (
        <section aria-labelledby="articulos-relacionados" className="mt-16 border-t border-border pt-10">
          <h2 id="articulos-relacionados" className="font-display text-2xl font-bold">Artículos relacionados</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.slug} to="/blog/$slug" params={{ slug: relatedPost.slug }} className="card-hover rounded-2xl border border-border bg-card p-5 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">{relatedPost.category}</p>
                <h3 className="mt-2 font-display font-semibold">{relatedPost.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{relatedPost.readTime} de lectura</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
