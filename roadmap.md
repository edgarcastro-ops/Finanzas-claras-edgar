# Roadmap — FinanzasClaras

## Fase 1 (en curso)
- [x] Sistema de diseño (tokens, fuentes Sora/Manrope, azul+esmeralda, modo oscuro)
- [x] Header sticky con nav (Inicio / Blog / Herramientas / Sobre nosotros) + menú móvil + modo oscuro
- [x] Footer completo (herramientas, categorías blog, legales placeholder, redes placeholder)
- [x] Home: hero, banner AD SLOT, herramientas destacadas, artículos placeholder, categorías
- [x] /herramientas: grid con 3 activas + 5 "próximamente"
- [x] /sobre-nosotros con contenido de ejemplo
- [x] /blog placeholder (próximamente)
- [x] 404 personalizada
- [x] Calculadora interés compuesto (gráfico + tabla anual)
- [x] Calculadora préstamo personal (cuota, amortización, gráficos)
- [x] Calculadora tarjeta de crédito (mínimo vs. pago fijo)
- [x] Verificación visual y de funcionamiento en el navegador

## Fase 2 (completada)
- [x] 14 calculadoras adicionales ya existían en el código pero no funcionaban por un bug:
      usaban `createFileRoute(path)` con una variable en vez de un string literal, lo cual
      rompe el generador de rutas de TanStack Router. Corregido en las 14: ahorro-meta,
      hipoteca, presupuesto-mensual, pago-deudas, jubilacion, conversor-de-moneda,
      salario-neto, prestamo-vehicular, prestamo-estudiantil, prestamo-empresarial,
      refinanciamiento, capacidad-endeudamiento (DTI), comparador-de-prestamos, pago-anticipado.
- [x] `src/data/tools.ts` actualizado: las 14 pasaron de "proximamente" a "activa" con su
      href individual correcto (antes apuntaban genéricamente a /herramientas).
- [x] Build de producción verificado sin errores (`vite build`), las 17 rutas de calculadoras
      confirmadas en `routeTree.gen.ts`.
- [ ] Pendiente revisar visualmente cada una en el navegador (funcionalidad ya verificada por build,
      falta QA visual/UX).

## Próximas fases
- Fase 3: blog real (artículos, categorías)
- Fase 4: páginas legales + integración AdSense en los AD SLOT

## Extras completados
- [x] Selector global de moneda (10 monedas, detección por región del navegador, localStorage, formato en las 3 calculadoras; componente reutilizable `CurrencySelect` + hook `useCurrency`)
