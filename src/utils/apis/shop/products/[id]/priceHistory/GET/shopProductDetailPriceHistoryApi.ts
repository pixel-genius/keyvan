import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface ShopProductDetailPriceHistoryApiResponse {
  id: number;
  price: number;
  created_at: string;
}

const getShopProductDetailPriceHistoryApi = async (
  slug: string,
): Promise<ShopProductDetailPriceHistoryApiResponse[]> => {
  const response = await coreApi.get(
    path.join(`/shop/products/${slug}/price_history/`),
  );
  return response.data;
};

export const useGetShopProductDetailPriceHistory = (
  props?: { slug: string } & Partial<
    UseQueryOptions<
      ShopProductDetailPriceHistoryApiResponse[],
      unknown,
      ShopProductDetailPriceHistoryApiResponse[],
      QueryKey
    >
  >,
) => {
  const { slug, ...restProps } = props || {};
  const query = useQuery({
    queryKey: ["getShopProductDetailPriceHistory", slug],
    queryFn: () => getShopProductDetailPriceHistoryApi(slug || ""),
    ...restProps,
  });

  return query;
};
