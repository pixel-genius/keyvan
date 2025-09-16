"use client";
import { useGetShopProductDetailPriceHistory } from "@/utils/apis/shop/products/[id]/priceHistory/GET/shopProductDetailPriceHistoryApi";
import { ShopProductDetailApiResponse } from "@/utils/apis/shop/products/[id]/GET/shopProductDetailApi";
import { useGetShopProductDetail } from "@/utils/apis/shop/products/[id]/GET/shopProductDetailApi";
import { usePostShopCartAddApi } from "@/utils/apis/shop/cart/add/POST/shopCartAddPostApi";
import AddToCartBottomSheet from "@/app/_components/AddToCartBottomSheet";
import { IconChevronLeft, IconShoppingCart } from "@tabler/icons-react";
import CustomAreaChartCard from "./_components/CustomAreaChartCard";
import Typography from "@/components/components/atoms/typography";
import { ChartConfig } from "@/components/components/atoms/chart";
import { useAuthStore } from "@/utils/store/authenticate.store";
import { Button } from "@/components/components/atoms/button";
import { Badge } from "@/components/components/atoms/badge";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Image from "next/image";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type SelectedProduct = ShopProductDetailApiResponse & {
  count?: number;
};

function ProductDetailFn() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { setUserInfo } = useAuthStore();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedProduct | null>(null);

  const shopProductDetail = useGetShopProductDetail({ slug: id });

  const shopProductDetailPriceHistory = useGetShopProductDetailPriceHistory({
    slug: id,
  });

  const addToCartMutation = usePostShopCartAddApi({
    onSuccess: (data) => {
      setUserInfo({ shopCart: data });
      setIsAddingToCart(false);
      setIsBottomSheetOpen(false);
    },
    onError: () => {
      setIsAddingToCart(false);
    },
  });

  const handleAddToCartClick = () => {
    if (shopProductDetail.data) {
      setSelectedProduct({ ...shopProductDetail.data, count: 25 });
      setIsBottomSheetOpen(true);
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct?.id && selectedProduct.count) {
      setIsAddingToCart(true);
      addToCartMutation.mutate({
        product_id: selectedProduct.id,
        quantity: selectedProduct.count,
      });
    }
  };

  if (shopProductDetail.isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Typography variant="paragraph/md">در حال بارگذاری...</Typography>
      </div>
    );
  }

  if (shopProductDetail.isError) {
    return (
      <div className="px-4 pt-28  flex flex-col items-center justify-center min-h-screen gap-4">
        <Typography variant="paragraph/md" className="text-red-500">
          خطا در دریافت اطلاعات محصول
        </Typography>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          بازگشت
        </button>
      </div>
    );
  }

  if (!shopProductDetail.data) {
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
            src={shopProductDetail?.data?.image || "/img/sigar.png"}
            alt={shopProductDetail?.data?.name || ""}
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
            {shopProductDetail?.data?.name || null}
          </Typography>
          <Typography
            variant="label/lg"
            weight="bold"
            className="mt-2 text-primary"
          >
            {shopProductDetail.data.latest_price
              ? `${shopProductDetail.data.latest_price.toLocaleString("fa-IR")} تومان`
              : null}
          </Typography>
          <div className="mt-4">
            <Button
              onClick={handleAddToCartClick}
              disabled={!shopProductDetail.data?.id}
              iconLeft={<IconShoppingCart size={20} />}
              className="w-full"
            >
              افزودن به سبد خرید
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-right">
          <Typography variant="paragraph/md" weight="normal">
            توضیحات
          </Typography>
          <div className="pb-5">
            <Typography
              variant="paragraph/sm"
              weight="normal"
              className="text-gray-300"
            >
              {shopProductDetail.data.description || null}
            </Typography>
          </div>
        </div>
        {shopProductDetailPriceHistory.data ? (
          <div>
            <CustomAreaChartCard
              chartConfig={chartConfig}
              chartData={shopProductDetailPriceHistory.data || []}
            />
          </div>
        ) : null}
      </div>

      <AddToCartBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        disabled={isAddingToCart}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default function ProductDetail() {
  return (
    <Suspense
      fallback={<div className="text-center py-8">در حال بارگذاری...</div>}
    >
      <ProductDetailFn />
    </Suspense>
  );
}
