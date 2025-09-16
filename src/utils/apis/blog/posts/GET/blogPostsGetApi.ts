import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { coreApi } from "@/utils/service/instance";

export interface BlogPostsApiResponse {
  id: number;
  author: number;
  author_name: string;
  title: string | null;
  slug: string | null;
  content: string | null;
  image: string | null;
  is_published: boolean;
  created_at: string | null;
  updated_at: string | null;
}

const getBlogPostsApi = async (): Promise<BlogPostsApiResponse[]> => {
  const response = await coreApi.get("/blog/posts/");
  return response.data;
};

export const useGetBlogPosts = (
  props?: Partial<
    UseQueryOptions<
      BlogPostsApiResponse[],
      unknown,
      BlogPostsApiResponse[],
      QueryKey
    >
  >,
) => {
  const query = useQuery({
    queryKey: ["getBlogPosts"],
    queryFn: () => getBlogPostsApi(),
    ...props,
  });

  return query;
};
