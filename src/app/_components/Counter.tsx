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
  }, [count]);

  return (
    <div
      dir="ltr"
      className="flex items-center gap-4 pb-5 rounded-lg w-full text-white"
    >
      <Button
        variant="primary"
        className="w-full m-0"
        onClick={() => setCount((prev) => prev - 25)}
        disabled={count <= 25}
      >
        <IconMinus stroke={2} />
      </Button>
      <input
        name="count"
        dir="rtl"
        className="w-full border mb-6 rounded px-3 py-2 !m-0 outline-none focus:ring-0 text-center"
        placeholder="تعداد باکس"
        type="text"
        value={toPersianNumbers(count)}
        onChange={(e) => setCount(Number(toEnglishDigits(e.target.value)) || 0)}
      />
      <Button
        variant="primary"
        className="w-full"
        onClick={() => setCount((prev) => prev + 25)}
      >
        <IconPlus stroke={2} />
      </Button>
    </div>
  );
}
