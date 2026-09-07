# Finanzas Claras

FASE 1 — Estructura base, diseño y 3 calculadoras clave

Quiero que crees una aplicación web llamada "FinanzasClaras" (o sugiere alternativas), un portal de finanzas personales diseñado para atraer tráfico orgánico de Google y monetizar con Google AdSense. En esta primera fase, enfócate en construir una base sólida y reutilizable: sistema de diseño, navegación y 3 calculadoras funcionando perfectamente. Más adelante iré agregando el resto del contenido en fases siguientes, así que construye todo pensando en que sea fácil de escalar y mantener consistente.

Diseño (aplica esto a TODO el sitio, no solo a esta fase)

El sitio debe verse profesional, dinámico y de alta calidad visual, al nivel de una app fintech moderna (piensa en referencias como Stripe, Nubank o Wise en cuanto a pulido visual). Debe transmitir confianza inmediata.

Tipografía legible con jerarquía clara, mucho espacio en blanco.

Paleta de colores que transmita confianza: azules, verdes, blancos, con un color de acento (verde esmeralda o azul profundo). Evita colores estridentes tipo "IA genérica".

Animaciones sutiles: fade-in/slide-up al hacer scroll, transiciones suaves en hover de botones y cards, sombra/elevación en hover.

Las calculadoras deben sentirse "vivas": resultados en tiempo real o con feedback visual inmediato, gráficos animados (barras/líneas) al mostrar resultados, no solo tablas planas.

Mobile-first, todo el dinamismo debe funcionar igual de bien en celular.

Componentes reutilizables y consistentes (mismo estilo de botones, cards, inputs) en todo el sitio.

Modo oscuro opcional (nice to have, no crítico).

Estructura a construir en esta fase

Header con navegación: Inicio / Blog / Herramientas / Sobre nosotros. Sticky al hacer scroll.

Footer completo con secciones para: links legales (los agregaremos en fase 4, por ahora deja los links como placeholder), categorías del blog, redes sociales (placeholder).

Home — Hero con propuesta de valor clara, sección de herramientas destacadas (usa las 3 calculadoras de esta fase), sección "últimos artículos del blog" (puede quedar con placeholders por ahora, la llenamos en fase 3), sección de categorías.

Página de listado de Herramientas (/herramientas) — Grid con cards de todas las calculadoras (deja placeholders/"próximamente" para las que construiremos en fase 2, y las 3 activas de esta fase con link funcional).

Página "Sobre nosotros" con contenido de ejemplo.

Página 404 personalizada con el estilo del sitio.

Calculadoras a construir en esta fase (completamente funcionales)

Calculadora de interés compuesto — inputs: monto inicial, aporte mensual, tasa anual, plazo en años. Output: gráfico de crecimiento y tabla resumen por año.

Calculadora de préstamo personal — inputs: monto, tasa anual, plazo en meses. Output: cuota mensual, tabla de amortización completa, gráfico de capital vs interés pagado.

Calculadora de tarjeta de crédito — inputs: saldo actual, tasa anual, pago mensual. Output: tiempo para saldar la deuda y costo total en intereses, comparando "solo pago mínimo" vs. el monto ingresado.

Cada calculadora en su propia URL (ej. /herramientas/calculadora-interes-compuesto), con título H1, breve texto explicativo arriba, la calculadora en el centro, y un espacio reservado para anuncio (<!-- AD SLOT -->) debajo del resultado.

Requisitos técnicos generales

Usa etiquetas semánticas HTML5 (header, nav, main, article, aside, footer).

URLs limpias y descriptivas.

Cada página con meta título y meta descripción.

Deja espacios reservados (<!-- AD SLOT -->) en: debajo del header (banner horizontal en home) y antes del footer.

No implementes el blog ni las páginas legales todavía — eso vendrá en fases posteriores.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4b1d2be4-bf62-4cff-b665-ff63e59460f6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
