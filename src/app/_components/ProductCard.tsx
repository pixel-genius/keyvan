"use client";

import { Card, CardContent } from "@/components/components/atoms/card";
import Typography from "@/components/components/atoms/typography";
import { IconEye, IconShoppingCartPlus } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id?: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  price: string;
  category?: string;
  onAddToCart: () => void;
}

export default function ProductCard({
  id = "1",
  imageUrl,
  title,
  price,
  category = "سیگار",
  onAddToCart,
}: ProductCardProps) {
  const router = useRouter();

  const handleViewProduct = () => {
    router.push(`/products/${id}`);
  };

  return (
    <Card dir="rtl" className="bg-black text-white rounded-2xl">
      <CardContent className="p-4 flex items-center space-x-4">
        <div className="w-16 h-16 relative rounded-lg overflow-hidden">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
        </div>

        <div className="flex-1">
          <Typography variant="paragraph/sm" weight="bold" className="pb-2">
            {title}
          </Typography>

          <div className="flex items-center mt-2">
            {/* Category  */}
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-lg">
              {category}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Typography variant="label/sm" weight="bold">
            {price}
          </Typography>

          <div className="flex space-x-2 mt-2">
            <button
              className="p-2 bg-gray-700 rounded-full hover:bg-gray-600"
              onClick={handleViewProduct}
            >
              <IconEye stroke={2} className="w-5 h-5" />
            </button>
            <button
              className="p-2 bg-primary rounded-full"
              onClick={onAddToCart}
            >
              <IconShoppingCartPlus className="w-5 h-5" stroke={2} />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
