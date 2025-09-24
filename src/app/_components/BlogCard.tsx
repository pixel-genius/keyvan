import Typography from "@/components/components/atoms/typography";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  id: number;
  slug: string | null;
  image: string | null;
  title: string | null;
  content: string | null;
  created_at: string | null;
  author_name: string;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  image,
  title,
  content,
  created_at,
  author_name,
}) => {
  return (
    <Link href={`/blogs/${id}`}>
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md dark:shadow-zinc-800 overflow-hidden w-full max-w-md mx-auto hover:shadow-lg transition-shadow cursor-pointer"
        dir="rtl"
      >
        <div className="relative w-full h-48">
          {image ? (
            <Image
              src={image || "/img/sigar.png"}
              alt={title || ""}
              fill
              className="object-cover w-full h-full rounded-t-2xl"
              style={{ objectFit: "cover" }}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
              تصویر
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center mb-1">
            <span className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full">
              {created_at
                ? new Date(created_at).toLocaleDateString("fa-IR")
                : ""}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {author_name}
            </span>
          </div>
          <Typography
            variant="label/md"
            weight="bold"
            className="text-right text-lg leading-tight mb-1 text-zinc-900 dark:text-zinc-100"
          >
            {title}
          </Typography>
          <Typography
            variant="label/xs"
            weight="normal"
            className="text-right text-gray-500 dark:text-gray-300 leading-relaxed"
          >
            {truncateText(content || "", 100)}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
