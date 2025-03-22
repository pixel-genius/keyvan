'use client';

import Image from 'next/image';
import { IconEye, IconShoppingCartPlus } from '@tabler/icons-react';
import { Card, CardContent } from '@/components/ui/card';
import Typography from '@/components/ui/typography';

interface ProductCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  price: string;
  onAddToCart: () => void; // اضافه کردن این خط
}

export default function ProductCard({ imageUrl, title, subtitle, price, onAddToCart }: ProductCardProps) {
  return (
    <Card dir='rtl' className="bg-black text-white rounded-2xl">
      <CardContent className="p-4 flex items-center space-x-4">
        <div className="w-16 h-16 relative rounded-lg overflow-hidden">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
        </div>
        
        <div className="flex-1">
            <Typography variant="paragraph/sm" weight="bold" className='pb-2'>{title}</Typography>
        
          <div className="flex items-center mt-2">
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-lg">سیگار</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
            <Typography variant="label/sm" weight="bold">{price}</Typography>
        
          <div className="flex space-x-2 mt-2">
            <button className="p-2 bg-gray-700 rounded-full hover:bg-gray-600">
              <IconEye stroke={2} className="w-5 h-5" />
            </button>
            <button className="p-2 bg-primary rounded-full" onClick={onAddToCart}>
              <IconShoppingCartPlus className="w-5 h-5" stroke={2} />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}