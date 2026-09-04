import { cn } from "@/lib/utils";

interface AdSlotProps {
  label?: string;
  className?: string;
  variant?: "banner" | "box";
}

/**
 * Reserved advertising space (Google AdSense will be injected here later).
 */
export function AdSlot({ label = "Espacio publicitario", className, variant = "banner" }: AdSlotProps) {
  return (
    <aside
      aria-label="Publicidad"
      className={cn(
        "flex w-full items-center justify-center rounded-xl border border-dashed border-border bg-surface text-xs uppercase tracking-[0.18em] text-muted-foreground",
        variant === "banner" ? "min-h-[90px] px-4 py-6" : "min-h-[250px] px-4 py-8",
        className,
      )}
    >
      {/* AD SLOT */}
      <span>{label}</span>
    </aside>
  );
}
