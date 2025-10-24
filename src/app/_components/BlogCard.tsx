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
        className="bg-white rounded  overflow-hidden w-full  mx-auto  transition-shadow cursor-pointer"
        dir="rtl"
      >
        <div className="relative w-full h-48">
          {image ? (
            <Image
              src={image || "/img/sigar.png"}
              alt={title || ""}
              fill
              className="object-cover w-full h-full rounded"
              style={{ objectFit: "cover" }}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
              تصویر
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center mb-1">
            <span className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">
              {created_at
                ? new Date(created_at).toLocaleDateString("fa-IR")
                : ""}
            </span>
            <span className="text-xs text-gray-500">{author_name}</span>
          </div>
          <Typography
            variant="label/md"
            weight="bold"
            className="text-right text-lg leading-tight mb-1 text-zinc-900"
          >
            {title}
          </Typography>
          <Typography
            variant="label/xs"
            weight="normal"
            className="text-right text-gray-500 leading-relaxed"
          >
            {truncateText(content || "", 100)}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
