import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface AccountAuthOtpLoginPostApiPayload {
  otp_code: string;
  phone_number: string;
}

export type AccountAuthOtpLoginPostApiResponse = {
  otp_code: string;
  phone_number: string;
}[];

// POST API function
const postAccountAuthOtpLoginApi = async (
  payload: AccountAuthOtpLoginPostApiPayload,
): Promise<AccountAuthOtpLoginPostApiResponse> => {
  const response = await coreApi.post(
    path.join("/account/auth/otp-login/"),
    payload, // POST body
  );
  return response.data;
};

// useMutation Hook with proper types
export const usePostAccountAuthOtpLoginApi = (
  options?: UseMutationOptions<
    AccountAuthOtpLoginPostApiResponse,
    unknown,
    AccountAuthOtpLoginPostApiPayload
  >,
) => {
  return useMutation<
    AccountAuthOtpLoginPostApiResponse,
    unknown,
    AccountAuthOtpLoginPostApiPayload
  >({
    mutationFn: postAccountAuthOtpLoginApi,
    mutationKey: ["postAccountAuthOtpLoginApi"],
    ...options,
  });
};
