import { ShopOrderDetailApiResponse } from "../../[order_id]/GET/shopOrderDetailGetApi";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface ShopOrderCreatePostApiPayload {
  notes: string;
}

// POST API function
const postShopOrderCreateApi = async (
  payload: ShopOrderCreatePostApiPayload,
): Promise<ShopOrderDetailApiResponse> => {
  const response = await coreApi.post(
    path.join("/account/addresses/"),
    payload, // POST body
  );
  return response.data;
};

// useMutation Hook with proper types
export const usePostShopOrderCreateApi = (
  options?: UseMutationOptions<
    ShopOrderDetailApiResponse,
    unknown,
    ShopOrderCreatePostApiPayload
  >,
) => {
  return useMutation<
    ShopOrderDetailApiResponse,
    unknown,
    ShopOrderCreatePostApiPayload
  >({
    mutationFn: postShopOrderCreateApi,
    mutationKey: ["postShopOrderCreateApi"],
    ...options,
  });
};
