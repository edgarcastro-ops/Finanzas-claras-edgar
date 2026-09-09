import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const consentKey = "cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(consentKey) === null);
  }, []);

  const choose = (value: "accepted" | "rejected") => {
    localStorage.setItem(consentKey, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed inset-x-4 bottom-4 z-[60] rounded-2xl border border-border bg-card p-5 shadow-2xl sm:inset-x-auto sm:right-6 sm:max-w-md"
    >
      <h2 className="font-display text-lg font-semibold">Usamos cookies 🍪</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Utilizamos cookies propias y de terceros (incluido Google AdSense) para mejorar tu experiencia,
        analizar el tráfico del sitio y mostrar publicidad relevante.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
        >
          Aceptar todas
        </button>
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          Rechazar no esenciales
        </button>
        <Link to="/cookies" className="px-2 py-2 text-sm font-semibold text-brand hover:underline">
          Más información
        </Link>
      </div>
    </aside>
  );
}
