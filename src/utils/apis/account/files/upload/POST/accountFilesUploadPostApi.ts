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
  file: string;
  original_filename: string;
  extension: string;
  size: number;
  created_at: string;
  category: string;
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
  options?: UseMutationOptions<
    AccountFilesUploadPostApiResponse,
    unknown,
    AccountFilesUploadPostApiRequest
  >,
) => {
  return useMutation<
    AccountFilesUploadPostApiResponse,
    unknown,
    AccountFilesUploadPostApiRequest
  >({
    mutationKey: ["accountFilesUploadPost"],
    mutationFn: accountFilesUploadPostApi,
    ...options,
  });
};
