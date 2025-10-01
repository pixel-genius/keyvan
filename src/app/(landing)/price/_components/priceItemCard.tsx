// components/PriceItemCard.tsx
import {
  IconTrendingDown,
  IconTrendingUp,
  IconChartLine,
} from "@tabler/icons-react";
import Typography from "@/components/components/atoms/typography";
import { Button } from "@/components/components/atoms/button";
import { formatPrice } from "@/lib/utils";
import Tomanicon from "@/icons/toman";
import React from "react";

type PriceItemCardProps = {
  title: string;
  price: number | string;
  trend: "up" | "down";
  onBuy?: () => void;
  onChart?: () => void;
};

export const PriceItemCard: React.FC<PriceItemCardProps> = ({
  title,
  price,
  trend,
  onBuy,
  onChart,
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
            {formatPrice(price)}
          </Typography>
          <Tomanicon size={18} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {TrendIcon}
        <Button
          onClick={onChart}
          variant="secondary"
          size="sm"
          iconLeft={<IconChartLine size={16} />}
        >
          نمودار
        </Button>
        <Button onClick={onBuy} variant="primary" size="sm">
          خرید و فروش
        </Button>
      </div>
    </div>
  );
};
