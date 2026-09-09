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
  Lock,
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
  "calculadora-interes-compuesto": "/herramientas/calculadora-interes-compuesto",
  "calculadora-prestamo-personal": "/herramientas/calculadora-prestamo-personal",
  "calculadora-tarjeta-credito": "/herramientas/calculadora-tarjeta-credito",
} as const;

type ActiveSlug = keyof typeof activePaths;

function CardBody({ tool }: { tool: Tool }) {
  const Icon = icons[tool.icon];
  const disabled = tool.status !== "activa";
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-accent-foreground">
          {disabled ? <Lock className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
        </span>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">
          {disabled ? "Próximamente" : tool.category}
        </span>
      </div>
      <h3 className="mt-4 font-display text-base font-semibold">{tool.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.short}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        {disabled ? "Disponible pronto" : "Usar calculadora"}
        {!disabled && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
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
      aria-label={favorite ? `Quitar ${tool.title} de favoritos` : `Guardar ${tool.title} en favoritos`}
      aria-pressed={favorite}
      className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-brand hover:text-brand"
    >
      <Star className={`h-4 w-4 ${favorite ? "fill-brand text-brand" : ""}`} />
    </button>
  );

  if (tool.status !== "activa") {
    return (
      <div className={`${base} opacity-70`} aria-disabled="true">
        {favoriteButton}
        <CardBody tool={tool} />
      </div>
    );
  }

  return <div className={base}>{favoriteButton}<Link to={activePaths[tool.slug as ActiveSlug]} className="block"><CardBody tool={tool} /></Link></div>;
}
