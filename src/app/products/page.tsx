'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Typography from '@/components/ui/typography';
import { IconChevronLeft, IconFilter } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import ProductCard from '../_components/ProductCard';
import BottomSheet from '../_components/BottomSheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const ProductsPage = () => {
  const router = useRouter();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ title: string; price: string } | null>(null);

  const handleBackClick = () => {
    router.back(); // بر می‌گردد به صفحه قبلی
  };

  const handleAddToCart = (product: { title: string; price: string }) => {
    setSelectedProduct(product);
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mx-auto min-h-full">
      <div className="flex justify-between items-center gap-8 pt-4 pb-4">
        <div className="flex flex-col items-center">
          <IconChevronLeft stroke={2} className='cursor-pointer' onClick={handleBackClick} />
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="label/md" weight="normal">
            محصولات
          </Typography>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2">
        <Input placeholder="جستجو" className="w-full" dir='rtl' />
        <div className="flex flex-col items-center">
          <div className='border-2 border-zinc-700 rounded p-2 cursor-pointer'>
            <IconFilter size="20" stroke={1.5} />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2 mt-4'>
        <ProductCard
          imageUrl="/img/image-cig.jpg"
          title="سیگار وینستون کلاسیک الترا"
          subtitle="لایت نقره‌ای کینگ"
          price="۲۰۰,۰۰۰ تومان"
          onAddToCart={() => handleAddToCart({ title: "سیگار وینستون کلاسیک الترا", price: "۲۰۰,۰۰۰ تومان" })}
        />

        <ProductCard
          imageUrl="/img/image-cig.jpg"
          title="سیگار وینستون کلاسیک الترا"
          subtitle="لایت نقره‌ای کینگ"
          price="۲۰۰,۰۰۰ تومان"
          onAddToCart={() => handleAddToCart({ title: "سیگار وینستون کلاسیک الترا", price: "۲۰۰,۰۰۰ تومان" })}
        />
      </div>

      <BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        {selectedProduct && (
          <div className='pb-15'>
            <hr className='w-1/2 mx-auto border-2 rounded-full mb-4' />
            <Typography variant="label/lg" weight="semi-bold" className="mb-4 text-center" >افزودن محصول به سبد </Typography>

            <Typography variant="label/sm" weight="bold" className="mb-4 text-center" >{selectedProduct.title}</Typography>
          
            {/* اضافه کردن فیلدهای تعداد و توضیحات */}
            <Input type="number" placeholder="تعداد" className="mb-4" />
            <Textarea placeholder="توضیحات (اختیاری)" className="mb-4" />
            <Button className="w-full" variant="primary" onClick={handleCloseBottomSheet}>
              
              افزودن به سبد خرید
            </Button>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};

export default ProductsPage;