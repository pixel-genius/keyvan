import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import { ShopProductDetailApiResponse } from "../[id]/GET/shopProductDetailApi";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface ShopProductsListApiParams {
  category?: number;
  brand?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ShopProductsListApiResponse {
  results: ShopProductDetailApiResponse[];
  count: number;
  next: string | null;
  previous: string | null;
}

const getShopProductsListApi = async (
  params: ShopProductsListApiParams,
): Promise<ShopProductsListApiResponse> => {
  const response = await coreApi.get(path.join("/shop/products/"), {
    params,
  });

  return response.data;
};

export const useGetShopProductsList = (
  props?: { params: ShopProductsListApiParams } & Partial<
    DefinedInitialDataOptions<
      ShopProductsListApiResponse,
      unknown,
      ShopProductsListApiResponse,
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
