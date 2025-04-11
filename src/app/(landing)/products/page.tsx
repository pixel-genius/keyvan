'use client';

import { useState, useEffect } from 'react';
import { IconChevronLeft, IconFilter, IconX } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductCard from '../_components/ProductCard';
import BottomSheet from '../_components/BottomSheet';
import Counter from '../_components/Counter';
import Typography from '@/components/components/atoms/typography';
import { Input } from '@/components/components/molecules/input';
import { Textarea } from '@/components/components/atoms/textarea';
import { Button } from '@/components/components/atoms/button';
import { Chip } from '@/components/components/atoms/chip';
import { products } from '@/data/products';
import Header from '../_components/Header';

// Define cigarette brands in Persian
const cigaretteBrands = [
  "مارلبورو",
  "وینستون",
  "داویدوف",
  "کنت",
  "پارلیامنت",
  "دانهیل",
  "لاکی استرایک",
  "پال مال"
];

const ProductsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ title: string; price: string } | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  // Get unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));

  useEffect(() => {
    // Filter products based on category, search query, and selected filters
    let result = products;
    
    if (categoryFilter) {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    if (searchQuery) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filters
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category));
    }
    
    // Apply brand filters
    if (selectedBrands.length > 0) {
      result = result.filter(product => {
        // Check if any of the selected brands is in the product title
        return selectedBrands.some(brand => product.title.includes(brand));
      });
    }
    
    setFilteredProducts(result);
  }, [categoryFilter, searchQuery, selectedCategories, selectedBrands]);

  const handleBackClick = () => {
    router.back();
  };

  const handleAddToCart = (product: { title: string; price: string }) => {
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

  const handleCloseFilterSheet = () => {
    setIsFilterSheetOpen(false);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  const applyFilters = () => {
    setIsFilterSheetOpen(false);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  return (
    <div className=" mx-auto min-h-full">
      <Header title={categoryFilter ? categoryFilter : 'محصولات'} onBackClick={handleBackClick} />
      
      <div className="flex justify-between items-center gap-2 ">
        <Input 
          placeholder="جستجو" 
          className="pb-1  text-sm" 
          dir='rtl'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="flex justify-center items-center">
          <div 
            className='border-2 border-zinc-700 rounded p-2 cursor-pointer h-[50px] w-[50px] flex items-center justify-center'
            onClick={handleFilterClick}
          >
            <IconFilter size="24" stroke={1.5} />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2 mt-4'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              category={product.category}
              key={product.id}
              id={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              subtitle={product.subtitle}
              price={product.price}
              onAddToCart={() => handleAddToCart({ title: product.title, price: product.price })}
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

      {/* Add to Cart Bottom Sheet */}
      <BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        {selectedProduct && (
          <div className='pb-15'>
            <hr className='w-1/2 mx-auto border-2 rounded-full mb-4' />
            <Typography variant="label/lg" weight="semi-bold" className="mb-4 text-center" >افزودن محصول به سبد </Typography>

            <Typography variant="label/sm" weight="bold" className="mb-4 text-center" >{selectedProduct.title}</Typography>
          
            <Counter />
            <Textarea placeholder="توضیحات (اختیاری)" className="mb-4" />
            <Button className="w-full" variant="primary" onClick={handleCloseBottomSheet}>
              افزودن به سبد خرید
            </Button>
          </div>
        )}
      </BottomSheet>

      {/* Filter Bottom Sheet */}
      <BottomSheet isOpen={isFilterSheetOpen} onClose={handleCloseFilterSheet}>
        <div className='pb-15'>
          <div className="flex justify-between items-center py-8">
            <IconX 
              size={24} 
              className="cursor-pointer" 
              onClick={handleCloseFilterSheet} 
            />
            <Typography variant="heading/sm" weight="semi-bold">فیلترها</Typography>
          </div>
          
          <div className="mb-2">
            <Typography variant="label/lg" weight="medium" className="pt-4 text-right">دسته‌بندی</Typography>
            <div className="flex justify-end py-4 flex-wrap gap-2">
              {categories.map((category) => (
                <Chip 
                  key={category}
                  variant={selectedCategories.includes(category) ? "primary" : "secendery"}
                  size="sm"
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Chip>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <Typography variant="label/lg" weight="medium" className="py-4 text-right">برند</Typography>
            <div className="flex justify-end flex-wrap gap-2">
              {cigaretteBrands.map((brand) => (
                <Chip 
                  key={brand}
                  variant={selectedBrands.includes(brand) ? "primary" : "secendery"}
                  size="sm"
                  onClick={() => toggleBrand(brand)}
                >
                  {brand}
                </Chip>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1" 
              variant="secondary" 
              onClick={resetFilters}
            >
              پاک کردن فیلترها
            </Button>
            <Button 
              className="flex-1" 
              variant="primary" 
              onClick={applyFilters}
            >
              اعمال فیلترها
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default ProductsPage;