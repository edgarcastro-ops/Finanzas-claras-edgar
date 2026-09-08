export interface Post {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  date: string;
  relatedToolSlug?: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "presupuesto-50-30-20",
    title: "Cómo hacer un presupuesto 50/30/20",
    category: "Presupuesto",
    excerpt: "Una forma sencilla de repartir tus ingresos, cubrir lo importante y empezar a ahorrar sin perder flexibilidad.",
    readTime: "6 min",
    date: "2026-01-15",
    relatedToolSlug: "calculadora-presupuesto-mensual",
    content: `## Qué significa la regla 50/30/20

La regla 50/30/20 divide tu ingreso mensual en tres grupos: 50% para necesidades, 30% para deseos y 20% para ahorro o pago de deudas. No es una ley ni una prueba que puedas aprobar o suspender. Es un punto de partida para mirar tu dinero completo y decidir con intención.

Las necesidades son los gastos que mantienen tu vida en marcha: vivienda, servicios, comida básica, transporte, seguros y cuotas mínimas. En deseos entran las salidas, suscripciones, compras no esenciales y otros gustos. El último 20% puede construir un fondo de emergencia, invertir o acelerar una deuda cara.

> La mejor regla de presupuesto es la que puedes sostener varios meses seguidos, no la que se ve perfecta en una hoja de cálculo.

## Cómo construirlo con tus números

Empieza con el ingreso neto que realmente llega a tu cuenta. Si cobras cantidades variables, usa un promedio conservador de los últimos tres o seis meses. Multiplica esa cifra por 0,50, 0,30 y 0,20 para obtener tus límites iniciales.

Después anota tus gastos reales del último mes. Revisar movimientos bancarios suele ser más útil que intentar recordar cada compra. Agrupa cada gasto en una de las tres categorías y compara el resultado con los porcentajes. Quizá tu vivienda ocupe más del 50% o tus deudas estén consumiendo el ahorro: ese diagnóstico es precisamente lo valioso.

Si tus necesidades superan el 50%, no recortes automáticamente la comida o el seguro. Busca primero gastos renegociables, cambia la fecha de algunas compras o considera cómo aumentar ingresos. El presupuesto debe describir tu realidad y ayudarte a mejorarla, no hacerte sentir culpable.

## Ajusta la regla a tu etapa

Una persona que está pagando tarjetas puede destinar temporalmente más del 20% a deudas. Alguien con ingresos altos quizá necesite ahorrar bastante más para una meta concreta. También puedes empezar con 60/25/15 y acercarte poco a poco al reparto 50/30/20.

Revisa el presupuesto una vez al mes y prepara una cantidad para gastos irregulares, como mantenimiento, regalos o matrículas. Separar ese dinero evita que una factura previsible parezca una emergencia. Automatiza el ahorro el día que cobras y deja el dinero de ocio disponible para no convertir cada decisión pequeña en una negociación.

Para convertir tu ingreso en cantidades concretas y ajustar los porcentajes a tu realidad, prueba la **calculadora de presupuesto 50/30/20**.`
  },
  {
    slug: "que-es-el-interes-compuesto",
    title: "Qué es el interés compuesto y por qué es importante",
    category: "Inversión",
    excerpt: "Entiende cómo tus ganancias pueden generar nuevas ganancias y por qué el tiempo pesa más que encontrar el momento perfecto.",
    readTime: "7 min",
    date: "2026-01-22",
    relatedToolSlug: "calculadora-interes-compuesto",
    content: `## La diferencia entre interés simple y compuesto

El interés simple se calcula siempre sobre el capital inicial. Si inviertes 1.000 y recibes un 5% anual, ganarías 50 cada año. El interés compuesto, en cambio, suma las ganancias al capital y calcula el siguiente rendimiento sobre una cantidad mayor. Los intereses empiezan a producir sus propios intereses.

Imagina que dejas esos 1.000 durante diez años a un 5% anual, sin aportes adicionales. Con interés simple tendrías 1.500. Con una capitalización anual, el resultado sería aproximadamente 1.629. La diferencia no aparece de golpe: crece con cada periodo y se vuelve más visible cuanto más tiempo pasa.

> El interés compuesto no es magia ni una garantía de rentabilidad; necesita tiempo, aportes constantes y un rendimiento que puede variar.

## El tiempo es tu principal aliado

Dos personas pueden invertir la misma cantidad total y obtener resultados muy distintos. Quien empieza antes tiene más años para que sus ganancias se reinviertan. Por eso una aportación moderada desde joven puede superar a aportaciones mucho mayores hechas durante pocos años.

La frecuencia de los aportes también importa. Invertir cada mes permite poner a trabajar el dinero conforme está disponible y reduce la dependencia de acertar con un único día de entrada. No elimina las caídas del mercado, pero sí convierte el hábito en una parte central de la estrategia.

En la práctica, debes separar el rendimiento esperado de la promesa. Una tasa anual media sirve para hacer escenarios, no para adivinar el futuro. Compara resultados con varias tasas y considera inflación, impuestos, comisiones y periodos negativos.

## Cómo aprovecharlo sin complicarte

Primero crea un fondo de emergencia y paga las deudas con intereses muy altos. Después define para qué es el dinero y cuándo lo necesitarás. Un objetivo a pocos meses no debería depender de una inversión volátil; para horizontes largos puedes estudiar opciones diversificadas y de bajo coste.

Automatiza una aportación mensual que puedas mantener incluso cuando el entusiasmo baje. Revisa las comisiones y evita retirar cada vez que el mercado tenga un mal mes, siempre que tu plan y tu horizonte no hayan cambiado. También conviene aumentar gradualmente la aportación cuando sube tu ingreso.

La mejor forma de ver el efecto de las aportaciones y del tiempo es comparar escenarios en nuestra **calculadora de interés compuesto**.`
  },
  {
    slug: "como-salir-de-deudas-paso-a-paso",
    title: "Cómo salir de deudas paso a paso",
    category: "Deudas",
    excerpt: "Ordena tus cuentas, elige una estrategia y crea un plan que reduzca intereses sin dejar de ser realista.",
    readTime: "7 min",
    date: "2026-02-03",
    relatedToolSlug: "calculadora-pago-deudas",
    content: `## Empieza por conocer el problema

Salir de deudas comienza con una fotografía completa, no con un pago impulsivo. Haz una lista con cada saldo, tasa de interés, pago mínimo, fecha de vencimiento y posibles comisiones. Incluye tarjetas, préstamos, compras a plazos y cualquier deuda informal que también necesite un acuerdo claro.

Suma los pagos mínimos y compáralos con tu ingreso neto. Si no alcanza para cubrirlos, contacta cuanto antes a las entidades para explorar alternativas. Ignorar una cuenta suele encarecerla con recargos y afecta tu historial. Durante este proceso, evita adquirir nueva deuda para cubrir gastos que puedas pausar.

> Un plan de deudas debe dejar espacio para vivir y para una pequeña reserva; pagar todo y volver a usar la tarjeta la semana siguiente no resuelve el ciclo.

## Elige entre bola de nieve y avalancha

Con la bola de nieve ordenas las deudas de menor a mayor saldo. Pagas el mínimo en todas y diriges el dinero extra a la más pequeña. Al liquidarla, trasladas ese pago a la siguiente. Ver cuentas desaparecer pronto puede darte la motivación necesaria para continuar.

La avalancha ordena las deudas por tasa de interés, de mayor a menor. Matemáticamente suele reducir más intereses si mantienes el plan, aunque la primera victoria puede tardar. Ningún método funciona si es tan exigente que abandonas en el segundo mes: elige el que encaje con tu manera de sostener hábitos.

Aparta primero una reserva pequeña para una reparación o una factura inesperada. Luego automatiza los mínimos y programa el pago extra poco después de cobrar. Cada vez que termines una cuenta, conserva el mismo importe total para acelerar la siguiente.

## Protege el avance

Recorta temporalmente gastos que no aporten y busca ingresos adicionales con un objetivo concreto. Llama para negociar tasas, fechas o comisiones, pero lee con cuidado cualquier refinanciación: una cuota menor puede esconder un plazo más largo y un coste final mayor.

Celebra los hitos sin gastar el dinero destinado al plan. Revisa el presupuesto cada mes y actualiza los saldos. Cuando termines, redirige esa cantidad hacia un fondo de emergencia y después hacia metas de largo plazo. Así la libertad que compras con el esfuerzo se vuelve permanente.

Compara cuánto tardarías con cada estrategia en la **calculadora de pago de deudas** y convierte el plan en fechas concretas.`
  },
  {
    slug: "fondo-de-emergencia-cuanto-necesitas",
    title: "Fondo de emergencia: cuánto necesitas y cómo armarlo",
    category: "Ahorro",
    excerpt: "Calcula una reserva que te proteja de imprevistos y aprende a construirla sin esperar a tener un sueldo perfecto.",
    readTime: "6 min",
    date: "2026-02-10",
    relatedToolSlug: "calculadora-ahorro-meta",
    content: `## Qué debe cubrir un fondo de emergencia

Un fondo de emergencia es dinero líquido para afrontar una pérdida de ingresos, una reparación importante, una urgencia médica o un gasto necesario que no puedes aplazar. No está pensado para vacaciones, ofertas ni compras planificadas. Su función es darte tiempo para decidir sin depender de una tarjeta cara.

Calcula primero tus gastos esenciales mensuales: vivienda, comida básica, servicios, transporte, seguros, salud y pagos mínimos de deudas. No uses todo tu estilo de vida actual si hay gastos que podrías pausar. Como referencia, una reserva de tres a seis meses de esenciales suele ser razonable; si tus ingresos son variables, tienes personas a cargo o trabajas por cuenta propia, puede convenirte más.

> El objetivo no es reunir una cifra impresionante, sino comprar tranquilidad suficiente para que un imprevisto no se convierta en deuda.

## Define una primera meta alcanzable

Si partes de cero, comienza con una cantidad pequeña que cubra una urgencia habitual. Puede ser el equivalente a una reparación o a unas semanas de gastos. Esta primera meta evita que abandones por mirar una cifra de seis meses que parece inalcanzable.

Después divide la meta grande entre la cantidad que puedes separar cada mes. Si el resultado es demasiado largo, combina un ajuste temporal de gastos con ingresos extra y dirige al fondo cualquier ingreso extraordinario. Automatizar la transferencia el día de cobro funciona mejor que ahorrar lo que sobra al final.

Guarda la reserva en una cuenta separada, segura y fácil de retirar, pero no mezclada con la cuenta de gastos diarios. La rentabilidad es secundaria frente a la disponibilidad y la ausencia de penalizaciones que te impidan usarla cuando hace falta.

## Cuándo usarlo y cómo reponerlo

Antes de retirar dinero, pregunta si el gasto es necesario, inesperado y urgente. Si la respuesta es sí, usa la reserva sin culpa. Anota cuánto sacaste y vuelve a incluir su reposición en el presupuesto. Un fondo utilizado para una emergencia está cumpliendo su propósito.

Revisa la cifra cada seis o doce meses. Si cambia el alquiler, llega una persona nueva al hogar o tus ingresos se vuelven menos estables, también cambia la reserva necesaria. Cuando completes el objetivo, puedes mantenerlo y dirigir el ahorro adicional a invertir o a otras metas.

Calcula cuánto guardar cada mes para tu objetivo con la **calculadora de meta de ahorro**.`
  },
  {
    slug: "prestamo-personal-vs-tarjeta-credito",
    title: "Cómo elegir entre un préstamo personal y una tarjeta de crédito",
    category: "Crédito",
    excerpt: "Compara coste, plazo y flexibilidad antes de financiar una compra o consolidar una deuda.",
    readTime: "7 min",
    date: "2026-02-18",
    relatedToolSlug: "calculadora-prestamo-personal",
    content: `## No son dos versiones del mismo producto

Un préstamo personal entrega una cantidad concreta y suele tener una cuota, una tasa y un plazo definidos desde el inicio. Una tarjeta de crédito es una línea renovable: puedes usarla, devolver parte del saldo y volver a disponer del límite. Esa flexibilidad es útil, pero también puede hacer que una deuda se alargue sin una fecha clara de salida.

Para comparar, mira la tasa anual equivalente o el coste total, no solo la cuota anunciada. Incluye comisión de apertura, seguros, penalizaciones, mantenimiento y cualquier cargo por disposición de efectivo. Una cuota baja puede ser el resultado de un plazo muy largo y terminar costando mucho más.

> El crédito más barato sigue siendo caro si financia una compra que no puedes pagar sin poner en riesgo tus gastos básicos.

## Cuándo puede tener sentido cada opción

Un préstamo personal puede encajar en una necesidad definida, como una reparación grande, si la cuota cabe en tu presupuesto y el plazo termina antes de que el bien deje de ser útil. Saber exactamente cuándo se extingue la deuda facilita planificar y evita usar el crédito como ingreso adicional.

Una tarjeta puede ser conveniente para gastos pequeños y planificados cuando pagas el estado de cuenta completo cada mes. En ese caso puedes aprovechar comodidad y protección de compra sin trasladar saldo al siguiente periodo. Si solo puedes pagar el mínimo, la tasa suele volverla una de las formas más costosas de financiarte.

Nunca elijas solo por la aprobación rápida. Calcula cuánto de tu ingreso ya está comprometido, conserva una reserva y pide por escrito las condiciones. Si estás comparando una consolidación, confirma que no haya comisiones que borren el ahorro y que el nuevo plazo no reinicie el problema.

## Toma la decisión con una prueba sencilla

Anota el importe que necesitas y simula la cuota con distintos plazos. Pregúntate qué ocurriría si tus ingresos bajaran durante dos meses. Si la respuesta es que usarías otra tarjeta, el crédito no cabe todavía en tu presupuesto: reduce el importe, espera o busca una alternativa.

Lee el contrato antes de firmar y revisa si puedes hacer pagos anticipados sin coste. Si eliges una tarjeta, configura alertas y paga más que el mínimo siempre que mantengas tus gastos esenciales cubiertos. El objetivo no es tener más límite, sino resolver una necesidad al menor coste posible.

Compara cuota, intereses y coste total en la **calculadora de préstamo personal** antes de aceptar una oferta.`
  },
  {
    slug: "guia-basica-reporte-de-credito",
    title: "Guía básica para entender tu reporte de crédito",
    category: "Educación financiera",
    excerpt: "Aprende qué información aparece, cómo detectar errores y qué hábitos ayudan a cuidar tu historial.",
    readTime: "6 min",
    date: "2026-02-25",
    relatedToolSlug: "calculadora-capacidad-endeudamiento",
    content: `## Qué información encontrarás

El reporte de crédito reúne datos sobre tus cuentas y tu comportamiento de pago. Normalmente muestra quién eres, qué productos tienes o tuviste, los saldos, los límites, las fechas de apertura y si los pagos llegaron a tiempo. También puede incluir consultas realizadas por entidades y registros públicos según las reglas de tu país.

No es una calificación única ni una sentencia sobre tu futuro. El puntaje se calcula con parte de esa información y puede cambiar cuando se actualizan los saldos. Un reporte sirve para revisar que la historia que usan las entidades sea correcta, no para perseguir cada variación pequeña del número.

> Revisar tu reporte no empeora tu historial cuando se trata de una consulta propia; de hecho, ayuda a detectar problemas antes de solicitar crédito.

## Cómo leerlo con calma

Busca primero cuentas que no reconozcas, nombres o direcciones incorrectos y saldos que no coincidan con tus estados de cuenta. Revisa especialmente los pagos marcados como atrasados, cuentas cerradas que aparecen abiertas y límites que podrían estar desactualizados. Una diferencia pequeña también importa si cambia el porcentaje de uso.

El uso de crédito compara los saldos de tus tarjetas con sus límites. Mantener una utilización alta puede indicar presión financiera aunque pagues a tiempo. No existe un porcentaje universal que garantice aprobación, pero reducir saldos antes del cierre y no agotar líneas suele ayudar a presentar una imagen más estable.

Si encuentras un error, reúne estados de cuenta, comprobantes y fechas. Presenta una disputa ante la entidad que reportó el dato y ante el buró o registro correspondiente, siguiendo el canal oficial. Guarda el número de caso y revisa el informe después del plazo de respuesta. Si una cuenta es real pero difícil de pagar, busca un acuerdo antes de que el atraso se agrave y confirma cómo se informará.

## Hábitos que protegen tu historial

Paga a tiempo: configura recordatorios o débitos automáticos, pero conserva saldo suficiente para evitar rechazos. Solicita crédito solo cuando tengas un motivo y compara varias ofertas en un periodo razonable. Cerrar tarjetas antiguas sin revisar el impacto en tu límite total tampoco siempre es la mejor decisión.

Tu reporte no reemplaza un presupuesto. Antes de pedir otro préstamo, suma tus cuotas actuales y calcula qué parte del ingreso se iría en deudas. Una buena historia de pagos no convierte una cuota que no cabe en una cuota sostenible.

Comprueba tu nivel de deuda y la cuota que podrías asumir con la **calculadora de capacidad de endeudamiento**.`
  },
];
