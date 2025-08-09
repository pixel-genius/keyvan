import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import { Lookup } from "@/lib/types";
import path from "path";

export interface ShopPricesListApiParams {
  search?: string;
  date?: string;
  category?: number;
  brand?: number;
}

export interface ShopPricesListApiResponse {
  id: number;
  product_id: number;
  price: number;
  created_at: string;
  name: string;
  category: Lookup;
  brand: Lookup;
  is_increamental: boolean;
}

const getShopPricesListApi = async (
  props?: ShopPricesListApiParams,
): Promise<ShopPricesListApiResponse[]> => {
  const response = await coreApi.get(path.join("/shop/prices/"), {
    params: props,
  });

  return response.data;
};

export const useGetShopPricesList = (
  props?: { params: ShopPricesListApiParams } & Partial<
    DefinedInitialDataOptions<
      ShopPricesListApiResponse[],
      unknown,
      ShopPricesListApiResponse[],
      QueryKey
    >
  >,
) => {
  const { params } = props || {};
  const query = useQuery({
    queryKey: ["getShopPricesList", params],
    queryFn: () => getShopPricesListApi(params),
    ...props,
  });

  return query;
};
