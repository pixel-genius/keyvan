import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface AccountAddressPatchApiPayload {
  text: string;
  title: string;
  latitude: string;
  longitude: string;
  is_default: boolean;
}

export type AccountAddressPatchApiResponse = {
  id: number;
  title: string;
  latitude: string;
  longitude: string;
  text: string;
  is_default: boolean;
}[];

// POST API function
const patchAccountAddressApi = async (
  payload: Partial<AccountAddressPatchApiPayload>,
): Promise<AccountAddressPatchApiResponse> => {
  const response = await coreApi.patch(
    path.join("/account/addresses/"),
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
