"use client";
import { useGetShopProductDetailPriceHistory } from "@/utils/apis/shop/products/[id]/priceHistory/GET/shopProductDetailPriceHistoryApi";
import {
  ShopPricesListApiParams,
  useGetShopPricesList,
} from "@/utils/apis/shop/prices/GET/shopPricesListApi";
import AddToCartBottomSheet, {
  SelectedItemAddCartBottomSheet,
} from "@/app/_components/AddToCartBottomSheet";
import {
  ORDERTYPE,
  usePostShopCartAddApi,
} from "@/utils/apis/shop/cart/add/POST/shopCartAddPostApi";
import { ShopPricesDetailApiResponse } from "@/utils/apis/shop/prices/[id]/GET/shopPricesDetailApi";
import {
  IconChevronLeft,
  IconChevronRight,
  IconFilter,
} from "@tabler/icons-react";
import CustomAreaChartCard from "../products/[id]/_components/CustomAreaChartCard";
import CategoryChipsFilter from "@/app/_components/lookups/chips/CategoryChips";
import BrandChipsFilter from "@/app/_components/lookups/chips/BrandChips";
import Typography from "@/components/components/atoms/typography";
import { Skeleton } from "@/components/components/atoms/skeleton";
import { Input } from "@/components/components/molecules/input";
import { useAuthStore } from "@/utils/store/authenticate.store";
import { toEnglishDigits, toPersianNumbers } from "@/lib/utils";
import { Button } from "@/components/components/atoms/button";
import { PriceItemCard } from "./_components/priceItemCard";
import BottomSheet from "@/app/_components/BottomSheet";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { DayBadge } from "./_components/dayBadge";
import { format, subDays } from "date-fns-jalali";
import { faIR } from "date-fns-jalali/locale";
import { useMemo, useState } from "react";
import { clsx } from "clsx";

interface DayData {
  name: string;
  number: string;
  date: string;
  time: string;
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
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [showPurchaseBottomSheet, setShowPurchaseBottomSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedItemAddCartBottomSheet | null>(null);
  const [showFilterBottomSheet, setShowFilterBottomSheet] = useState(false);
  const { setUserInfo } = useAuthStore();
  const [filterParams, setFilterParams] = useState<ShopPricesListApiParams>({
    date: daysData[currentDayIndex].date,
    category: undefined,
    brand: undefined,
    // limit: 10,
    page: 1,
    search: "",
  });

  const [brandFilter, setBrandFilter] = useState<number | undefined>(undefined);

  const shopPricesQuery = useGetShopPricesList({
    params: {
      ...filterParams,
      page: filterParams.page as number,
      search: debouncedSearchQuery,
    },
  });

  const shopPriceHistoryQuery = useGetShopProductDetailPriceHistory({
    enabled: !!selectedProduct?.id,
    slug: String(selectedProduct?.id),
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

  const handleItemClick = (item: ShopPricesDetailApiResponse) => {
    setSelectedProduct(item);
    setShowChart(true);
  };

  const closeChart = () => {
    setSelectedProduct(null);
    setShowChart(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onAddProductToCart = (id: number) => {
    setShowPurchaseBottomSheet(true);
    const item = shopPricesQuery.data?.find((item) => item.id === id) || null;
    setSelectedProduct(
      item
        ? {
            id: item.id,
            name: item.name,
            price: item.price,
          }
        : null,
    );
  };

  const handleClosePurchaseBottomSheet = () => {
    setShowPurchaseBottomSheet(false);
    setSelectedProduct(null);
  };

  const handleCloseFilterBottomSheet = () => {
    setShowFilterBottomSheet(false);
  };

  const handleApplyFilters = () => {
    setFilterParams((prev) => ({ ...prev, brand: brandFilter }));
    handleCloseFilterBottomSheet();
  };

  const currentDay = daysData[currentDayIndex];

  const onAddToCart = (order_type: ORDERTYPE) => {
    if (selectedProduct?.id && selectedProduct?.count) {
      shopAddCartMutate.mutate({
        product_id: selectedProduct?.id,
        quantity: selectedProduct?.count
          ? Number(toEnglishDigits(selectedProduct.count))
          : undefined,
        order_type,
        suggested_price: selectedProduct.suggested_price as number,
      });
    }
  };

  return (
    <div dir="rtl" className="px-4 pt-3 flex flex-col">
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
          className="border-2 relative border-zinc-700 rounded p-2 cursor-pointer h-[50px] w-[50px] flex items-center justify-center"
          onClick={() => setShowFilterBottomSheet(true)}
        >
          <IconFilter size="24" stroke={1.5} />
          {!!filterParams.brand && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              1
            </span>
          )}
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-row gap-1 pb-2 overflow-x-auto mb-4">
        <CategoryChipsFilter
          value={filterParams.category}
          onChange={(value) => {
            setFilterParams((prev) => ({
              ...prev,
              category: value ? Number(value.id) : undefined,
            }));
          }}
        />
      </div>

      {/* Results count */}
      <div className=" overflow-y-auto  gap-4 h-[calc(100vh-350px)] min-h-0">
        {shopPricesQuery.isFetching &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-3.5 border-zinc-700 pt-2"
            >
              <div className="flex flex-col gap-2 ">
                <Skeleton className="h-5 w-16 bg-card rounded-sm" />
                <div className="flex gap-1.5 items-center">
                  <Skeleton className="h-5 w-20 bg-card rounded-sm" />
                </div>
              </div>
              <div className="flex items-center gap-2 w-50">
                <Skeleton className="h-9 w-1/5 rounded-full bg-card" />
                <Skeleton className="h-9 w-2/5 bg-card" />
                <Skeleton className="h-9 w-2/5 bg-card" />
              </div>
            </div>
          ))}
        {shopPricesQuery?.data?.length === 0 ? (
          <div className="text-center py-8">
            <Typography
              variant="label/md"
              weight="medium"
              className="text-gray-400"
            >
              محصولی یافت نشد
            </Typography>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {shopPricesQuery?.data?.map((item, index) => (
              <div key={index}>
                <PriceItemCard
                  title={item.name}
                  price={item.price}
                  trend={item.is_increamental ? "up" : "down"}
                  onChart={() => handleItemClick(item)}
                  onBuy={() => {
                    onAddProductToCart(item.id);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chart Bottom Sheet */}
      <BottomSheet isOpen={showChart} onClose={closeChart}>
        <div className="pt-6 px-2">
          <Typography
            variant="label/lg"
            weight="bold"
            className="mb-4 text-center"
          >
            نمودار {selectedProduct?.name || null}
          </Typography>

          {/* Chart using CustomAreaChartCard */}
          <div className="mt-4 mb-8">
            <CustomAreaChartCard
              chartConfig={chartConfig}
              chartData={shopPriceHistoryQuery.data || []}
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
            <div className="flex text-right flex-wrap gap-2 mt-2">
              <BrandChipsFilter
                value={filterParams.brand}
                onChange={(value) => {
                  setBrandFilter(value ? Number(value.id) : undefined);
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
              onClick={handleApplyFilters}
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
        selectedItem={selectedProduct}
        setSelectedItem={setSelectedProduct}
      />
    </div>
  );
};

export default Pricepage;
