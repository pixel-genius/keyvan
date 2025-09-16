import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import { AxiosError } from "axios";
import path from "path";

export interface AccountAuthOtpLoginPostApiPayload {
  otp_code: string;
  phone_number: string;
}

export type AccountAuthOtpLoginPostApiResponse = {
  message: string;
  phone_number: string;
  token: string;
  user_id: number;
  is_verified: boolean;
};

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
    AxiosError<{
      is_verified: boolean;
    }>,
    AccountAuthOtpLoginPostApiPayload
  >,
) => {
  return useMutation<
    AccountAuthOtpLoginPostApiResponse,
    AxiosError<{
      is_verified: boolean;
    }>,
    AccountAuthOtpLoginPostApiPayload
  >({
    mutationFn: postAccountAuthOtpLoginApi,
    mutationKey: ["postAccountAuthOtpLoginApi"],
    ...options,
  });
};
