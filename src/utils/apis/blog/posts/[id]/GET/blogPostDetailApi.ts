import { coreApi } from "@/utils/service/instance";
import {
  DefinedInitialDataOptions,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import path from "path";

interface BlogPostsDetailApiResponse {
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

const getBlogPostsDetailApi = async (
  slug: string
): Promise<BlogPostsDetailApiResponse> => {
  const response = await coreApi.get(path.join(`/blog/posts/${slug}`));
  return response.data;
};

export const UseGetBlogPostsDetail = (
  props?: { slug: string } & Partial<
    DefinedInitialDataOptions<
      BlogPostsDetailApiResponse,
      unknown,
      BlogPostsDetailApiResponse,
      QueryKey
    >
  >
) => {
  const { slug, ...restProps } = props || {};
  const query = useQuery({
    queryKey: ["getBlogPostsDetail", slug],
    queryFn: () => getBlogPostsDetailApi(slug || ""),
    ...restProps,
  });

  return query;
};
