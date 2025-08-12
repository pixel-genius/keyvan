"use client";

import { memo, useCallback, useMemo, useState } from "react";
import { useDebounce } from "@/utils/hooks/useDebounce";
import * as Popover from "@radix-ui/react-popover";
import { Lookup } from "@/lib/types";
import clsx from "clsx";

export interface AutocompleteProps {
  options: Lookup[];
  placeholder?: string;
  onSelect?: (value: Lookup | Lookup[]) => void;
  debounce?: number;
  defaultValue?: number | number[];
  multiple?: boolean;
  limitTags?: number; // ✅ NEW PROP
}

const OptionItem = memo(function OptionItem({
  option,
  isHighlighted,
  isSelected,
  onMouseEnter,
  onClick,
}: {
  option: Lookup;
  isHighlighted: boolean;
  isSelected: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}) {
  return (
    <div
      className={clsx(
        "px-3 py-2 cursor-pointer flex justify-between",
        isHighlighted && "bg-gray-100",
      )}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <span>{option.name}</span>
      {isSelected && <span className="text-blue-500">✔</span>}
    </div>
  );
});

// ================= Autocomplete ================= //
const Autocomplete = ({
  options,
  placeholder = "Search...",
  onSelect,
  debounce = 0,
  defaultValue,
  multiple = false,
  limitTags,
}: AutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // ======= Selected state depending on mode ======= //
  const [selectedOptions, setSelectedOptions] = useState<Lookup[]>(() => {
    if (multiple && Array.isArray(defaultValue)) {
      return options.filter((o) => defaultValue.includes(o.id as number));
    }
    if (!multiple && typeof defaultValue === "number") {
      const found = options.find((o) => o.id === defaultValue);
      return found ? [found] : [];
    }
    return [];
  });

  const debouncedInput = useDebounce(input, debounce);

  const filtered = useMemo(() => {
    if (!debouncedInput.trim()) return options;
    const lowerSearch = debouncedInput.toLowerCase();
    return options.filter((opt) =>
      opt.name.toLowerCase().includes(lowerSearch),
    );
  }, [debouncedInput, options]);

  const handleSelect = useCallback(
    (opt: Lookup) => {
      if (multiple) {
        setSelectedOptions((prev) => {
          const exists = prev.some((s) => s.id === opt.id);
          let updated;
          if (exists) {
            updated = prev.filter((s) => s.id !== opt.id);
          } else {
            updated = [...prev, opt];
          }
          onSelect?.(updated);
          return updated;
        });
      } else {
        setSelectedOptions([opt]);
        onSelect?.(opt);
        setInput(opt.name);
        setOpen(false);
      }
    },
    [multiple, onSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filtered.length - 1 ? prev + 1 : prev,
        );
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }
      if (e.key === "Enter" && filtered[highlightedIndex]) {
        e.preventDefault();
        handleSelect(filtered[highlightedIndex]);
      }
    },
    [filtered, highlightedIndex, handleSelect],
  );

  const visibleTags = limitTags
    ? selectedOptions.slice(0, limitTags)
    : selectedOptions;
  const remainingCount = limitTags ? selectedOptions.length - limitTags : 0;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div className="w-64">
          {multiple && selectedOptions.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1">
              {visibleTags.map((opt) => (
                <span
                  key={opt.id}
                  className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-sm"
                >
                  {opt.name}
                </span>
              ))}
              {remainingCount > 0 && (
                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-sm">
                  +{remainingCount} more
                </span>
              )}
            </div>
          )}
          <input
            type="text"
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
            value={multiple ? input : selectedOptions[0]?.name || input}
            onChange={(e) => {
              setInput(e.target.value);
              setOpen(true);
              setHighlightedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
      </Popover.Trigger>

      <Popover.Content
        className="bg-white border rounded shadow-lg mt-1 w-64 max-h-60 overflow-auto outline-none"
        sideOffset={4}
      >
        {filtered.length > 0 ? (
          filtered.map((opt, idx) => (
            <OptionItem
              key={opt.id}
              option={opt}
              isHighlighted={highlightedIndex === idx}
              isSelected={selectedOptions.some((s) => s.id === opt.id)}
              onMouseEnter={() => setHighlightedIndex(idx)}
              onClick={() => handleSelect(opt)}
            />
          ))
        ) : (
          <div className="px-3 py-2 text-gray-500">No results</div>
        )}
      </Popover.Content>
    </Popover.Root>
  );
};

export default Autocomplete;
