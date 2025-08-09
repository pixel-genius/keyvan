import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

interface AccountLoginPostApiRequest {
  phone_number: string;
  national_code: string;
}

interface AccountLoginPostApiResponse {
  id: number;
  author: number;
  author_name: string;
  title: string | null;
  slug: string | null;
  content: string | null;
  image: URL | string | null;
  is_published: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

const accountLoginPostApi = async (
  body: AccountLoginPostApiRequest,
): Promise<AccountLoginPostApiResponse> => {
  const response = await coreApi.post(path.join(`/account/login/`), {
    body,
  });
  return response.data;
};

export const useAccountLoginPost = (
  props?: { body: AccountLoginPostApiRequest } & Partial<
    UseMutationOptions<
      AccountLoginPostApiResponse,
      unknown,
      AccountLoginPostApiRequest,
      unknown
    >
  >,
) => {
  const { body, ...restProps } = props || {};
  const query = useMutation({
    mutationKey: ["accountLoginPost", body],
    mutationFn: () => accountLoginPostApi(body as AccountLoginPostApiRequest),
    ...restProps,
  });

  return query;
};
