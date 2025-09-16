import { ShopPricesDetailApiResponse } from "../[id]/GET/shopPricesDetailApi";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface ShopPricesListApiParams {
  search?: string;
  date?: string;
  category?: number;
  brand?: number;
  ordering?: string; // 'field' || '-field' || 'field1,field2' || '-field1,-field2'
  product_id?: string;
  product__name?: string;
  product__category?: string;
  product__brand?: string;
  product__is_active?: boolean;
  product__is_increamental?: boolean;
  date_before?: string;
  date_after?: string;
  page: number;
}

export type ShopPricesListApiResponse = ShopPricesDetailApiResponse[];

const getShopPricesListApi = async (
  props?: ShopPricesListApiParams,
): Promise<ShopPricesListApiResponse> => {
  const response = await coreApi.get(path.join("/shop/prices/"), {
    params: props,
  });

  return response.data;
};

export const useGetShopPricesList = (
  props?: { params: ShopPricesListApiParams } & Partial<
    UseQueryOptions<
      ShopPricesListApiResponse,
      unknown,
      ShopPricesListApiResponse,
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
