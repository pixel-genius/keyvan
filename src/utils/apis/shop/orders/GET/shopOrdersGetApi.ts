import { ShopOrderDetailApiResponse } from "../[id]/GET/shopOrderDetailGetApi";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

const getShopOrdersApi = async (): Promise<ShopOrderDetailApiResponse[]> => {
  const response = await coreApi.get(path.join("/shop/orders/"));

  return response.data;
};

export const useGetShopOrdersApi = (
  props?: Partial<
    UseQueryOptions<
      ShopOrderDetailApiResponse[],
      unknown,
      ShopOrderDetailApiResponse[],
      QueryKey
    >
  >,
) => {
  const query = useQuery({
    queryKey: ["getShopOrdersApi"],
    queryFn: () => getShopOrdersApi(),
    ...props,
  });

  return query;
};
