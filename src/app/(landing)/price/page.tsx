"use client";
import {
  IconChevronLeft,
  IconChevronRight,
  IconFilter,
} from "@tabler/icons-react";
import CustomAreaChartCard from "../products/[id]/_components/CustomAreaChartCard";
import Typography from "@/components/components/atoms/typography";
import { Textarea } from "@/components/components/atoms/textarea";
import { Input } from "@/components/components/molecules/input";
import { Button } from "@/components/components/atoms/button";
import { PriceItemCard } from "./_components/priceItemCard";
import { Chip } from "@/components/components/atoms/chip";
import BottomSheet from "@/app/_components/BottomSheet";
import { FilterChips } from "./_components/filterChips";
import { DayBadge } from "./_components/dayBadge";
import Counter from "@/app/_components/Counter";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import Tomanicon from "@/icons/toman";
import { clsx } from "clsx";

// Define types
type TrendType = "up" | "down";

interface DayData {
  name: string;
  number: string;
  date: string;
}

interface PriceItem {
  title: string;
  price: number;
  trend: TrendType;
  category?: string;
}

interface SelectedProduct {
  title: string;
  price: number;
}

// Sample days data (5 days: today and 4 previous days)
const daysData: DayData[] = [
  { name: "پنج‌شنبه", number: "۷", date: "۳ خرداد" }, // 4 روز قبل
  { name: "جمعه", number: "۸", date: "۴ خرداد" }, // 3 روز قبل
  { name: "شنبه", number: "۹", date: "۵ خرداد" }, // 2 روز قبل
  { name: "یکشنبه", number: "۱۰", date: "۶ خرداد" }, // 1 روز قبل
  { name: "دوشنبه", number: "۱۱", date: "۷ خرداد" }, // امروز
];

// Sample price items data with categories
const priceItems: PriceItem[] = [
  {
    title: "کمل کامپکت نقره ای کویین",
    price: 3500000,
    trend: "up",
    category: "سیگار",
  },
  {
    title: "کمل کامپکت آبی کویین",
    price: 3500000,
    trend: "down",
    category: "سیگار",
  },
  {
    title: "کمل نقره ای کینگ",
    price: 3500000,
    trend: "up",
    category: "سیگار",
  },
  {
    title: "کمل مشکی کینگ جدید",
    price: 3500000,
    trend: "up",
    category: "سیگار",
  },
  {
    title: "تنباکو دو سیب معمولی",
    price: 3100000,
    trend: "down",
    category: "تنباکو",
  },
  {
    title: "تنباکو نعنا فرانسوی",
    price: 3300000,
    trend: "up",
    category: "تنباکو",
  },
  {
    title: "سی‌تی‌آی بلو",
    price: 4500000,
    trend: "down",
    category: "سی‌تی‌آی",
  },
  {
    title: "سی‌تی‌آی قرمز",
    price: 4600000,
    trend: "up",
    category: "سی‌تی‌آی",
  },
  {
    title: "بی‌تی‌آی کلاسیک",
    price: 4200000,
    trend: "down",
    category: "بی‌تی‌آی",
  },
  {
    title: "بی‌تی‌آی مینت",
    price: 4300000,
    trend: "up",
    category: "بی‌تی‌آی",
  },
];

// Generate sample chart data based on Persian months
const generateChartData = () => {
  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
  ];

  return persianMonths.map((month, index) => {
    // Generate random price values between 3,000,000 and 4,500,000
    const baseValue = 3000000;
    const randomValue = Math.floor(Math.random() * 1500000);

    return {
      id: index + 1,
      price: baseValue + randomValue,
      created_at: month, // Using month as created_at for display purposes
    };
  });
};

// Chart configuration
const chartConfig = {
  price: {
    label: "قیمت",
    color: "#BA953B",
  },
};

const Pricepage = () => {
  const [activeFilter, setActiveFilter] = useState("همه");
  const [currentDayIndex, setCurrentDayIndex] = useState(daysData.length - 1); // مقدار اولیه روی آخرین روز
  const [showChart, setShowChart] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PriceItem | null>(null);
  const [chartData, setChartData] = useState<
    ReturnType<typeof generateChartData>
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<PriceItem[]>(priceItems);
  const [showPurchaseBottomSheet, setShowPurchaseBottomSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedProduct | null>(null);
  const [showFilterBottomSheet, setShowFilterBottomSheet] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const filters = ["همه", "سیگار", "تنباکو", "سی‌تی‌آی", "بی‌تی‌آی"];

  // Brand filters for the bottom sheet
  const brands = [
    "کمل",
    "تنباکو",
    "سی‌تی‌آی",
    "بی‌تی‌آی",
    "مارلبورو",
    "وینستون",
  ];

  // Initialize chart data on client side only
  useEffect(() => {
    setChartData(generateChartData());
  }, []);

  // Filter items whenever search query or active filter changes
  useEffect(() => {
    let result = priceItems;

    // Apply category filter
    if (activeFilter !== "همه") {
      result = result.filter((item) => item.category === activeFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((item) =>
        item.title.toLowerCase().includes(query),
      );
    }

    setFilteredItems(result);
  }, [searchQuery, activeFilter]);

  const goToPreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const goToNextDay = () => {
    if (currentDayIndex < daysData.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const handleItemClick = (item: PriceItem) => {
    setSelectedItem(item);
    // Generate new chart data when an item is clicked
    setChartData(generateChartData());
    setShowChart(true);
  };

  const closeChart = () => {
    setShowChart(false);
    setSelectedItem(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePurchase = (item: PriceItem) => {
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

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const currentDay = daysData[currentDayIndex];

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
        <DayBadge dayLabel={`${currentDay.name} ${currentDay.date} ۱۴۰۴`} />
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
        <FilterChips
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Results count */}
      {filteredItems.length === 0 ? (
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
          {filteredItems.map((item, index) => (
            <div key={index}>
              <PriceItemCard
                title={item.title}
                price={item.price}
                trend={item.trend}
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
            نمودار {selectedItem?.title}
          </Typography>

          {/* Chart using CustomAreaChartCard */}
          <div className="mt-4 mb-8">
            <CustomAreaChartCard
              chartConfig={chartConfig}
              chartData={chartData}
            />

            {/* Date indicator */}
            <div className="mt-2 text-center">
              <div className="text-xs text-gray-400">
                <span>{currentDay?.date}</span>
                <span className="mx-1">•</span>
                <span>۵:۱۵ بعدازظهر</span>
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
              {brands.map((brand) => (
                <Chip
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  variant={
                    selectedBrands.includes(brand) ? "primary" : "secendery"
                  }
                  size="sm"
                >
                  {brand}
                </Chip>
              ))}
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
