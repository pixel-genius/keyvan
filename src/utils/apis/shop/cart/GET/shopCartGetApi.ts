import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ShopProductDetailApiResponse } from "../../products/[id]/GET/shopProductDetailApi";
import type { ORDERTYPE } from "../add/POST/shopCartAddPostApi";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface ShopCartItemObj {
  id: number;
  product: ShopProductDetailApiResponse;
  product_id: number;
  quantity: number;
  total_price: string;
  suggested_price: string;
  order_type: ORDERTYPE;
  created_at: string;
  updated_at: string;
}

export interface ShopCartApiResponse {
  id: number;
  items: ShopCartItemObj[];
  total_buy_items: string;
  total_sell_items: string;
  total_price: string;
  total_buy_amount: number;
  total_sell_amount: number;
  created_at: string;
  updated_at: string;
}
export const SHOPCARTGET_QUERYKEY = "getShopCartApi";
const getShopCartApi = async (): Promise<ShopCartApiResponse> => {
  const response = await coreApi.get(path.join("/shop/cart/"));

  return response.data;
};

export const useGetShopCartListApi = (
  props?: Partial<
    UseQueryOptions<ShopCartApiResponse, unknown, ShopCartApiResponse, QueryKey>
  >,
) => {
  const query = useQuery({
    queryKey: [SHOPCARTGET_QUERYKEY],
    queryFn: () => getShopCartApi(),
    ...props,
  });

  return query;
};

// useMutation Hook with proper types
export const useGetMutateShopCartListApi = (
  options?: UseMutationOptions<ShopCartApiResponse, unknown, unknown>,
) => {
  return useMutation<ShopCartApiResponse, unknown, unknown, unknown>({
    mutationFn: getShopCartApi,
    mutationKey: [SHOPCARTGET_QUERYKEY + "Mutate"],
    ...options,
  });
};
