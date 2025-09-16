// components/FilterChips.tsx
import { useGetCategoryLookupListApi } from "@/utils/apis/shop/category/GET/categoryLookupListApi";
import Typography from "@/components/components/atoms/typography";
import { Skeleton } from "@/components/components/atoms/skeleton";
import { Chip } from "@/components/components/atoms/chip";
import React, { useState } from "react";
import { Lookup } from "@/lib/types";

type CategoryChipsFilterProps = {
  value?: number;
  onChange: (value: Lookup | null) => void;
};

const CategoryChipsFilter: React.FC<CategoryChipsFilterProps> = ({
  onChange,
  value,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Lookup | null>(null);

  const categoryLookupQuery = useGetCategoryLookupListApi();

  return (
    <div className="flex gap-2">
      {categoryLookupQuery.isFetching &&
        [...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-9 w-16 bg-card rounded-sm" />
        ))}
      {categoryLookupQuery?.data?.map((item) => (
        <Chip
          key={item.name + item.id}
          variant={
            item.id === selectedCategory?.id || value === item.id
              ? "primary"
              : "secendery"
          }
          size="sm"
          onClick={() => {
            const chipValue = selectedCategory?.id === item.id ? null : item;
            setSelectedCategory(chipValue);
            onChange(chipValue);
          }}
          className="cursor-pointer"
        >
          <Typography variant="label/xs" weight="bold">
            {item.name}
          </Typography>
        </Chip>
      ))}
    </div>
  );
};

export default CategoryChipsFilter;
