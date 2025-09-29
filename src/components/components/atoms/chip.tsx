import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import React from "react";

const chipVariants = cva(
  "inline-flex gap-2 items-center justify-center disabled:bg-ring disabled:text-gray-400 whitespace-nowrap text-foreground rounded-lg bg-primary px-3 py-2 text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-yellow-700   ",
        warning: "bg-yellow-600 hover:bg-amber-700    ",
        danger: "bg-red-600 hover:bg-rose-700   ",
        success: "bg-green-600 hover:bg-emerald-700   ",
        info: "bg-sky-500 hover:bg-sky-700   ",
        secendery: "bg-zinc-900 hover:bg-zinc-700    ",
      },
      size: {
        sm: "h-9 text-sm",
        md: "h-[52px]",
        lg: "h-14 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  },
);
export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  asChild?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      className,
      variant,
      size,
      asChild,
      iconLeft: IconLeft,
      iconRight: IconRight,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(chipVariants({ variant, size }), className)}
        ref={ref}
        {...props}
        disabled={props.disabled}
      >
        {IconLeft && <span>{IconLeft}</span>}
        <span>{children}</span>
        {IconRight && <span> {IconRight}</span>}
      </Comp>
    );
  },
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
