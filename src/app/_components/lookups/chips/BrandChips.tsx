// components/FilterChips.tsx
import { useGetBrandLookupList } from "@/utils/apis/brand/GET/brandLookupListApi";
import Typography from "@/components/components/atoms/typography";
import { Chip } from "@/components/components/atoms/chip";
import React, { useState } from "react";
import { Lookup } from "@/lib/types";

type BrandChipsFilterProps = {
  onChange: (value: Lookup) => void;
};

const BrandChipsFilter: React.FC<BrandChipsFilterProps> = ({ onChange }) => {
  const [selectedBrand, setSelectedBrand] = useState<Lookup | null>(null);

  const brandLookupQuery = useGetBrandLookupList();

  return (
    <div className="flex gap-2">
      {brandLookupQuery?.data?.map((item) => (
        <Chip
          key={item.name + item.id}
          variant={item.id === selectedBrand?.id ? "primary" : "secendery"}
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
