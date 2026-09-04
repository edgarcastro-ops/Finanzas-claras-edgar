import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Users, Calculator, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/site/AdSlot";

const description =
  "Conoce al equipo de FinanzasClaras: explicamos las finanzas personales sin jerga y creamos calculadoras gratuitas que puedes usar hoy mismo.";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre nosotros | FinanzasClaras" },
      { name: "description", content: description },
      { property: "og:title", content: "Sobre nosotros | FinanzasClaras" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sobre-nosotros" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/sobre-nosotros" }],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: ShieldCheck,
    title: "Independencia",
    text: "No vendemos productos financieros. Nuestro contenido no está condicionado por ningún banco.",
  },
  {
    icon: Calculator,
    title: "Números antes que opiniones",
    text: "Cada recomendación se puede comprobar con una calculadora de la web.",
  },
  {
    icon: Users,
    title: "Lenguaje humano",
    text: "Explicamos conceptos complejos como se los explicarías a un amigo, sin tecnicismos vacíos.",
  },
  {
    icon: Sparkles,
    title: "Siempre gratis",
    text: "Todas las herramientas son gratuitas y funcionan en tu navegador, sin registro.",
  },
];

function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pt-14 sm:px-6">
      <article>
        <header>
          <span className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
            Sobre nosotros
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-5xl">
            Finanzas personales explicadas con claridad
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            FinanzasClaras nació de una idea simple: la mayoría de las malas decisiones con el dinero
            no vienen de la falta de disciplina, sino de la falta de información entendible.
          </p>
        </header>

        <section className="mt-10 space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            Somos un pequeño equipo de divulgadores y analistas financieros que lleva años
            traduciendo hojas de cálculo y contratos bancarios a un lenguaje que cualquiera pueda
            entender. Empezamos ayudando a amigos y familiares a comparar préstamos y terminamos
            construyendo las herramientas que nos hubiera gustado tener.
          </p>
          <p>
            Nuestro objetivo es que salgas de cada página con una respuesta concreta: cuánto vas a
            pagar, cuánto puedes ahorrar y qué alternativa te conviene. Nada de promesas de
            enriquecimiento rápido ni de productos milagro.
          </p>
        </section>

        <section aria-label="Nuestros principios" className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-foreground">Nuestros principios</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 60}>
                <div className="card-hover h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-accent-foreground">
                    <value.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-border bg-surface p-8 text-center">
          <h2 className="font-display text-2xl font-semibold">¿Listo para poner números?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Empieza por la calculadora que responda a tu duda de hoy. Es gratis y toma menos de un
            minuto.
          </p>
          <Button asChild variant="hero" size="lg" className="mt-6">
            <Link to="/herramientas">Ver todas las calculadoras</Link>
          </Button>
        </section>
      </article>

      <AdSlot className="mt-14" />
    </main>
  );
}
