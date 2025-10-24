"use client";

import Typography from "@/components/components/atoms/typography";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  onBackClick?: () => void;
}

const Header = ({ title, onBackClick }: HeaderProps) => {
  const router = useRouter();

  const handleBack = onBackClick || (() => router.back());

  return (
    <div className="flex justify-between items-center relative py-2 bg-white shadow-sm">
      <div className="absolute ">
        <IconChevronLeft
          size={24}
          className="cursor-pointer text-gray-700"
          onClick={handleBack}
        />
      </div>
      <div className="flex-grow text-center">
        <Typography
          variant="paragraph/md"
          weight="medium"
          className="text-right text-gray-800"
        >
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default Header;
