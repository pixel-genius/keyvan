// components/FilterChips.tsx
import { useGetBrandLookupListApi } from "@/utils/apis/shop/brand/GET/brandLookupListApi";
import Typography from "@/components/components/atoms/typography";
import { Skeleton } from "@/components/components/atoms/skeleton";
import { Chip } from "@/components/components/atoms/chip";
import React, { useState } from "react";
import { Lookup } from "@/lib/types";

type BrandChipsFilterProps = {
  value?: number;
  onChange: (value: Lookup) => void;
};

const BrandChipsFilter: React.FC<BrandChipsFilterProps> = ({
  onChange,
  value,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<Lookup | null>(null);

  const brandLookupQuery = useGetBrandLookupListApi();

  return (
    <div className="flex gap-2">
      {brandLookupQuery.isFetching &&
        [...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-9 w-16 bg-card rounded-sm" />
        ))}
      {brandLookupQuery?.data?.map((item) => (
        <Chip
          key={item.name + item.id}
          variant={
            item.id === selectedBrand?.id || value === item.id
              ? "primary"
              : "secendery"
          }
          size="sm"
          onClick={() => {
            setSelectedBrand(item);
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

export default BrandChipsFilter;
