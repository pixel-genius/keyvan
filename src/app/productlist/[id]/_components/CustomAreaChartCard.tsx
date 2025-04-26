"use client";
import { Card, CardContent } from "@/components/components/atoms/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/components/atoms/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

interface ChartDataItem {
  month: string; // Key for the X-axis
  desktop: number; // Key for the data to be plotted
}

interface CustomAreaChartCardProps {
  chartConfig: ChartConfig; // Use the imported type
  chartData: ChartDataItem[];
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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="desktop"
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
