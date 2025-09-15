import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import { AxiosError } from "axios";
import path from "path";

export interface AccountAuthRegisterPostApiPayload {
  national_code: string;
  phone_number: string;
}

export interface AccountAuthRegisterPostApiResponse {
  success: boolean;
  message: string;
  phone_number: string;
  national_code: string;
  otp_code: string;
  debug_note: string;
}

// POST API function
const postAccountAuthRegisterApi = async (
  payload: AccountAuthRegisterPostApiPayload,
): Promise<AccountAuthRegisterPostApiResponse> => {
  const response = await coreApi.post(
    path.join("/account/auth/register/"),
    payload, // POST body
  );
  return response.data;
};

// useMutation Hook with proper types
export const usePostAccountAuthRegister = (
  options?: UseMutationOptions<
    AccountAuthRegisterPostApiResponse,
    AxiosError<{
      details: string;
      message: string;
      success: boolean;
    }>,
    AccountAuthRegisterPostApiPayload
  >,
) => {
  return useMutation<
    AccountAuthRegisterPostApiResponse,
    AxiosError<{
      details: string;
      message: string;
      success: boolean;
    }>,
    AccountAuthRegisterPostApiPayload
  >({
    mutationFn: postAccountAuthRegisterApi,
    mutationKey: ["postAccountAuthRegisterApi"],
    ...options,
  });
};
