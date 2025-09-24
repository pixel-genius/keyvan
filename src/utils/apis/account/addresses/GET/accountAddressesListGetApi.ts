import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export type AccountAddressesObj = {
  id: number;
  title: string;
  text: string;
  address_details?: string;
  latitude: string;
  longitude: string;
  address: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};
interface AccountAddressesListApiResponse {
  count: number;
  data: AccountAddressesObj[];
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
