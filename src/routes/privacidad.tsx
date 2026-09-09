import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

const title = "Política de Privacidad";
const description = "Conocé cómo FinanzasClaras recopila, usa y protege la información de sus visitantes.";
const content = `# Política de Privacidad
Última actualización: 9 de septiembre de 2026

En FinanzasClaras ("nosotros", "nuestro" o "el sitio"), accesible desde [dominio.com], respetamos tu privacidad y nos comprometemos a proteger los datos personales que puedas compartir al usar nuestro sitio web.

## 1. Información que recopilamos
- Datos que nos proporcionas voluntariamente: si usas el formulario de contacto o te suscribes al newsletter, podemos recopilar tu nombre y correo electrónico.
- Datos de uso recopilados automáticamente: dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia, sitio de referencia y datos similares recolectados mediante cookies y herramientas de analítica (como Google Analytics).
- Datos ingresados en las calculadoras: los valores que ingresas en nuestras herramientas se procesan únicamente en tu navegador para mostrarte el resultado. No almacenamos ni enviamos esta información a nuestros servidores.

## 2. Uso de cookies y publicidad de terceros
Este sitio utiliza Google AdSense, un servicio de publicidad de Google LLC. Google, como proveedor externo, utiliza cookies (incluida la cookie DART) para mostrar anuncios basados en tus visitas anteriores a este y otros sitios web.
- Puedes inhabilitar el uso de la cookie DART visitando la [Política de privacidad de anuncios y contenido de Google](https://policies.google.com/technologies/ads).
- También puedes gestionar tus preferencias en [Configuración de anuncios de Google](https://adssettings.google.com/).
- Otros proveedores externos pueden usar cookies para publicidad personalizada; podés gestionar tus opciones en [www.aboutads.info/choices](http://www.aboutads.info/choices/).

Para más detalle, consulta nuestra [Política de Cookies](/cookies).

## 3. Cómo usamos tu información
Usamos los datos recopilados para operar y mejorar el sitio, entender cómo los visitantes interactúan con nuestro contenido, personalizar la publicidad mostrada, y responder a tus consultas de contacto.

## 4. Compartir información con terceros
No vendemos ni alquilamos tus datos personales a terceros. Podemos compartir información agregada y anónima con proveedores de analítica y publicidad únicamente con fines estadísticos y publicitarios.

## 5. Tus derechos
Dependiendo de tu ubicación, puedes tener derecho a acceder, corregir, eliminar o limitar el uso de tus datos personales. Para ejercer estos derechos, contáctanos a accesototal707@gmail.com.

## 6. Privacidad de menores
Este sitio no está dirigido a menores de 18 años y no recopilamos conscientemente información de menores.

## 7. Cambios a esta política
Podemos actualizar esta Política de Privacidad periódicamente.

## 8. Contacto
Si tenés preguntas, escribinos a accesototal707@gmail.com.`;

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: `${title} | FinanzasClaras` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | FinanzasClaras` },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/privacidad" }],
  }),
  component: Page,
});

function Page() {
  return <LegalPage title={title} description={description} content={content} />;
}
