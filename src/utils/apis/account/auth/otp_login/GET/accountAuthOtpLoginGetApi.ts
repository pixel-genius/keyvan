import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
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
  props?: { params: AccountAuthOtpLoginGetApiParams } & Partial<
    DefinedInitialDataOptions<unknown, unknown, unknown, QueryKey>
  >,
) => {
  const { params, ...restProps } = props || {};
  const query = useQuery({
    queryKey: ["getAccountAddressesList", params],
    queryFn: () =>
      getAccountAuthOtpLoginApi(params as AccountAuthOtpLoginGetApiParams),
    ...restProps,
  });

  return query;
};
