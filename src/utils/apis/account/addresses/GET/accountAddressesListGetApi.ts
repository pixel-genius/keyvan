import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export type AccountAddressesList = {
  id: number;
  title: string;
  text: string;
  latitude: string;
  longitude: string;
  address: string;
  is_default: boolean;
}[];

interface AccountAddressesListApiResponse {
  count: number;
  data: AccountAddressesList;
  success: boolean;
}

const getAccountAddressListApi =
  async (): Promise<AccountAddressesListApiResponse> => {
    const response = await coreApi.get(path.join("/account/addresses/"));
    return response.data;
  };

export const useGetAccountAddressList = (
  props?: Partial<
    UseQueryOptions<
      AccountAddressesListApiResponse,
      unknown,
      AccountAddressesListApiResponse,
      QueryKey
    >
  >,
) => {
  const { ...restProps } = props || {};
  const query = useQuery({
    queryKey: ["getAccountAddressesList"],
    queryFn: () => getAccountAddressListApi(),
    ...restProps,
  });

  return query;
};
