import { ShopProductDetailApiResponse } from "../../products/[id]/GET/shopProductDetailApi";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface ShopCartItemObj {
  id: number;
  product: ShopProductDetailApiResponse;
  product_id: number;
  quantity: number;
  total_price: string;
  suggested_price: string;
  created_at: string;
  updated_at: string;
}

export interface ShopCartApiResponse {
  id: number;
  items: ShopCartItemObj[];
  total_items: string;
  total_price: string;
  total_buy_amount: string;
  total_sell_amount: string;
  created_at: string;
  updated_at: string;
}

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
    queryKey: ["getShopCartApi"],
    queryFn: () => getShopCartApi(),
    ...props,
  });

  return query;
};
