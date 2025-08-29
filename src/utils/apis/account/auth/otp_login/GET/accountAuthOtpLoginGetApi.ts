import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import { AxiosError } from "axios";
import path from "path";

export interface AccountAuthOtpLoginGetApiParams {
  phone_number: string;
}

// POST API function
const getAccountAuthOtpLoginApi = async (
  params: AccountAuthOtpLoginGetApiParams,
): Promise<unknown> => {
  const response = await coreApi.get(path.join("/account/auth/otp-login/"), {
    params,
  });
  return response.data;
};

// useMutation Hook with proper types
export const useGetAccountAuthOtpLoginApi = (
  options?: UseMutationOptions<
    unknown,
    AxiosError<{ error: string }>,
    AccountAuthOtpLoginGetApiParams
  >,
) => {
  return useMutation<
    unknown,
    AxiosError<{ error: string }>,
    AccountAuthOtpLoginGetApiParams
  >({
    mutationFn: getAccountAuthOtpLoginApi,
    mutationKey: ["getAccountAuthOtpLoginApi"],
    ...options,
  });
};
