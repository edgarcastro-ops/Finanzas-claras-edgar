import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const title = "Términos y Condiciones";
const description = "Condiciones de uso del contenido educativo y las herramientas de FinanzasClaras.";
const content = `# Términos y Condiciones
Última actualización: 9 de septiembre de 2026

Bienvenido a FinanzasClaras. Al acceder y usar este sitio web, aceptás los siguientes términos. Si no estás de acuerdo, por favor no utilices el sitio.

## 1. Uso del sitio
Este sitio ofrece contenido educativo sobre finanzas personales y herramientas de cálculo con fines informativos.

## 2. Naturaleza informativa del contenido
Todo el contenido tiene fines exclusivamente educativos e informativos. No constituye asesoría financiera, legal, fiscal o de inversión profesional. Consultá nuestro [Aviso Legal](/aviso-legal) para más detalle.

## 3. Exactitud de las calculadoras
Las herramientas de cálculo ofrecen estimaciones basadas en los datos que ingresás y fórmulas financieras estándar. Los resultados son aproximados y no reemplazan una cotización oficial de una entidad financiera.

## 4. Propiedad intelectual
Todo el contenido, diseño y herramientas de este sitio son propiedad de FinanzasClaras o se usan bajo licencia.

## 5. Publicidad
Este sitio muestra publicidad de terceros a través de Google AdSense. No nos hacemos responsables del contenido de los anuncios mostrados.

## 6. Limitación de responsabilidad
En ningún caso FinanzasClaras será responsable por daños derivados del uso de este sitio, incluyendo decisiones financieras tomadas en base a su contenido.

## 7. Legislación aplicable
Estos términos se rigen por las leyes de República Dominicana.

## 8. Contacto
Para consultas, escribinos a accesototal707@gmail.com.`;

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: `${title} | FinanzasClaras` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | FinanzasClaras` },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/terminos" }],
  }),
  component: Page,
});

function Page() {
  return <LegalPage title={title} description={description} content={content} />;
}
