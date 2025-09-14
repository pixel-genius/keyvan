import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
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

export const useGetShopProductsListApi = (
  props?: { params: ShopProductsListApiParams } & Partial<
    UseQueryOptions<
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

export const useGetShopProductsListInfiniteApi = (
  props?: {
    params?: Omit<ShopProductsListApiParams, "page">;
  } & Partial<
    UseInfiniteQueryOptions<
      ShopProductsListApiResponse,
      unknown,
      ShopProductDetailApiResponse[],
      QueryKey,
      number
    >
  >,
) => {
  const { params, ...restProps } = props || {};

  return useInfiniteQuery<
    ShopProductsListApiResponse,
    unknown,
    ShopProductDetailApiResponse[],
    QueryKey,
    number
  >({
    queryKey: ["getShopProductsListInfinite", params],
    queryFn: ({ pageParam = 1 }) =>
      getShopProductsListApi({ ...(params || {}), page: pageParam }),
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((page) => page.results),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.next ? allPages.length + 1 : undefined,
    ...restProps,
  });
};
