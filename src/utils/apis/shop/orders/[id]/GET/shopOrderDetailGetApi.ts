import { AccountAddressesObj } from "@/utils/apis/account/addresses/GET/accountAddressesListGetApi";
import { ShopProductDetailApiResponse } from "../../../products/[id]/GET/shopProductDetailApi";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export const SHOP_ORDER_STATUSES = {
  pending: "در انتظار تایید",
  confirmed: "تایید شده",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
};

export interface ShopOrderDetailApiResponse {
  id: number;
  status: keyof typeof SHOP_ORDER_STATUSES;
  total_amount: number;
  total_items: number;
  total_buy_amount: number;
  total_sell_amount: number;
  items: {
    id: number;
    product: ShopProductDetailApiResponse;
    quantity: number;
    price_at_time: number;
    total_price: number;
  }[];
  address: AccountAddressesObj;
  notes: string;
  created_at: string;
  updated_at: string;
}

const getShopOrderDetailApi = async (): Promise<ShopOrderDetailApiResponse> => {
  const response = await coreApi.get(path.join("/shop/orders/"));

  return response.data;
};

export const useGetShopOrderDetailApi = (
  props?: Partial<
    UseQueryOptions<
      ShopOrderDetailApiResponse,
      unknown,
      ShopOrderDetailApiResponse,
      QueryKey
    >
  >,
) => {
  const query = useQuery({
    queryKey: ["getShopOrderDetailApi"],
    queryFn: () => getShopOrderDetailApi(),
    ...props,
  });

  return query;
};
