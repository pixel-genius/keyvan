import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface ShopCartItemsPutApiPayload {
  slug: string;
  quantity: number;
}

export interface ShopCartItemsPutApiResponse {
  success: boolean;
  message: string;
  phone_number: string;
  national_code: string;
  otp_code: string;
  debug_note: string;
}

// PUT API function
const putShopCartItemsApi = async ({
  slug,
  ...payload
}: ShopCartItemsPutApiPayload): Promise<ShopCartItemsPutApiResponse> => {
  const response = await coreApi.put(
    path.join(`/shop/cart/items/${slug}/`),
    payload,
  );
  return response.data;
};

// Hook
export const usePutShopCartItemsApi = (
  options?: UseMutationOptions<
    ShopCartItemsPutApiResponse,
    unknown,
    ShopCartItemsPutApiPayload
  >,
) => {
  return useMutation<
    ShopCartItemsPutApiResponse,
    unknown,
    ShopCartItemsPutApiPayload
  >({
    mutationFn: putShopCartItemsApi,
    mutationKey: ["putShopCartItemsApi"],
    ...options,
  });
};
