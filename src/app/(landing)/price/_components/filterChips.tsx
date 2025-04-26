// components/FilterChips.tsx
import { Chip } from "@/components/components/atoms/chip";
import Typography from "@/components/components/atoms/typography";
import React from "react";

type FilterChipsProps = {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export const FilterChips: React.FC<FilterChipsProps> = ({
  filters,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <Chip
          key={filter}
          variant={filter === activeFilter ? "primary" : "secendery"}
          size="sm"
          onClick={() => onFilterChange(filter)}
          className="cursor-pointer"
        >
          <Typography variant="label/xs" weight="bold">
            {filter}
          </Typography>
        </Chip>
      ))}
    </div>
  );
};
