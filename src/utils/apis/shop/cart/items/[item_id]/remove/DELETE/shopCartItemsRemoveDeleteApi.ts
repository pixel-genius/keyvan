import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ShopCartApiResponse } from "../../../../GET/shopCartGetApi";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface shopCartItemsRemoveDeleteApiPayload {
  national_code: string;
  phone_number: string;
}

// DELETE API function
const deleteShopCartItemsRemoveApi = async (
  itemId: shopCartItemsRemoveDeleteApiPayload,
): Promise<ShopCartApiResponse> => {
  const response = await coreApi.delete(
    path.join(`/shop/cart/items/${itemId}/remove/`),
  );
  return response.data;
};

// useMutation Hook with proper types
export const useDeleteShopCartItemsRemoveApi = (
  options?: UseMutationOptions<
    ShopCartApiResponse,
    unknown,
    shopCartItemsRemoveDeleteApiPayload
  >,
) => {
  return useMutation<
    ShopCartApiResponse,
    unknown,
    shopCartItemsRemoveDeleteApiPayload
  >({
    mutationFn: deleteShopCartItemsRemoveApi,
    mutationKey: ["deleteShopCartItemsRemoveApi"],
    ...options,
  });
};
