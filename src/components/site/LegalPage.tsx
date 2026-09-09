import { Link } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";

interface LegalPageProps {
  title: string;
  description: string;
  content: string;
}

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
    .map((line) => line.match(/^##\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({ title: match[1], id: slugifyHeading(match[1]) }));
}

export function LegalPage({ title, description, content }: LegalPageProps) {
  const headings = getHeadings(content);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">FinanzasClaras</p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
        <article className="max-w-3xl">
          <ReactMarkdown
            components={{
              h1: () => null,
              h2: ({ children }) => {
                const text = String(children);
                return (
                  <h2 id={slugifyHeading(text)} className="mt-10 scroll-mt-24 font-display text-2xl font-bold">
                    {children}
                  </h2>
                );
              },
              p: ({ children }) => <p className="mt-5 text-base leading-8 text-muted-foreground">{children}</p>,
              ul: ({ children }) => <ul className="mt-5 list-disc space-y-3 pl-6 text-base leading-7 text-muted-foreground">{children}</ul>,
              li: ({ children }) => <li>{children}</li>,
              table: ({ children }) => (
                <div className="mt-6 overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[520px] border-collapse text-left text-sm">{children}</table>
                </div>
              ),
              th: ({ children }) => <th className="border-b border-border bg-secondary px-4 py-3 font-semibold">{children}</th>,
              td: ({ children }) => <td className="border-b border-border px-4 py-3 text-muted-foreground">{children}</td>,
              a: ({ href, children }) =>
                href?.startsWith("/") ? (
                  <Link to={href} className="font-medium text-brand hover:underline">
                    {children}
                  </Link>
                ) : (
                  <a href={href} className="font-medium text-brand hover:underline" rel="noreferrer">
                    {children}
                  </a>
                ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>

        {headings.length > 0 && (
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <h2 className="font-display text-sm font-semibold">En esta página</h2>
              <nav aria-label="Tabla de contenidos" className="mt-4 space-y-3">
                {headings.map((heading) => (
                  <a key={heading.id} href={`#${heading.id}`} className="block text-sm text-muted-foreground hover:text-brand">
                    {heading.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
