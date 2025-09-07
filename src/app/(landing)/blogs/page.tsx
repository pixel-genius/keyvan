import Image from "next/image";
import Link from "next/link";

// ماک دیتا
const blogPosts = [
  {
    id: "1",
    title: "اولین پست بلاگ",
    summary: "این یک خلاصه کوتاه از اولین پست بلاگ است.",
    date: "1403/04/15",
    image: "",
  },
  {
    id: "2",
    title: "دومین پست بلاگ",
    summary: "این یک خلاصه کوتاه از دومین پست بلاگ است.",
    date: "1403/04/16",
    image: "",
  },
];

export default function Page() {
  return (
    <main className="max-w-2xl mx-auto pt-28 px-4" dir="rtl">
      <h1 className="text-3xl font-bold mb-8">اخبار دخانیات</h1>
      <ul className="space-y-6">
        {blogPosts.map((post) => (
          <li
            key={post.id}
            className="border rounded-lg p-4 hover:shadow flex gap-4 items-center"
          >
            <Link
              href={`/blog/${post.id}`}
              className="flex items-center gap-4 w-full"
            >
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
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
                <p className="text-gray-300 mb-1">{post.summary}</p>
                <p className="text-xs text-gray-400">{post.date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
