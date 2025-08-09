import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface ShopPricesDetailApiResponse {
  id: number;
  name: string;
  description: string | null;
  image: string;
  created_at: string;
  is_active: boolean;
  latest_price: number;
}

const getShopPricesDetailApi = async (
  slug: string,
): Promise<ShopPricesDetailApiResponse> => {
  const response = await coreApi.get(path.join(`/shop/prices/${slug}/`));
  return response.data;
};

export const useGetShopPricesDetail = (
  props?: { slug: string } & Partial<
    DefinedInitialDataOptions<
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
