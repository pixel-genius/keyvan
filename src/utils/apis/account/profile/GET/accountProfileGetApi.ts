import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

type AccountProfileGetApiResponse = {
  id: number;
  title: string;
  lat: string;
  long: string;
  address: string;
  is_default: boolean;
}[];

const getAccountProfileApi =
  async (): Promise<AccountProfileGetApiResponse> => {
    const response = await coreApi.get(path.join("/account/profile/"));

    return response.data;
  };

export const useGetAccountProfileGetApi = (
  props?: Partial<
    DefinedInitialDataOptions<
      AccountProfileGetApiResponse,
      unknown,
      AccountProfileGetApiResponse,
      QueryKey
    >
  >,
) => {
  const { ...restProps } = props || {};
  const query = useQuery({
    queryKey: ["getAccountProfileApi"],
    queryFn: () => getAccountProfileApi(),
    ...restProps,
  });

  return query;
};
