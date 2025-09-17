"use client";

import { useGetCategoryLookupListApi } from "@/utils/apis/shop/category/GET/categoryLookupListApi";
import Typography from "@/components/components/atoms/typography";
import { Skeleton } from "@/components/components/atoms/skeleton";
import Header from "@/app/_components/Header";
import Image from "next/image";
import Link from "next/link";

const CategoryPage = () => {
  const categoryQuery = useGetCategoryLookupListApi();

  return (
    <div className="px-4 pt-28  mx-auto min-h-full pb-24">
      <Header title="دسته بندی‌ها" />

      <div className="flex justify-between items-center gap-8 pt-4 pb-4">
        <div className="w-6"></div> {/* Spacer for alignment */}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {categoryQuery.isPending ? (
          [...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-zinc-900 rounded-lg p-4 cursor-pointer"
            >
              <div className="inline-flex relative rounded-lg overflow-hidden">
                <Skeleton className="w-15 h-15 rounded-full" />
              </div>
              <div className="flex-1 text-right">
                <Skeleton className="w-15 h-4 rounded-sm" />
              </div>
              <div className="bg-zinc-800 px-3 py-1 rounded-full">
                <Skeleton className="w-7 h-7 rounded-sm" />
              </div>
            </div>
          ))
        ) : categoryQuery.data?.length ? (
          categoryQuery.data.map((category) => (
            <Link
              key={category.id}
              className="flex items-center gap-4 bg-zinc-900 rounded-lg p-4 cursor-pointer"
              href={`/products?category=${encodeURIComponent(+category.id)}`}
            >
              <div className="inline-flex relative w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src={category.image || "/img/logo-main.svg"}
                  className="-top-2"
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
              <div className="bg-zinc-800 w-7 h-7 rounded-full inline-flex justify-center items-center">
                <Typography variant="label/sm" weight="normal">
                  {category.count}
                </Typography>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <Typography variant="label/md" weight="normal">
              دسته بندی یافت نشد
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
