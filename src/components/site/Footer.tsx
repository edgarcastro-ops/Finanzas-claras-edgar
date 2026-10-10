import { Link } from "@tanstack/react-router";
import { LineChart } from "lucide-react";
import { blogCategories } from "@/data/tools";

const legalLinks = [
  { label: "Aviso legal", to: "/aviso-legal" },
  { label: "Política de privacidad", to: "/privacidad" },
  { label: "Política de cookies", to: "/cookies" },
  { label: "Términos y condiciones", to: "/terminos" },
  { label: "Contacto", to: "/contacto" },
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
                Finanzas <span className="text-brand">a tu Bolsillo</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Calculadoras y guías para tomar mejores decisiones con tu dinero. Sin jerga, sin humo.
            </p>
          </div>

          <nav aria-label="Calculadoras">
            <h2 className="text-sm font-semibold">Calculadoras</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/calculadoras/calculadora-interes-compuesto"
                  className="transition-colors hover:text-brand"
                >
                  Interés compuesto
                </Link>
              </li>
              <li>
                <Link
                  to="/calculadoras/calculadora-prestamo-personal"
                  className="transition-colors hover:text-brand"
                >
                  Préstamo personal
                </Link>
              </li>
              <li>
                <Link
                  to="/calculadoras/calculadora-tarjeta-credito"
                  className="transition-colors hover:text-brand"
                >
                  Tarjeta de crédito
                </Link>
              </li>
              <li>
                <Link to="/calculadoras" className="transition-colors hover:text-brand">
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
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Finanzas a tu Bolsillo. Todos los derechos reservados.</p>
          <p>
            El contenido es informativo y no constituye asesoramiento financiero personalizado.
          </p>
        </div>
      </div>
    </footer>
  );
}
