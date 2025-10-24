import Typography from "@/components/components/atoms/typography";
import clsx from "clsx";

interface DayBadgeProps {
  dayLabel: string; // مثل: دوشنبه ۳ مرداد ۱۴۰۴
}

export const DayBadge = ({ dayLabel }: DayBadgeProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center  py-3 px-4  text-center text-lg font-bold ",
      )}
    >
      <Typography variant="label/lg" weight="bold">
        {dayLabel}
      </Typography>
    </div>
  );
};
