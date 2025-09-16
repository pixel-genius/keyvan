import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import { AxiosError } from "axios";
import path from "path";

export interface AccountAuthRegisterPutApiPayload {
  user_id: number;
  first_name: string;
  last_name: string;
}

export interface AccountAuthRegisterPutApiResponse {
  message: string;
  phone_number: string;
  success: boolean;
  user_id: number;
}

// PUT API function
const putAccountAuthRegisterApi = async (
  payload: AccountAuthRegisterPutApiPayload,
): Promise<AccountAuthRegisterPutApiResponse> => {
  const response = await coreApi.put(
    path.join("/account/auth/register/"),
    payload, // POST body
  );
  return response.data;
};

// useMutation Hook with proper types
export const usePutAccountAuthRegister = (
  options?: UseMutationOptions<
    AccountAuthRegisterPutApiResponse,
    AxiosError<{
      details: string;
      message: string;
      success: boolean;
    }>,
    AccountAuthRegisterPutApiPayload
  >,
) => {
  return useMutation<
    AccountAuthRegisterPutApiResponse,
    AxiosError<{
      details: string;
      message: string;
      success: boolean;
    }>,
    AccountAuthRegisterPutApiPayload
  >({
    mutationFn: putAccountAuthRegisterApi,
    mutationKey: ["putAccountAuthRegisterApi"],
    ...options,
  });
};
