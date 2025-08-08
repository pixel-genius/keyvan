"use client";
import { ShopProductDetailPriceHistoryApiResponse } from "@/utils/apis/shop/products/[id]/priceHistory/GET/shopProductDetailPriceHistoryApi";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/components/atoms/chart";
import { Card, CardContent } from "@/components/components/atoms/card";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

interface CustomAreaChartCardProps {
  chartConfig: ChartConfig; // Use the imported type
  chartData: ShopProductDetailPriceHistoryApiResponse[];
}

const CustomAreaChartCard = ({
  chartConfig,
  chartData,
}: CustomAreaChartCardProps) => {
  return (
    <Card className="bg-transparent w-full">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="created_at"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                value ? new Date(value).toLocaleDateString("fa") : ""
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="price"
              type="linear"
              fill="#BA953B"
              fillOpacity={0.4}
              stroke="#BA953B"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CustomAreaChartCard;
