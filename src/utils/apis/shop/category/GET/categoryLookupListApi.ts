import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import { Lookup } from "@/lib/types";
import path from "path";

export interface CategoryLookupListApiResponseObj extends Lookup {
  description: string;
  created_at: string;
  is_active: boolean;
}

type CategoryLookupListApiResponse = CategoryLookupListApiResponseObj[];

const getCategoryLookupListApi =
  async (): Promise<CategoryLookupListApiResponse> => {
    const response = await coreApi.get(path.join("/shop/categories/"));

    return (
      response.data || [
        { name: "همه", id: 1 },
        { name: "سیگار", id: 2 },
        { name: "تنباکو", id: 3 },
        { name: "سی‌تی‌آی", id: 4 },
        { name: "بی‌تی‌آی", id: 5 },
      ]
    );
  };

export const useGetCategoryLookupList = (
  props?: Partial<
    UseQueryOptions<
      CategoryLookupListApiResponse,
      unknown,
      CategoryLookupListApiResponse,
      string[]
    >
  >,
) => {
  const query = useQuery({
    queryKey: ["getCategoryLookupList"],
    queryFn: () => getCategoryLookupListApi(),
    ...props,
  });

  return query;
};
