import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const title = "Aviso Legal / Disclaimer Financiero";
const description = "Alcance informativo y limitaciones de las herramientas y contenidos financieros de FinanzasClaras.";
const content = `# Aviso Legal / Disclaimer Financiero
Última actualización: 9 de septiembre de 2026

## 1. No es asesoría financiera profesional
La información, artículos y herramientas de FinanzasClaras se ofrecen únicamente con fines educativos e informativos generales. No constituyen asesoría financiera, de inversión, legal, fiscal o contable personalizada.

## 2. Consulta a profesionales
Antes de tomar cualquier decisión financiera relevante, te recomendamos consultar con un asesor financiero, contador o profesional certificado.

## 3. Resultados de las calculadoras
Las calculadoras generan estimaciones aproximadas basadas exclusivamente en los datos ingresados. No son ofertas, cotizaciones ni compromisos de ninguna entidad financiera, y pueden diferir de los términos reales ofrecidos por bancos o entidades de crédito.

## 4. Sin relación comercial con entidades financieras
FinanzasClaras no es un banco, entidad de crédito, asesor de inversión registrado ni intermediario financiero.

## 5. Exención de responsabilidad
El uso de la información de este sitio es bajo tu propio riesgo.

## 6. Contacto
Ante cualquier duda, contáctanos a accesototal707@gmail.com.`;

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: `${title} | FinanzasClaras` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | FinanzasClaras` },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/aviso-legal" }],
  }),
  component: Page,
});

function Page() {
  return <LegalPage title={title} description={description} content={content} />;
}
