import Typography from "@/components/components/atoms/typography";
import Image from "next/image";

const CardItem = ({
  icon,
  label,
}: {
  icon: React.ReactNode | string;
  label: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-card p-4 rounded-xl shadow-lg  flex items-center justify-center">
        {typeof icon === "string" ? (
          <Image src={icon} alt={label} width={24} height={24} unoptimized />
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
  );
};

export default CardItem;
