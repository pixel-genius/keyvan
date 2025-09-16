import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export interface BlogPostsDetailApiResponse {
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

const getBlogPostsDetailApi = async (
  id: string,
): Promise<BlogPostsDetailApiResponse> => {
  // Use only ID-based endpoints with trailing slash
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://admin.tanbaku.com";
  const possibleUrls = [
    `${baseUrl}/blog/posts/${id}/`,
    `http://admin.tanbaku.com/blog/posts/${id}/`,
    `https://admin.tanbaku.com/blog/posts/${id}/`,
  ];

  console.log("Trying to fetch blog post with ID:", id);
  console.log("Base URL:", baseUrl);

  for (const url of possibleUrls) {
    try {
      console.log("Trying URL:", url);
      const response = await axios.get(url);
      console.log("Success with URL:", url);
      console.log("Response data:", response.data);
      return response.data;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.log("Failed with URL:", url, "Error:", errorMessage);
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { status?: number; data?: unknown };
        };
        console.log("Error status:", axiosError.response?.status);
        console.log("Error data:", axiosError.response?.data);
      }
      continue;
    }
  }

  throw new Error(`Could not fetch blog post with ID: ${id}`);
};

export const useGetBlogPostsDetail = (
  props?: { slug: string } & Partial<
    UseQueryOptions<
      BlogPostsDetailApiResponse,
      unknown,
      BlogPostsDetailApiResponse,
      QueryKey
    >
  >,
) => {
  const { slug, ...restProps } = props || {};
  const query = useQuery({
    queryKey: ["getBlogPostsDetail", slug],
    queryFn: () => getBlogPostsDetailApi(slug || ""),
    ...restProps,
  });

  return query;
};
