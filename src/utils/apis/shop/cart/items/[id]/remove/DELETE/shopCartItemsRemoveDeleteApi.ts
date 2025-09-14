import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ShopCartApiResponse } from "../../../../GET/shopCartGetApi";
import { coreApi } from "@/utils/service/instance";
import path from "path";

// DELETE API function
const deleteShopCartItemsRemoveApi = async (
  id: number,
): Promise<ShopCartApiResponse> => {
  const response = await coreApi.delete(
    path.join(`/shop/cart/items/${id}/remove/`),
  );
  return response.data;
};

// useMutation Hook with proper types
export const useDeleteShopCartItemsRemoveApi = (
  options?: UseMutationOptions<ShopCartApiResponse, unknown, number>,
) => {
  return useMutation<ShopCartApiResponse, unknown, number>({
    mutationFn: deleteShopCartItemsRemoveApi,
    mutationKey: ["deleteShopCartItemsRemoveApi"],
    ...options,
  });
};
