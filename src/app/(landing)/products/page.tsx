"use client";

import { UseGetShopProductsList } from "@/utils/apis/shop/products/GET/shopProductsListApi";
import Typography from "@/components/components/atoms/typography";
import { Skeleton } from "@/components/components/atoms/skeleton";
import { Input } from "@/components/components/molecules/input";
import { Button } from "@/components/components/atoms/button";
import { Chip } from "@/components/components/atoms/chip";
import ProductCard from "@/app/_components/ProductCard";
// Import the API fetch function and type
import BottomSheet from "@/app/_components/BottomSheet";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IconFilter } from "@tabler/icons-react";
import Header from "@/app/_components/Header";

const cigaretteBrands = [
  "مارلبورو",
  "وینستون",
  "داویدوف",
  "کنت",
  "پارلیامنت",
  "دانهیل",
  "لاکی استرایک",
  "پال مال",
];

function ProductsContent() {
  // const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(
    undefined,
  );

  const query = UseGetShopProductsList({
    params: {
      // category: 1,
      // brand: 1,
      // search: "",
    },
  });

  // استفاده از usePathname و useSearchParams برای مدیریت مسیر
  const searchParams = useSearchParams();

  useEffect(() => {
    setCategoryFilter(searchParams.get("category") || undefined);
  }, [searchParams]);

  const handleBackClick = () => {
    // Simulate a back navigation
    window.history.back();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterClick = () => {
    setIsFilterSheetOpen(true);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const applyFilters = () => {
    setIsFilterSheetOpen(false);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };
  // The API does not provide a category field. If needed, extract categories from another source.
  const categories: string[] = [];

  return (
    <div className="mx-auto px-4 pt-28  min-h-full">
      <Header
        title={categoryFilter ? categoryFilter : "محصولات"}
        onBackClick={handleBackClick}
      />

      <div className="flex justify-between items-center gap-2">
        <Input
          placeholder="جستجو"
          className="pb-1 text-sm"
          dir="rtl"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div
          className="border-2 border-zinc-700 rounded p-2 cursor-pointer h-[50px] w-[50px] flex items-center justify-center"
          onClick={handleFilterClick}
        >
          <IconFilter size="24" stroke={1.5} />
        </div>
      </div>

      <BottomSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
      >
        <div className="filter-sheet p-4 flex flex-col gap-4 justify-start rounded-lg ">
          <div className="categories">
            <Typography
              className="text-right pb-2"
              variant="label/md"
              weight="bold"
            >
              دسته‌بندی‌ها
            </Typography>
            <div className="flex text-right justify-end flex-wrap gap-2 mt-2">
              {categories.map((category) => (
                <Chip
                  key={category}
                  onClick={() => toggleCategory(category)}
                  variant={
                    selectedCategories.includes(category)
                      ? "primary"
                      : "secendery"
                  }
                  size="sm"
                >
                  {category}
                </Chip>
              ))}
            </div>
          </div>
          <div className="brands  mt-4">
            <Typography
              className="text-right pb-2"
              variant="label/md"
              weight="bold"
            >
              برندها
            </Typography>
            <div className="flex text-right justify-end flex-wrap gap-2 mt-2">
              {cigaretteBrands.map((brand) => (
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
              className="w-full"
              onClick={resetFilters}
            >
              بازنشانی
            </Button>
            <Button variant="primary" className="w-full" onClick={applyFilters}>
              اعمال فیلترها
            </Button>
          </div>
        </div>
      </BottomSheet>

      <div className="flex flex-col gap-2 mt-4">
        {query.isFetching && (
          <>
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-black rounded-2xl p-4" dir="rtl">
                <div className="flex items-center space-x-4">
                  {/* Image skeleton */}
                  <Skeleton className="w-16 h-16 rounded-lg" />

                  {/* Content skeleton */}
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>

                  {/* Price and buttons skeleton */}
                  <div className="flex flex-col items-end">
                    <Skeleton className="h-4 w-16 mb-2" />
                    <div className="flex space-x-2">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <Skeleton className="w-8 h-8 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {query?.data && query.data.length > 0 ? (
          query.data.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id.toString()}
              imageUrl={product.image as string}
              title={product.name}
              subtitle={product.description as string}
              price={product.latest_price.toString()}
              // category={product.category} // Not available from API
              onAddToCart={() => {}}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <Typography variant="label/md" weight="normal">
              محصولی یافت نشد
            </Typography>
          </div>
        )}
      </div>

      {/* <BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
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
              onClick={handleCloseBottomSheet}
            >
              افزودن به سبد خرید
            </Button>
          </div>
        )}
      </BottomSheet> */}
    </div>
  );
}
export default function ProductsPage() {
  return (
    <Suspense
      fallback={<div className="text-center py-8">در حال بارگذاری...</div>}
    >
      <ProductsContent />
    </Suspense>
  );
}
