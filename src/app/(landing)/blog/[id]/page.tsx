"use client";
import { useGetBlogPostsDetail } from "@/utils/apis/blog/posts/[id]/GET/blogPostDetailApi";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";

function BlogDetailFn() {
  const { id } = useParams<{ id: string }>();
  const post = useGetBlogPostsDetail({ slug: id });

  return (
    <main className="max-w-2xl mx-auto pt-28 px-4" dir="rtl">
      {post?.data?.image ? (
        <Image
          src={post.data?.image}
          alt={post.data?.title || ""}
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-gray-200 text-gray-400 rounded-lg mb-6 text-lg">
          تصویر
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{post?.data?.title || ""}</h1>

      <span className="text-xs text-gray-400 mb-6 block">
        {post?.data?.created_at
          ? new Date(post?.data?.created_at).toLocaleDateString("fa-IR")
          : ""}
      </span>
      <article className="prose prose-lg rtl text-right">
        {post?.data?.content
          ?.split("\n")
          .map((line, i) => <p key={i}>{line}</p>) || null}
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
