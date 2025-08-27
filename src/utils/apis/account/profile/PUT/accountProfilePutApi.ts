import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface AccountProfilePutApiPayload {
  title: string;
  text: string;
  latitude: string;
  longitude: string;
  is_default: boolean;
}

export type AccountProfilePutApiResponse = {
  id: number;
  title: string;
  latitude: string;
  longitude: string;
  text: string;
  is_default: boolean;
}[];

// POST API function
const putAccountProfileApi = async (
  payload: AccountProfilePutApiPayload,
): Promise<AccountProfilePutApiResponse> => {
  const response = await coreApi.put(
    path.join("/account/profile/"),
    payload, // PUT body
  );
  return response.data;
};

// useMutation Hook with proper types
export const usePutAccountProfileApi = (
  options?: UseMutationOptions<
    AccountProfilePutApiResponse,
    unknown,
    AccountProfilePutApiPayload
  >,
) => {
  return useMutation<
    AccountProfilePutApiResponse,
    unknown,
    AccountProfilePutApiPayload
  >({
    mutationFn: putAccountProfileApi,
    mutationKey: ["putAccountProfileApi"],
    ...options,
  });
};
