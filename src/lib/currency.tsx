import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
  locale: string;
  flag: string;
}

export const CURRENCIES: CurrencyOption[] = [
  { code: "USD", name: "Dólar estadounidense", symbol: "$", locale: "es-US", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", locale: "es-ES", flag: "🇪🇸" },
  { code: "MXN", name: "Peso mexicano", symbol: "$", locale: "es-MX", flag: "🇲🇽" },
  { code: "COP", name: "Peso colombiano", symbol: "$", locale: "es-CO", flag: "🇨🇴" },
  { code: "ARS", name: "Peso argentino", symbol: "$", locale: "es-AR", flag: "🇦🇷" },
  { code: "CLP", name: "Peso chileno", symbol: "$", locale: "es-CL", flag: "🇨🇱" },
  { code: "PEN", name: "Sol peruano", symbol: "S/", locale: "es-PE", flag: "🇵🇪" },
  { code: "DOP", name: "Peso dominicano", symbol: "RD$", locale: "es-DO", flag: "🇩🇴" },
  { code: "GTQ", name: "Quetzal guatemalteco", symbol: "Q", locale: "es-GT", flag: "🇬🇹" },
  { code: "UYU", name: "Peso uruguayo", symbol: "$U", locale: "es-UY", flag: "🇺🇾" },
];

const regionToCurrency: Record<string, string> = {
  US: "USD",
  ES: "EUR",
  MX: "MXN",
  CO: "COP",
  AR: "ARS",
  CL: "CLP",
  PE: "PEN",
  DO: "DOP",
  GT: "GTQ",
  UY: "UYU",
};

const STORAGE_KEY = "fc-currency";
const DEFAULT_CODE = "USD";

export function getCurrencyOption(code: string): CurrencyOption {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0]!;
}

function detectCurrency(): string {
  try {
    const locale = navigator.language || "";
    const region =
      new Intl.Locale(locale).region ?? locale.split("-")[1]?.toUpperCase() ?? "";
    const code = regionToCurrency[region];
    if (code) return code;
  } catch {
    // ignore
  }
  return DEFAULT_CODE;
}

export function formatMoney(
  value: number,
  code: string,
  maximumFractionDigits = 0,
): string {
  const option = getCurrencyOption(code);
  return new Intl.NumberFormat(option.locale, {
    style: "currency",
    currency: option.code,
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

interface CurrencyContextValue {
  code: string;
  option: CurrencyOption;
  setCode: (code: string) => void;
  money: (value: number, maximumFractionDigits?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCodeState] = useState<string>(DEFAULT_CODE);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setCodeState(stored && CURRENCIES.some((c) => c.code === stored) ? stored : detectCurrency());
  }, []);

  const setCode = (next: string) => {
    setCodeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo<CurrencyContextValue>(
    () => ({
      code,
      option: getCurrencyOption(code),
      setCode,
      money: (v, digits) => formatMoney(v, code, digits),
    }),
    [code],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency debe usarse dentro de <CurrencyProvider>");
  return ctx;
}
