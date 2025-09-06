import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ShopCartApiResponse } from "../../GET/shopCartGetApi";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface ShopCartAddPostApiPayload {
  product_id: number;
  quantity: number;
}

// POST API function
const postShopCartAddApi = async (
  payload: ShopCartAddPostApiPayload,
): Promise<ShopCartApiResponse> => {
  const response = await coreApi.post(
    path.join("/shop/cart/add/"),
    payload, // POST body
  );
  return response.data;
};

// useMutation Hook with proper types
export const usePostShopCartAddApi = (
  options?: UseMutationOptions<
    ShopCartApiResponse,
    unknown,
    ShopCartAddPostApiPayload
  >,
) => {
  return useMutation<ShopCartApiResponse, unknown, ShopCartAddPostApiPayload>({
    mutationFn: postShopCartAddApi,
    mutationKey: ["postShopCartAddApi"],
    ...options,
  });
};
