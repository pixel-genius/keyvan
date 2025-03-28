"use client";
import { Badge } from "@/components/components/atoms/badge";
import { Card, CardContent } from "@/components/components/atoms/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/components/atoms/chart";
import Typography from "@/components/components/atoms/typography";
import { IconChevronLeft } from "@tabler/icons-react";
import Image from "next/image";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const ProductList = () => {
  return (
    <div>
      <div className="flex gap-0.5 items-center pb-3.5">
        <IconChevronLeft size={24} className="cursor-pointer" />
        <Typography variant={"paragraph/md"}>بازگشت</Typography>
      </div>
      <div>
        <div className="flex justify-center items-center bg-white rounded-lg mb-4">
          <Image
            src={"/img/image-cig.jpg"}
            alt="sigar"
            width={400}
            height={400}
          />
        </div>
        <div dir="rtl" className="pb-9 ">
          <Badge variant="default" className="mb-2">
            سیگار
          </Badge>
          <Typography variant="label/lg" weight="normal">
            سیگار وینستون کلاسیک الترا
          </Typography>
        </div>
        <div className="flex flex-col gap-2 text-right">
          <Typography variant="paragraph/md" weight="normal">
            مشخصات
          </Typography>
          <div className="flex flex-col gap-4 pb-5">
            <div className="flex flex-row justify-between items-center">
              <Typography variant="paragraph/xs" weight="normal">
                10
              </Typography>
              <p>- - - - - - - - -</p>
              <Typography variant="paragraph/xs" weight="normal">
                تعداد پاکت در باکس
              </Typography>
            </div>
            <div className="flex flex-row justify-between items-center">
              <Typography variant="paragraph/xs" weight="normal">
                10
              </Typography>
              <p>- - - - - - - - -</p>
              <Typography variant="paragraph/xs" weight="normal">
                تعداد پاکت در باکس
              </Typography>
            </div>
            <div className="flex flex-row justify-between items-center">
              <Typography variant="paragraph/xs" weight="normal">
                10
              </Typography>
              <p>- - - - - - - - -</p>
              <Typography variant="paragraph/xs" weight="normal">
                تعداد پاکت در باکس
              </Typography>
            </div>
            <div className="flex flex-row justify-between items-center">
              <Typography variant="paragraph/xs" weight="normal">
                10
              </Typography>
              <p>- - - - - - - - -</p>
              <Typography variant="paragraph/xs" weight="normal">
                تعداد پاکت در باکس
              </Typography>
            </div>
            <div className="flex flex-row justify-between items-center">
              <Typography variant="paragraph/xs" weight="normal">
                10
              </Typography>
              <p>- - - - - - - - -</p>
              <Typography variant="paragraph/xs" weight="normal">
                تعداد پاکت در باکس
              </Typography>
            </div>
          </div>
        </div>
        <div>
          <Card className="bg-transparent w-full">
            <CardContent>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
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
                    fill="#BA953B" // Your new fill color
                    fillOpacity={0.4}
                    stroke="#BA953B" // Your new stroke color
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
