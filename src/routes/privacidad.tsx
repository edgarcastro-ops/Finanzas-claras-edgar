import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { absoluteUrl } from "@/lib/seo";

const title = "Política de Privacidad";
const description =
  "Conoce cómo Finanzas a tu Bolsillo recopila, usa y protege la información de sus visitantes.";
const content = `# Política de Privacidad
Última actualización: 11 de octubre de 2026

En Finanzas a tu Bolsillo ("nosotros", "nuestro" o "el sitio"), accesible desde [finanzasatubolsillo.com](https://finanzasatubolsillo.com), respetamos tu privacidad y nos comprometemos a proteger los datos personales que puedas compartir al usar nuestro sitio web.

## 1. Información que recopilamos
- Datos que nos proporcionas voluntariamente: si nos escribes por correo electrónico, podemos recopilar tu nombre y tu correo electrónico.
- Datos de uso recopilados automáticamente: dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia, sitio de referencia y datos similares recolectados mediante cookies y herramientas de analítica (como Google Analytics 4), únicamente si aceptas las cookies no esenciales.
- Datos ingresados en las calculadoras: los valores que ingresas en nuestras Calculadoras se procesan únicamente en tu navegador para mostrarte el resultado. No almacenamos ni enviamos esta información a nuestros servidores.

## 2. Cookies, analítica y publicidad de terceros
Google Analytics 4 se carga únicamente después de que aceptes las cookies analíticas en el banner. Si las rechazas, la medición analítica no se activa. Actualmente, este sitio no muestra anuncios ni utiliza cookies publicitarias.

Si en el futuro mostramos publicidad de terceros, esos proveedores, incluido Google, podrán utilizar cookies para seleccionar anuncios basados en tus visitas a este y otros sitios. Actualizaremos esta política y la información de consentimiento antes de habilitarla. Puedes gestionar tus preferencias en la [Configuración de anuncios de Google](https://www.google.com/settings/ads) y consultar las [opciones de exclusión de publicidad digital](https://www.aboutads.info/choices/).

Para más detalle, consulta nuestra [Política de Cookies](/cookies).

## 3. Cómo usamos tu información
Usamos los datos recopilados para operar y mejorar el sitio, entender cómo los visitantes interactúan con nuestro contenido cuando aceptan analítica, responder a tus consultas por correo electrónico y, si activamos publicidad, mostrar publicidad relevante.

## 4. Compartir información con terceros
No vendemos ni alquilamos tus datos personales a terceros. Google Analytics recibe datos de uso cuando aceptas las cookies analíticas. Si activamos publicidad, los proveedores publicitarios podrán tratar datos conforme a sus propias políticas. Usamos la información para fines estadísticos y, si activamos publicidad, publicitarios.

## 5. Tus derechos
Dependiendo de tu ubicación, puedes tener derecho a acceder, corregir, eliminar o limitar el uso de tus datos personales. Para ejercer estos derechos, contáctanos en [accesototal707@gmail.com](mailto:accesototal707@gmail.com).

## 6. Privacidad de menores
Este sitio no está dirigido a menores de 18 años y no recopilamos conscientemente información de menores.

## 7. Cambios a esta política
Podemos actualizar esta Política de Privacidad periódicamente.

## 8. Contacto
Si tienes preguntas, escríbenos a [accesototal707@gmail.com](mailto:accesototal707@gmail.com).`;

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: `${title} | Finanzas a tu Bolsillo` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Finanzas a tu Bolsillo` },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/privacidad") }],
  }),
  component: Page,
});

function Page() {
  return <LegalPage title={title} description={description} content={content} />;
}
