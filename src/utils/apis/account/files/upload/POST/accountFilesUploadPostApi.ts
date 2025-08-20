import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { UploadFileApiCategory } from "@/lib/types";
import { coreApi } from "@/utils/service/instance";
import path from "path";

interface AccountFilesUploadPostApiRequest {
  file: File;
  category: UploadFileApiCategory;
}

interface AccountFilesUploadPostApiResponse {
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

const accountFilesUploadPostApi = async (
  body: AccountFilesUploadPostApiRequest,
): Promise<AccountFilesUploadPostApiResponse> => {
  const { category, file } = body;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);

  const response = await coreApi.post(path.join(`/account/files/upload/`), {
    formData,
    headers: {
      "Content-type": "multipart/form-data",
    },
  });

  return response.data;
};

export const useAccountFilesUploadPost = (
  props?: { body: AccountFilesUploadPostApiRequest } & Partial<
    UseMutationOptions<
      AccountFilesUploadPostApiResponse,
      unknown,
      AccountFilesUploadPostApiRequest,
      unknown
    >
  >,
) => {
  const { body, ...restProps } = props || {};
  const query = useMutation({
    mutationKey: ["accountFilesUploadPost", body],
    mutationFn: () =>
      accountFilesUploadPostApi(body as AccountFilesUploadPostApiRequest),
    ...restProps,
  });

  return query;
};
