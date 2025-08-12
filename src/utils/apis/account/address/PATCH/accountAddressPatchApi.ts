import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface AccountAddressPatchApiPayload {
  user_id: number;
  address: string;
  title: string;
  lat: string;
  long: string;
  is_default: boolean;
}

export type AccountAddressPatchApiResponse = {
  id: number;
  title: string;
  lat: string;
  long: string;
  address: string;
  is_default: boolean;
}[];

// POST API function
const patchAccountAddressApi = async (
  payload: Partial<AccountAddressPatchApiPayload>,
): Promise<AccountAddressPatchApiResponse> => {
  const response = await coreApi.patch(
    path.join("/account/address/"),
    payload, // POST body
  );
  return response.data;
};

// useMutation Hook with proper types
export const usePatchAccountAddress = (
  options?: UseMutationOptions<
    AccountAddressPatchApiResponse,
    unknown,
    Partial<AccountAddressPatchApiPayload>
  >,
) => {
  return useMutation<
    AccountAddressPatchApiResponse,
    unknown,
    Partial<AccountAddressPatchApiPayload>
  >({
    mutationFn: patchAccountAddressApi,
    mutationKey: ["postAccountAddressApi"],
    ...options,
  });
};
