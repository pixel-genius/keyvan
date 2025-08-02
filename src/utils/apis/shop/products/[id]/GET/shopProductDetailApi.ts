import { coreApi } from "@/utils/service/instance";
import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import path from "path";

interface ShopProductDetailApiResponse {
  id: number;
  name: string;
  description: string | null;
  image: URL | null | string;
  created_at: Date | string;
  is_active: boolean;
  latest_price: number;
  price_history: {
    id: number;
    price: number;
    created_at: Date | string;
  }[];
}

const getShopProductDetailApi = async (
  slug: string
): Promise<ShopProductDetailApiResponse> => {
  const response = await coreApi.get(path.join(`/shop/products/${slug}`));
  return response.data;
};

export const UseGetShopProductDetail = (
  props?: { slug: string } & Partial<
    DefinedInitialDataOptions<
      ShopProductDetailApiResponse,
      unknown,
      ShopProductDetailApiResponse,
      QueryKey
    >
  >
) => {
  const { slug, ...restProps } = props || {};
  const query = useQuery({
    queryKey: ["getShopProductDetail", slug],
    queryFn: () => getShopProductDetailApi(slug || ""),
    ...restProps,
  });

  return query;
};
