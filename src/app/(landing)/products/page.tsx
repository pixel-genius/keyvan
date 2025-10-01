"use client";

import AddToCartBottomSheet, {
  SelectedItemAddCartBottomSheet,
} from "@/app/_components/AddToCartBottomSheet";
import {
  ORDERTYPE,
  usePostShopCartAddApi,
} from "@/utils/apis/shop/cart/add/POST/shopCartAddPostApi";
import { useGetShopProductsListInfiniteApi } from "@/utils/apis/shop/products/GET/shopProductsListApi";
import { useGetCategoryLookupListApi } from "@/utils/apis/shop/category/GET/categoryLookupListApi";
import { useGetBrandLookupListApi } from "@/utils/apis/shop/brand/GET/brandLookupListApi";
import { useInfiniteScroll } from "@/utils/hooks/useInfiniteScroll";
import Typography from "@/components/components/atoms/typography";
import { Skeleton } from "@/components/components/atoms/skeleton";
import { Input } from "@/components/components/molecules/input";
import { useAuthStore } from "@/utils/store/authenticate.store";
import { Button } from "@/components/components/atoms/button";
import { Chip } from "@/components/components/atoms/chip";
import ProductCard from "@/app/_components/ProductCard";
// Import the API fetch function and type
import BottomSheet from "@/app/_components/BottomSheet";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { Suspense, useEffect, useState } from "react";
import PageTitle from "@/app/_components/PageTitle";
import { useSearchParams } from "next/navigation";
import { IconFilter } from "@tabler/icons-react";
import { toEnglishDigits } from "@/lib/utils";
import { toast } from "sonner";

interface Params {
  category?: number;
  brand?: number;
  limit?: number;
}

function ProductsContent() {
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedItemAddCartBottomSheet | null>(null);
  const { setUserInfo } = useAuthStore();
  const [params, setParams] = useState<Params>({
    category: undefined,
    brand: undefined,
    limit: 10,
  });

  const shopProductListQuery = useGetShopProductsListInfiniteApi({
    params: { ...params, search: debouncedSearchQuery },
  });

  const shopAddCartMutate = usePostShopCartAddApi({
    onSuccess: (res) => {
      setUserInfo({ shopCart: res });
      setIsBottomSheetOpen(false);
      toast.success("افزودن درخواست انجام شد");
    },
  });

  const categories = useGetCategoryLookupListApi();
  const brands = useGetBrandLookupListApi();

  // استفاده از usePathname و useSearchParams برای مدیریت مسیر
  const searchParams = useSearchParams();

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      category: searchParams?.get("category")
        ? Number(searchParams.get("category"))
        : undefined,
      brand: searchParams?.get("brand")
        ? Number(searchParams.get("brand"))
        : undefined,
    }));
  }, [searchParams]);

  const { observerRef } = useInfiniteScroll(shopProductListQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterClick = () => {
    setIsFilterSheetOpen(true);
  };

  const toggleCategory = (category: number) => {
    setParams((prev) => ({
      ...prev,
      category: category,
    }));
  };

  const toggleBrand = (brand: number) => {
    setParams((prev) => ({
      ...prev,
      brand: brand,
    }));
  };

  const applyFilters = () => {
    setIsFilterSheetOpen(false);
  };

  const resetFilters = () => {
    setParams({
      category: undefined,
      brand: undefined,
      limit: 10,
    });
    setIsFilterSheetOpen(false);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const onAddToCart = (order_type: ORDERTYPE) => {
    if (selectedProduct?.id && selectedProduct?.count) {
      shopAddCartMutate.mutate({
        product_id: selectedProduct?.id,
        quantity: selectedProduct?.count
          ? Number(toEnglishDigits(selectedProduct?.count))
          : undefined,
        order_type,
        suggested_price: Number(selectedProduct.suggested_price),
      });
    }
  };

  const onAddProductToCart = (id: number) => {
    setIsBottomSheetOpen(true);
    const item =
      shopProductListQuery.data?.find((item) => item.id === id) || null;
    setSelectedProduct(
      item
        ? {
            id: item.id,
            name: item.name,
            price: item.latest_price,
          }
        : null,
    );
  };
  // The API does not provide a category field. If needed, extract categories from another source.

  return (
    <div className="mx-auto pt-8 pb-4">
      <PageTitle title="محصولات" />

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
              {categories.data?.map((category) => (
                <Chip
                  key={category.id + category.name}
                  onClick={() => toggleCategory(Number(category.id))}
                  variant={
                    params.category === category.id ? "primary" : "secendery"
                  }
                  size="sm"
                >
                  {category.name}
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
              {brands.data?.map((brand) => (
                <Chip
                  key={brand.id + brand.name}
                  onClick={() => toggleBrand(Number(brand.id))}
                  variant={params.brand === brand.id ? "primary" : "secendery"}
                  size="sm"
                >
                  {brand.name}
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

      <div className="flex flex-col gap-2 mt-4 product-list-scroll-container">
        {shopProductListQuery?.data && shopProductListQuery.data?.length > 0
          ? shopProductListQuery.data?.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id.toString()}
                imageUrl={product.image as string}
                title={product.name}
                subtitle={product.description as string}
                price={product?.latest_price?.toString() || ""}
                category={product.category?.name as string} // Not available from API
                onAddToCart={() => {
                  onAddProductToCart(product.id);
                }}
              />
            ))
          : !shopProductListQuery.isPending && (
              <div className="text-center py-8">
                <Typography variant="label/md" weight="normal">
                  محصولی یافت نشد
                </Typography>
              </div>
            )}
        {shopProductListQuery.isFetching && (
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
        <div ref={observerRef} style={{ height: 10 }} />
      </div>
      <AddToCartBottomSheet
        disabled={shopAddCartMutate.isPending}
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        onAddToCart={onAddToCart}
        selectedItem={selectedProduct}
        setSelectedItem={setSelectedProduct}
      />
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
