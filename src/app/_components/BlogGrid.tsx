import { useGetBlogPosts } from "@/utils/apis/blog/posts/GET/blogPostsGetApi";
import BlogCard from "@/app/_components/BlogCard";
import { Suspense } from "react";

function BlogGridFn() {
  const { data: blogPosts, isLoading, error } = useGetBlogPosts();

  if (isLoading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">خطا در بارگذاری مطالب</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogPosts?.map((post) => (
        <BlogCard
          key={post.id}
          id={post.id}
          slug={post.slug}
          image={post.image}
          title={post.title}
          content={post.content}
          created_at={post.created_at}
          author_name={post.author_name}
        />
      ))}
    </div>
  );
}

export default function BlogGrid() {
  return (
    <Suspense
      fallback={<div className="text-center py-8">در حال بارگذاری...</div>}
    >
      <BlogGridFn />
    </Suspense>
  );
}
