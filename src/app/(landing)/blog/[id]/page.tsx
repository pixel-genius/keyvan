import { notFound } from "next/navigation";
import Image from "next/image";

// ماک دیتا مشابه صفحه لیست
const blogPosts = [
  {
    id: "1",
    title: "اولین پست بلاگ",
    content: `این متن کامل اولین پست بلاگ است.\n\nلورم ایپسوم متن ساختگی برای تست است.`,
    date: "1403/04/15",
    image: "",
  },
  {
    id: "2",
    title: "دومین پست بلاگ",
    content: `این متن کامل دومین پست بلاگ است.\n\nتوضیحات بیشتر درباره این پست.`,
    date: "1403/04/16",
    image: "",
  },
];

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return notFound();

  return (
    <main className="max-w-2xl mx-auto pt-28 px-4" dir="rtl">
      {post.image ? (
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      ) : (
        <div className="w-full h-64 flex items-center justify-center bg-gray-200 text-gray-400 rounded-lg mb-6 text-lg">
          تصویر
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <span className="text-xs text-gray-400 mb-6 block">{post.date}</span>
      <article className="prose prose-lg rtl text-right">
        {post.content.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </article>
    </main>
  );
}
