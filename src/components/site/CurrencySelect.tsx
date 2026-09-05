import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCIES, useCurrency } from "@/lib/currency";

export function CurrencySelect() {
  const { code, setCode } = useCurrency();

  return (
    <Select value={code} onValueChange={setCode}>
      <SelectTrigger
        aria-label="Seleccionar moneda"
        className="h-9 w-auto gap-1.5 rounded-lg border-border px-2.5 text-xs font-semibold"
      >
        <SelectValue placeholder="Moneda" />
      </SelectTrigger>
      <SelectContent align="end">
        {CURRENCIES.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            <span className="flex items-center gap-2">
              <span aria-hidden>{c.flag}</span>
              <span className="font-semibold">{c.code}</span>
              <span className="hidden text-muted-foreground sm:inline">{c.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
