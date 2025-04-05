"use client";
import { Badge } from "@/components/components/atoms/badge";
import { ChartConfig } from "@/components/components/atoms/chart";
import Typography from "@/components/components/atoms/typography";
import { IconChevronLeft } from "@tabler/icons-react";
import Image from "next/image";
import BoxPacketInfo from "./_components/BoxPacketInfo";
import CustomAreaChartCard from "./_components/CustomAreaChartCard";

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
        <Typography variant={"paragraph/md"}>
          <a href="/products">بازگشت</a>
        </Typography>
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
            <BoxPacketInfo count={12} label="تعداد جعبه در پالت" />
            <BoxPacketInfo count={12} label="تعداد جعبه در پالت" />
            <BoxPacketInfo count={12} label="تعداد جعبه در پالت" />
            <BoxPacketInfo count={12} label="تعداد جعبه در پالت" />
            <BoxPacketInfo count={12} label="تعداد جعبه در پالت" />
            <BoxPacketInfo count={12} label="تعداد جعبه در پالت" />
          </div>
        </div>
        <div>
          <CustomAreaChartCard
            chartConfig={chartConfig}
            chartData={chartData}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
