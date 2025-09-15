"use client";
import {
  ShopPricesListApiParams,
  ShopPricesListApiResponse,
  useGetShopPricesList,
} from "@/utils/apis/shop/prices/GET/shopPricesListApi";
import { ShopProductDetailApiResponse, useGetShopProductDetail } from "@/utils/apis/shop/products/[id]/GET/shopProductDetailApi";
import {
  IconChevronLeft,
  IconChevronRight,
  IconFilter,
} from "@tabler/icons-react";
import CustomAreaChartCard from "../products/[id]/_components/CustomAreaChartCard";
import CategoryChipsFilter from "@/app/_components/lookups/chips/CategoryChips";
import BrandChipsFilter from "@/app/_components/lookups/chips/BrandChips";
import Typography from "@/components/components/atoms/typography";
import { Textarea } from "@/components/components/atoms/textarea";
import { Input } from "@/components/components/molecules/input";
import { Button } from "@/components/components/atoms/button";
import { PriceItemCard } from "./_components/priceItemCard";
import { formatPrice, toPersianNumbers } from "@/lib/utils";
import BottomSheet from "@/app/_components/BottomSheet";
import { DayBadge } from "./_components/dayBadge";
import { format, subDays } from "date-fns-jalali";
import Counter from "@/app/_components/Counter";
import { faIR } from "date-fns-jalali/locale";
import { useMemo, useState } from "react";
import Tomanicon from "@/icons/toman";
import { clsx } from "clsx";
import AddToCartBottomSheet from "@/app/_components/AddToCartBottomSheet";
import { usePostShopCartAddApi } from "@/utils/apis/shop/cart/add/POST/shopCartAddPostApi";
import { useAuthStore } from "@/utils/store/authenticate.store";

interface DayData {
  name: string;
  number: string;
  date: string;
  time: string;
}
interface SelectedProduct extends ShopProductDetailApiResponse {
  count?: number;
}

// Chart configuration
const chartConfig = {
  price: {
    label: "قیمت",
    color: "#BA953B",
  },
};

