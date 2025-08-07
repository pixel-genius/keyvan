import Typography from "@/components/components/atoms/typography";
import Image from "next/image";

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  date: string;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  description,
  date,
}) => {
  return (
    <div
      className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md dark:shadow-zinc-800 overflow-hidden w-full max-w-md mx-auto"
      dir="rlt"
    >
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover w-full h-full rounded-t-2xl"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <span className="self-end bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 text-xs px-3 py-1 rounded-full mb-1">
          {date}
        </span>
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
          {truncateText(description, 100)}
        </Typography>
      </div>
    </div>
  );
};

export default BlogCard;
