// components/PriceItemCard.tsx
import React from "react";
import Typography from "@/components/components/atoms/typography";
import Tomanicon from "@/icons/toman";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

type PriceItemCardProps = {
  title: string;
  price: number | string;
  trend: "up" | "down";
};

export const PriceItemCard: React.FC<PriceItemCardProps> = ({
  title,
  price,
  trend,
}) => {
  const TrendIcon =
    trend === "up" ? (
      <IconTrendingUp size={24} className="text-green-500" />
    ) : (
      <IconTrendingDown size={24} className="text-red-500" />
    );

  return (
    <div className="flex justify-between items-center border-b pb-3.5 border-zinc-700">
      <div className="flex flex-col gap-2 ">
        <Typography variant={"label/sm"} weight={"medium"}>
          {title}
        </Typography>
        <div className="flex gap-1.5 items-center">
          <Typography variant={"label/sm"} weight={"medium"}>
            {price}
          </Typography>
          <Tomanicon size={18} />
        </div>
      </div>
      {TrendIcon}
    </div>
  );
};
