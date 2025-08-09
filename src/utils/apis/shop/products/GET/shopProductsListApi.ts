import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface ShopProductsListApiParams {
  category?: number;
  brand?: number;
  search?: string;
}

interface ProductsListApiResponse {
  id: number;
  name: string;
  description: string | null;
  image: string;
  created_at: string;
  is_active: boolean;
  latest_price: number;
  price_history: {
    id: number;
    price: number;
    created_at: string;
  }[];
}

const getShopProductsListApi = async (
  params: ShopProductsListApiParams,
): Promise<ProductsListApiResponse[]> => {
  const response = await coreApi.get(path.join("/shop/products/"), {
    params,
  });

  return response.data;
};

export const useGetShopProductsList = (
  props?: { params: ShopProductsListApiParams } & Partial<
    DefinedInitialDataOptions<
      ProductsListApiResponse[],
      unknown,
      ProductsListApiResponse[],
      QueryKey
    >
  >,
) => {
  const { params, ...restProps } = props || {};
  const query = useQuery({
    queryKey: ["getShopProductsList", params],
    queryFn: () => getShopProductsListApi(params ?? {}),
    ...restProps,
  });

  return query;
};
