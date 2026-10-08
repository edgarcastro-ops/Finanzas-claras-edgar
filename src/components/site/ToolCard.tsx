import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CreditCard,
  Landmark,
  PiggyBank,
  Receipt,
  Target,
  TrendingUp,
  Wallet,
  Home,
  Star,
} from "lucide-react";
import type { Tool } from "@/data/tools";

const icons = {
  trending: TrendingUp,
  landmark: Landmark,
  credit: CreditCard,
  piggy: PiggyBank,
  home: Home,
  receipt: Receipt,
  wallet: Wallet,
  target: Target,
};

const activePaths = {
  "calculadora-interes-compuesto": "/calculadoras/calculadora-interes-compuesto",
  "calculadora-prestamo-personal": "/calculadoras/calculadora-prestamo-personal",
  "calculadora-tarjeta-credito": "/calculadoras/calculadora-tarjeta-credito",
  "calculadora-ahorro-meta": "/calculadoras/calculadora-ahorro-meta",
  "calculadora-hipoteca": "/calculadoras/calculadora-hipoteca",
  "calculadora-presupuesto-mensual": "/calculadoras/calculadora-presupuesto-mensual",
  "calculadora-pago-deudas": "/calculadoras/calculadora-pago-deudas",
  "calculadora-jubilacion": "/calculadoras/calculadora-jubilacion",
  "conversor-de-moneda": "/calculadoras/conversor-de-moneda",
  "calculadora-salario-neto": "/calculadoras/calculadora-salario-neto",
  "calculadora-prestamo-vehicular": "/calculadoras/calculadora-prestamo-vehicular",
  "calculadora-prestamo-estudiantil": "/calculadoras/calculadora-prestamo-estudiantil",
  "calculadora-prestamo-empresarial": "/calculadoras/calculadora-prestamo-empresarial",
  "calculadora-refinanciamiento": "/calculadoras/calculadora-refinanciamiento",
  "calculadora-capacidad-endeudamiento": "/calculadoras/calculadora-capacidad-endeudamiento",
  "comparador-de-prestamos": "/calculadoras/comparador-de-prestamos",
  "calculadora-pago-anticipado": "/calculadoras/calculadora-pago-anticipado",
  "calculadora-prestaciones-rd": "/calculadoras/calculadora-prestaciones-rd",
  "calculadora-finiquito-mexico": "/calculadoras/calculadora-finiquito-mexico",
} as const;

type ActiveSlug = keyof typeof activePaths;

function CardBody({ tool }: { tool: Tool }) {
  const Icon = icons[tool.icon];
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-accent-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
          {tool.category}
        </span>
      </div>
      <h3 className="mt-4 font-display text-base font-semibold">{tool.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.short}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        Usar calculadora
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </>
  );
}

export function ToolCard({ tool }: { tool: Tool }) {
  const [favorite, setFavorite] = useState(false);
  const base =
    "group card-hover relative block h-full rounded-2xl border border-border bg-card p-6 shadow-soft";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorite-tools") ?? "[]") as string[];
    setFavorite(stored.includes(tool.slug));
  }, [tool.slug]);

  const toggleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorite-tools") ?? "[]") as string[];
    const next = stored.includes(tool.slug)
      ? stored.filter((slug) => slug !== tool.slug)
      : [...stored, tool.slug];
    localStorage.setItem("favorite-tools", JSON.stringify(next));
    setFavorite(next.includes(tool.slug));
  };

  const favoriteButton = (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label={
        favorite ? `Quitar ${tool.title} de favoritos` : `Guardar ${tool.title} en favoritos`
      }
      aria-pressed={favorite}
      className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-brand hover:text-brand"
    >
      <Star className={`h-4 w-4 ${favorite ? "fill-brand text-brand" : ""}`} />
    </button>
  );

  return (
    <div className={base}>
      {favoriteButton}
      <Link to={activePaths[tool.slug as ActiveSlug]} className="block">
        <CardBody tool={tool} />
      </Link>
    </div>
  );
}
