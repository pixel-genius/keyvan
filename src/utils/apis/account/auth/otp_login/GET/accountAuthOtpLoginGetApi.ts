import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import { AxiosError } from "axios";
import path from "path";

export interface AccountAuthOtpLoginGetApiParams {
  phone_number: string;
}

const getAccountAuthOtpLoginApi = async (
  params: AccountAuthOtpLoginGetApiParams,
): Promise<unknown> => {
  const response = await coreApi.get(path.join("/account/auth/otp-login/"), {
    params,
  });
  return response.data;
};

export const useGetAccountAuthOtpLoginApi = (
  options?: UseMutationOptions<
    unknown,
    AxiosError<{ has_account: boolean }>,
    AccountAuthOtpLoginGetApiParams
  >,
) => {
  return useMutation<
    unknown,
    AxiosError<{ has_account: boolean }>,
    AccountAuthOtpLoginGetApiParams
  >({
    mutationFn: getAccountAuthOtpLoginApi,
    mutationKey: ["getAccountAuthOtpLoginApi"],
    ...options,
  });
};
