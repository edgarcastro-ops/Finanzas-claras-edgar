import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormattedNumberInput } from "@/components/calculators/FormattedNumberInput";
import { getNumberInputMax, normalizeNumberInput } from "@/lib/number-input";

interface FieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max?: number;
  maxInput?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  formatThousands?: boolean;
}

export function Field({
  id,
  label,
  value,
  onChange,
  min,
  max,
  maxInput,
  step = 1,
  prefix,
  suffix,
  formatThousands = Boolean(prefix),
}: FieldProps) {
  const minimum = Number.isFinite(min) ? min : 0;
  const maximum =
    max !== undefined && Number.isFinite(max) ? Math.max(max, minimum) : 1_000_000_000_000;
  const inputMax = getNumberInputMax(suffix, maxInput, minimum);
  const [inputValue, setInputValue] = useState(String(Number.isFinite(value) ? value : 0));
  const editing = useRef(false);

  useEffect(() => {
    if (!editing.current) setInputValue(String(Number.isFinite(value) ? value : 0));
  }, [value]);

  return (
    <div className="space-y-3">
      <div className="min-w-0 space-y-2">
        <Label htmlFor={id} className="min-w-0 text-sm font-medium text-foreground">
          {label}
        </Label>
        <div className="flex w-full min-w-0 items-center gap-1 rounded-lg border border-input bg-background px-2">
          {prefix && <span className="shrink-0 text-sm text-muted-foreground">{prefix}</span>}
          {formatThousands ? (
            <FormattedNumberInput
              id={id}
              value={value}
              onChange={onChange}
              min={minimum}
              max={inputMax}
              step={step}
              className="h-9 w-full min-w-0 flex-1 overflow-x-auto border-0 bg-transparent px-1 text-right font-display text-sm font-semibold tabular-nums shadow-none focus-visible:ring-0"
            />
          ) : (
            <Input
              id={id}
              type="number"
              inputMode="decimal"
              value={inputValue}
              min={minimum}
              max={inputMax}
              step={step}
              onFocus={() => {
                editing.current = true;
              }}
              onChange={(e) => {
                const next = e.target.value;
                setInputValue(next);
                if (next.trim() !== "" && Number.isFinite(Number(next))) {
                  onChange(normalizeNumberInput(next, minimum, inputMax));
                }
              }}
              onBlur={() => {
                editing.current = false;
                const normalized = normalizeNumberInput(inputValue, minimum, inputMax);
                setInputValue(String(normalized));
                onChange(normalized);
              }}
              className="h-9 w-full min-w-0 flex-1 overflow-x-auto border-0 bg-transparent px-1 text-right font-display text-sm font-semibold tabular-nums shadow-none focus-visible:ring-0"
            />
          )}
          {suffix && <span className="shrink-0 pr-1 text-sm text-muted-foreground">{suffix}</span>}
        </div>
      </div>
      <Slider
        value={[Math.min(Math.max(value, minimum), maximum)]}
        min={minimum}
        max={maximum}
        step={step}
        onValueChange={(vals) => onChange(vals[0] ?? minimum)}
        aria-label={label}
      />
    </div>
  );
}
