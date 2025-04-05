"use client";
import Typography from "@/components/components/atoms/typography";
import { Input } from "@/components/components/molecules/input";
import Tomanicon from "@/icons/toman";
import {
  IconChevronLeft,
  IconChevronRight,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useState } from "react";
import { DayBadge } from "./_components/dayBadge";
import { FilterChips } from "./_components/filterChips";
import { PriceItemCard } from "./_components/priceItemCard";

const Pricepage = () => {
  const [activeFilter, setActiveFilter] = useState("همه");
  const filters = ["همه", "سیگار", "الکل", "قهوه"];

  return (
    <div dir="rtl">
      <div className="flex justify-between pb-3.5">
        <div>
          <Typography variant={"label/md"} weight={"medium"}>
            قیمت محصولات اسفند ۱۴۰۳
          </Typography>
        </div>
        <div className="flex flex-row gap-0.5">
          <IconChevronRight size={24} />
          <IconChevronLeft size={24} />
        </div>
      </div>
      <div className="flex flex-row gap-1 pb-3.5  bg- ">
        <DayBadge dayName="شنبه" dayNumber="۱" active />
        <DayBadge dayName="شنبه" dayNumber="۱۲" />
      </div>
      <div className="pb-3.5">
        <Input placeholder="جستجو کنید ...." />
      </div>
      <div className="flex flex-row gap-1 pb-3.5">
        <FilterChips
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
      <div className="flex flex-col gap-4">
        <PriceItemCard
          title="کمل کامپکت نقره ای کویین"
          price="۳٬۵۰۰٬۰۰۰"
          trend="up"
        />
        <PriceItemCard title="وینستون آبی" price="۲٬۷۰۰٬۰۰۰" trend="down" />
        <PriceItemCard
          title="کمل کامپکت نقره ای کویین"
          price="۳٬۵۰۰٬۰۰۰"
          trend="up"
        />
      </div>
    </div>
  );
};

export default Pricepage;