const Pricepage = () => {
  const daysData = useMemo(() => {
    const today = new Date();
    const days: DayData[] = [];
    for (let i = 0; i <= 6; i++) {
      const date = subDays(today, i);
      days.push({
        name: format(date, "EEEE"),
        number: toPersianNumbers(format(date, "d")),
        date: format(date, "yyyy/MM/dd", { locale: faIR }),
        time: format(date, "B hh:mm", { locale: faIR }),
      });
    }
    return days.reverse();
  }, []);

  const [currentDayIndex, setCurrentDayIndex] = useState(daysData.length - 1); // مقدار اولیه روی آخرین روز
  const [showChart, setShowChart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] =
    useState<ShopPricesListApiResponse | null>(null);
  const [showPurchaseBottomSheet, setShowPurchaseBottomSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedProduct | null>(null);
  const [showFilterBottomSheet, setShowFilterBottomSheet] = useState(false);
  const { setUserInfo } = useAuthStore();
  const [filterParams, setFilterParams] = useState<ShopPricesListApiParams>({
    date: daysData[currentDayIndex].date,
    brand: undefined,
    category: undefined,
    // limit: 10,
    page: 1,
    ordering: "",
    search: "",
  });
  
  const shopPricesListQuery = useGetShopPricesList({
    params: filterParams,
  });

  const shopProductDetailQuery = useGetShopProductDetail({
    enabled: !!selectedItem?.product_id,
    slug: selectedItem?.product_id?.toString() || "",
  });

  const shopAddCartMutate = usePostShopCartAddApi({
    onSuccess: (res) => {
      setUserInfo({ shopCart: res });
      setShowPurchaseBottomSheet(false);
    },
  });

  const goToPreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
      setFilterParams((prev) => ({
        ...prev,
        date: daysData[currentDayIndex - 1].date,
      }));
    }
  };

  const goToNextDay = () => {
    if (currentDayIndex < daysData.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
      setFilterParams((prev) => ({
        ...prev,
        date: daysData[currentDayIndex + 1].date,
      }));
    }
  };

  const handleItemClick = (item: ShopPricesListApiResponse) => {
    setSelectedItem(item);
    setShowChart(true);
  };

  const closeChart = () => {
    setSelectedItem(null);
    setShowChart(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

   
  
  const handlePurchase = (item: any) => {
    setSelectedProduct({
      title: item.title,
      price: item.price,
    });
    setShowPurchaseBottomSheet(true);
  };

  const handleClosePurchaseBottomSheet = () => {
    setShowPurchaseBottomSheet(false);
    setSelectedProduct(null);
  };

  const handleCloseFilterBottomSheet = () => {
    setShowFilterBottomSheet(false);
  };

  const currentDay = daysData[currentDayIndex];

  const onAddToCart = () => {

    if (selectedProduct?.id && selectedProduct?.count) {
      shopAddCartMutate.mutate({
        product_id: selectedProduct?.id,
        quantity: selectedProduct?.count,
      });
    }
  };
  
  return (
    <div dir="rtl" className="px-4 pt-28 ">
      <div className="flex flex-row items-center justify-between ">
        <button
          onClick={goToPreviousDay}
          disabled={currentDayIndex === 0}
          className={clsx(
            "flex items-center justify-center  text-white transition",
            currentDayIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "bg-zinc-800",
          )}
        >
          <IconChevronRight size={24} />
          روز قبل
        </button>
        <DayBadge
          dayLabel={`${currentDay.name} ${toPersianNumbers(currentDay.date)}`}
        />
        <button
          onClick={goToNextDay}
          disabled={currentDayIndex === daysData.length - 1}
          className={clsx(
            "flex items-center justify-center rounded-xl text-white transition",
            currentDayIndex === daysData.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "bg-zinc-800 hover:bg-zinc-700",
          )}
        >
          روز بعد
          <IconChevronLeft size={24} />
        </button>
      </div>

      {/* Search Input */}
      <div className="pb-3.5 flex justify-between items-center gap-2">
        <Input
          placeholder="جستجو کنید ...."
          value={searchQuery}
          onChange={handleSearch}
          className="flex-1"
        />
        <div
          className="border-2 border-zinc-700 rounded p-2 cursor-pointer h-[50px] w-[50px] flex items-center justify-center"
          onClick={() => setShowFilterBottomSheet(true)}
        >
          <IconFilter size="24" stroke={1.5} />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-row gap-1 pb-3.5 overflow-x-auto">
        <CategoryChipsFilter
          onChange={(value) => {
            setFilterParams((prev) => ({
              ...prev,
              category: value.id as number,
            }));
          }}
        />
      </div>

      {/* Results count */}
      {shopPricesListQuery?.data?.length === 0 ? (
        <div className="text-center py-8">
          <Typography
            variant="label/md"
            weight="medium"
            className="text-gray-400"
          >
            هیچ محصولی یافت نشد
          </Typography>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {shopPricesListQuery?.data?.map((item, index) => (
            <div key={index}>
              <PriceItemCard
                title={item.product}
                price={item.price}
                trend={item.is_increamental ? "up" : "down"}
                onChart={() => handleItemClick(item)}
                onBuy={() => handlePurchase(item)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Chart Bottom Sheet */}
      <BottomSheet isOpen={showChart} onClose={closeChart}>
        <div className="pt-6 px-2">
          <Typography
            variant="label/lg"
            weight="bold"
            className="mb-4 text-center"
          >
            نمودار {selectedItem?.product}
          </Typography>

          {/* Chart using CustomAreaChartCard */}
          <div className="mt-4 mb-8">
            <CustomAreaChartCard
              chartConfig={chartConfig}
              chartData={shopProductDetailQuery.data?.price_history || []}
            />

            {/* Date indicator */}
            <div className="mt-2 text-center">
              <div className="text-xs text-gray-400">
                <span>{toPersianNumbers(currentDay?.time)}</span>
                <span className="mx-1">•</span>
                <span>{toPersianNumbers(currentDay?.date)}</span>
              </div>
            </div>
          </div>
        </div>
      </BottomSheet>

      {/* Filter Bottom Sheet */}
      <BottomSheet
        isOpen={showFilterBottomSheet}
        onClose={handleCloseFilterBottomSheet}
      >
        <div className="filter-sheet p-4 flex flex-col gap-4 justify-start">
          <div className="brands">
            <Typography
              className="text-right pb-2"
              variant="label/md"
              weight="bold"
            >
              برندها
            </Typography>
            <div className="flex text-right justify-end flex-wrap gap-2 mt-2">
              <BrandChipsFilter
                onChange={(value) => {
                  setFilterParams((prev) => ({
                    ...prev,
                    brand: value.id as number,
                  }));
                }}
              />
            </div>
          </div>
          <div className="actions mt-4 flex gap-2">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={handleCloseFilterBottomSheet}
            >
              انصراف
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleCloseFilterBottomSheet}
            >
              اعمال فیلتر
            </Button>
          </div>
        </div>
      </BottomSheet>

      {/* Purchase Bottom Sheet */}
      <AddToCartBottomSheet
        disabled={shopAddCartMutate.isPending}
        isOpen={showPurchaseBottomSheet}
        onClose={handleClosePurchaseBottomSheet}
        onAddToCart={onAddToCart}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <BottomSheet
        isOpen={showPurchaseBottomSheet}
        onClose={handleClosePurchaseBottomSheet}
      >
        {selectedProduct && (
          <div className="pb-15">
            <hr className="w-1/2 mx-auto border-2 rounded-full mb-4" />
            <Typography
              variant="label/lg"
              weight="semi-bold"
              className="mb-4 text-center"
            >
              افزودن محصول به سبد
            </Typography>
            <Typography
              variant="label/sm"
              weight="bold"
              className="mb-4 text-center"
            >
              {selectedProduct.title}
            </Typography>
            <div className="flex items-center justify-center gap-1 mb-4">
              <Typography variant="label/sm" weight="bold">
                {formatPrice(selectedProduct.price)}
              </Typography>
              <Tomanicon size={18} />
            </div>
            <Counter />
            <Textarea placeholder="توضیحات (اختیاری)" className="mb-4" />
            <Button
              className="w-full"
              variant="primary"
              onClick={handleClosePurchaseBottomSheet}
            >
              افزودن به سبد خرید
            </Button>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

export default Pricepage;
