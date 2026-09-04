import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AdSlot } from "@/components/site/AdSlot";
import { Reveal } from "@/components/site/Reveal";

interface ToolPageProps {
  title: string;
  category: string;
  intro: string;
  children: ReactNode;
  notes?: ReactNode;
}

export function ToolPage({ title, category, intro, children, notes }: ToolPageProps) {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-10 sm:px-6">
      <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-brand">
          Inicio
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/herramientas" className="transition-colors hover:text-brand">
          Herramientas
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate text-foreground">{title}</span>
      </nav>

      <article className="mt-6">
        <header className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
            {category}
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>
        </header>

        <Reveal className="mt-8">{children}</Reveal>

        <AdSlot className="mt-10" />

        {notes && (
          <section className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-soft">
            {notes}
          </section>
        )}
      </article>
    </main>
  );
}
