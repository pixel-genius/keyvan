import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ShopCartApiResponse } from "../../GET/shopCartGetApi";
import { coreApi } from "@/utils/service/instance";
import path from "path";

// DELETE API function
const deleteShopCartClearApi = async (): Promise<ShopCartApiResponse> => {
  const response = await coreApi.delete(path.join("/shop/cart/clear/"));
  return response.data;
};

// useMutation Hook with proper types
export const useDeleteShopCartClearApi = (
  options?: UseMutationOptions<ShopCartApiResponse, unknown, unknown>,
) => {
  return useMutation<ShopCartApiResponse, unknown, unknown>({
    mutationFn: deleteShopCartClearApi,
    mutationKey: ["deleteShopCartClearApi"],
    ...options,
  });
};
