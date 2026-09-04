import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CalcShell({ inputs, children }: { inputs: ReactNode; children: ReactNode }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="h-fit space-y-6 rounded-2xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-24"
      >
        <h2 className="font-display text-base font-semibold">Tus datos</h2>
        {inputs}
        <p className="text-xs leading-relaxed text-muted-foreground">
          Los resultados se actualizan en tiempo real mientras ajustas los valores.
        </p>
      </form>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function ResultStat({
  label,
  value,
  sub,
  highlight,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "card-hover rounded-2xl border border-border p-5 shadow-soft",
        highlight ? "bg-gradient-brand text-primary-foreground" : "bg-card",
      )}
    >
      <p className={cn("text-xs font-medium uppercase tracking-wide", highlight ? "opacity-80" : "text-muted-foreground")}>
        {label}
      </p>
      <p
        className={cn(
          "mt-2 font-display text-2xl font-bold tabular-nums transition-all duration-300",
          accent && !highlight && "text-brand",
        )}
      >
        {value}
      </p>
      {sub && (
        <p className={cn("mt-1 text-xs", highlight ? "opacity-80" : "text-muted-foreground")}>{sub}</p>
      )}
    </div>
  );
}

export function ChartCard({
  title,
  children,
  height = 300,
}: {
  title: string;
  children: ReactNode;
  height?: number;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <h2 className="font-display text-base font-semibold">{title}</h2>
      <div className="mt-4 w-full" style={{ height }}>
        {children}
      </div>
    </div>
  );
}
