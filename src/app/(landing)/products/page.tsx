"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { IconFilter } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/app/_components/ProductCard";
import BottomSheet from "@/app/_components/BottomSheet";
import Counter from "@/app/_components/Counter";
import Typography from "@/components/components/atoms/typography";
import { Input } from "@/components/components/molecules/input";
import { Textarea } from "@/components/components/atoms/textarea";
import { Button } from "@/components/components/atoms/button";
import { Chip } from "@/components/components/atoms/chip";
import Header from "@/app/_components/Header";
// Import the API fetch function and type
import { fetchProductsFromApi, ApiProduct } from "@/lib/api";
import Tomanicon from "@/icons/toman";
import { formatPrice } from "@/lib/utils";

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

// Define a minimal SelectedProduct type for cart usage
interface SelectedProduct {
  title: string;
  price: string;
}

// تابع برای دریافت محصولات
// Fetch products from API (see src/lib/api.ts)
const fetchProducts = async (): Promise<ApiProduct[]> => {
  return fetchProductsFromApi();
};

function ProductsContent() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(
    undefined
  );
  // استفاده از usePathname و useSearchParams برای مدیریت مسیر
  const searchParams = useSearchParams();

  useEffect(() => {
    setCategoryFilter(searchParams.get("category") || undefined);
  }, [searchParams]);

  // دریافت داده‌ها در useEffect (فقط در سمت کاربر)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        console.log("Products data received:", productsData);
        // Filter out products with invalid image URLs or add fallback images
        const validProducts = productsData.map((product) => ({
          ...product,
          image: product.image || "/img/sigar.png", // Use existing placeholder image
        }));
        console.log("Valid products with images:", validProducts);
        setProducts(validProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Set empty array to prevent further errors
        setProducts([]);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    let isValid = true;

    // The API does not provide a category field. If needed, add logic here.
    // if (categoryFilter) {
    //   isValid = isValid && product.category === categoryFilter;
    // }

    if (searchQuery) {
      isValid =
        isValid &&
        (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));
    }

    // The API does not provide a category field. If needed, add logic here.
    // if (selectedCategories.length > 0) {
    //   isValid = isValid && selectedCategories.includes(product.category);
    // }

    if (selectedBrands.length > 0) {
      isValid =
        isValid &&
        selectedBrands.some((_brand) => product.name.includes(_brand));
    }

    return isValid;
  });

  const handleBackClick = () => {
    // Simulate a back navigation
    window.history.back();
  };

  const handleAddToCart = (product: SelectedProduct) => {
    setSelectedProduct(product);
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedProduct(null);
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
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
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
        <div className="filter-sheet p-4 flex flex-col gap-4 justify-start rounded-lg shadow-md">
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id.toString()}
              imageUrl={product.image}
              title={product.name}
              subtitle={product.description}
              price={product.latest_price.toString()}
              // category={product.category} // Not available from API
              onAddToCart={() =>
                handleAddToCart({
                  title: product.name,
                  price: product.latest_price.toString(),
                })
              }
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

      <BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
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
      </BottomSheet>
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
