'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IconChevronLeft } from '@tabler/icons-react';
import Typography from '@/components/components/atoms/typography';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import Image from 'next/image';
import Header from '@/app/_components/Header';


interface CategoryWithCount {
  id: string;
  name: string;
  imageUrl: string;
  count: number;
}

const CategoryPage = () => {
  const router = useRouter();
  const [categoriesWithCount, setCategoriesWithCount] = useState<CategoryWithCount[]>([]);

  useEffect(() => {
    // Count products for each category
    const categoriesWithProductCount = categories.map(category => {
      const count = products.filter(product => product.category === category.name).length;
      return {
        ...category,
        count
      };
    });

    setCategoriesWithCount(categoriesWithProductCount);
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  const handleCategoryClick = (categoryName: string) => {
    // Navigate to products page with category filter
    router.push(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className=" mx-auto min-h-full pb-24">
      <Header title="دسته بندی‌ها" />

      <div className="flex justify-between items-center gap-8 pt-4 pb-4">
     
    
        <div className="w-6"></div> {/* Spacer for alignment */}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {categoriesWithCount.map((category) => (
          <div 
            key={category.id}
            className="flex items-center gap-4 bg-zinc-900 rounded-lg p-4 cursor-pointer"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
              <Image 
                src={category.imageUrl} 
                alt={category.name}
                width={80}
                height={80}
                objectFit="cover"
              />
            </div>
            <div className="flex-1 text-right">
              <Typography variant="label/lg" weight="semi-bold">
                {category.name}
              </Typography>
            </div>
            <div className="bg-zinc-800 px-3 py-1 rounded-full">
              <Typography variant="label/sm" weight="normal">
                {category.count}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage; 