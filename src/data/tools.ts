export interface Tool {
  slug: string;
  href: string;
  title: string;
  short: string;
  description: string;
  category: string;
  icon: "trending" | "landmark" | "credit" | "piggy" | "home" | "receipt" | "wallet" | "target";
}

export const tools: Tool[] = [
  {
    slug: "calculadora-interes-compuesto",
    href: "/calculadoras/calculadora-interes-compuesto",
    title: "Calculadora de interés compuesto",
    short: "Proyecta cuánto crece tu dinero invirtiendo cada mes.",
    description:
      "Simula el crecimiento de tus ahorros con aportes mensuales y descubre cuánto viene de tu bolsillo y cuánto de los intereses.",
    category: "Inversión",
    icon: "trending",
  },
  {
    slug: "calculadora-prestamo-personal",
    href: "/calculadoras/calculadora-prestamo-personal",
    title: "Calculadora de préstamo personal",
    short: "Cuota mensual y tabla de amortización completa.",
    description:
      "Conoce tu cuota exacta, cuánto pagarás de intereses y cómo evoluciona tu deuda mes a mes.",
    category: "Crédito",
    icon: "landmark",
  },
  {
    slug: "calculadora-tarjeta-credito",
    href: "/calculadoras/calculadora-tarjeta-credito",
    title: "Calculadora de tarjeta de crédito",
    short: "Compara pago mínimo vs. pago fijo y ahorra intereses.",
    description:
      "Descubre en cuánto tiempo saldas tu tarjeta y cuánto te cuesta realmente pagar solo el mínimo.",
    category: "Deuda",
    icon: "credit",
  },
  {
    slug: "calculadora-ahorro-meta",
    href: "/calculadoras/calculadora-ahorro-meta",
    title: "Calculadora de meta de ahorro",
    short: "Cuánto guardar cada mes para llegar a tu objetivo.",
    description:
      "Calcula cuánto ahorrar cada mes para alcanzar tu meta en el plazo que te propongas, con o sin rendimiento.",
    category: "Ahorro",
    icon: "target",
  },
  {
    slug: "calculadora-hipoteca",
    href: "/calculadoras/calculadora-hipoteca",
    title: "Calculadora de hipoteca",
    short: "Cuota, intereses y coste total de tu vivienda.",
    description:
      "Calcula la cuota de tu hipoteca, los intereses totales y la tabla de amortización, incluyendo entrada y abonos extra a capital.",
    category: "Vivienda",
    icon: "home",
  },
  {
    slug: "calculadora-presupuesto-mensual",
    href: "/calculadoras/calculadora-presupuesto-mensual",
    title: "Calculadora de presupuesto 50/30/20",
    short: "Reparte tu sueldo entre necesidades, gustos y ahorro.",
    description:
      "Reparte tu ingreso mensual entre necesidades, gustos y ahorro con la regla 50/30/20 y ajusta los porcentajes a tu realidad.",
    category: "Presupuesto",
    icon: "wallet",
  },
  {
    slug: "calculadora-pago-deudas",
    href: "/calculadoras/calculadora-pago-deudas",
    title: "Calculadora de pago de deudas",
    short: "Bola de nieve vs. avalancha: cuál te conviene más.",
    description:
      "Compara el método bola de nieve y el método avalancha para saber cuál elimina tus deudas antes y con menos intereses.",
    category: "Deuda",
    icon: "credit",
  },
  {
    slug: "calculadora-jubilacion",
    href: "/calculadoras/calculadora-jubilacion",
    title: "Calculadora de jubilación y retiro",
    short: "Proyecta tu capital al momento de retirarte.",
    description:
      "Proyecta el capital que tendrás al jubilarte según tu edad, tus aportes mensuales y el rendimiento esperado, y la renta que podrías retirar.",
    category: "Jubilación",
    icon: "piggy",
  },
  {
    slug: "conversor-de-moneda",
    href: "/calculadoras/conversor-de-moneda",
    title: "Conversor de moneda",
    short: "Convierte importes con tu propio tipo de cambio.",
    description:
      "Convierte importes con el tipo de cambio que indiques y descuenta una comisión porcentual para estimar el importe neto.",
    category: "Divisas",
    icon: "receipt",
  },
  {
    slug: "calculadora-salario-neto",
    href: "/calculadoras/calculadora-salario-neto",
    title: "Calculadora de salario neto",
    short: "Convierte tu sueldo bruto en neto al instante.",
    description:
      "Convierte tu sueldo bruto en neto descontando impuestos y seguridad social, con el desglose mensual y anual.",
    category: "Ingresos",
    icon: "wallet",
  },
  {
    slug: "calculadora-prestamo-vehicular",
    href: "/calculadoras/calculadora-prestamo-vehicular",
    title: "Calculadora de préstamo vehicular",
    short: "Cuota, enganche e intereses de tu crédito de auto.",
    description:
      "Calcula la cuota de tu crédito de auto con enganche incluido, el total de intereses y la tabla de pagos mes a mes.",
    category: "Vehículo",
    icon: "landmark",
  },
  {
    slug: "calculadora-prestamo-estudiantil",
    href: "/calculadoras/calculadora-prestamo-estudiantil",
    title: "Calculadora de préstamo estudiantil",
    short: "Cuota y coste total de tu crédito educativo.",
    description:
      "Calcula la cuota y el coste total de tu crédito educativo y cuánto ahorras abonando capital extra al terminar los estudios.",
    category: "Educación",
    icon: "landmark",
  },
  {
    slug: "calculadora-prestamo-empresarial",
    href: "/calculadoras/calculadora-prestamo-empresarial",
    title: "Calculadora de préstamo empresarial",
    short: "Cuota e intereses de un crédito para tu negocio.",
    description:
      "Calcula la cuota de un crédito para tu negocio, los intereses totales y su tabla de amortización para planificar tu flujo de caja.",
    category: "Negocio",
    icon: "landmark",
  },
  {
    slug: "calculadora-refinanciamiento",
    href: "/calculadoras/calculadora-refinanciamiento",
    title: "Calculadora de refinanciamiento",
    short: "Compara tu préstamo actual contra una nueva oferta.",
    description:
      "Compara tu préstamo actual con una nueva oferta y descubre si refinanciar te ahorra dinero, incluyendo comisiones.",
    category: "Crédito",
    icon: "credit",
  },
  {
    slug: "calculadora-capacidad-endeudamiento",
    href: "/calculadoras/calculadora-capacidad-endeudamiento",
    title: "Calculadora de capacidad de endeudamiento (DTI)",
    short: "Cuánto de tu ingreso puedes destinar a deudas.",
    description:
      "Calcula qué porcentaje de tu ingreso se va en deudas y cuál es la cuota máxima que puedes asumir antes de pedir un crédito.",
    category: "Crédito",
    icon: "trending",
  },
  {
    slug: "comparador-de-prestamos",
    href: "/calculadoras/comparador-de-prestamos",
    title: "Comparador de préstamos",
    short: "Compara hasta 3 ofertas de préstamo lado a lado.",
    description:
      "Compara tres ofertas de préstamo a la vez: cuota, intereses, comisiones y coste total, para saber cuál sale realmente más barata.",
    category: "Crédito",
    icon: "credit",
  },
  {
    slug: "calculadora-pago-anticipado",
    href: "/calculadoras/calculadora-pago-anticipado",
    title: "Calculadora de pago anticipado",
    short: "Cuánto ahorras abonando capital extra.",
    description:
      "Descubre cuánto ahorras en intereses y cuántos meses te quitas abonando capital extra a tu préstamo cada mes o de una sola vez.",
    category: "Crédito",
    icon: "target",
  },
  {
    slug: "calculadora-prestaciones-rd",
    href: "/calculadoras/calculadora-prestaciones-rd",
    title: "Calculadora de prestaciones laborales RD",
    short: "Estima preaviso, cesantía, vacaciones y regalía pascual.",
    description:
      "Calcula una estimación de las prestaciones laborales en República Dominicana según el motivo de terminación y la antigüedad.",
    category: "Laboral",
    icon: "receipt",
  },
  {
    slug: "calculadora-finiquito-mexico",
    href: "/calculadoras/calculadora-finiquito-mexico",
    title: "Calculadora de finiquito y liquidación de México",
    short: "Desglosa finiquito y liquidación por despido.",
    description:
      "Estima aguinaldo, vacaciones, prima vacacional y, cuando corresponda, indemnización y prima de antigüedad conforme a la LFT.",
    category: "Laboral",
    icon: "wallet",
  },
];

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
