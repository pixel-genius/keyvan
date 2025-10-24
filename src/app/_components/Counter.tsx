"use client";

import { toEnglishDigits, toPersianNumbers } from "@/lib/utils";
import { Button } from "@/components/components/atoms/button";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface CounterProps {
  onChange?: (count: number) => void;
}

export default function Counter({ onChange }: CounterProps) {
  const [count, setCount] = useState(25);

  useEffect(() => {
    onChange?.(count);
  }, [count, onChange]); // رفع هشدار React Hooks

  const decrease = () => {
    setCount((prev) => (prev - 25 > 0 ? prev - 25 : 0));
  };

  const increase = () => {
    setCount((prev) => prev + 25);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(toEnglishDigits(e.target.value)) || 0;
    setCount(value);
  };

  return (
    <div
      dir="ltr"
      className="flex items-center gap-4 pb-5 rounded-lg w-full text-white"
    >
      <Button
        variant="tertiary"
        className="w-full border border-primary text-primary"
        onClick={decrease}
      >
        <IconMinus stroke={2} />
      </Button>

      <input
        name="count"
        dir="rtl"
        type="text"
        placeholder="تعداد باکس"
        value={toPersianNumbers(count)}
        onChange={handleInputChange}
        className="w-full text-zinc-800 border mb-6 rounded px-3 py-2 !m-0 outline-none focus:ring-0 text-center"
      />

      <Button
        variant="tertiary"
        className="w-full border border-primary text-primary"
        onClick={increase}
      >
        <IconPlus stroke={2} />
      </Button>
    </div>
  );
}
