import { coreApi } from "@/utils/service/instance";
import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import path from "path";

interface BlogPostsListApiParams {
  search?: string;
}

interface BlogPostsListApiResponse {
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

const getBlogPostsListApi = async (
  params: BlogPostsListApiParams
): Promise<BlogPostsListApiResponse> => {
  const response = await coreApi.get(path.join(`/blog/posts/`), {
    params,
  });
  return response.data;
};

export const UseGetBlogPostsList = (
  props?: { params: BlogPostsListApiParams } & Partial<
    DefinedInitialDataOptions<
      BlogPostsListApiResponse,
      unknown,
      BlogPostsListApiResponse,
      QueryKey
    >
  >
) => {
  const { params, ...restProps } = props || {};
  const query = useQuery({
    queryKey: ["getBlogPostsList", params],
    queryFn: () => getBlogPostsListApi(params ?? {}),
    ...restProps,
  });

  return query;
};
