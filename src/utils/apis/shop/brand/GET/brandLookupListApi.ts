import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import { Lookup } from "@/lib/types";
import path from "path";

export interface BrandLookupListApiResponseObj extends Lookup {
  description: string;
  created_at: string;
  image?: string;
  is_active: boolean;
}

type BrandLookupListApiResponse = BrandLookupListApiResponseObj[];

const getBrandLookupListApi = async (): Promise<BrandLookupListApiResponse> => {
  const response = await coreApi.get(path.join("/shop/brands/"));

  return (
    response.data || [
      { name: "کمل", id: 1 },
      { name: "بهمن", id: 2 },
      { name: "سی‌تی‌آی", id: 3 },
      { name: "مارلبورو", id: 4 },
      { name: "وینستون", id: 5 },
    ]
  );
};

export const useGetBrandLookupListApi = (
  props?: Partial<
    UseQueryOptions<
      BrandLookupListApiResponse,
      unknown,
      BrandLookupListApiResponse,
      string[]
    >
  >,
) => {
  const query = useQuery({
    queryKey: ["getBrandLookupList"],
    queryFn: () => getBrandLookupListApi(),
    ...props,
  });

  return query;
};
