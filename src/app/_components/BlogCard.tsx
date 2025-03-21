import Typography from "@/components/ui/typography";
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

const BlogCard: React.FC<BlogCardProps> = ({ image, title, description, date }) => {
  return (
    <div className="overflow-hidden">
      <Image src={image} alt={title} width={400} height={250} className="w-full h-56 object-cover" />
      <div className="p-4">
        <Typography variant="label/md" weight="bold" className="text-right pb-2">{title}</Typography>
        <Typography variant="label/xs" weight="normal" className="text-right text-gray-400">{truncateText(description, 100)}</Typography>
        <Typography variant="label/xs" weight="normal" className="text-right text-gray-600 py-2">{date}</Typography>
      </div>
    </div>
  );
};

export default BlogCard;
