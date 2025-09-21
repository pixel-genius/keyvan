import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface AccountAddressDeleteApiPayload {
  id: number | string;
}

export type AccountAddressDeleteApiResponse = {
  id: number;
  title: string;
  latitude: string;
  longitude: string;
  text: string;
  is_default: boolean;
}[];

// DELETE API function
const deleteAccountAddressApi = async (
  payload: Partial<AccountAddressDeleteApiPayload>,
): Promise<AccountAddressDeleteApiResponse> => {
  const { id } = payload;
  const response = await coreApi.delete(path.join(`/account/addresses/${id}/`));
  return response.data;
};

// useMutation Hook with proper types
export const useDeleteAccountAddress = (
  options?: UseMutationOptions<
    AccountAddressDeleteApiResponse,
    unknown,
    AccountAddressDeleteApiPayload
  >,
) => {
  return useMutation<
    AccountAddressDeleteApiResponse,
    unknown,
    AccountAddressDeleteApiPayload
  >({
    mutationFn: deleteAccountAddressApi,
    mutationKey: ["deleteAccountAddressApi"],
    ...options,
  });
};
