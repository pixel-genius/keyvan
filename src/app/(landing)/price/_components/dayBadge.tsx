import Typography from "@/components/components/atoms/typography";
import clsx from "clsx";

interface DayBadgeProps {
  dayName: string;
  dayNumber: string | number;
  active?: boolean;
}

export const DayBadge = ({
  dayName,
  dayNumber,
  active = false,
}: DayBadgeProps) => {
  return (
    <div
      className={clsx(
        "rounded-full px-2 py-4 flex flex-col gap-1 items-center justify-center",
        active ? "bg-primary text-white" : "bg-zinc-900 text-muted-foreground"
      )}
    >
      <Typography variant="label/xs" weight="bold">
        {dayName}
      </Typography>
      <Typography variant="label/xs" weight="bold">
        {dayNumber}
      </Typography>
    </div>
  );
};
