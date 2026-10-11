import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const title = "Política de Cookies";
const description =
  "Información sobre cookies y almacenamiento local necesarios, analíticos y funcionales en Finanzas a tu Bolsillo.";
const content = `# Política de Cookies
Última actualización: 11 de octubre de 2026

## 1. ¿Qué son las cookies?
Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.

## 2. Cookies y almacenamiento del navegador
- **Funcionamiento del sitio:** una preferencia de estado de navegación puede guardarse en una cookie técnica.
- **Analítica (opcional):** Google Analytics 4 solo se carga si aceptas las cookies analíticas en el banner.
- **Preferencias:** el consentimiento, el modo oscuro, la moneda y las calculadoras favoritas se guardan en el almacenamiento local del navegador; no son cookies.
- **Publicidad:** actualmente no mostramos anuncios ni utilizamos cookies publicitarias. Si incorporamos publicidad de terceros, actualizaremos esta política y la información de consentimiento antes de activarla.

## 3. Cookies de terceros
Google Analytics 4 solo se carga si aceptas las cookies analíticas. Consulta la [Política de Privacidad de Google](https://policies.google.com/privacy) para conocer el tratamiento que Google hace de los datos.

## 4. Cómo gestionar cookies y preferencias
Puedes cambiar tu decisión sobre las cookies analíticas borrando el almacenamiento local del sitio en tu navegador. También puedes configurar el navegador para bloquear cookies.

## 5. Consentimiento
Si aceptas las cookies analíticas en el banner, Google Analytics 4 se carga. Si las rechazas, Google Analytics 4 no se activa.`;

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: `${title} | Finanzas a tu Bolsillo` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Finanzas a tu Bolsillo` },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: Page,
});

function Page() {
  return <LegalPage title={title} description={description} content={content} />;
}
