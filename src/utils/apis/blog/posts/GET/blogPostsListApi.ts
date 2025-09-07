import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";
import path from "path";

interface BlogPostsListApiParams {
  search?: string;
}

export interface BlogPostsListApiResponse {
  id: number;
  author: number;
  author_name: string;
  title: string | null;
  slug: string | null;
  content: string | null;
  image: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const getBlogPostsListApi = async (
  params: BlogPostsListApiParams,
): Promise<BlogPostsListApiResponse[]> => {
  const response = await coreApi.get(path.join(`/blog/posts/`), {
    params,
  });
  return response.data;
};

export const useGetBlogPostsList = (
  props?: { params: BlogPostsListApiParams } & Partial<
    UseQueryOptions<
      BlogPostsListApiResponse[],
      unknown,
      BlogPostsListApiResponse[],
      QueryKey
    >
  >,
) => {
  const { params, ...restProps } = props || {};
  const query = useQuery({
    queryKey: ["getBlogPostsList", params],
    queryFn: () => getBlogPostsListApi(params ?? {}),
    ...restProps,
  });

  return query;
};
