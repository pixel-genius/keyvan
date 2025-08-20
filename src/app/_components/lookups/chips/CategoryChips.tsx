// components/FilterChips.tsx
import { useGetCategoryLookupList } from "@/utils/apis/shop/category/GET/categoryLookupListApi";
import Typography from "@/components/components/atoms/typography";
import { Chip } from "@/components/components/atoms/chip";
import React, { useState } from "react";
import { Lookup } from "@/lib/types";

type CategoryChipsFilterProps = {
  onChange: (value: Lookup) => void;
};

const CategoryChipsFilter: React.FC<CategoryChipsFilterProps> = ({
  onChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Lookup | null>(null);

  const categoryLookupQuery = useGetCategoryLookupList();

  return (
    <div className="flex gap-2">
      {categoryLookupQuery?.data?.map((item) => (
        <Chip
          key={item.name + item.id}
          variant={item.id === selectedCategory?.id ? "primary" : "secendery"}
          size="sm"
          onClick={() => {
            setSelectedCategory(item);
            onChange(item);
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
