export interface Tool {
  slug: string;
  href: string;
  title: string;
  short: string;
  description: string;
  category: string;
  icon: "trending" | "landmark" | "credit" | "piggy" | "home" | "receipt" | "wallet" | "target";
  status: "activa" | "proximamente";
}

export const tools: Tool[] = [
  {
    slug: "calculadora-interes-compuesto",
    href: "/herramientas/calculadora-interes-compuesto",
    title: "Calculadora de interés compuesto",
    short: "Proyecta cuánto crece tu dinero invirtiendo cada mes.",
    description:
      "Simula el crecimiento de tus ahorros con aportes mensuales y descubre cuánto viene de tu bolsillo y cuánto de los intereses.",
    category: "Inversión",
    icon: "trending",
    status: "activa",
  },
  {
    slug: "calculadora-prestamo-personal",
    href: "/herramientas/calculadora-prestamo-personal",
    title: "Calculadora de préstamo personal",
    short: "Cuota mensual y tabla de amortización completa.",
    description:
      "Conoce tu cuota exacta, cuánto pagarás de intereses y cómo evoluciona tu deuda mes a mes.",
    category: "Crédito",
    icon: "landmark",
    status: "activa",
  },
  {
    slug: "calculadora-tarjeta-credito",
    href: "/herramientas/calculadora-tarjeta-credito",
    title: "Calculadora de tarjeta de crédito",
    short: "Compara pago mínimo vs. pago fijo y ahorra intereses.",
    description:
      "Descubre en cuánto tiempo saldas tu tarjeta y cuánto te cuesta realmente pagar solo el mínimo.",
    category: "Deuda",
    icon: "credit",
    status: "activa",
  },
  {
    slug: "calculadora-ahorro-meta",
    href: "/herramientas/calculadora-ahorro-meta",
    title: "Calculadora de meta de ahorro",
    short: "Cuánto guardar cada mes para llegar a tu objetivo.",
    description: "Calcula cuánto ahorrar cada mes para alcanzar tu meta en el plazo que te propongas, con o sin rendimiento.",
    category: "Ahorro",
    icon: "target",
    status: "activa",
  },
  {
    slug: "calculadora-hipoteca",
    href: "/herramientas/calculadora-hipoteca",
    title: "Calculadora de hipoteca",
    short: "Cuota, intereses y coste total de tu vivienda.",
    description: "Calcula la cuota de tu hipoteca, los intereses totales y la tabla de amortización, incluyendo entrada y abonos extra a capital.",
    category: "Vivienda",
    icon: "home",
    status: "activa",
  },
  {
    slug: "calculadora-presupuesto-mensual",
    href: "/herramientas/calculadora-presupuesto-mensual",
    title: "Calculadora de presupuesto 50/30/20",
    short: "Reparte tu sueldo entre necesidades, gustos y ahorro.",
    description: "Reparte tu ingreso mensual entre necesidades, gustos y ahorro con la regla 50/30/20 y ajusta los porcentajes a tu realidad.",
    category: "Presupuesto",
    icon: "wallet",
    status: "activa",
  },
  {
    slug: "calculadora-pago-deudas",
    href: "/herramientas/calculadora-pago-deudas",
    title: "Calculadora de pago de deudas",
    short: "Bola de nieve vs. avalancha: cuál te conviene más.",
    description: "Compara el método bola de nieve y el método avalancha para saber cuál elimina tus deudas antes y con menos intereses.",
    category: "Deuda",
    icon: "credit",
    status: "activa",
  },
  {
    slug: "calculadora-jubilacion",
    href: "/herramientas/calculadora-jubilacion",
    title: "Calculadora de jubilación y retiro",
    short: "Proyecta tu capital al momento de retirarte.",
    description: "Proyecta el capital que tendrás al jubilarte según tu edad, tus aportes mensuales y el rendimiento esperado, y la renta que podrías retirar.",
    category: "Jubilación",
    icon: "piggy",
    status: "activa",
  },
  {
    slug: "conversor-de-moneda",
    href: "/herramientas/conversor-de-moneda",
    title: "Conversor de moneda",
    short: "Convierte importes con tu propio tipo de cambio.",
    description: "Convierte importes entre monedas introduciendo tú mismo el tipo de cambio, y calcula el impacto de las comisiones de cambio.",
    category: "Divisas",
    icon: "receipt",
    status: "activa",
  },
  {
    slug: "calculadora-salario-neto",
    href: "/herramientas/calculadora-salario-neto",
    title: "Calculadora de salario neto",
    short: "Convierte tu sueldo bruto en neto al instante.",
    description: "Convierte tu sueldo bruto en neto descontando impuestos y seguridad social, con el desglose mensual y anual.",
    category: "Ingresos",
    icon: "wallet",
    status: "activa",
  },
  {
    slug: "calculadora-prestamo-vehicular",
    href: "/herramientas/calculadora-prestamo-vehicular",
    title: "Calculadora de préstamo vehicular",
    short: "Cuota, enganche e intereses de tu crédito de auto.",
    description: "Calcula la cuota de tu crédito de auto con enganche incluido, el total de intereses y la tabla de pagos mes a mes.",
    category: "Vehículo",
    icon: "landmark",
    status: "activa",
  },
  {
    slug: "calculadora-prestamo-estudiantil",
    href: "/herramientas/calculadora-prestamo-estudiantil",
    title: "Calculadora de préstamo estudiantil",
    short: "Cuota y coste total de tu crédito educativo.",
    description: "Calcula la cuota y el coste total de tu crédito educativo y cuánto ahorras abonando capital extra al terminar los estudios.",
    category: "Educación",
    icon: "landmark",
    status: "activa",
  },
  {
    slug: "calculadora-prestamo-empresarial",
    href: "/herramientas/calculadora-prestamo-empresarial",
    title: "Calculadora de préstamo empresarial",
    short: "Cuota e intereses de un crédito para tu negocio.",
    description: "Calcula la cuota de un crédito para tu negocio, los intereses totales y su tabla de amortización para planificar tu flujo de caja.",
    category: "Negocio",
    icon: "landmark",
    status: "activa",
  },
  {
    slug: "calculadora-refinanciamiento",
    href: "/herramientas/calculadora-refinanciamiento",
    title: "Calculadora de refinanciamiento",
    short: "Compara tu préstamo actual contra una nueva oferta.",
    description: "Compara tu préstamo actual con una nueva oferta y descubre si refinanciar te ahorra dinero, incluyendo comisiones.",
    category: "Crédito",
    icon: "credit",
    status: "activa",
  },
  {
    slug: "calculadora-capacidad-endeudamiento",
    href: "/herramientas/calculadora-capacidad-endeudamiento",
    title: "Calculadora de capacidad de endeudamiento (DTI)",
    short: "Cuánto de tu ingreso puedes destinar a deudas.",
    description: "Calcula qué porcentaje de tu ingreso se va en deudas y cuál es la cuota máxima que puedes asumir antes de pedir un crédito.",
    category: "Crédito",
    icon: "trending",
    status: "activa",
  },
  {
    slug: "comparador-de-prestamos",
    href: "/herramientas/comparador-de-prestamos",
    title: "Comparador de préstamos",
    short: "Compara hasta 3 ofertas de préstamo lado a lado.",
    description: "Compara tres ofertas de préstamo a la vez: cuota, intereses, comisiones y coste total, para saber cuál sale realmente más barata.",
    category: "Crédito",
    icon: "credit",
    status: "activa",
  },
  {
    slug: "calculadora-pago-anticipado",
    href: "/herramientas/calculadora-pago-anticipado",
    title: "Calculadora de pago anticipado",
    short: "Cuánto ahorras abonando capital extra.",
    description: "Descubre cuánto ahorras en intereses y cuántos meses te quitas abonando capital extra a tu préstamo cada mes o de una sola vez.",
    category: "Crédito",
    icon: "target",
    status: "activa",
  },
];

export const activeTools = tools.filter((t) => t.status === "activa");

export const blogCategories = [
  { name: "Ahorro", description: "Hábitos y sistemas para guardar más cada mes." },
  { name: "Inversión", description: "Interés compuesto, fondos y largo plazo." },
  { name: "Deudas", description: "Estrategias para salir de deudas más rápido." },
  { name: "Presupuesto", description: "Métodos simples para controlar tus gastos." },
  { name: "Crédito", description: "Préstamos, hipotecas y salud crediticia." },
  { name: "Educación financiera", description: "Conceptos claros, sin jerga." },
];

export const placeholderPosts = [
  {
    title: "Cómo empezar a invertir desde cero con poco dinero",
    category: "Inversión",
    readTime: "7 min",
  },
  {
    title: "Método bola de nieve vs. avalancha: cuál elimina tus deudas antes",
    category: "Deudas",
    readTime: "6 min",
  },
  {
    title: "El presupuesto 50/30/20 explicado con ejemplos reales",
    category: "Presupuesto",
    readTime: "5 min",
  },
];
