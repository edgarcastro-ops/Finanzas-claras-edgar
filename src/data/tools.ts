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
    href: "/herramientas",
    title: "Calculadora de meta de ahorro",
    short: "Cuánto guardar cada mes para llegar a tu objetivo.",
    description: "Define una meta y un plazo, y calcula el aporte mensual necesario.",
    category: "Ahorro",
    icon: "target",
    status: "proximamente",
  },
  {
    slug: "calculadora-hipoteca",
    href: "/herramientas",
    title: "Calculadora de hipoteca",
    short: "Cuota, intereses y coste total de tu vivienda.",
    description: "Simula la compra de vivienda incluyendo entrada, plazo y tipo de interés.",
    category: "Vivienda",
    icon: "home",
    status: "proximamente",
  },
  {
    slug: "calculadora-presupuesto-50-30-20",
    href: "/herramientas",
    title: "Presupuesto 50/30/20",
    short: "Reparte tu sueldo entre necesidades, gustos y ahorro.",
    description: "Un plan de gasto claro a partir de tu ingreso mensual neto.",
    category: "Presupuesto",
    icon: "wallet",
    status: "proximamente",
  },
  {
    slug: "calculadora-fondo-emergencia",
    href: "/herramientas",
    title: "Fondo de emergencia",
    short: "Cuánto colchón necesitas según tus gastos.",
    description: "Calcula el fondo ideal para 3, 6 o 12 meses de gastos.",
    category: "Ahorro",
    icon: "piggy",
    status: "proximamente",
  },
  {
    slug: "calculadora-inflacion",
    href: "/herramientas",
    title: "Calculadora de inflación",
    short: "Cuánto valdrá tu dinero dentro de unos años.",
    description: "Compara el poder adquisitivo de tu dinero a lo largo del tiempo.",
    category: "Economía",
    icon: "receipt",
    status: "proximamente",
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
