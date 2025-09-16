import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import { Lookup } from "@/lib/types";
import path from "path";

export interface ShopPricesDetailApiResponse {
  brand: Lookup | null;
  category: Lookup | null;
  created_at: string;
  description: string;
  id: number;
  image: string;
  is_increamental: boolean;
  name: string;
  price: number;
}

const getShopPricesDetailApi = async (
  slug: string,
): Promise<ShopPricesDetailApiResponse> => {
  const response = await coreApi.get(path.join(`/shop/prices/${slug}/`));
  return response.data;
};

export const useGetShopPricesDetail = (
  props?: { slug: string } & Partial<
    UseQueryOptions<
      ShopPricesDetailApiResponse,
      unknown,
      ShopPricesDetailApiResponse,
      QueryKey
    >
  >,
) => {
  const { slug, ...restProps } = props || {};
  const query = useQuery({
    queryKey: ["getShopPricesDetail", slug],
    queryFn: () => getShopPricesDetailApi(slug || ""),
    ...restProps,
  });

  return query;
};
