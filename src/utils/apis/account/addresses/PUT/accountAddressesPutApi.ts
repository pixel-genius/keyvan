import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface AccountAddressPutApiPayload {
  id?: number;
  text?: string;
  title?: string;
  address_details?: string;
  latitude?: string;
  longitude?: string;
  is_default?: boolean;
}

export type AccountAddressPutApiResponse = {
  id: number;
  title: string;
  latitude: string;
  longitude: string;
  text: string;
  is_default: boolean;
}[];

// PUT API function
const putAccountAddressApi = async (
  payload: Partial<AccountAddressPutApiPayload>,
): Promise<AccountAddressPutApiResponse> => {
  const { id, ...restPayload } = payload;
  const response = await coreApi.put(
    path.join(`/account/addresses/${id}/`),
    restPayload, // PUT body
  );
  return response.data;
};

// useMutation Hook with proper types
export const usePutAccountAddress = (
  options?: UseMutationOptions<
    AccountAddressPutApiResponse,
    unknown,
    Partial<AccountAddressPutApiPayload>
  >,
) => {
  return useMutation<
    AccountAddressPutApiResponse,
    unknown,
    Partial<AccountAddressPutApiPayload>
  >({
    mutationFn: putAccountAddressApi,
    mutationKey: ["putAccountAddressApi"],
    ...options,
  });
};
