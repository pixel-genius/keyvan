import Typography from "@/components/components/atoms/typography";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardItemProps {
  icon?: React.ReactNode;
  image?: string;
  label: string;
  link?: string;
  size?: "sm" | "md" | "lg";
  imageSize?: number;
}

const CardItem = ({
  icon,
  image,
  label,
  link,
  size = "md",
  imageSize,
}: CardItemProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const defaultImageSize = {
    sm: 32,
    md: 48,
    lg: 64
  };

  const finalImageSize = imageSize || defaultImageSize[size];

  return (
    <Link href={link || ""}>
      <div className="flex flex-col items-center">
        <div className={`bg-card p-4 rounded-xl shadow-lg flex items-center justify-center ${sizeClasses[size]}`}>
          {image ? (
            <Image
              src={image}
              alt={label}
              width={finalImageSize}
              height={finalImageSize}
              unoptimized
              className="object-contain w-full h-full"
            />
          ) : icon ? (
            <div className="w-full h-full flex items-center justify-center">
              {icon}
            </div>
          ) : null}
        </div>
        <Typography
          variant="label/xs"
          weight="normal"
          className="text-center pt-4"
        >
          {label}
        </Typography>
      </div>
    </Link>
  );
};

export default CardItem;
