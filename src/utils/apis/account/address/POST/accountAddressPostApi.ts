import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface AccountAddressPostApiPayload {
  user_id: number;
  title: string;
  address: string;
  lat: string;
  long: string;
  is_default: boolean;
}

export type AccountAddressPostApiResponse = {
  id: number;
  lat: string;
  title: string;
  long: string;
  address: string;
  is_default: boolean;
}[];

// POST API function
const postAccountAddressApi = async (
  payload: AccountAddressPostApiPayload,
): Promise<AccountAddressPostApiResponse> => {
  const response = await coreApi.post(
    path.join("/account/address/"),
    payload, // POST body
  );
  return response.data;
};

// useMutation Hook with proper types
export const usePostAccountAddress = (
  options?: UseMutationOptions<
    AccountAddressPostApiResponse,
    unknown,
    AccountAddressPostApiPayload
  >,
) => {
  return useMutation<
    AccountAddressPostApiResponse,
    unknown,
    AccountAddressPostApiPayload
  >({
    mutationFn: postAccountAddressApi,
    mutationKey: ["postAccountAddressApi"],
    ...options,
  });
};
