"use client"; // این خط را به بالای فایل اضافه کنید

import { useState, useEffect } from 'react';
import { IconChevronLeft, IconFilter, IconX } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '@/app/_components/ProductCard';
import BottomSheet from '@/app/_components/BottomSheet';
import Counter from '@/app/_components/Counter';
import Typography from '@/components/components/atoms/typography';
import { Input } from '@/components/components/molecules/input';
import { Textarea } from '@/components/components/atoms/textarea';
import { Button } from '@/components/components/atoms/button';
import { Chip } from '@/components/components/atoms/chip';
import { products } from '@/data/products';
import Header from '@/app/_components/Header';

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

// تابع برای دریافت محصولات
const fetchProducts = async (): Promise<Product[]> => {
  return [
    {
      id: 1,
      title: "مارلبورو",
      subtitle: "Subtitle 1",
      price: "100",
      category: "Category 1",
      imageUrl: "/path/to/image1.jpg",
    },
    {
      id: 2,
      title: "وینستون",
      subtitle: "Subtitle 2",
      price: "200",
      category: "Category 2",
      imageUrl: "/path/to/image2.jpg",
    },
  ];
};

export default function ProductsPage() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<SelectedProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
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
      const productsData = await fetchProducts();
      setProducts(productsData);
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    let isValid = true;

    if (categoryFilter) {
      isValid = isValid && product.category === categoryFilter;
    }

    if (searchQuery) {
      isValid =
        isValid &&
        (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCategories.length > 0) {
      isValid = isValid && selectedCategories.includes(product.category);
    }

    if (selectedBrands.length > 0) {
      isValid =
        isValid &&
        selectedBrands.some((_brand) => product.title.includes(_brand));
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

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  return (
    <div className="mx-auto min-h-full">
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

      {isFilterSheetOpen && (
        <div className="filter-sheet p-4 bg-white rounded-lg shadow-md">
          <div className="categories">
            <Typography variant="label/md" weight="bold">
              دسته‌بندی‌ها
            </Typography>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => toggleCategory(category)}
                className={
                  selectedCategories.includes(category) ? "active" : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="brands mt-4">
            <Typography variant="label/md" weight="bold">
              برندها
            </Typography>
            {cigaretteBrands.map((brand) => (
              <Button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className={selectedBrands.includes(brand) ? "active" : ""}
              >
                {brand}
              </Button>
            ))}
          </div>
          <div className="actions mt-4">
            <Button onClick={resetFilters}>بازنشانی</Button>
            <Button onClick={applyFilters}>اعمال فیلترها</Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id.toString()}
              imageUrl={product.imageUrl}
              title={product.title}
              subtitle={product.subtitle}
              price={product.price}
              category={product.category}
              onAddToCart={() =>
                handleAddToCart({ title: product.title, price: product.price })
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
