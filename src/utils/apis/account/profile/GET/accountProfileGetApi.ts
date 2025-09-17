import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

export type AccountProfileGetApiResponse = {
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  user_id?: number;
  email?: string | null;
  date_of_birth?: string | null;
  phone_number?: string | null;
  national_code?: string | null;
  address?: string;
  bio?: string;
  created_at?: string;
  certificate?: {
    id: number;
    file: string;
    original_filename: string;
    size: number;
    created_at: string;
  };
  license?: {
    id: number;
    file: string;
    original_filename: string;
    size: number;
    created_at: string;
  };
};

const getAccountProfileApi =
  async (): Promise<AccountProfileGetApiResponse> => {
    const response = await coreApi.get(path.join("/account/profile/"));

    return response.data;
  };

export const useGetAccountProfileGetApi = (
  props?: Partial<
    UseQueryOptions<
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
