import { AccountProfileGetApiResponse } from "../GET/accountProfileGetApi";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface AccountProfilePutApiPayload {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  national_code?: string;
  username?: string;
  date_of_birth?: string;
  address?: string;
  bio?: string;
  certificate_file?: number;
  license_file?: number;
}

export type AccountProfilePutApiResponse = AccountProfileGetApiResponse;

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
