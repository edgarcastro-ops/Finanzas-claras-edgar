export const calculatorGuides: Record<string, string> = {
  "calculadora-prestamo-personal": `## Cómo funciona esta calculadora

Usa el sistema de cuota fija. Cada mes pagas la misma cuota, pero su composición cambia: al principio la mayor parte son intereses y, con el tiempo, cada vez más va a reducir tu deuda.

Necesita tres datos: el monto que pides, la tasa de interés anual y el plazo en meses. La cuota se calcula así: Cuota = P × r ÷ (1 − (1 + r)^(−n)), donde P es el monto, r es la tasa mensual (la tasa anual dividida entre 12) y n es el número de meses. La tabla de amortización muestra, mes a mes, cuánto de tu cuota va a intereses, cuánto a capital y cuánto te falta por pagar.

## Ejemplo resuelto

Supón que pides $150,000 con una tasa de 20% anual.

- **A 24 meses:** cuota de unos $7,634.37, intereses totales de unos $33,224.89 y un pago total de unos $183,224.89.
- **A 36 meses:** cuota de unos $5,574.54, intereses totales de unos $50,683.35 y un pago total de unos $200,683.35.

En el primer mes del plan a 24 meses, los intereses son $2,500 (150,000 × 20% ÷ 12) y solo $5,134.37 de tu cuota reduce la deuda. Alargar el plazo 12 meses baja la cuota unos $2,060, pero te cuesta cerca de $17,458 más en intereses.

## Lo que no incluye

La calculadora no incluye comisiones de apertura, seguros, impuestos ni otros cargos. Tampoco simula pagos adelantados; para eso usa la [calculadora de pago anticipado](/calculadoras/calculadora-pago-anticipado). Las cifras del ejemplo son ilustrativas: las condiciones reales dependen de cada entidad.

## Errores comunes

- **Comparar solo la cuota.** Una cuota baja puede esconder un plazo largo y muchos más intereses.
- **Mirar solo la tasa.** Pregunta por el costo total del préstamo, con comisiones y seguros incluidos.
- **Pedir más de lo que necesitas.** Cada peso extra genera intereses durante todo el plazo.
- **Ignorar tu presupuesto.** Antes de firmar, revisa cuánto de tu ingreso puedes destinar a deudas con la [calculadora de capacidad de endeudamiento](/calculadoras/calculadora-capacidad-endeudamiento).

## Preguntas frecuentes

### ¿Qué tasa debo escribir?
La tasa de interés anual que te informe el banco o la financiera. Si la oferta incluye comisiones o seguros, el costo real será mayor que el que muestra esta calculadora.

### ¿Por qué al inicio pago tantos intereses?
Porque los intereses se calculan sobre el saldo pendiente, y al inicio el saldo es el más alto.

### ¿Conviene un plazo más corto?
Reduce los intereses totales, pero sube la cuota. Lo recomendable es elegir el plazo más corto cuya cuota puedas pagar sin apretar tu presupuesto.

### ¿Puedo usarla para comparar ofertas?
Sí. Cambia la tasa y el plazo para cada oferta, o usa el [comparador de préstamos](/calculadoras/comparador-de-prestamos) para verlas lado a lado.
`,
  "calculadora-hipoteca": `## Cómo funciona esta calculadora

Calcula la cuota fija de un crédito para comprar vivienda. El préstamo es el precio de la vivienda menos tu enganche, y la cuota usa la misma fórmula de cuota fija que cualquier crédito a plazo: Cuota = P × r ÷ (1 − (1 + r)^(−n)), con P el monto prestado, r la tasa mensual y n los meses. Además, puedes agregar un pago extra mensual para ver cuánto tiempo y cuántos intereses te ahorras.

## Ejemplo resuelto

Una vivienda de $2,000,000 con un enganche de $400,000 deja un préstamo de $1,600,000. Con una tasa de 10% anual a 240 meses (20 años):

- La cuota es de unos $15,440.35 al mes.
- Los intereses totales suman unos $2,105,683.12. Es decir, pagarías unos $3,705,683 por un préstamo de $1,600,000: más del doble.

Si agregas $2,000 extra cada mes, terminas de pagar en 175 meses (unos 14 años y 7 meses) en lugar de 240, y ahorras unos $666,638.89 en intereses.

## Lo que la cuota no incluye

La cuota no incluye el seguro de la vivienda, los impuestos, el mantenimiento ni los gastos de la compra (escrituración, avalúo y otros). Tenlos presentes al decidir cuánto puedes pagar cada mes. Las cifras del ejemplo son ilustrativas.

## Errores comunes

- **Comprometer demasiado ingreso en la cuota.** Revisa tu límite con la [calculadora de capacidad de endeudamiento](/calculadoras/calculadora-capacidad-endeudamiento).
- **Olvidar los gastos de compra.** Además del enganche, hay costos que se pagan al comprar.
- **Suponer que la tasa no cambia.** Esta calculadora usa una tasa fija; si tu crédito es de tasa variable, la cuota real puede cambiar.
- **Mirar solo la cuota.** Un plazo más largo baja la cuota, pero aumenta mucho el total de intereses.

## Preguntas frecuentes

### ¿Cuánto debería ser el enganche?
No hay una cifra única: depende de la entidad y del programa. Un enganche mayor reduce el monto prestado y, por lo tanto, los intereses.

### ¿Sirve si mi tasa es variable?
Solo como estimación con la tasa actual. Si la tasa cambia, la cuota también.

### ¿Qué pasa si pago de más cada mes?
El pago extra se aplica al capital: reduce el plazo y los intereses. Consulta con tu entidad si cobra comisión por pagos anticipados. También puedes explorar la [calculadora de pago anticipado](/calculadoras/calculadora-pago-anticipado).

### ¿Puedo comparar dos ofertas?
Sí. Cambia la tasa y el plazo para cada una, o usa el [comparador de préstamos](/calculadoras/comparador-de-prestamos).
`,
  "calculadora-interes-compuesto": `## Cómo funciona esta calculadora

Muestra cuánto crece tu dinero cuando los intereses se suman al capital y empiezan a generar sus propios intereses. Necesita cuatro datos: el monto inicial, el aporte mensual, la tasa anual y los años. Cada mes, el saldo se calcula así: saldo = saldo × (1 + tasa anual ÷ 12) + aporte mensual. Los aportes se suman al final de cada mes. La tabla por año te muestra lo que has aportado, los intereses ganados y el total.

## Ejemplo resuelto

Con un monto inicial de $50,000, aportes de $2,000 al mes y una tasa de 8% anual:

- **A 10 años:** llegas a unos $476,874. Aportaste $290,000 y los intereses suman unos $186,874.
- **A 20 años:** llegas a unos $1,424,381. Aportaste $530,000 y los intereses suman unos $894,381.

Al duplicar el tiempo, el total se multiplicó por casi 3, mientras que lo aportado no llegó a duplicarse. Ese es el efecto del tiempo sobre el interés compuesto. Sin aportes mensuales, los $50,000 iniciales llegarían a unos $110,982 en 10 años. Las cifras son ilustrativas; los rendimientos reales varían.

## Qué debes tener en cuenta

La calculadora supone una tasa constante todo el período. No descuenta inflación, comisiones ni impuestos, y no garantiza ningún rendimiento. Úsala para comparar escenarios, no para predecir resultados.

## Errores comunes

- **Suponer un rendimiento alto y constante.** Usa la tasa neta que realmente ofrece el producto.
- **Ignorar la inflación.** Una tasa menor que la inflación te hace perder poder de compra. Lee [¿Tu cuenta de ahorro rinde más que la inflación?](/blog/cuentas-ahorro-tradicionales-pierden-frente-inflacion).
- **Dejar de aportar.** Los aportes constantes pesan tanto como la tasa.
- **Confundir interés simple con compuesto.** En el simple, los intereses no generan nuevos intereses.

## Preguntas frecuentes

### ¿Qué tasa debo usar?
La que realmente ofrece tu producto, después de comisiones y, si aplica, impuestos. No uses una promesa de rendimiento.

### ¿Los aportes se hacen al inicio o al final del mes?
Esta calculadora los suma al final de cada mes.

### ¿Sirve para ahorro y para inversión?
Sirve para cualquier producto con tasa fija y reinversión mensual. Si el rendimiento es variable, es solo una estimación.

### ¿Por qué importa empezar temprano?
Porque el tiempo es lo que más hace crecer el interés compuesto. En el ejemplo, los 10 años adicionales aportaron más de $700,000 en intereses con solo $240,000 más de aportes.
`,
  "calculadora-tarjeta-credito": `## Cómo funciona esta calculadora

Calcula en cuántos meses pagarías tu tarjeta y cuánto pagarías en intereses, según lo que abones cada mes. Necesita el saldo, la tasa anual y tu pago mensual. Cada mes, el interés es el saldo × tasa anual ÷ 12. Tu pago cubre primero ese interés y el resto reduce la deuda. Si tu pago no supera el interés del mes, la deuda nunca baja y la calculadora te lo avisa.

También muestra un escenario de pago mínimo estimado: 2% del saldo más los intereses, con un piso bajo. Es una aproximación; el mínimo real de tu tarjeta depende de tu banco.

## Ejemplo resuelto

Tienes una deuda de $30,000 con una tasa de 48% anual (4% al mes). El interés del primer mes es de $1,200.

- **Pagando $2,000 al mes:** terminas en 24 meses y pagas unos $16,733.92 en intereses.
- **Pagando $3,000 al mes:** terminas en 14 meses y pagas unos $9,074.56 en intereses.
- **Pago mínimo estimado:** unos 240 meses (20 años) y unos $59,450 en intereses, casi el doble de la deuda original.

Subir el pago de $2,000 a $3,000 te ahorra unos $7,659 en intereses y 10 meses. Las cifras son ilustrativas.

## Errores comunes

- **Pagar solo el mínimo.** El saldo baja muy despacio y los intereses se acumulan durante años.
- **Seguir usando la tarjeta mientras pagas.** La calculadora no incluye compras nuevas; si el saldo sube, los resultados cambian.
- **Olvidar comisiones y cargos.** Pueden aumentar el costo real.
- **Pagar cantidades distintas cada mes.** Un pago fijo y constante facilita salir de la deuda.

## Preguntas frecuentes

### ¿Por qué mi deuda no baja?
Si tu pago es menor o igual que el interés mensual, todo se va en intereses. Sube tu pago hasta superar ese monto.

### ¿Qué tasa debo escribir?
La tasa anual que aparece en tu estado de cuenta.

### ¿Qué hago si tengo varias deudas?
Usa la [calculadora de pago de deudas](/calculadoras/calculadora-pago-deudas) para comparar los métodos bola de nieve y avalancha.

### ¿El pago mínimo de la calculadora es exacto?
No. Es una aproximación. Revisa en tu estado de cuenta el pago mínimo real.
`,
  "calculadora-presupuesto-mensual": `## Cómo funciona esta calculadora

Registras tus ingresos netos del mes y cinco grupos de gasto: vivienda, alimentación, transporte, pago de deudas y otros. La calculadora te muestra el total de gastos, el balance (ingresos menos gastos) y tu tasa de ahorro (balance ÷ ingresos). Además lo compara con la regla 50/30/20: 50% para necesidades (vivienda, alimentación, transporte y deudas), 30% para deseos ("Otros") y 20% para ahorro.

## Ejemplo resuelto

Con ingresos de $25,000 y estos gastos: vivienda $8,000, alimentación $5,000, transporte $2,000, deudas $3,000 y otros $3,500.

- Gastos totales: $21,500. Balance: $3,500. Tasa de ahorro: 14%.
- Necesidades: $18,000, es decir, 72% del ingreso (la referencia es 50%, o $12,500).
- Deseos: $3,500 (la referencia es 30%, o $7,500).
- Ahorro: $3,500 (la referencia es 20%, o $5,000).

La lectura: lo que más pesa son las necesidades, no los gustos. En un caso así, conviene revisar la vivienda, el transporte o las deudas antes que recortar en "otros". Las cifras son ilustrativas.

## Errores comunes

- **Usar el ingreso bruto.** Usa lo que realmente llega a tu cuenta.
- **Olvidar gastos que no son mensuales.** Seguros anuales, útiles escolares o regalos: divídelos entre 12.
- **Poner "otros" muy bajo para que todo cuadre.** Un presupuesto irreal no se sostiene.
- **Hacerlo una sola vez.** Revísalo cada mes, porque los precios y tus gastos cambian.

## Preguntas frecuentes

### ¿Qué cuenta como necesidad?
Lo que no puedes dejar de pagar: vivienda, comida, transporte para trabajar y pagos mínimos de deudas.

### ¿Es obligatorio cumplir el 50/30/20?
No. Es una referencia. En ciudades caras es común que las necesidades pasen del 50%.

### ¿Qué hago si mi balance es negativo?
Busca primero dónde recortar o cómo subir ingresos, y evita cubrir el hueco con deuda nueva. Empieza por revisar tus pagos de deudas y de vivienda.

### ¿Cuánto debería ahorrar?
La referencia es 20%, pero empieza con lo que puedas. Lee [Cómo hacer un presupuesto 50/30/20](/blog/presupuesto-50-30-20) y [Fondo de emergencia: cuánto necesitas](/blog/fondo-de-emergencia-cuanto-necesitas).
`,
  "calculadora-ahorro-meta": `## Cómo funciona esta calculadora

Indica cuánto quieres reunir, cuánto tienes ahorrado, el plazo en meses y un rendimiento anual estimado. Con esos datos calcula el aporte mensual necesario y muestra cómo podrían crecer el saldo y tus aportes. El resultado depende de que mantengas la aportación y de que el rendimiento supuesto se cumpla.

## Cómo usar el resultado

Si el aporte mensual supera lo que puedes separar, prueba un plazo más largo, una meta menor o un aporte inicial mayor. Si incluyes rendimiento, usa una tasa prudente y recuerda que no es una promesa: las tasas pueden cambiar y el cálculo no descuenta impuestos ni comisiones.

## Errores comunes

- **No contar el ahorro inicial.** Inclúyelo para que el aporte mensual no quede sobredimensionado.
- **Poner una tasa optimista.** Compara también el escenario sin rendimiento.
- **Elegir una fecha rígida.** Deja margen para imprevistos y revisa el plan cuando cambien tus ingresos.

## Preguntas frecuentes

### ¿El aporte calculado garantiza que alcanzaré la meta?
No. Es una proyección matemática que supone aportes y rendimiento constantes.

### ¿Qué tasa debo escribir?
La tasa anual que esperas recibir, preferiblemente neta de cargos y con un supuesto conservador. Si no sabes cuál será, usa cero para planificar sin depender de intereses.
`,
  "calculadora-pago-deudas": `## Cómo funciona esta calculadora

Registra cada deuda con su saldo, tasa de interés y pago mínimo, y añade cuánto dinero extra puedes destinar al mes. La herramienta compara dos órdenes para aplicar ese extra: avalancha, que prioriza la tasa más alta, y bola de nieve, que prioriza el saldo más pequeño. En ambos casos debes seguir cubriendo los pagos mínimos de las demás deudas.

## Cómo interpretar la comparación

La avalancha suele reducir el interés total si mantienes el plan y las tasas no cambian. La bola de nieve puede dar avances visibles antes al cerrar una cuenta pequeña. Compara los resultados con tu presupuesto real y elige una estrategia que puedas sostener; no uses dinero necesario para vivienda, alimentación o emergencias.

## Errores comunes

- **Olvidar una deuda o comisión.** Incluye todos los saldos y revisa cargos de mora.
- **Dejar de pagar mínimos.** El extra se suma a los mínimos; no los sustituye.
- **Seguir usando las cuentas pagadas.** Las compras nuevas cambian el saldo y el plazo.

## Preguntas frecuentes

### ¿Cuál método ahorra más intereses?
En general, avalancha, porque ataca primero la tasa más alta. El resultado exacto depende de los saldos, tasas y pagos introducidos.

### ¿Puedo cambiar de método?
Sí. Puedes revisar el plan cuando cambien tus ingresos o saldos, siempre que mantengas los pagos requeridos.
`,
  "calculadora-jubilacion": `## Cómo funciona esta calculadora

Introduce tu edad actual, la edad a la que te gustaría retirarte, el ahorro acumulado, el aporte mensual y un rendimiento anual estimado. La proyección aplica ese rendimiento durante el tiempo restante y estima cuánto capital podrías acumular. También muestra una renta orientativa basada en retirar 4% del capital al año.

## Cómo leer la proyección

Compara el capital proyectado con el total que habrás aportado: la diferencia representa rendimientos estimados, no una ganancia garantizada. Prueba distintas edades y aportes para ver qué variables tienen más efecto. Considera que la inflación reduce el poder adquisitivo de una cifra futura.

## Límites y errores comunes

- **Tomar el 4% como promesa.** Es una regla de referencia, no una renta asegurada ni adecuada para todos.
- **Suponer un rendimiento constante.** Los mercados y productos pueden variar.
- **Olvidar impuestos, comisiones y pensiones.** Esta herramienta no los integra ni sustituye una proyección oficial.

## Preguntas frecuentes

### ¿La renta estimada incluye pensión pública?
No. Solo se calcula a partir del capital proyectado en esta herramienta.

### ¿Qué rendimiento debo usar?
Prueba varios supuestos prudentes y revisa si son coherentes con el producto, sus costos y tu horizonte.
`,
  "conversor-de-moneda": `## Cómo funciona esta calculadora

Introduce el importe de origen, la tasa de cambio que te ofrece el banco o proveedor y la comisión aplicable. El resultado estima cuánto recibes en la moneda de destino y qué efecto tiene el cargo. La tasa no se actualiza automáticamente: debes copiar la cotización de la operación que quieres evaluar.

## Cómo comparar cotizaciones

Usa la misma cantidad y las mismas monedas al comparar proveedores. Comprueba si la comisión es un porcentaje o un cargo fijo y si ya está incluida en la tasa que te cotizaron. Compara el importe final que recibirías, no solo el tipo de cambio anunciado.

## Errores comunes

- **Confundir el sentido de la tasa.** Verifica si indica unidades de destino por cada unidad de origen.
- **Contar la comisión dos veces.** Revisa las condiciones de la cotización.
- **Comparar tasas de momentos distintos.** Las cotizaciones pueden cambiar rápidamente.

## Preguntas frecuentes

### ¿La tasa es en tiempo real?
No. La introduces tú para reflejar una cotización concreta.

### ¿El resultado garantiza el importe que recibiré?
No. El proveedor puede aplicar cargos o una tasa distinta al confirmar la operación; verifica el importe final antes de aceptar.
`,
  "calculadora-salario-neto": `## Cómo funciona esta calculadora

Escribe el salario bruto, el número de pagas y los porcentajes de descuento que deseas considerar. La calculadora aplica esos porcentajes para estimar cuánto recibirías neto. No selecciona automáticamente las deducciones de un país ni sustituye el cálculo de una nómina.

## Cómo usarla para comparar ofertas

Introduce los conceptos de descuento que efectivamente aparezcan en la oferta o en una nómina reciente. Asegúrate de que el salario y los porcentajes correspondan al mismo periodo. Si recibes pagas extraordinarias, compara tanto el promedio mensual como el importe y calendario de cada pago.

## Errores comunes

- **Confundir salario bruto anual y mensual.** Usa el periodo que indique cada campo.
- **Usar una tasa aproximada como si fuera legalmente exacta.** Las retenciones pueden depender de reglas locales y de tu situación.
- **Olvidar pagos variables o beneficios.** No todos se calculan como salario ordinario.

## Preguntas frecuentes

### ¿Calcula impuestos de República Dominicana, México u otro país?
No. Tú introduces los porcentajes; la herramienta no aplica tablas tributarias nacionales.

### ¿Por qué puede diferir de mi nómina?
Puede haber conceptos, topes, retenciones o reglas que no hayas incluido. Contrasta el resultado con tu empleador o con un profesional local.
`,
  "calculadora-prestamo-vehicular": `## Cómo funciona esta calculadora

Indica el precio del vehículo, el enganche, la tasa anual y el plazo. La calculadora estima el importe financiado, la cuota periódica y el coste de intereses mediante pagos de cuota fija. Si agregas pagos extraordinarios, puedes observar cómo afectarían el plazo y el coste estimado.

## Cómo comparar opciones

Compara el mismo vehículo, enganche y plazo entre ofertas. Considera el coste total y no solo la cuota: un plazo largo puede hacer que el saldo pendiente tarde en bajar mientras el vehículo pierde valor. Revisa por separado seguros, impuestos, comisiones, mantenimiento y otros cargos que no se incluyen en esta estimación.

## Errores comunes

- **Tratar el enganche como gasto sin efecto.** Un enganche mayor reduce el importe sobre el que pagas intereses.
- **Extender el plazo solo para reducir la cuota.** Puede elevar mucho el coste total.
- **No revisar pagos anticipados.** Confirma si hay cargos o condiciones para aplicarlos a capital.

## Preguntas frecuentes

### ¿La cuota incluye seguro y gastos del vehículo?
No. Revisa la oferta y el contrato para conocer esos conceptos.

### ¿La tasa es fija?
La proyección supone la tasa anual indicada. Si el contrato es variable, la cuota real puede cambiar.
`,
  "calculadora-prestamo-estudiantil": `## Cómo funciona esta calculadora

Introduce el importe del crédito educativo, la tasa anual y el plazo para estimar la cuota fija, los intereses totales y el calendario de amortización. También puedes comparar el efecto de pagos extra a capital. La proyección supone que el crédito empieza a amortizarse según esos datos.

## Antes de aceptar un crédito

Revisa cuándo comienza el pago, si hay un periodo de gracia, cómo se acumulan intereses durante los estudios y si la tasa puede variar. Esas condiciones pueden modificar el saldo inicial y no se modelan en esta estimación. Compara la cuota con un ingreso realista al terminar tus estudios, no con un salario ideal.

## Errores comunes

- **Mirar solo la cuota.** Compara el total a devolver y la duración.
- **Ignorar comisiones o seguros.** Pueden elevar el coste de la oferta.
- **Suponer que el periodo de gracia es gratuito.** Confirma por escrito cómo se cobran los intereses.

## Preguntas frecuentes

### ¿Incluye un periodo sin pagos durante los estudios?
No se simula una etapa de gracia o capitalización previa; consulta las condiciones del crédito.

### ¿Los pagos extra reducen el coste?
Cuando se aplican directamente al capital, pueden reducir intereses futuros. Verifica cómo los procesa la entidad y si cobra comisión.
`,
  "calculadora-prestamo-empresarial": `## Cómo funciona esta calculadora

Escribe el importe del crédito, la tasa anual y el plazo. La herramienta estima una cuota fija, el total de intereses y la evolución del saldo. Puedes evaluar pagos extra si la oferta permite abonar capital durante el plazo.

## Cómo valorar el crédito para tu negocio

Compara la cuota con el flujo de caja disponible después de gastos operativos e impuestos, no con las ventas brutas. Prueba meses de ingresos bajos y confirma si el contrato exige garantías, seguros, comisiones o una tasa variable. Esos elementos pueden cambiar la conveniencia y no se reflejan necesariamente en la cuota estimada.

## Errores comunes

- **Usar facturación como capacidad de pago.** Considera costos, nómina y obligaciones existentes.
- **Comparar plazos diferentes solo por cuota.** Mira también el total de intereses.
- **Ignorar cargos iniciales.** Incluye comisiones en tu evaluación externa.

## Preguntas frecuentes

### ¿Incluye comisiones de apertura o estudio?
No necesariamente. Revisa la propuesta formal y suma los cargos aplicables.

### ¿Puedo usarla para una tasa variable?
Solo como escenario con la tasa escrita. Si cambia durante el crédito, el resultado real será distinto.
`,
  "calculadora-refinanciamiento": `## Cómo funciona esta calculadora

Compara las condiciones del crédito actual con una nueva oferta: saldo, tasa, plazo y gastos asociados. La herramienta estima las cuotas y el coste de ambos escenarios, y ayuda a identificar cuándo el ahorro acumulado podría compensar los gastos de cambiar de crédito.

## Cómo decidir si el cambio compensa

Usa el saldo de cancelación actualizado, no el importe original del préstamo. Incluye comisiones de apertura, cancelación y otros cargos conocidos. Si planeas vender, cambiar de entidad otra vez o terminar de pagar antes, comprueba si alcanzarías el punto de equilibrio durante el tiempo que mantendrás el nuevo crédito.

## Errores comunes

- **Comparar solo las tasas o cuotas.** Un plazo más largo puede bajar la cuota y elevar el coste total.
- **Olvidar gastos del cambio.** Restan al ahorro potencial.
- **Comparar periodos distintos sin indicarlo.** Asegúrate de evaluar obligaciones y plazos equivalentes.

## Preguntas frecuentes

### ¿Una tasa menor siempre significa ahorro?
No. Los gastos y la duración pueden neutralizar la diferencia.

### ¿La herramienta decide por mí?
No. Es una estimación; confirma los saldos y condiciones por escrito con las entidades.
`,
  "calculadora-capacidad-endeudamiento": `## Cómo funciona esta calculadora

Indica tus ingresos mensuales netos, otros ingresos estables, las cuotas de deudas actuales, la nueva cuota propuesta y el límite de endeudamiento que quieres usar. La herramienta calcula la proporción de ingreso destinada a deudas antes y después del nuevo crédito y estima la cuota máxima compatible con el límite elegido.

## Cómo interpretar el resultado

El porcentaje es una referencia para organizar tu presupuesto, no una aprobación bancaria. Usa ingresos que realmente recibes y pagos obligatorios actualizados. Antes de asumir una cuota, reserva margen para vivienda, alimentación, servicios, ahorro y gastos imprevistos.

## Errores comunes

- **Usar ingresos brutos o inciertos.** Basa el cálculo en ingresos netos y estables.
- **Omitir tarjetas u otras obligaciones.** Incluye los pagos recurrentes relevantes.
- **Tomar un porcentaje recomendado como regla universal.** La capacidad depende de tus gastos y de las políticas de cada entidad.

## Preguntas frecuentes

### ¿Qué límite debería elegir?
No existe uno adecuado para todas las personas. Prueba un límite conservador y verifica cuánto dinero queda después de tus gastos esenciales.

### ¿El resultado garantiza que aprobarán mi solicitud?
No. Cada entidad evalúa ingresos, historial y otros criterios propios.
`,
  "comparador-de-prestamos": `## Cómo funciona esta calculadora

Permite introducir hasta tres ofertas con importe, tasa, plazo y comisión de apertura. Estima la cuota y los intereses de cada una y muestra los cargos para que puedas comparar el coste del crédito bajo condiciones equivalentes.

## Cómo comparar correctamente

Compara ofertas para el mismo importe y una necesidad similar. Revisa el coste total, las comisiones, los seguros obligatorios y si la tasa es fija o variable. Una cuota más baja puede deberse a un plazo más largo; comprueba cuánto pagarías durante todo el crédito y cuánto quedaría pendiente si haces pagos anticipados.

## Errores comunes

- **Comparar montos o plazos distintos como si fueran iguales.** Normaliza los datos primero.
- **Olvidar cargos que no están en el formulario.** Consulta el contrato y la tabla de costos.
- **Elegir automáticamente la cuota menor.** Asegúrate de que el coste total y el plazo sean adecuados.

## Preguntas frecuentes

### ¿La oferta con menor coste calculado siempre es la mejor?
No necesariamente. La flexibilidad, los cargos omitidos y las condiciones del contrato también importan.

### ¿La comparación incluye todos los seguros e impuestos?
No, salvo que se introduzcan en un campo específico. Confirma el coste total con cada entidad.
`,
  "calculadora-pago-anticipado": `## Cómo funciona esta calculadora

Introduce el saldo pendiente, la tasa y las condiciones del crédito; después añade el pago extra que quieres evaluar. La herramienta estima cuánto podría reducirse el plazo y el interés si ese dinero se aplica al capital. El efecto depende del momento y de la forma en que la entidad procese el abono.

## Antes de hacer un abono

Solicita el saldo de liquidación y pregunta si el pago extra reduce el plazo, la cuota o ambos. Revisa comisiones, mínimos y fechas de aplicación. Si mantienes la cuota y reduces el plazo, normalmente el saldo se amortiza antes; la entidad puede ofrecer opciones distintas.

## Errores comunes

- **Suponer que todo pago extra va al capital.** Confírmalo con el prestamista.
- **No considerar una comisión.** Inclúyela al valorar el ahorro neto.
- **Usar dinero de emergencia.** Conserva una reserva para gastos imprevistos.

## Preguntas frecuentes

### ¿Es mejor reducir la cuota o el plazo?
Depende de tu prioridad: aliviar el presupuesto mensual o terminar antes. Pide a la entidad ambos escenarios y compara sus costos.

### ¿El ahorro calculado es exacto?
No. Es una estimación que puede diferir por fechas, reglas de amortización y cargos contractuales.
`,
  "calculadora-prestaciones-rd": `## Cómo funciona esta calculadora

Ingresa el salario mensual en pesos dominicanos, las fechas de inicio y terminación, el motivo de salida y si se otorgó el preaviso. La estimación presenta conceptos como preaviso, cesantía, vacaciones proporcionales y regalía pascual, según los supuestos incorporados en la herramienta y el tiempo de servicio.

## Cómo revisar los datos

Confirma que las fechas y el salario reflejen el caso real. El cálculo usa una conversión estimada de salario mensual a diario y simplifica promedios, comisiones y otros componentes variables. Los resultados se muestran en DOP; el selector global de moneda no los convierte.

## Importante sobre el resultado

Es una orientación, no una liquidación oficial ni una determinación de derechos. La elegibilidad y el monto pueden depender del motivo de terminación, modalidad de pago y circunstancias concretas. Contrasta el resultado con el Ministerio de Trabajo de República Dominicana o con un profesional laboral.

## Preguntas frecuentes

### ¿Qué conceptos se estiman?
La herramienta desglosa los conceptos configurados en pantalla, incluyendo los que correspondan según el motivo y las fechas.

### ¿Puedo usar otra moneda?
No para este cálculo: escribe el salario en pesos dominicanos y revisa los resultados en DOP.
`,
  "calculadora-finiquito-mexico": `## Cómo funciona esta calculadora

Selecciona si el salario es mensual o diario y escribe el importe en pesos mexicanos. Añade los años y meses completos de servicio, los días trabajados del año, las vacaciones pendientes y el motivo de terminación. La estimación separa conceptos proporcionales, como aguinaldo, vacaciones no disfrutadas y prima vacacional; según el supuesto seleccionado puede incluir indemnización y prima de antigüedad.

## Cómo revisar el resultado

Comprueba los días trabajados, las vacaciones pendientes y el salario base. El tope de prima de antigüedad es editable; verifica cuál corresponde a tu zona y situación. El cálculo no determina por sí mismo si una terminación fue justificada ni sustituye una revisión de documentos laborales.

## Límites importantes

La herramienta no calcula el Salario Diario Integrado completo, PTU ni retenciones de ISR sobre indemnizaciones. La aplicación de conceptos y topes puede depender del caso y de la ley vigente; consulta la LFT y a PROFEDET o a un especialista.

## Preguntas frecuentes

### ¿El resultado es una liquidación oficial?
No. Es una estimación informativa basada en los supuestos visibles.

### ¿La moneda global cambia los resultados?
No. Los importes se ingresan y muestran en MXN.
`,
};
