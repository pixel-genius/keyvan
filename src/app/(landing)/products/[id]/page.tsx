"use client";
import { Badge } from "@/components/components/atoms/badge";
import { ChartConfig } from "@/components/components/atoms/chart";
import Typography from "@/components/components/atoms/typography";
import { IconChevronLeft } from "@tabler/icons-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductById, ApiProduct } from "@/lib/api";
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

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const productData = await fetchProductById(id as string);
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('خطا در دریافت اطلاعات محصول');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="paragraph/md">در حال بارگذاری...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pt-28  flex flex-col items-center justify-center min-h-screen gap-4">
        <Typography variant="paragraph/md" className="text-red-500">{error}</Typography>
        <button 
          onClick={() => router.back()}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          بازگشت
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Typography variant="paragraph/md">محصول یافت نشد</Typography>
        <button 
          onClick={() => router.back()}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          بازگشت
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 pt-28 ">
      <div className="flex  gap-0.5 items-center pb-3.5">
        <IconChevronLeft
          size={24}
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <Typography variant={"paragraph/md"}>بازگشت</Typography>
      </div>
      <div>
        <div className="flex justify-center items-center bg-white rounded-lg mb-4">
          <Image
            src={product.image || '/img/sigar.png'}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
        <div dir="rtl" className="pb-9 ">
          <Badge variant="default" className="mb-2">
            سیگار
          </Badge>
          <Typography variant="label/lg" weight="normal">
            {product.name}
          </Typography>
          <Typography variant="label/lg" weight="bold" className="mt-2 text-primary">
            {product.latest_price.toLocaleString('fa-IR')} تومان
          </Typography>
        </div>
        <div className="flex flex-col gap-2 text-right">
          <Typography variant="paragraph/md" weight="normal">
            توضیحات
          </Typography>
          <div className="pb-5">
            <Typography variant="paragraph/sm" weight="normal" className="text-gray-300">
              {product.description}
            </Typography>
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
}
