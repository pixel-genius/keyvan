"use client";
import { useGetShopProductDetailPriceHistory } from "@/utils/apis/shop/products/[id]/priceHistory/GET/shopProductDetailPriceHistoryApi";
import AddToCartBottomSheet, {
  SelectedItemAddCartBottomSheet,
} from "@/app/_components/AddToCartBottomSheet";
import {
  ORDERTYPE,
  usePostShopCartAddApi,
} from "@/utils/apis/shop/cart/add/POST/shopCartAddPostApi";
import { useGetShopProductDetail } from "@/utils/apis/shop/products/[id]/GET/shopProductDetailApi";
import { IconChevronLeft, IconShoppingCart } from "@tabler/icons-react";
import CustomAreaChartCard from "./_components/CustomAreaChartCard";
import Typography from "@/components/components/atoms/typography";
import { ChartConfig } from "@/components/components/atoms/chart";
import { useAuthStore } from "@/utils/store/authenticate.store";
import { Button } from "@/components/components/atoms/button";
import { Badge } from "@/components/components/atoms/badge";
import { useParams, useRouter } from "next/navigation";
import { toEnglishDigits } from "@/lib/utils";
import { Suspense, useState } from "react";
import Image from "next/image";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function ProductDetailFn() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { setUserInfo } = useAuthStore();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedItemAddCartBottomSheet | null>(null);

  const shopProductDetail = useGetShopProductDetail({ slug: id });

  // Validate and format image URL
  const getImageSrc = () => {
    if (!shopProductDetail?.data?.image) {
      return "/img/sigar.png";
    }

    // Check if it's already a complete URL
    if (
      shopProductDetail.data.image.startsWith("http://") ||
      shopProductDetail.data.image.startsWith("https://")
    ) {
      return shopProductDetail.data.image;
    }

    // If it's a relative path, ensure it starts with /
    if (shopProductDetail.data.image.startsWith("/")) {
      return shopProductDetail.data.image;
    }

    // If it doesn't start with /, add it
    return `/${shopProductDetail.data.image}`;
  };

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
      setSelectedProduct({
        count: 25,
        id: shopProductDetail.data.id,
        name: shopProductDetail.data.name,
        price: shopProductDetail.data.latest_price,
      });
      setIsBottomSheetOpen(true);
    }
  };

  const handleAddToCart = (order_type: ORDERTYPE) => {
    if (selectedProduct?.id && selectedProduct.count) {
      setIsAddingToCart(true);
      addToCartMutation.mutate({
        product_id: selectedProduct.id,
        quantity: +toEnglishDigits(selectedProduct.count),
        order_type,
        suggested_price: selectedProduct.suggested_price as number,
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
    <div className="px-4 pt-24 pb-48 ">
      <div className="flex gap-0.5 items-center pb-3.5">
        <span
          className="inline-flex items-center gap-2 cursor-pointer p-2"
          onClick={() => router.back()}
        >
          <IconChevronLeft size={24} className="cursor-pointer" />
          <Typography variant={"paragraph/md"}>بازگشت</Typography>
        </span>
      </div>
      <div>
        <div className="flex justify-center items-center bg-white rounded-lg mb-4">
          <Image
            src={getImageSrc()}
            alt={shopProductDetail?.data?.name || ""}
            width={400}
            height={400}
            className="object-cover"
            unoptimized
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
        selectedItem={selectedProduct}
        setSelectedItem={setSelectedProduct}
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
