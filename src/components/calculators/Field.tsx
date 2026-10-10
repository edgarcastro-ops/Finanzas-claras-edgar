import { useEffect, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { normalizeNumberInput } from "@/lib/number-input";

interface FieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}

export function Field({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}: FieldProps) {
  const [inputValue, setInputValue] = useState(String(Number.isFinite(value) ? value : 0));
  const editing = useRef(false);

  useEffect(() => {
    if (!editing.current) setInputValue(String(Number.isFinite(value) ? value : 0));
  }, [value]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <Label htmlFor={id} className="min-w-0 text-sm font-medium text-foreground">
          {label}
        </Label>
        <div className="flex shrink-0 items-center gap-1 rounded-lg border border-input bg-background px-2">
          {prefix && <span className="text-sm text-muted-foreground">{prefix}</span>}
          <Input
            id={id}
            type="number"
            inputMode="decimal"
            value={inputValue}
            min={min}
            max={max}
            step={step}
            onFocus={() => {
              editing.current = true;
            }}
            onChange={(e) => {
              const next = e.target.value;
              setInputValue(next);
              if (next.trim() !== "" && Number.isFinite(Number(next))) {
                onChange(normalizeNumberInput(next, min, max));
              }
            }}
            onBlur={() => {
              editing.current = false;
              const normalized = normalizeNumberInput(inputValue, min, max);
              setInputValue(String(normalized));
              onChange(normalized);
            }}
            className="h-9 w-24 border-0 bg-transparent px-1 text-right font-display text-sm font-semibold shadow-none focus-visible:ring-0"
          />
          {suffix && <span className="pr-1 text-sm text-muted-foreground">{suffix}</span>}
        </div>
      </div>
      <Slider
        value={[Math.min(Math.max(value, min), max)]}
        min={min}
        max={max}
        step={step}
        onValueChange={(vals) => onChange(vals[0] ?? min)}
        aria-label={label}
      />
    </div>
  );
}
