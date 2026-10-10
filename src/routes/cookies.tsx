import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const title = "Política de Cookies";
const description =
  "Información sobre las cookies necesarias, analíticas, publicitarias y funcionales de Finanzas a tu Bolsillo.";
const content = `# Política de Cookies
Última actualización: 9 de septiembre de 2026

## 1. ¿Qué son las cookies?
Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.

## 2. Tipos de cookies que usamos
| Tipo | Finalidad | Ejemplos |
|---|---|---|
| Necesarias | Funcionamiento básico del sitio | Preferencias de navegación, consentimiento de cookies |
| Analíticas (opcionales) | Entender cómo se usa el sitio si aceptas | Google Analytics 4 |
| Funcionales | Recordar tus preferencias | Modo oscuro, moneda seleccionada, Calculadoras favoritas |

Google AdSense todavía no está aprobado ni activo; actualmente no mostramos anuncios ni utilizamos cookies publicitarias de Google. Si esto cambia, actualizaremos esta política antes de habilitar la publicidad.

## 3. Cookies de terceros
Google Analytics 4 solo se carga si aceptas las cookies analíticas. Consulta la [Política de Privacidad de Google](https://policies.google.com/privacy) para conocer el tratamiento que Google hace de los datos.

## 4. Cómo gestionar las cookies
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
