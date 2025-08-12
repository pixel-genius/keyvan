import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export interface AccountAddressListApiParams {
  user_id: number;
}

type AccountAddressListApiResponse = {
  id: number;
  title: string;
  lat: string;
  long: string;
  address: string;
  is_default: boolean;
}[];

const getAccountAddressListApi = async (
  params: AccountAddressListApiParams,
): Promise<AccountAddressListApiResponse> => {
  const response = await coreApi.get(path.join("/account/address/"), {
    params,
  });

  return response.data;
};

export const useGetAccountAddressList = (
  props?: { params: AccountAddressListApiParams } & Partial<
    DefinedInitialDataOptions<
      AccountAddressListApiResponse,
      unknown,
      AccountAddressListApiResponse,
      QueryKey
    >
  >,
) => {
  const { params, ...restProps } = props || {};
  const query = useQuery({
    queryKey: ["getAccountAddressList", params],
    queryFn: () =>
      getAccountAddressListApi(params as AccountAddressListApiParams),
    ...restProps,
  });

  return query;
};
