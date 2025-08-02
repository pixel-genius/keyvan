import Typography from "@/components/components/atoms/typography";
import Image from "next/image";
import Link from "next/link";

const CardItem = ({
  icon,
  label,
  link,
}: {
  icon: React.ReactNode | string;
  label: string;
  link?: string;
}) => {
  return (
    <Link href={link || ""}>
      <div className="flex flex-col items-center">
        <div className="bg-card p-4 rounded-xl shadow-lg  flex items-center justify-center">
          {typeof icon === "string" ? (
            <Image
              src={icon}
              alt={label}
              width={24}
              height={24}
              unoptimized
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
            />
          ) : (
            icon
          )}
        </div>
        <Typography
          variant="label/xs"
          weight="normal"
          className="text-center pt-4"
        >
          {label}
        </Typography>
      </div>
    </Link>
  );
};

export default CardItem;
