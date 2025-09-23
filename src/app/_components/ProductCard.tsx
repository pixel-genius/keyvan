"use client";

import { Card, CardContent } from "@/components/components/atoms/card";
import Typography from "@/components/components/atoms/typography";
import { Button } from "@/components/components/atoms/button";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import { formatPrice } from "@/lib/utils";
import Tomanicon from "@/icons/toman";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Check if imageUrl is valid
  const isValidImageUrl = imageUrl && imageUrl.trim() !== "" && !imageError;

  return (
    <Card dir="rtl" className="bg-black text-white rounded-2xl">
      <CardContent className="p-4 flex items-center space-x-4 justify-between">
        <Link className="flex gap-3 items-center" href={`/products/${id}`}>
          <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
            {isValidImageUrl ? (
              <Image
                src={imageUrl || "/img/sigar.png"}
                alt={title}
                fill
                className="object-cover"
                onError={handleImageError}
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-xs">تصویر</span>
              </div>
            )}
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
        </Link>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            <Typography variant="label/sm" weight="bold">
              {formatPrice(price)}
            </Typography>
            <Tomanicon size={18} />
          </div>

          <div className="flex space-x-2 mt-2">
            <Button
              variant="primary"
              size="sm"
              className="bg-primary rounded-sm d-inline-flex"
              onClick={onAddToCart}
              iconLeft={<IconShoppingCartPlus className="w-5 h-5" stroke={2} />}
            >
              افزودن
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
