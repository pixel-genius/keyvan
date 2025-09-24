import { ShopOrderDetailApiResponse } from "../../[id]/GET/shopOrderDetailGetApi";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import { AxiosError } from "axios";
import path from "path";

export interface ShopOrderCreatePostApiPayload {
  notes: string;
  address_id: number;
}

// POST API function
const postShopOrderCreateApi = async (
  payload: ShopOrderCreatePostApiPayload,
): Promise<ShopOrderDetailApiResponse> => {
  const response = await coreApi.post(
    path.join("/shop/orders/create/"),
    payload, // POST body
  );
  return response.data;
};

// useMutation Hook with proper types
export const usePostShopOrderCreateApi = (
  options?: UseMutationOptions<
    ShopOrderDetailApiResponse,
    AxiosError,
    ShopOrderCreatePostApiPayload
  >,
) => {
  return useMutation<
    ShopOrderDetailApiResponse,
    AxiosError,
    ShopOrderCreatePostApiPayload
  >({
    mutationFn: postShopOrderCreateApi,
    mutationKey: ["postShopOrderCreateApi"],
    ...options,
  });
};
