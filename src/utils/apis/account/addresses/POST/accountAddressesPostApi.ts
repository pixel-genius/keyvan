import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface AccountAddressesPostApiPayload {
  title?: string;
  text: string;
  latitude: string;
  longitude: string;
  is_default: boolean;
}

export type AccountAddressesPostApiResponse = {
  id: number;
  title: string | null;
  latitude: string;
  longitude: string;
  text: string;
  is_default: boolean;
}[];

// POST API function
const postAccountAddressApi = async (
  payload: AccountAddressesPostApiPayload,
): Promise<AccountAddressesPostApiResponse> => {
  const response = await coreApi.post(
    path.join("/account/addresses/"),
    payload, // POST body
  );
  return response.data;
};

// useMutation Hook with proper types
export const usePostAccountAddress = (
  options?: UseMutationOptions<
    AccountAddressesPostApiResponse,
    unknown,
    AccountAddressesPostApiPayload
  >,
) => {
  return useMutation<
    AccountAddressesPostApiResponse,
    unknown,
    AccountAddressesPostApiPayload
  >({
    mutationFn: postAccountAddressApi,
    mutationKey: ["postAccountAddressApi"],
    ...options,
  });
};
