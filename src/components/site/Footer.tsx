import { Link } from "@tanstack/react-router";
import { LineChart, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { blogCategories } from "@/data/tools";

const legalLinks = [
  "Aviso legal",
  "Política de privacidad",
  "Política de cookies",
  "Descargo de responsabilidad",
];

const socials = [
  { icon: Twitter, label: "X (Twitter)" },
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                <LineChart className="h-4.5 w-4.5" />
              </span>
              <span className="font-display text-lg font-bold">
                Finanzas<span className="text-brand">Claras</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Calculadoras y guías para tomar mejores decisiones con tu dinero. Sin jerga, sin humo.
            </p>
            <ul className="mt-5 flex gap-2">
              {socials.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href="#"
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Herramientas">
            <h2 className="text-sm font-semibold">Herramientas</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/herramientas/calculadora-interes-compuesto"
                  className="transition-colors hover:text-brand"
                >
                  Interés compuesto
                </Link>
              </li>
              <li>
                <Link
                  to="/herramientas/calculadora-prestamo-personal"
                  className="transition-colors hover:text-brand"
                >
                  Préstamo personal
                </Link>
              </li>
              <li>
                <Link
                  to="/herramientas/calculadora-tarjeta-credito"
                  className="transition-colors hover:text-brand"
                >
                  Tarjeta de crédito
                </Link>
              </li>
              <li>
                <Link to="/herramientas" className="transition-colors hover:text-brand">
                  Ver todas
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Categorías del blog">
            <h2 className="text-sm font-semibold">Categorías del blog</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {blogCategories.map((cat) => (
                <li key={cat.name}>
                  <Link to="/blog" className="transition-colors hover:text-brand">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h2 className="text-sm font-semibold">Legal</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {legalLinks.map((item) => (
                <li key={item}>
                  <span className="cursor-not-allowed opacity-70" title="Próximamente">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FinanzasClaras. Todos los derechos reservados.</p>
          <p>
            El contenido es informativo y no constituye asesoramiento financiero personalizado.
          </p>
        </div>
      </div>
    </footer>
  );
}
