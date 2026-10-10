import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const title = "Contacto";
const description = "Escríbenos para consultas, sugerencias, correcciones o dudas sobre el contenido del sitio.";
const content = `# Contacto

¿Tienes una pregunta, una sugerencia o encontraste un error en una calculadora? Escríbenos.

## Correo electrónico

accesototal707@gmail.com

## Qué puedes escribirnos

- Errores o dudas sobre una calculadora.
- Sugerencias de nuevas calculadoras o temas para el blog.
- Consultas sobre privacidad o cookies.
- Correcciones de contenido.

## Antes de escribir

Respondemos por correo electrónico lo antes posible. Recuerda que no ofrecemos asesoría financiera personalizada: el contenido del sitio es informativo (consulta el [Aviso legal](/aviso-legal)).`;

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: `${title} | Finanzas a tu Bolsillo` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Finanzas a tu Bolsillo` },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Page,
});

function Page() {
  return <LegalPage title={title} description={description} content={content} />;
}
