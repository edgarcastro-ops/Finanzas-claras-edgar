import { useLayoutEffect, useRef, useState, type ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import {
  countEditableNumberCharacters,
  formatThousandsInput,
  getFormattedCaretPosition,
  normalizeNumberInput,
  parseFormattedNumberInput,
} from "@/lib/number-input";

interface FormattedNumberInputProps extends Omit<
  ComponentProps<typeof Input>,
  "type" | "value" | "onChange" | "onBlur"
> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function FormattedNumberInput({
  value,
  onChange,
  min = 0,
  max,
  step,
  ...inputProps
}: FormattedNumberInputProps) {
  const minimum = Number.isFinite(min) ? min : 0;
  const maximum = max !== undefined && Number.isFinite(max) ? max : undefined;
  const [displayValue, setDisplayValue] = useState(() =>
    formatThousandsInput(String(Number.isFinite(value) ? value : minimum)),
  );
  const [renderRevision, setRenderRevision] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const editing = useRef(false);
  const pendingCaret = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (pendingCaret.current !== null && inputRef.current) {
      const caret = pendingCaret.current;
      pendingCaret.current = null;
      inputRef.current.setSelectionRange(caret, caret);
    }
  }, [displayValue, renderRevision]);

  useLayoutEffect(() => {
    if (!editing.current) {
      setDisplayValue(formatThousandsInput(String(Number.isFinite(value) ? value : minimum)));
    }
  }, [minimum, value]);

  return (
    <Input
      {...inputProps}
      ref={inputRef}
      type="text"
      inputMode="decimal"
      value={displayValue}
      onFocus={() => {
        editing.current = true;
      }}
      onChange={(event) => {
        const rawValue = event.currentTarget.value;
        const rawCaret = event.currentTarget.selectionStart ?? rawValue.length;
        const formatted = formatThousandsInput(rawValue);
        const charactersBeforeCaret = countEditableNumberCharacters(rawValue.slice(0, rawCaret));
        pendingCaret.current = getFormattedCaretPosition(formatted, charactersBeforeCaret);
        setDisplayValue(formatted);
        setRenderRevision((revision) => revision + 1);

        const parsed = parseFormattedNumberInput(formatted);
        if (parsed !== "" && parsed !== "-" && parsed !== "." && parsed !== "-.") {
          onChange(normalizeNumberInput(parsed, minimum, maximum));
        }
      }}
      onBlur={() => {
        editing.current = false;
        const normalized = normalizeNumberInput(
          parseFormattedNumberInput(displayValue),
          minimum,
          maximum,
        );
        setDisplayValue(formatThousandsInput(String(normalized)));
        onChange(normalized);
      }}
      min={minimum}
      max={maximum}
      step={step}
    />
  );
}
