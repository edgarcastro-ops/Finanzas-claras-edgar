import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, LineChart, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrencySelect } from "@/components/site/CurrencySelect";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/blog", label: "Blog" },
  { to: "/herramientas", label: "Herramientas" },
  { to: "/sobre-nosotros", label: "Sobre nosotros" },
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("fc-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("fc-theme", next ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/85 shadow-soft backdrop-blur-xl"
          : "border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
            <LineChart className="h-4.5 w-4.5" />
          </span>
          <span className="truncate font-display text-lg font-bold tracking-tight">
            Finanzas<span className="text-brand">Claras</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav aria-label="Navegación principal" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <CurrencySelect />
          <ThemeToggle />
          <Button asChild variant="brand" size="sm" className="ml-1 hidden md:inline-flex">
            <Link to="/herramientas">Calcular ahora</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav aria-label="Navegación móvil" className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
