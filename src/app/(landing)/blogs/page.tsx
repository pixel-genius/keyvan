"use client";
import { useGetBlogPosts } from "@/utils/apis/blog/posts/GET/blogPostsGetApi";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

function BlogListFn() {
  const { data: blogPosts, isLoading, error } = useGetBlogPosts();

  if (isLoading) {
    return (
      <main className="max-w-2xl mx-auto pt-28 px-4" dir="rtl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">اخبار دخانیات</h1>
          <Link
            href="/"
            className="cursor-pointer p-2 rounded-full hover:bg-muted transition-colors"
          >
            <div className="flex gap-0.5 items-center">
              <IconChevronLeft size={24} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">بازگشت</span>
            </div>
          </Link>
        </div>
        <div className="text-center py-8">در حال بارگذاری...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-2xl mx-auto pt-28 px-4" dir="rtl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">اخبار دخانیات</h1>
          <Link
            href="/"
            className="cursor-pointer p-2 rounded-full hover:bg-muted transition-colors"
          >
            <div className="flex gap-0.5 items-center">
              <IconChevronRight size={24} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">بازگشت</span>
            </div>
          </Link>
        </div>
        <div className="text-center py-8 text-red-500">
          خطا در بارگذاری مطالب
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto pt-28 px-4" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">اخبار دخانیات</h1>
        <Link
          href="/"
          className="cursor-pointer p-2 rounded-full hover:bg-muted transition-colors"
        >
          <div className="flex gap-0.5 items-center">
            <span className="text-sm text-muted-foreground">بازگشت</span>
            <IconChevronLeft size={24} className="text-muted-foreground" />
          </div>
        </Link>
      </div>
      <ul className="space-y-6">
        {blogPosts?.map((post) => (
          <li
            key={post.id}
            className="border rounded-lg p-4 hover:shadow flex gap-4 items-center"
          >
            <Link
              href={`/blogs/${post.id}`}
              className="flex items-center gap-4 w-full"
            >
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title || ""}
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover rounded-md"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-200 text-gray-400 rounded-md text-xs">
                  تصویر
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-300 mb-1">
                  {truncateText(post.content || "", 150)}
                </p>
                <p className="text-xs text-gray-400">
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString("fa-IR")
                    : ""}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={<div className="text-center py-8">در حال بارگذاری...</div>}
    >
      <BlogListFn />
    </Suspense>
  );
}
