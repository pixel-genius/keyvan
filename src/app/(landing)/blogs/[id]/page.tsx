"use client";
import { useGetBlogPostsDetail } from "@/utils/apis/blog/posts/[id]/GET/blogPostDetailApi";
import { IconChevronRight } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

function BlogDetailFn() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = useGetBlogPostsDetail({ slug: id });

  // Debug logging
  console.log("Blog ID from URL:", id);
  console.log("Post data:", post);
  console.log("Error:", error);

  if (isLoading) {
    return (
      <main className="max-w-2xl mx-auto pt-28 px-4" dir="rtl">
        <div className="text-center py-8">در حال بارگذاری...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-2xl mx-auto pt-28 px-4" dir="rtl">
        <div className="text-center py-8 text-red-500">
          خطا در بارگذاری مطلب:{" "}
          {error instanceof Error ? error.message : "خطای نامشخص"}
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="max-w-2xl mx-auto pt-28 px-4" dir="rtl">
        <div className="text-center py-8">مطلب مورد نظر یافت نشد</div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto py-4" dir="rtl">
      <Link
        href="/blogs"
        className="cursor-pointer p-2 rounded-full hover:bg-muted transition-colors"
      >
        <div className="flex gap-0.5 items-center pb-3.5">
          <IconChevronRight size={24} className="text-muted-foreground" />

          <span className="text-sm text-muted-foreground">بازگشت</span>
        </div>
      </Link>

      {post.image ? (
        <Image
          src={post.image || "/img/sigar.png"}
          alt={post.title || ""}
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-lg mb-6"
          unoptimized
        />
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-gray-200 text-gray-400 rounded-lg mb-6 text-lg">
          تصویر
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
        <span>
          {post.created_at
            ? new Date(post.created_at).toLocaleDateString("fa-IR")
            : ""}
        </span>
      </div>

      <article className="prose prose-lg rtl text-right">
        {post.content?.split("\n").map((line, i) => (
          <p key={i} className="mb-4">
            {line}
          </p>
        )) || null}
      </article>
    </main>
  );
}

export default function BlogDetail() {
  return (
    <Suspense
      fallback={<div className="text-center py-8">در حال بارگذاری...</div>}
    >
      <BlogDetailFn />
    </Suspense>
  );
}
