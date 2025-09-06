import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

type AccountAddressesListApiResponse = {
  id: number;
  title: string;
  lat: string;
  long: string;
  address: string;
  is_default: boolean;
}[];

const getAccountAddressListApi =
  async (): Promise<AccountAddressesListApiResponse> => {
    const response = await coreApi.get(path.join("/account/addresses/"));

    return response.data;
  };

export const useGetAccountAddressList = (
  props?: Partial<
    DefinedInitialDataOptions<
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
