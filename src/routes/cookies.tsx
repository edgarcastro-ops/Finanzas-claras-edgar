import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const title = "Política de Cookies";
const description = "Información sobre las cookies necesarias, analíticas, publicitarias y funcionales de FinanzasClaras.";
const content = `# Política de Cookies
Última actualización: 9 de septiembre de 2026

## 1. ¿Qué son las cookies?
Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.

## 2. Tipos de cookies que usamos
| Tipo | Finalidad | Ejemplos |
|---|---|---|
| Necesarias | Funcionamiento básico del sitio | Preferencias de navegación, consentimiento de cookies |
| Analíticas | Entender cómo se usa el sitio | Google Analytics |
| Publicitarias | Mostrar anuncios relevantes | Google AdSense, cookie DART |
| Funcionales | Recordar tus preferencias | Modo oscuro, moneda seleccionada, herramientas favoritas |

## 3. Cookies de terceros
Google y otros proveedores de publicidad pueden colocar y leer cookies en tu navegador. El uso que Google haga de estas cookies se rige por su [Política de Privacidad](https://policies.google.com/privacy).

## 4. Cómo gestionar las cookies
Podés configurar tu navegador para rechazar cookies, o gestionar las cookies publicitarias en [Configuración de anuncios de Google](https://adssettings.google.com/) o en [www.aboutads.info/choices](http://www.aboutads.info/choices/).

## 5. Consentimiento
Al continuar navegando en este sitio y aceptar el banner de cookies, consentís el uso de cookies conforme a esta política.`;

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: `${title} | FinanzasClaras` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | FinanzasClaras` },
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
