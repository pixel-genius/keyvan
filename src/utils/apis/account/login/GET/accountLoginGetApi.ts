import { coreApi } from "@/utils/service/instance";
import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import path from "path";

interface AccountLoginGETApiParams {
  phone_number: string;
  national_code: string;
}

interface AccountLoginGETApiResponse {
  token: string;
}

const accountLoginGETApi = async (
  params: AccountLoginGETApiParams
): Promise<AccountLoginGETApiResponse> => {
  const response = await coreApi.get(path.join(`/account/login/`), {
    params,
  });
  return response.data;
};

export const UseAccountLoginGET = (
  props?: { params: AccountLoginGETApiParams } & Partial<
    DefinedInitialDataOptions<
      AccountLoginGETApiResponse,
      unknown,
      AccountLoginGETApiResponse,
      QueryKey
    >
  >
) => {
  const { params, ...restProps } = props || {};
  const query = useQuery({
    queryKey: ["accountLoginGET", params],
    queryFn: () => accountLoginGETApi(params as AccountLoginGETApiParams),
    ...restProps,
  });

  return query;
};
